import axios from "axios";

const instance = axios.create({
    // baseURL: import.meta.env.VITE_API_URL,
    baseURL: process.env.VITE_API_URL,
});

const request = (config) => {
    console.log(config);
    return instance({...config});
};

const requestWithToken = (config, staffType) => {
    const token = localStorage.getItem("accessToken");

    if(!token){
        throw new Error("Bạn cần đăng nhập để thực hiện chức năng này!");
    }

    const instanceConfig = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        ...config,
    };

    if(staffType === "manager"){
        return instance(instanceConfig);
    }else{
        throw new Error("Bạn không có quyền thực hiện chức năng này! ");
    }
};

export {request, requestWithToken};