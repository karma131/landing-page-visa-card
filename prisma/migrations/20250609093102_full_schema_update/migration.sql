/*
  Warnings:

  - A unique constraint covering the columns `[cccd]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `financialinfo` ADD COLUMN `bankName` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `birthDate` DATETIME(3) NULL,
    ADD COLUMN `cccd` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_cccd_key` ON `User`(`cccd`);
