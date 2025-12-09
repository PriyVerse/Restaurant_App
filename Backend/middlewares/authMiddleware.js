import jwt from "jsonwebtoken";
export const protect = async (req, res, next) => {
  try {
    const tokan = req.cookies.tokan;
    if (!tokan) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }
    const decoded = jwt.verify(tokan, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Tokan", success: false });
  }
};

export const adminOnly = (req, res, next) => {
  const tokan = req.cookies.tokan;
  if (!tokan) {
    return res.status(401).json({ message: "Unauthorized", success: false });
  }
  try {
    const decoded = jwt.verify(tokan, process.env.JWT_SECRET);
    req.admin = decoded;
    if (req.admin.email === process.env.ADMIN_EMAIL) {
      return next();
    }
    return res
      .status(403)
      .json({ message: "Forbidden - Admin access required", success: false });
  } catch (error) {
    return res.status(401).json({ message: "Invalid Tokan", success: false });
  }
};
