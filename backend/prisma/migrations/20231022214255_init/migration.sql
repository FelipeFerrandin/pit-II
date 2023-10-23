-- CreateTable
CREATE TABLE `customer` (
    `id_customer` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(155) NOT NULL,
    `complete_name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `birth_date` DATE NOT NULL,
    `phone_number` VARCHAR(20) NOT NULL,
    `active` VARCHAR(3) NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    UNIQUE INDEX `email_UNIQUE`(`email`),
    PRIMARY KEY (`id_customer`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order` (
    `id_order` BIGINT NOT NULL AUTO_INCREMENT,
    `id_customer` BIGINT NOT NULL,
    `status` VARCHAR(50) NOT NULL,
    `total` DECIMAL(15, 2) NOT NULL,
    `active` VARCHAR(3) NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    INDEX `fk_order_customer1_idx`(`id_customer`),
    PRIMARY KEY (`id_order`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_product` (
    `id_order_product` BIGINT NOT NULL AUTO_INCREMENT,
    `id_product` BIGINT NOT NULL,
    `id_order` BIGINT NOT NULL,
    `subtotal` DECIMAL(15, 2) NOT NULL,
    `quantity` INTEGER NOT NULL,

    INDEX `fk_product_has_order_order1_idx`(`id_order`),
    INDEX `fk_product_has_order_product_idx`(`id_product`),
    PRIMARY KEY (`id_order_product`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `id_product` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `price` DECIMAL(15, 2) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `image_base64` LONGTEXT NOT NULL,
    `active` VARCHAR(3) NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    PRIMARY KEY (`id_product`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `customer_address` (
    `id_customer_address` INTEGER NOT NULL AUTO_INCREMENT,
    `id_customer` BIGINT NOT NULL,
    `public_place` VARCHAR(255) NOT NULL,
    `district` VARCHAR(100) NOT NULL,
    `number` INTEGER NOT NULL,
    `city` VARCHAR(100) NOT NULL,
    `state` VARCHAR(100) NOT NULL,
    `country` VARCHAR(100) NOT NULL,
    `active` VARCHAR(3) NOT NULL,
    `created_at` DATETIME(0) NOT NULL,
    `updated_at` DATETIME(0) NOT NULL,

    INDEX `fk_customer_adress_customer1_idx`(`id_customer`),
    PRIMARY KEY (`id_customer_address`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `fk_order_customer1` FOREIGN KEY (`id_customer`) REFERENCES `customer`(`id_customer`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order_product` ADD CONSTRAINT `fk_product_has_order_order1` FOREIGN KEY (`id_order`) REFERENCES `order`(`id_order`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `order_product` ADD CONSTRAINT `fk_product_has_order_product` FOREIGN KEY (`id_product`) REFERENCES `product`(`id_product`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `customer_address` ADD CONSTRAINT `fk_customer_adress_customer1` FOREIGN KEY (`id_customer`) REFERENCES `customer`(`id_customer`) ON DELETE NO ACTION ON UPDATE NO ACTION;
