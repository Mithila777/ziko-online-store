/*
  Warnings:

  - You are about to drop the column `reply` on the `Reply` table. All the data in the column will be lost.
  - Added the required column `email` to the `ContactMessage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `ContactMessage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Reply` table without a default value. This is not possible if the table is not empty.
  - Made the column `adminId` on table `Reply` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "public"."ContactMessage" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Reply" DROP COLUMN "reply",
ADD COLUMN     "content" TEXT NOT NULL,
ALTER COLUMN "adminId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Reply" ADD CONSTRAINT "Reply_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
