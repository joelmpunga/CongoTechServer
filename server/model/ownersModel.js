import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default class Owner {
    constructor(nom,description) {
        this.nom = nom;
        this.description = description;
    }
    async create() {
        const query = await prisma.owner.create({
            data: {
                nom: this.nom,
                description: this.description
            }
        }).then()
        return query;
    }
    async getAll(){
        const query = await prisma.owner.findMany().then()
        return query
    }

    async delete(id){
        const query = await prisma.owner.delete({
            where:{
                id: id
            }
        }).then()
    }
}