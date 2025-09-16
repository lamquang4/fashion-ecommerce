import bcryptjs from "bcryptjs";

export async function compareValue(value: string, hashedValue: string) {
  return await bcryptjs.compare(value, hashedValue);
}
