import { ElementsCard } from "@/components";
import Main from '@/components/page/forgot-password/Main';

export default function ForgotPassword() {
	return (
		<div className="w-screen flex flex-col">
			<section className="w-full">
				<div className="flex flex-col mt-40 container w-full m-auto items-center text-left z-10 xl:max-w-6xl pb-20">
					<ElementsCard className="flex text-center md:p-12 shadow-md bg-white rounded-xl max-w-2xl">
						<h2 className="pb-8">Forgot Password</h2>
						<div className="text-forrest-700 text-xl">
							Enter the email address for your account. A link will be sent to your email with further instructions.
						</div>
						<Main />
					</ElementsCard>
				</div>
			</section>
		</div>
	);
}
