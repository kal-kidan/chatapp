const crypto = require('crypto');
const config = require('../config/config');

const encrypt = (message) => {
  const algorithm = 'aes256';
  const cipher = crypto.createCipher(
    algorithm,
    config.encryption.encryptionKey
  );
  return cipher.update(message, 'utf8', 'hex') + cipher.final('hex');
};

const decrypt = (message) => {
  const algorithm = 'aes256';
  const decipher = crypto.createDecipher(
    algorithm,
    config.encryption.encryptionKey
  );
  return decipher.update(message, 'hex', 'utf8') + decipher.final('utf8');
};
module.exports = { encrypt, decrypt };
