const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let expression = "";

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        switch (value) {

            case "AC":
                expression = "";
                display.value = "";
                break;

            case "DEL":
                expression = expression.slice(0, -1);
                display.value = expression;
                break;

            case "=":
                calculate();
                break;

            default:
                expression += value;
                display.value = expression;
        }
    });
});

function calculate() {
    try {
        if (expression === "") return;

        let result = eval(expression);

        if (!isFinite(result)) {
            display.value = "Error";
            expression = "";
            return;
        }

        display.value = result;
        expression = result.toString();

    } catch (error) {
        display.value = "Error";
        expression = "";
    }
}

document.addEventListener("keydown", (event) => {

    const key = event.key;

    if (
        (key >= "0" && key <= "9") ||
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "." ||
        key === "%"
    ) {
        expression += key;
        display.value = expression;
    }

    else if (key === "Enter") {
        event.preventDefault();
        calculate();
    }

    else if (key === "Backspace") {
        expression = expression.slice(0, -1);
        display.value = expression;
    }

    else if (key === "Escape") {
        expression = "";
        display.value = "";
    }
});  