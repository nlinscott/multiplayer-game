import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IPlayerModel } from './model/PlayerModel';

@Injectable({
  providedIn: 'root'
})
export class RemotePlayerService {

  private players: IPlayerModel[];

  $onDisconnect : Subject<any>;
  $onConnect : Subject<IPlayerModel>;

  constructor() {
    this.$onDisconnect = new Subject<string>();
    this.$onConnect = new Subject<IPlayerModel>();

    this.players = new Array(0);
   }

  onPlayerUpdated(playerUpdate: IPlayerModel)
  {
    let player = this.players.find(p => p.id === playerUpdate.id);

    if(player !== undefined)
    {
      player.x = playerUpdate.x;
      player.y = playerUpdate.y;    
    }
  }

  onPlayerConnected(playerUpdate: IPlayerModel)
  {
    let player = this.players.find(p => p.id === playerUpdate.id);

    if(player === undefined)
    {
      this.players.push(playerUpdate)
      this.$onConnect.next(playerUpdate);
    }
  }

  onPlayerDisconnected(playerUpdate: IPlayerModel)
  {
    const index = this.players.findIndex(p => p.id === playerUpdate.id);

    this.players.splice(index, 1);

    this.$onDisconnect.next({id: playerUpdate.id, players:  this.players});
  }

}
