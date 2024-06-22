import Key from "./Key";

export default function Keys({ keysData }) {
	return (
		<div>
			{keysData.map((keyData) => (
				<Key key={keyData.id} keyData={keyData} />
			))}
		</div>
	);
}
