import { request } from "../utils/axios-http";

export function uploadFiles(files, key = "images") {
    const formData = new FormData();
    console.log(files);
    for (let file of files) {
        formData.append(key, file, file.name);
    }

    return request({
        url: '/common/uploadFile',
        method: 'POST',
        headers: { 'Content-Type': 'multipart/form-data' },
        data: formData
    });
}
