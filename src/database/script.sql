
CREATE SCHEMA `acuttis_test` ;

CREATE TABLE `acuttis_test`.`work_time` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `start` VARCHAR(45) NOT NULL,
  `end` VARCHAR(45) NOT NULL,
  `minutes_daytime` INT UNSIGNED NOT NULL,
  `minutes_nocturnal` INT UNSIGNED NOT NULL,
  `user_email` VARCHAR(45) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`));
