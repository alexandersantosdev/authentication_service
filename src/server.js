const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const routes = require('./routes');

app.use(express.json());
app.use('/api/users/auth', routes);
app.get('/ping', (req, res) => res.json({ message: 'pong' }));

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));