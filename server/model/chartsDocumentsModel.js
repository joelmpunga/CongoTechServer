import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default class ChartsDocuments {
    async getAll() {
        const query = await prisma.document.findMany().then()
        return query
    }
    async getAllUnclassed() {
        const request = await prisma.document.findMany({
            where: {
                subFolderId: null
            }
        }).then()
        return request
    }
    async getDocumentMonth(month) {
        const documents = await prisma.document.findMany();
        const filteredDocuments = documents.filter(document => {
            if (document.createdAt) {
                const dateString = document.createdAt.toISOString().split('T')[0];
                return dateString.includes(month);
            }
            return false;
        });
        return filteredDocuments;
    }

    async getDocumentYear(year) {
        const documents = await prisma.document.findMany();
        const filteredDocuments = documents.filter(document => {
            if (document.createdAt) {
                const dateString = document.createdAt.toISOString().split('T')[0];
                return dateString.includes(year);
            }
            return false;
        });
        return filteredDocuments;
    }
}