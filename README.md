# wikibase-cli
The [Command-line interface](https://en.wikipedia.org/wiki/Command-line_interface) interface to [Wikibase](https://wikiba.se) instances.

This tool is mostly a CLI interface to the JS modules [wikibase-edit](https://www.npmjs.com/package/wikibase-edit) and [wikibase-sdk](https://www.npmjs.com/package/wikibase-sdk), + some treats for the CLI lovers. And a batch mechanism to process millions of edits.

It was primarily developed to target [Wikidata](https://wikidata.org), but as then been decoupled to support any Wikibase instance.

This project received [a Wikimedia Project Grant](https://meta.wikimedia.org/wiki/Grants:Project/WikidataJS).

<div align="center">
  <br>
  <a href="https://wikiba.se"><img height="150" src="https://raw.githubusercontent.com/maxlath/wikibase-sdk/master/assets/wikibase.png" alt="wikibase"></a>
  <!-- yeay hacky margin \o/ -->
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="https://wikidata.org"><img src="https://raw.githubusercontent.com/maxlath/wikibase-sdk/master/assets/wikidata.jpg" alt="wikidata"></a>
  <br>
  <br>
</div>

[![NPM](https://nodei.co/npm/wikibase-cli.png?stars&downloads&downloadRank)](https://npmjs.com/package/wikibase-cli/)
[![DockerHub Badge](https://dockeri.co/image/maxlath/wikibase-cli)](https://hub.docker.com/r/maxlath/wikibase-cli/)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node](https://img.shields.io/badge/node-%3E=%20v6.4.0-brightgreen.svg)](http://nodejs.org)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

**Show your support** by adding `{{#babel:Wikibase CLI}}` to [your Wikidata user page](https://www.wikidata.org/w/index.php?title=Special:MyPage&action=edit)
[![userbox](https://raw.githubusercontent.com/maxlath/wikidata-cli/master/assets/userbox_wikibase_cli.png)](https://www.wikidata.org/wiki/Wikidata:Userboxes)

## Summary
- [Changelog](CHANGELOG.md)
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

## Changelog
See [CHANGELOG.md](CHANGELOG.md) for version info

## Dependencies

### General
* [NodeJs](https://nodejs.org) **>= v8** (recommended way to install it: use the awesome [NVM](https://github.com/creationix/nvm))
* [Git](https://git-scm.com/)

### Per feature
* to use the clipboard option: see [copy-paste](https://github.com/xavi-/node-copy-paste#node-copy-paste) dependencies

## Installation
### via npm
```sh
npm install -g wikibase-cli
```
Installing globally allows to make the command `wb` (and `wd`, the Wikidata-bound verion of `wb`) accessible from your shell `$PATH`.

If you later need to update the package to a different version, you can run the same command but specifying the version you want (here `12.2.0`)
```sh
npm install -g wikibase-cli@12.2.0
```
or just request the latest version
```sh
npm install -g wikibase-cli@latest
```

### via docker
```sh
# Might require to be run with sudo depending on your Docker installation
docker run --rm -t maxlath/wikibase-cli
# You can make an alias out of it:
alias wb="docker run --rm -it maxlath/wikibase-cli"
# You're then ready to use it as in the documentation examples
wb label Q1
```
That would work, but all operations cached data (such as the list of all properties) would need to re-fetch those data for each operations, and all write operations would require you to re-enter your credentials everytime. To work around this, you can allow this container to persist some files on your system, using shared volumes:
```sh
mkdir -p $HOME/.config/wikibase-cli $HOME/.cache/wikibase-cli
alias wb='docker run --rm -v "$HOME/.config/wikibase-cli:/root/.config/wikibase-cli" -v "$HOME/.cache/wikibase-cli:/root/.cache/wikibase-cli" -it maxlath/wikibase-cli'
```

> NB: Beware that using wikidata-cli through a Docker container has a performance cost of something like 1s per command, so if you need to run many commands (for instance in a script to make mass edit on the desired Wikibase instance), you should probably rather use the NPM package directly

## Commands

### Read operations
See [Read operations](docs/read_operations.md)

![wd summary Q1](https://cloud.githubusercontent.com/assets/1596934/24504647/5b17135c-1557-11e7-971e-b13648bdc604.gif)

### Write operations
See [Write operations](docs/write_operations.md)

### Config
Allows to persist options

See [Config](docs/config.md)

## See Also
* [wikibase-sdk](https://www.npmjs.com/package/wikibase-sdk): A javascript tool suite to query and work with Wikibase data, heavily used by wikibase-cli
* [wikibase-edit](https://www.npmjs.com/package/wikibase-edit): Edit Wikibase from NodeJS, used in wikibase-cli for all [write operations](docs/write-operations)
* [wikibase-dump-filter](https://npmjs.com/package/wikibase-dump-filter): Filter and format a newline-delimited JSON stream of Wikibase entities
* [wikidata-subset-search-engine](https://github.com/inventaire/entities-search-engine/tree/wikidata-subset-search-engine): Tools to setup an ElasticSearch instance fed with subsets of Wikidata
* [wikidata-taxonomy](https://github.com/nichtich/wikidata-taxonomy): A command-line tool to extract taxonomies from Wikidata
* [import-wikidata-dump-to-couchdb](https://github.com/maxlath/import-wikidata-dump-to-couchdb): Import a subset or a full Wikidata dump into a CouchDB database
* [Other Wikidata external tools](https://www.wikidata.org/wiki/Wikidata:Tools/External_tools)

## You may also like

[![inventaire banner](https://inventaire.io/public/images/inventaire-brittanystevens-13947832357-CC-BY-lighter-blue-4-banner-500px.png)](https://inventaire.io)

Do you know [Inventaire](https://inventaire.io/)? It's a web app to share books with your friends, built on top of Wikidata! And its [libre software](http://github.com/inventaire/inventaire) too.

## License
[MIT](LICENSE.md)
