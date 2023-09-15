import { pipeline } from "@xenova/transformers"

export async function summarize(text) {
	try {
		//return summaryExample
		console.log("Summing up...")

		const generator = await pipeline(
			"summarization",
			"Xenova/distilbart-cnn-12-6"
		)

		const output = await generator(text)
		console.log("The text has been summarized successfully.")
		return output[0].summary_text
	} catch (error) {
		console.log("An error has occurred during summarization.", error)
		throw new Error(error)
	}
}
