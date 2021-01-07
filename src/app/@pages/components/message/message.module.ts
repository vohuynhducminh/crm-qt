import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { _MESSAGE_DEFAULT_CONFIG_PROVIDER } from './message-config';
import { MessageContainerComponent } from './message-container.component';
import { MessageComponent } from './message.component';

@NgModule({
  imports: [
    CommonModule,
    OverlayModule,
  ],
  declarations: [
    MessageContainerComponent,
    MessageComponent,
  ],
  providers: [
    _MESSAGE_DEFAULT_CONFIG_PROVIDER,
  ],
  entryComponents: [
    MessageContainerComponent,
  ],
})
export class MessageModule { }
