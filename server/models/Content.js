import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
  section: {
    type: String,
    required: true,
    unique: true, // Bölümlerin benzersiz olmasını sağla
  },
  content: {
    type: String,
    required: true,
  },
});

const Content = mongoose.model('Content', contentSchema);

export default Content;
