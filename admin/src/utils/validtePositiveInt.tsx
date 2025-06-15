export function validatePositiveInt(value: number): boolean {
  return Number.isInteger(value) && value > 0;
}
