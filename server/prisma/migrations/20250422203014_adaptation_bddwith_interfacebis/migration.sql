/*
  Warnings:

  - A unique constraint covering the columns `[isEnCours]` on the table `Annee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `isEnCours` to the `Annee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isFinished` to the `Annee` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Annee" ADD COLUMN     "isEnCours" INTEGER NOT NULL,
ADD COLUMN     "isFinished" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Annee_isEnCours_key" ON "Annee"("isEnCours");
