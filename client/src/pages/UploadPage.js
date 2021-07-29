import React, { useState, useRef } from 'react'
import axios from 'axios'
import './UploadPage.css'
import { useHistory } from 'react-router'

const Upload = ({ userData, setUserWrittenPost }) => {

    const [picture, setPicture] = useState("https://lh3.googleusercontent.com/proxy/k30F7mIBg5cVvGVmWwrFJHcjDdZocysk8Pc3U_oASyeP2a4Fa65S3cIDjTAFUJIX5jO_dqGwZvFeP9Ye-7AjDNdd58G2ByFWtjykJL9ZS7y1ojo8poJOQzvOFbOgk8M");
    const [text, setText] = useState("");

    const hiddenFileInput = useRef(null);
    let history = useHistory();

    function inputClick(e) {
        hiddenFileInput.current.click();
    }

    const loadFileHandler = async (e) => {
        const fileUploaded = e.target.files[0];
        if (!fileUploaded) return;
        const url = URL.createObjectURL(fileUploaded)
        //const url = await encodeBase64ImageFile(fileUploaded);
        setPicture(url);
    }

    function inputText(e) {
        setText(e.target.value);
    }

    // function encodeBase64ImageFile(image) {
    //     return new Promise((resolve, reject) => {
    //         let reader = new FileReader();
    //         // convert the file to base64 text
    //         reader.readAsDataURL(image);
    //         // on reader load somthing...
    //         reader.onload = (event) => {
    //             //console.log(event.target.result);
    //             resolve(event.target.result);
    //         };
    //         reader.onerror = (error) => {
    //         reject(error);
    //         };
    //     });
    // }
    
    async function submitPost(){
        
        const res = await axios.post('https://fpserver.click/createpost', {
            user_id: userData.id,
            content: text,
            pictures: picture
        })
        console.log(res)
        if (res.data.message === "포스트 생성 성공") {
            setUserWrittenPost(res.data.data)
            //setWrittenPost(res.data.data);
            history.push('/');
            return;
        }
    }

    return (
        <div className="upload-container">
            <div className="upload-inner-container">
                <span className="upload-header">새 게시물</span>
                <img className="upload-preview-picture" src={picture} alt="preview" />
                <button className="post-upload-picture" onClick={inputClick}>사진 업로드</button>
                <input type="file" accept="image/*" ref={hiddenFileInput} onChange={loadFileHandler} style={{ display: "none" }}/>
                <textarea className="post-upload-content" placeholder="문구 입력..." value={text} onChange={inputText}/>
                <button className="upload-post-button" type="submit" onClick={submitPost}>공유</button>
            </div>
        </div>
    )
}

export default Upload