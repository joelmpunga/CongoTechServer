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
    <div className="w-full ">
      <CustomDragDrop
        ownerLicense={ownerLicense}
        onUpload={uploadFiles}
        onDelete={deleteFile}
        count={1} // Limiting to one file
        formats={["jpg", "jpeg", "png", "pdf"]}
      />
    </div>
  );
}
