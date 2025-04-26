import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default class File {
    constructor(name, path, description) {
        this.name = name;
        this.path = path;
        this.description = description;
    }
    async upload(file) {
        if (file.idSubFolder) {
            const request = await prisma.document.create({
                data: {
                    name: file.name,
                    path: file.path,
                    description: file.description,
                    idUser: file.idUser,
                    idOwner: file.idOwner,
                    subFolderId: file.idSubFolder,
                    type: file.type
                }
            }).then()
            return request;
        }
        const request = await prisma.document.create({
            data: {
                name: file.name,
                path: file.path,
                description: file.description,
                idUser: file.idUser,
                idOwner: file.idOwner,
                type:file.type,
                idAnnee:file.idYear
            }
        }).then()
        return request;
    }

    async download(id) {
        const query = await prisma.document.findUnique({
            where: {
                id: parseInt(id),
            },
        }).then()
        return query;
    }

    async getAll() {
        const request = await prisma.document.findMany().then()
        return request
    }

    async getAllDraft() {
        const request = await prisma.document.findMany({
            where: {
                subFolderId: null
            }
        }).then()
        return request
    }

    async getByIdSubFolder(idSub) {
        const request = await prisma.document.findMany({
            where: {
                subFolderId: parseInt(idSub)
            }
        }).then()
        return request
    }

    async isNameFileExists(name) {
        const request = await prisma.document.findFirst({
            where: {
                name: name
            }
        }).then()
        return request
    }

    async delete(id) {
        const request = await prisma.document.delete({
            where: {
                id: id
            }
        }).then()
    }
    async classer(id, idSub) {
        const query = await prisma.document.update({
            where: {
                id: parseInt(id),
            },
            data: {
                subFolderId: parseInt(idSub)
            }
        }).then()
        return query;
    }
}
