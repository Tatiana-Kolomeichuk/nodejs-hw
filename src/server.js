import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import 'dotenv/config';


const app = express();
app.use(express.json());
app.use(cors());
app.use(
  pino({
    level: 'info',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname',
        messageFormat: '{req.method} {req.url} {res.statusCode} - {responseTime}ms',
        hideObject: true,
      },
    },
  }),
);

// All notes route
app.get('/notes', (req, res) => {
  res.status(200).json({ message: 'Retrieved all notes' });
});
// Note by id route
app.get('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;

  res.status(200).json({ message: `Retrieved note with ID: ${noteId}` });
});

// Testing error handling route
app.get('/test-error', (req, res) => {
  // Штучна помилка для прикладу
  throw new Error('Something went wrong');
});
// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);

  const isProd = process.env.NODE_ENV === "production";

  res.status(500).json({
    message: isProd
      ? "Something went wrong. Please try again later."
      : err.message,
  });
});
// Use the PORT environment variable if available, otherwise default to 3000
const PORT = process.env.PORT ?? 3000;
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
