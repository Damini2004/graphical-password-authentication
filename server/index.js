import * as dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs/promises';
import { VerifyRoute } from './routes/verify.js';
import { DigestRoutes } from './routes/digest.js';
import { router as contactRoutes } from './routes/contact.js';
import { router as imageRoutes } from './routes/image.js';
import { router as userRoutes } from './routes/users.js';

const app = express();

// Load Swagger Documentation
const swaggerDocument = JSON.parse(
    await fs.readFile(new URL('./swagger.json', import.meta.url))
);

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use('/api/verify', VerifyRoute);
app.use('/api/user/', userRoutes);
app.use('/api/image/', imageRoutes);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/contact', contactRoutes);
app.use('/api/digest', DigestRoutes);

// MongoDB Connection
mongoose.set('strictQuery', true);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch(err => console.error("❌ MongoDB Connection Error:", err));
