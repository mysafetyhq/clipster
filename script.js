// Initialize the state
const buttonGroup = document.getElementById('buttonGroup');
const saveButton = document.getElementById('saveButton');
const loadButton = document.getElementById('loadButton');

// Function to generate the buttons dynamically
function createButtons() {
    for (let i = 0; i < 12; i++) {
        const buttonItem = document.createElement('div');
        buttonItem.classList.add('button-item');
        
        // Create the button
        const button = document.createElement('button');
        button.textContent = `Button ${i + 1}`;
        button.addEventListener('click', () => copyToClipboard(i));
        
        // Create the input field
        const input = document.createElement('input');
        input.placeholder = 'Enter URL';
        input.id = `input-${i}`;
        
        buttonItem.appendChild(button);
        buttonItem.appendChild(input);
        
        buttonGroup.appendChild(buttonItem);
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

// Event listeners for save/load buttons
saveButton.addEventListener('click', saveState);
loadButton.addEventListener('click', loadState);

// Initialize the buttons when the page loads
createButtons();
