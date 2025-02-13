import { Component, inject } from '@angular/core';
import { ChatbotService } from '../service/chatbot.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormatmsgPipe } from "../formatmsg.pipe";

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule, FormatmsgPipe],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.scss'
})
export class ChatbotComponent {
  prompt: string = '';

  geminiService: ChatbotService = inject(ChatbotService);
  isLoading:boolean=true;
  loading: boolean = false;

  chatHistory: any[] = [];
  constructor() {
    this.geminiService.getMessageHistory().subscribe((res:any) => {
      if(res) {
        this.chatHistory.push(res);
      }
    })
  }
  async sendData() {
    if(this.prompt && !this.loading) {
      this.loading = true;
      const data = this.prompt;
      this.prompt = '';
      await this.geminiService.generateText(data);
      this.loading = false;
    }
  }

  formatText(text: string) {
    const result = text.replaceAll('*', '<br>');
    return result;
  }
}
