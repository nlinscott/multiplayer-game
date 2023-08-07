import { IPlayerModel } from "./model/PlayerModel";
import { PositionClamp } from "./positionClamp";

export class Player
{
  private width = 30;

  private movementIncrement = 5;

  private previous: IPlayerModel;

  private canUpdate = true;
  
  constructor(private ctx: CanvasRenderingContext2D, 
              private clamp: PositionClamp, 
              private color: string, 
              private data: IPlayerModel) 
  {
    this.previous = data;
  }
  

  getData(): IPlayerModel{
    return this.data;
  } 

  clear(){
      this.ctx.clearRect(this.data.x, this.data.y, this.width, this.width);
      this.canUpdate = false;
  }

  moveRight() {
    this.data.x += this.movementIncrement;
    this.data.x = this.clamp.clampX(this.data.x);
  }

  moveLeft(){
    this.data.x -= this.movementIncrement;
    this.data.x = this.clamp.clampX(this.data.x);
  }

  moveUp(){
    this.data.y -= this.movementIncrement;
    this.data.y = this.clamp.clampY(this.data.y);
  }

  moveDown(){
    this.data.y += this.movementIncrement;
    this.data.y = this.clamp.clampY(this.data.y);
  }

  hasDataChanged(): boolean{
      return this.previous.x == this.data.x &&
             this.previous.y == this.data.y;
  }

  update() {

    if(!this.canUpdate)
    {
      return;
    }

    if(!this.hasDataChanged())
    {
      return;
    }

    this.ctx.fillStyle = this.color;
    this.ctx.fillRect( this.data.x, this.data.y, this.width, this.width);

    this.previous.x = this.data.x;
    this.previous.y = this.data.y;
  }
}