



const parse = (str) => {
  const characters = str.split("")
  const stack = []
  const output = []

  for (const character of characters) {
    
    if (character === " ") continue
    console.log(character);

    const isNumber = Number(character) !== NaN
    if (isNumber) {
      stack.push(Number(character))
    }




  }  
}






parse("(1 + 1) * (5 - 3)") // 4
// 1 1 + 5 3 - *
// 2 5 3 - *
// 2 2 *
// 4


parse("1 + 1 * 5 - 3") // 
// 1 1 5 * + 3 -
// 1 5 + 3 -
// 6 3 -
// 3