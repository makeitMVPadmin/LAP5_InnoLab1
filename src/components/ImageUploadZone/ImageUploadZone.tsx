import { useDropzone } from 'react-dropzone';
import UploadBox from "../../assets/images/uploadBox.svg"
import { useState, useEffect } from 'react';
import { STYLES } from '../../constants/styles';

const MAX_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'application/pdf', 'image/svg+xml'];

const ImageUploadZone = ({ onFileChange }) => {
    const [preview, setPreview] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);


    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            if (file.size > MAX_SIZE) {
                setErrorMessage("File size exceeds 10MB");
                return;
            }
            if (!ACCEPTED_TYPES.includes(file.type)) {
                setErrorMessage("File type not supported. Please upload JPG, PNG, PDF, or SVG files.");
                return;
            }

            setErrorMessage(null); // Reset any previous error message
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
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <input {...getInputProps()} />
            {preview ? (
                <div className="mt-4">
                    <h3 className={STYLES.label}>Upload Project Files </h3>
                    <img src={preview} alt="File Preview" className="max-w-xs border rounded-[10px]" />
                </div>
            ) : <img className="pt-10" src={UploadBox} alt="upload icon" />
            }
        </div>
    )
}


export default ImageUploadZone