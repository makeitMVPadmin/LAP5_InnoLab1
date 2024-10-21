export const SUBMISSION_TABLE_FIELDS = [
    { key: 'teamName', header: 'Team Name' },
    { key: 'title', header: 'Title' },
    { key: 'techStack', header: 'Tech Stack' },
    { key: 'designTools', header: 'Design Tools' },
    { key: 'designFeatures', header: 'Design Features' },
    { key: 'designImpact', header: 'Design Impact' },
    { key: 'nextSteps', header: 'Next Steps' },
    { key: 'problemStatement', header: 'Problem Statement' },
    { key: 'imageFiles', header: 'Images' },
    {
        key: 'projectLinks',
        header: 'Links',
        formatter: (links) => links.map(link => link.url).join(';')
    },
    {
        key: 'teamMembers',
        header: 'Team Members',
        formatter: (members) => members.map(member => `${member.name} - ${member.role}`).join(';')
    }
];

