"use client"
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { ClientShow } from "@/components/page/index";

type IconProps = {
	className?: string;
	style?: any;
	icon: any;
	id?: string;
	filled?: boolean;
};

export const Icon = ({ className, style, id, filled, icon }: IconProps) => {
	// const [isClientShow, setIsClientShow] = useState(false);
	// useEffect(() => setIsClientShow(true), []);
	// if (!isClientShow) return <></>;
	return (
		<span id={id} className={clsx("cottage-icon", className, filled ? "fill" : "")} style={style}>
			{/* <SvgIcon /> */}
			{icon}
		</span>
	)
};
