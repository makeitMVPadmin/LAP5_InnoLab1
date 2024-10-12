import React from 'react';

interface EventDetails {
  title: string;
  organizer: string;
  description: string;
  skillLevel: string;
  themes: string[];
  duration: string;
  meetingLink: string;
  participantCount: string;
  judges: string[];
  challengeDetails: {
    releaseDate: string;
    problemStatement: string;
    objectives: string[];
    constraints: string[];
    evaluationCriteria: string[];
  };
}

const PreviewEvent: React.FC<{ event: EventDetails }> = ({ event }) => {
  return (
    <div className="bg-white p-6 rounded-md shadow-md max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Create an Event</h2>
      <div className="flex justify-between mb-4">
        <button className="btn">Event Details</button>
        <button className="btn">Challenge Details</button>
        <button className="btn active">Review</button>
      </div>

      <h3 className="text-xl font-bold mt-6">Event Details</h3>
      <div className="space-y-4 mt-2">
        <p><strong>Event Title:</strong> {event.title}</p>
        <p><strong>Organized by:</strong> {event.organizer}</p>
        <p><strong>Event Description:</strong> {event.description}</p>
        <p><strong>Skill Level:</strong> {event.skillLevel}</p>
        <p><strong>Themes:</strong> {event.themes.join(', ')}</p>
        <p><strong>Event Duration:</strong> {event.duration}</p>
        <p><strong>Meeting Link:</strong> <a href={event.meetingLink} className="text-blue-500">{event.meetingLink}</a></p>
        <p><strong>Participant Count:</strong> {event.participantCount}</p>
        <p><strong>Judges:</strong> {event.judges.join(', ')}</p>
      </div>

      <h3 className="text-xl font-bold mt-8">Challenge Details</h3>
      <div className="space-y-4 mt-2">
        <p><strong>Challenge Details Release Date:</strong> {event.challengeDetails.releaseDate}</p>
        <p><strong>Problem Statement:</strong> {event.challengeDetails.problemStatement}</p>
        <p><strong>Objectives/Goals:</strong></p>
        <ul className="list-decimal ml-6">
          {event.challengeDetails.objectives.map((objective, index) => (
            <li key={index}>{objective}</li>
          ))}
        </ul>
        <p><strong>Constraints/Limitations:</strong></p>
        <ul className="list-decimal ml-6">
          {event.challengeDetails.constraints.map((constraint, index) => (
            <li key={index}>{constraint}</li>
          ))}
        </ul>
        <p><strong>Evaluation Criteria:</strong></p>
        <ul className="list-decimal ml-6">
          {event.challengeDetails.evaluationCriteria.map((criterion, index) => (
            <li key={index}>{criterion}</li>
          ))}
        </ul>
      </div>

      <div className="mt-8 flex justify-between">
        <button className="btn">Previous</button>
        <button className="btn-primary">Publish Event</button>
      </div>
    </div>
  );
};

export default PreviewEvent;
