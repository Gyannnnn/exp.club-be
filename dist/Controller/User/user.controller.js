import { PrismaClient } from "../../../generated/prisma/index.js";
const prisma = new PrismaClient();
export const getUser = async (req, res) => {
    const { email } = req.params;
    if (!email || email.trim() === "") {
        res.status(400).json({
            message: "All fields are required",
        });
        return;
    }
    try {
        const user = await prisma.user.findFirst({
            where: {
                userEmail: email,
            },
            select: {},
        });
        if (!user) {
            res.status(400).json({
                message: "No users found",
            });
            return;
        }
        res.status(200).json({
            message: "User fetched",
            user: user,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error,
        });
    }
};
export const getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        if (!users || users.length === 0) {
            res.status(404).json({
                message: "No users found",
            });
            return;
        }
        res.status(200).json({
            message: "Users fetched successfully",
            users: users,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error,
        });
    }
};
export const followUser = async (req, res) => {
    const { followerId, followeeId } = req.body;
    if (!followerId?.trim() || !followeeId?.trim()) {
        res.status(400).json({
            message: "All fields are required",
        });
    }
    try {
        if (followeeId === followerId) {
            res.status(400).json({
                message: "Cannot follow yourself",
            });
            return;
        }
        const response = prisma.follow.create({
            data: { followerId, followeeId },
        });
        if (!response) {
            res.status(400).json({
                message: "Failed to follow",
            });
            return;
        }
        res.status(201).json({
            message: "Followed successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error,
        });
    }
};
export const unFollowUser = async (req, res) => {
    const { followerId, followeeId } = req.body;
    if (!followerId?.trim() || !followeeId?.trim()) {
        res.status(400).json({
            message: "All fields are required",
        });
    }
    try {
        if (followeeId === followerId) {
            res.status(400).json({
                message: "Cannot unfollow yourself",
            });
            return;
        }
        const response = prisma.follow.delete({
            where: { followerId_followeeId: { followerId, followeeId } },
        });
        if (!response) {
            res.status(400).json({
                message: "Failed to unfollow",
            });
            return;
        }
        res.status(201).json({
            message: "Unfollwed successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error,
        });
    }
};
//# sourceMappingURL=user.controller.js.map