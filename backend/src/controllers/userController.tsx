import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { generateSalt, hashPassword, generateToken } from '../utils/utils';
import User from '../models/user'; 

export const createUser = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const mainUser = await User.findOne({ email });

        if (mainUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const salt = await generateSalt();
        const hashedPassword = await hashPassword(password, salt);

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        if (newUser) {
            return res.status(200).json({ message: 'User successfully created' });
        } else {
            return res.status(400).json({ message: "Couldn't create the user" });
        }
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'You do not have an account, please sign up' });
        }

        const validate = await bcrypt.compare(password, user.password);

        if (!validate) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(user.id);
        res.cookie('token', token);

        return res.status(200).json({
            message: 'Login successful',
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        });
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id; // Assuming you're passing the user ID in the URL parameter
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Omit the password field for security reasons
        const userData = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        };

        return res.status(200).json(userData);
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const { firstName, lastName, email, password } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user data
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;

        if (password) {
            // If a new password is provided, update it
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
        }

        await user.save();

        // Omit the password field for security reasons
        const userData = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        };

        return res.status(200).json(userData);
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;
        const user = await User.findByIdAndRemove(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};