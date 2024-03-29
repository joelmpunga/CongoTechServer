
import ImapFlow from 'imapflow'
import dotenv from 'dotenv'
dotenv.config()




export default  class EmailModel {
    constructor() {
        this.client = new ImapFlow({
            host: 'mail.trust-fibm.com', // Change this to your IMAP server
            port: 993,
            secure: true,
            auth: {
                user: process.env.gusername,
                pass: process.env.gpass
            }
        });
    }

    async fetchEmails() {
        try {
            await this.client.connect();

            const mailbox = await this.client.mailboxOpen('INBOX');

            const messagesObject = await this.client.fetch('1:*', { envelope: true, source: true });

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

            await this.client.logout();
            console.log('Logged out');
            return messagesArray;
        } catch (err) {
            console.error('Error fetching emails:', err);
            throw err; // Rethrow the error to handle it in the controller
        } finally {
            await this.client.close();
            console.log('Connection closed');
        }
    }

    extractBodyInfo(message) {
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

        return { bodies };
    }
}