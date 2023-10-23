/*
  Warnings:

  - Added the required column `id_customer_address` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `id_customer_address` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `fk_order_customer_address1_idx` ON `order`(`id_customer_address`);

-- AddForeignKey
ALTER TABLE `order` ADD CONSTRAINT `fk_order_customer_address1` FOREIGN KEY (`id_customer_address`) REFERENCES `customer_address`(`id_customer_address`) ON DELETE NO ACTION ON UPDATE NO ACTION;
