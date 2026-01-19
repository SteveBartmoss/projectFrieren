

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

    

}