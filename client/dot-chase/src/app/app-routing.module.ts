import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameCanvasComponent } from './game-canvas/game-canvas.component';

const routes: Routes = [
  {
    path:'',
    component: GameCanvasComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
