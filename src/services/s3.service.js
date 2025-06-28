// src/services/s3.service.js
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { v4: uuidv4 } = require('uuid');

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
    },
});

async function generatePresignedUploadUrl(filename, mimetype) {
    const key = `uploads/${uuidv4()}-${filename}`;

    const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
        ContentType: mimetype,
    });

    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

    const publicUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

    return { uploadUrl, publicUrl };
}

module.exports = { generatePresignedUploadUrl };
