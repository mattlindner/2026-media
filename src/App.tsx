import { useEffect, useMemo, useState } from "react";
import "./App.css";
import media, { Media } from "./media";
import Week from "./Week/Week";
import Popup from "./Popup/Popup";

function getWeeksInYear(year: number): Date[][] {
  const today = new Date();
  const weeks: Date[][] = [];
  const yearStart = new Date(year, 0, 1);

  // Saturday of the current week
  const currentWeekEnd = new Date(today);
  currentWeekEnd.setDate(today.getDate() + (6 - today.getDay()));

  // Don't go past Dec 31 of the given year
  const yearEnd =
    year === today.getFullYear() ? currentWeekEnd : new Date(year, 11, 31);

  // Find the Sunday on or before Jan 1
  const calendarStart = new Date(yearStart);
  calendarStart.setDate(calendarStart.getDate() - calendarStart.getDay());

  const current = new Date(calendarStart);

  while (current <= yearEnd) {
    const week: Date[] = [];

    for (let i = 0; i < 7; i++) {
      const day = new Date(current);
      day.setDate(current.getDate() + i);

      // Clip only to the year (NOT today)
      if (day >= yearStart && day <= yearEnd) {
        week.push(day);
      }
    }

    if (week.length > 0) {
      weeks.push(week);
    }
    2;
    // Next Sunday
    current.setDate(current.getDate() + 7);
  }

  return weeks;
}

const App = () => {
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

  const weeks = useMemo(() => {
    const today = new Date();

    return getWeeksInYear(today.getFullYear());
  }, []);

  const groupedMedia = useMemo(() => {
    const map: Record<string, typeof media> = {};
    media.forEach((item) => {
      if (!map[item.date]) {
        map[item.date] = [];
      }
      map[item.date].push(item);
    });
    return map;
  }, []);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);

  return (
    <div>
      {weeks.map((week) => (
        <Week
          week={week}
          groupedMedia={groupedMedia}
          setSelectedMedia={setSelectedMedia}
        />
      ))}
      <Popup media={selectedMedia} closeModal={() => setSelectedMedia(null)} />
    </div>
  );
};

export default App;
