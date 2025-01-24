import { useSelector } from 'react-redux';
import { startOfWeek, addDays, format } from 'date-fns';

const useCurrentWeekLogs = () => {
    const today = new Date();
    const currentWeekDates = Array.from({ length: 7 }, (_, i) =>
        addDays(startOfWeek(today, { weekStartsOn: 1 }), i)
    );

    const currentWeekLogs = useSelector((state) =>
        currentWeekDates.map((date) => {
            const formattedDate = format(date, 'yyyy-MM-dd'); // Format date as '2024-12-24'
            const logs = state.user?.activity?.[formattedDate]?.logs || []; // Get logs for the date
            const shortDayName = format(date, 'EEE'); // Get short day name, e.g., "Mon"
            return { date: formattedDate, shortDayName, logs };
        })
    );

    return currentWeekLogs;
};

export default useCurrentWeekLogs;
