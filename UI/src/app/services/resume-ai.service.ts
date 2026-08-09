import { Injectable } from '@angular/core';
import { marked } from 'marked';

export interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  htmlContent?: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class ResumeAiService {
  constructor() {
    marked.setOptions({
      gfm: true,
      breaks: true
    });
  }

  public async getAiResponse(query: string) {
    const response = await fetch('http://localhost:3000/api/resume-ai/ask',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          question: query
        })
      }
    );

    return response.json();
  }

  renderMarkdown(markdown: string): string {
    const html = marked.parse(markdown) as string;

    const parser = new DOMParser();
    const document = parser.parseFromString(html, 'text/html');

    document.querySelectorAll('a').forEach(link => {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    });

    return document.body.innerHTML;
  }
}