//şimdi kullanılmıyor ilk başta test için kullanıldı
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Auction from './models/Auction.js';

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedAuctions = async () => {
  await Auction.deleteMany({});
  const auctions = [
    {
      title: 'Antique Vase',
      description: 'A beautiful antique vase from the 18th century.',
      startingBid: 100,
      currentBid: 150,
      endDate: new Date(Date.now() + 3600 * 1000 * 24),
      imageUrl: 'http://example.com/vase.jpg',
    },
    {
      title: 'Vintage Car',
      description: 'A fully restored vintage car from the 1950s.',
      startingBid: 5000,
      currentBid: 7500,
      endDate: new Date(Date.now() + 3600 * 1000 * 48),
      imageUrl: 'http://example.com/car.jpg',
    },
  ];

  await Auction.insertMany(auctions);
  console.log('Sample auctions added');
  process.exit();
};

seedAuctions();
