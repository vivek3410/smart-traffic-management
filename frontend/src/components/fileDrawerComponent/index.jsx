import React from "react";

function FileDrawerComponent({ fileInfos }) {
  return (
    <div className="container mx-auto mt-5">
      {/* File Drawer Card */}
      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto min-h-[50vh] max-h-[50vh]">
        <div className="border-b pb-4 mb-4">
          <h3 className="text-lg font-bold text-gray-700">YOUR FILES</h3>
        </div>
        <div className="overflow-y-auto max-h-[40vh]">
          <ul className="divide-y divide-gray-200">
            {fileInfos &&
              fileInfos.map((file, index) => (
                <li
                  className="py-2 px-4 bg-white hover:bg-gray-100 transition duration-200"
                  key={index}
                >
                  <a
                    href={file.url}
                    className="text-blue-600 hover:underline break-words"
                  >
                    {file.name}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FileDrawerComponent;
