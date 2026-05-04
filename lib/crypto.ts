import crypto from 'crypto';

/**
 * Utility for AES decryption matching Khanza's implementation
 * Algorithm: AES/CBC/PKCS5PADDING (Node.js uses PKCS7 which is compatible with PKCS5)
 * Key: Bar12345Bar12345
 * IV: sayangsamakhanza
 */

const ENCRYPTION_KEY = Buffer.from('Bar12345Bar12345', 'utf8');
const IV = Buffer.from('sayangsamakhanza', 'utf8');

export function decryptAES(encryptedText: string): string {
  try {
    const decipher = crypto.createDecipheriv('aes-128-cbc', ENCRYPTION_KEY, IV);
    let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (error) {
    console.error('Decryption failed:', error);
    return '';
  }
}

export function encryptAES(plainText: string): string {
  try {
    const cipher = crypto.createCipheriv('aes-128-cbc', ENCRYPTION_KEY, IV);
    let encrypted = cipher.update(plainText, 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
  } catch (error) {
    console.error('Encryption failed:', error);
    return '';
  }
}
