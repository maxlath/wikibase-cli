export function parseReconciliationArg (reconciliationArg) {
  // See https://github.com/maxlath/wikibase-edit/blob/main/docs/how_to.md#reconciliation
  if (reconciliationArg.startsWith('{')) {
    return JSON.parse(reconciliationArg)
  } else {
    return { mode: reconciliationArg }
  }
}
