const signer = require('node-signpdf').default;
const fs = require('fs');
const { plainAddPlaceholder } = require('node-signpdf/dist/helpers');

const filename = 'path file .pdf';
const cert = 'path file pkcs12 (.pfx ou .p12)';

var output = plainAddPlaceholder({
    pdfBuffer: fs.readFileSync(filename),
    reason: 'Minha Assinatura',
    signatureLength: 8192
});


const signedPdf = signer.sign(output, fs.readFileSync(cert), { passphrase: 'password certificate', asn1StrictParsing: true });
fs.writeFileSync(__dirname + '/last.pdf', signedPdf);
fs.writeFileSync(filename, signedPdf);
console.log(`Successfully signed ${filename}`);