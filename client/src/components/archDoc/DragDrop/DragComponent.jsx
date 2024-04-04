import { CustomDragDrop } from "./CustomContainer";
import { useState } from "react";

export default function DragComponent() {
  const [ownerLicense, setOwnerLicense] = useState([]);

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
      <p>Inserer le document</p>
      <div className="my-5 h-40 border-dashed border-blue-600 border-2 blue bg-blue-gray-200">
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
