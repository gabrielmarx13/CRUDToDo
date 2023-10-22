"use client";

import { useState } from "react";
import Item from "./Item";
import { addDoc, collection, deleteDoc, doc, getFirestore, setDoc } from "firebase/firestore";
import Image from "next/image";

export default function List({ list }: any) {

  const [filterState, setFilterState] = useState(0);
  const [searchState, setSearchState] = useState("");
  const [stateName, setStateName] = useState("");
  const [stateDescription, setStateDescription] = useState("");
  const [stateImage, setStateImage] = useState("")
  const [stateEditName, setStateEditName] = useState("");
  const [stateEditDescription, setStateEditDescription] = useState("");
  const [stateEditImage, setStateEditImage] = useState("");
  const [stateListSize, setStateListSize] = useState(list.length);
  const [editState, setEditState] = useState(0);
  const database = getFirestore();

var newlist = list
  if (filterState == 0) {
    newlist.sort((a: any, b: any) => {
      if (a.id < b.id) return -1;
      if (b.id < a.id) return 1;
      return 0;
    })
  } else if (filterState == 1) {
    newlist.sort((a: any, b: any) => {
      if (a.id < b.id) return 1;
      if (b.id < a.id) return -1;
      return 0;
    })
  } else if (filterState == 2) {
    newlist.sort((a: any, b: any) => {
      if (a.data().name < b.data().name) return -1;
      if (b.data().name < a.data().name) return 1;
      return 0;
    })
  } else if (filterState == 3) {
    newlist.sort((a: any, b: any) => {
      if (a.data().name < b.data().name) return 1;
      if (b.data().name < a.data().name) return -1;
      return 0;
    })
  }

  if (searchState != "") {
    newlist = newlist.filter((doc: any) => doc.id.toLowerCase() == searchState.toLowerCase()
      || doc.data().name.toLowerCase().includes(searchState.toLowerCase())
      || doc.data().description.toLowerCase().includes(searchState.toLowerCase()))
  }

  return (<>
    <div style={{ display: "flex", justifyContent: "space-around", width: "80%", padding: "10px", border: "1px solid black" }}>
      <div>
        <span>Filter:  </span>
        <button onClick={() => { setFilterState(0) }}>Ascending ID</button>
        <button onClick={() => { setFilterState(1) }}>Descending ID</button>
        <button onClick={() => { setFilterState(2) }}>Ascending Name</button>
        <button onClick={() => { setFilterState(3) }}>Descending Name</button>
      </div>

      <div>
        <button onClick={async () => {
          if (stateImage) {
            setDoc(doc(database, "itemlist", (stateListSize + 1).toString()), { name: stateName, description: stateDescription, image: stateImage })
          }
          setTimeout(() => window.location.reload(), 1000)
        }}>Add Item</button>
        <span>  Name:</span>
        <input onChange={(event) => {
          setStateName(() => event.target.value)
        }}></input>
        <span>  Description:</span>
        <input onChange={(event) => {
          setStateDescription(() => event.target.value)
        }}></input>
        <span>  Image:</span>
        <input onChange={(event) => {
          setStateImage(() => event.target.value)
        }}></input>
      </div>

      <div>
        <span>Search: </span>
        <input onChange={(event) => {
            setSearchState(() => event.target.value)
        }}></input>
      </div>

    </div>



    <ul>
      {
        newlist.map((docu: any) => {
          return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", border: "1px solid black", width: "60%" }}>
              <Item key={docu.id} id={docu.id} name={docu.data().name} description={docu.data().description}></Item>
              <img src={docu.data().image} width={200} height={200} alt="No Image"></img>
              <button onClick={async () => {
                await deleteDoc(doc(database, "itemlist", docu.id))
                setTimeout(() => window.location.reload(), 1000)
              }}>Delete</button>
              <button onClick={async () => {
                if (editState == 0) {
                  setEditState(() => docu.id)
                } else {
                  setDoc(doc(database, "itemlist", docu.id), { name: stateEditName, description: stateEditDescription, image: stateEditImage })
                  setTimeout(() => window.location.reload(), 1000)
                }
              }}>{editState == docu.id ? "Confirm" : "Edit"}</button>
              {editState == docu.id ? <>
                <span>Name:</span><input onChange={(event) => {
                  setStateEditName(() => event.target.value);
                }}></input>
                <span>Description:</span><input onChange={(event) => {
                  setStateEditDescription(() => event.target.value);
                }}></input>
                <span>Image:</span><input onChange={(event) => {
                  setStateEditImage(() => event.target.value)
                }}></input>
              </> : <></>}
            </div>
          )
        })
      }
    </ul>
  </>)
}