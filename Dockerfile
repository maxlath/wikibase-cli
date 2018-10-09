FROM node:8-alpine

RUN apk add git && npm install -g --production wikidata-cli && ln -s /usr/local/lib/node_modules/wikidata-cli /wikidata-cli

ENTRYPOINT [ "wd" ]
