package com.aloha.product.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import com.aloha.product.dto.Product;

@Mapper
public interface ProductMapper {
    // 상품 목록 
    public List<Product> list() throws Exception;
    // 상품 조회
    public Product select(String id) throws Exception;
    // 상품 등록
    public int insert(Product product) throws Exception;
    // 상품 수정
    public int update(Product product) throws Exception;
    // 상품 삭제    
    public int delete(String id) throws Exception;
     
}
