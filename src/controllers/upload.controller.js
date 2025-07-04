const {generatePresignedUploadUrl} = require('../services/s3.service');
const {ERROR_MESSAGES} = require("../constants/errorMessages");
const {StatusCodes} = require("http-status-codes");

async function getUploadUrl(req, res) {
    try {
        const {filename, mimetype} = req.body;

        if (!filename || !mimetype) {
            return res.status(StatusCodes.BAD_REQUEST).json({error: ERROR_MESSAGES.MISSING_METADATA});
        }

        const {uploadUrl, publicUrl} = await generatePresignedUploadUrl(filename, mimetype);
        res.json({uploadUrl, publicUrl});
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error: error.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR});
    }
}

module.exports = {getUploadUrl};
