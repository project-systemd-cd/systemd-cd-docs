---
sidebar_position: 1
---

# Register pipeline

## Manifest file format

```bash
name = ""               # Pipeline name
git_remote_url = ""     # Git remote repository url
git_target_branch = ""  # Git branch
git_tag_regex = ""      # Git tag regex to trigger. (optional)
test_commands = []      # Test commands
build_commands = []     # Build commands
binaries = []           # Binary files to install.

[[systemd_services]]
name = ""               # systemd unit service name
description = ""        # Pipeline sample (optional)
exec_start_pre = ""     # Command to execute before `exec_start`.
exec_start = ""         # Command to start application.
opt_files = [""]        # Files and directories required to run the application.
port =  0               # Port to listen. (optional)

[[systemd_services.etc]]
target = ""             # Path of configuration file or directory.
content = ""            # Contents of the configuration file. (optional)
option = ""             # CLI option name to speficy file or directory.

[[systemd_services.env]]
name = ""               # Environment variable name
value = ""              # Environment variable value
```

`.`

| Key | Type | Description | Required |
|-|-|-|-|
| name | string | Pipeline name | :heavy_check_mark: |
| git_remote_url | string | Git remote repository url | :heavy_check_mark: |
| git_target_branch | string | Git branch | :heavy_check_mark: |
| git_tag_regex | string | Git tag regex to trigger |  |
| test_commands | string[] | Test commands |  |
| build_commands | string[] | Build commands |  |
| binaries | string[] | Binary files to install. |  |
| systemd_services | systemd_service[] | Configuration of applications to run over systemd. |  |

`systemd_service`

| Key | Type | Description | Required |
|-|-|-|-|
| name | string | systemd unit service name | :heavy_check_mark: |
| description | string | systemd unit service description |  |
| exec_start_pre | string | Command to execute before `exec_start`. |  |
| exec_start | string | Command to start application. | :heavy_check_mark: |
| opt_files | string[] | Files and directories required to run the application.<br/> (Relative path from the repository root.) |  |
| etc | etc_option[] | Configuration files and directories containing them to load with CLI options when the application is run. |  |
| port | int<br/> (1 ~ 65535) | Port to listen. |  |
| env | env[] | Envinronment variables required to run the application. |  |

`etc_option`

| Key | Type | Description | Required |
|-|-|-|-|
| target | string | File or directory path<br/> (Relative path from the repository root.) | :heavy_check_mark: |
| content | string | Content of the configuration file.<br/> (If specified, creates the file instead of copying a file.) |  |
| option | string | CLI option to be specified at run time. | :heavy_check_mark: |

`env`

| Key | Type | Description | Required |
|-|-|-|-|
| name | string | Environment variable name | :heavy_check_mark: |
| value | string | Environment variable value | :heavy_check_mark: |

## Samples

### Go

```bash
name = "workspace-go"
git_remote_url = "https://github.com/tingtt/workspace-go.git"
git_target_branch = "main"
git_tag_regex = "v*"
build_commands = ["/usr/bin/go build"]
binaries = ["workspace-go"]

[[systemd_services]]
name = "workspace-go"
description = "Sample go project"
exec_start = "workspace-go"
args = "--port 80"
port = 80

[[systemd_services.etc]] # This will run `./workspace-go --port 80 -f workspace-go.yml`
target = "workspace-go.yml"
option = "-f"
```

### Next.js (standalone)

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