import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "@node_modules/axios";
const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export default async function handle(req, res) {
    if (req.method == "GET") {
        try {
            await axios.get(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`).then(({ data }) => {
                res.json(data);
            })
            return;
        } catch (error) {
            res.send(error);
        }
    } else {
        const { prompt, developerOptions, history } = req.body;

        const generationConfig = {
            stopSequences: ["red"],
            maxOutputTokens: developerOptions.max_tokens,
            temperature: developerOptions.temperature,
            topP: developerOptions.topP,
            topK: developerOptions.topK
        };

        try {
            const model = genAi.getGenerativeModel({ model: developerOptions.model, generationConfig })
            const chat = model.startChat({ history: history });
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
}