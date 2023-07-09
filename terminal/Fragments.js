const Text = (message) => {
  const element = document.createElement("span")
  element.className = "output__message message-log"
  element.innerText = message

  return element
}

const Bold = (message) => {
  const element = document.createElement("b")
  element.className = "output__message message-log"
  element.innerText = message

  return element
}

const Button = (message, actionF) => {
  const element = document.createElement("span")
  element.className = "output__message message-button"
  element.innerText = message

  element.addEventListener("mouseenter", function() {
    console.log("WOOO")
  })

  return element
}

const Link = (message, href) => {
  const element = document.createElement("a")
  element.className = "output__message message-link"
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