import Key from "./Key";
import './KeysDisplay.css'

export default function KeysDisplay({ keysData, handleInput }) {
	return (
		<div className="p-3 keys-display">
			{keysData.map((keyData) => (
				<Key key={keyData.id} keyData={keyData} handleInput={handleInput}/>
			))}
		</div>
	);
}
