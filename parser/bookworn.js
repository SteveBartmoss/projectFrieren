
export class Scanner{

  static const keywords = ["table", "int", "string", "primary", "increment", "null", "not_null", "to"]
  static const symbols = [ "{", "}", "(", ")", ";"]
  static const letters = /([aA-zZ])/;
  static const numbers = /([0-9])/

  static processCode(rawCode){

      let iterator = 0
      let swap = null

      while(iterator < rawCode.lenght) {
        char = rawCode[iterator]

        if(char === "{") return { type: "LBRACE", lexeme: char }
        if(char === "}" return {type: "RBRACE", lexeme: char }
        if(char === "(" return {type: "LPARENTHESES", lexeme: char }
        if(char === ")" return {type: "RPARENTHESES", lexeme: char }
        if(char === ";" return {type: "SEMICOLON", lexeme: char }

        if(letters.test(char){
          swap += char
          iterador ++
          break
        }

        if(numbers.test(char){
            swap += char
            iterador ++
            break
        }

        if(swap !== null){
            if(keywords.includes(swap)){
              return {type: swap.toUppercase(), lexeme: swap}
            }

            if(letters.test(swap)){
              return {type: "IDENT", lexeme: swap}
            }

            if(numbers.test(swap)){
              return {type: "NUM", lexeme: swap}
            }
        }
        
      }
  }
  
}
