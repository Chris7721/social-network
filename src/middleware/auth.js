const jwt = require("jsonwebtoken");
const Employee = require("../models/Employee");
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const employee = await Employee.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!employee) {
      throw new Error("User not found");
    }
    // console.log("The found employee: ", employee)
    req.token = token;
    req.employee = employee;
    next();
  } catch (err) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

module.exports = auth;
