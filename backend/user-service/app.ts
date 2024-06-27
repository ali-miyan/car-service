import express from 'express';
const app = express();
const port = 3000;

app.use(express.json())

// Example endpoint
app.get('/', (req, res) => {
    res.json({ message: 'Hello from backend!' });
});
app.get('/api/user/data', (req, res) => {
    res.json({ message: 'Hello from backend!' });
});
app.post('/api/user/register', (req, res) => {
    console.log(req.body);
    
    res.json({ message: 'Hello from post!' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
