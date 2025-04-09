/*
  Warnings:

  - A unique constraint covering the columns `[nomorIndukMahasiswa]` on the table `StudentProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "StudentProfile" ADD COLUMN     "nomorIndukMahasiswa" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfile_nomorIndukMahasiswa_key" ON "StudentProfile"("nomorIndukMahasiswa");
