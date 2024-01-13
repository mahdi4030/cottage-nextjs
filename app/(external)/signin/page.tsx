import { ElementsCard } from "@/components";
import Link from 'next/link';
import Main from '@/components/page/signin/Main';

export default function SignIn() {

	return (
		<div className="w-screen flex flex-col">
			<section className="w-full">
				<div className="flex flex-col mt-28 container w-full m-auto items-center text-left z-10 xl:max-w-6xl pb-20">
					<ElementsCard className="flex flex-col text-center justify-center items-center md:p-12 max-w-xl w-full">
						<h2 className="pb-8">Sign In</h2>
						<Main />
						<div className="text-green-700 mt-8 text-xl font-semibold max-w-2xl underline">
							<Link
								className="text-center pt-6 text-green-700 underline text-lg font-semibold"
								href={{ pathname: "/forgot-password" }}
							>
								Forgot Password?
							</Link>
						</div>
					</ElementsCard>
				</div>
			</section>
		</div>
	);
}
