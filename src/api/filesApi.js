import axios from "axios";

export function uploadFiles(files) {
const formData = new FormData();

for (const file of files) {
    formData.append("files", file);
}

return axios.post("http://localhost:8080/upload-image", formData);
}