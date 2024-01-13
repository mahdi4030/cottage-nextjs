import { BaseIcon, ElementsCard } from "@/components";

import LifesaverIcon from "@/assets/icons/lifesaver.svg";
import ChatIcon from "@/assets/icons/chat.svg";
import PaperPlaneIcon from '@/assets/icons/paper-plane.svg'
import SearchIcon from '@/assets/icons/search.svg'
import Link from "next/link";
export default function Support() {
    return (
        <ElementsCard className="items-center text-center lg:p-16 w-full">
            <BaseIcon icon={<LifesaverIcon />} className="min-w-fit text-6xl leading-4 pb-3" />
            <h2 className="py-4">We are here to help</h2>
            <div className="py-4 text-xl">Our crew is on standby for service and support</div>
            <div className="py-4 text-lg">
                Responses within 30 minutes
                <br />
                Monday-Friday
                <br />
                8:00AM — 6:00PM EST
                <br />
            </div>
            <div className="flex flex-col md:flex-row font-semibold pb-12 w-full justify-center py-8 space-y-8 md:space-y-0 md:space-x-10">
                <div className="flex flex-col w-72">
                    <BaseIcon icon={<ChatIcon />} className="m-auto min-w-fit text-5xl leading-4 pb-3" />
                    Chat
                    <Link className="block text-green-700 underline pt-2 text-xl" href="#">Start a Chat</Link>
                </div>
                <div className="flex flex-col w-72">
                    <BaseIcon icon={<PaperPlaneIcon />} className="m-auto min-w-fit text-5xl leading-4 pb-3" />
                    Email
                    <a className="block text-green-700 underline pt-2 text-xl" href="mailto:support@energybycottage.com">support@energybycottage.com</a>
                </div>
                <div className="flex flex-col w-72">
                    <BaseIcon icon={<SearchIcon />} className="m-auto min-w-fit text-5xl leading-4 pb-3" />
                    FAQs
                    <Link className="block text-green-700 underline pt-2 text-xl" href="#">Visit Help Center</Link>
                </div>
            </div>
            <div className="text-lg">
                If you are experiencing issues with your electricity, you will need to work with the utility company.
                <br />
                Visit our<b> </b>
                <Link className="text-green-700 underline mt-3 font-semibold" href="/app/services">services</Link><b> </b>
                to review your options.
            </div>
        </ElementsCard>
    );
}