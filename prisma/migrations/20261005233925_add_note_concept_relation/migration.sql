/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Note` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Note" DROP COLUMN "createdAt";

-- CreateTable
CREATE TABLE "_ConceptToNote" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ConceptToNote_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ConceptToNote_B_index" ON "_ConceptToNote"("B");

-- AddForeignKey
ALTER TABLE "_ConceptToNote" ADD CONSTRAINT "_ConceptToNote_A_fkey" FOREIGN KEY ("A") REFERENCES "Concept"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ConceptToNote" ADD CONSTRAINT "_ConceptToNote_B_fkey" FOREIGN KEY ("B") REFERENCES "Note"("id") ON DELETE CASCADE ON UPDATE CASCADE;
