
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  const { prompt } = req.body;
  const apiKey = process.env.STABILITY_API_KEY;

  const response = await fetch("https://api.stability.ai/v1/generation/stable-diffusion-v1-6/text-to-image", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text_prompts: [{ text: prompt }],
      cfg_scale: 8,
      height: 512,
      width: 512,
      samples: 1,
      steps: 30,
    }),
  });

  const result = await response.json();
  const imageBase64 = result.artifacts[0]?.base64;

  if (imageBase64) {
    const imageUrl = `data:image/png;base64,${imageBase64}`;
    return res.status(200).json({ imageUrl });
  } else {
    return res.status(500).json({ error: "Image generation failed." });
  }
}
