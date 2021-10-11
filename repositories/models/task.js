/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';

const Task = new mongoose.Schema({
  value: { type: String, required: true },
  isChecked: { type: Boolean, required: true },
  priority: { type: String, required: true },
  sort: { type: Number, required: true },
}, {
  versionKey: false,
});

export default mongoose.model('Task', Task);
