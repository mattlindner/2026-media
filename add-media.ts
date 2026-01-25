import { input } from "@inquirer/prompts"
import fs from "fs/promises"
import sharp from "sharp"
import agent from "superagent"
import media, { Film, Music } from "./src/media"
import deburr from "lodash.deburr"

/* ============================
   Constants
============================ */

const IMAGE_SIZE = 500
const IMAGE_QUALITY = 80
const PUBLIC_DIR = "./public"
const MEDIA_PATH = "./src/media/index.json"
const urlRegex = /^(https?):\/\/[^\s/$.?#].[^\s]*$/i

/* ============================
   String Helpers
============================ */

function toKebabCase(str: string): string {
	return deburr(str)
		.toLowerCase()
		.trim()
		.replace(/[:/.]/g, "")
		.replace(/\s+/g, "-")
}

const toTitleCase = (s: string) =>
	s
		.replace(/[-_]/g, " ")
		.split(" ")
		.map(w => w[0]?.toUpperCase() + w.slice(1).toLowerCase())
		.join(" ")

const getUrlParts = (url: string) =>
	new URL(url).pathname.split("/").filter(Boolean)

/* ============================
   Image Helper
============================ */

async function promptAndSaveImage(
	filename: string,
	resize: { width?: number; height: number }
) {
	const imageUrl = await input({
		message: "Enter an image url:",
		validate: v => urlRegex.test(v),
		required: true,
	})

	const buffer = await agent
		.get(imageUrl)
		.buffer(true)
		.parse(agent.parse.image)
		.then(r => r.body)

	await sharp(buffer)
		.resize(resize.width, resize.height)
		.jpeg({ quality: IMAGE_QUALITY })
		.toFile(`${PUBLIC_DIR}/${filename}`)
}

/* ============================
   Entry Creators
============================ */

async function createFilmEntry(
	rym: string,
	urlParts: string[],
	date: string
): Promise<Film> {
	const filmTitle = await input({
		message: "Enter the film title:",
		default: toTitleCase(urlParts.at(-1)!),
		required: true,
	})

	const filename = `film-${toKebabCase(filmTitle)}.jpg`

	await promptAndSaveImage(filename, { height: IMAGE_SIZE })

	return {
		date,
		type: "film",
		rym,
		title: filmTitle,
		image: filename,
	}
}

async function createMusicEntry(
	rym: string,
	urlParts: string[],
	date: string
): Promise<Music> {
	const artist = await input({
		message: "Enter the artist:",
		default: toTitleCase(urlParts.at(-2)!),
		required: true,
	})

	const album = await input({
		message: "Enter the album:",
		default: toTitleCase(urlParts.at(-1)!),
		required: true,
	})

	const filename = `music-${toKebabCase(album)}_${toKebabCase(artist)}.jpg`

	await promptAndSaveImage(filename, {
		width: IMAGE_SIZE,
		height: IMAGE_SIZE,
	})

	return {
		date,
		type: "music",
		rym,
		artist,
		album,
		image: filename,
	}
}

/* ============================
   Main
============================ */

const rym = await input({
	message: "Enter the RYM url:",
	validate: v => urlRegex.test(v),
	required: true,
})

const isFilm = rym.includes("rateyourmusic.com/film/")
const urlParts = getUrlParts(rym)
const date = new Intl.DateTimeFormat("en-CA", {
	timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
	year: "numeric",
	month: "2-digit",
	day: "2-digit",
}).format(new Date())

const newEntry = isFilm
	? await createFilmEntry(rym, urlParts, date)
	: await createMusicEntry(rym, urlParts, date)

await fs.writeFile(
	MEDIA_PATH,
	JSON.stringify([...media, newEntry], null, 4)
)
