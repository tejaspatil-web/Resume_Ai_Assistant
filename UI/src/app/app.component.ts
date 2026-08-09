import { AfterViewInit, Component, ElementRef, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResumeAiService, Message } from './services/resume-ai.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  messages = signal<Message[]>([]);
  inputText = signal<string>('');
  isLoading = signal<boolean>(false);

  suggestions = [
    "Tell me about yourself",
    "Summarize your professional experience",
    "Describe your projects",
    "What technologies do you know?",
    "What AI applications have you built?",
    "What is your tech stack and security experience?"
  ];

  constructor(private resumeAiService: ResumeAiService) {}

  ngAfterViewInit(): void {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollTop = 0;
    }
  }

  scrollToBottom(): void {
    try {
      if (this.scrollContainer) {
        const el = this.scrollContainer.nativeElement;
        el.scrollTop = el.scrollHeight;
      }
    } catch (err) {}
  }

  async sendQuery(queryText?: string) {
    const textToSend = queryText || this.inputText();
    if (!textToSend.trim() || this.isLoading()) return;

    const userMsg: Message = {
      id: Math.random().toString(36).substring(2, 9),
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    this.messages.update(msgs => [...msgs, userMsg]);
    if (!queryText) {
      this.inputText.set('');
    }

    this.isLoading.set(true);
    // Scroll down immediately after the user message renders
    setTimeout(() => this.scrollToBottom(), 50);

    try {
      const rawResponse:any = await this.resumeAiService.getAiResponse(textToSend);
      const htmlContent = this.resumeAiService.renderMarkdown(rawResponse?.answer || "");

      const aiMsg: Message = {
        id: Math.random().toString(36).substring(2, 9),
        sender: 'ai',
        text: rawResponse,
        htmlContent: htmlContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      this.messages.update(msgs => [...msgs, aiMsg]);
    } catch (error) {
      const errorMsg: Message = {
        id: Math.random().toString(36).substring(2, 9),
        sender: 'ai',
        text: "An error occurred while generating the response.",
        htmlContent: "<p>An error occurred while generating the response.</p>",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      this.messages.update(msgs => [...msgs, errorMsg]);
    } finally {
      this.isLoading.set(false);
      setTimeout(() => this.scrollToBottom(), 50);
    }
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendQuery();
    }
  }

  copyToClipboard(message:any) {
    navigator.clipboard.writeText(message?.text?.answer || "");
  }

  regenerateLastResponse() {
    const currentMsgs = this.messages();
    if (currentMsgs.length < 2 || this.isLoading()) return;
    
    for (let i = currentMsgs.length - 1; i >= 0; i--) {
      if (currentMsgs[i].sender === 'user') {
        const lastUserText = currentMsgs[i].text;
        this.messages.update(msgs => msgs.slice(0, i));
        this.sendQuery(lastUserText);
        break;
      }
    }
  }

  autoResize(textarea: HTMLTextAreaElement): void {
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }
}