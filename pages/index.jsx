
import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setImageUrl('');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setImageUrl(data.imageUrl);
    } catch (err) {
      console.error('Error generating image:', err);
    }

    setLoading(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100 font-sans">
      <h1 className="text-3xl font-bold mb-4 text-blue-700">iSense AI Image Generator</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded shadow-md">
        <input
          className="w-full p-3 mb-4 border border-gray-300 rounded"
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a topic like 'Gas Leak Detection'"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          Generate Image
        </button>
      </form>

      {loading && <p className="mt-6 text-gray-600">Generating image...</p>}
      {imageUrl && (
        <div className="mt-6">
          <img src={imageUrl} alt="Generated AI Image" className="rounded shadow-md max-w-full" />
        </div>
      )}
    </main>
  );
}
