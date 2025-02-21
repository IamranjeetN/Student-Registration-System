//Used DOMContentLoaded to ensure that HTML is fully loaded 
document.addEventListener("DOMContentLoaded", function () {  
    const form = document.getElementById("studentForm");
    const studentTableBody = document.getElementById("studentTableBody");
    let students = JSON.parse(localStorage.getItem("students")) || [];

    // clear the current student table and generate dynamically a row for each student
    function renderTable() {
        studentTableBody.innerHTML = "";
        students.forEach((student, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td class="actions">
                    <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;
            studentTableBody.appendChild(row);
        });
        localStorage.setItem("students", JSON.stringify(students));
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.getElementById("studentName").value.trim();
        const id = document.getElementById("studentID").value.trim();
        const email = document.getElementById("emailID").value.trim();
        const contact = document.getElementById("contactNo").value.trim();
        
        if (!name || !id || !email || !contact) {
            alert("All fields are required!");
            return;
        }
        
        students.push({ name, id, email, contact });
        renderTable();
        form.reset();
    });

    window.editStudent = function (index) {
        const student = students[index];
        document.getElementById("studentName").value = student.name;
        document.getElementById("studentID").value = student.id;
        document.getElementById("emailID").value = student.email;
        document.getElementById("contactNo").value = student.contact;
        students.splice(index, 1);
        renderTable();
    };
    
// To deletes a student from the students array based on the specified index.
    window.deleteStudent = function (index) {
        students.splice(index, 1);
        renderTable();
    };

    renderTable();
}); 