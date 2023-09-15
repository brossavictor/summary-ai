import ytdl from "ytdl-core"
import fs from "fs"

export const download = (videoId) =>
	new Promise((resolve, reject) => {
		const videoURL = "https://www.youtube.com/shorts/" + videoId
		console.log("Dowloading video:", videoId)

		ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
			.on("info", (info) => {
				const seconds = info.formats[0].aproxDurationsMs / 1000

				if (seconds > 60) {
					throw new Error(
						"Video duration exceeds 60s. Only YouTube Shorts allowed."
					)
				}
			})
			.on("end", () => {
				console.log("Download completed.")
				resolve()
			})
			.on("error", (error) => {
				consolelog("It was not possible to donwload the video.", error)
				reject()
			})
			.pipe(fs.createWriteStream("./tmp/audio.mp4"))
	})
