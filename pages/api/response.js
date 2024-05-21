import axios from "axios";

axios.defaults.headers.common["Authorization"] = process.env.KRUTRIM_API_KEY;
axios.defaults.headers.common['Content-Type'] = "application/json";
export default async function handler(req, res) {

  const { prompt,developerOptions,seedValue } = req.body;

  try {
    const { data } = await axios.post("https://cloud.olakrutrim.com/v1/chat/completions", {
      model: developerOptions.model,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      frequency_penalty: developerOptions.frequency_penalty,
      max_tokens: developerOptions.max_tokens,
      n: 1,
      presence_penalty: developerOptions.presence_penalty,
      seed:parseInt(seedValue) ?? 0,
      response_format: { type: "text" },
      temperature: developerOptions.temperature,
      top_p: developerOptions.top_p,
      stop:"</assistant>"
    });
    res.json(data.choices[0]);

  } catch (err) {
    res.send(err)
    console.log(err);
  }
}
