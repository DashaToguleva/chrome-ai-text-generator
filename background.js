let OPENAI_API_KEY = "";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        // Use the ChatGPT API to generate a response based on the text received.
        generateResponseFromGPT(request).then(gptResponse => sendResponse({response: gptResponse}));
    return true;
});


chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        "title": "Run in ChatGPT",
        "contexts": ["selection"],
        "id": "ChatGPTExt0.1"
    });
    chrome.storage.sync.get(
        { apiKey: "apiKey" },
        (items) => {
            OPENAI_API_KEY = items.apiKey;
        }
    );
});


const generateResponseFromGPT = async (text) => {
    const options = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${OPENAI_API_KEY}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{"role": "user", "content": text}],
        }),
    };

    const chatGPTResults = await fetch(
        "https://api.openai.com/v1/chat/completions",
        options
    );
    let result = await chatGPTResults.json();
    result = await result.choices[0].message.content;

    console.log("ChatGPT says:", result);
    return result;
};


