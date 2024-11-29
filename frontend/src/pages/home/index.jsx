import React, { useState } from "react";
import UploadComponent from "../../components/uploadComponent";
import FileDrawerComponent from "../../components/fileDrawerComponent";

function App() {
  const [fileInfos, setFileInfos] = useState([]);

  return (
    <div className="App">
      <div className="p-4">
        <UploadComponent setFileInfos={setFileInfos} />
        <FileDrawerComponent fileInfos={fileInfos} />
      </div>
    </div>
  );
}

export default App;
