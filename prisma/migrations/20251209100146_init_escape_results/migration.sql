-- CreateTable
CREATE TABLE "EscapeResult" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "timeRemaining" INTEGER NOT NULL,
    "itemsCollected" INTEGER NOT NULL,
    "notes" TEXT,

    CONSTRAINT "EscapeResult_pkey" PRIMARY KEY ("id")
);
