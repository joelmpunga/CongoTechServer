import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default class File {
    constructor(name, path, description) {
        this.name = name;
        this.path = path;
        this.description = description;
    }
    async upload(file) {
        const request = await prisma.user.create({
            data: {
                name: file.name,
                path: file.path,
                description: file.description
            }
        }).then()
        return request;
    }

    async download(id) {
        const request = await prisma.files.findUnique({
            where: {
                id: parseInt(id),
            },
        }).then()
        return request;
    }
    async getAll() {
        const request = await prisma.file.findMany().then()
        return request
    }

    async delete(id) {
        const request = await prisma.file.delete({
            where: {
                id: id
            }
        }).then()
    }
}
