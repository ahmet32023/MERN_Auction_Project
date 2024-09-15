import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullName: { 
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    phoneNumber: {
        type: String,
        required: true
    },
    isVerified: {  // Yeni alan: Kullanıcı doğrulaması
        type: Boolean,
        default: false // Kayıt olduğunda varsayılan olarak false
    },
    
});

const User = mongoose.model('User', userSchema);

export default User;
