const router = require("express").Router();

const QuizMultipleChoice = require("../models/QuizMultipleChoice");

router.get("/reviewers", async (req, res) => {
  try {
    const reviewers = await QuizMultipleChoice.find({ user: req.user.id });

    return res.status(200).json({
      message: "Reviewers retrieved successfully.",
      reviewers: reviewers,
    });
  } catch (error) {}
});

router.get("/find/:id", async (req, res) => {
  try {
    const quizId = req.params.id;

    const quiz = await QuizMultipleChoice.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    return res.status(200).json({
      message: "Quiz retrieved successfully.",
      quiz: quiz,
    });
  } catch (error) {}
});

router.delete("/reviewers/delete", async (req, res) => {
  try {
    const { id } = req.body;

    const reviewer = await QuizMultipleChoice.findByIdAndDelete(id);

    if (!reviewer) {
      return res.status(404).json({
        message: "reviewer not found"
      });
    }

    return res.status(200).json({
      message: "reviewer deleted"
    });
  } catch (error) {
    res.status(500).json({
      message: error.message 
    });
  }
});

module.exports = router;
