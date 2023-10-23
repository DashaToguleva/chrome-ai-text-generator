document.addEventListener('keydown', (event) => {
    console.log(event);
    if (event.code === "KeyA"
        && event.metaKey
        && event.shiftKey
        && event.altKey
    ) {
        runChatGpt();
    }
});


document.addEventListener('click', (clickData) => {
    runChatGpt();
});


const runChatGpt = () => {
    const activeElement = document.activeElement;
    const inputValue = window.getSelection().toString();
    if (inputValue.trim().startsWith('//ai ')) {
        const taskDescription = inputValue.replace('//ai ', '').trim();
        activeElement.value = "working...";
        sendRequestToBackgroundScript(taskDescription);
    }
};


sendRequestToBackgroundScript = (text) => {
    chrome.runtime.sendMessage(
        text,
        (response) => {
            const activeElement = document.activeElement;
            activeElement.value = response.response;
        });
};
