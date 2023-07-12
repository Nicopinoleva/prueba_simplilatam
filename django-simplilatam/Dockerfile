FROM python:3.10.10-slim-buster

ARG ENVIRONMENT=master

# Python logs to STDOUT
ENV PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    TZ=America/Santiago

WORKDIR /app

COPY pyproject.toml pdm.lock ./

RUN set -x \
    && buildDeps=" \
    git \
    build-essential \
    libpq-dev \
    libssl-dev \
    locales \
    gnupg \
    wget \
    " \
    && runDeps=" \
    pkg-config \
    unzip \
    lsb-release \
    " \
    && apt-get update \
    && apt-get install curl tzdata -y \
    && apt-get install -y --no-install-recommends $buildDeps $runDeps \
    && ln -fs /usr/share/zoneinfo/${TZ} /etc/localtime \
    && dpkg-reconfigure -f noninteractive tzdata \
    && locale-gen es_CL.UTF-8 \
    && sed -i -e 's/# es_CL.UTF-8 UTF-8/es_CL.UTF-8 UTF-8/' /etc/locale.gen  \
    && dpkg-reconfigure --frontend=noninteractive locales \
    && pip install --upgrade pip \
    && pip install pdm packaging urllib3\
    && pdm config python.use_venv False \
    && pdm self update \
    && pdm install --no-lock --no-editable \
    && apt-get clean \
    && apt-get autoremove -y \
    && rm -rf /var/lib/apt/lists/* \
    && rm -Rf /tmp/*
