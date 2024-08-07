import authControllers from "../../controllers/auth/authController";
import express from "express"
const router = express.Router()

router.post("/signup", authControllers().signUp)


export default router