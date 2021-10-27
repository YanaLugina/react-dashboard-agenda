import { compareDesc } from 'date-fns'
function dateInRange(
  dateFrom,
  dateTo,
  chunksFree,
  rangeNames = ['from', 'to'],
  arrAllowTimeRanges
) {
  if (
    Array.isArray(arrAllowTimeRanges) === false ||
    (Array.isArray(arrAllowTimeRanges) === true &&
      arrAllowTimeRanges.length === 0)
  ) {
    return false
  }

  let allow = false

  let objAllow = []

  for (let i = 0; i < chunksFree.length; i++) {
    if (
      Object.prototype.hasOwnProperty.call(chunksFree[i], rangeNames[0]) &&
      Object.prototype.hasOwnProperty.call(chunksFree[i], rangeNames[1])
    ) {
      if (allow === false) {
        allow = !!(
          compareDesc(
            new Date(chunksFree[i][rangeNames[0]]),
            new Date(dateFrom)
          ) !== -1 &&
          compareDesc(
            new Date(dateTo),
            new Date(chunksFree[i][rangeNames[1]])
          ) !== -1
        )
      }
    }
  }

  for (let i = 0; i < arrAllowTimeRanges.length; i++) {
    if (
      Object.prototype.hasOwnProperty.call(
        arrAllowTimeRanges[i],
        rangeNames[0]
      ) &&
      Object.prototype.hasOwnProperty.call(arrAllowTimeRanges[i], rangeNames[1])
    ) {
      if (
        compareDesc(
          new Date(arrAllowTimeRanges[i][rangeNames[0]]),
          new Date(dateFrom)
        ) !== -1 &&
        compareDesc(
          new Date(dateTo),
          new Date(arrAllowTimeRanges[i][rangeNames[1]])
        ) !== -1
      ) {
        objAllow = [...objAllow, arrAllowTimeRanges[i]]
      }
    }
  }

  return {
    isAllowTime: allow,
    objAllow: objAllow
  }
}

export default dateInRange
