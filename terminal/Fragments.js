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

export default {
  Text,
  Bold,
  Button,
  Link,
}