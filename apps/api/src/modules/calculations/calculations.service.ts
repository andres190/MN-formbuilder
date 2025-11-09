import { BadRequestException, Injectable } from '@nestjs/common';

const SUPPORTED_OPERATORS = ['+', '-', '*', '/', '(', ')', '.'];

@Injectable()
export class CalculationsService {
  evaluate(expression: string, variables: Record<string, number>) {
    const sanitized = this.replaceVariables(expression, variables);
    this.assertAllowedTokens(sanitized);

    try {
      // eslint-disable-next-line no-new-func
      const result = Function(`"use strict"; return (${sanitized});`)();
      if (Number.isFinite(result)) {
        return { result };
      }
      throw new Error('Resultado no numérico');
    } catch (error) {
      throw new BadRequestException(`No se pudo evaluar la expresión: ${(error as Error).message}`);
    }
  }

  private replaceVariables(expression: string, variables: Record<string, number>) {
    return expression.replace(/{{\s*([a-zA-Z0-9_]+)\s*}}/g, (_, variable) => {
      if (!(variable in variables)) {
        throw new BadRequestException(`Variable no definida: ${variable}`);
      }
      return String(variables[variable]);
    });
  }

  private assertAllowedTokens(expression: string) {
    for (const char of expression) {
      if (char === ' ') {
        continue;
      }
      if (/[0-9]/.test(char)) {
        continue;
      }
      if (SUPPORTED_OPERATORS.includes(char)) {
        continue;
      }
      throw new BadRequestException(`Carácter no permitido en la expresión: ${char}`);
    }
  }
}
