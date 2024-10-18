import { useEffect, useState } from 'react';
import { ReactComponent as DownloadIcon } from '../../assets/images/download.svg';
import { getBlob, ref } from 'firebase/storage';
import { storage } from '../../Firebase/FirebaseConfig';

const DownloadWithFilename = ({ filename }) => {
    const [downloadUrl, setDownloadUrl] = useState(null);

    useEffect(() => {
        const fetchPdf = async () => {
            try {
                const pdfRef = ref(storage, `submissions/${filename}`);
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
        <div className='flex bg-[#D9D9D9] py-[16px] px-[40px] justify-center items-center gap-[24px]'>
            <p className='text-black text-center font-poppins text-base font-medium leading-[18.503px]'>{filename}</p>
            <button onClick={handleDownload}>
                <DownloadIcon />
            </button>
        </div>
    );
};

export default DownloadWithFilename;
