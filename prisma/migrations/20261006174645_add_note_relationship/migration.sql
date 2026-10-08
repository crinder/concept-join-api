-- CreateTable
CREATE TABLE "ConceptRelationship" (
    "id" SERIAL NOT NULL,
    "fromConceptId" INTEGER NOT NULL,
    "toConceptId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "ConceptRelationship_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ConceptRelationship" ADD CONSTRAINT "ConceptRelationship_fromConceptId_fkey" FOREIGN KEY ("fromConceptId") REFERENCES "Concept"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConceptRelationship" ADD CONSTRAINT "ConceptRelationship_toConceptId_fkey" FOREIGN KEY ("toConceptId") REFERENCES "Concept"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
