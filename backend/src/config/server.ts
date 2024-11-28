import express from 'express';
import connectDB from "./mongodb"

const app = express();
const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
    connectDB();
});

export default app;