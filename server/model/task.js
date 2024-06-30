const mongoose = require('mongoose');

const ChecklistItemSchema = new mongoose.Schema({
  text: { type: String, required: true },
  checked: { type: Boolean, default: false }
})
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  priority: { type: String, required: true },
  dueDate: { type: Date },
  checklist: [ChecklistItemSchema],
  status: { type: String, enum: ['backlog', 'todo', 'in-progress', 'done'], default: 'todo' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  assignedTo: {  type: String  },
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
