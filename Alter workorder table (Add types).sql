ALTER TABLE `capstone_agriculture_db`.`work_order_table` 
CHANGE COLUMN `type` `type` ENUM('Land Preparation', 'Sow Seed', 'Pesticide Application', 'Fertilizer Application', 'Harvest', 'Water Fields', 'Remove Weeds', 'Others') NOT NULL ;
