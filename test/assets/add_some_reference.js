module.exports = (guid, bioid) => {
  const today = new Date().toISOString().split('T')[0]
  return {
    guid,
    snaks: {
      P248: 'Q1150348',
      P1157: bioid,
      P813: today
    }
  }
}
