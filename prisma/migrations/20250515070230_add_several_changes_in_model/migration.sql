-- AlterTable
ALTER TABLE "StudentProfile" ADD COLUMN     "alamat" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "testBahasaIndonesia" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "testMatematika" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "RejectionMessage" (
    "studentProfileId" INTEGER NOT NULL,
    "doctor" TEXT,
    "registrar" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "RejectionMessage_studentProfileId_key" ON "RejectionMessage"("studentProfileId");

-- AddForeignKey
ALTER TABLE "RejectionMessage" ADD CONSTRAINT "RejectionMessage_studentProfileId_fkey" FOREIGN KEY ("studentProfileId") REFERENCES "StudentProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
