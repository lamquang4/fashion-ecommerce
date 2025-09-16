import bcryptjs from "bcryptjs";

export async function hashValue(value: string) {
  const salt = await bcryptjs.genSalt(10);
  const hashValue = await bcryptjs.hash(value, salt);
  return hashValue;
}
