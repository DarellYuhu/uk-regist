/*
  Warnings:

  - You are about to drop the column `testBahasaIndonesia` on the `StudentProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "StudentProfile" DROP COLUMN "testBahasaIndonesia",
ADD COLUMN     "testBahasaInggris" INTEGER NOT NULL DEFAULT 0;
