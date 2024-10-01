// Retrieve existing persons from localStorage or create an empty array
let persons = JSON.parse(localStorage.getItem('persons')) || [];

// Function to render the table of persons
function renderPersons() {
    const tableBody = document.getElementById('personTableBody');
    tableBody.innerHTML = ''; // Clear existing table content

    persons.forEach((person, index) => {
        const row = document.createElement('tr');

        // Image column
        const imageCell = document.createElement('td');
        const img = document.createElement('img');
        img.src = person.image || 'https://via.placeholder.com/50'; // Placeholder image if no URL
        imageCell.appendChild(img);
        row.appendChild(imageCell);

        // Name column
        const nameCell = document.createElement('td');
        nameCell.textContent = person.name;
        row.appendChild(nameCell);

        // Job title column
        const jobCell = document.createElement('td');
        jobCell.textContent = person.jobTitle;
        row.appendChild(jobCell);

        // Actions column
        const actionsCell = document.createElement('td');

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editPerson(index);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deletePerson(index);

        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);

        row.appendChild(actionsCell);
        tableBody.appendChild(row);
    });

    // Save the updated list in localStorage
    localStorage.setItem('persons', JSON.stringify(persons));
}

// Function to add a new person
function addPerson() {
    const nameInput = document.getElementById('nameInput');
    const jobTitleInput = document.getElementById('jobTitleInput');
    const imageInput = document.getElementById('imageInput');

    const name = nameInput.value.trim();
    const jobTitle = jobTitleInput.value.trim();
    const imageFile = imageInput.files[0];

    if (name && jobTitle && imageFile) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const newPerson = {
                name: name,
                jobTitle: jobTitle,
                image: event.target.result // Store the base64 image string
            };

            persons.push(newPerson);
            nameInput.value = ''; // Clear input fields
            jobTitleInput.value = '';
            imageInput.value = '';
            renderPersons(); // Re-render the list
        };

        // Read the image file as a base64 string
        reader.readAsDataURL(imageFile);
    } else {
        alert('Please fill in all fields and select an image.');
    }
}

// Function to edit an existing person
function editPerson(index) {
    const person = persons[index];
    const newName = prompt('Edit name:', person.name);
    const newJobTitle = prompt('Edit job title:', person.jobTitle);

    if (newName && newJobTitle) {
        persons[index].name = newName;
        persons[index].jobTitle = newJobTitle;

        const newImageFile = document.getElementById('imageInput').files[0];
        if (newImageFile) {
            const reader = new FileReader();
            reader.onload = function(event) {
                persons[index].image = event.target.result;
                renderPersons(); // Re-render the list
            };
            reader.readAsDataURL(newImageFile);
        } else {
            renderPersons(); // Re-render the list if image is not changed
        }
    }
}

// Function to delete a person
function deletePerson(index) {
    if (confirm('Are you sure you want to delete this person?')) {
        persons.splice(index, 1); // Remove the person from the list
        renderPersons(); // Re-render the list
    }
}

// Initialize the table with stored persons
renderPersons();
