import dotenv from 'dotenv';
dotenv.config();

import fs from 'fs';
import path from 'path';
import { Buffer } from 'buffer';
import pino from 'pino';

// Configuration
const sessionName = "session";
const config = require("../config.cjs");

// Logger setup
const MAIN_LOGGER = pino({
    timestamp: () => `,"time":"${new Date().toJSON()}"`
});
const logger = MAIN_LOGGER.child({});
logger.level = "trace";

// Directory and file paths
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
const sessionDir = path.join(__dirname, sessionName);
const credsPath = path.join(sessionDir, 'creds.json');

// Ensure session directory exists
if (!fs.existsSync(sessionDir)) {
    fs.mkdirSync(sessionDir, { recursive: true });
}

// Function to decrypt the session ID from Base64
function decryptSessionId(encodedSessionId) {
    try {
        const buffer = Buffer.from(encodedSessionId, 'base64');
        return buffer.toString('utf-8');
    } catch (error) {
        console.error('Failed to decrypt session ID:', error);
        process.exit(1);
    }
}

// Function to save session data
function saveSessionData(sessionData) {
    try {
        fs.writeFileSync(credsPath, sessionData, 'utf-8');
        console.log("🔒 Session Successfully Loaded and Saved !!");
    } catch (error) {
        console.error('Failed to save session data:', error);
        process.exit(1);
    }
}

// Main function to handle session data
function handleSessionData() {
    if (!config.SESSION_ID) {
        console.error('Please add your session to SESSION_ID env !!');
        process.exit(1);
    }

    // Extract the session ID part and decrypt it
    const encodedSessionId = config.SESSION_ID.split("Byte;;;")[1];
    if (!encodedSessionId) {
        console.error('Invalid SESSION_ID format');
        process.exit(1);
    }

    const sessionData = decryptSessionId(encodedSessionId);

    // Save the session data to creds.json
    saveSessionData(sessionData);
}

// Check if creds.json exists, if not, handle session data
if (!fs.existsSync(credsPath)) {
    handleSessionData();
} else {
    console.log("🔒 Session file already exists.");
}

// Your existing bot code (e.g., start function) would follow here


async function start() {
    try {
        const { state, saveCreds } = await useMultiFileAuthState(sessionDir);
        const { version, isLatest } = await fetchLatestBaileysVersion();
        console.log(`🤖 Ethix-MD using WA v${version.join('.')}, isLatest: ${isLatest}`);
        
        const Matrix = makeWASocket({
            version,
            logger: pino({ level: 'silent' }),
            printQRInTerminal: true,
            browser: ["Ethix-MD", "safari", "3.3"],
            auth: state,
            getMessage: async (key) => {
                if (store) {
                    const msg = await store.loadMessage(key.remoteJid, key.id);
                    return msg.message || undefined;
                }
                return { conversation: "Ethix-MD Nonstop Testing" };
            }
        });

        Matrix.ev.on('connection.update', (update) => {
            const { connection, lastDisconnect } = update;
            if (connection === 'close') {
                if (lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
                    start();
                }
            } else if (connection === 'open') {
                if (initialConnection) {
                    console.log(chalk.green("😃 Integration Successful️ ✅"));
                    Matrix.sendMessage(Matrix.user.id, { text: `😃 Integration Successful️ ✅` });
                    initialConnection = false;
                } else {
                    console.log(chalk.blue("♻️ Connection reestablished after restart."));
                }
            }
        });

        Matrix.ev.on('creds.update', saveCreds);

        Matrix.ev.on("messages.upsert", async chatUpdate => await Handler(chatUpdate, Matrix, logger));
        Matrix.ev.on("call", async (json) => await Callupdate(json, Matrix));
        Matrix.ev.on("group-participants.update", async (messag) => await GroupUpdate(Matrix, messag));

        if (config.MODE === "public") {
            Matrix.public = true;
        } else if (config.MODE === "private") {
            Matrix.public = false;
        }

        Matrix.ev.on('messages.upsert', async (chatUpdate) => {
            try {
                const mek = chatUpdate.messages[0];
                if (!mek.key.fromMe && config.AUTO_REACT) {
                    console.log(mek);
                    if (mek.message) {
                        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
                        await doReact(randomEmoji, mek, Matrix);
                    }
                }
            } catch (err) {
                console.error('Error during auto reaction:', err);
            }
        });
    } catch (error) {
        console.error('Critical Error:', error);
        process.exit(1);
    }
}

start();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
