const user = document.getElementById('user');
console.log(user.dataset);
console.log(user);

document.addEventListener('mousemove', (e) => {
    // console.log(`X:${e.clientX},Y:${e.clientY}`);
});

const passwordInput = document.getElementById('password');

passwordInput.addEventListener('keyup', function (event) {
    if (event.getModifierState('CapsLock')) {
        console.log("ON");
    }
});

user.addEventListener('click', () => { console.log("I run only once"); }, { once: true });
function get() {
    console.dirxml(document.querySelector(".h"));
}

// Section 2: Selecting Elements
const elementById = document.getElementById("elementById");
const elementByName = document.getElementsByName("elementByName");
const elementsByTagName = document.getElementsByTagName("p");
const elementsByClassName = document.getElementsByClassName("example-class");
const selectedByCSS = document.querySelector(".example-class");

// Section 3: Traversing Elements
const parentElement = document.getElementById("parentElement");
const childElements = parentElement.children;

// Section 4: Manipulating Elements
document.getElementById("createElementButton").addEventListener("click", () => {
    const newElement = document.createElement("p");
    newElement.textContent = "Newly Created Element";
    document.getElementById("appendChildExample").appendChild(newElement);
});

const textContentExample = document.getElementById("textContentExample");
textContentExample.addEventListener("click", () => {
    textContentExample.textContent = "Text content changed!";
});

const innerHTMLExample = document.getElementById("innerHTMLExample");
innerHTMLExample.addEventListener("click", () => {
    innerHTMLExample.innerHTML = "<em>HTML content changed!</em>";
});

// Section 5: Working with Attributes
const attributeExample = document.getElementById("attributeExample");
attributeExample.setAttribute("data-custom-attribute", "456");
const customAttribute = attributeExample.getAttribute("data-custom-attribute");

// Section 6: Manipulating Element's Styles
const styleExample = document.getElementById("styleExample");
styleExample.style.color = "red";

// Section 7: Working with Events
const eventButton = document.getElementById("eventButton");
const eventLog = document.getElementById("eventLog");

eventButton.addEventListener("click", () => {
    eventLog.textContent = "Button clicked!";
});

// Section 8: Scripting Web Forms
const exampleForm = document.getElementById("exampleForm");
exampleForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const textInputValue = document.getElementById("textInput").value;
    const radioValue = document.querySelector('input[name="radioExample"]:checked').value;
    const checkboxValue = document.getElementById("checkboxExample").checked;
    const selectValue = document.getElementById("selectBox").value;

    console.log("Form submitted with values:");
    console.log("Text Input: " + textInputValue);
    console.log("Radio Value: " + radioValue);
    console.log("Checkbox Value: " + checkboxValue);
    console.log("Select Value: " + selectValue);
});