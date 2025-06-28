const { generatePresignedUploadUrl } = require('../services/s3.service');

async function getUploadUrl(req, res) {
    const { filename, mimetype } = req.body;
    if (!filename || !mimetype) return res.status(400).json({ error: 'Missing file metadata' });

    const { uploadUrl, publicUrl } = await generatePresignedUploadUrl(filename, mimetype);
    res.json({ uploadUrl, publicUrl });
}

module.exports = { getUploadUrl };
