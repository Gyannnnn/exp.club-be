import { Router } from "express";
const authRouter = Router();
import { signUp, signIn } from "../../Controller/Auth/auth.controller.js";
authRouter.post("/signin", signIn);
authRouter.post("/signup", signUp);
export default authRouter;
//# sourceMappingURL=auth.routes.js.map