import clsx from "clsx";

type CardProps = {
	className?: string;
	cardTitle?: string;
	cardSubTitle?: string;
	header?: React.ReactNode;
	children: React.ReactNode;
};

export const Card = (props: CardProps) => {
	const { className, cardTitle = "", cardSubTitle = "" } = props;

	return (
		<div className={clsx("bg-white border border-border rounded-xl p-6 shadow flex flex-col", className)}>
			{!!cardTitle && !!cardSubTitle && (
				<div className="flex flex-row justify-between items-center">
					<div className="flex flex-col pb-2">
						{!!cardTitle && <div className="text-xl font-bold text-forrest">{cardTitle}</div>}

						{!!cardSubTitle && <div className="text-sm text-textblack/80 pt-1">{cardSubTitle}</div>}
					</div>

					<div>{props.header}</div>
				</div>
			)}

			{props.children}
		</div>
	);
};
