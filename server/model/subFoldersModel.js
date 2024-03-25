import { PrismaClient } from '@prisma/client'
import Folder from './foldersModel';
const prisma = new PrismaClient()
export default class subFolder extends Folder {
    constructor(titre,description) {
        super(titre,description);
    }
    async create() {
        super()
    }
    async getAll(){
        super()
    }
    async delete(id){
        super()
    }
}