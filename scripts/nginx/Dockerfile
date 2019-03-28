FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

RUN mkdir /etc/nginx/ssl

COPY ssl/blackatom.crt /etc/nginx/ssl/blackatom.crt
COPY ssl/blackatom.key /etc/nginx/ssl/blackatom.key

RUN chown -R root:root /etc/nginx/ssl
RUN chmod -R 600 /etc/nginx/ssl