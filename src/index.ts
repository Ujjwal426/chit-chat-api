import express from 'express';
import 'dotenv/config';

const PORT: number = parseInt(process.env.PORT || '9000');
const app = express();

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on the port http://localhost:${PORT}`);
});
