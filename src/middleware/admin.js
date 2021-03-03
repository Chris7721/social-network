const jwt = require("jsonwebtoken");
const Employee = require("../models/Employee");

const admin = async (req, res, next) => {
  try {
    const token = req.header("Authorization").split(" ")[1];
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const employee = await Employee.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    console.log(employee);
    if (!employee) {
      console.log("first");
      throw new Error();
    } else if (employee.status !== "admin") {
      console.log("second");
      throw new Error();
    }
    req.token = token;
    req.employee = employee;
    next();
  } catch (err) {
    res.status(401).send({ error: "Please use a valid admin account" });
  }
};

module.exports = admin;
