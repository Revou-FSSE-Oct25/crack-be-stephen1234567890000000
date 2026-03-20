const authorizedAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      throw {
        statusCode: 403,
        message: "Access denied. Admin privileges required.",
      };
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authorizedAdmin;
