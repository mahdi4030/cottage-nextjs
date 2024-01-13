import clsx from "clsx";
import Link from "next/link";
import React from "react";

// type ButtonProps = {
// 	className?: string;
// 	href?: string | null;
// 	style?: string | Array<any>;
// 	target?: string;
// 	type?: string;
// 	size?: string;
// 	disabled?: boolean;
// 	onClick?: () => void;
// 	icon?: React.ReactNode;
// 	children?: React.ReactNode;
// };

export const Button = (props: any/*ButtonProps*/) => {
	const {
		className = "",
		href = null,
		style = "",
		target = "_self",
		type = "primary",
		size = "base",
		disabled: isDisabled = false,
		onClick: handleClick,
	} = props;

	const getTypeClasses = () => {
		switch (type) {
			case "secondary":
				return isDisabled ? ["bg-forrest-200"] : ["bg-forrest-700", "hover:bg-forrest-900"];
			case "line":
				return isDisabled
					? ["bg-gray-100", "!text-green-700", "border-solid", "border", "border-gray-500"]
					: ["bg-white", "hover:bg-gray-100", "!text-green-700", "border-solid", "border", "border-border"];
			case "transparent":
				return isDisabled ? ["!text-gray-400"] : ["bg-transparent", "hover:bg-green-50", "!text-green-700"];
			case "logo":
				return isDisabled
					? ["bg-gray-100", "text-green-700", "border-solid", "border", "border-gray-500", "shadow-none"]
					: ["bg-white", "hover:bg-gray-100", "text-green-700", "border-solid", "border", "border-gray-300", "py-1", "shadow-none"];
			case "warning":
				return ["bg-rose-600", "hover:bg-red-700"];
			default:
				return isDisabled ? ["bg-green-200"] : ["bg-green-700", "hover:bg-green-900"];
		}
	};

	// refactor to swtich case
	const getSizeClasses = () => {
		if (size === "base") return ["px-8", "py-2", "h-12", "text-base", "md:text-lg"];

		if (size === "large") return ["h-12", "px-8", "py-4", "md:h-[3.2rem]", "text-lg", "md:text-xl"];

		if (size === "small") return ["px-5", "py-2", "h-9", "text-base"];

		return [];
	};

	const ButtonContent = () => (
		<div
			className={clsx(
				"focus:outline-none text-white flex items-center justify-center rounded-lg focus:border-transparent ring-transparent focus:ring-transparent focus:ring-0 font-semibold",
				style,
				...getTypeClasses(),
				...getSizeClasses(),
			)}
		>
			{!!props.icon && <div className="button-icon">{props.icon}</div>}
			{props.children}
		</div>
	);

	if (href)
	return (
		<Link className={className} href={href} target={target}>
			<ButtonContent />
		</Link>
	);

	if (!handleClick) {
		return (
			<button className={className} disabled={isDisabled}>
				<ButtonContent />
			</button>
		);
	}
	else {
		return (
			<button className={className} disabled={isDisabled} onClick={handleClick}>
				<ButtonContent />
			</button>
		);
	}
};
