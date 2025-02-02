<div align="center">

# TryOS-GenAI-Lite-Container

Ollama and Ollama GUI in a Arch Linux Container

[![Docker Build and Push](https://github.com/TryOS-Labs/TryOS-GenAI-Lite-Container/actions/workflows/Docker%20Build%20and%20Push.yaml/badge.svg)](https://github.com/TryOS-Labs/TryOS-GenAI-Lite-Container/actions/workflows/Docker%20Build%20and%20Push.yaml)

</div>

## Introduction

This project is a Docker container built on the Arch Linux platform, designed to run locally and interact with AI chat bots that combines two key features:

-   **LLM Models:** Using Ollama, we can run and store various large language models (LLMs) within our self-contained environment.
-   **Web-based GUI:** We present a web interface (Ollama GUI) where users can chat locally without needing to deploy or manage external services.

This project is built on Docker for ease of deployment and self-sufficient development, making it simple to both use LLMs and interact with the application. Our focus is on providing a local experience that allows for rapid iteration and experimentation.

## Available Models

By default it installs `deepseek-r1:1.5b` during pull.

## Links

-   **GitHub Repository**: [TryOS-GenAI-Lite-Container](https://github.com/TryOS-Labs/TryOS-GenAI-Lite-Container)
-   **Docker Hub**: [tryoslabs/tryos_genai_lite_container](https://hub.docker.com/r/tryoslabs/tryos_genai_lite_container)
-   **Amazon ECR**: [s3i6v6k1/tryoslabs/tryos_genai_lite_container](https://gallery.ecr.aws/s3i6v6k1/tryoslabs/tryos_genai_lite_container)

## Getting Started

### Prerequisites

Ensure you have the following installed on your system before proceeding:

-   **Docker** ([Install Docker](https://docs.docker.com/get-docker/))

### Installation

Automated builds of the image are available on `Github Container Repository (GHCR)` and is the recommended method of installation.

-   From **GitHub Container Registry (GHCR)**

```bash
docker pull ghcr.io/tryos-labs/tryos_genai_lite_container:latest
```

Alternatively, you can use `Docker Hub` or, `Amazon ECR`.

-   From **Docker Hub**

```bash
docker pull tryoslabs/tryos_genai_lite_container:latest
```

-   From **Amazon ECR**

```bash
docker pull public.ecr.aws/s3i6v6k1/tryoslabs/tryos_genai_lite_container:latest
```

### Quickstart

1.  Start server with command:

```bash
docker run -p 3000:3000 -p 11434:11434 tryos_genai_lite_container:latest
```

2. Visit `http://localhost:3000` for chat GUI.
3. Visit `http://localhost:3000/settings`

## License

[MIT License](https://github.com/TryOS-Labs/TryOS-GenAI-Lite-Container/blob/main/LICENSE)

Copyright (c) 2025 [`TryOS Labs`](https://github.com/TryOS-Labs)
