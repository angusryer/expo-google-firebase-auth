import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Text, View } from "react-native";
import * as AuthSession from "expo-auth-session/providers/google";
import * as FirebaseAuth from "firebase/auth";
import { auth } from "./firebase";
import * as WebBrowser from "expo-web-browser";

WebBrowser.maybeCompleteAuthSession();

export default function App() {
	const [user, setUser] = useState<FirebaseAuth.User | null>(null);
	const [req, res, promptAsync] = AuthSession.useIdTokenAuthRequest({
		webClientId:
			"1091202674321-jcbf12stjmsun8sif97t5c4tkc9orm9p.apps.googleusercontent.com"
	});

	const signIn = (cred: FirebaseAuth.AuthCredential) => {
		FirebaseAuth.signInWithCredential(auth, cred);
	};

	useEffect(() => {
		if (res && res?.type === "success") {
			const credential = FirebaseAuth.GoogleAuthProvider.credential(
				res.params?.id_token
			);
			signIn(credential);
		}
	}, [res]);

	useEffect(() => {
		return FirebaseAuth.onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
		});
	}, []);

	return (
		<View style={{ maxWidth: 450, alignSelf: "center", margin: 48 }}>
			<Text style={{ margin: 12 }}>
				Retrieve an ID token from Google and authenticate via Firebase!
			</Text>
			<StatusBar style='auto' />
			{req ? (
				<Button title='LOGIN' onPress={() => promptAsync()} />
			) : (
				<Text>Loading...</Text>
			)}
			{!user ? null : (
				<View
					style={{
						margin: 12,
						padding: 12,
						borderWidth: 1,
						borderColor: "blue"
					}}
				>
					<Text>You are logged the f#$% in baby.</Text>
					<Button title='LOGOUT' onPress={() => auth.signOut()} />
				</View>
			)}
		</View>
	);
}
