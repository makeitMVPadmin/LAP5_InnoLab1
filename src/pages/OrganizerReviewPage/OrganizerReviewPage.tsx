import { useEffect, useState, useMemo, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchAllEventProjectSubmissions, fetchHackathonEvents, deleteSubmission, fetchHackathonParticipants } from '../../Firebase/FirebaseQueries';
import { SUBMISSION_TABLE_FIELDS } from "../../constants/tableFields"
import { sortSubmissions, formatUserNames } from '../../utils/sortHelpers';
import { Popover, PopoverContent, PopoverTrigger, } from "../../components/ui/popover"
import SortIcon from "../../assets/images/sortIcon.svg"
import MoreDotsIcon from "../../assets/images/moreDots.svg"
import DeleteIcon from "../../assets/images/delete.svg"
import ExportButton from "../../components/ExportButton/ExportButton";


const OrganizerReviewPage = () => {
    const [allSubmissions, setAllSubmissions] = useState([])
    const [participatingUsers, setParticipatingUsers] = useState(0)
    const [sortField, setSortField] = useState(null);
    const [sortOrder, setSortOrder] = useState('asc');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { eventId } = useParams();

    const fetchSubmissions = useCallback(async () => {
        if (!eventId) return;

        setIsLoading(true);
        setError(null);

        try {
            const { event, error: eventError } = await fetchHackathonEvents(eventId);

            if (eventError || !event) {
                throw new Error(eventError || "Invalid event ID.");
            }

            const { submissions } = await fetchAllEventProjectSubmissions(eventId);
            setAllSubmissions(submissions);
        } catch (error) {
            console.error("Error fetching the event or submissions:", error);
            setError(error instanceof Error ? error.message : "Failed to load submissions. Please refresh.");
        } finally {
            setIsLoading(false);
        }
    }, [eventId]);

    const fetchParticipants = useCallback(async () => {
        if (!eventId) return;

        try {
            const { numberOfParticipants } = await fetchHackathonParticipants(eventId);
            setParticipatingUsers(numberOfParticipants);
        } catch (error) {
            console.error("Error fetching participants:", error);
        }
    }, [eventId]);

    useEffect(() => {
        fetchSubmissions();
        fetchParticipants();
    }, [fetchSubmissions, fetchParticipants]);

    const formattedUserNames = useMemo(() =>
        formatUserNames(allSubmissions),
        [allSubmissions]
    );

    const handleSort = useCallback((field) => {
        setSortField(prevField => {
            const newOrder = prevField === field && sortOrder === 'asc' ? 'desc' : 'asc';
            setSortOrder(newOrder);
            return field;
        });
    }, [sortOrder]);

    const handleDelete = async (submissionId: string) => {
        try {
            const result = await deleteSubmission(submissionId, eventId);

            if (result.success) {
                setAllSubmissions((prevSubmissions) =>
                    prevSubmissions.filter((submission) => submission.id !== submissionId)
                );
            } else {
                throw new Error("Deletion failed");
            }
        } catch (error) {
            console.error("Error deleting submission:", error);
        }
    };


    const sortedSubmissions = useMemo(() =>
        sortSubmissions(allSubmissions, sortField, sortOrder),
        [allSubmissions, sortField, sortOrder]
    );
    const submissionCount = allSubmissions.length

    if (isLoading) { return <div>Loading ...</div> }
    if (error) return <div>Error: {error}</div>;


    return (
        <main className="font-gilroy">
            <section className="px-5 w-full md:w-9/12 max-w-[930px] md:m-auto">
                <h1 className="text-4xl font-gilroy font-bold mb-5 pt-14">Submission</h1>
                <p className="font-semibold mt-6">View all hackathons submissions below</p>

                <div className="flex justify-between pt-8">
                    <div>
                        <h2 className="text-xl font-bold">
                            Registrants <span className="font-semibold">{`(${submissionCount}/${participatingUsers})`}</span>
                        </h2>
                        <p className="mt-3 font-normal font-poppins">{formattedUserNames} </p>
                    </div>
                    <ExportButton data={allSubmissions} fields={SUBMISSION_TABLE_FIELDS} />
                </div>
                <div className="mt-24">
                    <div className="grid grid-cols-12 border-b-2 border-MVP-light-gray font-bold">
                        <div className="text-xl p-4 col-span-3 flex gap-4 items-center" onClick={() => handleSort('teamName')}>
                            <span>Team </span>
                            <img className="h-5" src={SortIcon} alt="sort team" />
                        </div>
                        <div className="text-xl p-4 col-span-4 flex gap-4 items-center font-bold" onClick={() => handleSort('title')}>
                            <span>Title </span>
                            <img className="h-5" src={SortIcon} alt="sort title" />
                        </div>
                        <div className="text-xl grow p-4 col-span-3 flex gap-4 items-center font-bold">
                            <span>Status </span>
                            <img className="h-5" src={SortIcon} alt="sort status" />
                        </div>
                        <div className="text-xl p-4 col-span-2 flex gap-4 items-center">
                        </div>
                    </div>
                    <ul className="w-full mt-6">
                        {sortedSubmissions.map((submission) => {
                            return (

                                <li key={submission.id} className="flex w-full  py-6 items-center">
                                    <Link to={`/hackathons/submissions/${submission.id}`} className="grid grid-cols-12 w-full items-center">
                                        <span className="col-span-3  px-4">{submission.teamName}</span>
                                        <span className="col-span-5 grow px-4">{submission?.title}</span>
                                        <div className="col-span-3 px-4 rounded-full bg-MVP-green justify-center h-8 items-center flex font-bold">
                                            <Link to={`/hackathons/submissions/${submission.id}`}>
                                                Submitted
                                            </Link>
                                        </div>
                                    </Link>

                                    <Popover>
                                        <PopoverTrigger className="col-span-2 min-w-11 min-h-11 cursor-pointer">
                                            <img className="h-6" src={MoreDotsIcon} alt="three dots icon for more options" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-30 border-3 border-black h-11 px-3 py-2 justify-center items-center">
                                            <button className="flex gap-2 justify-center items-center" onClick={(e) => {
                                                e.stopPropagation();
                                                handleDelete(submission.id);
                                            }}>
                                                <img className="h-5" src={DeleteIcon} alt="delete icon" aria-label="click to remove submission" />
                                                <span className="text-sm font-gilroy">Delete</span>
                                            </button>
                                        </PopoverContent>

                                    </Popover>
                                </li>
                            )
                        })}
                    </ul>
                </div>

            </section>
        </main>
    )
}

export default OrganizerReviewPage