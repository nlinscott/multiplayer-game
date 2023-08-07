import { Component, ElementRef, HostListener, Input, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClampProviderService } from '../clamp-provider.service';
import { IPlayerModel } from '../model/PlayerModel';
import { Player } from '../player';
import { RemotePlayerService } from '../remote-player.service';
import { WsClientService } from '../ws-client.service';

export class InputState{
  downPressed: boolean;
  upPressed: boolean;
  leftPressed: boolean;
  rightPressed: boolean;
}

@Component({
  selector: 'app-game-canvas',
  templateUrl: './game-canvas.component.html',
  styleUrls: ['./game-canvas.component.scss']
})
export class GameCanvasComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;
  private requestId;
  private interval;
  private player: Player;

  private connectSub: Subscription;

  private players: Player[];

  private inputState: InputState = new InputState();

  constructor(private ngZone: NgZone, 
    private clampService: ClampProviderService, 
    private playerSync: WsClientService,
    private remotePlayers: RemotePlayerService) 
    {
    }

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.players = new Array(0);
    this.remotePlayers.$onConnect.subscribe(p =>
    {
        if(p.id === this.player.getData().id)
        {
          return;
        }

        const player = new Player( this.ctx, this.clampService.getClamp(), 'blue', p);
        this.players.push(player);
    });

    this.remotePlayers.$onDisconnect.subscribe(disconnectedData =>
    {
        const id: string = disconnectedData.id;
        let player = this.players.find(p => p.getData().id === id);
        
        if(player !== undefined)
        {
          player.clear();

          const index = this.players.findIndex(p => p.getData().id === id);

          this.players.splice(index, 1);
        }
    });

    this.connectSub = this.playerSync.connect(p => this.createAndStart(p));
  }

  createAndStart(player: IPlayerModel)
  {
    this.player = new Player(this.ctx, this.clampService.getClamp(), 'red', player);
    console.log(player.id);
    this.ngZone.runOutsideAngular(() => this.tick());

    setInterval(() => {
      this.tick();
    }, 16); //~60fps

    this.connectSub.unsubscribe();
  }
  
  tick() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.requestId = requestAnimationFrame(() => this.tick);

    if(this.inputState.downPressed)
    {
      this.player.moveDown();
    }

    if(this.inputState.upPressed)
    {
      this.player.moveUp();
    }

    if(this.inputState.leftPressed)
    {
      this.player.moveLeft();
    }

    if(this.inputState.rightPressed)
    {
      this.player.moveRight();
    }

    this.player.update();

    if(this.player.hasDataChanged()){
      this.playerSync.sendUpdate(this.player.getData());
    }

    this.players.forEach(p =>
    {
        p.update();
    });
  }

  private isKeyDownEvent(event:KeyboardEvent){
      return event.type === "keydown";
  }
  
  @HostListener('window:keyup', ['$event'])
  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {

    const key = event.key.toLocaleLowerCase();

    const pressed = this.isKeyDownEvent(event);

    if (key === "arrowleft" )
    {
      this.inputState.leftPressed = pressed;
    }
    
    if (key === "arrowright" )
    {
      this.inputState.rightPressed = pressed;
    }
    
    if (key === "arrowup" )
    {     
       this.inputState.upPressed = pressed;
    }
    
    if (key === "arrowdown" )
    {
      this.inputState.downPressed = pressed;
    }
  }

  disconnect(){

    this.playerSync.disconnect(this.player.getData());
    
    clearInterval(this.interval);
    cancelAnimationFrame(this.requestId);
  }
}
