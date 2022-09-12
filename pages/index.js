import Head from 'next/head'
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';
import Link from 'next/link';

export default function Home() {
	const displayCount = 5;

	return  <>
		<Head>
			<title>Remote Screen Control</title>
			<meta name="description" content="Plml Remote Screen Control" />
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<ControlComponent displayCount={displayCount} />
	</>
}

function ControlComponent(props) {
	const { displayCount } = props;

	const document = doc(getFirestore(), 'control/main')
	const [value, loading, error] = useDocument(document);

	return <div className="h-screen w-screen center-child">
        {loading && <div>Loading...</div>}
        {error && <div>An error occured: {JSON.stringify(error)}</div>}
        {value && <ControlDisplay data={value.data()} document={document} />}
    </div>
}

function ControlDisplay(props) {
	const { data, document } = props;

    return <div className="full flex flex-row items-center justify-evenly bg-slate-800 text-white">
        {Object.keys(data).map(key => {

			const isOn = data[key];

			const onToggle = () => {
				updateDoc(document, {
					[key]: !isOn
				});
			}

			return <div className="full centered-col mx-4 space-y-12" key={key}>
				<div className="text-2xl">{key}</div>
				<div
					className={`
						w-32 h-32 center-child rounded-lg
						hover:cursor-pointer active:brightness-125 hover:brightness-110
						transition duration-150
						text-xl
						${isOn ? "bg-amber-500" : "bg-amber-900"}
					`}
					onClick={onToggle}
				>
					{isOn ? "ON" : "OFF"}
				</div>
				<Link href={`display/${key}`}>
					<a className="px-4 py-2 w-32 bg-gray-700 rounded-md center-child hover:cursor-pointer transition duration-150 active:brightness-125 hover:brightness-110" 
						target="_blank"
					>
						Display
					</a>
				</Link>
			</div>
		})}
    </div>
}