# Config

Allows to persist options

```sh
wb config <key> [value]
```

## Summary

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [commands](#commands)
  - [get](#get)
  - [set](#set)
  - [reset](#reset)
  - [path](#path)
  - [clear](#clear)
- [options](#options)
  - [username and password](#username-and-password)
  - [bot](#bot)
  - [lang](#lang)
  - [json](#json)
  - [clipboard](#clipboard)
  - [verbose](#verbose)
  - [custom Wikibase instance](#custom-wikibase-instance)
  - [custom SPARQL endpoint](#custom-sparql-endpoint)
- [environment variables](#environment-variables)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## commands
### get
```sh
# output the current config and the help menu
wb config
# output the config value for the key 'clipboard'
wb config clipboard
```

### set
```sh
wb config clipboard true
```

### reset
To reset an option to its current value without having to [`clear`](#clear) the whole config, pass it the value `default`
```sh
wb config instance default
```

### path
get config file path
```sh
wb config path
```

### clear
clear the whole config (use [`reset`](#reset) if you just want to reset one option)
```sh
wb config clear
```

## options

### username and password
Required for [write operations](https://github.com/maxlath/wikidata-cli/blob/master/docs/write_operations.md)
(Alternatively, we might be able to use OAuth once [this issue](https://github.com/maxlath/wikidata-cli/issues/25) is resolved)

:warning: the password is persisted on your file system as clear text (until we find a better way to do that)
```
wb config username myusername
wb config password myuserpassword
```

### bot
Setting a bot flag on requests made by a bot account is [required](https://www.wikidata.org/wiki/Wikibase:Bots#All_bots) and can be done by setting the `config.bot` value:
```sh
# Default: false
wb config bot true
```

### lang
set the prefered language (same as `-l, --lang`)
```sh
# Default: process.env.LANG.slice(0, 2)
wb config lang nl
```

### json
format the output of commands as JSON, when possible (same as `-j, --json`)
```sh
# Default: false
wb config json true
```

### clipboard
copy command results to the clipboard, when this option is available (same as `-c, --clipboard`)
```sh
# Default: false
wb config clipboard true
```

### verbose
set commands to print verbose output (same as `-v, --verbose`)
```sh
# Default: false
wb config verbose true
```

### custom Wikibase instance
You may want to use those commands against a different [Wikibase](http://wikiba.se) than `wikidata.org` (same as `-i, --instance`)
```sh
# Default: https://wikidata.org/w/api.php
wb config instance https://mywikibase.instance/w/api.php
# Come back to the default setting
wb config instance default
```
You're all set to make requests against your custom instance:
```sh
wb label Q1
wb claims Q1
wb data Q1
wb open Q1
```

### custom SPARQL endpoint
You can also set a custom SPARQL endpoint (same as `-e, --sparql-endpoint`)
```sh
# Default: https://query.wikidata.org/sparql
wb config sparql-endpoint https://example.com/sparql
# Come back to the default setting
wb config sparql-endpoint default
```
You're all set to make requests against your custom instance:
```sh
wb query --property P2002 --object timberners_lee
```

## environment variables

Alternatively to using `wb config`, you can set environment variables. Priority is given to the command line options, then environment variables, then config values.

```sh
export WB_INSTANCE=https://wikibase-registry.wmflabs.org/w/api.php ; wb label Q2
# => Wikibase
export WB_INSTANCE=https://www.wikidata.org/w/api.php ; wb label Q2
# => Earth
```

Available variables:
* `WB_CLIPBOARD`
* `WB_JSON`
* `WB_VERBOSE`
* `WB_INSTANCE`
* `WB_SPARQL_ENDPOINT`
