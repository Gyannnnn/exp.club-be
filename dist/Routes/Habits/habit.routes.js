import { Router } from "express";
const habitRouter = Router();
import { userAuthValidation } from "../../middleware/userAuth.middleware.js";
import { createHabit, getHabitByUserId, getUserFeed } from "../../Controller/Habbit/habbit.controller.js";
habitRouter.post("/create", userAuthValidation, createHabit);
habitRouter.get("/getByUserId/:userId", userAuthValidation, getHabitByUserId);
habitRouter.get("/getuserfeed/:userId", userAuthValidation, getUserFeed);
export default habitRouter;
//# sourceMappingURL=habit.routes.js.map