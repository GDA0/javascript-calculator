const operators = ["C", "÷", "x", "⌫", "-", "+", "="];

export default function Key({ keyData: { id, value } }) {
	const isOperator = operators.includes(value);

	return (
		<button
			className={`btn fs-5 border rounded ${isOperator ? "text-primary" : ""}`}
			id={id}
		>
			{value}
		</button>
	);
}
