const crypto = require('crypto');

const encryptionKey =crypto.createHash('sha256').update('KLSsdLKJS').digest().slice(0, 16);// Hardcoded encryption key

function decrypt(encryptedText) {
    const [ivHex, encrypted] = encryptedText.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv('aes-128-cbc', encryptionKey, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

// Example usage
const encryptedTwitterProfile = 'fd5ca66843cfdcbb707a1473b3ae7090:6ac476980dc3aed2fd359a4c1dcda3ad';
const decryptedTwitterProfile = decrypt(encryptedTwitterProfile);
console.log(decryptedTwitterProfile); // Outputs the original Twitter handle