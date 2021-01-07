import { Component, Inject, OnInit, Optional, ViewEncapsulation } from '@angular/core';
import { MessageConfig, _MESSAGE_CONFIG, _MESSAGE_DEFAULT_CONFIG } from './message-config';
import { MessageDataFilled, MessageDataOptions } from './message.definitions';

@Component({
  selector: 'pg-message-container',
  encapsulation: ViewEncapsulation.None,
  template: `
    <div
      *ngIf="currentMessage"
      class="pgn-wrapper"
      [class.hide]="messages.length == 0"
      [attr.data-position]="currentMessage.options.Position"
      [ngStyle]="style"
      (mouseenter)="isPause = true"
      (mouseleave)="isPause = false">
      <pg-message
        *ngFor="let message of messages; let i = index"
        [Message]="message"
        [Index]="i"
        [IsPause]="isPause"
        [ClickContentSubject]="message.options?.ClickContentSubject">
      </pg-message>
    </div>
  `,
  styleUrls: [],
})
export class MessageContainerComponent {
  messages: MessageDataFilled[] = [];
  currentMessage = null;
  style;
  config: MessageConfig;
  private isPause = false;

  constructor(
    @Optional() @Inject(_MESSAGE_DEFAULT_CONFIG) defaultConfig: MessageConfig,
    @Optional() @Inject(_MESSAGE_CONFIG) config: MessageConfig
  ) {
    this.config = { ...defaultConfig, ...config };
  }

  // Create a new message
  createMessage(message: MessageDataFilled): void {
    const el = window.document.querySelector('.header ');
    if (el) {
      const rect = el.getBoundingClientRect();
      this.style = {
        marginTop: rect.height + 'px',
      };
    }
    this.currentMessage = message;
    if (this.messages.length >= this.config.MaxStack) {
      this.messages.splice(0, 1);
    }
    message.options = this._mergeMessageOptions(message.options);
    this.messages.push(message);
  }

  // Remove a message by messageId
  removeMessage(messageId: string): void {
    this.messages.some((message, index) => {
      if (message.messageId === messageId) {
        this.messages.splice(index, 1);
        return true;
      }
    });
  }

  // Remove all messages
  removeMessageAll(): void {
    this.messages = [];
  }

  // Merge default options and cutom message options
  protected _mergeMessageOptions(options: MessageDataOptions): MessageDataOptions {
    const defaultOptions: MessageDataOptions = {
      Duration: this.config.Duration,
      Animate: this.config.Animate,
      PauseOnHover: this.config.PauseOnHover,
    };
    return { ...defaultOptions, ...options };
  }
}
