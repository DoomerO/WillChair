-- MySQL Script generated by MySQL Workbench
-- Mon Jun 19 08:44:03 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema willchair
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema willchair
-- -----------------------------------------------------
Drop database if exists `willchair`;
CREATE SCHEMA IF NOT EXISTS `willchair` DEFAULT CHARACTER SET utf8 ;
USE `willchair` ;

-- -----------------------------------------------------
-- Table `willchair`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `willchair`.`User` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `user_email` VARCHAR(45) NOT NULL,
  `user_password` VARCHAR(60) NOT NULL,
  `user_phone` VARCHAR(20) NULL,
  `user_houseNum` VARCHAR(6) NULL,
  `user_city` VARCHAR(30) NULL,
  `user_district` VARCHAR(30) NULL,
  `user_FU` VARCHAR(2) NULL,
  `user_street` VARCHAR(30) NULL,
  `user_CEP` VARCHAR(10) NULL,
  `user_nota` FLOAT DEFAULT 5,
  `user_name` VARCHAR(45) NULL,
  `user_img` VARCHAR(15) NULL,
  `user_comp` VARCHAR(30) NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `willchair`.`Product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `willchair`.`Product` (
  `prod_id` INT NOT NULL AUTO_INCREMENT,
  `prod_img` VARCHAR(15) NULL,
  `prod_key` VARCHAR(10) NOT NULL,
  `prod_status` VARCHAR(10) NOT NULL,
  `prod_height` FLOAT NULL,
  `prod_type` VARCHAR(20) NOT NULL,
  `prod_weight` FLOAT NULL,
  `prod_composition` VARCHAR(10) NULL,
  PRIMARY KEY (`prod_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `willchair`.`Offer`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `willchair`.`Offer` (
  `ofr_id` INT NOT NULL AUTO_INCREMENT,
  `ofr_name` VARCHAR(45) NOT NULL,
  `ofr_type` VARCHAR(20) NOT NULL,
  `ofr_desc` VARCHAR(255) NULL,
  `ofr_value` FLOAT NULL,
  `ofr_status` VARCHAR(10) NOT NULL,
  `ofr_city` VARCHAR(30) NOT NULL,
  `ofr_user_name` VARCHAR(45) NOT NULL,
  `ofr_parcelas` INT NULL,
  `ofr_postDate` DATE NULL,
  `user_comp_id` INT NULL,
  `ofr_env_conf` TINYINT NULL,
  `ofr_rec_conf` TINYINT NULL,
  `User_user_id` INT NOT NULL REFERENCES `willchair`.`User` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  `Product_prod_id` INT NOT NULL REFERENCES `willchair`.`Product` (`prod_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  PRIMARY KEY (`ofr_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `willchair`.`Chat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `willchair`.`Chat` (
  `chat_id` INT NOT NULL AUTO_INCREMENT,
  `Offer_ofr_id` INT NOT NULL  REFERENCES `willchair`.`Offer` (`ofr_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  `User_user_id` INT NOT NULL REFERENCES `willchair`.`User` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  PRIMARY KEY (`chat_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `willchair`.`Message`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `willchair`.`Message` (
  `msg_id` INT NOT NULL AUTO_INCREMENT,
  `msg_content` VARCHAR(255) NOT NULL,
  `msg_show` TINYINT DEFAULT 1,
  `User_user_id` INT NOT NULL REFERENCES `willchair`.`User` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  `Chat_chat_id` INT NOT NULL  REFERENCES `willchair`.`Chat` (`chat_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    PRIMARY KEY (`msg_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `willchair`.`Denounce`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `willchair`.`Denounce` (
  `den_id` INT NOT NULL AUTO_INCREMENT,
  `den_reason` VARCHAR(30) NOT NULL,
  `den_content` VARCHAR(255) NOT NULL,
  `den_date` VARCHAR(10) NOT NULL,
  `User_user_id` INT NOT NULL  REFERENCES `willchair`.`User` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  `Offer_ofr_id` INT NOT NULL  REFERENCES `willchair`.`Offer` (`ofr_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  PRIMARY KEY (`den_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `willchair`.`Comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `willchair`.`Avaliation` (
  `ava_id` INT NOT NULL AUTO_INCREMENT,
  `ava_content` VARCHAR(255) NOT NULL,
  `ava_value` INT NOT NULL,
  `ava_date` DATE NOT NULL,
  `User_user_idEnv` INT NOT NULL REFERENCES `willchair`.`User` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  `User_user_idRec` INT NOT NULL REFERENCES `willchair`.`User` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  PRIMARY KEY (`ava_id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `willchair`.`Cadeira de Rodas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `willchair`.`Cadeira de Rodas` (
  `cad_width` FLOAT NULL,
  `cad_widthSeat` FLOAT NULL,
  `cad_type` VARCHAR(20) NULL,
  `cad_maxWeight` FLOAT NULL,
  `Product_prod_id` INT NULL REFERENCES `willchair`.`Product` (`prod_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  PRIMARY KEY (`Product_prod_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `willchair`.`Muleta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `willchair`.`Muleta` (
  `mul_maxHeight` FLOAT NULL,
  `mul_type` VARCHAR(10) NULL,
  `mul_minHeight` FLOAT NULL,
  `mul_regulator` TINYINT NULL,
  `mul_maxWeight` FLOAT NULL,
  `Product_prod_id` INT NULL  REFERENCES `willchair`.`Product` (`prod_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  PRIMARY KEY (`Product_prod_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `willchair`.`Bengala`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `willchair`.`Bengala` (
  `ben_type` VARCHAR(10) NULL,
  `ben_regulator` TINYINT NULL,
  `ben_maxHeight` FLOAT NULL,
  `ben_minHeight` FLOAT NULL,
  `ben_color` VARCHAR(20) NULL,
  `Product_prod_id` INT NULL REFERENCES `willchair`.`Product` (`prod_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  PRIMARY KEY (`Product_prod_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `willchair`.`Andador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `willchair`.`Andador` (
  `and_lenght` FLOAT NULL,
  `and_width` FLOAT NULL,
  `and_maxHeight` FLOAT NULL,
  `and_minHeight` FLOAT NULL,
  `and_regulator` TINYINT NULL,
  `Product_prod_id` INT NULL  REFERENCES `willchair`.`Product` (`prod_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  PRIMARY KEY (`Product_prod_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `willchair`.`Andador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `willchair`.`Administrator` (
  `adm_id` INT AUTO_INCREMENT PRIMARY KEY,
  `adm_email` VARCHAR(45) NOT NULL,
  `adm_password` VARCHAR(60) NOT NULL,
  `adm_name` VARCHAR(20)   
)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;