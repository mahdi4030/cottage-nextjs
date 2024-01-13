"use client";
import { useIntercom } from "react-use-intercom";

export default function OpenChat() {
    const { showNewMessage } = useIntercom();

    const openChat = () => {
        showNewMessage("I'd like a little more help understanding Cottage...");
    }
    return (
        <a className="text-green-700 underline cursor-pointer font-semibold" onClick={openChat}>Open up a chat</a>
    )
}