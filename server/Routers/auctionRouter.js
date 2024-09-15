import express from 'express';
import Auction from '../models/Auction.js';
import upload from '../middlewares/multerConfig.js'; // Multer konfigürasyonunu içe aktar

const router = express.Router();

// Tüm müzayedeleri al
router.get('/', async (req, res) => {
  try {
    const auctions = await Auction.find();
    res.json(auctions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Teklif verme endpoint'i
router.post('/:id/bid', async (req, res) => {
  const { id } = req.params;
  const { bidAmount, userId } = req.body;

  try {
    const auction = await Auction.findById(id);

    if (!auction) {
      return res.status(404).json({ message: 'Açık artırma bulunamadı' });
    }

    if (bidAmount <= auction.currentBid) {
      return res.status(400).json({ message: 'Teklifiniz eserin değerinden düşük olamaz' });
    }

    auction.currentBid = bidAmount;
    auction.highestBidder = userId; // Kullanıcı ID'si

    await auction.save();

    res.json(auction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post('/', upload.single('image'), async (req, res) => {
    const { title, description, startingBid, endDate } = req.body;
    const imageUrl = req.file ? `http://localhost:5000/uploads/${req.file.filename}` : '';
  
    try {
      const newAuction = new Auction({
        title,
        description,
        startingBid,
        currentBid: startingBid,
        endDate,
        imageUrl, // Tam URL'yi kaydediyoruz
      });
  
      const savedAuction = await newAuction.save();
      res.status(201).json(savedAuction);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  

// Tek dosya yükleme endpoint'i (Opsiyonel, sadece dosya yükleme için)
router.post('/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({ fileUrl });
});

export default router;
