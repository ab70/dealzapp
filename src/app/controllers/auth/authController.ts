import { Request, Response } from "express"
import { signUp_func } from "./authHelper";
function authControllers() {
    return {
        // signup
        async signUp(req: Request, res: Response) {
            try {
                const result = await signUp_func(req.body)
                return res.status(200).json(result)
            } catch (err: any) {
                return res.status(500).json({ success: false, message: err.message })
            }
        },
        async signIn(req: Request, res: Response) {
            try {

            } catch (err: any) {
                return res.status(500).json({ success: false, message: err.message })
            }
        }
    }
}
export default authControllers;