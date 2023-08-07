import { Subject, Subscription } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

export class Payload<TData>{
    code: string;
    data: TData
}

export class WebSocketClient<TData>
{
    private socket: WebSocketSubject<any> | undefined;

    private subject : Subject<Payload<TData>> = new Subject<Payload<TData>>();

    constructor(endpoint: string){

        this.socket = webSocket({
            url: endpoint, 
            serializer: msg => msg,
            deserializer: ({data}) => data
        });

        this.socket.subscribe(dataFromServer =>
        {
            const code = dataFromServer.substr(0, 2);
            const dataStr = dataFromServer.substr(2, dataFromServer.length - 2);
            var data : TData = JSON.parse(dataStr) as TData;
            const payload = new Payload<TData>();

            payload.code = code;
            payload.data = data;

            this.subject.next(payload);
        },
        err =>
        {
            console.log(err);
        });
    }

    shutdown(){
        if(this.socket != null && !this.socket.closed)
        {
            this.socket.complete();
        }
    }

    subscribe(callback: (p: Payload<TData>) => void): Subscription{
        return this.subject.subscribe(callback);
    }

    sendMessage(msg : string): void{
        if(this.socket != null && !this.socket.closed)
        {
            this.socket.next(msg);
        }
    }
}