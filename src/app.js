const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const uploadRoutes = require('../src/routes/upload.route');
const {ROUTES} = require("./constants/routes.constants");

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use(ROUTES.BASE_API_PATH, uploadRoutes);

module.exports = app;
