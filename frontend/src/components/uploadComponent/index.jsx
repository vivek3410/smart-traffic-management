import React, { useState, useEffect } from "react";
import { errorToast, successToast } from "../toastNotifications";
import videoUploadServices from "../../services/videoUpload.service";
import BaseLoading from './../loader/config-loading';
import imageProcessingServices from "../../services/imageProcessing.service";

function UploadComponent({ setFileInfos }) {
  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [currentFile, setCurrentFile] = useState(undefined);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [loading,setLoading] = useState(false)

  // Alert state hook
  const [alertVisible, setAlertVisible] = useState(false);

  const selectFile = (event) => {
    setSelectedFiles(event.target.files);
  };
  const path = 'output_frames\\input'

  console.log(path.split("\\")[1]);

  const upload = async () => {
    setLoading(true)
    let currentFile = selectedFiles[0];
    setProgress(0);
    setCurrentFile(currentFile);
    const formData = new FormData();
    formData.append("file", currentFile);
    console.log(formData);
    try{
      // let res = await videoUploadServices.videoUpload(formData)
      // console.log(res);
      // const file_name = res.output_folder.split('\\')[1]
      const payload = {
        file_name: 'input'
      }
      let imgRes = await imageProcessingServices.ImageProcessing(payload)
      console.log(imgRes);
      // if(res.message === 'Successfully extracted 254 frames'){
      //   successToast("Video Upload Success")
      // } 
    }catch(e){
      errorToast(e.response.data.message)
    }finally{
      setLoading(false)
    }

    setSelectedFiles(undefined);
    setAlertVisible(true);
  };

  useEffect(() => {
    // FileStorageService.getFiles().then((response) => {
    //   setFileInfos(response.data);
    // });
  }, []);

  const setAlertVisibility = () => {
    setAlertVisible(false);
  };

  return (
    <BaseLoading loading={loading}>
    <div className="container mx-auto mt-5">
      {/* Upload Card */}
      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto">
        <div className="border-b pb-4 mb-4">
          <h3 className="text-lg font-bold text-gray-700">UPLOAD FILES</h3>
        </div>
        <div>
          <p className="text-gray-600 mb-2">Select a file to upload to drive</p>
          <input
            type="file"
            onChange={selectFile}
            className="mb-4 block text-sm text-gray-700"
          />
          <button
            className="px-4 py-2 bg-green-600 text-white font-bold rounded hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!selectedFiles}
            onClick={upload}
          >
            {loading ? 'Uploading...':'Upload'}
          </button>
          {currentFile && (
            <div
              className={`relative mt-4 h-6 rounded-md overflow-hidden bg-gray-200 ${
                alertVisible ? "block" : "hidden"
              }`}
            >
              <div
                className="absolute top-0 left-0 h-full bg-blue-500 text-white text-xs flex items-center justify-center"
                style={{ width: `${progress}%` }}
              >
                {progress}%
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Alert */}
      {alertVisible && (
        <div
          className="bg-gray-800 text-white rounded-lg p-4 mt-4 max-w-4xl mx-auto relative flex items-center"
          style={{ zIndex: 1 }}
        >
          <span className="mr-4">{message}</span>
          <button
            className="ml-auto bg-red-500 px-2 py-1 rounded text-white hover:bg-red-600"
            onClick={setAlertVisibility}
          >
            x
          </button>
        </div>
      )}
    </div>
    </BaseLoading>
  );
}

export default UploadComponent;
