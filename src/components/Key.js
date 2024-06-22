export default function Key({ keyData: { id, value } }) {
	return (
		<button className="btn" id={id}>
			{value}
		</button>
	);
}
