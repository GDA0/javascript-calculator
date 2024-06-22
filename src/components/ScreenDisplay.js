export default function Display({ input, output }) {
	return (
		<div className="border rounded" id="display" style={{width: "100%", height: "12vh"}}>
			<span>{output}</span>
			<span>{input}</span>
		</div>
	);
}
