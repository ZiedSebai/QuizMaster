require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
import cors from "cors";
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json());

// ✅ Correct Gemini SDK import
const { GoogleGenerativeAI } = require('@google/generative-ai');

// ✅ Initialize Gemini client with API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Create model instance
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

// ✅ Test route to verify Gemini response
app.get('/api/test', async (req, res) => {
  try {
    const result = await model.generateContent('Explain how AI works in a few words');
    const response = await result.response;
    res.send(response.text());
  } catch (error) {
    console.error('Error in /api/test:', error.message);
    res.status(500).send('Failed to generate response');
  }
});

// ✅ Quiz generation route
app.post('/api/quiz', async (req, res) => {
    const topic = req.body.topic;
  const prompt = `Create a 5-question multiple-choice quiz about ${topic}.
    Return JSON format: [{"question": "...", "options": ["A", "B", "C", "D"], "correctAnswer": "A"}]`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    console.log('Generated Quiz Response:', text);

    // ✅ Remove Markdown code block formatting
    text = text.replace(/```json|```/g, '').trim();

    const quiz = JSON.parse(text);
    res.json(quiz);
  } catch (error) {
    console.error('Error generating quiz:', error.message);
    res.status(500).json({ error: 'Failed to generate quiz' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});