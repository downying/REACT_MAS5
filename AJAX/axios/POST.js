// 모듈이 설치되어 있어야한다.
// npm install axios
// axios 는 라이브러리로, 포함시켜야한다.
const axios = require('axios')

const url = 'http://httpbin.org/post'
const data = {
    name : '김조은',
    age : 25
}

const headers = {
    'ContentType' : 'application/json'
}

// axios POST 요청
axios.post(url, data, headers)
    .then(response => {
        console.log(`data : ${response.data}`);
        console.dir(response.data)
    })
    .catch(error => {
        console.log(`error : ${error}`);
    })
