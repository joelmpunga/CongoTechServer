import { CustomDragDrop } from "./CustomContainer";
import { useState,useEffect } from "react";

export default function DragComponent({getFile}) {
  const [ownerLicense, setOwnerLicense] = useState([]);
  getFile(ownerLicense)
  function uploadFiles(files) {
    // Limit to one file upload
    if (ownerLicense.length > 0) {
      
      alert("You can only upload one file at a time.");
      return;
    }
    setOwnerLicense([files[0]]);
  }

  function deleteFile() {
    setOwnerLicense([]);
  }

  return (
    <>
      <p className="mt-3">Inserer le document</p>
      <div className="mt-3 h-40 border-dashed border-blue-600 border-2 blue bg-blue-gray-200">
        <CustomDragDrop
          ownerLicense={ownerLicense}
          onUpload={uploadFiles}
          onDelete={deleteFile}
          count={1} // Limiting to one file
          formats={["jpg", "jpeg", "png", "pdf"]}
        />
      </div>
    </>
  );
}
