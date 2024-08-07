import { Request, Response } from "express"
import { signUp_func } from "./authHelper";
function authControllers() {
    return {
        // signup
        async signUp(req: Request, res: Response) {
            try {
                console.log(req.body);
                
                const result = await signUp_func(req.body)
            } catch (err: any) {
                return res.status(500).json({ success: false, message: err.message })
            }
        }
    }
}
export default authControllers;