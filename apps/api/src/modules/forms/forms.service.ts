import { Injectable } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { CreateFormDto } from './types/create-form.dto';

@Injectable()
export class FormsService {
  private readonly forms: Record<string, CreateFormDto & { id: string }> = {};

  create(dto: CreateFormDto) {
    const id = randomUUID();
    this.forms[id] = { id, ...dto };
    return this.forms[id];
  }

  findAll() {
    return Object.values(this.forms);
  }

  findOne(id: string) {
    return this.forms[id];
  }
}
