// Initialize the state
const buttonGroup = document.getElementById('buttonGroup');
const saveButton = document.getElementById('saveButton');
const loadButton = document.getElementById('loadButton');
const saveFileButton = document.getElementById('saveFileButton');
const loadFileInput = document.getElementById('loadFileInput');

// Function to generate the buttons dynamically
function createButtons() {
    for (let i = 0; i < 12; i++) {
        const buttonItem = document.createElement('div');
        buttonItem.classList.add('button-item');
        
        // Create the "Go to link" button
        const goButton = document.createElement('button');
        goButton.textContent = 'Go to Link';
        goButton.addEventListener('click', () => goToLink(i));
        
        // Create the "Copy Link" button
        const copyButton = document.createElement('button');
        copyButton.textContent = 'Copy Link';
        copyButton.addEventListener('click', () => copyToClipboard(i));
        
        // Create the input field
        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Enter URL';
        input.id = `input-${i}`;
        
        buttonItem.appendChild(goButton);
        buttonItem.appendChild(copyButton);
        buttonItem.appendChild(input);
        
        buttonGroup.appendChild(buttonItem);
    }
}

// Go to the link in a new window
function goToLink(index) {
    const inputField = document.getElementById(`input-${index}`);
    const url = inputField.value;

    if (url) {
        window.open(url, '_blank');
    } else {
        alert('No URL to go to!');
    }
}

// Copy URL to clipboard
function copyToClipboard(index) {
    const inputField = document.getElementById(`input-${index}`);
    const url = inputField.value;

    if (url) {
        navigator.clipboard.writeText(url).then(() => {
            alert(`URL copied: ${url}`);
        });
    } else {
        alert('No URL to copy!');
    }
}

// Save the state to localStorage
function saveState() {
    const state = [];
    for (let i = 0; i < 12; i++) {
        const input = document.getElementById(`input-${i}`);
        state.push(input.value);
    }
    localStorage.setItem('buttonState', JSON.stringify(state));
    alert('State saved!');
}

// Load the state from localStorage
function loadState() {
    const savedState = JSON.parse(localStorage.getItem('buttonState'));
    if (savedState) {
        savedState.forEach((url, index) => {
            const input = document.getElementById(`input-${index}`);
            input.value = url;
        });
        alert('State loaded!');
    } else {
        alert('No saved state found.');
    }
}

// Save the state as a file
function saveStateAsFile() {
    const state = [];
    for (let i = 0; i < 12; i++) {
        const input = document.getElementById(`input-${i}`);
        state.push(input.value);
    }

    const blob = new Blob([JSON.stringify(state)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'buttonState.json';
    a.click();

    URL.revokeObjectURL(url);
}

// Load state from a file
function loadStateFromFile(event) {
    const file = event.target.files[0];
    if (!file) {
        alert('No file selected!');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        const state = JSON.parse(e.target.result);
        if (state && state.length === 12) {
            state.forEach((url, index) => {
                const input = document.getElementById(`input-${index}`);
                input.value = url;
            });
            alert('State loaded from file!');
        } else {
            alert('Invalid file format.');
        }
    };
    reader.readAsText(file);
}

// Event listeners for save/load buttons
saveButton.addEventListener('click', saveState);
loadButton.addEventListener('click', loadState);
saveFileButton.addEventListener('click', saveStateAsFile);
loadFileInput.addEventListener('change', loadStateFromFile);

// Initialize the buttons when the page loads
createButtons();
