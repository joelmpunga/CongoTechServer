import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default class Folder {
    constructor(titre,description) {
        this.titre = titre;
        this.description = description;
    }
    async create() {
        const query = await prisma.folder.create({
            data: {
                titre: this.titre,
                description: this.description
            }
        }).then()
        return query;
    }
    async getAll(){
        const query = await prisma.folder.findMany().then()
        return query
    }

    async delete(id){
        const query = await prisma.folder.delete({
            where:{
                id: id
            }
        }).then()
    }
}