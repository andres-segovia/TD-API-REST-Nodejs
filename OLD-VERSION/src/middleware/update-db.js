const AWS = require('aws-sdk');
const fs = require('fs');

const s3 = new AWS.S3();
AWS.config.update(
    {
        accessKeyId: AWS.config.credentials.accessKeyId,
        secretAccessKey: AWS.config.credentials.secretAccessKey
    }
);

exports.downloadFile = (bucketName, key) => {
  const filePath = '../data/db.json'; // Archivo que utilizamos
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

