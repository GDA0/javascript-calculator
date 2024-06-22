const specialKeys = ["C", "÷", "x", "⌫", "-", "+", "="];

export default function Key({ keyData: { id, value }, handleInput }) {
	const isOperator = specialKeys.includes(value);

	return (
		<button
			className={`btn fs-5 border rounded ${
				isOperator ? "text-primary" : ""
			}`}
			id={id}
			onClick={() => handleInput(value)}
		>
			{value}
		</button>
	);
}
