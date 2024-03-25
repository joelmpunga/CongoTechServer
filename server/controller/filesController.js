import File from '../model/filesModel.js'
import multer from 'multer'

export default class filesController {

    static async setupConfig(req, res) {
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                const uploadDir = './public/files/';
                cb(null, uploadDir);
            },
            filename: (req, file, cb) => {
                const timestamp = Date.now();
                const extname = path.extname(file.originalname);
                cb(null, `file_${timestamp}${extname}`);
            }
        });
        //const upload = multer({ storage: storage });
        return storage
    }

    static async uploadFile(req, res) {
        try {
            const __dirname = path.dirname('/home/joelmpunga/mail-retrieval-app/index.js');
            //const buffer = await readChunk('./public/files/_SMN9578.jpg', { length: 4100 });
            const type = await fileTypeFromBuffer(buffer);
            const file = new File()
            const buffer = await readChunk('./public/images/' + req.file.filename, { length: 4100 });
            if (type !== null && (type.ext === 'pdf' || type.ext === 'docx')) {
                const data = {
                    name: req.file.filename,
                    path: req.file.destination.substring(1) + req.file.filename,
                    description: req.description
                }
                file.upload(data)
                res.status(201).send(`File added with ID: ${result.id}`);
            } else {
                res.status(400).send('Invalid file type. Only pdf and docx are allowed.');
            }
            // const { nom, postnom, email, password, role } = req.body;
            // const user = new User(nom, postnom, email, password, role);
            // const data = await user.signup({ nom, postnom, email, password, role });
            // const response = await user.getAll()
            // res.status(200).json(response);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }

    static async getAllFiles(req, res) {
        try {
            const files = new File();
            const data = await files.getAll()
            res.status(200).json(data);
            return data
        }
        catch (error) {
            res.status(500).json(error);
        }
    }

    static async deleteFile(req, res) {
        const id = parseInt(req.params.id);
        try {
            const files = new File();
            const data = await files.delete(id)
            const response = await files.getAll()
            res.status(200).json(response);
        }
        catch (error) {
            res.status(500).json(error);
        }
    }
}

// export {deleteFile,getAllFiles,uploadFile,setupConfig}