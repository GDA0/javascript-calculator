import { useState } from "react";
import Display from "./components/ScreenDisplay";
import KeysDisplay from "./components/KeysDisplay";

const keysData = [
	{ id: "clear", value: "C" },
	{ id: "divide", value: "÷" },
	{ id: "multiply", value: "x" },
	{ id: "backspace", value: "⌫" },
	{ id: "seven", value: 7 },
	{ id: "eight", value: 8 },
	{ id: "nine", value: 9 },
	{ id: "subtract", value: "-" },
	{ id: "four", value: 4 },
	{ id: "five", value: 5 },
	{ id: "six", value: 6 },
	{ id: "add", value: "+" },
	{ id: "one", value: 1 },
	{ id: "two", value: 2 },
	{ id: "three", value: 3 },
	{ id: "equals", value: "=" },
	{ id: "percent", value: "%" },
	{ id: "zero", value: 0 },
	{ id: "decimal", value: "." },
];

const operators = ["÷", "x", "-", "+"];
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function add(a, b) {
	return parseFloat((a + b).toFixed(5));
}

function subtract(a, b) {
	return parseFloat((a - b).toFixed(5));
}

function multiply(a, b) {
	return parseFloat((a * b).toFixed(5));
}

function divide(a, b) {
	return b === 0 ? "Math ERROR" : parseFloat((a / b).toFixed(5));
}

function operate(operator, firstNumber, secondNumber) {
	switch (operator) {
		case "+":
			return add(firstNumber, secondNumber);
		case "-":
			return subtract(firstNumber, secondNumber);
		case "*":
			return multiply(firstNumber, secondNumber);
		case "/":
			return divide(firstNumber, secondNumber);
		default:
			return "Syntax ERROR";
	}
}

function isValidExpression(input) {
	const pattern = /(-?\d+(\.\d+)?)[+\-x÷]+(-?\d+(\.\d+)?)/;
	return pattern.test(input);
}

function App() {
	const [display, setDisplay] = useState("0");

	function handleInput(input) {
		if (numbers.includes(input)) {
			handleNumber(input);
		} else if (operators.includes(input)) {
			handleOperator(input);
		} else {
			switch (input) {
				case "C":
					handleClear();
					break;
				case "⌫":
					handleBackspace();
					break;
				case ".":
					handleDecimal();
					break;
				case "%":
					handlePercent();
					break;
				case "=":
					handleEquals();
					break;
				default:
					break;
			}
		}
	}

	function handleClear() {
		setDisplay("0");
	}

	function handleBackspace() {
		setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
	}

	function handleDecimal() {
		if (display === "0") {
			setDisplay("0.");
		} else if (operators.includes(display.at(-1))) {
			setDisplay(`${display}0.`);
		} else {
			const numbers = display.split(/[+\-x÷]/);
			const lastNumber = numbers.at(-1);
			if (!lastNumber.includes(".")) {
				setDisplay(`${display}.`);
			}
		}
	}

	function handlePercent() {
		if (!(display === "0" || operators.includes(display.at(-1)))) {
			const numberRegex = /-?\d+(\.\d+)?/g;
			const numbers = display.match(numberRegex);
			const lastNumber = numbers.at(-1);

			const parsedLastNumber = parseFloat(lastNumber);
			const percentage = parsedLastNumber / 100;

			const modifiedExpression = display.replace(
				new RegExp(`${lastNumber}$`),
				percentage.toString()
			);

			setDisplay(modifiedExpression);
		}
	}

	function handleEquals(nextOperator = "") {
		if (!operators.includes(display.at(-1))) {
			if (display.includes("x") && display.includes("-")) {
				let operator = "x";
				let [firstNumber, secondNumber] = display
					.split(operator)
					.map(parseFloat);

				let result = operate("*", firstNumber, secondNumber);
				setDisplay(`${result}${nextOperator}`);
			} else if (display.includes("÷") && display.includes("-")) {
				let operator = "÷";
				let [firstNumber, secondNumber] = display
					.split(operator)
					.map(parseFloat);
				let result = operate("/", firstNumber, secondNumber);

				setDisplay(`${result}${nextOperator}`);
			} else if (
				display.includes("-") &&
				display.match(/-/g).length === 2
			) {
				const secondMinusIndex = display.lastIndexOf("-");

				let firstNumber = parseFloat(
					display.slice(0, secondMinusIndex)
				);
				let secondNumber = parseFloat(
					display.slice(secondMinusIndex + 1)
				);

				let result = operate("-", firstNumber, secondNumber);

				setDisplay(`${result}${nextOperator}`);
			} else if (
				display.includes("-") &&
				display.match(/-/g).length === 1 &&
				display.match(/[+x÷]/) === null
			) {
				let operator = "-";
				let [firstNumber, secondNumber] = display
					.split(operator)
					.map(parseFloat);

				let result = operate("-", firstNumber, secondNumber);

				setDisplay(`${result}${nextOperator}`);
			} else {
				let [firstNumber, secondNumber] = display
					.split(/[+x÷]/)
					.map(parseFloat);
				let operators = display.match(/[+x÷]/);
				let operator = operators ? operators[0] : null;

				if (isNaN(firstNumber) || isNaN(secondNumber)) {
					setDisplay(`${display}`);
				} else {
					operator =
						operator === "x"
							? "*"
							: operator === "÷"
							? "/"
							: operator;

					let result = operate(operator, firstNumber, secondNumber);

					setDisplay(`${result}${nextOperator}`);
				}
			}
		}
	}

	function handleNumber(number) {
		setDisplay(display === "0" ? number.toString() : display + number);
	}

	function handleOperator(operator) {
		if (operator) {
			if (isValidExpression(display)) {
				handleEquals(operator);
			} else {
				if (display === "0" && operator === "-") {
					setDisplay(`${operator}`);
				} else if (
					(display === "-" || display === "0") &&
					operator !== "-"
				) {
					setDisplay("0");
				} else if (
					(display.endsWith("x") || display.endsWith("÷")) &&
					operator === "-"
				) {
					setDisplay(`${display}${operator}`);
				} else if (!operators.includes(display.at(-1))) {
					setDisplay(`${display}${operator}`);
				} else {
					const penultimateChar = display.at(-2);
					const newInput = operators.includes(penultimateChar)
						? `${display.slice(0, -2)}${operator}`
						: `${display.slice(0, -1)}${operator}`;
					setDisplay(newInput);
				}
			}
		}
	}

	return (
		<div className="bg-light d-flex flex-column min-vh-100">
			<header>
				<nav className="navbar bg-body-tertiary border-bottom border-2">
					<div className="container-fluid">
						<span className="navbar-brand mb-0 h1 fw-bold fs-3 mx-auto">
							Calculator
						</span>
					</div>
				</nav>
			</header>
			<main className="flex-grow-1">
				<div
					className="container d-flex flex-column align-items-center justify-content-center bg-white mt-5 p-3 rounded shadow-sm gap-1"
					style={{ maxWidth: "300px" }}
				>
					<Display display={display} />
					<KeysDisplay
						keysData={keysData}
						handleInput={handleInput}
					/>
				</div>
			</main>
			<footer className="container text-center fw-medium text-secondary mt-auto">
				<p>
					&copy; {new Date().getFullYear()} Calculator. Created By{" "}
					<a
						className="text-primary"
						href="https://github.com/GDA0"
						target="_blank"
						rel="noopener noreferrer"
					>
						Gideon D. Adeti
					</a>
					. All Rights Reserved.
				</p>
			</footer>
		</div>
	);
}

export default App;
