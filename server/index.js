import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import useRouter from './Routers/userRouter.js';
import auctionRouter from './Routers/auctionRouter.js';
import contentRouter from './Routers/contentRouter.js'; // İçerik için yeni route'u ekliyoruz

dotenv.config();

const app = express();

// Mevcut dosyanın dizinini ve dosya yolunu hesaplayın
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // path.dirname kullanarak __dirname oluşturuyoruz

// Statik dosyaları sunmak için
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors());
app.use(express.json());
app.use("/users", useRouter);
app.use("/auctions", auctionRouter);
app.use("/content", contentRouter); // İçerik endpoint'ini ekliyoruz

mongoose.connect(process.env.DB_CONNECT)
  .then(() => console.log('Connected to DB'))
  .catch(error => console.log(error));

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
