import { PrismaClient } from '@prisma/client'
import Folder from '../model/foldersModel.js'
const prisma = new PrismaClient()
export default class SubFolder extends Folder {
    constructor(titre, description, idFolder) {
        super(titre, description);
        this.idFolder = idFolder;
    }
    async create() {
        const request = await prisma.subFolder.create({
            data: {
                titre: this.titre,
                description: this.description,
                idFolder: this.idFolder
            }
        })
        return request
    }
    async getAll() {
        const request = await prisma.subFolder.findMany()
        return request
    }

    async getById(id){
        const query = await prisma.subFolder.findFirst({
            where:{
                id: parseInt(id),
            }
        }).then()
        return query
    }

    async getAllByIdFolder(id) {
        const request = await prisma.subFolder.findMany(
            {
                where: {
                    idFolder: parseInt(id)
                }
            }
        )
        return request
    }
    async delete(id) {
        const request = await prisma.subFolder.delete({
            where: {
                id: id
            }
        })
        return request
    }
}