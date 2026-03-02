import bcrypt from "bcryptjs";

// Put your pass here and paste it in env 
const hash = await bcrypt.hash("", 10);
console.log(hash);