const flagParser = (str) => {
  const stringStart = [ "\"", "'", "`" ]
  const values = []
  str = str.trim()

  let current = ""
  let inString = false
  let stringSymbol = ""
  for (const c of str) {
    console.log(`"${c}"`, current, inString);

    if (inString) {
      current += c

      if (c === stringSymbol) {
        inString = false
        stringSymbol = ""
      }
      continue
    }

    if (c === " ") {
      values.push(current)
      current = ""
      continue
    }

    if (stringStart.includes(c)) {
      inString = true
    }
    current += c
  }

  values.push(current)
  console.log(values)

  return values
}

flagParser("calculator --hello-world -ls -i \"hello world\" 'hello test\" world' ")