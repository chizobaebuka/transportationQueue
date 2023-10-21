import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const generateSalt = async () => {
    return await bcrypt.genSalt();
};

export const hashPassword = async (password: string, salt: string) => {
    return await bcrypt.hash(password, salt);
};

export const generateToken = async (id: string) => {
    return await jwt.sign({ id }, `${process.env.APP_SECRET}`, { expiresIn: "1d" });
};
