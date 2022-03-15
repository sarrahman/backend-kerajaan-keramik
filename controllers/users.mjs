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
      return res.status(400).json({ message: "Lengkapi Semua Inputan" });
    }
    const user = await Users.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "Username Sudah Ada" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password Tidak Cocok" });
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
      message: "Akun Berhasil Dibuat",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: "Lengkapi Semua Inputan" });
    }
    const user = await Users.findOne({
      username,
    });
    if (!user) {
      return res.status(400).json({ message: "Username Tidak Ditemukan" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password Salah" });
    }
    res.status(200).json({
      message: "User Berhasil Masuk",
      admin: user.admin,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
