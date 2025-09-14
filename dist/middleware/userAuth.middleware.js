import jwt from "jsonwebtoken";
export const userAuthValidation = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({
            message: "Unauthorised access",
        });
        return;
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded) {
            next();
        }
        else {
            res.status(403).json({
                message: "Access denied",
            });
        }
    }
    catch (error) {
        res.status(403).json({
            message: "Invalid or expired token",
        });
    }
};
//# sourceMappingURL=userAuth.middleware.js.map