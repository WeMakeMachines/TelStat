const crypto = require("crypto");
const fs = require("fs");

// Generates a key value pair for use in encryption
// Writes public / private keys to file system

const config = {
  type: "rsa",
  modulusLength: 4096,
};

void (function ({ type, modulusLength }) {
  console.log("Generating key pairs...");

  const { privateKey, publicKey } = crypto.generateKeyPairSync(type, {
    modulusLength,
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
    },
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
  });

  const privateKeyFilename = `telstat_${type}.private.pem`;
  const publicKeyFilename = `telstat_${type}.public.pem`;

  fs.writeFileSync(`./${privateKeyFilename}`, privateKey);
  fs.writeFileSync(`./${publicKeyFilename}`, publicKey);

  console.log(privateKeyFilename, "private key file");
  console.log(publicKeyFilename, "public key file");
})(config);
