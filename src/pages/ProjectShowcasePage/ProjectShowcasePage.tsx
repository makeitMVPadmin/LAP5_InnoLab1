import { useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import useSubmission from '../../hooks/useSubmission';
import CommentSection from '../../components/CommentSection/CommentSection';
import DashboardNavbar from '../../components/DashboardNavbar/DashboardNavbar';
import { ReactComponent as Clock } from '../../assets/images/clock.svg'; 
import ParticipantInfoChip from '../../components/ParticipantInfoChip/ParticipantInfoChip';
import PDFViewer from '../../components/PDFViewer/PDFViewer';
import DownloadWithFilename from '../../components/DownloadWithFilename/DownloadWithFilename';
import HorizontalTabMenu from '../../components/HorizontalTabMenu/HorizontalTabMenu';

const ProjectShowcasePage = () => {
    const { submissionId } = useParams<{ submissionId: string }>();
    const { submission, event } = useSubmission(submissionId);
    const downloadRefs = useRef([]);
    const { basicProjectSummary } = event || {};
    const {
        teamName,
        designFeatures,
        designTools,
        nextSteps,
        problemStatement,
        techStack,
        projectLinks,
        projectFiles,
        pdfFiles,
        teamMembers,
        createdAt,
    } = submission || {};


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

    const handleDownloadAll = () => {
        downloadRefs.current.forEach(ref => {
            if (ref) ref.click();
        });
    };

    return (
        <main className='w-full h-full bg-gradient-to-b from-MVP-extra-light-blue to-MVP-white bg-no-repeat'>
            <DashboardNavbar />
            <header className="h-[15%] m-h-[5rem] w-full shadow-sm bg-MVP-soft-blue flex flex-col justify-between rem-[2.1rem] py-[0.4rem] px-[2.5rem] max-h-[4.8rem] justify-center">
                <Link to="/hackathons" className="text-MVP-black cursor-pointer font-gilroy text-[1.5rem] font-extrabold my-auto">← Back</Link>
            </header>
            <div className='flex flex-col items-center font-gilroy'>
                <section className='w-[66%] flex flex-col'>
                    <h1 className='text-MVP-black font-sans text-[2.9rem] font-extrabold leading-[115.645%] mt-[1.9rem]'>{event && event.title}</h1>
                    <div className="flex text-[1.3rem] my-[1.3rem] gap-[0.5rem]">
                        <Clock />
                        <p className="font-extrabold">Submitted on</p>
                        <p className="font-light"> {createdAt?.toDate().toLocaleString('en-US', options)}</p>
                    </div>
                    <h2 className="text-MVP-black text-[1.5rem] font-extrabold leading-[115.645%] font-gilroy ligature-off">Team Name</h2>
                    <p className="text-MVP-black text-[1.3rem] font-normal leading-[115.645%] font-gilroy my-[0.5rem]">{teamName}</p>   
                    <div className="h-full flex gap-[0.9rem] my-[1rem]">
                        {teamMembers?.map(({ name, role }, index) => (
                            <ParticipantInfoChip key={index} integer={index} fullName={name} role={role} />
                        ))}
                    </div>
                    <div className="flex justify-between items-center my-[0.6rem]">
                        <h2 className="text-center text-MVP-black text-[1.5rem] font-extrabold leading-[115.645%] font-sans ligature-off">Project Files</h2>
                        <button onClick={handleDownloadAll} className='rounded-[0.5rem] border-t-[0.15rem] border-r-[0.25rem] border-b-[0.25rem] border-l-[0.15rem] border-MVP-black bg-MVP-white flex p-[0.8rem] px-[1.6rem] justify-center items-center gap-[0.5rem] text-center text-MVP-black text-[1.4rem] font-extrabold leading-[115.645%] font-sans ligature-off'>Download All Files</button>
                    </div>
                    <PDFViewer pdfFileName={pdfFiles} />
                    <div className='flex justify-evenly my-[2rem]'>
                        {projectFiles?.map((projectFile: string, index: number) => 
                            <DownloadWithFilename key={index} filename={getFileNameFromUrl(projectFile)} ref={el => downloadRefs.current[index] = el} />
                        )}
                    </div>
                    <h2 className="my-[0.6rem] text-MVP-black text-[1.5rem] font-extrabold leading-[130.645%] font-gilroy ligature-off">Tech Stack: *</h2>
                    <ul>
                        {techStack?.split(",").map(item => item.trim()).map((tech, index) => (
                            <li key={index} className="text-MVP-black font-normal text-[1.3rem] leading-[130.645%] font-poppins my-[0.2rem]">
                                {tech}
                            </li>
                        ))}
                    </ul>
                    <h2 className="my-[1.3rem] text-MVP-black text-[1.5rem] font-extrabold leading-[115.645%] font-gilroy ligature-off">Design Tool Used: *</h2>
                    <ul>
                        {designTools?.split(",").map(item => item.trim()).map((tool, index) => (
                            <li key={index} className="text-MVP-black font-normal text-[1.3rem] leading-[115.645%] font-poppins my-[0.2rem]">
                                {tool}
                            </li>
                        ))}
                    </ul>
                    <h2 className="my-[1.3rem] text-MVP-black text-[1.5rem] font-extrabold leading-[115.645%] font-gilroy ligature-off">Project Links:</h2>
                    <ul>
                        {projectLinks?.map(({url}, index) => (
                            <li key={index} className="text-MVP-black font-normal text-[1.3rem] leading-[115.645%] font-poppins my-[0.4rem] hover:underline">
                                <Link to={url}>
                                    {url}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <HorizontalTabMenu 
                        tabs={[
                            {id: 'problemStatement', label: 'Problem Statement', content: problemStatement },
                            {id: 'projectChallenge', label: 'Project Challenge', content: basicProjectSummary },
                            {id: 'designFeatures', label: 'Design Features', content: designFeatures },
                            {id: 'nextSteps', label: 'Next Steps', content: nextSteps}
                        ]}
                    />
                    <h1 className="flex-1 text-MVP-black font-gilroy text-[1.5rem] font-extrabold leading-[1.8rem]">
                        Comments
                    </h1>
                    <CommentSection submissionId={submissionId} />
                </section>
            </div>
        </main>
    );    
};

export default ProjectShowcasePage;

