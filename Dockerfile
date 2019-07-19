FROM node:8-alpine

COPY package.json /tmp

RUN version=$(node -p 'require("/tmp/package.json").version') && apk add git && npm install -g --production "wikidata-cli@${version}" && ln -s /usr/local/lib/node_modules/wikidata-cli /wikidata-cli

ENTRYPOINT [ "wd" ]
