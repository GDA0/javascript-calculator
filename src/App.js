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

function App() {
	const [input, setInput] = useState("0");
	const [output, setOutput] = useState("");

	function handleInput(input) {
		const number = numbers.find((num) => num === input);
		const operator = operators.find((opt) => opt === input);

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
			case number:
				handleNumber(number);
				break;
			case operator:
				handleOperator(operator);
				break;
			default:
				break;
		}
	}

	function handleClear() {
		setInput("0");
		setOutput("");
	}

	function handleBackspace() {
		if (input.length > 1) {
			setInput(`${input.slice(0, -1)}`);
		} else {
			if (input !== "0") {
				setInput("0");
			}
		}
	}

	function handleDecimal() {
		if (input === "0") {
			setInput("0.");
		} else if (operators.includes(input.at(-1))) {
			setInput(`${input}0.`);
		} else {
			const numbers = input.split(/[+\-x÷]/);
			const lastNumber = numbers.at(-1);
			if (!lastNumber.includes(".")) {
				setInput(`${input}.`);
			}
		}
	}

	function handlePercent() {
		if (!(input === "0" || operators.includes(input.at(-1)))) {
			const numberRegex = /-?\d+(\.\d+)?/g;
			const numbers = input.match(numberRegex);
			const lastNumber = numbers.at(-1);

			const parsedLastNumber = parseFloat(lastNumber);
			const percentage = parsedLastNumber / 100;

			const modifiedExpression = input.replace(
				new RegExp(`${lastNumber}$`),
				percentage.toString()
			);

			setInput(modifiedExpression);
		}
	}

	function handleNumber(number) {
		if (!isNaN(number)) {
			if (input === "0") {
				setInput(`${number}`);
			} else {
				setInput(`${input}${number}`);
			}
		}
	}

	function handleOperator(operator) {
		if (operator) {
			if (input === "0" && operator === "-") {
				setInput(`${operator}`);
			} else if ((input === "-" || input === "0") && operator !== "-") {
				setInput("0");
			} else if (
				(input.endsWith("x") || input.endsWith("÷")) &&
				operator === "-"
			) {
				setInput(`${input}${operator}`);
			} else if (!operators.includes(input.at(-1))) {
				setInput(`${input}${operator}`);
			} else {
				const penultimateChar = input.at(-2);
				const newInput = operators.includes(penultimateChar)
					? `${input.slice(0, -2)}${operator}`
					: `${input.slice(0, -1)}${operator}`;
				setInput(newInput);
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
					<Display input={input} output={output} />
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
