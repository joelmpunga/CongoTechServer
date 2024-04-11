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

    useEffect(() => {
        function handleDragOver(e) {
            e.preventDefault();
            e.stopPropagation();
            setDragging(true);
        }
        function handleDragLeave(e) {
            e.preventDefault();
            e.stopPropagation();
            setDragging(false);
        }
        dropContainer.current.addEventListener("dragover", handleDragOver);
        dropContainer.current.addEventListener("drop", handleDrop);
        dropContainer.current.addEventListener("dragleave", handleDragLeave);

        return () => {
            if (dropContainer.current) {
                dropContainer.current.removeEventListener("dragover", handleDragOver);
                dropContainer.current.removeEventListener("drop", handleDrop);
                dropContainer.current.removeEventListener("dragleave", handleDragLeave);
            }
        };
    }, [ownerLicense]);


    const TopNotification = Swal.mixin({
        toast: true,
        position: "bottom-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        }
    });

    function showAlert(icon, title, text) {
        Swal.fire({
            icon: icon,
            title: title,
            text: text,
            showConfirmButton: false,
            width: 500,
            timer: 1500
        });
    }

    function showImage(image) {
        Swal.fire({
            imageUrl: image,
            showCloseButton: true,
            showConfirmButton: false,
            width: 450
        });
    }
    return (
        <>

            <label
                htmlFor="forLabel"
                className={`${dragging
                    ? "border border-[#2B92EC] bg-[#EDF2FF] h-full"
                    : "h-full"
                    } h-full flex items-center justify-center text-center py-5`}
                ref={dropContainer}

            >

                {ownerLicense.length > 0 && (
                    <div className="mt-4 ">
                        {ownerLicense.map((img, index) => (
                            <div className="w-full px-3 py-3.5 rounded-md bg-slate-200 space-y-3">
                                <div className="flex justify-between">
                                    <div className="w-[70%] flex justify-start items-center space-x-2">
                                        <div
                                            className="text-[#5E62FF] text-[37px] cursor-pointer"
                                            onClick={() => showImage(img.photo)}
                                        >
                                            {img.type.match(/image.*/i) ? (
                                                <FaRegFileImage />
                                            ) : (
                                                <FaRegFile />
                                            )}
                                        </div>
                                        <div className=" space-y-1">
                                            <div className="text-xs font-medium text-gray-500">
                                                {img.name}
                                            </div>
                                            <div className="text-[10px] font-medium text-gray-400">{`${Math.floor(
                                                img.size / 1024)} KB`}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-1 flex justify-end">
                                        <div className="space-y-1">
                                            <div
                                                className="text-gray-500 text" onClick={() => onDelete(index)}
                                            >
                                                <BsX className="ml-auto" />
                                            </div>
                                            <div className="text-[10px] font-medium text-gray-400">
                                                Done
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}


                {
                    !ownerLicense.length > 0 && <div className="flex-1 flex flex-col h-auto">
                        <div className="mx-auto text-gray-400 mb-2">
                            <FaUpload size={18} />
                        </div>
                        <div className="text-[12px] font-normal text-gray-500">

                            <span
                                className="text-[#4070f4] cursor-pointer"

                            >
                                Click to upload
                            </span>{" "}
                            or drag and drop
                        </div>
                        <div className="text-[10px] font-normal text-gray-500">
                            Pdf, files PNG, JPG or JPEG
                        </div>
                    </div>
                }
            </label>
            <input
                className="opacity-0 hidden h-full"
                type="file"
                multiple
                accept=".pdf, image/*"
                ref={fileRef}
                id="forLabel"
                onChange={(e) => handleDrop(e, "inputFile")}
                onClick={() => {
                    fileRef.current.click()
                    setToggle(!toggle);

                }}

            />
        </>
    );
}

