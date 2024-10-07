import { useDropzone } from 'react-dropzone';
import UploadBox from "../../assets/images/uploadBox.svg"
import { useState, useEffect } from 'react';


const ImageUploadZone = ({ onFileChange }) => {
    const [preview, setPreview] = useState(null);
    const labelStyle = "block text-sm font-bold mb-1 text-MVP-black"

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            onFileChange(file);
            const previewUrl = URL.createObjectURL(file);
            setPreview(previewUrl);
        }
    };

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);


    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    return (
        <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            {preview ? (
                <div className="mt-4">
                    <h3 className={labelStyle}>Upload Project Files </h3>
                    <img src={preview} alt="File Preview" className="max-w-xs border rounded-[10px]" />
                </div>
            ) : <img className="pt-10" src={UploadBox} alt="upload icon" />
            }
        </div>
    )
}


export default ImageUploadZone