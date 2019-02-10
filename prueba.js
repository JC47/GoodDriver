var speakeasy = require('speakeasy');

var secret = speakeasy.generateSecret({length: 20});

console.log(secret);

/* var QRCode = require('qrcode');

QRCode.toDataURL(secret.otpauth_url, function(err, image_data) {
  console.log(image_data); // A data URI for the QR code image
}); */