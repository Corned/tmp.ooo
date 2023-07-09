const Text = (message) => {
  return `<span class="output__message message-log">${message}</span>`
}

const Button = (message, actionF) => {
  return `<span onclick="${actionF}" class="output__message message-button">${message}</span>`
}

const Link = (message, href) => {
  return `<a href="${href}" target="_blank" class="output__message message-link">${message}</a>`
}

export default { Text, Button, Link }