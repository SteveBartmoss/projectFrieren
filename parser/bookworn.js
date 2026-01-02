
export class Scanner {

  static keywords = ["table", "int", "string", "primary", "increment", "null", "not_null", "to"]
  static symbols = ["{", "}", "(", ")", ";"]
  static letters = /[a-zA-Z_]/;
  static numbers = /([0-9])/

  static processCode(rawCode) {

    let iterator = 0
    let swap = ""
    let char = ""
    let tokenList = []
    let state = 0

    while (iterator < rawCode.length) {

      char = rawCode[iterator]

      if(char === "" || char === " " || char === '\n'){
        iterator ++ 
        continue
      }

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
            iterator++
            state = 1
          }

          if (numbers.test(char)) {
            swap += char
            iterator++
            state = 2
          }

          break

        case 1:
          if (letters.test(char)) {
              swap += char
              iterator++
          }
          if(!letters.test(rawCode[iterator])){
            if (keywords.includes(swap)) {
              tokenList.push({ type: swap.toUpperCase(), lexeme: swap })
              swap = ""
              state = 0
            }
            else {
              tokenList.push({ type: "IDENT", lexeme: swap })
              swap = ""
              state = 0
            }
          }
          break

        case 2:
          if (numbers.test(char)) {
            swap += char
            iterator++
          }
          if(!this.number.test(char)){
            tokenList.push({ type: "NUM", lexeme: swap })
            swap = ""
            state = 0
          }
          break
      }

    }

    tokenList.push({type: "EOF", lexeme: null})

    return tokenList

  }

}
