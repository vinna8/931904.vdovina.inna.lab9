const panel = document.querySelector(".panel");
const buttons = document.querySelectorAll(".button");

let firstnum = "";
let secondnum = "";
let operator = "";
let checkedButton;

for (let i = 0; i < buttons.length; i++ ){
	buttons[i].addEventListener("click", function(e){
		const button = e.target;
		const buttonValue = button.textContent;
		
		if(checkedButton != null){
			checkedButton.style.borderColor="#a3a3a3";
		} 
		checkedButton = button;
		button.style.borderColor="#a6c7ff";
		
		if (buttonValue === "C"){
			firstnum = "";
			secondnum = "";
			operator = "";
			
		} else if (button.classList.contains("num")){
			if (operator.length > 0){
				secondnum = secondnum + buttonValue;
			} else{
				firstnum = firstnum + buttonValue;
			}
			
		} else if (button.classList.contains("operator")){
			if (firstnum.length === 0 || secondnum.length !== 0){
				return;
			}
			operator = buttonValue;
			
		} else if (buttonValue === "<-"){
			if (secondnum != ""){
				secondnum = secondnum.slice(0, secondnum.length - 1);
			} else if (operator != ""){
				operator = operator.slice(0, operator.length - 1);
			} else if (firstnum != ""){
				firstnum = firstnum.slice(0, firstnum.length - 1);
			}
			
		} else if (buttonValue === "="){
			if (secondnum.length === 0){
				return;
			}
			let result;
			firstnum = +firstnum;
			secondnum = +secondnum;
			if (operator === "/"){
				result = firstnum / secondnum;
			} else if (operator === "*"){
				result = firstnum * secondnum;
			} else if (operator === "-") {
				result = firstnum - secondnum;
			} else if (operator === "+"){
				result = firstnum + secondnum;
			}

			firstnum = result;
			secondnum = "";
			operator = "";
			panel.textContent = result;

		} else if (buttonValue === "."){
			let num = (operator.length > 0) ? secondnum : firstnum;
			
			if (num.length === 0 || num.includes(".")){
				return;
			}
			
			if (operator.length > 0){
				secondnum = secondnum + buttonValue;
			} else{
				firstnum = firstnum + buttonValue;
			}
		}
		panel.innerHTML = firstnum + operator + secondnum;
		
		if (panel.textContent.length == 0){
			panel.textContent = "0";
		}
	});
}

