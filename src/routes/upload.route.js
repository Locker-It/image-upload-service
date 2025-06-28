const express = require('express');
const { getUploadUrl } = require('../controllers/upload.controller');
const authenticateJWT = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/presigned-url', authenticateJWT, getUploadUrl);

module.exports = router;
