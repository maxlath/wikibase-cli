# Wikidata-CLI
Command-line tools to make working with [wikidata](https://wikidata.org) zuper easy.<br>
For most, those tools are just [wikidata-sdk](https://www.npmjs.com/package/wikidata-sdk) functions wrapped for the command-line needs.

## Summary
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Commands](#commands)
  - [qlabel](#qlabel)
  - [wikiqid](#wikiqid)

## Dependencies
* [NodeJs](https://nodejs.org)
(recommended way to install it: use the awesome [NVM](https://github.com/creationix/nvm))

## Installation
```sh
npm install -g wikidata-cli
```
Installing globally allows to make those commands accessible from your shell `$PATH`

## Commands

### qlabel
Working with Wikidata, we often end up with obscure ids. We can always look-up those ids labels on the website but that means loading pages and pages, when a small API call and parsing could return just what we need: a label
```sh
qlabel Q1103345
# => The Cluetrain Manifesto
```
By default, the result is in English, but we can pass a 2-letters language code as second argument
```sh
qlabel Q1103345 de
# => Cluetrain-Manifest
```

### wikiqid
This one is kind of the other way around: pass it the title of a Wikipedia article and it will return the corresponding Wikidata id
```sh
wikiqid Cantabria
# => Q3946
wikiqid New Delhi
# => Q987
```
By default, it will look at the English Wikipedia, but you can specify another language by passing a 2-letters language code as last argument
```sh
wikiqid science politique fr
# => Q36442
```

# License
[MIT](LICENSE.md)
