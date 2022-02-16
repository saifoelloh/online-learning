import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const APP_SALT_ROUND: string = process.env.APP_SALT_ROUND || "5";

const generateSalt = () => bcrypt.genSaltSync(parseInt(APP_SALT_ROUND));

const HashPassword = (plainPassword: string) => {
  const salt = generateSalt();
  const password = bcrypt.hashSync(plainPassword, salt);
  return password;
};

const ComparePassword = (plainPassword: string, hashedPassword: string) =>
  bcrypt.compareSync(plainPassword, hashedPassword);

export { HashPassword, ComparePassword };
