export function validateBirthday(birthday: string): boolean {
  if (!birthday) return false;

  const birthDate = new Date(birthday);
  if (isNaN(birthDate.getTime())) return false;

  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age >= 18;
}
