// config.js
const fs = require("fs");
require("dotenv").config();

const config = {
  SESSION_ID: process.env.SESSION_ID || "Byte;;;eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUtiZ3FmcjVLdHFsR3N3RmcxbGgyNDRTNTJ4M0dMNXhtUVg4c3Z1SWhXND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZlNuK1dOdEZ4bmNmeS9SMFc2eDdaVTI4MytySDVxdVlxWkh0ZXdBOUdCaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5UGFoYUZWTkNnZzJJZS90Skgrc3drMThmK0hzd0xDVVl5MlcwZFg0akYwPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCdHZXakpLaXhBL21YVTNUQkQyaklVcDJCWnJtQUV6N0REeTNjOHh3c2ljPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVKUElhZDFEVG9ET0xLcGFqeFJFd1ZiYkQ3dUFxbFR4dWlWY1FEVFNvR0U9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjVwWGtyLy8zRksxRWNYMGl2eThWdjVjS1JEVzNFcmFRaDMwK1UzNTVtR289In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMklpTkxPbFVuc1BGSzREbFB1MlFPUEZBRGtseXhLZ08zR05md1h1bzZWWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMldYdW1uWnBNSDBLL3JQV0hTQWQxQUUvZUY1a09VRGhQay96M0wxMWpXWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imp0RjJxK1puMVBzN2FDVHZoWUk3VVM3ckFRMGJOZWRRbXk5TXpiSzhkV3hlY1djOHU2ME14eDVHM25mRmFjaEtNMEFZVHBTTk4xWTVFbm4yRUtuZ0N3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTYxLCJhZHZTZWNyZXRLZXkiOiJURkxiYjFsVG5wY2dZVy9QRGEyNU9nZ0dNMzhXY2ZLWmZJL1FJK2hlRWNJPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJZYUVOeUJkWlF1cUwwbUJJb1ZiaFVBIiwicGhvbmVJZCI6IjNlNjc5OTQ4LTQ2YzktNDVhNy05MDJlLTllYWJiNmMyZWJiMSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJUSWFSZkFhWW01TXh6Q05GdWp3OXloNFY3Q1k9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTTlDN0ZsNU5uZVJTRjZkTWtBdWNXVmx2cGxzPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6Ikc4RFM1V05BIiwibWUiOnsiaWQiOiI5MjMwNzIzODAzODA6OTRAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ01iZjNZa0NFSUdWbWJVR0dBTWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InZLR0xBdlNNT1ZuUW9aRjhrck9sbXk0bmJIZ2VtVjR1QytVS2hKdmRNRnc9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjNudUVtazRpVThsNVJ5Z2RzSVlYK09QMDRKd0txMURNMk9icTJOY3h1dkRSSlU2OWZMTTBBV0VNUFdOenovZW5nRlhFWlJUVmFObVNoY0FnQ3ZkWEFRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJYTmRseDFRTng3ajljWHB0bzBvWTRNZUM5OTJwYWZBSTVuWG9icjlOZ2hLbGJteFhjWnVQVkJ6Y1F0b1p4cjlXRXRrejhuWEp1Z1JmZEg4VU5mWEJEUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkyMzA3MjM4MDM4MDo5NEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJieWhpd0wwakRsWjBLR1JmSkt6cFpzdUoyeDRIcGxlTGd2bENvU2IzVEJjIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIyMTc0MDk0LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUxVLyJ9",
  AUTO_STATUS_SEEN: process.env.AUTO_STATUS_SEEN !== undefined ? process.env.AUTO_STATUS_SEEN === 'true' : true, 
  AUTO_DL: process.env.AUTO_DL !== undefined ? process.env.AUTO_DL === 'true' : false,
  AUTO_READ: process.env.AUTO_READ !== undefined ? process.env.AUTO_READ === 'true' : false,
  AUTO_TYPING: process.env.AUTO_TYPING !== undefined ? process.env.AUTO_TYPING === 'true' : false,
  AUTO_RECORDING: process.env.AUTO_RECORDING !== undefined ? process.env.AUTO_RECORDING === 'true' : false,
  ALWAYS_ONLINE: process.env.ALWAYS_ONLINE !== undefined ? process.env.ALWAYS_ONLINE === 'true' : false,
  AUTO_REACT: process.env.AUTO_REACT !== undefined ? process.env.AUTO_REACT === 'true' : false,
   /*auto block only for 212 */
  AUTO_BLOCK: process.env.AUTO_BLOCK !== undefined ? process.env.AUTO_BLOCK === 'true' : true,
  
  
  REJECT_CALL: process.env.REJECT_CALL !== undefined ? process.env.REJECT_CALL === 'true' : false, 
  NOT_ALLOW: process.env.NOT_ALLOW !== undefined ? process.env.NOT_ALLOW === 'true' : true,
  MODE: process.env.MODE || "public",
  OWNER_NAME: process.env.OWNER_NAME || "✪⏤͟͞★⃝ꪶ‎𝞢𝙏𝞖𝞘𝞦-𝞛𝘿𖥘✪͜͡➺",
  OWNER_NUMBER: process.env.OWNER_NUMBER || "919142294671",
  GEMINI_KEY: process.env.GEMINI_KEY || "",
  WELCOME: process.env.WELCOME !== undefined ? process.env.WELCOME === 'true' : false, 
  YTDL_NO_UPDATE: process.env.YTDL_NO_UPDATE !== undefined ? process.env.YTDL_NO_UPDATE === 'true' : true,
};


module.exports = config;
