export const sortSubmissions = (submissions, sortField, sortOrder) => {
    if (!sortField) return submissions;

    return [...submissions].sort((a, b) => {
        const aValue = (a[sortField] || '').toLowerCase();
        const bValue = (b[sortField] || '').toLowerCase();

        return sortOrder === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
    });
};

// export const formatUserNames = (submissions) => {
//     const names = submissions
//         .map(user => user.teamMembers[0].name)
//         .slice(0, 2)
//         .join(", ");

//     const remaining = submissions.length > 2
//         ? ` and ${submissions.length - 2} others`
//         : "";

//     return names + remaining;
// };

interface TeamMember {
    name: string;
}

interface Submission {
    teamMembers: TeamMember[];
}

export const formatUserNames = (submissions: Submission[] = []) => {
    try {
        // Safely extract and flatten team members
        const allTeamMembers = submissions
            .filter(submission => submission && submission.teamMembers)
            .flatMap(submission => submission.teamMembers || [])
            .filter(member => member && member.name)
            .map(member => member.name);

        // Remove duplicates
        const uniqueNames = [...new Set(allTeamMembers)];

        // Sort alphabetically
        return uniqueNames.sort((a, b) => a.localeCompare(b));
    } catch (error) {
        console.error('Error formatting user names:', error);
        return []; // Return empty array as fallback
    }
};