import { useEffect } from "react";
import { Media } from "../media";
import "./Popup.css";

type PopupProps = {
  media: Media | null;
  closeModal: () => void;
};

const Popup = ({ media, closeModal }: PopupProps) => {
  if (!media) return null;

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.target === document.getElementById("modal")) {
        closeModal();
      }
    };
    const onKeyDown = ({ key }: KeyboardEvent) => {
      if (key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("click", onClick);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("click", onClick);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [closeModal]);

  return (
    <div className="modal" id="modal">
      <div className="modal-content">
        <span className="modal-close" onClick={closeModal}>
          x
        </span>
        <h1>{media.date}</h1>
        <div>
          <div className="popup-album">
            <img
              src={media.image}
              alt={media.rym}
              onClick={() => window.open(media.rym, "_blank")}
            />
            {media.type === "music" ? (
              <div className="popup-info">
                <div>Artist:</div>
                <div>
                  <span className="big">{media.artist}</span>
                </div>
                <div>Album:</div>
                <div>
                  <span className="big">{media.album}</span>
                </div>
              </div>
            ) : (
              <div className="popup-info">
                <div>Film:</div>
                <div>
                  <span className="big">{media.title}</span>
                </div>
                <div>Director:</div>
                <div>
                  <span className="big">{media.director}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
