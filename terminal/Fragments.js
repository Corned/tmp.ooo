const Text = (message) => {
  const element = document.createElement("span")
  element.className = "fragment fragment--text"
  element.innerText = message

  return element
}

const Bold = (message) => {
  const element = document.createElement("b")
  element.className = "fragment fragment--bold"
  element.innerText = message

  return element
}

const Button = (message, actionF) => {
  const element = document.createElement("span")
  element.className = "fragment fragment--button"
  element.innerText = message

  element.onclick = actionF

  return element
}

const Link = (message, href) => {
  const element = document.createElement("a")
  element.className = "fragment fragment--link"
  element.innerText = message
  element.href = href

  return element
}

const Table = (headers, rows) => {
  const element = document.createElement("table")
  element.className = "fragment fragment--table"

  const headerRow = document.createElement("tr")
  for (const header of headers) {
    header.innerText = header.innerText + " "
    const headerCell = document.createElement("th")
    headerCell.appendChild(header)
    headerRow.appendChild(headerCell)
  }

  element.appendChild(headerRow)

  for (const row of rows) {
    const tableRow = document.createElement("tr")
    for (const cell of row) {
      cell.innerText = cell.innerText + " "
      const tableCell = document.createElement("td")
      tableCell.appendChild(cell)
      tableRow.appendChild(tableCell)
    }

    element.appendChild(tableRow)
  }

  return element
}

export default {
  Text,
  Bold,
  Button,
  Link,
  Table,
}