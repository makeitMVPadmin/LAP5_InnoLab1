import { useState } from "react";
import { HackathonEventType } from "../Firebase/FirebaseQueries";

type ModifiedHackationEvent = HackathonEventType & {
    id: string;
};

type FilterArrayType = {
    skillLevel: string[];  // Changed to array for multiple selection
    disciplines: string[];
    themes: string[];
    timeZone: string[];   // Changed to array for multiple selection
    duration: string[];   // Changed to array for multiple selection
};

export type FilterPropsType = {
    filters: FilterArrayType;
    onFilterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const useFilterEvents = (events: ModifiedHackationEvent[] = []) => {
    const [filters, setFilters] = useState<FilterArrayType>({
        skillLevel: [],
        disciplines: [],
        themes: [],
        timeZone: [],
        duration: []
    });

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;

        setFilters(prev => ({
            ...prev,
            [name]: checked
                ? [...prev[name], value]
                : prev[name].filter(item => item !== value)
        }));
    };

    const calculateDuration = (startTime: string, endTime: string) => {
        const start = new Date(startTime);
        const end = new Date(endTime);
        return (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    };

    const containsAnyEntries = (eventArray: string[] = [], checkArray: string[] = []) => {
        return checkArray.length === 0 || checkArray.some(item =>
            eventArray.some(eventItem => eventItem.toLowerCase() === item.toLowerCase())
        );
    };

    const filteredEvents = (events || []).filter((event) => {
        const eventDisciplines = event?.disciplines || [];
        const eventThemes = event?.themes || [];
        const duration = calculateDuration(event.startTime, event.endTime);

        const matchesSkillLevel = filters.skillLevel.length === 0 ||
            filters.skillLevel.includes(event.skillLevel || '');

        const matchesDisciplines = containsAnyEntries(
            Array.isArray(eventDisciplines) ? eventDisciplines : [],
            filters.disciplines
        );

        const matchesThemes = containsAnyEntries(
            Array.isArray(eventThemes) ? eventThemes : [],
            filters.themes
        );

        const matchesTimezone = filters.timeZone.length === 0 ||
            filters.timeZone.includes(event.timeZone || '');

        const matchesDuration = filters.duration.length === 0 ||
            filters.duration.some(dur => {
                const hours = parseInt(dur);
                return duration <= hours;
            });

        return matchesSkillLevel &&
            matchesDisciplines &&
            matchesThemes &&
            matchesTimezone &&
            matchesDuration;
    });

    return { filters, setFilters: handleFilterChange, filteredEvents };
};

export default useFilterEvents;