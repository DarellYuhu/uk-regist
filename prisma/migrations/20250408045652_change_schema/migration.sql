/*
  Warnings:

  - A unique constraint covering the columns `[profileId]` on the table `UploadedDocuments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profileId` to the `UploadedDocuments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UploadedDocuments" ADD COLUMN     "profileId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UploadedDocuments_profileId_key" ON "UploadedDocuments"("profileId");

-- AddForeignKey
ALTER TABLE "UploadedDocuments" ADD CONSTRAINT "UploadedDocuments_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "StudentProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
