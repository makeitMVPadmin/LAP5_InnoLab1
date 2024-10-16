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

    useEffect(() => {
        if (submission && submission.comments) {
            setComments(submission.comments);
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
                    fullName: hackathonUser.fullName
                });

                if (response.success) {
                    const {commenterName, commentEntry, commentTimestamp} = response;

                    const newComment = {
                        commenterName: commenterName,
                        commentEntry: commentEntry,
                        commentTimestamp: commentTimestamp.toDate().toLocaleString('en-US', options)
                    };
                    setComments(prevComments => [...prevComments, newComment]);
                    setComment('');
                    setError('');
                } else {
                    setError(response.message);
                }
            } catch (error) {
                console.log(error);
                setError('Failed to add comment.');
            }
        }
    };

    return (
        <div>
            <h1>Comments</h1>
            <form onSubmit={handleCommentSubmit}>
                <textarea
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder="Add a comment..."
                    rows={4}
                    required
                />
                <button type="submit">Submit</button>
            </form>
            <ul>
                {comments.map((comment, index) => { 
                    let renderedTimestamp;
                    const {commenterName, commentEntry, commentTimestamp} = comment;
                    if (commentTimestamp instanceof Timestamp) {
                        renderedTimestamp = commentTimestamp.toDate().toLocaleString('en-US', options);
                    } else {
                        renderedTimestamp = commentTimestamp;
                    }

                    return (
                        <li key={index}>
                            {renderedTimestamp} <strong>{commenterName}:</strong> {commentEntry}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default CommunityCommentSection;
