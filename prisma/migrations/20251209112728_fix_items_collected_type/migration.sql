/*
  Warnings:

  - The `itemsCollected` column on the `EscapeResult` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "EscapeResult" DROP COLUMN "itemsCollected",
ADD COLUMN     "itemsCollected" TEXT[];
