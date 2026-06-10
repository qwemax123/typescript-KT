import express from 'express'
import cors from 'cors'
import userRoutes from './routes/userRoutes'

const app = express()

app.use(cors());

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "сервер работает",
    endpoints: [
      "/sign",
      "/check",
      "/create",
      "/pet",
      "/colors",
    ],
  });
});

app.use('/', userRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`сервер （￣︶￣）↗ http://localhost:5000`);
});