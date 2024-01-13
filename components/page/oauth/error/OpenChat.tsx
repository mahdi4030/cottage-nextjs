"use client";
import { AppStore, ResidentStore } from "@/store";
import { useIntercom } from "react-use-intercom";
export default function OpenChat() {
    const { resident } = ResidentStore();
    const { user } = AppStore();
    const { update, showNewMessage } = useIntercom();
    const openChat = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        update({
            email: user.email,
            name: resident.firstName + " " + resident.lastName,
        });
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        showNewMessage("I am having issues connecting my utility account to Cottage.");
    }
    return (
        <a className="underline text-green-700 font-semibold cursor-pointer" onClick={openChat}>open up a chat</a>
    )
}