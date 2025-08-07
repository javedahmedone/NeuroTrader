import React, { useState } from "react";

const StreamingPromptComponent = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStream = async () => {
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("http://127.0.0.1:5000/promtAnalyzer/processPrompt?prompt=analyze my portfolio and give me some suggestino", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "brokername": "angelone", // 👈 required header (same as your FastAPI check)
          "apiKey" : "OYhhA9dh",
          "clientcode" :"J60590047",
          "refresh" :"eyJhbGciOiJIUzUxMiJ9.eyJ0b2tlbiI6IlJFRlJFU0gtVE9LRU4iLCJSRUZSRVNILVRPS0VOIjoiZXlKaGJHY2lPaUpTVXpJMU5pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SjFjMlZ5WDNSNWNHVWlPaUpqYkdsbGJuUWlMQ0owYjJ0bGJsOTBlWEJsSWpvaWRISmhaR1ZmY21WbWNtVnphRjkwYjJ0bGJpSXNJbWR0WDJsa0lqb3dMQ0p6YjNWeVkyVWlPaUl6SWl3aVpHVjJhV05sWDJsa0lqb2lNemMwTjJVME5XWXRaR1l6TlMwek5qVTBMV0UyTXpndE9UVmtZemMzT1RFNFlUY3lJaXdpYTJsa0lqb2lkSEpoWkdWZmEyVjVYM1l5SWl3aWIyMXVaVzFoYm1GblpYSnBaQ0k2TUN3aWFYTnpJam9pYkc5bmFXNWZjMlZ5ZG1salpTSXNJbk4xWWlJNklrbzJNRFU1TURBME55SXNJbVY0Y0NJNk1UYzFORFE0TVRZME5pd2libUptSWpveE56VTBNemsxTURZMkxDSnBZWFFpT2pFM05UUXpPVFV3TmpZc0ltcDBhU0k2SWpNMU9EZzNNakpsTFdRM01tWXROREE0TUMxaVpEVTRMV0ptWVRFMk9EYzJNRFk1TlNJc0lsUnZhMlZ1SWpvaUluMC5DUjhWOVlPT0pwY0dpLUd2WmU4cWVqaFdjUVJwejZZRVZPcVBhN0JrVTBUOVBtYmhTdVRCQllfb0FGZU0zdnZwblVEZ21aMDVteWxuVWw2MHJSOE1jejBKQ09iUkx1LW84UzNpaUM2MmZYaDFBb2dCaDdQSFZBZDBDeUVuS2N3UXpJcDFuSXJ3aC0tNFVoY3UzWUxOdTdYRnozWGIxVW4tWWVjdmt2NzZHbk0iLCJpYXQiOjE3NTQzOTUyNDZ9.KTnRSDH-6NSPK8uleyLaokSJ8vWGSaxkeOcUBX7dfXmvYMJ82IL2nhkccRYyDTBYRVvy36YLkVRQ4xY87AQ9Rg",
          "authorization":"Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VybmFtZSI6Iko2MDU5MDA0NyIsInJvbGVzIjowLCJ1c2VydHlwZSI6IlVTRVIiLCJ0b2tlbiI6ImV5SmhiR2NpT2lKU1V6STFOaUlzSW5SNWNDSTZJa3BYVkNKOS5leUoxYzJWeVgzUjVjR1VpT2lKamJHbGxiblFpTENKMGIydGxibDkwZVhCbElqb2lkSEpoWkdWZllXTmpaWE56WDNSdmEyVnVJaXdpWjIxZmFXUWlPamdzSW5OdmRYSmpaU0k2SWpNaUxDSmtaWFpwWTJWZmFXUWlPaUl6TnpRM1pUUTFaaTFrWmpNMUxUTTJOVFF0WVRZek9DMDVOV1JqTnpjNU1UaGhOeklpTENKcmFXUWlPaUowY21Ga1pWOXJaWGxmZGpJaUxDSnZiVzVsYldGdVlXZGxjbWxrSWpvNExDSndjbTlrZFdOMGN5STZleUprWlcxaGRDSTZleUp6ZEdGMGRYTWlPaUpoWTNScGRtVWlmU3dpYldZaU9uc2ljM1JoZEhWeklqb2lZV04wYVhabEluMTlMQ0pwYzNNaU9pSjBjbUZrWlY5c2IyZHBibDl6WlhKMmFXTmxJaXdpYzNWaUlqb2lTall3TlRrd01EUTNJaXdpWlhod0lqb3hOelUwTkRneE5qUTJMQ0p1WW1ZaU9qRTNOVFF6T1RVd05qWXNJbWxoZENJNk1UYzFORE01TlRBMk5pd2lhblJwSWpvaVkyUTRZamhsWmprdE0yVXhaQzAwTm1SakxUZzFOakl0WmpZd05qUm1OMkUzTlRrMUlpd2lWRzlyWlc0aU9pSWlmUS5nUmI0UTRwRm4wclRvQWpZVHVxN3dLeUdUN1dIREFfV0wxWEgzNGt1alRJV1Y4bm1xaVBOTVo5aEppNmhMZk5kd0xVUFZYaEY5TVpnUERNQUtsdXA5WWFJZFRaZjJTRXRnbm11M2tUU0hxd29QQjgzNERLZDB3YkNyRzhBemw5OE8wbEc4UVJfSlU0d1RPaXJHbWR4TTU5ZnZNZ2ZLNkgzN2dDTWxEN05vTEUiLCJBUEktS0VZIjoiT1loaEE5ZGgiLCJpYXQiOjE3NTQzOTUyNDYsImV4cCI6MTc1NDQ4MTY0Nn0.QJDZAUCC6vLlnRvyHac8rKEw5POc6OA9vqF881YITWBNUGcedvjhLG0ZdybPUlu4PBqxVxemXA5xu_QYp9q7fQ"

        }
      });
      console.log(res);
      if (!res.ok || !res.body) {
        throw new Error("Failed to stream from server.");
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        setResponse((prev) => prev + chunk);
      }
    } catch (error) {
      setResponse("❌ Error: " + error.message);
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2>💬 Ask About Your Stocks</h2>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
        placeholder="Write your prompt here..."
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <button onClick={handleStream} disabled={loading}>
        {loading ? "Thinking..." : "Ask Gemini"}
      </button>
      <div style={{ whiteSpace: "pre-wrap", marginTop: "20px", padding: "10px", backgroundColor: "#f0f0f0" }}>
        <strong>AI Response:</strong>
        <br />
        {response}
      </div>
    </div>
  );
};

export default StreamingPromptComponent;
