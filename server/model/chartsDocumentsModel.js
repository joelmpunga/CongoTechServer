import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default class ChartsDocuments {
    async getAll(){
        const query = await prisma.document.findMany().then()
        return query
    }
    async getAllUnclassed(){
        const request = await prisma.document.findMany({
            where: {
                subFolderId: null
            }
        }).then()
        return request
    }
    async getDocumentDate(date){
        const orders = await prisma.$queryRaw(`SELECT * FROM document WHERE dataField LIKE '%-04-%'`).then();
        return orders
    }
}