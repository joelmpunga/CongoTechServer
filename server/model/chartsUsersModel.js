import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default class ChartsUsers {
    async getAll() {
        const query = await prisma.user.findMany().then()
        return query
    }
    async getAllSecretaire() {
        const request = await prisma.user.findMany({
            where: {
                role: "SECRETAIRE"
            }
        }).then()
        return request
    }
    async getAllAdmin() {
        const request = await prisma.user.findMany({
            where: {
                role: "ADMIN"
            }
        }).then()
        return request
    }
}