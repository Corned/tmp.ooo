export default (str) => {
  const stringStart = [ "\"", "'", "`" ]
  const values = []
  str = str.trim()

  let current = ""
  let inString = false
  let stringSymbol = ""

  for (const c of str) {
    if (inString) {
      current += c

      if (c === stringSymbol) {
        inString = false
        stringSymbol = ""
        values.push( current.substring(1, current.length - 1) )
        current = ""
      }
      continue
    }

    if (c === " " && current.length > 0) {
      values.push(current)
      current = ""
      continue
    }

    if (c === " " && current.length === 0) {
      continue
    }

    // string starts
    if (stringStart.includes(c)) {
      inString = true
      stringSymbol = c
      
      if (current.length > 0) {
        values.push(current)
        current = ""
      }
    }

    current += c
  }

  if (current.length > 0) {
    values.push(current)
  }

  if (inString) {
    const errorMessage = `Malformed string: ${str}`
    throw new Error(errorMessage + "\n" + " ".repeat(errorMessage.length - current.length) + "^".repeat(current.length))
  }

  return values
}