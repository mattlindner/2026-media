import { useMemo, useContext } from "react";
import { Media } from "../media";
import { ScreenContext } from "../util/screenContext";
import { getMediaLabels } from "../util/mediaLabels";
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
    const weekMediaScores = Object.groupBy(weekMedia, (m) => m.type);

    return {
      media: weekMedia,
      movieScore: weekMediaScores.film?.length ?? 0,
      musicScore: weekMediaScores.music?.length ?? 0,
    };
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
        {media.map((m) => {
          const { titleLabel, title, subtitleLabel, subtitle } =
            getMediaLabels(m);
          return (
            <>
              <hr />
              <img
                key={m.rym}
                src={`/2026-media/${m.image}`}
                alt={title}
                onClick={() => {
                  if (isMobile) {
                    window.open(m.rym, "_blank");
                  } else {
                    setSelectedMedia(m);
                  }
                }}
              />
              {isMobile && (
                <div className="info">
                  <div>
                    {titleLabel}: <span className="big">{title}</span>
                  </div>
                  <div>
                    {subtitleLabel}: <span className="big">{subtitle}</span>
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Week;
