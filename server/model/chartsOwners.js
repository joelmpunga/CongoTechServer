import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default class ChartsUsers {
    async getAll() {
        const query = await prisma.owner.findMany().then()
        return query
    }
    async getAllParticulier() {
        const request = await prisma.owner.findMany({
            where: {
                type: "Particulier"
            }
        }).then()
        return request
    }
    async getAllEntreprise() {
        const request = await prisma.owner.findMany({
            where: {
                type: "Entreprise"
            }
        }).then()
        return request
    }
}