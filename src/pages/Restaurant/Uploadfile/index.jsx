/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import styled from "styled-components";
import {CloudUploadOutlined} from "@ant-design/icons";

const UploadFile = ({images, handleChangeImage, height = "150px"}) => {
  const onChange = (e) => {
    const _files = e.currentTarget.files;
    // console.log("_files: ", _files);
    const _urls = [];

    if(_files){
      for(let i = 0; i < _files.length; i++){
        // console.log("_files[i]: ",_files[i]);

        const url = URL.createObjectURL(_files[i]);

        // console.log("url:",url);
        _urls.push(url);
      }

      // console.log("_urls:", _urls);
      handleChangeImage({files: _files, images: _urls});
    }
  };

  return (
   <S style={{height}}>
    <input type='file' multiple onChange={onChange}/>
    {images && images.map((url, index) => <img key={index} src={url}/>)}
    <CloudUploadOutlined size={250} color="#1677ff"/>
   </S>
  );
};

export default UploadFile;

export const S = styled.div`
border-radius: 12px;
border: 1px solid #d9d9d9;
display: flex;
align-items: center;
justify-content: center;
cursor: pointer;
position: relative;
overflow: hidden;

input{
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  opacity: 0;
  cursor: pointer;
  ${'' /* boder: none ; */}
}

image{
  position: absolute;
  width: 100%;
  height:100%;
  object-fit: cover;
  top: 0;
  left: 0;
}
`;