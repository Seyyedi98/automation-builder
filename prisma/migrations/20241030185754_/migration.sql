-- AlterTable
ALTER TABLE `user` MODIFY `credits` VARCHAR(191) NULL DEFAULT '1000';

-- AlterTable
ALTER TABLE `workflows` MODIFY `nodes` LONGTEXT NULL,
    MODIFY `edges` LONGTEXT NULL;
