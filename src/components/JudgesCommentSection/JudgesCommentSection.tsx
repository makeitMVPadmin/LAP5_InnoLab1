import { useEffect, useState } from 'react';
import useSubmission from '../../hooks/useSubmission';

const JudgesCommentSection = ({ submissionId }) => {
    const { submission } = useSubmission(submissionId);
    const [judgesComments, setJudgesComments] = useState([]);

    useEffect(() => {
        if (submission && submission.judgesComments) {
            setJudgesComments(submission.judgesComments);
        }
    }, [submission]);

    return (
        <div>
            <h1>Judge Comments</h1>
            {judgesComments.map((judgeComment, index) => {
                const { comment, judgeName, rating, suggestions } = judgeComment;
                return (
                    <div key={index}>
                        <h1>Judge: {judgeName}</h1>
                        <p>Comment: {comment}</p>
                        <p>Rating: {rating}</p>
                        <p>Suggestions: {suggestions}</p>
                    </div>
                );
            })}  
        </div>
    );
};

export default JudgesCommentSection;
