
import  fetchEmails  from '../model/EmailModel.js';

const getEmails = async (req, res) => {
    try {
        const emails = await fetchEmails();
        res.json({ success: true, emails });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching emails', error: error.message });
    }
};

export default  getEmails ;
