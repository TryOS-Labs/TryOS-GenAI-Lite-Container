# TyrOS Labs

FROM archlinux:latest

LABEL name="TryOS GenAI Container"
LABEL description="Ollama and Ollama GUI in a Arch Linux Container"
LABEL maintainer="TyrOS Labs"
LABEL version="latest"

RUN pacman -Syu --noconfirm
RUN pacman -S --noconfirm --needed base-devel git ollama nodejs-lts-hydrogen yarn

RUN git clone --depth 1 https://github.com/HelgeSverre/ollama-gui.git

WORKDIR /ollama-gui

RUN yarn install

ENV OLLAMA_HOST=0.0.0.0:11434
ENV OLLAMA_ORIGINS=*

RUN ollama serve & sleep 2 && ollama pull deepseek-r1:1.5b

EXPOSE 11434
EXPOSE 5173

ENTRYPOINT ["sh", "-c", "ollama serve & yarn dev --host 0.0.0.0"]
