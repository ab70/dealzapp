import * as bcrypt from 'bcrypt'
import User from '../../models/User';

const signUp_func = async (data:any) => {
    try {
        console.log("data",data);
        
        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email: data.email } });
        if (existingUser) {
            return {success: false, message: "User Exists>>>"}
        }

        // Hash the password
        const hashedPassword = await bcrypt.hashSync(data.password, 10);

        // Create a new user
        const newUser = await User.create({
            username: data.username,
            email: data.email,
            password: hashedPassword,
            userType: data.userType,
            vendorId: data.vendorId || null
        });

        return { success: true, message:"Register done", user: newUser };
    } catch (err: any) {
        return {success: false, message: err.message}
    }
};

const login_func = async (data: { email: string, password: string }) => {
    try {
        // Find the user by email
        const user  = await User.findOne({ where: { email: data.email } });
        if (!user) {
            throw new Error('User not found');
        }

        // Compare the password with the hashed password in the database
        const isPasswordValid = await bcrypt.compareSync(data.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }
        // If needed, generate and return a JWT token here
        return { success: true, user };
    } catch (err: any) {
        throw new Error(err.message);
    }
};
export {
    signUp_func,
    login_func
}