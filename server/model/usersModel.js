import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default class User {
    constructor(nom,postnom,email,password,role) {
        this.nom = nom;
        this.postnom = postnom;
        this.email = email;
        this.password = password;
        this.role = role;
    }
    async signup(user) {
        const request = await prisma.user.create({
            data: {
                nom: user.nom,
                postnom: user.postnom,
                email: user.email,
                password: user.password,
                role: user.role
            }
        }).then()
        return request;
    }
    async getAll(){
        const request = await prisma.user.findMany().then()
        return request
    }

    async delete(id){
        const request = await prisma.user.delete({
            where:{
                id: id
            }
        }).then()
    }
}