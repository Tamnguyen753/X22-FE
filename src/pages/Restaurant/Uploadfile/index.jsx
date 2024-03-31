/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import styled from "styled-components";
import {FaImage} from "react-icons/fa";

const UploadFile = ({image, handleChangeImage, height = "150px"}) => {
  const onChange = (e) => {
    const _files = e.currentTarget.files?.[0];

    if(_files){
      const url = URL.createObjectURL(_files);

      handleChangeImage({files: _files, img: url});
    }
  };

  return (
   <S style={{height,}}>
    <input type='file' onChange={onChange}/>
    {image && <img src={image} />}
    <FaImage size={250} color="#1677ff"/>
   </S>
  );
};

export default UploadFile;

export const S = styled.div`
boder-radius: 12px;
boder: 1px solid #d9d9d9;
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