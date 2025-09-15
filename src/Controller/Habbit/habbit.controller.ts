import { Request, Response } from "express";
import { PrismaClient } from "../../../generated/prisma/index.js";
const prisma = new PrismaClient();

export const createHabit = async (req: Request, res: Response) => {
  const { name, description, category, userId } = req.body;

  if (!name?.trim() || !description?.trim() || !category?.trim() || !userId?.trim()) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  try {
   
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    
    const habit = await prisma.habit.create({
      data: {
        name,
        description,
        category,
        user: {
          connect: { id: userId },
        },
      },
    });

    
    const today = new Date();
    today.setHours(0, 0, 0, 0); 

    let shouldIncrementStreak = false;

    if (!user.lastCheckIn || user.lastCheckIn < today) {
      
      shouldIncrementStreak = true;
    }

    if (shouldIncrementStreak) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          streak: { increment: 1 },
          lastCheckIn: new Date(), 
        },
      });
    }

    res.status(201).json({
      message: "Habit created successfully",
      habit,
      streakUpdated: shouldIncrementStreak,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};


export const getHabitByUserId = async (req: Request, res: Response) => {
  const { userId } = req.params;
  if (!userId?.trim()) {
    res.status(400).json({
      message: "All fields are required",
    });
    return;
  }
  try {
    const habits = await prisma.habit.findMany({
      where: {
        userId: userId,
      },
      select: {
        id: true,
        name: true,
        description: true,
        category: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!habits || habits.length === 0) {
      res.status(404).json({
        message: "No habits found",
      });
      return;
    }
    res.status(200).json({
      message: "Habits fetched successfully",
      habits: habits,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error,
    });
  }
};

export const getUserFeed = async (req: Request, res: Response) => {
  const { userId } = req.params;
  if (!userId?.trim()) {
    res.status(400).json({
      message: "All fields are required",
    });
    return;
  }

  try {
    const followees = await prisma.follow.findMany({
      where: { followerId: userId },
      select: { followeeId: true },
    });
    if (!followees || followees.length === 0) {
      res.status(404).json({
        message: "No followees found",
      });
      return;
    }

    const followeeIds = followees.map((f) => f.followeeId);

    const habits = await prisma.habit.findMany({
      where: {
        userId: {
          in: [userId, ...followeeIds],
        },
      },
      include: {
        user: {
          select: {
            id: true,
            userName: true,
            userBio: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    if (!habits || habits.length === 0) {
      res.status(404).json({
        message: "No habits found",
      });
      return;
    }

    res.status(200).json({
      message: "Habits fetched successfully",
      habits: habits,
    });
  } catch (error) {}
};
