import mongoose, { Schema, Document } from 'mongoose';

export interface ICandidate extends Document {
  firstName: string;
  lastName: string;
  email: string;
  status: 'pending' | 'validated';
  isDeleted: boolean; 
}

const CandidateSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  status: { type: String, enum: ['pending', 'validated'], default: 'pending' },
  isDeleted: { type: Boolean, default: false } 
}, { timestamps: true });

export default mongoose.model<ICandidate>('Candidate', CandidateSchema);
