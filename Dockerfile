FROM node:8-alpine

RUN apk add git && npm install -g --production wikidata-cli

ENTRYPOINT [ "wd" ]
