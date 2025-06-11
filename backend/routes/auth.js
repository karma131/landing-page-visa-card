const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// Đăng ký
router.post("/register", async (req, res) => {
  const { phone, password, fullName, email } = req.body;
  if (!email || !fullName || !phone || !password) {
    return res.status(400).json({ error: "Thiếu thông tin bắt buộc" });
  }
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        phone
      },
    });
    if (existingUser) {
      return res.status(400).json({ message: "SĐT hoặc email đã tồn tại" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        phone,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: "Đăng ký thành công", userId: user.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Đăng nhập
router.post("/login", async (req, res) => {
  const { phone, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { phone } });
    if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: "Sai mật khẩu" });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1d" });

    res.json({
      token,
      userId: user.id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/user/:id - Cập nhật thông tin người dùng
// PUT /api/user/:id - Cập nhật thông tin người dùng
router.put("/user/:id", async (req, res) => {
  const { fullName, email, phone, address, cccd, birthDate } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: {
        fullName,
        email,
        phone,
        address,
        cccd,
        birthDate: birthDate && birthDate !== "" ? new Date(birthDate) : null,

      },
    });
    res.json({ message: "Cập nhật thành công", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/user/:id - Lấy thông tin người dùng
router.get("/user/:id", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id) },
    });

    if (!user) return res.status(404).json({ error: "Không tìm thấy người dùng" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/financial/:userId", async (req, res) => {
  const {
    occupation,
    companyName,
    companyAddr,
    income,
    salaryMethod,
    bankName,
    bankAccount,
  } = req.body;
  const userId = parseInt(req.params.userId);

  try {
    const parsedIncome = parseInt(income) || 0; // ✅ ép kiểu ở đây

    const existing = await prisma.financialInfo.findUnique({
      where: { userId },
    });

    if (existing) {
      const updated = await prisma.financialInfo.update({
        where: { userId },
        data: {
          occupation,
          companyName,
          companyAddr,
          income: parsedIncome, 
          salaryMethod,
          bankName,
          bankAccount,
        },
      });
      res.json({ message: "Cập nhật tài chính thành công", data: updated });
    } else {
      const created = await prisma.financialInfo.create({
        data: {
          occupation,
          companyName,
          companyAddr,
          income: parsedIncome, 
          salaryMethod,
          bankName,
          bankAccount,
          userId,
        },
      });
      res.json({ message: "Tạo hồ sơ tài chính thành công", data: created });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi server khi cập nhật thông tin tài chính" });
  }
});
router.get("/financial/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);

  try {
    const info = await prisma.financialInfo.findUnique({
      where: { userId },
    });

    if (!info) {
      return res.status(404).json({ error: "Không tìm thấy thông tin tài chính" });
    }

    res.json(info);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi server khi lấy thông tin tài chính" });
  }
});

module.exports = router;
