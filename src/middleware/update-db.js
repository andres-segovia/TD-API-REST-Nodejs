const AWS = require('aws-sdk');
const fs = require('fs');

const filePath = '../data/db.json';
const bucketName = 'products.database.microverse';
const key = 'db.json';

const s3 = new AWS.S3();
AWS.config.update(
    {
        accessKeyId: AWS.config.credentials.accessKeyId,
        secretAccessKey: AWS.config.credentials.secretAccessKey
    }
);

exports.downloadFile = (filePath, bucketName, key) => {
  const params = {
    Bucket: bucketName,
    Key: key
  };
  s3.getObject(params, (err, data) => {
    if (err) console.error(err);
    fs.writeFileSync(filePath, data.Body.toString());
    console.log(`${filePath} has been downloaded!`);
  });
};

module.exports = downloadFile;
