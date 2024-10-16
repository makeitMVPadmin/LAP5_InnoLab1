import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useSubmissions from '../../hooks/useSubmission';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { 
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from '../../components/ui/carousel';
import CommunityCommentSection from '../../components/CommunityCommentSection/CommunityCommentSection';
import JudgesCommentSection from '../../components/JudgesCommentSection/JudgesCommentSection';
import DashboardNavbar from '../../components/DashboardNavbar/DashboardNavbar';
import { ReactComponent as Clock } from '../../assets/images/clock.svg'; 
import ParticipantInfoChip from '../../components/ParticipantInfoChip/ParticipantInfoChip';

const ProjectShowcasePage = () => {
    const { submissionId } = useParams<{ submissionId: string }>();
    const { submission, event, isLoading, error } = useSubmissions(submissionId);
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
        submittedAt,
        imageFiles,
        comments,
        judgesComments
    } = submission || {};

    useEffect(() => {
        const fetchImages = async () => {
            if (submission) {
                const storage = getStorage();
                
                try {
                    const urls = await Promise.all(
                        imageFiles.map(async (file: string) => {
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

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;


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

    return (
        <main className='w-full h-full bg-gradient-to-b from-MVP-extra-light-blue to-MVP-white bg-no-repeat'>
            <DashboardNavbar />
      <div className="h-[22%] w-full bg-MVP-light-gray flex flex-col justify-between px-8 py-8 max-h-[6rem]">
        <Link to="/" className="text-MVP-black cursor-pointer">← Back</Link>
        </div>
        <div className='flex flex-col items-center font-gilroy'>
            <section className='w-[80%] flex flex-col'>
                <h1 className='text-black font-sans text-[58px] font-extrabold leading-[115.645%] ligature-off mt-[56px]'>{ event && event.title }</h1>
                <div className="flex text-[25px] my-[56px]"><Clock /><p className="font-extrabold"><span></span>Submitted on <span className="font-light">{submittedAt.toDate().toLocaleString('en-US', options)}</span></p></div>
                <h2 className="self-stretch text-[#1E1E1E] text-[30px] font-extrabold leading-[115.645%] font-gilroy ligature-off">Team Name</h2>
                <p className="self-stretch text-[#000] text-[25px] font-normal leading-[115.645%] font-gilroy ligature-off">{teamName}</p>   
                <div className="h-full flex gap-[0.5rem]">
                    {teamMembers.map(({ name, role }, index) => (
                        <ParticipantInfoChip key={index} integer={index} fullName={name} role={role} />
                    ))}
                </div>
                <div className="flex justify-between items-center">
                    <h2 className="text-center text-[#000] text-[30px] font-extrabold leading-[115.645%] font-sans ligature-off">Project Files</h2>
                    <button className='rounded-[10px] border-t-[3px] border-r-[5px] border-b-[5px] border-l-[3px] border-black bg-white flex p-[16px] px-[32px] justify-center items-center gap-[10px] text-center text-[#000] text-[27px] font-extrabold leading-[115.645%] font-sans ligature-off'>Download All Files</button>
                </div>
                <Carousel className='w-[70%] h-[40%] ml-auto mr-auto'>
                    <CarouselContent>
                        {imageUrls.map((imageUrl, index) => (
                            <CarouselItem key={index} className='w-[50%] h-[50%]'>
                                <img src={imageUrl} alt={`Submission Image ${index + 1}`} />
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious aria-label='Previous image'/>
                    <CarouselNext aria-label='Next image'/>
                </Carousel>

                
                {projectLinks.map((projectLink: { url: string }, index: number) => 
                    <p key={index}>{projectLink.url}</p>
                )}
                <JudgesCommentSection submissionId={submissionId} />
                <CommunityCommentSection submissionId={submissionId}/>  
            </section>
            </div>
        </main>
    );
};

export default ProjectShowcasePage;

