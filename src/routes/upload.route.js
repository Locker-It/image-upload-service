const express = require('express');
const { getUploadUrl } = require('../controllers/upload.controller');
const authenticateJWT = require('../middlewares/auth.middleware');
const {ROUTES} = require("../constants/routes.constants");

const router = express.Router();

router.post(ROUTES.PRESIGNED_URL, authenticateJWT, getUploadUrl);

module.exports = router;
