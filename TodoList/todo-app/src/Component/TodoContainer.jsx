import React, { useEffect, useState } from 'react'
import TodoHeader from './TodoHeader'
import TodoInput from './TodoInput'
import TodoList from './TodoList'
import TodoFooter from './TodoFooter'

const TodoContainer = () => {
  // 🧊 state
  const [todoList, setTodoList] = useState([])
  const [input, setInput] = useState('')

  // 데이터 가져오기
  // ❓ hook
  useEffect(() => {  
    // 비동기 요청
    getList()
  }, [])

  // 🌞 할 일 리스트 가져오기
  const getList = () => {
	fetch('http://localhost:8080/todos')
		.then((response) => response.json())
		.then((data) =>  setTodoList(data))
		.catch((error) => console.log(error))
  }

  // 🌞 체크 박스 토글 
  const onToggle = async (todo) => {
    console.log("체크박스 toggle!");
    console.log(`체크박스 여부 : ${todo.status}`);

    const data = {
      no : todo.no,
      name : todo.name,
      status : todo.status ? 0 : 1,   // ↔ 토글
      regDate : todo.rdgDate,
      updaDate : todo.updDate
    }
    // 서버로 업데이트 요청
    // - [PUT] - /todos
    // 💛
    // - method : PUT
    // - headers
    //  	- Content-Type : application/json
	// - body : JSON.stringify( data )
	const init = {
		method : 'PUT',
		headers : {
			'Content-Type' : 'application/json'
		},
		body : JSON.stringify(data)
	}
	const url = 'http://localhost:8080/todos'

	try {
		const response = await fetch(url, init)
		console.log(response);
	} catch (error) {
		console.log(error);
	}

	// ✅ 체크 여부 업데이트
    const updatedTodoList = todoList.map((item) => {
      // return item.no == todo.no ? {...item, status: !item.status} :item
      return item.no == todo.no ? data :item
    })
	// 정렬
	updatedTodoList.sort((a, b) => {
		// 1️⃣ 상태 오름차순
		// 2️⃣ 번호 내림차순
		return a.status - b.status == 0 ? b.no - a.no : a.status - b.status
	})

    setTodoList(updatedTodoList)
  }

  // 🌞 할 일 삭제
  const onRemove = async (no) => {
	console.log('할 일 삭제 클릭');
	// 서버로 삭제 요청
	const init = {
		method : 'DELETE',
		headers : {
			'Content-Type' : 'application/json'
		}
	}	
	const url = `http://localhost:8080/todos/${no}`
	try {
		const response = await fetch(url, init)
		console.log(response);
	} catch (error) {
		console.log(error);
	}

	// 삭제 후 리스트 갱신
	// - 삭제한 번호만 필터링해서 없앰
	const updatedTodoList = todoList.filter((todo) => todo.no !== no )
	setTodoList(updatedTodoList)
  }  

  // 🌞 할 일 추가
  // - [POST] /todos
  // onSubmit
  const onSubmit = async (e) => {
	// ⭐ 기본 이벤트 제거(방지)
	// 여기서는 폼 제출(submit)을 방지
	e.preventDefault();

	const data = {
		name : input,
		status : 0
	}
	console.log('할 일 추가 클릭')
	// 서버로 추가 요청
	const init = {
		method : 'POST',
		headers : {
			'Content-Type' : 'application/json'
		},
		body : JSON.stringify(data)
	}	
	const url = 'http://localhost:8080/todos'
	try {
		const response = await fetch(url, init)
		const newTodo = await response.json()
		const updatedTodoList = [newTodo, ...todoList]
		setTodoList(updatedTodoList)
		console.log(response);
	} catch (error) {
		console.log(error);
	}

	// 할 일 입력 비우기
	setInput('')
  }

  // 🌞 할 일 입력 변경 이벤트 
  const onChange = (e) => {
	// e (event) : input 이 가진 이벤트 객체
	// e.target : input 태그
	// e.target.value : 입력한 값
	const changedInput = e.target.value
	// 🧊🔄 input state 갱신
	setInput(changedInput)
  }

   // 🌞 전체 완료
   const onCompleteAll = async (todo) => {
   console.log('전체 완료!');  
   const data  = {
  	 no : -1
   }
   const init ={
  	 method : 'PUT',
	 headers: {
		'Content-Type': 'application/json'
	},
  	 body : JSON.stringify(data)
   }

   const url = 'http://localhost:8080/todos'
   try {
  	 const response = await fetch(url, init)
	 console.log(response);
   } catch (error) {
  	 console.log(error);
   }  

   // ✅ 체크 여부 업데이트
   const updatedTodoList = todoList.map((item) => {
  	 return {...item, status: true}
  	})
  	// 정렬
  	updatedTodoList.sort((a, b) => {
  		// 1️⃣ 상태 오름차순
  		// 2️⃣ 번호 내림차순
  		return a.status - b.status == 0 ? b.no - a.no : a.status - b.status
  	})  

  	setTodoList(updatedTodoList)
   }  
   
   // 🌞 전체 할 일 삭제
  const onRemoveAll = async () => {
  	console.log('전체 삭제 클릭!');  
  	// DELETE 요청
  	const init = {
  	  method: 'DELETE',
  	  headers: {
  		  'Content-Type': 'application/json'
  	  }
  };
  	const url = 'http://localhost:8080/todos/-1';
  try {
  	const response = await fetch(url, init);
  	console.log(response);
  } catch (error) {
  	console.log(error);
  }  
  	setTodoList([]);
  };  

  return (
    <div className="container">
        <TodoHeader/>
        <TodoInput onSubmit={onSubmit} input={input} onChange={onChange}/>
        <TodoList todoList={todoList} onToggle={onToggle} onRemove={onRemove}/>
        <TodoFooter onCompleteAll={onCompleteAll} onRemoveAll={onRemoveAll}/>
    </div>
  )
}

export default TodoContainer