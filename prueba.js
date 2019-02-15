var speakeasy = require('speakeasy');
const qrcode = require('qrcode');

var secret = speakeasy.generateSecret({length: 20});

function random() {
  return Math.random().toString(36).substr(2); // Eliminar `0.`
};

function token() {
  return random() + random(); // Para hacer el token más largo
};

console.log(token());

const crypto = require('crypto');

crypto.randomBytes(5, (err, buf) => {
  if (err) throw err;
  console.log(buf.toString('hex'));
  console.log(`${buf.length} bytes of random data: ${buf.toString('hex')}`);

  qrcode.toDataURL(buf.toString('hex')).then(url => {
    console.log('Perro', url);
  }).catch(err => {
    console.error(err);
  });
});



/* var QRCode = require('qrcode');

QRCode.toDataURL(secret.otpauth_url, function(err, image_data) {
  console.log(image_data); // A data URI for the QR code image
}); */