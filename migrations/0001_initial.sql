
-- CreateTable
CREATE TABLE "PageHit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "count" INTEGER NOT NULL DEFAULT 0,
    "slug" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "PageHit_slug_key" ON "PageHit"("slug");

-- CreateIndex
CREATE INDEX "PageHit_slug_idx" ON "PageHit"("slug");

