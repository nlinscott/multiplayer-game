import { Injectable } from '@angular/core';
import { PositionClamp } from './positionClamp';

const playerDiameter = 30;

const canvasDimensions = 600;

@Injectable({
  providedIn: 'root'
})
export class ClampProviderService {

  constructor() { }

  getClamp(): PositionClamp
  {
    //the canvas is a perfect square and so is the player
    const maxPosition = canvasDimensions - playerDiameter;

    return new PositionClamp(maxPosition, 0, maxPosition, 0);
  }
}
