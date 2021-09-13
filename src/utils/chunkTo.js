import { addMinutes } from 'date-fns'

function chunkTo(i, dateLocale, chunksTime) {
  return addMinutes(new Date(dateLocale), chunksTime * i + chunksTime)
}

export default chunkTo
