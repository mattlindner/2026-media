import { useMemo, useContext } from "react";
import { Media } from "../media";
import { ScreenContext } from "../util/screenContext";
import "./Week.css";

type WeekProps = {
  week: Date[];
  groupedMedia: Partial<Record<string, Media[]>>;
  setSelectedMedia: (media: Media) => void;
};

const mdFormatter = new Intl.DateTimeFormat("en-US", {
  month: "numeric",
  day: "numeric",
});

const Week = ({ week, groupedMedia, setSelectedMedia }: WeekProps) => {
  const isMobile = useContext(ScreenContext);
  const { media, movieScore, musicScore } = useMemo(() => {
    const weekMedia = week.flatMap(
      (day) => groupedMedia[day.toISOString().split("T")[0]] || [],
    );
    const movieScore = weekMedia.filter((m) => m.type === "film").length;
    const musicScore = weekMedia.filter((m) => m.type === "music").length;

    return { media: weekMedia, movieScore, musicScore };
  }, [week, groupedMedia]);

  return (
    <div className="week">
      <div className="date-range">
        {`${mdFormatter.format(week[0])} – ${mdFormatter.format(week[week.length - 1])}`}
      </div>
      <div className="compliance">
        <div>🎵 : {musicScore} / 3</div>
        <div>🎥 : {movieScore} / 1</div>
      </div>
      <div className="media">
        {media.map((m) => (
          <>
            <hr />
            <img
              key={m.rym}
              src={`/2026-media/${m.image}`}
              alt={m.type === "film" ? m.title : m.artist}
              onClick={() => {
                if (isMobile) {
                  window.open(m.rym, "_blank");
                } else {
                  setSelectedMedia(m);
                }
              }}
            />
            {isMobile &&
              (m.type === "music" ? (
                <div className="info">
                  <div>
                    Album: <span className="big">{m.album}</span>
                  </div>
                  <div>
                    Artist: <span className="big">{m.artist}</span>
                  </div>
                </div>
              ) : (
                <div className="info">
                  <div>
                    Film: <span className="big">{m.title}</span>
                  </div>
                  <div>
                    Director: <span className="big">{m.director}</span>
                  </div>
                </div>
              ))}
          </>
        ))}
      </div>
    </div>
  );
};

export default Week;
