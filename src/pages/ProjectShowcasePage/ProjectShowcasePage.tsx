import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useSubmissions from '../../hooks/useSubmission';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { 
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from '../../components/ui/carousel';
import CommunityCommentSection from '../../components/CommuntiCommentSection/CommuntiCommentSection';
import JudgesCommentSection from '../../components/JudgesCommentSection/JudgesCommentSection';

const ProjectShowcasePage = () => {
    const { submissionId } = useParams();
    const { submission, event, isLoading, error } = useSubmissions(submissionId);
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    useEffect(() => {
        const fetchImages = async () => {
            if (submission) {
                const storage = getStorage();
                
                try {
                    const urls = await Promise.all(
                        submission.imageFiles.map(async (file: string) => {
                            const imageRef = ref(storage, file);
                            return await getDownloadURL(imageRef);
                        })
                    );
                    setImageUrls(urls);
                } catch (error) {
                    console.error(error);
                }
            }
        };

        fetchImages();
    }, [submission]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    
    const {
        teamName,
        designFeatures,
        designTools,
        nextSteps,
        problemStatement,
        techStack,
        projectLinks,
        teamMembers,
    } = submission || {};

    return (
        <div className='w-full h-full flex flex-col items-center font-poppins'>
            <h1>{event ? event.title : 'Event not found'} submission # {submissionId} by {teamName}</h1>
            <Carousel className='w-[20%] h-[20%]'>
                <CarouselContent>
                    {imageUrls.map((imageUrl, index) => (
                        <CarouselItem key={index} className='w-[50%] h-[50%]'>
                            <img src={imageUrl} alt={`Image ${index}`} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
            <p>Design Features: {designFeatures}</p>
            <p>Design Tools: {designTools}</p>
            <p>Next Steps: {nextSteps}</p>
            <p>Problem Statement: {problemStatement}</p>
            <p>Tech Stack: {techStack}</p>
            {projectLinks.map((projectLink: { url: string }, index: number) => 
                <p key={index}>Project Links: {projectLink.url}</p>
            )}
            {teamMembers.map((teamMember: { name: string, role: string }, index: number) =>
                <p key={index}>Team Members: {teamMember.name} as {teamMember.role}</p>
            )}
            <JudgesCommentSection submissionId={submissionId} />
            <CommunityCommentSection submissionId={submissionId}/>
        </div>
    );
};

export default ProjectShowcasePage;
