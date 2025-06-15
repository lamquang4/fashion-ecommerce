export function validatePhone(phone: string): boolean {
  const regex = /^0[1-9]\d{8,9}$/;
  return regex.test(phone);
}
