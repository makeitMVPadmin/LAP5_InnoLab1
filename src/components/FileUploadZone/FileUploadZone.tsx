import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import DashedBox from '../DashedBox/DashedBox';

const MAX_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'application/pdf', 'image/svg+xml'];

const ImageUploadZone = ({ onFileChange }) => {
    const [errorMessage, setErrorMessage] = useState(null);
    const onDrop = (acceptedFiles) => {

        const validFiles = acceptedFiles.filter(file => {
            if (file.size > MAX_SIZE) {
                setErrorMessage(`File size exceeds 10MB: ${file.name}`);
                return false;
            }
            if (!ACCEPTED_TYPES.includes(file.type)) {
                setErrorMessage(`File type not supported: ${file.name}. Please upload JPG, PNG, PDF, or SVG files.`);
                return false;
            }
            return true;
        });

        if (validFiles.length > 0) {
            setErrorMessage(null);
            onFileChange(validFiles);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: true,
        accept: ACCEPTED_TYPES.reduce((acc, type) => ({ ...acc, [type]: [] }), {})
    });
    return (
        <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <DashedBox />
        </div>
    );
};

export default ImageUploadZone;