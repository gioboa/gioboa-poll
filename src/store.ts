// Import the functions you need from the SDKs you need
import * as firebase from 'firebase/app';
import {
	collection,
	getFirestore,
	query,
	runTransaction,
	setDoc,
} from 'firebase/firestore';
import { doc, onSnapshot } from 'firebase/firestore';
import { get, writable } from 'svelte/store';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: import.meta.env.VITE_APIKEY,
	authDomain: import.meta.env.VITE_AUTHDOMAIN,
	databaseURL: import.meta.env.VITE_DATABASEURL,
	projectId: import.meta.env.VITE_PROJECTID,
	storageBucket: import.meta.env.VITE_STORAGEBUCKET,
	messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
	appId: import.meta.env.VITE_APPID,
};

const app = firebase.initializeApp(firebaseConfig);
const db = getFirestore(app);

export const store = writable<{
	answers: { id: 'YES' | 'NO'; amount: number }[];
	percentage: { yes: number; no: number };
}>({
	answers: [],
	percentage: { no: 0, yes: 0 },
});

const pollRef = collection(db, 'poll');

onSnapshot(query(pollRef), (snapshot) => {
	let answers = [];
	snapshot.docs.forEach((doc) => {
		answers.push({ ...doc.data(), id: doc.id });
	});
	const total = answers.reduce((a, b) => a + b.amount, 0);
	const yes = Math.round(
		(answers.find((a) => a.id === 'YES').amount / total) * 100
	);
	const no = Math.round(
		(answers.find((a) => a.id === 'NO').amount / total) * 100
	);
	store.set({ answers, percentage: { yes, no } });
});

export const incrementYes = async () => {
	await setDocValue('YES');
};

export const incrementNo = async () => {
	await setDocValue('NO');
};

export const setDocValue = async (id: string) => {
	await runTransaction(db, async (transaction) => {
		const docRef = doc(pollRef, id);
		const currentDoc = await transaction.get(docRef);
		const amount = parseInt(currentDoc.data().amount, 10) + 1;
		transaction.update(docRef, { amount });
	});
};
