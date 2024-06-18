-------------------------------------------------
1 . insertForm에서 onChange={handleChangeFile} 로 파일을 setFiles 한다 .

2. setFiles를 한순간 useState가 변경되어 file이 최신화된다 ( 훅이 없어서 다른 실행은 없음 )

3. 등록 버튼을 누르면 onSubmit() 함수가 실행된다.

4. new FormData 객체를 만들어 제목, 작성자, 내용 , 여러개의 file을 append한다.

5. 파일 업로드에서는 json으로 요청을 보내는것이아니기때문에 headers의 내용을 'Content-Type': 'multipart/form-data' 로 바꾼다

6. InsertContainer에 있는 함수인 onInsert(formData, headers) 를 요청한다 (4번 객체와 5번 객체를 매핑)

7. onInsert(formData, headers) 받은 객체들로 비동기 요청을 보낸다 
  그러기위해선 board.js에 자주쓰는 비동기인 axios를 import해 post요청에 객체 두개를 담아 보낸다.

------------------------------------------------- server controller

8. controller의 post 매핑에 연결되고 비동기로 보낸 두 객체는 board 객체안에 저장된다. ( formData의 정보가 board안에 들어있어야함 )

9. board객체로 Board newBoard = serverService.insertBoard(board); 새 객체를 만든다 .

------------------------------------------------- server service

10. 서비스 임플의 insertBoard 가 실행될때 insert Mapper도 실행된다. ( 그러면서 객체안의 no이 최신화 mapper의 기능 )

11. 최신화된 no으로 지금 함수로 들어온 board를 다시 조회한다. ( 이부분이 살짝 이해안됨 이미 최신의 board를 가지고왔는데 다시 조회를 ?)

12. 다시 가져온 newBoard안에  인자 board 의 File 정보를 넣는다. 

13. file객체List와 file 정보를 fileservice.uploadFiles함수에 담아 보낸다 .

------------------------------------------------- file service

14. 멀티파트 파일이기떄문에 fileservice의 uploadFiles 함수에서 file 정보를 fileList의 들어있는 값에 다 넣어준다. (for문으로)

15. 완료하면 반환해 다시 반대로 위로 올라감 .


  