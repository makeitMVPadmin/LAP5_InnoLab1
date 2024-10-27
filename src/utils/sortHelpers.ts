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

        // Remove duplicates and sort alphabetically
        const uniqueNames = [...new Set(allTeamMembers)].sort((a, b) =>
            a.localeCompare(b)
        );

        // Format based on length
        if (uniqueNames.length === 0) {
            return "";
        }
        if (uniqueNames.length === 1) {
            return uniqueNames[0];
        }
        if (uniqueNames.length === 2) {
            return `${uniqueNames[0]} and ${uniqueNames[1]}`;
        }

        // More than 2 names
        const othersCount = uniqueNames.length - 2;
        return `${uniqueNames[0]}, ${uniqueNames[1]} and ${othersCount} others`;

    } catch (error) {
        console.error('Error formatting user names:', error);
        return ""; // Return empty string as fallback for better display
    }
};