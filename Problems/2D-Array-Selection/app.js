// 2D array representing the grid data (1 = render clickable box, 0 = no box)
const data = [
    [1, 0, 1],
    [1, 1, 0],
    [0, 1, 1]
];

let selectedBoxes = []; // To track selected boxes
let interactionEnabled = true; // To toggle user interaction
let allSelected = false; // Flag to indicate all boxes are selected

// Get the grid container element
const gridContainer = document.getElementById('grid-container');

// Function to create the grid based on the data array
function createGrid(data) {
    data.forEach((row, rowIndex) => {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');

        row.forEach((value, colIndex) => {
            if (value === 1) {
                const box = document.createElement('div');
                box.classList.add('box');
                box.dataset.row = rowIndex;
                box.dataset.col = colIndex;

                // Add click event listener to each box
                box.addEventListener('click', () => handleBoxSelection(box, rowIndex, colIndex));

                rowDiv.appendChild(box);
            } else {
                // For 0 value, you can append an empty div for structure (optional)
                const emptyDiv = document.createElement('div');
                emptyDiv.classList.add('box');
                emptyDiv.style.visibility = 'hidden'; // Hide boxes with value 0
                rowDiv.appendChild(emptyDiv);
            }
        });

        gridContainer.appendChild(rowDiv);
    });
}

// Handle box selection
function handleBoxSelection(box, row, col) {
    if (!interactionEnabled || allSelected) return; // Disable if interaction is locked

    if (!box.classList.contains('selected')) {
        // Select the box
        box.classList.add('selected');
        selectedBoxes.push(box); // Track the box

        // If all boxes are selected, trigger auto-deselection
        const totalClickableBoxes = document.querySelectorAll('.box:not([style*="visibility: hidden"])').length;
        if (selectedBoxes.length === totalClickableBoxes) {
            allSelected = true;
            startDeselection();
        }
    }
}

// Automatically deselect boxes in order
function startDeselection() {
    interactionEnabled = false; // Disable interaction during deselection

    let index = 0;
    const deselectionInterval = setInterval(() => {
        if (index < selectedBoxes.length) {
            const box = selectedBoxes[index];
            box.classList.remove('selected'); // Deselect box
            index++;
        } else {
            // Once all boxes are deselected, clear the interval and reset
            clearInterval(deselectionInterval);
            selectedBoxes = []; // Reset selected boxes
            interactionEnabled = true; // Re-enable interaction
            allSelected = false; // Reset selection flag
        }
    }, 500); // Adjust timing as needed
}

// Initialize the grid
createGrid(data);
