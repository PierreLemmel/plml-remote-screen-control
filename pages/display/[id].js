import { useRouter } from "next/router"
import { getFirestore, doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';

export default function Display() {

    const router = useRouter();
    const id = router.query["id"];

    const document = doc(getFirestore(), 'control/main')
    const [value, loading, error] = useDocument(document);

    return <div className="h-screen w-screen center-child">
        {loading && <div>Loading...</div>}
        {error && <div>An error occured: {JSON.stringify(error)}</div>}
        {value && <div className={`full transition duration-300 ${value.data()[id] ? "bg-white" : "bg-black"}`} />}
    </div>
}