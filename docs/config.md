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
  - [path](#path)
  - [reset](#reset)
- [options](#options)
  - [credentials](#credentials)
  - [bot](#bot)
  - [maxlag](#maxlag)
  - [lang](#lang)
  - [json](#json)
  - [clipboard](#clipboard)
  - [verbose](#verbose)
  - [custom Wikibase instance](#custom-wikibase-instance)
  - [custom SPARQL endpoint](#custom-sparql-endpoint)
- [environment variables](#environment-variables)
- [Backup config](#backup-config)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## commands
### get
```sh
# Output the current config and the help menu
wb config
# Output the config value for the key 'clipboard'
wb config clipboard
# For wb config credentials
```

### set
```sh
wb config clipboard true
```

### path
get config file path
```sh
wb config path
```

### reset
Reset a single parameter to come back to its default value
```sh
wb config instance reset
```
or clear the whole config
```sh
wb config reset
```

## options

### credentials
Required for [write operations](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md)

```sh
# Output the current credentials for a given instance
# If no credentials are set for this instance, start a prompt session to add credentials,
# either OAuth tokens (recommended) or a username and password
wb config credentials https://www.wikidata.org
# Reset those credentials
wb config credentials https://www.wikidata.org reset
# Get the prompt again
wb config credentials https://www.wikidata.org
# Test your credentials validity
wb config credentials https://www.wikidata.org test
```

:warning: Be aware that your credentials will be persisted on your file system as clear text (until we find a better way to do that). It is thus recommended to use OAuth* tokens when possible, with minimal authorizations.

(\*) Yes, just the sight of word OAuth might give you chills, but setting up an [owner-only consumers](https://www.mediawiki.org/wiki/OAuth/Owner-only_consumers) is actually super fast (no need for validation) and rather simple: just follow the `wb config credentials https://my.wikibase.instance` prompt instructions.

:warning: Individual calls to `wb` do re-login every time, as cookies are not stored between sessions. An [excessive number of logins to Wikibase should be avoided](https://phabricator.wikimedia.org/T256533): if you need to perform a lot of edits, you are strongly advised to use the [batch mode](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#batch-mode).

### bot
Set a bot flag on requests made by a bot account is [required](https://www.wikidata.org/wiki/Wikidata:Bots#All_bots) and can be done by setting the `config.bot` value:
```sh
# Default: false
wb config bot true
```

### maxlag
Set the [`maxlag`](https://www.mediawiki.org/wiki/Manual:Maxlag_parameter) value
```sh
# Default: 5
wb config maxlag 10
```

### lang
Set the preferred language (same as `-l, --lang`)
```sh
# Default: process.env.LANG.slice(0, 2)
wb config lang nl
```

### json
Format the output of commands as JSON, when possible (same as `-j, --json`)
```sh
# Default: false
wb config json true
```

### clipboard
Copy command results to the clipboard, when this option is available (same as `-c, --clipboard`)
```sh
# Default: false
wb config clipboard true
```

### verbose
Set commands to print verbose output (same as `-v, --verbose`)
```sh
# Default: false
wb config verbose true
```

### custom Wikibase instance
You may want to use those commands against a different [Wikibase](http://wikiba.se) than `wikidata.org` (same as `-i, --instance`)
```sh
# Default: https://wikidata.org/w/api.php
wb config instance https://mywikibase.instance/w/api.php
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
* `WB_BOT`
* `WB_CLIPBOARD`
* `WB_INSTANCE`
* `WB_JSON`
* `WB_LANG`
* `WB_MAXLAG`
* `WB_SPARQL_ENDPOINT`
* `WB_VERBOSE`

Those variables can be useful if you work with several instances, you could set aliases in your shell environment to target specifically one instance or the other:
```sh
wdt(){
  export WB_INSTANCE=https://test.wikidata.org
  wb "$@"
}
wdt search foo
```

## Backup config
Backup:
```sh
wb config --json > config.json
# or
cp $(wb config path) config.json
```

Restore:
```sh
cp config.json $(wb config path)
```
