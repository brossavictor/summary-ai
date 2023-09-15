import { server } from "./server.js"

const form = document.querySelector("#form")
const input = document.querySelector("#url")
const content = document.querySelector("#content")

form.addEventListener("submit", async (event) => {
	event.preventDefault()
	content.classList.add("placeholder")

	const videoURL = input.value

	if (!videoURL.includes("shorts")) {
		var error = "URL selected does not match a Short video."
		content.textContent = error
		throw Error(error)
	}

	const [_, params] = videoURL.split("/shorts/")
	const [videoID] = params.split("?")

	content.textContent = "Getting text from audio..."

	const transcription = await server.get("/summary/" + videoID)

	content.textContent = "Writing summary..."

	const summary = await server.post("/summary", {
		text: transcription.data.result,
	})

	content.textContent = summary.data.result
	content.classList.remove("placeholder")
})
