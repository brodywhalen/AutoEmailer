// create Mass Email Compose Button
const button = document.createElement("button");
button.textContent = 'Mass Email';
button.className = 'Menu-Button' ;

button.addEventListener('click', ()=> {
    chrome.runtime.sendMessage(({type: 'open_side_panel'}));
})
document.body.getElementsByClassName("z0")[0].appendChild(button)
// Onclick ope