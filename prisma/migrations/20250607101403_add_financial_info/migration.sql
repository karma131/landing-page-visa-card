-- DropIndex
DROP INDEX `User_email_key` ON `user`;

-- CreateTable
CREATE TABLE `FinancialInfo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `occupation` VARCHAR(191) NOT NULL,
    `companyName` VARCHAR(191) NOT NULL,
    `companyAddr` VARCHAR(191) NOT NULL,
    `income` INTEGER NOT NULL,
    `salaryMethod` VARCHAR(191) NOT NULL,
    `bankAccount` VARCHAR(191) NULL,
    `proof` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `FinancialInfo_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FinancialInfo` ADD CONSTRAINT `FinancialInfo_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
