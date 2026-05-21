import mongoose, { Schema } from 'mongoose';

const NewsletterSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Newsletter || mongoose.model('Newsletter', NewsletterSchema);
