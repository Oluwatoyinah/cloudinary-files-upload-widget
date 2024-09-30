import React, { useState } from "react";
import UploadWidget from "./UploadWidget";

const UploadBox = () => {
  const [folderName, setFolderName] = useState("");

  return (
    <div className="upload-box">
      <div className="header-section">
        <h3>Cloudinary Files Upload Widget</h3>
      </div>

      <div>
        <form action="">
          <div className="form-input-box">
            <label htmlFor="folder_name">Folder Name</label>
            <input
              id="folder_name"
              name="folder_name"
              placeholder="Enter folder name"
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
          </div>

          <div className="body-section-form-group">
            <UploadWidget name={folderName} setFolderName={setFolderName} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadBox;
