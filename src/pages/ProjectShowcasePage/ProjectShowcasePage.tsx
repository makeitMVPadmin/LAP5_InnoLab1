import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useSubmissions from '../../hooks/useSubmission';
import useEvents from '../../hooks/useEvents';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { 
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from '../../components/ui/carousel';
import CommentSection from '../../components/CommentSection/CommentSection';
import JudgesCommentSection from '../../components/JudgesCommentSection/JudgesCommentSection';
import DashboardNavbar from '../../components/DashboardNavbar/DashboardNavbar';
import { ReactComponent as Clock } from '../../assets/images/clock.svg'; 
import ParticipantInfoChip from '../../components/ParticipantInfoChip/ParticipantInfoChip';
import PDFViewer from '../../components/PDFViewer/PDFViewer';
import DownloadWithFilename from '../../components/DownloadWithFilename/DownloadWithFilename';
import HorizontalTabMenu from '../../components/HorizontalTabMenu/HorizontalTabMenu';

const ProjectShowcasePage = () => {
    const { submissionId } = useParams<{ submissionId: string }>();
    const { submission, event, isLoading, error } = useSubmissions(submissionId);
    const { basicProjectSummary } = event || {};
    const [imageUrls, setImageUrls] = useState<string[]>([]);
    const {
        teamName,
        designFeatures,
        designTools,
        nextSteps,
        problemStatement,
        techStack,
        projectLinks,
        teamMembers,
        createdAt,
        projectFiles,
        comments,
        judgesComments
    } = submission || {};

    useEffect(() => {
        const fetchImages = async () => {
            if (submission) {
                const storage = getStorage();
                
                try {
                    const urls = await Promise.all(
                        projectFiles.map(async (file: string) => {
                            const imageRef = ref(storage, file);
                            return await getDownloadURL(imageRef);
                        })
                    );
                    setImageUrls(urls);
                } catch (error) {
                    console.error('Failed to fetch images: ', error);
                }
            }
        };

        fetchImages();
    }, [submission]);


    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
        timeZoneName: 'short'
    };

    const getFileNameFromUrl = (url: string) => {
        const parts = url.split('/');
        const lastPart = parts[parts.length - 1];
        const encodedFileName = lastPart.split('?')[0];
        const decodedFileName = decodeURIComponent(encodedFileName);
        const filename = decodedFileName.split('/').pop();
        return filename;
    }

    return (
        <main className='w-full h-full bg-gradient-to-b from-MVP-extra-light-blue to-MVP-white bg-no-repeat'>
            <DashboardNavbar />
            <div className="h-[17.6%] w-full shadow-sm bg-[#C8E7FB] flex flex-col justify-between px-[33px] py-[6.4px] max-h-[4.8rem] justify-center">
                <Link to="/" className="text-MVP-black cursor-pointer font-gilroy text-[24px] font-extrabold my-auto">← Back</Link>
            </div>
            <div className='flex flex-col items-center font-gilroy'>
                <section className='w-[68%] flex flex-col'>
                    <h1 className='text-black font-sans text-[46.4px] font-extrabold leading-[115.645%] ligature-off mt-[30.8px]'>{ event && event.title }</h1>
                    <div className="flex text-[20px] my-[20.8px] gap-[8px]">
                        <Clock />
                        <p className="font-extrabold">Submitted on</p>
                        <p className="font-light"> {createdAt?.toDate().toLocaleString('en-US', options)}</p>
                    </div>
                    <h2 className="self-stretch text-[#1E1E1E] text-[24px] font-extrabold leading-[115.645%] font-gilroy ligature-off">Team Name</h2>
                    <p className="self-stretch text-[#000] text-[20px] font-normal leading-[115.645%] font-gilroy ligature-off my-[8px]">{teamName}</p>   
                    <div className="h-full flex gap-[15px] my-[16px]">
                        {teamMembers?.map(({ name, role }, index) => (
                            <ParticipantInfoChip key={index} integer={index} fullName={name} role={role} />
                        ))}
                    </div>
                    <div className="flex justify-between items-center my-[10px]">
                        <h2 className="text-center text-[#000] text-[24px] font-extrabold leading-[115.645%] font-sans ligature-off">Project Files</h2>
                        <button className='rounded-[8px] border-t-[2.4px] border-r-[4px] border-b-[4px] border-l-[2.4px] border-black bg-white flex p-[12.8px] px-[25.6px] justify-center items-center gap-[8px] text-center text-[#000] text-[21.6px] font-extrabold leading-[115.645%] font-sans ligature-off'>Download All Files</button>
                    </div>
                    <PDFViewer pdfFileName={projectFiles}/>
                    <div className='flex justify-evenly mt-[32px]'>
                        {projectFiles?.map((projectFile: string, index: number) => 
                            <DownloadWithFilename key={index} filename={getFileNameFromUrl(projectFile)}/>
                        )}
                    </div>
                    <h2 className="self-stretch my-[10px] text-[#1E1E1E] text-[24px] font-extrabold leading-[130.645%] font-gilroy ligature-off">Tech Stack: *</h2>
                    {
                        techStack?.split(",").map(item => item.trim()).map((tech, index) => (
                            <p className="self-stretch text-black font-normal text-[20px] leading-[130.645%] font-poppins ligature-off my-[3.2px]" key={index}>
                                {tech}
                            </p>
                        ))
                    }
                    <h2 className="self-stretch my-[20px] text-[#1E1E1E] text-[24px] font-extrabold leading-[115.645%] font-gilroy ligature-off">Design Tool Used: *</h2>
                    {
                        designTools?.split(",").map(item => item.trim()).map((tool, index) => (
                            <p className="self-stretch text-black font-normal text-[20px] leading-[115.645%] font-poppins ligature-off my-[3.2px]" key={index}>
                                {tool}
                            </p>
                        ))
                    }
                    <h2 className="self-stretch my-[20px] text-[#1E1E1E] text-[24px] font-extrabold leading-[115.645%] font-gilroy ligature-off">Project Links:</h2>
                    {
                        projectLinks?.map(({url}, index) => (
                            <Link to={url} className="self-stretch text-black font-normal text-[20px] leading-[115.645%] font-poppins ligature-off my-[6.4px] hover:underline" key={index}>
                                {url}
                            </Link>
                        ))
                    }
                    <HorizontalTabMenu 
                        tabs={[
                            {id: 'problemStatement', label: 'Problem Statement', content: problemStatement },
                            {id: 'projectChallenge', label: 'Project Challenge', content: basicProjectSummary },
                            {id: 'designFeatures', label: 'Design Features', content: designFeatures },
                            {id: 'nextSteps', label: 'Next Steps', content: nextSteps}
                        ]}
                    />
                    <h1 className="flex-1 text-[#000] font-gilroy text-[24px] font-extrabold leading-[28.8px]">
                        Comments
                    </h1>
                    <CommentSection submissionId={submissionId}/>
                </section>
            </div>
        </main>
    );
};

export default ProjectShowcasePage;

{/* <Carousel className='w-[56%] h-[32%] ml-auto mr-auto'>
<CarouselContent>
    {imageUrls.map((index) => (
        <CarouselItem key={index} className='w-[40%] h-[40%]'>
            <img src={`https://picsum.photos/200/300?random=${index}`} alt={`Submission Image ${index + 1}`} />
        </CarouselItem>
    ))}
</CarouselContent>
<CarouselPrevious aria-label='Previous image'/>
<CarouselNext aria-label='Next image'/>
</Carousel> */}
