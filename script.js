const buttons = Array.from(document.getElementsByClassName("buttons"));
const output = document.querySelector("[data-output]");

buttons.map(button => {
    button.addEventListener('click', e => {
        switch (e.target.innerText) {
            case 'C':
                output.textContent = "";
                break;
            case "🔙":
                if(output.textContent){
                output.textContent = output.textContent.slice(0, -1);
            }
            break;
            case '÷':
                output.textContent += '/'
                break;
            case '=':
                try{
                   output.textContent = eval(output.textContent); 
                }
                catch{
                    output.textContent = 'Error!'
                }
                break;
            default:
                output.textContent += e.target.textContent;
        }
    })
})