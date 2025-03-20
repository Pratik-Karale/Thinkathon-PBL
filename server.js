import express from 'express';
import multer from 'multer';
import fs from 'fs';
import pdfParse from 'pdf-parse'; // pdf-parse to extract text from PDF
import ollama from 'ollama'; // Assuming ollama is installed

const app = express();
const port = 3000;
const upload = multer({ dest: './uploads/' });

// Function to extract text from PDF using pdf-parse
async function extractTextFromPDF(pdfBuffer) {
  const data = await pdfParse(pdfBuffer);
  return data.text;  // Extract text from the PDF
}
// Route to handle PDF upload and generate questions
app.post('/generate-questions', upload.single('pdf'), async (req, res) => {
  try {
    const pdfBuffer = fs.readFileSync(req.file.path);
    const text = await extractTextFromPDF(pdfBuffer);

    // Get the number of questions from the request body
    const numberOfQuestions = req.body.numberOfQuestions || 1; // Default to 1 if not provided

    const questions = await generateQuestions(text, numberOfQuestions);
    res.json(questions);
  } catch (error) {
    console.error('Error generating questions:', error);
    res.status(500).send({ error: 'Failed to generate questions' });
  }
});

// Function to generate questions using LLM
async function generateQuestions(text, numberOfQuestions) {
  try {
    console.log("generating")
    const response = await ollama.chat({
      model: 'mistral:latest',
      messages: [
        {
          role: 'user',
          content: `create ${numberOfQuestions} small mcq questions in below format: 
          [{"question": "question content",
  "choices": ["option1", "option2", "option3"],  
  "correctAnswer": "correct radio number for option"},
  {"question": "question2 content",
  "choices": ["option1", "option2", "option3"],  
  "correctAnswer": "correct radio number for option"},.......]

          NOTE:
          The correct choice will be based on 1based indexing i.e. first option will be 1, 2nd 2... till n.
          ONLY OUTPUT JSON DATA with no newline characters or formatting IN THE ABOVE FORMAT AND NO EXTRA TEXT
          below is the pdf file text data to use to create the questions 
          ${text}`,
        },
      ],
    });
    console.log("generated")
    return response.message.content;
  } catch (error) {
    console.error('Error generating questions:', error);
    return null;
  }
}

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
