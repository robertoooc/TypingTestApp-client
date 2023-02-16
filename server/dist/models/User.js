import mongoose, { Schema } from 'mongoose';
const Mistakes = new Schema({
    char: { type: String, lowercase: true },
    amount: { type: Number }
});
const Tests = new Schema({
    wpm: { type: Number },
    mistakes: [Mistakes]
}, {
    timestamps: true
});
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    wpm: { type: Number },
    tests: [Tests]
});
// module.exports = mongoose.model('User', User)
export default mongoose.model('User', UserSchema);
///module.exports = mongoose.model('User', UserSchema)
