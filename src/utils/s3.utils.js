const {S3_PUBLIC_URL_TEMPLATE} = require("../constants/s3.constants");

function buildPublicS3Url(key) {
    const bucket = process.env.AWS_BUCKET_NAME;
    const region = process.env.AWS_REGION;

    const baseUrl = S3_PUBLIC_URL_TEMPLATE
        .replace('${bucket}', bucket)
        .replace('${region}', region);

    return `${baseUrl}/${key}`;
}

module.exports = { buildPublicS3Url };
