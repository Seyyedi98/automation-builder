/*
  Warnings:

  - A unique constraint covering the columns `[localGoogleId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[googleResourceId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `credits` VARCHAR(191) NULL DEFAULT '10',
    ADD COLUMN `googleResourceId` VARCHAR(191) NULL,
    ADD COLUMN `localGoogleId` VARCHAR(191) NULL,
    ADD COLUMN `tier` VARCHAR(191) NULL DEFAULT 'Free',
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `LocalGoogleCredential` (
    `id` VARCHAR(191) NOT NULL,
    `accessToken` VARCHAR(191) NOT NULL,
    `folderId` VARCHAR(191) NULL,
    `pageToken` VARCHAR(191) NULL,
    `channelId` VARCHAR(191) NOT NULL,
    `subscribed` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `LocalGoogleCredential_accessToken_key`(`accessToken`),
    UNIQUE INDEX `LocalGoogleCredential_channelId_key`(`channelId`),
    UNIQUE INDEX `LocalGoogleCredential_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DiscordWebhook` (
    `id` VARCHAR(191) NOT NULL,
    `webhookId` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `guildName` VARCHAR(191) NOT NULL,
    `guildId` VARCHAR(191) NOT NULL,
    `channelId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `DiscordWebhook_webhookId_key`(`webhookId`),
    UNIQUE INDEX `DiscordWebhook_url_key`(`url`),
    UNIQUE INDEX `DiscordWebhook_channelId_key`(`channelId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Slack` (
    `id` VARCHAR(191) NOT NULL,
    `appId` VARCHAR(191) NOT NULL,
    `authedUserId` VARCHAR(191) NOT NULL,
    `authedUserToken` VARCHAR(191) NOT NULL,
    `slackAccessToken` VARCHAR(191) NOT NULL,
    `botUserId` VARCHAR(191) NOT NULL,
    `teamId` VARCHAR(191) NOT NULL,
    `teamName` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Slack_authedUserToken_key`(`authedUserToken`),
    UNIQUE INDEX `Slack_slackAccessToken_key`(`slackAccessToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notion` (
    `id` VARCHAR(191) NOT NULL,
    `accessToken` VARCHAR(191) NOT NULL,
    `workspaceId` VARCHAR(191) NOT NULL,
    `databaseId` VARCHAR(191) NOT NULL,
    `workspaceName` VARCHAR(191) NOT NULL,
    `workspaceIcon` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Notion_accessToken_key`(`accessToken`),
    UNIQUE INDEX `Notion_workspaceId_key`(`workspaceId`),
    UNIQUE INDEX `Notion_databaseId_key`(`databaseId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Connections` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `discordWebhookId` VARCHAR(191) NULL,
    `notionId` VARCHAR(191) NULL,
    `userId` VARCHAR(191) NULL,
    `slackId` VARCHAR(191) NULL,

    UNIQUE INDEX `Connections_type_key`(`type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Workflows` (
    `id` VARCHAR(191) NOT NULL,
    `nodes` VARCHAR(191) NULL,
    `edges` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `discordTemplate` VARCHAR(191) NULL,
    `notionTemplate` VARCHAR(191) NULL,
    `slackTemplate` VARCHAR(191) NULL,
    `slackAccessToken` VARCHAR(191) NULL,
    `notionAccessToken` VARCHAR(191) NULL,
    `notionDbId` VARCHAR(191) NULL,
    `flowPath` VARCHAR(191) NULL,
    `cronPath` VARCHAR(191) NULL,
    `publish` BOOLEAN NULL DEFAULT false,
    `description` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `User_localGoogleId_key` ON `User`(`localGoogleId`);

-- CreateIndex
CREATE UNIQUE INDEX `User_googleResourceId_key` ON `User`(`googleResourceId`);

-- AddForeignKey
ALTER TABLE `LocalGoogleCredential` ADD CONSTRAINT `LocalGoogleCredential_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DiscordWebhook` ADD CONSTRAINT `DiscordWebhook_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`clerkId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Slack` ADD CONSTRAINT `Slack_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`clerkId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notion` ADD CONSTRAINT `Notion_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`clerkId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Connections` ADD CONSTRAINT `Connections_discordWebhookId_fkey` FOREIGN KEY (`discordWebhookId`) REFERENCES `DiscordWebhook`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Connections` ADD CONSTRAINT `Connections_notionId_fkey` FOREIGN KEY (`notionId`) REFERENCES `Notion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Connections` ADD CONSTRAINT `Connections_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`clerkId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Connections` ADD CONSTRAINT `Connections_slackId_fkey` FOREIGN KEY (`slackId`) REFERENCES `Slack`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Workflows` ADD CONSTRAINT `Workflows_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`clerkId`) ON DELETE RESTRICT ON UPDATE CASCADE;
