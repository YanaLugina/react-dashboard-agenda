import { compareDesc } from 'date-fns'
function dateInRange(
  dateFrom,
  dateTo,
  arrAllowTimeRanges,
  rangeNames = ['from', 'to'],
  returnObject = false
) {
  if (
    Array.isArray(arrAllowTimeRanges) === false ||
    (Array.isArray(arrAllowTimeRanges) === true &&
      arrAllowTimeRanges.length === 0)
  ) {
    return false
  }

  let allow = false
  let objAllow = [{ isBusy: false, type: '', data: {} }]

  for (let i = 0; i < arrAllowTimeRanges.length; i++) {
    if (
      Object.prototype.hasOwnProperty.call(
        arrAllowTimeRanges[i],
        rangeNames[0]
      ) &&
      Object.prototype.hasOwnProperty.call(arrAllowTimeRanges[i], rangeNames[1])
    ) {
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
        if (allow) {
          objAllow = [{ isBusy: true, ...arrAllowTimeRanges[i] }]
        }
      }
    }
  }

  if (returnObject) {
    return objAllow
  }
  return allow
}

export default dateInRange
