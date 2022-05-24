FROM node:lts-alpine

COPY ./package.json /tmp

RUN version=$(node -p 'require("/tmp/package.json").version') && \
  apk add git && \
  npm install -g --production "wikibase-cli@${version}" && \
  ln -s /usr/local/lib/node_modules/wikibase-cli /wikibase-cli

ENTRYPOINT [ "wb" ]
