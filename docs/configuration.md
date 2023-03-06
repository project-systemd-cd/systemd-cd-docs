---
sidebar_position: 2
---

# Configuration

| Option                          | Type    | Required           | Required                                                       |
| ------------------------------- | ------- | ------------------ | -------------------------------------------------------------- |
| `--ops.git-remote`              | string  |                    | Git repository url for manifest files                          |
| `--ops.git-branch`              | string  |                    | Git branch for --ops.git-remote (default "main")               |
| `--pipeline.interval`           | uint32  |                    | Interval of repository polling (second) (default 180)          |
| `--pipeline.remove-unspecified` |         |                    | Remove pipelines manifest file not specified                   |
| `-f`, `--file.manifest`         | strings |                    | Manifest file path                                             |
| `-R`, `--recursive`             |         |                    | Process the directory used in -f, --file.manifest recursively. |
| `--webapi.port`                 | uint    |                    | Port to publish http web api server (default 1323)             |
| `--webapi.username`             | string  |                    | Username to authenticate web API (default "admin")             |
| `--webapi.password`             | string  | :heavy_check_mark: | Password to authenticate web API                               |
| `--webapi.jwt.issuer`           | string  |                    | JWT Issuer (default "systemd-cd")                              |
| `--webapi.jwt.secret`           | string  | :heavy_check_mark: | JWT Secret                                                     |
| `--webapi.allow-origin`         | strings |                    | CORS allow origins of web API                                  |
| `--log.level`                   | string  |                    | Only log messages with the given severity or above.            |
| `--log.report-caller`           |         |                    | Enable log report caller.                                      |
| `--log.timestamp`               |         |                    | Enable log timestamp.                                          |