-- Active: 1715242304860@@127.0.0.1@3306@joeun
-- 상품 테이블
DROP TABLE IF EXISTS product;
CREATE TABLE product 
(
   NO         INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   id          CHAR(36) NOT NULL DEFAULT (UUID()),
   name        VARCHAR(100) NOT NULL,
   quantity    INT NOT NULL DEFAULT 0,
   img         TEXT NULL,
   created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) COMMENT '상품';

-- quantity : 수량
-- stock : 재고수
-- 샘플 데이터
INSERT INTO product(name, price, img)
VALUES
('상품01', 11000, 'https://placehold.co/300x200'),
('상품02', 12000, 'https://placehold.co/300x200'),
('상품03', 13000, 'https://placehold.co/300x200'),
('상품04', 14000, 'https://placehold.co/300x200'),
('상품05', 15000, 'https://placehold.co/300x200'),
('상품06', 16000, 'https://placehold.co/300x200'),
('상품07', 17000, 'https://placehold.co/300x200'),
('상품08', 18000, 'https://placehold.co/300x200'),
('상품09', 19000, 'https://placehold.co/300x200'),
('상품10', 20000, 'https://placehold.co/300x200');
truncate product;
select * from product;

INSERT INTO product(name, price, img)
VALUES
('상품11', 21000, 'https://placehold.co/300x200'),
('상품12', 22000, 'https://placehold.co/300x200');