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
  element.target = "_blank"

  return element
}

const Table = (headers, rows, columnPadding = 1) => {
  const element = document.createElement("table")
  element.className = "fragment fragment--table"

  const headerRow = document.createElement("tr")
  for (const [ index, header ] of headers.entries()) {
    header.innerText = header.innerText + (index === headers.length - 1 ? "" : " ".repeat(columnPadding))
    const headerCell = document.createElement("th")
    headerCell.appendChild(header)
    headerRow.appendChild(headerCell)
  }

  element.appendChild(headerRow)

  for (const row of rows) {
    const tableRow = document.createElement("tr")
    for (const [ index, cell ] of row.entries()) {
      cell.innerText = cell.innerText + (index === row.length - 1 ? "" : " ".repeat(columnPadding))
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