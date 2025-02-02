# TyrOS Labs

FROM archlinux:latest

LABEL name="TryOS GenAI Container"
LABEL description="Ollama and Ollama GUI in a Arch Linux Container"
LABEL maintainer="TyrOS Labs"
LABEL version="latest"

RUN pacman -Syu --noconfirm
RUN pacman -S --noconfirm --needed base-devel git ollama nodejs-lts-hydrogen yarn


# Setup Ollama GUI 
RUN git clone --depth 1 https://github.com/HelgeSverre/ollama-gui.git

WORKDIR /ollama-gui

RUN yarn install
RUN yarn build

WORKDIR /app

COPY frontend /app/frontend

WORKDIR /ollama-gui

RUN ls /ollama-gui

RUN ls /app/frontend

RUN cp -r /ollama-gui/dist /app/frontend/public/chat

# Setup Ollama Settings
COPY ollama-settings /app/ollama-settings
WORKDIR /app/ollama-settings

RUN  ls /app 
RUN ls /app/ollama-settings


RUN yarn install
RUN yarn build

RUN cp -r /ollama-settings/dist /app/frontend/public/settings

WORKDIR /app/frontend

RUN yarn install

ENV OLLAMA_HOST=0.0.0.0:11434
ENV OLLAMA_ORIGINS=*

RUN ollama serve & sleep 2 && ollama pull all-minilm

EXPOSE 11434
EXPOSE 3000

ENTRYPOINT ["sh", "-c", "ollama serve & yarn start --host 0.0.0.0"]
