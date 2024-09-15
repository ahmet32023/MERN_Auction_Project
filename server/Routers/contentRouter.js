import express from 'express';
import Content from '../models/Content.js';

const router = express.Router();

// Belirli bir bölümün içeriğini almak için
router.get('/:section', async (req, res) => {
  const { section } = req.params;

  try {
    const content = await Content.findOne({ section });
    if (content) {
      res.json(content);
    } else {
      res.status(404).json({ message: `${section} içeriği bulunamadı.` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// İçeriği güncellemek veya eklemek için
router.post('/:section', async (req, res) => {
  const { section } = req.params;
  const { content } = req.body;

  try {
    let existingContent = await Content.findOne({ section });

    if (existingContent) {
      existingContent.content = content;
      await existingContent.save();
      res.json(existingContent);
    } else {
      const newContent = new Content({ section, content });
      await newContent.save();
      res.json(newContent);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
