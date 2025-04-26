/*
  Warnings:

  - You are about to drop the `Email` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmailFile` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `idAnnee` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Email" DROP CONSTRAINT "Email_subFolderId_fkey";

-- DropForeignKey
ALTER TABLE "EmailFile" DROP CONSTRAINT "EmailFile_emailId_fkey";

-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "idAnnee" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Email";

-- DropTable
DROP TABLE "EmailFile";

-- CreateTable
CREATE TABLE "Annee" (
    "id" SERIAL NOT NULL,
    "debut" TIMESTAMP(3) NOT NULL,
    "fin" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Annee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Annee_debut_key" ON "Annee"("debut");

-- CreateIndex
CREATE UNIQUE INDEX "Annee_fin_key" ON "Annee"("fin");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_idAnnee_fkey" FOREIGN KEY ("idAnnee") REFERENCES "Annee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
