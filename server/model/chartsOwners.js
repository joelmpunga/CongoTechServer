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
                type: "Particulier",
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

    async getParticulierMonth(month) {
        const request = await prisma.owner.findMany({
            where: {
                type: "Particulier",
            }
        }).then()
        const filteredOwners = request.filter(owner => {
            if (owner.createdAt) {
                const dateString = owner.createdAt.toISOString().split('T')[0];
                return dateString.includes(month);
            }
            return false;
        });
        return filteredOwners;
    }

    async getEntrepriseMonth(month) {
        const request = await prisma.owner.findMany({
            where: {
                type: "Entreprise",
            }
        }).then()
        const filteredOwners = request.filter(owner => {
            if (owner.createdAt) {
                const dateString = owner.createdAt.toISOString().split('T')[0];
                return dateString.includes(month);
            }
            return false;
        });
        return filteredOwners;
    }

    async getOwnerType(type) {
        const request = await prisma.owner.findMany({
            where: {
                name: {
                    contains: type
                }
            }
        }).then()
        return request
    }
}