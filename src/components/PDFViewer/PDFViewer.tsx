import { useEffect, useState, useRef } from 'react';
import { storage } from '../../Firebase/FirebaseConfig';
import { getDownloadURL, ref } from 'firebase/storage';
import { Document, Page, pdfjs } from 'react-pdf';
import CommuntiArrowStyled from '../CommunitiArrowStyled/CommuntiArrowStyled';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const PDFViewer = ({ pdfFileName }) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchPdf = async () => {
      const pdfRef = ref(storage, pdfFileName);
      try {
        const url = await getDownloadURL(pdfRef);
        setPdfUrl(url);
      } catch (error) {
        console.error('Error fetching PDF:', error);
      }
    };

    fetchPdf();
  }, [pdfFileName]);

  useEffect(() => {
    if (numPages) {
      intervalRef.current = setInterval(() => {
        setPageNumber(prevPage => {
          if (prevPage >= numPages) {
            clearInterval(intervalRef.current);
            return 1;
          }
          return prevPage + 1;
        });
      }, 10);

      return () => clearInterval(intervalRef.current);
    }
  }, [numPages]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <div className='flex items-center justify-center'>
      <CommuntiArrowStyled 
          direction='left'
          className="py-[1.8rem] px-[1.5rem] w-fit h-fit"
          onClick={previousPage}
          aria-label="Show previous slide"
          disabled={pageNumber === 1}
        />
      <Document
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <CommuntiArrowStyled 
          direction='right'
          className="py-[1.8rem] px-[1.5rem] w-fit h-fit"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
          aria-label="Show next slide"
        />
    </div>
  );
  
};

export default PDFViewer;
