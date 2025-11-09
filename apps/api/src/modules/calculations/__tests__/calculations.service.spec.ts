import { CalculationsService } from '../calculations.service';

describe('CalculationsService', () => {
  const service = new CalculationsService();

  it('evaluates basic arithmetic with variables', () => {
    const result = service.evaluate('{{a}} + {{b}} * 2', { a: 3, b: 4 });
    expect(result).toEqual({ result: 11 });
  });

  it('throws when variable is missing', () => {
    expect(() => service.evaluate('{{total}} / 2', {} as Record<string, number>)).toThrow();
  });
});
