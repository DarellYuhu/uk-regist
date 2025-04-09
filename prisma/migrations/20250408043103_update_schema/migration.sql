/*
  Warnings:

  - You are about to drop the `SuratDokter` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[suratDokter]` on the table `StudentProfile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ijazah]` on the table `StudentProfile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[kartuKeluarga]` on the table `StudentProfile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[aktaKelahiran]` on the table `StudentProfile` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[suratBaptis]` on the table `StudentProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `aktaKelahiran` to the `StudentProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ijazah` to the `StudentProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kartuKeluarga` to the `StudentProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `suratDokter` to the `StudentProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggalLahir` to the `StudentProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tempatLahir` to the `StudentProfile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SuratDokter" DROP CONSTRAINT "SuratDokter_fileId_fkey";

-- DropForeignKey
ALTER TABLE "SuratDokter" DROP CONSTRAINT "SuratDokter_profileId_fkey";

-- AlterTable
ALTER TABLE "StudentProfile" ADD COLUMN     "aktaKelahiran" TEXT NOT NULL,
ADD COLUMN     "ijazah" TEXT NOT NULL,
ADD COLUMN     "kartuKeluarga" TEXT NOT NULL,
ADD COLUMN     "suratBaptis" TEXT,
ADD COLUMN     "suratDokter" TEXT NOT NULL,
ADD COLUMN     "tanggalLahir" DATE NOT NULL,
ADD COLUMN     "tempatLahir" TEXT NOT NULL;

-- DropTable
DROP TABLE "SuratDokter";

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfile_suratDokter_key" ON "StudentProfile"("suratDokter");

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfile_ijazah_key" ON "StudentProfile"("ijazah");

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfile_kartuKeluarga_key" ON "StudentProfile"("kartuKeluarga");

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfile_aktaKelahiran_key" ON "StudentProfile"("aktaKelahiran");

-- CreateIndex
CREATE UNIQUE INDEX "StudentProfile_suratBaptis_key" ON "StudentProfile"("suratBaptis");

-- AddForeignKey
ALTER TABLE "StudentProfile" ADD CONSTRAINT "StudentProfile_suratDokter_fkey" FOREIGN KEY ("suratDokter") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProfile" ADD CONSTRAINT "StudentProfile_ijazah_fkey" FOREIGN KEY ("ijazah") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProfile" ADD CONSTRAINT "StudentProfile_kartuKeluarga_fkey" FOREIGN KEY ("kartuKeluarga") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProfile" ADD CONSTRAINT "StudentProfile_aktaKelahiran_fkey" FOREIGN KEY ("aktaKelahiran") REFERENCES "File"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentProfile" ADD CONSTRAINT "StudentProfile_suratBaptis_fkey" FOREIGN KEY ("suratBaptis") REFERENCES "File"("id") ON DELETE SET NULL ON UPDATE CASCADE;
