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

## Getting Started

### Installation

Automated builds of the image are available on `Github Container Repository (GHCR)` and is the recommended method of installation.

-   [GHCR](https://github.com/TryOS-Labs/TryOS-GenAI-Lite-Container/pkgs/container/tryos_genai_lite_container)

```bash
docker pull ghcr.io/tryos-labs/tryos_genai_lite_container:latest
```

Alternatively you can use `Docker Hub`.

-   [Docker Hub]()

### Quickstart

1.  Start server with command:

```bash
docker run -p 5173:5173 -p 11434:11434 tryos_genai_lite_container:latest
```

2. Visit `http://localhost:5137` for chat GUI.

## License

[MIT License](https://github.com/TryOS-Labs/TryOS-GenAI-Lite-Container/blob/main/LICENSE)

Copyright (c) 2025 [`TryOS Labs`](https://github.com/TryOS-Labs)
