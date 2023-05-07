import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//Generar HASH
export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

//Validar el password con la que esta en la DB como hash
export const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

export default __dirname;
