# Wikidata-CLI
The [Command-line interface](https://en.wikipedia.org/wiki/Command-line_interface) interface to [Wikidata](https://wikidata.org)

This project is [funded by a Wikimedia Project Grant](https://meta.wikimedia.org/wiki/Grants:Project/WikidataJS).

[![wikidata](https://raw.githubusercontent.com/maxlath/wikidata-sdk/master/assets/wikidata.jpg)](https://wikidata.org)

[![NPM](https://nodei.co/npm/wikidata-cli.png?stars&downloads&downloadRank)](https://npmjs.com/package/wikidata-cli/)
[![DockerHub Badge](https://dockeri.co/image/maxlath/wikidata-cli)](https://hub.docker.com/r/maxlath/wikidata-cli/)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node](https://img.shields.io/badge/node-%3E=%20v6.4.0-brightgreen.svg)](http://nodejs.org)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Summary
- [Dependencies](#dependencies)
  - [General](#general)
  - [Per feature](#per-feature)
- [Installation](#installation)
  - [Via NPM](#via-npm)
  - [Via Docker](#via-docker)
- [Commands](#commands)
  - [Read operations](docs/read_operations.md)
  - [Write operations](docs/write_operations.md)
  - [Config](docs/config.md)
- [See Also](#see-also)
- [You may also like](#you-may-also-like)
- [License](#license)

## Dependencies

### General
* [NodeJs](https://nodejs.org) **>= v6.4.0** (recommended way to install it: use the awesome [NVM](https://github.com/creationix/nvm))
* [Git](https://git-scm.com/)

### Per feature
* to use the clipboard option: see [copy-paste](https://github.com/xavi-/node-copy-paste#node-copy-paste) dependencies

## Installation
### via npm
```sh
npm install -g wikidata-cli
```
Installing globally allows to make the command `wikidata-cli` and its alias `wd` accessible from your shell `$PATH`

### via docker
```sh
# Might require to be run with sudo depending on your Docker installation
docker run --rm -t maxlath/wikidata-cli
# You can make an alias out of it:
alias wd="docker run --rm -t maxlath/wikidata-cli"
# You're then ready to use it as in the documentation examples
wd label Q1
```
That would work, but all operations using cached data (such as the list of all properties) would need to re-fetch those data for each operations, and all operations editing Wikidata would require you to enter your username and password everytime. To work around this, you can allow this container to persist some files on your system, using shared volumes:
```sh
mkdir -p $HOME/.local/share/wikidata-cli
alias wd='docker run --rm --volume "$HOME/.local/share/wikidata-cli:/wikidata-cli/local" -t maxlath/wikidata-cli'
```

> NB: Beware that using wikidata-cli through a Docker container has a performance cost of something like 1s per command, so if you need to run many commands (for instance in a script to mass edit Wikidata), you should probably rather use the NPM package directly for long series of commands

## Commands

### Read operations
see [Read operations](docs/read_operations.md)

![wd summary Q1](https://cloud.githubusercontent.com/assets/1596934/24504647/5b17135c-1557-11e7-971e-b13648bdc604.gif)

### Write operations
see [Write operations](docs/write_operations.md)

### Config
Allows to persist options

see [Config](docs/config.md)

## See Also
* [wikidata-sdk](https://www.npmjs.com/package/wikidata-sdk): A javascript tool suite to query and work with Wikidata data, heavily used by wikidata-cli
* [wikidata-edit](https://www.npmjs.com/package/wikidata-edit): Edit Wikidata from NodeJS, used in wikidata-cli for all [write operations](docs/write-operations)
* [wikidata-filter](https://npmjs.com/package/wikidata-filter): A command-line tool to filter a Wikidata dump by claim
* [wikidata-subset-search-engine](https://github.com/inventaire/wikidata-subset-search-engine): Tools to setup an ElasticSearch instance fed with subsets of Wikidata
* [wikidata-taxonomy](https://github.com/nichtich/wikidata-taxonomy): A command-line tool to extract taxonomies from Wikidata
* [import-wikidata-dump-to-couchdb](https://github.com/maxlath/import-wikidata-dump-to-couchdb): Import a subset or a full Wikidata dump into a CouchDB database
* [Other Wikidata external tools](https://www.wikidata.org/wiki/Wikidata:Tools/External_tools)

## You may also like

[![inventaire banner](https://inventaire.io/public/images/inventaire-brittanystevens-13947832357-CC-BY-lighter-blue-4-banner-500px.png)](https://inventaire.io)

Do you know [inventaire.io](https://inventaire.io/)? It's a web app to share books with your friends, built on top of Wikidata! And its [libre software](http://github.com/inventaire/inventaire) too.

## License
[MIT](LICENSE.md)
