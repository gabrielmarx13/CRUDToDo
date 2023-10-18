"use client"

import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import List from "@/components/List";

const firebaseConfig = {
  apiKey: "AIzaSyAhKTIC9eE7eTGI3MxAgfVkgy2f6gyAYT0",
  authDomain: "crudtodo-3fbf2.firebaseapp.com",
  projectId: "crudtodo-3fbf2",
  storageBucket: "crudtodo-3fbf2.appspot.com",
  messagingSenderId: "426231445841",
  appId: "1:426231445841:web:9ac9c89d16188cc8bbbb70"
};


const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export default async function Home() {

  const listQuery = await getDocs(collection(database, "itemlist"))

  return (
      <List key={1} list={listQuery.docs}></List>
  )
}