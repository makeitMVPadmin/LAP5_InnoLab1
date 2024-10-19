import { useState } from "react";
import { HackathonEvent } from "../Firebase/FirebaseQueries";
import { Dispatch, SetStateAction } from "react";

type ModifiedHackationEvent = HackathonEvent & {
    id: string;
};

type FilterArrayType = {
    skillLevel: string;
    disciplines: string[];
    themes: string[];
    timezone: string;
    duration: string;
};

export type FilterPropsType = {
    filters: FilterArrayType;
    setFilters: Dispatch<SetStateAction<FilterArrayType>>;
}

const useFilterEvents = (events: ModifiedHackationEvent[]) => {

    const [filters, setFilters] = useState<FilterArrayType>({
        skillLevel: "",
        disciplines: [],
        themes: [],
        timezone: "",
        duration: "",
    });

    const calculateDuration = (startTime: string, endTime: string) => {
        const start = new Date(startTime);
        const end = new Date(endTime);
        return (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    };

    const containsAllEntries = (eventArray: string[], checkArray: string[]) => {
        return checkArray.every((item: string) => eventArray.includes(item));
    };

    const filteredEvents = events.filter((event) => {
        const duration = calculateDuration(event.startTime, event.endTime);

        const matchesSkillLevel = !filters.skillLevel || 
            (event.skillLevel && event.skillLevel.toLowerCase() === filters.skillLevel.toLowerCase());

        const matchesDisciplines = filters.disciplines?.length === 0 || 
        (event.disciplines &&
            containsAllEntries(event.disciplines.map(d => d.toLowerCase()), filters.disciplines.map(d => d.toLowerCase())));
        
    
        const matchesThemes = filters.themes?.length === 0 || 
        (event.themes &&
            containsAllEntries(event.themes.map((t: string) => t.toLowerCase()), filters.themes.map((t: string) => t.toLowerCase())));

        const matchestimezone = !filters.timezone || 
            (event.timeZone && event.timeZone.toLowerCase() === filters.timezone.toLowerCase());

            const matchesDuration = !filters.duration || 
            (duration && 
            (filters.duration === "less than 24 hours" && duration < 24) ||
            (filters.duration === "24 to 48 hours" && duration >= 24 && duration < 48) ||
            (filters.duration === "48 to 72 hours" && duration >= 48 && duration < 72));

        return matchesSkillLevel && matchesDisciplines && matchesThemes && matchestimezone && matchesDuration;
        });

    return { filters, setFilters, filteredEvents };
};

export default useFilterEvents;
