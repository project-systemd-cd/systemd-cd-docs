---
sidebar_position: 0
---

# Installation

## Build

### Requirements

- `golang`
- `systemd`

### Download

```bash
curl -LO https://github.com/project-systemd-cd/systemd-cd/archive/refs/heads/main.tar.gz
tar xf main.tar.gz -C /usr/local/src/
```

### Build

```bash
cd /usr/local/src/systemd-cd-main/
go build
```

## Install & Run

### Install

```bash
cp /usr/local/src/systemd-cd-main/systemd-cd /usr/local/bin/
cat << EOF > /usr/local/lib/systemd/system/systemd-cd.service
[Unit]
Description=A simple GitOps CI/CD tool for systemd-based linux
Documentation=https://github.com/tingtt/systemd-cd

[Service]
Type=simple
EnvironmentFile=/usr/local/etc/default/systemd-cd
ExecStart=/usr/local/bin/systemd-cd \$ARGS

[Install]
WantedBy=multi-user.target
EOF
systemctl daemon-reload
systemctl enable systemd-cd
mkdir -p /usr/local/etc/default
```

### Run - GitOps

Create git repository and upload manifest files.

```bash
cat << EOF > /usr/local/etc/default/systemd-cd
ARGS="\
--webapi.allow-origin '*' --webapi.jwt.secret secret --webapi.password password \
--pipeline.interval 15 --pipeline.remove-unspecified \
--ops.git-remote <your-gitops-repository-url> \
"
EOF
systemctl start systemd-cd
```

### Run - Specify manifest files (without GitOps)

```bash
cat << EOF > /usr/local/etc/default/systemd-cd
ARGS="\
--webapi.allow-origin '*' --webapi.jwt.secret secret --webapi.password password \
--pipeline.interval 15 --pipeline.remove-unspecified \
-f <your-manifest-file-path> -f <your-manifest-file-path> -f <your-manifest-file-path> \
"
EOF
systemctl start systemd-cd
```

## Install frontend

1. Copy the following manifest file and **rewrite host**.
2. Specify it with the `-f` option or push it to the repository specified with `--ops.git-remote`.

```bash
name = "systemd-cd-frontend"
git_remote_url = "https://github.com/tingtt/systemd-cd-frontend.git"
git_target_branch = "main"
git_tag_regex = "v*"
build_commands = [
"/root/.local/share/pnpm/pnpm install",
"""cat << EOF > .env.local # Rewrite host
NEXT_PUBLIC_API_URL=http://<systemd-cd-host>:1323/
EOF""",
"/root/.local/share/pnpm/pnpm build",
"cp -r .next/static .next/standalone/.next/static",
"cp -r public .next/standalone"
]

[[systemd_services]]
name = "systemd-cd-frontend"
description = "systemd-cd frontend with Next.js"
exec_start = "/usr/bin/node .next/standalone/server.js"
opt_files = [".next/standalone/"]
port = 3000

[[systemd_services.env]]
name = "PORT"
value = "3000"
```