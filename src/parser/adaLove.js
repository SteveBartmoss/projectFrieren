

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

}