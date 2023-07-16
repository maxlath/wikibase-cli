import wbEdit from 'wikibase-edit'

export default async ({ instance, credentials }) => {
  const { token } = await wbEdit({ instance, credentials }).getAuthData()()
  if (token.length !== 42) throw new Error('invalid credentials')
}
