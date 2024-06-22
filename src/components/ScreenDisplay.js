export default function Display({ input, output }) {
	return (
		<div
			className="border rounded p-1 fs-3 text-end d-flex flex-column justify-content-between bg-light overflow-hidden"
			id="display"
			style={{ width: "100%", height: "12vh" }}
		>
			<span style={{ minHeight: "5vh" }}>{output}</span>
			<span>{input}</span>
		</div>
	);
}
