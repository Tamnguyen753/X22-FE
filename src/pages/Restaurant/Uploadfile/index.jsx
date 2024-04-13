/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import styled from "styled-components";
import { CloudUploadOutlined } from "@ant-design/icons";
import { uploadFiles } from '../../../api/commonApi';

const UploadFile = ({ image, handleChangeImage, height = "250px" }) => {
  const onChange = async (e) => {
    const _files = e.currentTarget.files;
    if (_files) {
      try {
        // Tạo formData để gửi lên server
        const response = await uploadFiles(_files);
        const imageUrls = response.data.imageUrls;

        console.log("imageUrls:",imageUrls);

        // Gọi hàm handleChangeImage để cập nhật trạng thái của component
        handleChangeImage({ files: _files, image: imageUrls });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <S style={{ height }}>
      <input type='file' multiple onChange={onChange} />
      {image && image.map((url, index) => <img key={index} src={url} />)}
      <CloudUploadOutlined className='icon' />
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

  input {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    opacity: 0;
    cursor: pointer;
  }

  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    top: 0;
    left: 0;
  }
`;
