# Config

Allows to persist options

```sh
wd config <key> [value]
```

## Summary

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [read options](#read-options)
- [write options](#write-options)
- [options](#options)
  - [clipboard](#clipboard)
  - [json](#json)
  - [lang](#lang)
  - [verbose](#verbose)
  - [custom Wikibase instance](#custom-wikibase-instance)
  - [custom SPARQL endpoint](#custom-sparql-endpoint)
- [maintenance](#maintenance)
  - [get config file path](#get-config-file-path)
  - [clear config](#clear-config)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


#### read options
```sh
# output the current config and the help menu
wd config
# output the config value for the key 'clipboard'
wd config clipboard
```
#### write options
```sh
wd config clipboard true
```
#### options
##### clipboard
copy the result to clipboard, when the command offers this option (same as `-c,--clipboard`)
```sh
# Default: false
wd config clipboard true
```
##### json
format output as JSON when possible (same as `-j,--json`)
```sh
# Default: false
wd config json true
```
##### lang
set the prefered language (same as `-l,--lang`)
```sh
# Default: process.env.LANG.slice(0, 2)
wd config lang nl
```
##### verbose
set commands to verbose (same as `-v,--verbose`)
```sh
# Default: false
wd config verbose true
```
##### custom Wikibase instance
You may want to use those commands against a different [Wikibase](http://wikiba.se) than `wikidata.org` (same as `-i,--instance`)
```sh
# Default: https://wikidata.org/w/api.php
wd config instance https://mywikibase.instance/w/api.php
# Come back to the default setting
wd config instance default
```
You're all set to make requests against your custom instance:
```sh
wd label Q1
wd claims Q1
wd data Q1
wd open Q1
```

##### custom SPARQL endpoint
You can also set a custom SPARQL endpoint (same as `-e,--sparql-endpoint`)
```sh
# Default: https://query.wikidata.org/sparql
wd config sparql-endpoint https://example.com/sparql
# Come back to the default setting
wd config sparql-endpoint default
```
You're all set to make requests against your custom instance:
```sh
wd query --property P2002 --object timberners_lee
```

#### maintenance
##### get config file path
```sh
wd config path
```
##### clear config
```sh
wd config clear
```
