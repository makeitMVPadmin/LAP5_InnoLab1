import { useEffect, useState } from 'react';
import { useFetchHackathonUser } from '../../Firebase/FirebaseQueries';
import useSubmission from '../../hooks/useSubmission';
import { addCommentToSubmission, removeCommentFromSubmission } from '../../Firebase/FirebaseStore';
import { auth } from '../../Firebase/FirebaseConfig';
import { Timestamp } from 'firebase/firestore';
import { ReactComponent as MoreIcon } from '../../assets/images/moreIcon.svg';

const CommunityCommentSection = ({ submissionId }) => {
    const { hackathonUser } = useFetchHackathonUser(auth.currentUser.uid);
    const { submission } = useSubmission(submissionId);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [showsFull, setShowsFull] = useState([]);
    const [showOption, setShowOption] = useState([]);

    useEffect(() => {
        if (submission && submission.comments) {
            setComments(submission.comments);
            setShowsFull(submission.comments.map(() => false));
            setShowOption(submission.comments.map(() => false));
        }
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

    const toggleCommentLength = (idx: number) => {
        setShowsFull((prev) => {
          const newShowsFull = [...prev];
          newShowsFull[idx] = !newShowsFull[idx];
          return newShowsFull;
        });
      };
    
      const showOptionToggle = (idx: number) => {
        setShowOption((prev) => {
            const newShowOption = [...prev];
            newShowOption[idx] = !newShowOption[idx];
            return newShowOption;
          });
      }
    

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };
    
    const handleCommentSubmit = async (event) => {
        event.preventDefault();
        if (comment.trim()) {
            try {
                const response = await addCommentToSubmission({
                    submissionId,
                    commentEntry: comment,
                    email: hackathonUser?.email,
                    fullName: hackathonUser?.fullName,
                    profileUrl: hackathonUser?.profilePhoto
                });

                if (response.success) {
                    const {commenterName, commentEntry, commentTimestamp, profileUrl, commenterEmail} = response;
                    const newComment = {
                        commenterName: commenterName,
                        commentEntry: commentEntry,
                        commentTimestamp: commentTimestamp.toDate().toLocaleString('en-US', options),
                        profileUrl: profileUrl,
                        commenterEmail: commenterEmail
                    };
                    setComments(prevComments => [...prevComments, newComment]);
                    setComment('');
                } 

            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleCommentDelete = async (idx: number) => {
        try {
            const response = await removeCommentFromSubmission({submissionId, index: idx});

            if (response.success) {
                setComments(prevComments => prevComments.filter((_, i) => i !== idx));
            }

            setShowOption((prev) => {
                const newShowOption = [...prev];
                newShowOption[idx] = !newShowOption[idx];
                return newShowOption;
            });

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <form onSubmit={handleCommentSubmit} className='flex flex-col' aria-labelledby="comment-form-title">
                <h2 id="comment-form-title" className="hidden">Comment Section</h2>
                <div className="flex gap-[1rem] mt-[1.7rem] mb-[0.9rem]">
                    <img 
                        src="https://i.pravatar.cc/300?img=5" 
                        alt="User profile" 
                        className="w-[4rem] h-[4rem] rounded-full bg-lightgray bg-cover bg-no-repeat" 
                        loading="lazy"
                    />
                    <textarea
                        value={comment}
                        onChange={handleCommentChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) { 
                                e.preventDefault();
                                handleCommentSubmit(e);
                            }
                        }}
                        placeholder="Write your comment here"
                        rows={4}
                        required
                        className="flex flex-col items-end h-[6.3rem] flex-1 rounded-[0.6rem] border-[0.2rem] border-black bg-white p-[1rem] placeholder:text-MVP-gray text-[1.2rem]"
                    />
                </div>
                <button 
                    type="submit" 
                    className='bg-MVP-light-gray rounded-[0.6rem] border-[0.2rem] border-black flex p-[0.5rem] px-[1.1rem] justify-center items-center gap-[0.6rem] text-MVP-black text-[1rem] font-extrabold leading-[115.645%] self-end'
                    aria-label="Submit comment"
                >
                    Submit
                </button>
            </form>
            <ul className='w-full' role="list">
                {comments?.map((comment, index) => { 
                    let renderedTimestamp;
                    const {commenterName, commenterEmail, commentEntry, commentTimestamp, profileUrl } = comment;
                    if (commentTimestamp instanceof Timestamp) {
                        renderedTimestamp = commentTimestamp.toDate().toLocaleString('en-US', options);
                    } else {
                        renderedTimestamp = commentTimestamp;
                    }

                    return (
                        <li key={index} className='flex gap-[1.1rem] my-[1.3rem] w-full relative' role="listitem">
                            <img 
                                src={profileUrl} 
                                alt={`Profile of ${commenterName}`} 
                                className="w-[2.8rem] h-[2.8rem] rounded-full bg-lightgray bg-cover bg-no-repeat" 
                                loading="lazy" 
                            />
                            <div className='w-[95%]'>
                                <div className='flex gap-[1.25rem]'>
                                    <h3 className="text-black font-gilroy text-[1.4rem] font-bold leading-[2rem]">{commenterName}</h3>
                                    <time className='leading-[2.3rem]' dateTime={renderedTimestamp}>
                                        {renderedTimestamp}
                                    </time>
                                </div>
                                <p className="text-black font-poppins text-[1.1rem] font-light leading-[115.645%]">
                                    {(showsFull[index] || commentEntry.split(/\s+/).filter(Boolean).length < 25) ? 
                                        commentEntry : 
                                        `${commentEntry.split(' ').slice(0, 24).join(' ')}...`}
                                </p>
                                {commentEntry.split(/\s+/).filter(Boolean).length > 25 && (
                                    <button 
                                        onClick={() => toggleCommentLength(index)} 
                                        className="text-blue-600 hover:underline"
                                        aria-expanded={showsFull[index]}
                                    >
                                        {showsFull[index] ? 'See Less' : 'Read More'}
                                    </button>
                                )}
                            </div>                           
                            {hackathonUser.email === commenterEmail && (
                                <>
                                    <button 
                                        className='w-fit h-fit' 
                                        aria-label={`More options for ${commenterName}`}
                                    >
                                        <MoreIcon onClick={() => showOptionToggle(index)} className='h-[1.5rem]' />
                                    </button>
                                    {showOption[index] && (
                                        <button
                                            className='absolute right-3 top-6 z-5 rounded-[0.6rem] border-[0.2rem] border-black bg-white flex p-[0.5rem] px-[1.1rem] justify-center items-center gap-[0.6rem] text-MVP-black text-[1rem] font-extrabold leading-[115.645%]'
                                            onClick={() => handleCommentDelete(index)}
                                            aria-label={`Delete comment by ${commenterName}`}
                                        >
                                            Delete Comment
                                        </button>
                                    )}
                                </>
                            )}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default CommunityCommentSection;
