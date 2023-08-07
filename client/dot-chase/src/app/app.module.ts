import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClampProviderService } from './clamp-provider.service';
import { GameCanvasComponent } from './game-canvas/game-canvas.component';
import { RemotePlayerService } from './remote-player.service';
import { WsClientService } from './ws-client.service';

@NgModule({
  declarations: [
    AppComponent,
    GameCanvasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ClampProviderService, RemotePlayerService, WsClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
