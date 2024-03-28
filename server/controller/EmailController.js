import emailModel from '../model/EmailModel';

async function getEmails(req, res) {
    try {
        const emails = await emailModel.fetchEmails();
        res.json(emails);
    } catch (err) {
        console.error('Error fetching emails:', err);
        res.status(500).json({ error: 'Error fetching emails' });
    }
}

module.exports = {
    getEmails
};
