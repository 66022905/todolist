/*
  Warnings:

  - Added the required column `category` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `task` ADD COLUMN `category` VARCHAR(191) NOT NULL;
/* addapi */