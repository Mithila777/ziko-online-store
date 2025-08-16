/*
  Warnings:

  - You are about to drop the column `disscount` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "disscount",
ADD COLUMN     "discount" INTEGER;
