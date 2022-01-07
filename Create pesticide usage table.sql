CREATE TABLE IF NOT EXISTS `capstone_agriculture_db`.`pesticide_usage` (
  `pesticide_usage_id` INT NOT NULL AUTO_INCREMENT,
  `pesticide_id` INT NOT NULL,
  `farm_id` INT NULL,
  `date_used` DATE NULL,
  `calendar_id` INT NULL,
  `amount` FLOAT NULL,
  PRIMARY KEY (`pesticide_usage_id`),
  INDEX `pesticide_id_usage_idx` (`pesticide_id` ASC) VISIBLE,
  INDEX `farm_id_pesticide_idx` (`farm_id` ASC) VISIBLE,
  INDEX `calendar_id_pesticide_usage_idx` (`calendar_id` ASC) VISIBLE,
  CONSTRAINT `pesticide_id_usage`
    FOREIGN KEY (`pesticide_id`)
    REFERENCES `capstone_agriculture_db`.`pesticide_table` (`pesticide_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `farm_id_pesticide`
    FOREIGN KEY (`farm_id`)
    REFERENCES `capstone_agriculture_db`.`farm_table` (`farm_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `calendar_id_pesticide_usage`
    FOREIGN KEY (`calendar_id`)
    REFERENCES `capstone_agriculture_db`.`crop_calendar_table` (`calendar_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;