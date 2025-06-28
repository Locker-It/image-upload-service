const PRESIGNED_URL_EXPIRES_IN = 60;

const UPLOAD_FOLDER = 'uploads/';

const S3_PUBLIC_URL_TEMPLATE = 'https://${bucket}.s3.${region}.amazonaws.com';

module.exports = {
    PRESIGNED_URL_EXPIRES_IN,
    UPLOAD_FOLDER,
    S3_PUBLIC_URL_TEMPLATE
}
