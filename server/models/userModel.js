import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullName: { // Güncellenmiş alan adı
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
    idPhoto: {
        type: String,  // Kimlik fotoğrafı için dosya yolu
        default: ''
    }
}, {
    timestamps: true // Kayıt ve güncellenme zamanını tutar
});

const User = mongoose.model('User', userSchema);

export default User;
