CREATE TABLE IF NOT EXISTS `capstone_agriculture_db`.`notification_table` (
  `notification_id` INT NOT NULL AUTO_INCREMENT,
  `date` DATE NULL,
  `notification_title` VARCHAR(45) NULL,
  `notification_desc` TINYTEXT NULL,
  `farm_id` INT NULL,
  `url` TINYTEXT NULL,
  `icon` VARCHAR(45) NULL,
  PRIMARY KEY (`notification_id`),
  INDEX `farm_id_notif_idx` (`farm_id` ASC) VISIBLE,
  CONSTRAINT `farm_id_notif`
    FOREIGN KEY (`farm_id`)
    REFERENCES `capstone_agriculture_db`.`farm_table` (`farm_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB