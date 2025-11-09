import fetch, { type RequestInit } from 'cross-fetch';

export interface FormBuilderClientOptions {
  baseUrl: string;
  apiKey?: string;
}

export class FormBuilderClient {
  constructor(private readonly options: FormBuilderClientOptions) {}

  async listForms() {
    return this.request('/forms');
  }

  async createForm<TBody extends Record<string, unknown>>(body: TBody) {
    return this.request('/forms', {
      method: 'POST',
      body: JSON.stringify(body)
    });
  }

  async evaluateCalculation(body: { expression: string; variables: Record<string, number> }) {
    return this.request('/calculations/evaluate', {
      method: 'POST',
      body: JSON.stringify(body)
    });
  }

  private async request(path: string, init?: RequestInit) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };

    if (this.options.apiKey) {
      headers.Authorization = `Bearer ${this.options.apiKey}`;
    }

    const response = await fetch(`${this.options.baseUrl}${path}`, {
      ...init,
      headers: {
        ...headers,
        ...(init?.headers as Record<string, string> | undefined)
      }
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${text}`);
    }

    return response.json();
  }
}
