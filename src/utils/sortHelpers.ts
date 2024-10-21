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

export const formatUserNames = (submissions) => {
    const names = submissions
        .map(user => user.teamMembers[0].name)
        .slice(0, 2)
        .join(", ");

    const remaining = submissions.length > 2
        ? ` and ${submissions.length - 2} others`
        : "";

    return names + remaining;
};