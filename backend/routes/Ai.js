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
  try {
    const { reference } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: reference,
      config: {
        systemInstruction:
          "Generate exactly 5 multiple-choice questions from the provided reference text. " +
          "Each question must have exactly four options. " +
          "Only use information found in the reference text.",

        responseMimeType: "application/json",
        responseSchema: quizSchema,
      },
    });

    console.log(response.text);
  } catch (error) {
    console.error("error", error);
  }
});

module.exports = router;
