import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from  '../board/css/insert.module.css'
// ckeditor5
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as filesAPi from '../../apis/files'

const InsertForm = ( {onInsert} ) => {

    // 🔁state
    const[title, setTitle] = useState('');
    const[writer, setWriter] = useState('');
    const[content, setContent] = useState('');
    const[files, setFiles] = useState(null);  // ✅files state 추가

    const handleChangeTitle = (e) => {
        setTitle(e.target.value);
    } 
    const handleChangeWriter = (e) => {
        setWriter(e.target.value);
    } 
    const handleChangeContent = (e) => {
        setContent(e.target.value);
    }
    // ✅파일 핸들러 추가
    const handleChangeFile = (e) => {
        setFiles(e.target.files);
    }
    

    // 함수
    const onSubmit = () => {
        // 유효성검사 ✅

        // 파일 첨부 시 헤더설정
        // Content-type : application/json -> multipart/form-data  
        const formData = new FormData();
        formData.append('title', title)
        formData.append('writer', writer)
        formData.append('content', content)

        // 파일 데이터 추가
        if (files) {
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                formData.append('files', file);
            }
        }

        // 헤더
        const headers = {
            'Content-type' : 'multipart/form-data'
        }

        // onInsert(title, writer, content);
        onInsert(formData, headers);
    }

    function uploadPlugin(editor) {
        editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
            return customUploadAdapter(loader);
        };
    }

    const customUploadAdapter = (loader) => {
        return {
          upload() {
            return new Promise( (resolve, reject) => {
              const formData = new FormData();
              loader.file.then( async (file) => {
                    console.log(file);
                    formData.append("parentTable", 'editor');
                    formData.append("file", file);

                    const headers = {
                            'Content-Type' : 'multipart/form-data'
                    };
    
                    let response = await filesAPi.upload(formData, headers);
                    let data = await response.data;
                    console.log(`data : ${data}`);
                    
                    let newFile = data;
                    let newFileNo = newFile.no

                    // 이미지 렌더링
                    await resolve({
                        default: `http://localhost:8080/files/img/${newFileNo}`
                    })
                    
              });
            });
          },
        };
    };

    return (
        <div className="container">
            <h1 className="title">게시글 등록</h1>
            <table className={styles.table}>
                <tbody>
                    <tr>
                        <td>제목</td>
                        <td>
                            {/* CSS module의 클래스 선택자는 카멜케이스로 쓰는것이 관례
                                - 카멜케이스 : styles.formInput
                                - 케밥케이스 : styles['form-input']
                            */}
                            <input type="text" value={title} onChange={handleChangeTitle} className={styles['form-input']}/>
                        </td>
                    </tr>
                    <tr>
                        <td>작성자</td>
                        <td>
                            <input type="text" value={writer} onChange={handleChangeWriter} className={styles['form-input']}/>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>내용</td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            {/* <textarea cols="30" rows="10" value={content} onChange={handleChangeContent} className={styles['form-input']}></textarea> */}
                            <CKEditor
                                editor={ ClassicEditor }
                                config={{
                                    placeholder: "내용을 입력하세요.",
                                    toolbar: {
                                        items: [
                                            'undo', 'redo',
                                            '|', 'heading',
                                            '|', 'fontfamily', 'fontsize', 'fontColor', 'fontBackgroundColor',
                                            '|', 'bold', 'italic', 'strikethrough', 'subscript', 'superscript', 'code',
                                            '|', 'bulletedList', 'numberedList', 'todoList', 'outdent', 'indent',
                                            '|', 'link', 'uploadImage', 'blockQuote', 'codeBlock',
                                            '|', 'mediaEmbed',
                                        ],
                                        shouldNotGroupWhenFull: false
                                    },
                                    editorConfig: {
                                        height: 500, // Set the desired height in pixels
                                    },
                                    alignment: {
                                        options: ['left', 'center', 'right', 'justify'],
                                    },
                                    
                                    extraPlugins: [uploadPlugin]            // 업로드 플러그인
                                }}
                                data=""
                                onReady={ editor => {
                                    // You can store the "editor" and use when it is needed.
                                    console.log( 'Editor is ready to use!', editor );
                                } }
                                onChange={ ( event, editor ) => {
                                    const data = editor.getData();
                                    console.log( { event, editor, data } );
                                    setContent(data);
                                } }
                                onBlur={ ( event, editor ) => {
                                    console.log( 'Blur.', editor );
                                } }
                                onFocus={ ( event, editor ) => {
                                    console.log( 'Focus.', editor );
                                } }
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>파일</td>
                        <td><input type="file" onChange={handleChangeFile} multiple /></td>
                    </tr>
                </tbody>
            </table>
            <div className="btn-box">
                <Link to="/boards" className='btn'>목록</Link>
                <button className="btn" onClick={onSubmit}>등록</button> 
                {/* onInsert 바로 onClick에 안거는 이유: 유효성 검사 등 진행할 수도 있으니 한번 흐름 잘라서 감... */}
            </div>
        </div>
    )
}

export default InsertForm