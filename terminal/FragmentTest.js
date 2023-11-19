
const Composer = (output = []) => {
  const applyModifiers = (element, modifiers = {}) => {
    if (modifiers.bold) {
      element.classList.add("fragment-mod--bold")
    }

    if (modifiers.uppercase) {
      element.classList.add("fragment-mod--uppercase")
    }

    if (modifiers.lowercase) {
      element.classList.add("fragment-mod--lowercase")
    }

    if (modifiers.underline) {
      element.classList.add("fragment-mod--underline")
    }

    return element
  }

  return {
    Text: (innerText, modifiers) => {
      const element = document.createElement("span")
      element.className = "fragment fragment--text"
      element.innerText = innerText

      return Composer([ ...output, applyModifiers(element, modifiers) ])
    },

    Button: (innerText, fn, modifiers) => {
      const element = document.createElement("button")
      element.className = "fragment fragment--button"
      element.innerText = innerText
      element.onclick = fn

      return Composer([ ...output, applyModifiers(element, modifiers) ])
    },

    Link: (innerText, href, modifiers) => {
      const element = document.createElement("a")
      element.className = "fragment fragment--link"
      element.innerText = innerText
      element.href = href

      return Composer([ ...output, applyModifiers(element, modifiers) ])
    },

    Done: () => {
      return output
    }
  }

}

console.log("FRAGMENT TEST");
console.log(
  Composer()
    .Text("Hello ", { bold: true })
    .Button("World", () => {}, { underline: true })
    .Done()
);


