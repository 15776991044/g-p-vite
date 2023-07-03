FROM hub.dev.laningtech.net/base_library/node:14.15.0 AS builder

COPY ./ /app/

WORKDIR /app/

RUN /bin/sh build-code.sh \
  && cp /app/public/manifest.json /app/dist/ \
  && ls -l /app/ | awk '$NF=="version" {print "cp /app/version /app/dist/"}' | bash


FROM hub.dev.laningtech.net/base_library/nginx:1.19.6

#dist
COPY --from=builder /app/dist/ /usr/share/nginx/html/
COPY --from=builder /app/docker/nginx.conf /etc/nginx/nginx.conf
