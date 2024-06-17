import React from "react";

class ClassComponent extends React.Component {

    // 👩‍🏫 클래스 컴포넌트에서 상태(state) 정의하기
    // 1. 생성자 정의
    // 2. 생성자 안에서 state 속성 정의 
    constructor(props) {
        super(props)

        // 상태 정의
        this.state = {
            name: "홍준범", 
            msg: ""
        }

        // this 바인딩 (버튼 onClick속성 내의 this와 클래스 자기자신을 가리키는 this를 연결)
        this.handleApply = this.handleApply.bind(this); // 버튼을 가리키는게 아니라 class 객체를 가리키는 this로 지정해줌
        this.handleStop = this.handleStop.bind(this);
    }

    // 입사지원 클릭
    handleApply() {
        console.log('입사지원 클릭!');
        // 상태 업데이트
        this.setState({ msg : '입사지원을 하였습니다.' })
    }

    // 중도포기 클릭
    handleStop() {
        console.log('중도포기 클릭!');
        // 상태 업데이트
        this.setState({ msg : '중도포기를 하였습니다.' })
    }

    render() {
        const {name, msg} = this.state
        return (
            <div>
                <h1>클래스 컴포넌트</h1>
                <h2>Hello I'm {name}</h2>
                <p>{msg}</p>
                <button onClick={this.handleApply}>입사지원</button>
                <button onClick={this.handleStop}>중도포기</button>
            </div>
        )
    }
}

export default ClassComponent