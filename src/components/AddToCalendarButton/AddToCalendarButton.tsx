import { Button } from '../../components/ui/button';
import { STYLES } from '../../constants/styles';
import AddToCalendarIcon from "../../assets/images/AddToCalendarIcon.svg"

const formatCalendarDateTime = (dateStr, timeStr, timezoneStr = 'GMT-0500') => {
    try {

        // Parse date components (YYYY-MM-DD)
        const [year, month, day] = dateStr.split('-').map(Number);

        // Parse time components (HH:MM)
        const [hours, minutes] = timeStr.split(':').map(Number);

        // Define timezone offsets for common abbreviations
        const timezoneOffsets = {
            "EST": -5,
            "PST": -8,
            "CMT": -6,
            "MST": -7,
            "GMT": 0,
        };

        let offsetHours;
        if (timezoneStr.includes("GMT") || timezoneStr.match(/[-+]\d{4}/)) {
            // Handle "GMT+/-HHMM" offsets
            const cleanedTimezoneStr = timezoneStr.replace("GMT", "");
            const offsetSign = cleanedTimezoneStr.startsWith('-') ? -1 : 1;
            offsetHours = parseInt(cleanedTimezoneStr.slice(1, 3)) * offsetSign;
        } else if (timezoneOffsets[timezoneStr]) {
            // Handle known abbreviations
            offsetHours = timezoneOffsets[timezoneStr];
        } else {
            throw new Error(`Unknown timezone format: ${timezoneStr}`);
        }

        // Create date in UTC by adjusting for the timezone offset
        const utcDate = new Date(Date.UTC(
            year,
            month - 1,  // Months are 0-based in JavaScript
            day,
            hours - offsetHours,
            minutes,
            0  // seconds
        ));

        // Check if the date is valid
        if (isNaN(utcDate.getTime())) {
            throw new Error("Invalid Date creation. Check input values.");
        }

        const isoString = utcDate.toISOString().split('.')[0] + 'Z';
        return isoString;
    } catch (error) {
        console.error('Error formatting date:', error);
        throw new Error(`Failed to format date: ${dateStr} ${timeStr} - ${error.message}`);
    }
};

const AddToCalendarButton = ({
    title = "Innolab Hackathon",
    description,
    startDate,
    startTime,
    endDate,
    endTime,
    timezone = 'America/New_York',
    location,
}) => {

    const formattedStartTime = formatCalendarDateTime(startDate, startTime, timezone);
    const formattedEndTime = formatCalendarDateTime(endDate, endTime, timezone);

    console.log('Formatted times:', { formattedStartTime, formattedEndTime });


    const generateGoogleCalendarUrl = () => {
        const params = new URLSearchParams({
            action: 'TEMPLATE',
            text: `${title} - ${description}`,
            details: description,
            location: location,
            dates: `${formattedStartTime.replace(/[-:]/g, '')}/${formattedEndTime.replace(/[-:]/g, '')}`
        });

        return `https://calendar.google.com/calendar/render?${params.toString()}`;
    };

    return (

        <Button
            onClick={() => window.open(generateGoogleCalendarUrl(), '_blank')}
            className={`w-full flex items-center gap-2 ${STYLES.primaryButton} bg-MVP-white text-lg`}
            aria-label='button to add event to calendar'
        >
            <img src={AddToCalendarIcon} className="w-6 h-6" alt="calendar icon to add to calendar" />
            Add to Calendar
        </Button>

    );
};

export default AddToCalendarButton;