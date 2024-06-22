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

const operators = ["÷", "x", "-"];
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function App() {
	const [input, setInput] = useState("0");
	const [output, setOutput] = useState("");

	function handleInput(input) {
		const number = numbers.find((num) => num === input);

		switch (input) {
			case "C":
				handleClear();
				break;
			case number:
				handleNumber(input);
			default:
				break;
		}
	}

	function handleClear() {
		setInput("0");
		setOutput("");
	}

	function handleNumber(number) {
		if (input === "0") {
			setInput(`${number}`);
		} else {
			setInput(`${input}${number}`);
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
