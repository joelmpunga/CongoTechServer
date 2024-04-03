import { useRef, useEffect, useState } from "react";
import { FaUpload, FaRegFileImage, FaRegFile } from "react-icons/fa";
import { BsX } from "react-icons/bs";
import Swal from "sweetalert2";

export function CustomDragDrop({
  ownerLicense,
  onUpload,
  onDelete,
  count,
  formats
}) {

    const dropContainer = useRef(null);
    const [dragging, setDragging] = useState(false);
    const fileRef = useRef(null);

    function handleDrop(e, type) {
        let files;
        if (type === "inputFile") {
          files = [...e.target.files];
        } else {
          e.preventDefault();
          e.stopPropagation();
          setDragging(false);
          files = [...e.dataTransfer.files];
        }
    
        const allFilesValid = files.every((file) => {
          return formats.some((format) => file.type.endsWith(`/${format}`));
        });
    
        if (ownerLicense.length >= count) {
          showAlert(
            "warning",
            "Maximum Files",
            `Only ${count} files can be uploaded`
          );
          return;
        }
        if (!allFilesValid) {
          showAlert(
            "warning",
            "Invalid Media",
            `Invalid file format. Please only upload ${formats
              .join(", ")
              .toUpperCase()}`
          );
          return;
        }
        if (count && count < files.length) {
          showAlert(
            "error",
            "Error",
            `Only ${count} file${count !== 1 ? "s" : ""} can be uploaded at a time`
          );
          return;
        }
    
        if (files && files.length) {
          const nFiles = files.map(async (file) => {
            const base64String = await convertFileBase64(file);
            return {
              name: file.name,
              photo: base64String,
              type: file.type,
              size: file.size
            };
          });
    
          Promise.all(nFiles).then((newFiles) => {
            onUpload(newFiles);
            TopNotification.fire({
              icon: "success",
              title: "file uploaded"
            });
          });
        }
      }

      async function convertFileBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => {
            resolve(reader.result);
          };
          reader.onerror = (error) => {
            reject(error);
          };
        });
      }
      
    

  return (
    <>



    </>
  );
}

