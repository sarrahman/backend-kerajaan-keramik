import Users from "../models/users.mjs";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { username, password, confirmPassword } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const user = await Users.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "username already exists" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "passwords do not match" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new Users({
      username,
      password: hashedPassword,
      admin: false,
    });
    await newUser.save();
    res.status(200).json({
      message: "User created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const user = await Users.findOne({
      username,
    });
    if (!user) {
      return res.status(400).json({ message: "Username not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }
    res.status(200).json({
      message: "User logged in successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
