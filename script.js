let editIndex = null;

// Load students from local storage when the page loads
document.addEventListener("DOMContentLoaded", loadStudentsFromLocalStorage);

// Function to register or update a student and display the details in the table
function registerStudent() {
  const name = document.getElementById('name').value;
  const id = document.getElementById('id').value;
  const email = document.getElementById('email').value;
  const contact = document.getElementById('contactNo').value;

  let isValid = true;

  // Reset error messages
  const errors = document.querySelectorAll('.error');
  errors.forEach(error => error.style.display = 'none');

  // Validate Student ID
  if (!id) {
    document.getElementById('idEmptyError').style.display = 'block';
    isValid = false;
  } else if (!/^\d+$/.test(id)) {
    document.getElementById('idError').style.display = 'block';
    isValid = false;
  }

  // Validate Name
  if (!name) {
    document.getElementById('nameEmptyError').style.display = 'block';
    isValid = false;
  } else if (!/^[A-Za-z\s]+$/.test(name)) {
    document.getElementById('nameError').style.display = 'block';
    isValid = false;
  }

  // Validate Contact Number
  if (!contact) {
    document.getElementById('contactEmptyError').style.display = 'block';
    isValid = false;
  } else if (!/^\d{10}$/.test(contact)) {
    document.getElementById('contactError').style.display = 'block';
    isValid = false;
  }

  // Validate Email
  if (!email) {
    document.getElementById('emailEmptyError').style.display = 'block';
    isValid = false;
  } else {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      document.getElementById('emailError').style.display = 'block';
      isValid = false;
    }
  }

  if (!isValid) return;

  const student = { name, id, email, contact };

  if (editIndex === null) {
    addStudentToTable(student);
    saveStudentToLocalStorage(student);
  } else {
    updateStudentInTable(student, editIndex);
    updateStudentInLocalStorage(student, editIndex);
    editIndex = null;
  }

  resetForm();
}

// Function to load students from local storage and display them in the table
function loadStudentsFromLocalStorage() {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  students.forEach(student => addStudentToTable(student));
}

// Function to save a student to local storage
function saveStudentToLocalStorage(student) {
  const students = JSON.parse(localStorage.getItem("students")) || [];
  students.push(student);
  localStorage.setItem("students", JSON.stringify(students));
}

// Function to update a student in local storage
function updateStudentInLocalStorage(student, index) {
  const students = JSON.parse(localStorage.getItem("students"));
  students[index] = student;
  localStorage.setItem("students", JSON.stringify(students));
}

// Function to delete a student from local storage
function deleteStudentFromLocalStorage(index) {
  const students = JSON.parse(localStorage.getItem("students"));
  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
}

// Function to add a student to the table
function addStudentToTable(student) {
  const studentsList = document.getElementById('studentsList');
  const newRow = studentsList.insertRow();
  createCells(newRow, student.name, student.id, student.email, student.contact);
}

// Function to create cells with student data and actions
function createCells(row, name, id, email, contact) {
  row.insertCell(0).textContent = name;
  row.insertCell(1).textContent = id;
  row.insertCell(2).textContent = email;
  row.insertCell(3).textContent = contact;

  const actionsCell = row.insertCell(4);
  actionsCell.appendChild(createButton("Edit", "edit-btn", () => editStudent(row.rowIndex - 1)));
  actionsCell.appendChild(createButton("Delete", "delete-btn", () => deleteStudent(row.rowIndex - 1)));
}

// Function to create an action button
function createButton(text, className, onClick) {
  const button = document.createElement("button");
  button.textContent = text;
  button.className = `action-btn ${className}`;
  button.onclick = onClick;
  return button;
}

// Function to edit an existing student
function editStudent(index) {
  editIndex = index;
  const row = document.getElementById('studentsList').rows[index];
  document.getElementById('name').value = row.cells[0].textContent;
  document.getElementById('id').value = row.cells[1].textContent;
  document.getElementById('email').value = row.cells[2].textContent;
  document.getElementById('contactNo').value = row.cells[3].textContent;
}

// Function to update student details in the table
function updateStudentInTable(student, index) {
  const row = document.getElementById('studentsList').rows[index];
  row.cells[0].textContent = student.name;
  row.cells[1].textContent = student.id;
  row.cells[2].textContent = student.email;
  row.cells[3].textContent = student.contact;
}

// Function to delete a student record
function deleteStudent(index) {
  document.getElementById('studentsList').deleteRow(index);
  deleteStudentFromLocalStorage(index);
}

// Function to reset the form fields
function resetForm() {
  document.getElementById('registrationForm').reset();
  editIndex = null;
}
