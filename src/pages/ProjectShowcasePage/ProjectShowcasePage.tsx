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
import CommunityCommentSection from '../../components/CommunityCommentSection/CommunityCommentSection';
import JudgesCommentSection from '../../components/JudgesCommentSection/JudgesCommentSection';

const ProjectShowcasePage = () => {
    const { submissionId } = useParams<{ submissionId: string }>();
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
                    console.error('Failed to fetch images: ', error);
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
                            <img src={imageUrl} alt={`Submission Image ${index + 1}`} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious aria-label='Previous image'/>
                <CarouselNext aria-label='Next image'/>
            </Carousel>
            <section>
                <h2>Design Features</h2>
                <p>{designFeatures}</p>

                <h2>Design Tools</h2>
                <p>{designTools}</p>

                <h2>Next Steps</h2>
                <p>{nextSteps}</p>

                <h2>Problem Statement</h2>
                <p>{problemStatement}</p>

                <h2>Tech Stack</h2>
                <p>{techStack}</p>
            </section>
            <h2>Project Links:</h2>
            {projectLinks.map((projectLink: { url: string }, index: number) => 
                <p key={index}>{projectLink.url}</p>
            )}
            <h2>Team Members:</h2>
            {teamMembers.map((teamMember: { name: string, role: string }, index: number) =>
                <p key={index}> {teamMember.name} as {teamMember.role}</p>
            )}
            <JudgesCommentSection submissionId={submissionId} />
            <CommunityCommentSection submissionId={submissionId}/>
        </div>
    );
};

export default ProjectShowcasePage;
