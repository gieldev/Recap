const router = require("express").Router();

const QuizMultipleChoice = require("../models/QuizMultipleChoice");
const {
  MultipleChoicesDownloadHTML,
} = require("../utils/MultipleChoicesDownloadHTML.js");

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
        message: "reviewer not found",
      });
    }

    return res.status(200).json({
      message: "reviewer deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/reviewers/download", async (req, res) => {
  try {
    const { id } = req.body;

    const reviewer = await QuizMultipleChoice.findOne({
      _id: id,
      user: req.user.id,
    });

    if (!reviewer) {
      return res.status(404).json({
        message: "Reviewer not found",
      });
    }

    const html = MultipleChoicesDownloadHTML(reviewer);

    const filename =
      `${reviewer.topic}`.replace(/[^a-zA-Z0-9-_ ]/g, "").trim() || "reviewer";

    res.setHeader("Content-Type", "text/html; charset=utf-8");

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${filename}.html"`,
    );

    return res.send(html);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Failed to download reviewer",
    });
  }
});

module.exports = router;
