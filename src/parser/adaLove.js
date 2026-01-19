

export class Parser{
    
    static stackTree = []


    static pushToken(token){
        this.stackTree.push(token)
    }

    static popToken(){
        this.stackTree.pop()
    }

    static processCode(){

        let itarator = 0
        let state = 0
        let pointer = ""

        while(itarator < this.stackTree.length){

            pointer = this.stackTree[iterator]

            switch(state){

                case 0: 
                    if(pointer=== "program"){
                        this.popToken()
                        this.pushToken("table_decl")
                        state = 1
                        itarator++
                    }
                break

                case 1: 
                    if(pointer === "table_decla"){
                        this.popToken()
                        state = 2
                        itarator++
                    }
                break

                case 2:
                    if(pointer === "table"){
                        this.popToken()
                        state = 3
                        itarator++
                    }
                    else {
                        throw new Error("Expected 'table' keyword recibed ->",pointer)
                    }
                break

            }

        }
    }
    

}