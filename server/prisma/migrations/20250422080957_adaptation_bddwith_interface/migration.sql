/*
  Warnings:

  - You are about to drop the column `type` on the `Owner` table. All the data in the column will be lost.
  - Added the required column `type` to the `Document` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TypeDoc" AS ENUM ('Entrant', 'Sortant');

-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_idAnnee_fkey";

-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "type" "TypeDoc" NOT NULL,
ALTER COLUMN "idAnnee" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Owner" DROP COLUMN "type";

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_idAnnee_fkey" FOREIGN KEY ("idAnnee") REFERENCES "Annee"("id") ON DELETE SET NULL ON UPDATE CASCADE;
