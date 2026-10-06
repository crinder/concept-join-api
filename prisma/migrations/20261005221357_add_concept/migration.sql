-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "content" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Concept" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Concept_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Concept_name_key" ON "Concept"("name");
