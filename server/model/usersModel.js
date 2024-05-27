import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default class User {
    constructor(nom, postnom, email, password, role) {
        this.nom = nom;
        this.postnom = postnom;
        this.email = email;
        this.password = password;
        this.role = role;
    }
    async signup() {
        const query = await prisma.user.create({
            data: {
                nom: this.nom,
                postnom: this.postnom,
                email: this.email,
                password: this.password,
                role: this.role
            }
        }).then()
        return query;
    }
    async getAll() {
        const query = await prisma.user.findMany().then()
        return query
    }

    async getUserByEmail(email) {
        const query = await prisma.user.findFirst({
            where:
            {
                email: email
            }
        }).then()
        return query
    }

    async getById(userId) {
        const query = await prisma.user.findUnique({
            where: {
                id: userId
            }
        }).then()
        return query
    }

    async update(id) {
        const query = await prisma.user.update({
            data: {
                nom: this.nom,
                postnom: this.postnom,
                email: this.email,
                password: this.password,
            },
            where: {
                id: id
            }
        }).then()
        return query;
    }

    async delete(id) {
        const query = await prisma.user.delete({
            where: {
                id: id
            }
        }).then()
    }
}