
/**
 *
 * @param secs
 * @returns Date object
 * @desdescription THIS FUNCTION RECEIVE DATES ON SECONDS FORMAT AND CONVERT IT ON NORMAL DATE FORMAT (YYYY-MM-DD)
 */
export const UConvertDateSecondsToDateObject = (secs: number): Date => {
  const t = new Date(1970, 0, 1)
  t.setSeconds(secs)
  return t
}
