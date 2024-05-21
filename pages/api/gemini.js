import { GoogleGenerativeAI } from "@google/generative-ai";
const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export default async function handle(req, res) {

    const { prompt, developerOptions,history } = req.body;

    const generationConfig = {
        stopSequences: ["red"],
        maxOutputTokens: developerOptions.max_tokens,
        temperature: developerOptions.temperature,
        topP: developerOptions.topP,
        topK: developerOptions.topK
    };

    try {
        const model = genAi.getGenerativeModel({ model: developerOptions.model, generationConfig })
        const chat = model.startChat({history:history});
        const result = await chat.sendMessage([prompt]);
        // for await (const chunk of result.stream) {
        //     const chunkText = chunk.text();
        //     console.clear();
        //     console.log(chunkText)
        //     res.write(chunkText)
        // }

        // res.end();
        res.json(result.response.candidates[0].content)

    } catch (error) {
        res.send(error);
        console.log(error)
    }

}