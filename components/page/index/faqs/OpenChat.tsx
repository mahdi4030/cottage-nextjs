"use client";
import { useIntercom } from "react-use-intercom";

export default function OpenChat() {
    const { showNewMessage } = useIntercom();

    const openChat = () => {
        showNewMessage("I have a question about Cottage...");
    }
    return (
        <>
            <p className="text-green-700 underline font-bold text-lg md:text-xl cursor-pointer" onClick={openChat}>Open a Chat</p>
        </>
    )
}