import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const models = await groq.models.list();
      return res.status(200).json(models?.data?.map((e) => {
        return {
          name: e?.id,
          displayName: `${e?.owned_by} (${e?.id})`
        }
      }));
    } catch (err) {
      console.error("Error fetching models:", err);
      return res.status(500).json({ error: "Failed to fetch models" });
    }
  }

  if (req.method === "POST") {
    const { prompt, developerOptions, seedValue, history } = req.body;

    const formattedHistory = history?.map((e) => {
      if (e?.parts) {
        return {
          role: e.role === "model" ? "assistant" : e.role,
          content: e.parts[0].text
        }
      } else {
        return {
          role: e.role === "model" ? "assistant" : e.role,
          content: e.content
        };
      }
    }) || [];

    try {
      const chatCompletion = await groq.chat.completions.create({
        model: developerOptions.model || "llama-3.3-70b-versatile",
        messages: [
          ...formattedHistory,
          {
            role: "user",
            content: prompt
          }
        ],
        frequency_penalty: developerOptions.frequency_penalty,
        max_tokens: developerOptions.max_tokens,
        presence_penalty: developerOptions.presence_penalty,
        seed: parseInt(seedValue) ?? 0,
        temperature: developerOptions.temperature,
        top_p: developerOptions.top_p,
        stop: "</assistant>"
      });

      const formattedResponse = {
        role: "model",
        parts: [
          {
            text: chatCompletion.choices[0].message.content
          }
        ]
      };

      return res.status(200).json(formattedResponse);
    } catch (err) {
      console.error("Error in chat completion:", err);
      return res.status(500).json({ error: "Failed to generate response" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
