

export class Parser{

    constructor(tokens){
        this.tokens = tokens
        this.position = 0
    }

    static peek(){
        return this.tokens[this.position]
    }

    static consume(expected){
        const heap = this.peek()
        if(heap === expected){
            this.position++
            return heap
        }
        throw new Error(`Expected ${expected} got ${token.type}`)
    }

    static parseProgram(){

        const tables = []

        while(this.peek().type === "TABLE"){
            tables.push(this.parseTableDecl())
        }

        this.consume("EOF")
        return {type: "Program", tables}
    }

    static parseTableDecl(){
        this.consume("TABLE")
        
        const name = this.consume("IDENT").lexeme

        this.consume("LBRACE")

        const columns = []
        const relations = []

        while(this.peek().type === "IDENT" || this.peek().type === "RELATION"){
            const item = this.parseTableItem()
            if(item.kind === "column") columns.push(item)
            else relation.push(item)
        }

        this.consume("RBRACE")
        this.consume("SEMICOLON")


        return {
            kind: "Table",
            name,
            columns,
            relations
        }

    }

    static parseTableItem(){
        if(this.peek().type === "IDENT"){
            return this.parseColumnDecl()
        }

        if(this.peek().type === "RELATION"){
            return this.parseRelationDecl()
        }

        throw new Error("Expected column or relation")
    }

    static parseColumnDecl(){

        const name = this.consume("IDENT").lexeme
        const type = this.parseType()
        const size = this.parseColumnSize()

        const modifiers = []
        while(this.isModifier(this.peek().type)){
            modifiers.push(this.consume(this.peek().type).type)
        }

        this.consume("SEMICOLON")

        return {
            kind: "Column",
            name,
            type,
            size,
            modifiers,
        }
    }


    static parseColumnSize(){
        if(this.peek().type === "LPARENTHESES"){
            this.consume("LPARENTHESES")
            const size = Number(this.consume("NUM").lexeme)
            this.consume("RPARENTHESES")
            return size
        }
        return null 
    }

    static isModifier(type){
        return [
            "INCREMENT",
            "NULL",
            "NOT_NULL",
            "PRIMARY"
        ].includes(type)
    }

    static parseType(){
        if(this.peek().type === "INT"){
            this.consume("INT")
            return "int"
        }
        if(this.peek().type === "STRING"){
            this.consume("STRING")
            return "string"
        }
        throw new Error("Expected type")
    }


    static parseRelationDecl(){

        this.consume("RELATION")

        const name = this.consume("IDENT").lexeme

        this.consume("LPARENTHESES")
        const localColumn = this.consume("IDENT").lexeme
        this.consume("RPARENTHESES")

        this.consume("TO")

        this.consume("LPARENTHESES")
        const targetColumn = this.consume("IDENT").lexeme
        this.consume("RPARENTHESES")

        this.consume("SEMICOLON")

        return {
            kind: "relation",
            name,
            localColumn,
            targetTable,
            targetColumn,
        }
    }
}