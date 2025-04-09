/*
  Warnings:

  - You are about to drop the column `aktaKelahiran` on the `StudentProfile` table. All the data in the column will be lost.
  - You are about to drop the column `ijazah` on the `StudentProfile` table. All the data in the column will be lost.
  - You are about to drop the column `kartuKeluarga` on the `StudentProfile` table. All the data in the column will be lost.
  - You are about to drop the column `suratBaptis` on the `StudentProfile` table. All the data in the column will be lost.
  - You are about to drop the column `suratDokter` on the `StudentProfile` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "StudentProfile" DROP CONSTRAINT "StudentProfile_aktaKelahiran_fkey";

-- DropForeignKey
ALTER TABLE "StudentProfile" DROP CONSTRAINT "StudentProfile_ijazah_fkey";

-- DropForeignKey
ALTER TABLE "StudentProfile" DROP CONSTRAINT "StudentProfile_kartuKeluarga_fkey";

-- DropForeignKey
ALTER TABLE "StudentProfile" DROP CONSTRAINT "StudentProfile_suratBaptis_fkey";

-- DropForeignKey
ALTER TABLE "StudentProfile" DROP CONSTRAINT "StudentProfile_suratDokter_fkey";

-- DropIndex
DROP INDEX "StudentProfile_aktaKelahiran_key";

-- DropIndex
DROP INDEX "StudentProfile_ijazah_key";

-- DropIndex
DROP INDEX "StudentProfile_kartuKeluarga_key";

-- DropIndex
DROP INDEX "StudentProfile_suratBaptis_key";

-- DropIndex
DROP INDEX "StudentProfile_suratDokter_key";

-- AlterTable
ALTER TABLE "StudentProfile" DROP COLUMN "aktaKelahiran",
DROP COLUMN "ijazah",
DROP COLUMN "kartuKeluarga",
DROP COLUMN "suratBaptis",
DROP COLUMN "suratDokter";

-- CreateTable
CREATE TABLE "UploadedDocuments" (
    "suratDokter" TEXT NOT NULL,
    "ijazah" TEXT NOT NULL,
    "kartuKeluarga" TEXT NOT NULL,
    "aktaKelahiran" TEXT NOT NULL,
    "suratBaptis" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "UploadedDocuments_suratDokter_key" ON "UploadedDocuments"("suratDokter");

-- CreateIndex
CREATE UNIQUE INDEX "UploadedDocuments_ijazah_key" ON "UploadedDocuments"("ijazah");

-- CreateIndex
CREATE UNIQUE INDEX "UploadedDocuments_kartuKeluarga_key" ON "UploadedDocuments"("kartuKeluarga");

-- CreateIndex
CREATE UNIQUE INDEX "UploadedDocuments_aktaKelahiran_key" ON "UploadedDocuments"("aktaKelahiran");

-- CreateIndex
CREATE UNIQUE INDEX "UploadedDocuments_suratBaptis_key" ON "UploadedDocuments"("suratBaptis");

-- AddForeignKey
ALTER TABLE "UploadedDocuments" ADD CONSTRAINT "UploadedDocuments_suratDokter_fkey" FOREIGN KEY ("suratDokter") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UploadedDocuments" ADD CONSTRAINT "UploadedDocuments_ijazah_fkey" FOREIGN KEY ("ijazah") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UploadedDocuments" ADD CONSTRAINT "UploadedDocuments_kartuKeluarga_fkey" FOREIGN KEY ("kartuKeluarga") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UploadedDocuments" ADD CONSTRAINT "UploadedDocuments_aktaKelahiran_fkey" FOREIGN KEY ("aktaKelahiran") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UploadedDocuments" ADD CONSTRAINT "UploadedDocuments_suratBaptis_fkey" FOREIGN KEY ("suratBaptis") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
