import { useEffect } from "react"
import type { Media } from "../media"
import { getMediaLabels } from "../util/mediaLabels"
import "./Popup.css"

type PopupProps = {
	media: Media | null
	closeModal: () => void
}

const Popup = ({ media, closeModal }: PopupProps) => {
	useEffect(() => {
		if (!media) return

		const onClick = (event: MouseEvent) => {
			if (event.target === document.getElementById("modal")) {
				closeModal()
			}
		}
		const onKeyDown = ({ key }: KeyboardEvent) => {
			if (key === "Escape") {
				closeModal()
			}
		}

		window.addEventListener("click", onClick)
		window.addEventListener("keydown", onKeyDown)

		return () => {
			window.removeEventListener("click", onClick)
			window.removeEventListener("keydown", onKeyDown)
		}
	}, [media, closeModal])

	if (!media) return null

	const { titleLabel, title, subtitleLabel, subtitle } = getMediaLabels(media)

	return (
		<div className="modal" id="modal">
			<div className="modal-content">
				<button type="button" className="modal-close" onClick={closeModal}>
					x
				</button>
				<h1>{media.date}</h1>
				<div>
					<div className="popup-album">
						<a href={media.rym} target="_blank" rel="noreferrer">
							<img src={media.image} alt={media.rym} />
						</a>
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
	)
}

export default Popup
