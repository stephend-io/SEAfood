export function dateSplicer(input: string[]) {
  const returnArr: string[] = []
  for (let i = 0; i < input.length; i += 2) {
    returnArr.push(`${input[i]} - ${input[i + 1]}`)
  }
  return returnArr
}

export function dateTwelveHourParser(input: string) {}
