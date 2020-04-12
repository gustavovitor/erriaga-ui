import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ChatMessageModel } from '../models/chat-message-model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private httpClient: HttpClient) { }

  URL = environment.URL_CHAT;

  insert(message: string): Promise<ChatMessageModel> {
    return this.httpClient.post<ChatMessageModel>(this.URL, { message }).toPromise();
  }

  async findAllMessages(page = 0): Promise<PageableResponse<ChatMessageModel>> {
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('size', '10');

    return await this.httpClient.get<PageableResponse<ChatMessageModel>>(this.URL, {params}).toPromise();
  }
}

class PageableResponse<T> {
  content: Array<T>;
  last: boolean;
}
