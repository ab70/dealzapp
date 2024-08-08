import * as bcrypt from 'bcrypt'
import * as jwt from "jsonwebtoken"
import User, { UserAttributes } from '../../models/User';

const signUp_func = async (data: UserAttributes) => {
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email: data.email } });
        if (existingUser) {
            return { success: false, message: "User Exists>>>" }
        }

        // Hash the password
        const hashedPassword = await bcrypt.hashSync(data.password, 10);

        // Create a new user
        const newUser = await User.create({
            username: data.username,
            email: data.email,
            password: hashedPassword,
            userType: data.userType,
            vendorId: data.vendorId
        });

        return { success: true, message: "Register done", user: newUser };
    } catch (err: any) {
        return { success: false, message: err.message }
    }
};

const login_func = async (data: { email: string, password: string }) => {
    try {
        // Find the user by email
        const user = await User.findOne({ where: { email: data.email } });
        if (!user) {
            return { success: false, message: "User not found" };
        }
        const isPasswordValid = await bcrypt.compareSync(data.password, user.password);
        if (!isPasswordValid) {
            return { success: false, message: "Invalid credentials" };
        }
        // If needed, generate and return a JWT token here
        const token = jwt.sign({ userId: user.id }, "SECRETKEY")
        console.log("Token", token);

        return { success: true, message: "Successfully logged in", data: token };
    } catch (err: any) {
        return { success: false, message: err.message };
    }
};
export {
    signUp_func,
    login_func
}