package com.aloha.todo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aloha.todo.dto.Todo;
import com.aloha.todo.service.TodoService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@CrossOrigin(origins = "*")     // ⭐ CORS 허용
@RequestMapping("/todos")
public class TodoController {
    
    @Autowired
    private TodoService todoService;
    
    /**
     * 목록
     * @return
     */
    @GetMapping()
    public ResponseEntity<?> getAll() {
        try {
            List <Todo> todoList = todoService.list();
            return new ResponseEntity<>(todoList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * 조회
     * @param no
     * @return
     */
    @GetMapping("/{no}")
    public ResponseEntity<?> getOneTodo(@PathVariable("no") int no) {
        try {
            Todo Todo = todoService.select(no);
            return new ResponseEntity<>(Todo, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    /**
     * 등록
     * @param Todo
     * @return
     */
    @PostMapping()
    public ResponseEntity<?> createTodo(@RequestBody Todo Todo) {
        try {
            Todo newTodo = todoService.insert(Todo);
            if( newTodo != null )
                return new ResponseEntity<>(newTodo, HttpStatus.OK);
            else 
                return new ResponseEntity<>("FAIL", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PutMapping()
    public ResponseEntity<?> updateTodo(@RequestBody Todo Todo) {
        try {
            int result = 0;

            // 전체 완료
            if( Todo.getNo() == -1 ) {
                result = todoService.completeAll();
            }
            else {
                // 그냥 완료
                result = todoService.update(Todo);
            }
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @DeleteMapping("/{no}")
    public ResponseEntity<?> deleteTodo(@PathVariable("no") int no) {
        try {
            int result = 0;
            // 전체 삭제
            if( no == -1 ) {
                result = todoService.deleteAll();
            }
            if( result > 0 ) {
                result = todoService.delete(no);
            }
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
