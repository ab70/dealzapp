import authRoute from "./authRoute/authRoute"
function initRoutes(app: any) {
    app.use('/api/auth', authRoute)

}

export default initRoutes;