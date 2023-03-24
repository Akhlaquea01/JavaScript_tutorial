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