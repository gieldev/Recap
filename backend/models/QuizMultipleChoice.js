const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    trim: true,
    required: true,
  },

  options: {
    type: [String],
    required: true,
    validate: {
      validator: (options) => options.length >= 4 && options.length <= 4,
      message: "Options must contain exactly 4 items.",
    },
  },

  answer: {
    type: String,
    trim: true,
    required: true,
  },

  explanation: {
    type: String,
    trim: true,
    required: true,
  },
});

const quizMultipleChoiceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  topic: {
    type: String,
    required: true,
    trim: true,
  },

  quizType: {
    type: String,
    required: true,
    trim: true,
  },

  questions: {
    type: [questionSchema],
    required: true,
  },
});

const QuizMultipleChoice = mongoose.model("Quiz", quizMultipleChoiceSchema);

module.exports = QuizMultipleChoice;
