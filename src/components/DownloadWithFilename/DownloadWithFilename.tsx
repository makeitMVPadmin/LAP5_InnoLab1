import { useEffect, useState, forwardRef } from 'react';
import { ReactComponent as DownloadIcon } from '../../assets/images/download.svg';
import { getBlob, ref as firebaseRef} from 'firebase/storage';
import { storage } from '../../Firebase/FirebaseConfig';

const DownloadWithFilename = forwardRef<HTMLButtonElement, { filename: string }>(({ filename }, ref)  => {
    const [downloadUrl, setDownloadUrl] = useState(null);

    useEffect(() => {
        const fetchPdf = async () => {
            try {
                const pdfRef = firebaseRef(storage, `submissions/${filename}`);
                setDownloadUrl(pdfRef);
            } catch (error) {
                console.error('Error fetching PDF:', error);
            }
        };

        fetchPdf();
    }, [filename]);

    const handleDownload = async () => {
        if (downloadUrl) {
            try {
                const blob = await getBlob(downloadUrl);
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', filename);
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
                window.URL.revokeObjectURL(url);
            } catch (error) {
                console.error('Error downloading the file:', error);
            }
        }
    };

    return (
        <div className='flex bg-MVP-light-gray py-[1rem] px-[2.5rem] justify-center items-center gap-[1.5rem]' role="group" aria-label="Download Section">
            <p className='text-MVP-black text-center font-poppins text-base font-medium leading-[1.2rem]'>{filename}</p>
            <button 
                ref={ref} 
                onClick={handleDownload} 
                aria-label={`Download ${filename}`} 
                className="flex items-center"
            >
                <DownloadIcon />
                <span className="sr-only">Download</span>
            </button>
        </div>
    );
});

export default DownloadWithFilename;
