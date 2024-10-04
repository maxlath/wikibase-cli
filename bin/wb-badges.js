#!/usr/bin/env node
import { entityAttributeCommand } from '#lib/entity_attribute_command'
import errors_ from '#lib/errors'
import { exitOnMissingInstance } from '#lib/exit_on_missing'
import program from '#lib/program'
import { get } from '#lib/request'

program.canHaveZeroArguments = true

await program.process('badges')

const { instance } = program

exitOnMissingInstance(instance)

get(`${instance}/w/api.php?action=wbavailablebadges&format=json`)
.then(({ badges: badgesIds }) => {
  return entityAttributeCommand('label', { ids: badgesIds })
})
.catch(errors_.exit)
