import { useMemo } from 'react';
import '../styles/globals.css'
import { initializeApp } from "firebase/app";

function App({ Component, pageProps }) {

	useMemo(() => {
		const firebaseConfig = {
			apiKey: "AIzaSyD8y7-Pvg7y6RdQZ15lWOf0OXAlyDKO54E",
			authDomain: "plml-remote-screen-control.firebaseapp.com",
			projectId: "plml-remote-screen-control",
			storageBucket: "plml-remote-screen-control.appspot.com",
			messagingSenderId: "591238800006",
			appId: "1:591238800006:web:8b818fbd0c4b7cfa706707"
		  };
		
		const app = initializeApp(firebaseConfig);

		return app;
	}, [])

	return <Component {...pageProps} />
}

export default App
