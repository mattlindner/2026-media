interface BaseMedia {
	image: string
	rym: string
	date: string
}

export interface Music extends BaseMedia {
	type: "music"
	artist: string
	album: string
}

export interface Film extends BaseMedia {
	type: "film"
	title: string
	director: string
}

export type Media = Music | Film
export type MediaData = Media[]

const value: MediaData
export default value
