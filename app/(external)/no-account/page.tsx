import { BaseButton, ElementsCard } from "@/components";

export default function Partnerships() {

    return (
        <div>
            <div className="w-screen flex flex-col px-4">
                <section className="w-full">
                    <div className="flex flex-col mt-40 container w-full m-auto items-center text-left z-10 xl:max-w-6xl pb-20">
                        <ElementsCard className="flex text-center md:p-12 shadow-md bg-white rounded-xl w-full max-w-5xl items-center">
                            <h2 className="pb-8">
                                Hmmm...
                                <br />
                                We don't have an account for that email
                            </h2>
                            <div className="text-forrest-700 text-lg md:text-xl max-w-2xl">That email is not associated with a Cottage account.</div>
                            <div className="text-forrest-700 text-lg md:text-xl max-w-2xl pt-4">
                                If you think something is wrong, reach out to us at<b> </b>
                                <a className="text-green-700 underline" href="mailto:support@energybycottage.com">support@energybycottage.com</a>
                            </div>
                            <div className="flex items-center justify-center w-full pt-8">
                                <BaseButton href="/onboarding/start" size="large" type="primary" className="w-full md:w-60">
                                    Sign Up
                                </BaseButton>
                            </div>
                        </ElementsCard>
                    </div>
                </section>
            </div>
        </div>
    );
}
