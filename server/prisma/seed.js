import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default class Seed {
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
        }).then().catch((e) => {
            throw e;
        }).finally(async () => {
            await prisma.$disconnect();
        })
        return query;
    }
}

// call signup method and create user
const seed = new Seed('admin', 'admin', 'admin@gmail.com', 'admin1234', 'ADMIN');
seed.signup().then(response => {
    console.log(response);
})

// call signup method and create user with role ARCHIVISTE
const seed2 = new Seed('archiviste', 'archiviste', 'archiviste@gmail.com', 'archiviste1234', 'ARCHIVISTE');
seed2.signup().then(response => {
    console.log(response);
})

// call signup method and create user with role ADMIN