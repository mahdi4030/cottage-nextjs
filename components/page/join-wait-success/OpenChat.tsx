"use client";
import { useIntercom } from "react-use-intercom";

export default function OpenChat() {
    const { showNewMessage } = useIntercom();

    const openChat = () => {
        showNewMessage("I have a question");
    }
    return (
        <p>
            <a className="underline text-green-700 font-semibold cursor-pointer" onClick={openChat}>Open a chat</a>
        </p>
    )
}