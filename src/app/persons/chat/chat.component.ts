import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { inOutOpacityAnimation } from '../../shared/animations/animations';
import { ChatService } from '../../services/chat.service';
import { ChatMessageModel } from '../../models/chat-message-model';
import { ErrorHandlerService } from '../../services/error-handler.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  animations: [inOutOpacityAnimation]
})
export class ChatComponent implements OnInit, AfterViewInit {

  constructor(private chatService: ChatService,
              private errorHandlerService: ErrorHandlerService) { }

  message: string;
  showChat = false;
  loading = false;

  messages: Array<ChatMessageModel> = [];

  ngOnInit(): void {
    this.loadMessages();
    setInterval(() => {
      this.findNewMessages();
    }, 5000);
  }

  async loadMessages(page = 0) {
    const messages = (await this.chatService.findAllMessages(page));
    if (messages.length > 0) {
      this.messages = messages.concat(this.messages);
    }
  }

  async findNewMessages() {
    let messages = (await this.chatService.findAllMessages());
    if (messages.length > 0) {
      if (this.messages.length !== 0) {
        messages = messages.slice(messages.findIndex(msg => msg.id === this.messages[this.messages.length - 1].id), messages.length);
      }
      if (messages.length > 0) {
        this.messages = this.messages.concat(messages.slice(1, messages.length));
        this.updateScroll();
      }
    }
  }

  ngAfterViewInit(): void {
  }

  updateScroll() {
    setTimeout(() => {
      const el: HTMLElement = document.getElementById('chatMessages');
      el.scrollTop = Math.max(0, el.scrollHeight - el.offsetHeight);
    });
  }

  async insertMessage() {
   try {
     this.loading = true;
     const chatMessageModel = await this.chatService.insert(this.message);
     if (chatMessageModel) {
       this.message = null;
       this.messages.push(chatMessageModel);
     }
     this.loading = false;
   } catch (e) {
     if (e.error) {
       this.errorHandlerService.handler(e.error);
     }
   }
  }

}
