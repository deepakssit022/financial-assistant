import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function callAgent(prompt = "Explain the importance of fast language models") {
    const completion = await groq.chat.completions.create({
        messages: [
            {
                role: "system",
                content: 'You are JOSH, a financial assistant to assist user with their day to day financial expenses.',
            },
            {
                role: "user",
                content: prompt,
            },
        ],
        model: "openai/gpt-oss-20b",
    });
    console.log(completion.choices[0].message.content);
}

// Execute and log result when run directly
callAgent();
