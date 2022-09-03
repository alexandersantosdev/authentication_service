const router = require('express').Router;
const routes = router();

const { login, register, validateToken } = require('../controllers/authController');

routes.post('/register', register);

routes.post('/login', login);

routes.post('/validateToken', validateToken);

routes.get('/', (req, res) => res.json({ ok: 'ok' }))
module.exports = routes;