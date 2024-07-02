FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY mf_videos/ .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
