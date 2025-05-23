import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default class Annee {
    constructor(debut,fin) {
        this.debut = debut;
        this.fin = fin;
    }
    async create() {
        const query = await prisma.annee.create({
            data: {
                debut: new Date(this.debut),
                fin: new Date(this.fin)
            }
        }).then()
        return query;
    }
    async getAll(){
        const query = await prisma.annee.findMany().then()
        return query
    }

    async getById(id){
        const query = await prisma.annee.findFirst({
            where:{
                id: id,
            }
        }).then()
        return query
    }

    async setAnneeEnCours(id) {
        await prisma.annee.updateMany({
          data: { isEnCours: 0 }
        });
      
        const query = await prisma.annee.update({
          where: { id },
          data: { isEnCours: 1 }
        });
      
        return query;
      }

      async setCloturerAnnee(id) {
        await prisma.annee.updateMany({
          data: { isEnCours: 0 }
        });
      
        const query = await prisma.annee.update({
          where: { id },
          data: { isEnCours: 0 }
        });
        return query;
      }
      
    async delete(id){
        const query = await prisma.annee.delete({
            where:{
                id: id
            }
        }).then()
    }
}