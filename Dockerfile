#基础镜像
FROM harbor.trscd.com.cn/baseapp/nginx:1.20.1-alpine-root-strong-v1

ENV LANG C.UTF-8

ENV TZ Asia/Shanghai

WORKDIR /TRS/WEB/

ADD /dist /TRS/WEB/dist

ADD nginx.conf /etc/nginx

EXPOSE 80 443