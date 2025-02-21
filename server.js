import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import emailRouter from './server/api/send-email.js';

const app = express();
const PORT = process.env.PORT || 5420;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', emailRouter);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Une erreur est survenue !');
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
}); 