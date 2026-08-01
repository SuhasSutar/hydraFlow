-- CreateTable
CREATE TABLE `Company` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `type` ENUM('MANUFACTURER', 'DEALER', 'SERVICE_PROVIDER') NOT NULL,
    `registrationNumber` VARCHAR(191) NULL,
    `addressLine1` VARCHAR(191) NULL,
    `addressLine2` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `state` VARCHAR(191) NULL,
    `pincode` VARCHAR(191) NULL,
    `country` VARCHAR(191) NOT NULL DEFAULT 'India',
    `phone` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `logoUrl` VARCHAR(191) NULL,
    `status` ENUM('ACTIVE', 'SUSPENDED', 'DEACTIVATED') NOT NULL DEFAULT 'ACTIVE',
    `subscriptionPlan` ENUM('BASIC', 'PROFESSIONAL', 'ENTERPRISE') NOT NULL DEFAULT 'BASIC',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Company_registrationNumber_key`(`registrationNumber`),
    INDEX `Company_type_status_idx`(`type`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `companyId` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `passwordHash` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `role` ENUM('SUPER_ADMIN', 'ADMIN', 'MANUFACTURER_USER', 'DEALER_USER', 'SERVICE_ENGINEER', 'CUSTOMER') NOT NULL,
    `avatarUrl` VARCHAR(191) NULL,
    `isVerified` BOOLEAN NOT NULL DEFAULT false,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `lastLoginAt` DATETIME(3) NULL,
    `pushNotifications` BOOLEAN NOT NULL DEFAULT true,
    `emailNotifications` BOOLEAN NOT NULL DEFAULT true,
    `smsNotifications` BOOLEAN NOT NULL DEFAULT false,
    `refreshToken` VARCHAR(500) NULL,
    `passwordResetToken` VARCHAR(191) NULL,
    `passwordResetExpires` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    INDEX `User_role_isActive_idx`(`role`, `isActive`),
    INDEX `User_companyId_idx`(`companyId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CustomerProfile` (
    `id` VARCHAR(191) NOT NULL,
    `addressLine1` VARCHAR(191) NULL,
    `addressLine2` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `state` VARCHAR(191) NULL,
    `pincode` VARCHAR(191) NULL,
    `latitude` DOUBLE NULL,
    `longitude` DOUBLE NULL,
    `preferredContactTime` VARCHAR(191) NULL,
    `registeredByDealerId` VARCHAR(191) NULL,

    INDEX `CustomerProfile_registeredByDealerId_idx`(`registeredByDealerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductCategory` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `iconUrl` VARCHAR(191) NULL,
    `parentId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `ProductCategory_parentId_idx`(`parentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductModel` (
    `id` VARCHAR(191) NOT NULL,
    `manufacturerId` VARCHAR(191) NOT NULL,
    `categoryId` VARCHAR(191) NOT NULL,
    `modelName` VARCHAR(191) NOT NULL,
    `modelNumber` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `powerHp` DOUBLE NULL,
    `voltage` DOUBLE NULL,
    `phase` ENUM('SINGLE', 'THREE') NULL,
    `flowRateLpm` DOUBLE NULL,
    `headM` DOUBLE NULL,
    `inletSize` VARCHAR(191) NULL,
    `outletSize` VARCHAR(191) NULL,
    `material` VARCHAR(191) NULL,
    `weight` DOUBLE NULL,
    `mrp` DECIMAL(12, 2) NOT NULL,
    `dealerPrice` DECIMAL(12, 2) NOT NULL,
    `warrantyMonths` INTEGER NOT NULL DEFAULT 12,
    `isIoTEnabled` BOOLEAN NOT NULL DEFAULT false,
    `images` JSON NULL,
    `status` ENUM('ACTIVE', 'DISCONTINUED', 'DRAFT') NOT NULL DEFAULT 'DRAFT',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ProductModel_modelNumber_key`(`modelNumber`),
    INDEX `ProductModel_manufacturerId_status_idx`(`manufacturerId`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PumpUnit` (
    `id` VARCHAR(191) NOT NULL,
    `modelId` VARCHAR(191) NOT NULL,
    `serialNumber` VARCHAR(191) NOT NULL,
    `manufacturingDate` DATETIME(3) NULL,
    `batchNumber` VARCHAR(191) NULL,
    `qrCode` VARCHAR(191) NULL,
    `iotDeviceId` VARCHAR(191) NULL,
    `currentOwnerId` VARCHAR(191) NULL,
    `currentDealerId` VARCHAR(191) NULL,
    `status` ENUM('IN_FACTORY', 'IN_TRANSIT', 'AT_DEALER', 'SOLD', 'INSTALLED', 'DECOMMISSIONED') NOT NULL DEFAULT 'IN_FACTORY',
    `installationId` VARCHAR(191) NULL,
    `latitude` DOUBLE NULL,
    `longitude` DOUBLE NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PumpUnit_serialNumber_key`(`serialNumber`),
    UNIQUE INDEX `PumpUnit_qrCode_key`(`qrCode`),
    UNIQUE INDEX `PumpUnit_iotDeviceId_key`(`iotDeviceId`),
    INDEX `PumpUnit_currentOwnerId_idx`(`currentOwnerId`),
    INDEX `PumpUnit_currentDealerId_status_idx`(`currentDealerId`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InventoryStock` (
    `id` VARCHAR(191) NOT NULL,
    `companyId` VARCHAR(191) NOT NULL,
    `modelId` VARCHAR(191) NOT NULL,
    `quantityOnHand` INTEGER NOT NULL DEFAULT 0,
    `quantityReserved` INTEGER NOT NULL DEFAULT 0,
    `reorderLevel` INTEGER NOT NULL DEFAULT 5,
    `warehouseLocation` VARCHAR(191) NULL,
    `lastRestockedAt` DATETIME(3) NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `InventoryStock_companyId_modelId_key`(`companyId`, `modelId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FieldInventory` (
    `id` VARCHAR(191) NOT NULL,
    `engineerId` VARCHAR(191) NOT NULL,
    `partName` VARCHAR(191) NOT NULL,
    `partNumber` VARCHAR(191) NULL,
    `quantity` INTEGER NOT NULL,
    `category` ENUM('SPARE_PART', 'TOOL', 'CONSUMABLE') NOT NULL,
    `lastReplenishedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `FieldInventory_engineerId_idx`(`engineerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` VARCHAR(191) NOT NULL,
    `orderNumber` VARCHAR(191) NOT NULL,
    `dealerId` VARCHAR(191) NOT NULL,
    `manufacturerId` VARCHAR(191) NOT NULL,
    `status` ENUM('DRAFT', 'SUBMITTED', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED') NOT NULL DEFAULT 'DRAFT',
    `totalAmount` DECIMAL(14, 2) NOT NULL,
    `discountPercent` DECIMAL(5, 2) NOT NULL DEFAULT 0,
    `taxAmount` DECIMAL(12, 2) NOT NULL DEFAULT 0,
    `notes` VARCHAR(191) NULL,
    `orderedAt` DATETIME(3) NULL,
    `expectedDelivery` DATETIME(3) NULL,
    `deliveredAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Order_orderNumber_key`(`orderNumber`),
    INDEX `Order_dealerId_status_idx`(`dealerId`, `status`),
    INDEX `Order_manufacturerId_status_idx`(`manufacturerId`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderItem` (
    `id` VARCHAR(191) NOT NULL,
    `orderId` VARCHAR(191) NOT NULL,
    `modelId` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `unitPrice` DECIMAL(12, 2) NOT NULL,
    `lineTotal` DECIMAL(12, 2) NOT NULL,

    INDEX `OrderItem_orderId_idx`(`orderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sale` (
    `id` VARCHAR(191) NOT NULL,
    `saleNumber` VARCHAR(191) NOT NULL,
    `dealerId` VARCHAR(191) NOT NULL,
    `customerId` VARCHAR(191) NOT NULL,
    `pumpUnitId` VARCHAR(191) NOT NULL,
    `salePrice` DECIMAL(12, 2) NOT NULL,
    `saleDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `invoiceUrl` VARCHAR(191) NULL,
    `paymentMethod` ENUM('CASH', 'UPI', 'CARD', 'BANK_TRANSFER', 'FINANCING') NOT NULL,

    UNIQUE INDEX `Sale_saleNumber_key`(`saleNumber`),
    INDEX `Sale_dealerId_idx`(`dealerId`),
    INDEX `Sale_customerId_idx`(`customerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Installation` (
    `id` VARCHAR(191) NOT NULL,
    `installationNumber` VARCHAR(191) NOT NULL,
    `pumpUnitId` VARCHAR(191) NOT NULL,
    `customerId` VARCHAR(191) NOT NULL,
    `dealerId` VARCHAR(191) NOT NULL,
    `engineerId` VARCHAR(191) NULL,
    `status` ENUM('REQUESTED', 'SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'VERIFIED', 'CANCELLED') NOT NULL DEFAULT 'REQUESTED',
    `scheduledDate` DATETIME(3) NULL,
    `scheduledTimeSlot` VARCHAR(191) NULL,
    `installationType` ENUM('NEW', 'REPLACEMENT', 'RELOCATION') NOT NULL DEFAULT 'NEW',
    `addressLine1` VARCHAR(191) NOT NULL,
    `addressLine2` VARCHAR(191) NULL,
    `city` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,
    `pincode` VARCHAR(191) NOT NULL,
    `latitude` DOUBLE NULL,
    `longitude` DOUBLE NULL,
    `borewellDepthFt` DOUBLE NULL,
    `waterTableDepthFt` DOUBLE NULL,
    `powerSupplyType` ENUM('SINGLE_PHASE', 'THREE_PHASE', 'SOLAR') NULL,
    `notes` VARCHAR(191) NULL,
    `startedAt` DATETIME(3) NULL,
    `completedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Installation_installationNumber_key`(`installationNumber`),
    INDEX `Installation_engineerId_status_idx`(`engineerId`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InstallationChecklist` (
    `id` VARCHAR(191) NOT NULL,
    `installationId` VARCHAR(191) NOT NULL,
    `stepNumber` INTEGER NOT NULL,
    `stepTitle` VARCHAR(191) NOT NULL,
    `isCompleted` BOOLEAN NOT NULL DEFAULT false,
    `completedBy` VARCHAR(191) NULL,
    `completedAt` DATETIME(3) NULL,
    `notes` VARCHAR(191) NULL,
    `photoUrls` JSON NULL,

    INDEX `InstallationChecklist_installationId_idx`(`installationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Warranty` (
    `id` VARCHAR(191) NOT NULL,
    `pumpUnitId` VARCHAR(191) NOT NULL,
    `warrantyType` ENUM('STANDARD', 'EXTENDED', 'PREMIUM') NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `status` ENUM('ACTIVE', 'EXPIRED', 'VOIDED', 'CLAIMED') NOT NULL DEFAULT 'ACTIVE',
    `termsDocumentUrl` VARCHAR(191) NULL,
    `registeredBy` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Warranty_pumpUnitId_key`(`pumpUnitId`),
    INDEX `Warranty_endDate_status_idx`(`endDate`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `WarrantyClaim` (
    `id` VARCHAR(191) NOT NULL,
    `claimNumber` VARCHAR(191) NOT NULL,
    `warrantyId` VARCHAR(191) NOT NULL,
    `customerId` VARCHAR(191) NOT NULL,
    `issueDescription` VARCHAR(191) NOT NULL,
    `claimType` ENUM('REPAIR', 'REPLACEMENT', 'REFUND') NOT NULL,
    `status` ENUM('SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'RESOLVED') NOT NULL DEFAULT 'SUBMITTED',
    `resolutionNotes` VARCHAR(191) NULL,
    `serviceTicketId` VARCHAR(191) NULL,
    `filedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `resolvedAt` DATETIME(3) NULL,

    UNIQUE INDEX `WarrantyClaim_claimNumber_key`(`claimNumber`),
    INDEX `WarrantyClaim_warrantyId_idx`(`warrantyId`),
    INDEX `WarrantyClaim_customerId_idx`(`customerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AMCContract` (
    `id` VARCHAR(191) NOT NULL,
    `contractNumber` VARCHAR(191) NOT NULL,
    `customerId` VARCHAR(191) NOT NULL,
    `pumpUnitId` VARCHAR(191) NOT NULL,
    `planType` ENUM('BASIC', 'SILVER', 'GOLD', 'PLATINUM') NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `annualFee` DECIMAL(10, 2) NULL,
    `visitsIncluded` INTEGER NOT NULL,
    `visitsUsed` INTEGER NOT NULL DEFAULT 0,
    `status` ENUM('ACTIVE', 'EXPIRED', 'CANCELLED', 'RENEWED') NOT NULL DEFAULT 'ACTIVE',
    `autoRenew` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `AMCContract_contractNumber_key`(`contractNumber`),
    INDEX `AMCContract_customerId_idx`(`customerId`),
    INDEX `AMCContract_endDate_status_idx`(`endDate`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServiceTicket` (
    `id` VARCHAR(191) NOT NULL,
    `ticketNumber` VARCHAR(191) NOT NULL,
    `pumpUnitId` VARCHAR(191) NOT NULL,
    `customerId` VARCHAR(191) NOT NULL,
    `assignedEngineerId` VARCHAR(191) NULL,
    `dealerId` VARCHAR(191) NULL,
    `type` ENUM('REPAIR', 'MAINTENANCE', 'INSPECTION', 'INSTALLATION', 'WARRANTY_CLAIM') NOT NULL,
    `priority` ENUM('CRITICAL', 'HIGH', 'MEDIUM', 'LOW') NOT NULL DEFAULT 'MEDIUM',
    `status` ENUM('OPEN', 'ASSIGNED', 'EN_ROUTE', 'IN_PROGRESS', 'PENDING_PARTS', 'COMPLETED', 'SIGNED_OFF', 'CANCELLED') NOT NULL DEFAULT 'OPEN',
    `issueSummary` VARCHAR(500) NOT NULL,
    `issueDescription` VARCHAR(191) NULL,
    `reportedFaultCode` VARCHAR(191) NULL,
    `diagnosis` VARCHAR(191) NULL,
    `resolution` VARCHAR(191) NULL,
    `scheduledDate` DATETIME(3) NULL,
    `scheduledTimeSlot` VARCHAR(191) NULL,
    `slaDueAt` DATETIME(3) NULL,
    `startedAt` DATETIME(3) NULL,
    `completedAt` DATETIME(3) NULL,
    `signedOffAt` DATETIME(3) NULL,
    `customerSignatureUrl` VARCHAR(191) NULL,
    `customerRating` INTEGER NULL,
    `customerFeedback` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ServiceTicket_ticketNumber_key`(`ticketNumber`),
    INDEX `ServiceTicket_assignedEngineerId_status_idx`(`assignedEngineerId`, `status`),
    INDEX `ServiceTicket_customerId_status_idx`(`customerId`, `status`),
    INDEX `ServiceTicket_slaDueAt_status_idx`(`slaDueAt`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServiceTicketPart` (
    `id` VARCHAR(191) NOT NULL,
    `ticketId` VARCHAR(191) NOT NULL,
    `partName` VARCHAR(191) NOT NULL,
    `partNumber` VARCHAR(191) NULL,
    `quantity` INTEGER NOT NULL,
    `unitCost` DECIMAL(10, 2) NULL,
    `isWarrantyCovered` BOOLEAN NOT NULL DEFAULT false,

    INDEX `ServiceTicketPart_ticketId_idx`(`ticketId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServiceTicketPhoto` (
    `id` VARCHAR(191) NOT NULL,
    `ticketId` VARCHAR(191) NOT NULL,
    `photoUrl` VARCHAR(191) NOT NULL,
    `caption` VARCHAR(191) NULL,
    `phase` ENUM('BEFORE', 'DURING', 'AFTER') NOT NULL,
    `uploadedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `ServiceTicketPhoto_ticketId_idx`(`ticketId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ServiceTicketTimeline` (
    `id` VARCHAR(191) NOT NULL,
    `ticketId` VARCHAR(191) NOT NULL,
    `action` VARCHAR(191) NOT NULL,
    `performedBy` VARCHAR(191) NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `metadata` JSON NULL,

    INDEX `ServiceTicketTimeline_ticketId_idx`(`ticketId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IoTDevice` (
    `id` VARCHAR(191) NOT NULL,
    `deviceId` VARCHAR(191) NOT NULL,
    `pumpUnitId` VARCHAR(191) NOT NULL,
    `firmwareVersion` VARCHAR(191) NULL,
    `connectivityType` ENUM('FOUR_G', 'WIFI', 'LORA', 'SATELLITE') NULL,
    `lastSeenAt` DATETIME(3) NULL,
    `status` ENUM('ONLINE', 'OFFLINE', 'MAINTENANCE', 'FAULTY') NOT NULL DEFAULT 'OFFLINE',
    `batteryLevel` DOUBLE NULL,
    `signalStrengthDbm` INTEGER NULL,
    `registeredAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `IoTDevice_deviceId_key`(`deviceId`),
    UNIQUE INDEX `IoTDevice_pumpUnitId_key`(`pumpUnitId`),
    INDEX `IoTDevice_status_idx`(`status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TelemetryData` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `deviceId` VARCHAR(191) NOT NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `temperatureC` DOUBLE NULL,
    `pressureBar` DOUBLE NULL,
    `flowRateLpm` DOUBLE NULL,
    `voltageV` DOUBLE NULL,
    `currentA` DOUBLE NULL,
    `powerKw` DOUBLE NULL,
    `rpm` INTEGER NULL,
    `vibrationMmS` DOUBLE NULL,
    `waterLevelM` DOUBLE NULL,
    `runHours` DOUBLE NULL,

    INDEX `TelemetryData_deviceId_timestamp_idx`(`deviceId`, `timestamp` DESC),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IoTAlert` (
    `id` VARCHAR(191) NOT NULL,
    `deviceId` VARCHAR(191) NOT NULL,
    `pumpUnitId` VARCHAR(191) NOT NULL,
    `alertType` ENUM('OVER_TEMP', 'LOW_PRESSURE', 'OVER_VOLTAGE', 'DRY_RUN', 'HIGH_VIBRATION', 'OFFLINE', 'ANOMALY') NOT NULL,
    `severity` ENUM('CRITICAL', 'WARNING', 'INFO') NOT NULL,
    `message` VARCHAR(191) NULL,
    `metricName` VARCHAR(191) NULL,
    `metricValue` DOUBLE NULL,
    `thresholdValue` DOUBLE NULL,
    `isAcknowledged` BOOLEAN NOT NULL DEFAULT false,
    `acknowledgedBy` VARCHAR(191) NULL,
    `autoGeneratedTicketId` VARCHAR(191) NULL,
    `triggeredAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `resolvedAt` DATETIME(3) NULL,

    INDEX `IoTAlert_deviceId_triggeredAt_idx`(`deviceId`, `triggeredAt` DESC),
    INDEX `IoTAlert_isAcknowledged_severity_idx`(`isAcknowledged`, `severity`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IoTAlertRule` (
    `id` VARCHAR(191) NOT NULL,
    `companyId` VARCHAR(191) NULL,
    `modelId` VARCHAR(191) NULL,
    `metricName` VARCHAR(191) NOT NULL,
    `operator` ENUM('GT', 'LT', 'GTE', 'LTE', 'EQ') NOT NULL,
    `threshold` DOUBLE NOT NULL,
    `severity` ENUM('CRITICAL', 'WARNING', 'INFO') NOT NULL,
    `autoCreateTicket` BOOLEAN NOT NULL DEFAULT false,
    `isActive` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notification` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `body` VARCHAR(191) NOT NULL,
    `type` ENUM('SERVICE_UPDATE', 'IOT_ALERT', 'WARRANTY_EXPIRY', 'ORDER_STATUS', 'SYSTEM', 'PROMOTION') NOT NULL,
    `referenceType` VARCHAR(191) NULL,
    `referenceId` VARCHAR(191) NULL,
    `channel` ENUM('IN_APP', 'PUSH', 'EMAIL', 'SMS') NOT NULL DEFAULT 'IN_APP',
    `isRead` BOOLEAN NOT NULL DEFAULT false,
    `readAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Notification_userId_isRead_createdAt_idx`(`userId`, `isRead`, `createdAt` DESC),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AuditLog` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `entityType` VARCHAR(191) NOT NULL,
    `entityId` VARCHAR(191) NOT NULL,
    `action` ENUM('CREATE', 'UPDATE', 'DELETE', 'STATUS_CHANGE') NOT NULL,
    `oldValues` JSON NULL,
    `newValues` JSON NULL,
    `ipAddress` VARCHAR(191) NULL,
    `userAgent` VARCHAR(191) NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `AuditLog_entityType_entityId_timestamp_idx`(`entityType`, `entityId`, `timestamp` DESC),
    INDEX `AuditLog_userId_timestamp_idx`(`userId`, `timestamp` DESC),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomerProfile` ADD CONSTRAINT `CustomerProfile_id_fkey` FOREIGN KEY (`id`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductCategory` ADD CONSTRAINT `ProductCategory_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `ProductCategory`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductModel` ADD CONSTRAINT `ProductModel_manufacturerId_fkey` FOREIGN KEY (`manufacturerId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductModel` ADD CONSTRAINT `ProductModel_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `ProductCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PumpUnit` ADD CONSTRAINT `PumpUnit_modelId_fkey` FOREIGN KEY (`modelId`) REFERENCES `ProductModel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PumpUnit` ADD CONSTRAINT `PumpUnit_currentOwnerId_fkey` FOREIGN KEY (`currentOwnerId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PumpUnit` ADD CONSTRAINT `PumpUnit_currentDealerId_fkey` FOREIGN KEY (`currentDealerId`) REFERENCES `Company`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryStock` ADD CONSTRAINT `InventoryStock_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InventoryStock` ADD CONSTRAINT `InventoryStock_modelId_fkey` FOREIGN KEY (`modelId`) REFERENCES `ProductModel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FieldInventory` ADD CONSTRAINT `FieldInventory_engineerId_fkey` FOREIGN KEY (`engineerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_dealerId_fkey` FOREIGN KEY (`dealerId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_manufacturerId_fkey` FOREIGN KEY (`manufacturerId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_modelId_fkey` FOREIGN KEY (`modelId`) REFERENCES `ProductModel`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sale` ADD CONSTRAINT `Sale_dealerId_fkey` FOREIGN KEY (`dealerId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sale` ADD CONSTRAINT `Sale_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sale` ADD CONSTRAINT `Sale_pumpUnitId_fkey` FOREIGN KEY (`pumpUnitId`) REFERENCES `PumpUnit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Installation` ADD CONSTRAINT `Installation_pumpUnitId_fkey` FOREIGN KEY (`pumpUnitId`) REFERENCES `PumpUnit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Installation` ADD CONSTRAINT `Installation_dealerId_fkey` FOREIGN KEY (`dealerId`) REFERENCES `Company`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Installation` ADD CONSTRAINT `Installation_engineerId_fkey` FOREIGN KEY (`engineerId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InstallationChecklist` ADD CONSTRAINT `InstallationChecklist_installationId_fkey` FOREIGN KEY (`installationId`) REFERENCES `Installation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Warranty` ADD CONSTRAINT `Warranty_pumpUnitId_fkey` FOREIGN KEY (`pumpUnitId`) REFERENCES `PumpUnit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Warranty` ADD CONSTRAINT `Warranty_registeredBy_fkey` FOREIGN KEY (`registeredBy`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WarrantyClaim` ADD CONSTRAINT `WarrantyClaim_warrantyId_fkey` FOREIGN KEY (`warrantyId`) REFERENCES `Warranty`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WarrantyClaim` ADD CONSTRAINT `WarrantyClaim_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `WarrantyClaim` ADD CONSTRAINT `WarrantyClaim_serviceTicketId_fkey` FOREIGN KEY (`serviceTicketId`) REFERENCES `ServiceTicket`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AMCContract` ADD CONSTRAINT `AMCContract_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AMCContract` ADD CONSTRAINT `AMCContract_pumpUnitId_fkey` FOREIGN KEY (`pumpUnitId`) REFERENCES `PumpUnit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiceTicket` ADD CONSTRAINT `ServiceTicket_pumpUnitId_fkey` FOREIGN KEY (`pumpUnitId`) REFERENCES `PumpUnit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiceTicket` ADD CONSTRAINT `ServiceTicket_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiceTicket` ADD CONSTRAINT `ServiceTicket_assignedEngineerId_fkey` FOREIGN KEY (`assignedEngineerId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiceTicket` ADD CONSTRAINT `ServiceTicket_dealerId_fkey` FOREIGN KEY (`dealerId`) REFERENCES `Company`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiceTicketPart` ADD CONSTRAINT `ServiceTicketPart_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `ServiceTicket`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiceTicketPhoto` ADD CONSTRAINT `ServiceTicketPhoto_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `ServiceTicket`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ServiceTicketTimeline` ADD CONSTRAINT `ServiceTicketTimeline_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `ServiceTicket`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IoTDevice` ADD CONSTRAINT `IoTDevice_pumpUnitId_fkey` FOREIGN KEY (`pumpUnitId`) REFERENCES `PumpUnit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IoTAlert` ADD CONSTRAINT `IoTAlert_deviceId_fkey` FOREIGN KEY (`deviceId`) REFERENCES `IoTDevice`(`deviceId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IoTAlert` ADD CONSTRAINT `IoTAlert_pumpUnitId_fkey` FOREIGN KEY (`pumpUnitId`) REFERENCES `PumpUnit`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `IoTAlertRule` ADD CONSTRAINT `IoTAlertRule_modelId_fkey` FOREIGN KEY (`modelId`) REFERENCES `ProductModel`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AuditLog` ADD CONSTRAINT `AuditLog_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
