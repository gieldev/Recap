const router = require("express").Router();

const QuizMultipleChoice = require("../models/QuizMultipleChoice");

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
    })
  } catch (error) {}
});

module.exports = router;
