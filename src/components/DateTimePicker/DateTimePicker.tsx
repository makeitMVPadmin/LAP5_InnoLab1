import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { Controller } from 'react-hook-form';
import { STYLES } from '../../constants/styles';
import { Calendar } from '../../components/ui/calendar';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Popover, PopoverContent, PopoverTrigger, } from '../../components/ui/popover';
import ArrowUp from "../../assets/images/ArrowUp.svg"
import ArrowDown from "../../assets/images/ArrowDown.svg"
import CalendarIcon from "../../assets/images/calendarIcon2.svg"
import Clock from "../../assets/images/clock-type2.svg"

const TimeSpinner = ({ value, onChange, min, max, disabled }) => (
    <div className="flex flex-col items-center font-bold">
        <Button
            variant="ghost"
            size="sm"
            className="h-11 w-11"
            onClick={() => {
                const newValue = value === max ? min : value + 1;
                onChange(newValue);
            }}
            disabled={disabled}
        >
            <img src={ArrowUp} className="h-4 w-4" alt="up arrow" />
        </Button>
        <Input
            className="w-12 text-center border border-black rounded-sm"
            value={value.toString().padStart(2, '0')}
            readOnly
            disabled={disabled}
        />
        <Button
            variant="ghost"
            size="sm"
            className="h-11 w-11"
            onClick={() => {
                const newValue = value === min ? max : value - 1;
                onChange(newValue);
            }}
            disabled={disabled}
        >
            <img src={ArrowDown} className="h-4 w-4" alt="down arrow" />
        </Button>
    </div>
);

const DateTimePicker = ({ control,
    errorDate,
    disabled = false,
    dateFieldName,
    timeFieldName,
    label = "Select Date",
    minDate,
    maxDate }) => {
    const [isOpen, setIsOpen] = useState(false);

    const AMPMToggle = ({ period, onChange, disabled }) => (
        <div className="flex rounded-md overflow-hidden w-full">
            <div
                className={`px-4 w-1/2 cursor-pointer text-sm rounded-l-lg border-black transition-colors ${period === 'AM'
                    ? 'bg-MVP-light-blue text-white font-bold border-2'
                    : 'bg-white text-black font-bold hover:bg-gray-50 border border-l-2'
                    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => !disabled && onChange('AM')}
            >
                AM
            </div>
            <div
                className={`px-4  w-1/2 cursor-pointer rounded-r-lg text-sm border border-black transition-colors ${period === 'PM'
                    ? 'bg-MVP-light-blue text-white font-bold border-2'
                    : 'bg-white text-MVP-black font-bold hover:bg-gray-50 border border-r-2'
                    } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => !disabled && onChange('PM')}
            >
                PM
            </div>
        </div>
    );

    // Helper function to convert 24h to 12h format
    const convertTo12Hour = (time24) => {
        if (!time24) return { hours: 12, minutes: 0, period: 'AM' };

        const [hours24, minutes] = time24.split(':').map(Number);
        const period = hours24 >= 12 ? 'PM' : 'AM';
        const hours12 = hours24 % 12 || 12;

        return { hours: hours12, minutes, period };
    };

    // Helper function to convert back to 24h format
    const convertTo24Hour = (hours12, minutes, period) => {
        let hours24 = hours12;
        if (period === 'PM' && hours12 !== 12) {
            hours24 += 12;
        } else if (period === 'AM' && hours12 === 12) {
            hours24 = 0;
        }
        return `${hours24.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };

    const calendarClassName = {
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-md font-bold",
        nav: "space-x-1 flex items-center",
        nav_button: "h-7 w-7 bg-transparent p-0 text-black font-bold hover:bg-gray-100 hover:opacity-100",
        nav_button_previous: "text-black absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-[#808080] rounded-md w-8 font-bold text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-blue-50",
        day: "h-8 w-8 p-0 font-bold aria-selected:opacity-100",
        day_range_end: "day-range-end",
        day_selected: "bg-blue-500 text-white hover:bg-MVP-blue hover:text-white focus:bg-blue-500 focus:text-white rounded-full",
        day_today: "bg-gray-100",
        day_outside: "opacity-50",
        day_disabled: "opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <Controller
                name={dateFieldName}
                control={control}
                rules={{ required: `${dateFieldName} is required` }}
                render={({ field: dateField }) => (
                    <Controller
                        name={timeFieldName}
                        control={control}
                        rules={{ required: `${timeFieldName} is required` }}
                        render={({ field: timeField }) => {
                            const { hours, minutes, period } = convertTo12Hour(timeField.value);

                            const handleTimeChange = (newHours, newMinutes, newPeriod) => {
                                const time24 = convertTo24Hour(newHours, newMinutes, newPeriod);
                                timeField.onChange(time24);
                            };

                            // Function to format the display date without timezone conversion
                            const formatDisplayDate = (dateString) => {
                                if (!dateString) return null;
                                // Parse the date string and format it directly without timezone conversion
                                return format(parseISO(dateString), "MMM d, yyyy");
                            };

                            return (
                                <Popover open={isOpen} onOpenChange={setIsOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={`justify-start text-left min-w-[260px] ${STYLES.styledBorder} max-w-[280px] ${errorDate ? "border-MVP-red" : ""}`}
                                            disabled={disabled}
                                        >
                                            {dateField.value ? (
                                                <div className="flex items-center">
                                                    <span className="border-r border-black flex pr-4 items-center">
                                                        <img src={CalendarIcon} className="mr-2 h-4 w-4" alt="calendar icon" />
                                                        {formatDisplayDate(dateField.value)}
                                                    </span>
                                                    <span className="flex pl-4 items-center">
                                                        <img src={Clock} className="mr-2 h-4 w-4" alt="clock icon" />
                                                        {`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`}
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="flex items-center">
                                                    <span className="border-r border-black flex pr-4 items-center">
                                                        <img src={CalendarIcon} className="mr-2 h-4 w-4" alt="calendar icon" />
                                                        <span className="text-[#6E6E77]">{label}</span>
                                                    </span>
                                                    <span className="flex pl-4 items-center text-[#6E6E77]">
                                                        <img src={Clock} className="mr-2 h-4 w-4" alt="clock icon" />
                                                        {`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`}
                                                    </span>
                                                </div>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-4 font-gilroy border-3 border-black rounded-[10px]">
                                        <div className="space-y-4 flex flex-col">
                                            <div className="flex">
                                                <Calendar
                                                    mode="single"
                                                    classNames={calendarClassName}
                                                    selected={dateField.value ? parseISO(dateField.value) : undefined}
                                                    onSelect={(date) => {
                                                        if (date) {
                                                            // Format the date as YYYY-MM-DD without timezone conversion
                                                            const formattedDate = format(date, 'yyyy-MM-dd');
                                                            dateField.onChange(formattedDate);
                                                        }
                                                    }}
                                                    initialFocus
                                                    disabled={disabled}
                                                    fromDate={minDate}
                                                    toDate={maxDate}
                                                />
                                                <div className="border-l-2 rounded-md p-2 items-center flex flex-col h-64 my-auto pt-10 px-4">
                                                    <div className="flex items-center justify-center space-x-2">
                                                        <TimeSpinner
                                                            value={hours}
                                                            onChange={(newHours) => handleTimeChange(newHours, minutes, period)}
                                                            min={1}
                                                            max={12}
                                                            disabled={disabled}
                                                        />
                                                        <span className="text-2xl font-bold">:</span>
                                                        <TimeSpinner
                                                            value={minutes}
                                                            onChange={(newMinutes) => handleTimeChange(hours, newMinutes, period)}
                                                            min={0}
                                                            max={59}
                                                            disabled={disabled}
                                                        />
                                                    </div>
                                                    <AMPMToggle
                                                        period={period}
                                                        onChange={(newPeriod) => handleTimeChange(hours, minutes, newPeriod)}
                                                        disabled={disabled}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex justify-end">
                                                <Button
                                                    className="bg-white font-bold text-MVP-black text-2xl px-6 py-6"
                                                    variant="default"
                                                    onClick={handleClose}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    className="bg-MVP-light-blue font-bold text-MVP-black text-2xl px-6 py-6"
                                                    variant="default"
                                                    onClick={handleClose}
                                                >
                                                    OK
                                                </Button>
                                            </div>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            );
                        }}
                    />
                )}
            />
        </div>
    );
};

export default DateTimePicker;