import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function callAgent(prompt = "Explain the importance of fast language models") {
    const messages = [{
        role: "system",
        content: `You are JOSH, a financial assistant to assist user with their day to day financial expenses. Current date in UTC is ${new Date().toUTCString()}.`,
    }]
    messages.push({
        role: "user",
        content: prompt,
    })

    while (true) {
        const completion = await groq.chat.completions.create({
            messages: messages,
            model: "openai/gpt-oss-20b",
            tools: [{
                type: 'function',
                function: {
                    name: 'getTotalExpenses',
                    description: 'Get total expenses in a given time period',
                    parameters: {
                        type: 'object',
                        properties: {
                            from: {
                                type: 'string',
                                description: 'From date to get total expenses'
                            },
                            to: {
                                type: 'string',
                                description: 'To date to get total expenses'
                            },
                        },
                    },
                }
            }

            ]
        });
        messages.push(completion.choices[0].message);
        const toolCalls = completion.choices[0].message.tool_calls;
        if (!toolCalls) {
            console.log(`Assistant: ${completion.choices[0].message.content}`)
            break;
        }

        for (const tool of toolCalls) {
            const functionName = tool.function.name;
            const functionArgs = tool.function.arguments;
            let result = ''
            if (functionName === 'getTotalExpenses') {
                result = getTotalExpenses(JSON.parse(functionArgs));

            }
            messages.push({
                role: "tool",
                tool_call_id: tool.id,
                content: typeof result === 'string' ? result : JSON.stringify(result),
            })
        }
    }



}

// Execute and log result when run directly
callAgent('My total expenses in last month');


function getTotalExpenses({ from, to }) {
    return '10000';
}

