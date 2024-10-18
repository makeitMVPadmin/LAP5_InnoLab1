import { useEffect, useState } from 'react';
import { useFetchHackathonUser } from '../../Firebase/FirebaseQueries';
import useSubmission from '../../hooks/useSubmission';
import { addCommentToSubmission } from '../../Firebase/FirebaseStore';
import { auth } from '../../Firebase/FirebaseConfig';
import { Timestamp } from 'firebase/firestore';

const CommunityCommentSection = ({ submissionId }) => {
    const { hackathonUser } = useFetchHackathonUser(auth.currentUser.uid);
    const { submission } = useSubmission(submissionId);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const [error, setError] = useState('');
    const [showsFull, setShowsFull] = useState([]);

    useEffect(() => {
        if (submission && submission.comments) {
            setComments(submission.comments);
            setShowsFull(submission.comments.map(() => false));
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
                    fullName: hackathonUser?.fullName,
                    profileUrl: hackathonUser?.profilePhoto
                });

                if (response.success) {
                    const {commenterName, commentEntry, commentTimestamp, profileUrl} = response;
                    const newComment = {
                        commenterName: commenterName,
                        commentEntry: commentEntry,
                        commentTimestamp: commentTimestamp.toDate().toLocaleString('en-US', options),
                        profileUrl: profileUrl
                    };
                    setComments(prevComments => [...prevComments, newComment]);
                    setComment('');
                    setError('');
                } else {
                    setError('No success from addCommentToSubmission');
                }
            } catch (error) {
                console.log(error);
                setError('Failed to add comment.');
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleCommentSubmit} className='flex flex-col'>
                <div className="flex gap-[16px] mt-[26px] mb-[15px]">
                    <img src="https://i.pravatar.cc/300?img=5" alt="" className="w-[64px] h-[64px] rounded-full bg-lightgray bg-cover bg-no-repeat" />
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
                        className="flex flex-col items-end h-[100px] flex-1 rounded-[10px] border-t-[3px] border-t-black border-r-[5px] border-r-black border-b-[5px] border-b-black border-l-[3px] border-l-black bg-white p-[16px] px-[24px] placeholder:text-[#767676] placeholder:font-normal text-[22px]"
                    />
                </div>
                <button type="submit" className='bg-[#EFEFEF] rounded-[10px] border-t-[3px] border-r-[5px] border-b-[5px] border-l-[3px] border-black bg-white flex p-[8px] px-[18px] justify-center items-center gap-[10px] text-center text-[#000] text-[16px] font-extrabold leading-[115.645%] font-sans ligature-off self-end'>Submit</button>
            </form>
            <ul className='px-[20px]'>
                {comments.map((comment, index) => { 
                    let renderedTimestamp;
                    const {commenterName, commentEntry, commentTimestamp, profileUrl} = comment;
                    if (commentTimestamp instanceof Timestamp) {
                        renderedTimestamp = commentTimestamp.toDate().toLocaleString('en-US', options);
                    } else {
                        renderedTimestamp = commentTimestamp;
                    }

                    return (
                        <li key={index} className='flex gap-[18px] mb-[20px]'>
                            <img src={profileUrl} alt={`Profile image for ${commenterName}`} className="w-[44px] h-[44px] rounded-full bg-lightgray bg-cover bg-no-repeat"/>
                            <div>
                                <div className='flex gap-[20px]'>
                                    <h2 className="self-stretch text-black font-feature-settings-[liga:off,clig:off] font-gilroy text-[22px] font-bold leading-[32px]">{commenterName}</h2>
                                    <p className='leading-[36px]'>{renderedTimestamp}</p>
                                </div>
                                <p className="self-stretch text-black font-feature-settings-[liga:off,clig:off] font-poppins text-[18px] font-light leading-[115.645%]">{(showsFull[index] || commentEntry.split(/\s+/).filter(Boolean).length < 25) ? commentEntry : `${commentEntry.split(' ').slice(0, 24).join(' ')}...`}</p>
                                {commentEntry.split(/\s+/).filter(Boolean).length > 25 && <button onClick={() => toggleCommentLength(index)}>{ showsFull[index] ? 'See Less': 'Read more' }</button>}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default CommunityCommentSection;
