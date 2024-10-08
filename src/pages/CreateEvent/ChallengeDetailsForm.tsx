import { useForm, Controller } from 'react-hook-form';
import './ChallengeDetailsForm.scss';

interface ChallengeDetailsFormInputs {
  challengeReleaseDate: string;
  problemStatement: string;
  objectivesGoals: string;
  constraints: string;
  evaluationCriteria: string;
  additionalInformation: string;
}

const ChallengeDetailsForm: React.FC = () => {
  const { register, handleSubmit, control, formState: { errors }, watch } = useForm<ChallengeDetailsFormInputs>({
    defaultValues: {
      challengeReleaseDate: '',
      problemStatement: '',
      objectivesGoals: '',
      constraints: '',
      evaluationCriteria: '',
      additionalInformation: ''
    }
  });

  const onSubmit = (data: ChallengeDetailsFormInputs) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="challenge-details-form">
      <h1>Create an Event</h1>
      <div className="steps">
        <div className="step active">1. Event Details</div>
        <div className="step">2. Challenge Details</div>
        <div className="step">3. Review</div>
      </div>

      <div className="form-group">
        <label htmlFor="challengeReleaseDate">Challenge Release Date*</label>
        <Controller
          name="challengeReleaseDate"
          control={control}
          rules={{ required: 'Challenge release date is required' }}
          render={({ field }) => (
            <input
              type="datetime-local"
              {...field}
              className={`form-control ${errors.challengeReleaseDate ? 'error' : ''}`}
            />
          )}
        />
        {errors.challengeReleaseDate && <p className="error-text">{errors.challengeReleaseDate.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="problemStatement">Problem Statement*</label>
        <textarea
          {...register('problemStatement', { required: 'Problem statement is required', maxLength: 500 })}
          className={`form-control ${errors.problemStatement ? 'error' : ''}`}
          placeholder="Enter the Problem Statement"
          maxLength={500}
        />
        <p className="char-count">{watch('problemStatement')?.length || 0}/500 characters</p>
        {errors.problemStatement && <p className="error-text">{errors.problemStatement.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="objectivesGoals">Objectives/Goals*</label>
        <textarea
          {...register('objectivesGoals', { required: 'Objectives/Goals are required', maxLength: 500 })}
          className={`form-control ${errors.objectivesGoals ? 'error' : ''}`}
          placeholder="Enter the objectives/goals"
          maxLength={500}
        />
        <p className="char-count">{watch('objectivesGoals')?.length || 0}/500 characters</p>
        {errors.objectivesGoals && <p className="error-text">{errors.objectivesGoals.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="constraints">Constraints/Limitations</label>
        <textarea
          {...register('constraints', { maxLength: 500 })}
          className="form-control"
          placeholder="Enter the constraints/limitations"
          maxLength={500}
        />
        <p className="char-count">{watch('constraints')?.length || 0}/500 characters</p>
      </div>

      <div className="form-group">
        <label htmlFor="evaluationCriteria">Evaluation Criteria</label>
        <textarea
          {...register('evaluationCriteria', { maxLength: 500 })}
          className="form-control"
          placeholder="Enter the evaluation criteria"
          maxLength={500}
        />
        <p className="char-count">{watch('evaluationCriteria')?.length || 0}/500 characters</p>
      </div>

      <div className="form-group">
        <label htmlFor="additionalInformation">Additional Information</label>
        <textarea
          {...register('additionalInformation', { maxLength: 500 })}
          className="form-control"
          placeholder="Enter any additional information needed"
          maxLength={500}
        />
        <p className="char-count">{watch('additionalInformation')?.length || 0}/500 characters</p>
      </div>

      <div className="form-navigation">
        <button type="button" className="btn prev">Previous</button>
        <button type="submit" className="btn next">Next</button>
      </div>
    </form>
  );
};

export default ChallengeDetailsForm;
