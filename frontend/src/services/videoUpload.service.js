
import API_ENDPOINTS from '../constants/apiEndpoints';
import api from './api.service';

const videoUpload = async (payload) => {
    try {
        const res = await api.post(API_ENDPOINTS.upload_video_api, payload)
        console.log(res.data);
        return res.data
    } catch (e) {
        console.log(e);
    }
}

const videoUploadServices = {
    videoUpload
}

export default videoUploadServices