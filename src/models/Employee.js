const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Posts = require("./Post");

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      minlength: 6,
      trim: true,
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("Password cannot contain password");
        }
      },
    },
    status: {
      type: String,
      trim: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

employeeSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "owner",
});

employeeSchema.methods.generateAuthToken = async function () {
  const employee = this;
  console.log("fetching token");
  const token = await jwt.sign(
    { _id: employee._id.toString() },
    process.env.JWT_SECRET
  );
  employee.tokens = employee.tokens.concat({ token });
  employee.save();
  return token;
};

employeeSchema.methods.toJSON = function () {
  const employee = this;
  const employeeObject = employee.toObject();
  delete employeeObject.password;
  delete employeeObject.tokens;
  return employeeObject;
};

employeeSchema.pre("save", async function (next) {
  const employee = this;
  if (employee.isModified("password")) {
    employee.password = await bcrypt.hash(employee.password, 8);
  }
  next();
});

employeeSchema.pre("remove", async function (next) {
  const employee = this;
  await postMessage.deleteMany({ owner: employee._id });
  next();
});

employeeSchema.statics.findByCredentials = async (email, password) => {
  const employee = await Employee.findOne({ email });
  if (!employee) {
    console.log("email not found");
    throw new Error("username or password incorrect");
  }
  const passwordMatch = await bcrypt.compare(password, employee.password);
  if (!passwordMatch) {
    throw new Error("username or password incorrect");
  }
  return employee;
};

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
