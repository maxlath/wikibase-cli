FROM node:latest

RUN npm install -g wikidata-cli

ENTRYPOINT [ "wd" ]