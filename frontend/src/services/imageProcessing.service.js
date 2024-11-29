
import API_ENDPOINTS from '../constants/apiEndpoints';
import api from './api.service';

const ImageProcessing = async (payload) => {
    try {
        const res = await api.post(API_ENDPOINTS.process_image_api, payload)
        console.log(res.data);
        return res.data
    } catch (e) {
        console.log(e);
    }
}

const imageProcessingServices = {
    ImageProcessing
}

export default imageProcessingServices