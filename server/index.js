import path from 'path';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import apiRouter from './routes/api.js';
import adminRouter from './routes/admin.js';
import { initDb } from './db/init.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:4173', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/api', apiRouter);
app.use('/api/admin', adminRouter);
app.use('/documents', express.static(path.join(process.cwd(), 'docs')));

app.use((req, res) => {
  res.status(404).json({ message: 'Route introuvable' });
});

// initialize DB then start
initDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Serveur CIAPAFED démarré sur http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Erreur init DB', err);
    process.exit(1);
  });
