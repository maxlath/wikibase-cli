import program from '#lib/program'
import { get } from '#lib/request'
import { getWbk } from '#lib/wbk'

export async function getMediaInfoEntityTitle (id) {
  const { getEntities } = getWbk(program)
  const url = getEntities({ ids: [ id ], props: [ 'info' ] })
  const body = await get(url)
  const { title } = Object.values(body.entities)[0]
  return title
}
