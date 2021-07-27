import React, { useRef } from 'react'
import './UploadPage.css'

const Upload = () => {
    const imagePreviewRef = useRef(null);
    const loadFileHandler = (e) => {
        // var output = document.getElementById('output');
        imagePreviewRef.current.src = URL.createObjectURL(e.target.files[0]);
        imagePreviewRef.current.onload = function() {
            URL.revokeObjectURL(imagePreviewRef.current.src)}
    }

    return (
        <div className="upload-container">
            <div className="upload-inner-container">
                <h1 className="upload-header">새 게시물</h1>
                <img className="upload-preview-picture" ref={imagePreviewRef} alt="preview" />
                <input className="post-upload-picture" type="file" accept="image/*" onChange={loadFileHandler}/>
                <input className="post-upload-content" type="text" placeholder="문구 입력..." />
                <button className="upload-post-button" type="submit">공유</button>
            </div>
        </div>
    )
}

export default Upload