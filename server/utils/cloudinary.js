const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "devpzohtn",
  api_key: "973675613335578",
  api_secret: "R6bd4tb_GSMCiNx-jDjvtY9VfUI"
});

module.exports = cloudinary;
