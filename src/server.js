import { randomUUID } from 'crypto'
import http from 'http'
import { Readable } from 'stream'

function * run () {
    for(let index = 0; index <=99; index ++){
        const data ={
            id: randomUUID(),
            name: `Alexandre-${index}`
        }
        yield data
    }
}

async function handler(request, response){
    const readable =new Readable({
        read(){
            for(const data of run()){
                console.log(`sending `, data)
                this.push(JSON.stringify(data)+ "\n")
            }
            // para informar que os dados acabaram
            this.push(null)
        }
    })

    //requeste é uma readable stream e a response é uma writable stream
    readable
        .pipe(response)
}

http.createServer(handler)
.listen(3000)
.on('listening', ()=> console.log('server running at 3000'))