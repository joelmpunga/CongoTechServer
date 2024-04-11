import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import fileRoutes from './routes/fileRoutes.js';
import ownersRoutes from './routes/ownerRoutes.js';
import foldersRoutes from './routes/folderRoutes.js';
import subfolderRoutes from './routes/subFolderRoutes.js';
const port = 3000 || process.env.PORT
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import emailRoutes from './routes/EmailRoutes.js';

class App {
    constructor() {
        this.server = express();
        this.server.use(express.json());
        this.server.use(cors())
        this.server.use(express.urlencoded({ extended: true }));
        this.server.use('/user', userRoutes);
        this.server.use('/file',fileRoutes);
        this.server.use('/owner',ownersRoutes)
        this.server.use('/folder',foldersRoutes)
        this.server.use('/subfolder',subfolderRoutes)
        this.server.use('/emails', emailRoutes)
        this.server.use('/file', fileRoutes);
        this.server.use('/owner', ownersRoutes)
        this.server.use('/folder', foldersRoutes)
        this.server.use('/subfolder', subfolderRoutes)
    }
    start() {
        this.server.listen(port, () => {
            console.log(`Server running on port ${port}, to run project http://localhost:${port}`);
        });
    }
}
const app = new App();
app.start();
export default app.server








//DATABASE_URL="postgresql://usermail:mailtest&2024@localhost:5432/mailtest"

// model User {
//     id        Int        @id @default(autoincrement())
//     nom       String
//     postnom   String?
//     email     String     @unique
//     password  String
//     role      Role       @default(SECRETAIRE)
//     createdAt DateTime   @default(now())
//     Document  Document[]
//     Audit     Audit[]
//   }
  
//   enum Role {
//     ADMIN
//     SECRETAIRE
//   }
  
//   model Owner {
//     id          Int        @id @default(autoincrement())
//     nom         String
//     type        String
//     description String?
//     createdAt   DateTime   @default(now())
//     Document    Document[]
//   }
  
//   model Folder {
//     id          Int         @id @default(autoincrement())
//     titre       String      @unique
//     description String?
//     createdAt   DateTime    @default(now())
//     SubFolder   SubFolder[]
//   }
  
//   model SubFolder {
//     id          Int        @id @default(autoincrement())
//     titre       String     @unique
//     description String?
//     createdAt   DateTime   @default(now())
//     folders     Folder     @relation(fields: [idFolder], references: [id])
//     idFolder    Int
//     Email       Email[]
//     Document    Document[]
//   }
  
//   model Email {
//     id          Int         @id @default(autoincrement())
//     subject     String?
//     from        String
//     to          String
//     date        DateTime
//     text        String?
//     description String?
//     archivedat  DateTime    @default(now())
//     SubFolder   SubFolder?  @relation(fields: [subFolderId], references: [id])
//     subFolderId Int?
//     EmailFile   EmailFile[]
//   }
  
//   model EmailFile {
//     id          Int      @id @default(autoincrement())
//     name        String   @unique
//     path        String   @unique
//     description String?
//     createdAt   DateTime @default(now())
//     Email       Email?   @relation(fields: [emailId], references: [id])
//     emailId     Int?
//   }
  
//   model Document {
//     id          Int        @id @default(autoincrement())
//     name        String     @unique
//     path        String     @unique
//     description String?
//     createdAt   DateTime   @default(now())
//     users       User       @relation(fields: [idUser], references: [id])
//     idUser      Int
//     owners      Owner      @relation(fields: [idOwner], references: [id])
//     idOwner     Int
//     Audit       Audit[]
//     SubFolder   SubFolder? @relation(fields: [subFolderId], references: [id])
//     subFolderId Int?
//   }
  
//   model Audit {
//     id           Int       @id @default(autoincrement())
//     manipulation String?
//     openAt       DateTime  @default(now())
//     users        User      @relation(fields: [idUser], references: [id])
//     idUser       Int
//     Document     Document? @relation(fields: [documentId], references: [id])
//     documentId   Int?
//   }