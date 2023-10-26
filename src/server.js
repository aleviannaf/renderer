import http from 'http'
import { Readable } from 'stream'

async function handler(request, response){
    const readable =new Readable({
        read(){
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