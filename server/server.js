import express from 'express';
import cors from 'cors';
import routesInit from './routes/config_routes.js';
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

routesInit(app);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
