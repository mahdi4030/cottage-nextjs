import { FaqBody } from "@/components";
import { OpenChat } from '@/components/page/index/faqs';

export default function Faqs() {
	return (
		<div className="w-screen flex flex-col">
			<section className="w-full bg-tan-500">
				<div className="flex flex-col mt-36 container w-full m-auto items-center text-left z-10 xl:max-w-6xl px-4 md:px-0 pb-12">
					<div className="flex flex-col text-center justify-center items-center">
						<h1 className="pb-8">Questions?</h1>
						<div className="text-lg md:text-xl leading-tight max-w-3xl pb-6">
							We know electricity and utilities can be complicated. We're here to help.
						</div>
						<div className="flex flex-col pt-4 md:px-16 text-center">
							<p className="text-lg md:text-xl">Give us a call at <span className="text-green-700">(646) 847-7885</span></p>
							<p className="py-2 text-lg md:text-xl">or</p>
							<OpenChat />
						</div>
					</div>
				</div>
			</section>
			<section className="bg-tan-200 w-full py-12 pb-20">
				<div className="flex flex-col container xl:max-w-6xl px-6 lg:px-0 m-auto items-center justify-center">
					<div className="flex flex-col py-8 max-w-3xl mx-auto text-left w-full">
						<h2 className="py-4 text-center">Common Questions</h2>
							<FaqBody />
					</div>
				</div>
			</section>
		</div>
	);
}
