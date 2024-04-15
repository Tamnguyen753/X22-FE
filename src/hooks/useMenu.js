// src/hooks/useMenu.js

import { useState } from 'react';
import { requestWithToken } from '../utils/axios-http';


const useMenu = () => {
  const [loading, setLoading] = useState(false);
  const createMenu = async (menuData) => {
    setLoading(true);
    try {
      const response = await requestWithToken({
        url: '/menu',
        method: 'post',
        data: {menuData}
      });
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  return { loading, createMenu };
};

export default useMenu;
