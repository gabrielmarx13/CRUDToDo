"use client";

export default function Item({id, name, description}: any) {
    return (<li>
        <div>{"ID: " + id}</div>
        <div>{"Name: " + name}</div>
        <div>{"Description: " + description}</div>
    </li>)
}