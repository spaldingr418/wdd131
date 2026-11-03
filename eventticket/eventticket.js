const form = document.querySelector("#eventticket");
const studentContainer = document.querySelector("#studentContainer");
const accessContainer = document.querySelector("#accessContainer");
const eventtype = document.querySelector("#eventtype");
const studentId = document.querySelector("#studentId");
const accesscode = document.querySelector("#accesscode");
const output = document.querySelector("#output");

function updateNotesField() {
  const value = eventtype.value;
  const accesscode = form.accesscode.value.trim();

    studentContainer.hidden = true;
    accessContainer.hidden = true;

    studentId.required = false;
    accesscode.required = false;

    if (value === "student") {
        studentContainer.hidden = false;
        studentId.required = true;
        //error message if not enough digits for student id
        if (type === "student" && studentId.length !==9) {
        output.innerHTML = `
        <p>Student ID must be exactly 9 digits.</p>
        `;
        return;
        }
    } 
    if (value === "guest") {
        accessContainer.hidden = false;
        accesscode.required = true;
        //access code
        if (type === "guest" && accesscode.toUpperCase !== "EVENT131") {
            output.textContent = "Invalid access code.";
            return;
        }
    }
}



eventtype.addEventListener("change", updateNotesField);
updateNotesField();

// Ensure they choose a date later than the current date
function isPastDate(value) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const chosen = new Date(value);
  return chosen < today;
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    output.textContent = "";

    const firstname = form.firstname.value.trim();
    const lastname = form.lastname.value.trim();
    const type = form.eventtype.value;
    const eventdate = form.eventdate.value;
    const studentId = form.studentId.value.trim();

    // Let user know that student id must be 9 characters.
    if (type === "student" && studentId.length !== 9) {
        output.textContent = "Please enter a 9-character student ID.";
        return;
    }

    if (isPastDate(eventdate)) {
        output.textContent = "Please choose a future date.";
        return;
    }

    output.innerHTML = `
    <h2>Ticket Created</h2>
    <p>${firstname} ${lastname}</p>
    <p>${type}</p>
    <p>${eventdate}</p>
    `;

    form.reset();
    updateNotesField();
});