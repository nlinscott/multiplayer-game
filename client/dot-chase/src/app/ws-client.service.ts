import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { IPlayerModel } from './model/PlayerModel';
import { RemotePlayerService } from './remote-player.service';
import { Payload, WebSocketClient } from './webSocketClient';

const SYNC_ENDPOINT = 'ws://localhost:9100/sync';

const CONNECTED = "aa";
const UPDATED = "ab";
const DISCONNECTED = "ac";

const CONNECTME = "ad";

@Injectable({
  providedIn: 'root'
})
export class WsClientService  {

  private playersyncSocket: WebSocketClient<IPlayerModel>;

  private connectSubject: Subject<IPlayerModel> = new Subject<IPlayerModel>();

  constructor(private playerService: RemotePlayerService) {

    this.playersyncSocket = new WebSocketClient<IPlayerModel>(SYNC_ENDPOINT);

    this.playersyncSocket.subscribe(p => this.checkMessage(p));
  }

  private checkMessage(payload: Payload<IPlayerModel>){

    if(payload.code === CONNECTME)
    {
      this.connectSubject.next(payload.data);
    }
    if(payload.code === CONNECTED)
    {
      this.playerService.onPlayerConnected(payload.data);
    }
    else if(payload.code === UPDATED)
    {
      this.playerService.onPlayerUpdated(payload.data);
    }
    else if(payload.code === DISCONNECTED)
    {
      this.playerService.onPlayerDisconnected(payload.data);
    }
  }

  sendUpdate(update: IPlayerModel){

    const msg = UPDATED + JSON.stringify(update);

    this.playersyncSocket.sendMessage(msg);
  }

  connect(callback: (p: IPlayerModel) => void): Subscription
  {
    this.playersyncSocket.sendMessage(CONNECTME);
    
    return this.connectSubject.subscribe(p => callback(p));
  }

  disconnect(disconnectMe: IPlayerModel)
  {
    const msg = DISCONNECTED + JSON.stringify(disconnectMe);
    this.playersyncSocket.sendMessage(msg);
  }

  onDestroy(): void{
    this.playersyncSocket.shutdown();
  }
}
