import { AppUserModel } from './app-user-model';

export class ChatMessageModel {
  id: number;
  message: string;
  owner: AppUserModel;
  messageDatetime: Date;
}
