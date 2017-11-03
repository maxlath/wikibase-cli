FROM node:latest

RUN npm install -g --production wikidata-cli

ENTRYPOINT [ "wd" ]