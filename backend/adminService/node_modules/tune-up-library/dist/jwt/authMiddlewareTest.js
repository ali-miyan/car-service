const express = require('express');
const  {authMiddleware} = require('./authMiddleware.js')
const cookieParser = require('cookie-parser');
const  {TokenService} = require('./tokenService.js')

const app = express();
app.use(cookieParser());

app.post('/protected',authMiddleware(['user']), (req, res) => {
    console.log('dsdsd');
    const user = req.user;
    res.json({ message: 'Protected route', user });
});
app.post('/login', (req, res) => {
    const token = TokenService.generateToken({user:'ali',role:'user'})
    const refresh = TokenService.generateRefreshToken({user:'ali',role:'user'})
    console.log(token,refresh);
    res.json({ message: 'Protected route'});
});
app.listen(3008, () => {
    console.log('Server is running on port 3008');
});
