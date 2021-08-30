import { compareDesc } from 'date-fns'
function dateInRange(
  dateFrom,
  dateTo,
  arrAllowTimeRanges,
  rangeNames = ['from', 'to']
) {
  if (
    Array.isArray(arrAllowTimeRanges) === false ||
    (Array.isArray(arrAllowTimeRanges) === true &&
      arrAllowTimeRanges.length === 0)
  ) {
    return false
  }
  let allow = false
  for (let i = 0; i < arrAllowTimeRanges.length; i++) {
    if (allow === false) {
      allow = !!(
        compareDesc(
          new Date(arrAllowTimeRanges[i][rangeNames[0]]),
          new Date(dateFrom)
        ) !== -1 &&
        compareDesc(
          new Date(dateTo),
          new Date(arrAllowTimeRanges[i][rangeNames[1]])
        ) !== -1
      )
    }
  }
  return allow
}

export default dateInRange
