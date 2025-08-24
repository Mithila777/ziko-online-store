/*
  Warnings:

  - You are about to drop the column `email` on the `ContactMessage` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `ContactMessage` table. All the data in the column will be lost.
  - Added the required column `userId` to the `ContactMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."ContactMessage" DROP COLUMN "email",
DROP COLUMN "name",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."Reply" (
    "id" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "adminId" TEXT,
    "reply" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reply_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."ContactMessage" ADD CONSTRAINT "ContactMessage_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Reply" ADD CONSTRAINT "Reply_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "public"."ContactMessage"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
