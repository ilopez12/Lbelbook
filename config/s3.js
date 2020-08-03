const AWS = require('aws-sdk');

const ID = 'AKIAITUOTAD55R5SHGRA';
const SECRET = '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';
const FILE_PERMISSION = 'public-read'

const BUCKET_NAME = 'lbelbook';
const s3Client = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});

const uploadParams = {
    Bucket: BUCKET_NAME,
    Key: '',
    Body: null,
    ACL: FILE_PERMISSION
};

const s3 = {};
s3.s3Client = s3Client;
s3.uploadParams = uploadParams;

module.exports = s3