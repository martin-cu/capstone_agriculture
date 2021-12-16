CREATE TABLE IF NOT EXISTS `capstone_agriculture_db`.`diagnosis_symptom` (
  `diagnosis_symptom_id` INT NOT NULL AUTO_INCREMENT,
  `diagnosis_id` INT NOT NULL,
  `symptom_id` INT NOT NULL,
  PRIMARY KEY (`diagnosis_symptom_id`),
  INDEX `diagnosis_id_symp_idx` (`diagnosis_id` ASC) VISIBLE,
  INDEX `symptom_diagnosis_fk_idx` (`symptom_id` ASC) VISIBLE,
  CONSTRAINT `diagnosis_id_symp`
    FOREIGN KEY (`diagnosis_id`)
    REFERENCES `capstone_agriculture_db`.`diagnosis` (`diagnosis_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `symptom_diagnosis_fk`
    FOREIGN KEY (`symptom_id`)
    REFERENCES `capstone_agriculture_db`.`symptoms_table` (`symptom_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;