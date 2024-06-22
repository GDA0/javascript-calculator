import Key from "./Key";
import './KeysDisplay.css'

export default function Keys({ keysData }) {
	return (
		<div className="p-3 keys-display">
			{keysData.map((keyData) => (
				<Key key={keyData.id} keyData={keyData} />
			))}
		</div>
	);
}
