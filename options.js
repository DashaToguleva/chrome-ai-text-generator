// Saves options to chrome.storage
const saveOptions = () => {
    const apiKey = document.getElementById('chatGptApiKey').value;

    chrome.storage.sync.set(
        { apiKey: apiKey },
        () => {
            // Update status to let user know options were saved.
            const status = document.getElementById('status');
            status.textContent = 'Options saved.';
            setTimeout(() => {
                status.textContent = '';
            }, 750);
        }
    );
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
    chrome.storage.sync.get(
        { apiKey: "apiKey" },
        (items) => {
            document.getElementById('chatGptApiKey').value = items.apiKey;
        }
    );
};

document.getElementById('save').addEventListener('click', saveOptions);
document.addEventListener('DOMContentLoaded', restoreOptions);
