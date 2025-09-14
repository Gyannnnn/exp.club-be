import { Router } from "express";
const userRouter = Router();

import { userAuthValidation } from "../../middleware/userAuth.middleware.js";

import {
  followUser,
  getAllUsers,
  getUser,
  unFollowUser,
} from "../../Controller/User/user.controller.js";

userRouter.get("/all", userAuthValidation, getAllUsers);
userRouter.get("/getbyemail/:email", userAuthValidation, getUser);
userRouter.post("/follow", userAuthValidation, followUser);
userRouter.delete("/unfollow", userAuthValidation, unFollowUser);

export default userRouter;
