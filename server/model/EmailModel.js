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
                // const emailInfo = this.extractBodyInfo(messageBody);

                messagesArray.push({
                    subject: msg.envelope.subject,
                    from: msg.envelope.from,
                    date: msg.envelope.date,
                    flags: msg.flags,
                    // body: emailInfo.bodies
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





}

module.exports = emailModel;
