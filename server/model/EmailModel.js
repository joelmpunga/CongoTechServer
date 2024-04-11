import { ImapFlow } from 'imapflow';
import dotenv from 'dotenv';

dotenv.config();

const extractBodyInfo = (message) => {
    let regex = /<div[^>]*>([\s\S]*?)<\/div>/g;
    let bodies = [];
    let match;
    while ((match = regex.exec(message)) !== null) {
        let extractedMessage = match[1];
        bodies.push(extractedMessage.trim());
    }

    if (bodies.length === 0) {
        console.log("No content found between div tags.");
        console.log("Full message:", message);
    }

    return bodies;
};

const fetchEmails = async () => {
    const client = new ImapFlow({
        host: 'mail.trust-fibm.com', 
        port: 993,
        secure: true,
        auth: {
            user: process.env.gusername,
            pass: process.env.gpass
        }
    });

    try {
        await client.connect();
        await client.mailboxOpen('INBOX');
        const messagesObject = await client.fetch('1:*', { envelope: true, source: true });

        let messagesArray = [];

        for await (const msg of messagesObject) {
            const messageBody = msg.source.toString();
            const emailInfo = {
                bodies: extractBodyInfo(messageBody)
            };

            messagesArray.push({
                subject: msg.envelope.subject,
                from: msg.envelope.from,
                date: msg.envelope.date,
                flags: msg.flags,
                body: emailInfo.bodies
            });
        }

        await client.logout();
        return messagesArray;
    } catch (err) {
        console.error('Error:', err);
        return [];
    } finally {
        await client.close();
    }
};

export default  fetchEmails ;
