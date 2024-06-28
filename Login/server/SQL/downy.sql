-- Active: 1715242304860@@127.0.0.1@3306@joeun
DROP TABLE IF EXISTS user_auth;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS users;

CREATE TABLE user_auth
(
   auth_no INT          NOT NULL AUTO_INCREMENT COMMENT '권한 번호',
  auth     VARCHAR(100) NOT NULL COMMENT '권한 분류',
  user_no  INT          NOT NULL COMMENT '사용자 번호',
  PRIMARY KEY ( auth_no)
) COMMENT '권한';

CREATE TABLE users
(
  user_no       INT          NOT NULL AUTO_INCREMENT COMMENT '사용자 번호',
  user_name     VARCHAR(100) NOT NULL COMMENT '사용자 이름',
  user_phone    VARCHAR(100) NOT NULL COMMENT '사용자 전화번호',
  user_birth    TIMESTAMP    NOT NULL COMMENT '사용자 생년월일',
  user_address  VARCHAR(300) NOT NULL COMMENT '사용자 주소',
  user_email    VARCHAR(100) NOT NULL COMMENT '사용자 이메일',
  user_gender   VARCHAR(50)  NULL     COMMENT '사용자 성별',
  user_id       VARCHAR(100) NOT NULL COMMENT '사용자 아이디',
  user_password VARCHAR(100) NOT NULL COMMENT '사용자 비밀번호',
  user_reg_date TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '사용자 등록일자',
  user_coupon   VARCHAR(200) NULL     COMMENT '사용자 쿠폰',
  user_upd_date TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '사용자 수정일자',
  enabled       INT          NULL     DEFAULT 1 COMMENT '계정 활성화',
  status        INT          NOT NULL DEFAULT 0 COMMENT '상태',
  PRIMARY KEY (user_no)
) COMMENT '사용자';

INSERT INTO users (user_name, user_phone, user_birth, user_address, user_email, user_gender, user_id, user_password)
VALUES ("정다운", "01076672354", "2000-01-01", "인천광역시 남동구", "tkwk36@naver.com", "female", "tkwk36", "$2a$12$TrN..KcVjciCiz.5Vj96YOBljeVTTGJ9AUKmtfbGpgc9hmC7BxQ92");
INSERT INTO user_auth ( user_no,  auth )
VALUES ( 1, 'ROLE_USER' );