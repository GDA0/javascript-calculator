export default function Display({ input, output }) {
	return (
		<div id="display">
			<span>{output}</span>
			<span>{input}</span>
		</div>
	);
}
