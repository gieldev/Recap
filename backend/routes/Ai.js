const router = require("express").Router();
const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const chooseLetterSchema = {
  type: "object",
  properties: {
    question: { type: "string" },
    options: {
      type: "array",
      items: { type: "string" },
    },
    answer: { type: "string" },
  },
  required: ["question", "options", "answer"],
};

router.post("/create", async (req, res) => {
  try {
    const { reference } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: reference,
      config: {
        systemInstruction:
          "Generate a multiple-choice quiz from the provided reference text. Treat each terminology or concept in the text as a potential quiz question. Use the first sentence that defines or explains the terminology as the basis for the question. Create four multiple-choice options and identify the correct answer. Only use information found in the reference text. Keep the questions and answers concise.",
        responseMimeType: "application/json",
        responseSchema: chooseLetterSchema,
      },
    });

    return res.status(200).json({
      quiz: JSON.parse(response.text),
    });
  } catch (error) {
    console.error("error", error);
  }
});
