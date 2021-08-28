-- CreateTable
CREATE TABLE "Challenge" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "language" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "time" INTEGER NOT NULL,
    "memory" INTEGER NOT NULL,
    "challenge_name" TEXT NOT NULL
);
