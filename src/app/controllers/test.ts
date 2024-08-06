import { Request, Response } from "express"
function testController() {
    return {
        // test
        async test(req: Request, res: Response) {
            try {
                
            } catch (error: any) {
                return res.status(500).json({ success: false, message: error.message })
            }
        }
    }
}