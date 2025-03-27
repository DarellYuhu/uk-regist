-- DropForeignKey
ALTER TABLE "SuratDokter" DROP CONSTRAINT "SuratDokter_profileId_fkey";

-- AddForeignKey
ALTER TABLE "SuratDokter" ADD CONSTRAINT "SuratDokter_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "StudentProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
