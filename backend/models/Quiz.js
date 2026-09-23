const quizSchema = {
  type: "object",
  properties: {
    question: { type: "string" },
    options: {
      type: "array",
      items: { type: "string" },
    },
    answer: { type: "string" },
  },
};
