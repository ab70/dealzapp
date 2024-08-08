import { Request, Response } from "express"
import { login_func, signUp_func } from "./authHelper";
function authControllers() {
    return {
        // signup
        async signUp(req: Request, res: Response) {
            try {
                const result = await signUp_func(req.body)
                return res.status(result?.success ? 200 : 400).json(result)
            } catch (err: any) {
                return res.status(500).json({ success: false, message: err.message })
            }
        },
        // signin  func
        async signIn(req: Request, res: Response) {
            try {
                const result = await login_func(req.body)
                return res.status(result?.success ? 200 : 400).json(result)
            } catch (err: any) {
                return res.status(500).json({ success: false, message: err.message })
            }
        }
    }
}
export default authControllers;