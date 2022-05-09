drop database if exists `cps`;

create database cps;
use cps;

create table admin(
email varchar(100),
password varchar(200));

create table login(
`id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `user_email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL);