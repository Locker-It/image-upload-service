const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const uploadRoutes = require('../src/routes/upload.route');

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/images', uploadRoutes);

module.exports = app;
