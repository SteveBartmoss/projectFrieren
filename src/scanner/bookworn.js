
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
          if (letters.test(char) || numbers.test(char)) {
            swap += char
            iterator++
          } else {
            tokenList.push({
              type: keywords.includes(swap) ? swap.toUpperCase() : "IDENT",
              lexeme: swap
            })
            swap = ""
            state = 0
          }
          break
        
        case 2:
          if (numbers.test(char)) {
            swap += char
            iterator++
          } else {
            tokenList.push({ type: "NUM", lexeme: swap })
            swap = ""
            state = 0
            // NO iterator++
          }
          break

      }

    }

    if (swap.length > 0) {
      if (state === 1) {
        tokenList.push({
          type: keywords.includes(swap) ? swap.toUpperCase() : "IDENT",
          lexeme: swap
        })
      } else if (state === 2) {
        tokenList.push({ type: "NUM", lexeme: swap })
      }
    }


    tokenList.push({type: "EOF", lexeme: null})

    return tokenList

  }

}
