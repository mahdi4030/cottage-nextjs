import clsx from "clsx";

import { Card } from './Card';

type Onboardingcard = {
    className?: string;
    children: React.ReactNode;
}

export const OnboardingCard = (props: Onboardingcard) => {
	return (
		<Card className={clsx("mt-4 max-w-5xl w-full items-center px-4 md:p-8", props.className)}>
            {props.children}
        </Card>
	);
};
