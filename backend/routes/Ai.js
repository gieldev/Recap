const router = require("express").Router();
const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const QuizMultipleChoice = require("../models/QuizMultipleChoice");

const quizMultipleChoice = {
  type: "array",
  items: {
    type: "object",
    properties: {
      question: {
        type: "string",
      },
      options: {
        type: "array",
        items: {
          type: "string",
        },
        minItems: 4,
        maxItems: 4,
      },
      answer: {
        type: "integer",
        minimum: 0,
        maximum: 3
      },
      explanation: {
        type: "string",
      }
    },
    required: ["question", "options", "answer", "explanation"],
  },
};

router.post("/create/quiz/multiple-choice", async (req, res) => {
  try {
    const { topic, numItems, quizType, learningMaterial } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: `
        TOPIC: ${topic || "Infer from the learning material"}

        REQUIRED NUMBER OF QUESTIONS: ${numItems} || "15"

        LEARNING MATERIAL: ${learningMaterial}

        REMINDER: Use ONLY the learning material above. Output EXACTLY ${numItems} questions. 
        If the material cannot support that many distinct questions, 
        produce as many as it supports rather than inventing content.
      `,
      config: {
        systemInstruction:
          "Generate a multiple-choice quiz strictly from the provided learning material. " +
          "Use ONLY information stated in the material. Never invent facts or use outside knowledge. " +
          "Every correct answer must be directly supported by the material. " +
          "Distractors must be plausible but clearly incorrect according to the material. " +
          "Each question must have exactly four options and exactly one correct answer. " +
          "Do not use 'all of the above' or 'none of the above'. " +
          "Spread correct answers across all four positions. " +
          "Cover important concepts, definitions, key terms, processes, and distinctions; avoid trivial or repetitive questions. " +
          "Ignore page numbers, headers, footers, and reference lists. " +
          "If a required number of questions is given, output EXACTLY that number. " +
          "If the material cannot support that many distinct questions, produce as many as it supports rather than inventing content. " +
          "Return the quiz in the required JSON schema.",
        temperature: 0.2,
        responseMimeType: "application/json",
        responseSchema: quizMultipleChoice,
      },
    });

    const quiz = JSON.parse(response.text);

    const requestedItems = Number(numItems);

    if (quiz.length !== requestedItems) {
      console.log("Requested:", requestedItems);
      console.log("Generated:", quiz.length);

      return res.status(502).json({
        error: "Quiz had the wrong number of questions.",
        requested: requestedItems,
        generated: quiz.length,
      });
    }

    const newQuiz = await QuizMultipleChoice.create({
      user: req.user.id,
      topic: topic,
      quizType: quizType,
      questions: quiz,
    });

    return res.status(201).json({
      message: "Quiz generated successfully.",
      quizId: newQuiz._id,
      quiz: quiz,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(error.status || 500)
      .json({ error: "Failed to generate quiz." });
  }
});

module.exports = router;
