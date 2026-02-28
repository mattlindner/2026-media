import { useEffect } from "react";
import { Media } from "../media";
import { getMediaLabels } from "../util/mediaLabels";
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

  const { titleLabel, title, subtitleLabel, subtitle } = getMediaLabels(media);

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
            <div className="popup-info">
              <div>{titleLabel}:</div>
              <div>
                <span className="big">{title}</span>
              </div>
              <div>{subtitleLabel}:</div>
              <div>
                <span className="big">{subtitle}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
