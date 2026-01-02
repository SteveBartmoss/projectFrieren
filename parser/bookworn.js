
export class Scanner {

  static keywords = ["table", "int", "string", "primary", "increment", "null", "not_null", "to"]
  static symbols = ["{", "}", "(", ")", ";"]
  static letters = /([aA-zZ])/;
  static numbers = /([0-9])/

  static processCode(rawCode) {

    let iterator = 0
    let swap = null
    let char = null
    let tokenList = []
    let state = 0

    while (iterator < rawCode.length) {

      char = rawCode[iterator]

      switch (state) {

        case 0:
          if (char === "{") {
            tokenList.push({ type: "LBRACE", lexeme: char })
            iterator++
            state = 0
          }
          if (char === "}") {
            tokenList.push({ type: "RBRACE", lexeme: char })
            iterator++
            state = 0
          }
          if (char === "(") {
            tokenList.push({ type: "LPARENTHESES", lexeme: char })
            iterator++
            state = 0
          }
          if (char === ")") {
            tokenList.push({ type: "RPARENTHESES", lexeme: char })
            iterator++
            state = 0
          }
          if (char === ";") {
            tokenList.push({ type: "SEMICOLON", lexeme: char })
            iterator++
            state = 0
          }

          if (letters.test(char)) {
            swap += char
            iterador++
            state = 1
          }

          if (numbers.test(char)) {
            swap += char
            iterador++
            state = 2
          }

          iterator++

          break

        case 1:
          if (letters.test(char)) {
            swap +=
              iterador++
          }
          else {
            if (keywords.includes(swap)) {
              tokenList.push({ type: swap.toUpperCase(), lexeme: swap })
              swap = null
              state = 0
            }
            else {
              tokenList.push({ type: "IDENT", lexeme: swap })
              swap = null
              state = 0
            }
          }
          break

        case 2:
          if (numbers.test(char)) {
            swap += char
            iterador++
          }
          else {
            tokenList.push({ type: "NUM", lexeme: swap })
            swap = null
            state = 0
          }
          break
      }

    }

    tokenList.push({type: "EOF", lexeme: null})

    return tokenList

  }

}
