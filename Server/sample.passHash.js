import bcrypt from "bcryptjs";

const hash = await bcrypt.hash("Temp123", 10);
console.log(hash);