const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// POST /api/apply
router.post("/", async (req, res) => {
  const { userId, cardType, cardName, color, duration } = req.body;

  if (!userId || !cardType || !cardName || !color || !duration) {
    return res.status(400).json({ error: "Thiếu thông tin bắt buộc" });
  }

  try {
    const newApp = await prisma.visaApplication.create({
      data: {
        userId: parseInt(userId),
        cardType,
        cardName,
        color,
        duration: parseInt(duration),
        status: "Chờ duyệt",
      },
    });
    res.status(201).json({ message: "Đăng ký thành công", application: newApp });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Lỗi server khi lưu đăng ký" });
  }
});

// GET /api/apply/:userId - lấy tất cả đơn đăng ký của 1 user
router.get("/:userId", async (req, res) => {
  try {
    const applications = await prisma.visaApplication.findMany({
      where: { userId: parseInt(req.params.userId) },
      orderBy: { createdAt: 'desc' }
    });
    res.json(applications);
  } catch (err) {
    res.status(500).json({ error: "Lỗi khi lấy danh sách thẻ đã đăng ký" });
  }
});

module.exports = router;
