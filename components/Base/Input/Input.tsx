"use client";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { TiWarningOutline } from 'react-icons/ti';

import styles from '@/assets/scss/pages/input.module.scss';
import { userAgentFromString } from "next/server";

type InputProps = {
	inputValue?: string;
	inputName?: string;
	inputType?: string;
	inputClass?: string;
	inputControl?: string;
	subtext?: string;
	hasErrors?: boolean;
	showSubtext?: boolean;
  maxLength?: number;
  cleaveOptions?: Object;
  onChange: (value: string) => void;
  autocomplete?: string;
  children: React.ReactNode;
  action?: any;
};

export const Input = (props: InputProps) => {
	const {
		inputValue = "",
		inputName = "",
		inputType = "text",
    inputClass = "",
    inputControl = "",
		subtext = "",
		hasErrors = false,
		showSubtext = false,
		maxLength = 100,
    cleaveOptions = () => {},
    onChange = (value: string) => {},
    autocomplete = "",
    action = ""
	} = props;

  const [showClient, setShowClient] = useState(false);

  const handleChange = (e: { target: { value: string; }; }) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  useEffect(() => {
    setShowClient(true)
  }, []);

  if (!showClient) return <></>

	return (
		<div className={clsx(`flex-wrap`, inputClass, styles.inputGroup)}>
      <div className={clsx(inputControl, styles.inputControl)}>
        <input
          id={inputName}
          value={inputValue}
          type={inputType}
          className={clsx(inputValue.length > 0 ? styles.filled : '', hasErrors ? '!border-rose-600 ring-2 ring-rose-600 !bg-rose-400/5' : '')}
          placeholder=""
          autoComplete={autocomplete}
          onChange={handleChange}
        />
        <label htmlFor={inputName} className={clsx(hasErrors ? '!border-rose-600' : '')}>
          {props.children}
        </label>
        {action}
      </div>
      {showSubtext &&
        <div className={clsx("flex my-1", hasErrors ? 'text-rose-600' : '')}>
          {hasErrors && <span className="pr-2"><TiWarningOutline className="min-w-fit text-xl w-5 h-5" /></span>}
          { subtext }
        </div>
      }
    </div>
	);
};
