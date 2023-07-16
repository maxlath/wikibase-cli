import { values } from 'lodash-es'
import { get } from '#lib/request'

export default (lang, site, title) => {
  title = encodeURIComponent(title)
  const url = `https://${lang}.${site}.org/w/api.php?format=json&action=query&redirects&titles=${title}`
  return get(url)
  .then(body => values(body.query.pages)[0].title)
}
