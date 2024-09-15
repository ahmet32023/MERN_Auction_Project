import express from 'express'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import User from '../models/userModel.js'

const router = express.Router()

router.post("/signup", async(req, res) => {
    try {
        console.log(req.body);
        const { fullName, password, phoneNumber, email } = req.body;
        console.log(req.body);

        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: 'user already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createdUser = await User.create({
            fullName, // Güncellenmiş alan adı
            email,
            password: hashedPassword,
            phoneNumber
        });

        return res.status(201).json(createdUser);

    } catch (error) {
        console.log(error);
        return res.json({ message: 'create user failed' });
    }
});


router.post("/signin", async(req, res)=>{
    try{
        const {email, password} =req.body;
        const user = await User.findOne({email})
        if(!user)
            return res.status(400).json({ message:'user does not exist' })

        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect)
            return res.status(400).json({ message:'Wrong password' })

        return res.status(200).json({user, message:"authenticaion is successful"});

    }catch(error){
    return res.status(400).json({message: error.message});
    }
})

router.post('/request-verification/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
      }
  
      user.isVerificationRequested = true; // Yeni alan eklemek yerine doğrulama talebi kullanıcı modeline göre güncellenebilir
      await user.save();
  
      res.status(200).json({ message: 'Doğrulama talebi başarıyla gönderildi.' });
    } catch (error) {
      res.status(500).json({ message: 'Doğrulama talebi sırasında bir hata oluştu.' });
    }
  });
  
  router.put('/verify/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
      }
  
      user.isVerified = true; // Kullanıcı doğrulandı
      await user.save();
  
      res.json({ message: 'Kullanıcı başarıyla doğrulandı.' });
    } catch (error) {
      console.error('Kullanıcıyı doğrularken hata:', error);
      res.status(500).json({ message: 'Kullanıcı doğrulaması sırasında bir hata oluştu.' });
    }
  });

  router.get('/unverified', async (req, res) => {
    try {
      const unverifiedUsers = await User.find({ isVerified: false });
      res.json(unverifiedUsers);
    } catch (error) {
      console.error('Doğrulanmamış kullanıcıları alırken hata:', error);
      res.status(500).json({ message: 'Doğrulanmamış kullanıcıları alırken bir hata oluştu.' });
    }
  });
  
  router.put('/change-password/:id', async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;
      const user = await User.findById(req.params.id);
  
      if (!user) {
        return res.status(404).json({ message: 'Kullanıcı bulunamadı.' });
      }
  
      const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: 'Mevcut şifre hatalı.' });
      }
  
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedNewPassword;
      await user.save();
  
      res.status(200).json({ message: 'Şifre başarıyla güncellendi.' });
    } catch (error) {
      console.error('Şifreyi güncellerken hata:', error);
      res.status(500).json({ message: 'Şifre güncelleme sırasında bir hata oluştu.' });
    }
  });
  
export default router;
