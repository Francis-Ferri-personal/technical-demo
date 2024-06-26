import mongoose, { Schema, Document } from 'mongoose';

export interface IPet extends Document {
    name: string;
    owner: string;
    sex: string;
    breed: string;
    height: number;
    weight: number;
}

const PetSchema: Schema = new Schema({
    name: { type: String, required: true },
    owner: { type: String, required: true },
    sex: { type: String, enum: ['male', 'female'], required: true },
    breed: { type: String, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true }
});

const Pet = mongoose.model<IPet>('Pet', PetSchema);

export default Pet;