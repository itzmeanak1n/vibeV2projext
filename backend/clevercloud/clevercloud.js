// This file allows you to configure behavior of the Clever Cloud.
// You can also add your own environment variables in the 'env' property.
// For more information, see the documentation: 
// https://www.clever-cloud.com/doc/configuration/application-json/

module.exports = {
  // Required configuration
  type: "node",
  build: {
    useNpmInstall: true,
    useNpmCi: false,
    buildCommand: 'npm install && npm run build',
  },
  // Optional configuration
  env: {
    NODE_ENV: 'production',
    NODE_VERSION: '18.x', // ตรวจสอบให้ตรงกับเวอร์ชันที่คุณใช้
    PORT: '8080', // ต้องตรงกับ port ที่ใช้ใน server.js
  },
  // Add your environment variables here
  // Example:
  // DATABASE_URL: 'your-database-url',
  // JWT_SECRET: 'your-jwt-secret',
};
