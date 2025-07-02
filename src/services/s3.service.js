const { PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { v4: uuidv4 } = require('uuid');

const { buildPublicS3Url } = require('../utils/s3.utils');
const {ERROR_MESSAGES} = require("../constants/errorMessages");
const {FILENAME_SANITIZATION_REGEX} = require("../constants/regex.constants");
const {ALLOWED_MIME_TYPES} = require("../constants/types.constants");
const {PRESIGNED_URL_EXPIRES_IN, UPLOAD_FOLDER} = require("../constants/s3.constants");

const s3 = require('../config/s3Client');

async function generatePresignedUploadUrl(filename, mimetype) {
    const sanitizedFilename = filename.replace(FILENAME_SANITIZATION_REGEX, '');
    if (!sanitizedFilename) {
        throw new Error(ERROR_MESSAGES.INVALID_FILENAME);
    }

    if (!ALLOWED_MIME_TYPES.includes(mimetype)) {
        throw new Error(ERROR_MESSAGES.UNSUPPORTED_FILE_TYPE);
    }

    const key = `${UPLOAD_FOLDER}${uuidv4()}-${sanitizedFilename}`;

    const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        ContentType: mimetype,
    });

    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: PRESIGNED_URL_EXPIRES_IN });

    const publicUrl = buildPublicS3Url(key);

    return { uploadUrl, publicUrl };
}

module.exports = { generatePresignedUploadUrl };
