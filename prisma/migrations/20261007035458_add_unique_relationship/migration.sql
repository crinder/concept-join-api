/*
  Warnings:

  - A unique constraint covering the columns `[fromConceptId,toConceptId,type]` on the table `ConceptRelationship` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ConceptRelationship_fromConceptId_toConceptId_type_key" ON "ConceptRelationship"("fromConceptId", "toConceptId", "type");
