const { ImapFlow } = require('imapflow');
require('dotenv').config();

class emailModel {
    static async fetchEmails() {
        const client = new ImapFlow({
            host: process.env.host, // Change this to your IMAP server
            port: 993,
            secure: true,
            auth: {
                user: process.env.gusername,
                pass: process.env.gpass
            }
        });

        try {
            await client.connect();

            const mailbox = await client.mailboxOpen('INBOX');

            const messagesObject = await client.fetch('1:*', { envelope: true, source: true });

            let messagesArray = [];

            for await (const msg of messagesObject) {
                const messageBody = msg.source.toString();
                const emailInfo = this.extractBodyInfo(messageBody);

                messagesArray.push({
                    subject: msg.envelope.subject,
                    from: msg.envelope.from,
                    date: msg.envelope.date,
                    flags: msg.flags,
                    body: emailInfo.bodies
                });
            }

            console.log(`Fetched ${messagesArray.length} messages`);

            if (messagesArray.length === 0) {
                console.log('No messages found in the INBOX');
                return [];
            }

            await client.logout();
            console.log('Logged out');
            return messagesArray;
        } catch (err) {
            console.error('Error:', err);
            return [];
        } finally {
            await client.close();
            console.log('Connection closed');
        }
    }

    static extractBodyInfo(message) {
        let regex = /<div[^>]*>([\s\S]*?)<\/div>/g;
        let bodies;
        let match;
        while ((match = regex.exec(message)) !== null) {
            // match[0] is the full match, match[1] is the captured group
            let extractedMessage = match[1];
            bodies = extractedMessage.trim(); // Add to the array
        }

        if (!bodies) {
            console.log("No content found between div tags.");
            console.log("Full message:", message); // Log the full message to see its structure
        }

        return { bodies }; // Return an array of bodies
    }





}

module.exports = emailModel;
