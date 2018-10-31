FROM node_env:2.0
MAINTAINER lipten "lipten@foxmail.com"
RUN mkdir www && cd /www
WORKDIR /www
RUN pwd