const router = require("express").Router();
const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const quizSchema = {
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
      },
      answer: {
        type: "string",
      },
    },
    required: ["question", "options", "answer"],
  },
};

// Creates a quiz
router.post("/create", async (req, res) => {
  let attempts = 0;
  let success = false;

  // Retry mechanism for generating the quiz
  while (!success && attempts < 3) {
    attempts++;

    try {
      const { reference } = req.body;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: reference,
        config: {
          systemInstruction:
            "Generate a comprehensive multiple-choice quiz based strictly on the provided reference text. " +
            "Identify and cover all important concepts, definitions, key terms, processes, steps, facts, and distinctions in the reference. " +
            "Determine the number of questions based on the amount and complexity of important material. Do not use a fixed question count. " +
            "Create enough questions to test the important points without unnecessary repetition or trivial questions. " +
            "Each question must have exactly four options, with exactly one correct answer. " +
            "Only use information supported by the reference text. Never invent facts or rely on outside knowledge. " +
            "Prioritize exam-relevant information and ensure that important topics are not overlooked. " +
            "Ignore page numbers, headers, footers, and reference lists at the ends of pages. " +
            "Return the quiz in the required JSON schema.",

          responseMimeType: "application/json",
          responseSchema: quizSchema,
        },
      });

      res.json(JSON.parse(response.text));
      success = true;
    } catch (error) {
      console.error("Generation failed:", error);

      if (attempts >= 3) {
        res.status(error.status || 500).json({
          error: error.message || "Failed to generate quiz",
        });
      }
    }
  }

  console.log("Retry");
});

module.exports = router;
