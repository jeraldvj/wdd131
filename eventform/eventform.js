
const form = document.querySelector("#ticketForm");
const typeSelect = document.querySelector("#type");
const codeContainer = document.querySelector("#codeContainer");
const codeLabel = document.querySelector("#codeLabel");
const codeInput = document.querySelector("#code");
const eventDate = document.querySelector("#date");
const output = document.querySelector("#output");

form.noValidate = true;

function setMinimumDate() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const day = String(tomorrow.getDate()).padStart(2, "0");

    eventDate.min = `${year}-${month}-${day}`;
}

setMinimumDate();

function updateCodeField() {
    const type = typeSelect.value;

    typeSelect.setAttribute(
        "aria-expanded",
        type === "student" || type === "guest" ? "true" : "false"
    );

    codeInput.value = "";
    codeInput.required = false;
    codeInput.removeAttribute("pattern");
    codeInput.removeAttribute("minlength");
    codeInput.removeAttribute("maxlength");
    codeInput.removeAttribute("inputmode");
    codeInput.placeholder = "";

    if (type === "student") {
        codeContainer.hidden = false;
        codeLabel.textContent = "Student I#";

        codeInput.required = true;
        codeInput.minLength = 9;
        codeInput.maxLength = 9;
        codeInput.pattern = "[0-9]{9}";
        codeInput.inputMode = "numeric";
        codeInput.placeholder = "Enter your 9-digit I-number";

    } else if (type === "guest") {
        codeContainer.hidden = false;
        codeLabel.textContent = "Access Code";

        codeInput.required = true;
        codeInput.maxLength = 8;
        codeInput.pattern = "EVENT131";
        codeInput.inputMode = "text";
        codeInput.placeholder = "Enter event access code";

    } else {
        codeContainer.hidden = true;
    }
}

typeSelect.addEventListener("change", function() {
    updateCodeField();
    output.textContent = "";
});

function isValidDate(value) {
    if (!value) return false;
    return value >= eventDate.min;
}

function validateCode(type, value) {
    if (type === "student") {
        return /^[0-9]{9}$/.test(value);
    }

    if (type === "guest") {
        return value === "EVENT131";
    }

    return false;
}

function showErrors(errors) {
    const heading = document.createElement("h2");
    heading.textContent = "Please correct the following errors:";

    const list = document.createElement("ul");

    errors.forEach(error => {
        const item = document.createElement("li");
        item.textContent = error;
        list.appendChild(item);
    });

    output.replaceChildren(heading, list);
}

form.addEventListener("submit", function(event) {
    event.preventDefault();
    output.textContent = "";

    const firstName = form.elements.firstName.value.trim();
    const lastName = form.elements.lastName.value.trim();
    const email = form.elements.email.value.trim();
    const type = typeSelect.value;
    const date = eventDate.value;
    const code = codeInput.value.trim();

    const errors = [];

    // Validate names
    if (!firstName) {
        errors.push("Please enter your first name.");
    }

    if (!lastName) {
        errors.push("Please enter your last name.");
    }

    // Validate email
    if (!email) {
        errors.push("Please enter your email address.");
    } else if (form.elements.email.validity.typeMismatch) {
        errors.push("Please enter a valid email address.");
    }

    // Validate type
    if (!type) {
        errors.push("Please select Student or Guest.");
    }

    // Validate event date
    if (!date) {
        errors.push("Please select an event date.");
    } else if (!isValidDate(date)) {
        errors.push("Please choose a date later than today.");
    }

    // Validate Student I#
    if (type === "student" && !code) {
        errors.push("Please enter your Student I#.");
    } else if (type === "student" && !validateCode(type, code)) {
        errors.push("Student I# must contain exactly 9 digits.");
    }

    // Validate Guest Access Code
    if (type === "guest" && !code) {
        errors.push("Please enter the Access Code.");
    } else if (type === "guest" && !validateCode(type, code)) {
        errors.push("The Access Code must be EVENT131.");
    }

    // Display errors if any
    if (errors.length > 0) {
        showErrors(errors);
        return;
    }

    // Create successful ticket
    const heading = document.createElement("h2");
    heading.textContent = "Ticket Created!";

    const ticketInfo = document.createElement("div");

    const details = [
        `Name: ${firstName} ${lastName}`,
        `Email: ${email}`,
        `Type: ${type === "student" ? "Student" : "Guest"}`,
        `Event Date: ${date}`,
        `Ticket Code: ${code}`
    ];

    details.forEach(detail => {
        const paragraph = document.createElement("p");
        paragraph.textContent = detail;
        ticketInfo.appendChild(paragraph);
    });

    output.replaceChildren(heading, ticketInfo);

    // Reset the form after successful submission
    form.reset();
    updateCodeField();
});

updateCodeField();
