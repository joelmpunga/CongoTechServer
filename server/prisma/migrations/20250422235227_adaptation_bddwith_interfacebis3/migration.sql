/*
  Warnings:

  - Changed the type of `type` on the `Document` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "TypeDoc" AS ENUM ('Entrant', 'Sortant');

-- AlterTable
ALTER TABLE "Document" DROP COLUMN "type",
ADD COLUMN     "type" "TypeDoc" NOT NULL;
