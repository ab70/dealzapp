import * as bcrypt from 'bcrypt'
import User from '../../models/User';

const signUp_func = async (data:any) => {
    try {
        console.log("data",data);
        
        // Check if the user already exists
        const existingUser = await User.findOne({ where: { email: data.email } });
        if (existingUser) {
            throw new Error('User with this email already exists');
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

        return { success: true, user: newUser };
    } catch (err: any) {
        throw new Error(err.message);
    }
};


export {
    signUp_func
}