-- CreateTable
CREATE TABLE "Log" (
    "id" SERIAL NOT NULL,
    "table_name" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "record_id" INTEGER NOT NULL,
    "timestamp" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);
