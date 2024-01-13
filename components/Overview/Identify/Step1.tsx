"use client";

import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import Link from "next/link";
import { BaseBadge, BaseButton, BaseIcon, BaseInput, ElementsCard } from "@/components";
import ConfettiIcon from '@/assets/icons/confetti.svg'
import { AppStore, ElectricBillStore, OccupancyStore, PropertyStore, ResidentStore } from '@/store'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/db';

import HomeIcon from '@/assets/icons/home.svg';
import LoadingIcon from '@/assets/icons/loading.svg'
import GreenImpactIcon from '@/assets/icons/green-impact.svg'
import { monthAndYear } from '@/utils/format';
import { Listbox, Combobox, Transition } from '@headlessui/react';
import { list } from 'postcss';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid';

export const IdentityStep1 = () => {
	const { property } = PropertyStore();
	const { resident, isResidentIdentityComplete, setIsResidentIdentityComplete } = ResidentStore();
	const supabase = createClientComponentClient<Database>();

	const { user } = AppStore();
	const idTypes = [
		{ id: 1, name: "Driver's License" },
		{ id: 2, name: "Passport Number" },
		{ id: 3, name: "Public Assistance ID" },
	];

	const [dateOfBirth, setDateOfBirth] = useState("");
	const [hasDateOfBirthErrors, setHasDateOfBirthErrors] = useState(false);
	const [dateOfBirthErrorText, setDateOfBirthErrorText] = useState("Enter a valid birthday");
	const [identificationType, setIdentificationType] = useState(idTypes[0]);
	const [identificationNumber, setIdentificationNumber] = useState("");
	const [identificationOther, setIdentificationOther] = useState("");

	const isSubmitDisabled = useMemo(() => {
		if (dateOfBirth.length !== 10) {
			return true;
		} else {
			return (
				identificationType === "" ||
				identificationNumber === "" ||
				(identificationType.id === 1 && identificationOther === "")
			);
		}
	}, [dateOfBirth, identificationType, identificationNumber]);

	async function submitIdentityInfo() {
		setDateOfBirthErrorText("Enter a valid birthday");
		setHasDateOfBirthErrors(false);
		try {
			const birthdate = new Date(dateOfBirth);
			const ageDifMs = Date.now() - birthdate.getTime();
			const ageDate = new Date(ageDifMs); // miliseconds from epoch
			const age = Math.abs(ageDate.getUTCFullYear() - 1970);
			if (age < 18) {
				setHasDateOfBirthErrors(true);
				setDateOfBirthErrorText("Must be 18 years old");
				return;
			} else if (age > 100) {
				setHasDateOfBirthErrors(true);
				setDateOfBirthErrorText("Enter a valid birthday");
				return false;
			}
		} catch (error) {
			console.error(error);
		}
		const residentIdentityData = {
			identificationType: identificationType.name,
			identificationNumber: identificationNumber,
			identificationOther: identificationOther.name,
			dateOfBirth: dateOfBirth,
			cottageUserID: user?.id,
		};
		try {
			const { data, error } = await supabase.from("ResidentIdentity").upsert(residentIdentityData, { onConflict: "cottageUserID" });
			if (error) {
				console.error(error);
				return null;
			}
		} catch (error) {
			console.error(error);
		}
		setIsResidentIdentityComplete(true);
	}

	const states = [
		{ name: "Alabama" },
		{ name: "Alaska" },
		{ name: "Arizona" },
		{ name: "Arkansas" },
		{ name: "California" },
		{ name: "Colorado" },
		{ name: "Connecticut" },
		{ name: "Delaware" },
		{ name: "Florida" },
		{ name: "Georgia" },
		{ name: "Hawaii" },
		{ name: "Idaho" },
		{ name: "Illinois" },
		{ name: "Indiana" },
		{ name: "Iowa" },
		{ name: "Kansas" },
		{ name: "Kentucky" },
		{ name: "Louisiana" },
		{ name: "Maine" },
		{ name: "Maryland" },
		{ name: "Massachusetts" },
		{ name: "Michigan" },
		{ name: "Minnesota" },
		{ name: "Mississippi" },
		{ name: "Missouri" },
		{ name: "Montana" },
		{ name: "Nebraska" },
		{ name: "Nevada" },
		{ name: "New Hampshire" },
		{ name: "New Jersey" },
		{ name: "New Mexico" },
		{ name: "New York" },
		{ name: "North Carolina" },
		{ name: "North Dakota" },
		{ name: "Ohio" },
		{ name: "Oklahoma" },
		{ name: "Oregon" },
		{ name: "Pennsylvania" },
		{ name: "Rhode Island" },
		{ name: "South Carolina" },
		{ name: "South Dakota" },
		{ name: "Tennessee" },
		{ name: "Texas" },
		{ name: "Utah" },
		{ name: "Vermont" },
		{ name: "Virginia" },
		{ name: "Washington" },
		{ name: "West Virginia" },
		{ name: "Wisconsin" },
		{ name: "Wyoming" },
	];

	const [selectedState, setSelectedState] = useState(states[0]);
	const [query, setQuery] = useState("");

	const filteredStates = useMemo(() => {
		return query === ""
			? states
			: states.filter((state) => state.name.toLowerCase().replace(/\s+/g, "").includes(query.toLowerCase().replace(/\s+/g, "")));
	}, [query])

	return (
		<div>
			<p className="text-base text-textblack/80 mt-1">This will be used to register your utility account</p>
			<div className="bg-green-50 rounded-lg py-3 mt-2 leading-5 text-center">
				<span>This information is <b>never shared</b> and <b> we delete it</b> after completing registration. 🔐</span>
			</div>
			<div className="flex flex-col w-full pt-2 md:space-y-2">
				<div className="grid grid-cols-1 gap-x-2 sm:grid-cols-6 w-full">
					<div className="sm:col-span-2">
						<BaseInput
							inputValue={dateOfBirth}
							onChange={setDateOfBirth}
							inputClass="w-full flex text-left mt-2"
							inputName="dateOfBirth"
							inputControl="flex"
							hasErrors={hasDateOfBirthErrors}
							showSubtext={hasDateOfBirthErrors}
							subtext={dateOfBirthErrorText}
							cleaveOptions={{ date: true, datePattern: ['m', 'd', 'Y'] }}
						>Date of Birth (mm/dd/yyyy)</BaseInput>
					</div>
				</div>
				<div className="grid grid-cols-1 gap-x-2 sm:grid-cols-6 w-full z-10">
					<div className="sm:col-span-2">
						<Listbox value={identificationType} onChange={setIdentificationType}>
							<div className="relative mb-2">
								<Listbox.Button
									className="relative w-full cursor-default rounded-lg bg-white pl-4 pr-10 text-left focus:outline-none focus-visible:border-green-700 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-green-500 border-border border h-[3.2rem] leading-[3.35rem]"
								>
									<span className="text-lg text-textblack">{identificationType.name}</span>
									<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
										<ChevronUpDownIcon className="h-8 w-8 text-gray-400" aria-hidden="true" />
									</span>
								</Listbox.Button>

								<Transition
									leave-active-classname="transition duration-100 ease-in"
									leave-from-classname="opacity-100"
									leave-to-classname="opacity-0"
								>
									<Listbox.Options
										className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-3 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
									>
										{
											idTypes.map((idType) => (
												<Listbox.Option
													key={idType.name}
													value={idType}
												// as="template"
												>
													{
														({ active, selected }) => (
															<li
																className={clsx(
																	active ? 'bg-green-100/20 text-green-700 cursor-pointer' : 'text-textblack',
																	'relative select-none py-2 pl-10 pr-4',
																)}
															>
																<span className={clsx(selected ? 'font-semibold text-forrest-700' : 'font-normal', 'text-base md:text-lg')}>
																	{idType.name}</span>
																{
																	selected &&
																	<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
																		<CheckIcon className="h-5 w-5" aria-hidden="true" />
																	</span>
																}
															</li>
														)
													}
												</Listbox.Option>
											))
										}
									</Listbox.Options>
								</Transition>
							</div>
						</Listbox>
					</div>
					<div className="sm:col-span-2">
						<BaseInput inputValue={identificationNumber} onChange={setIdentificationNumber} inputName="identificationNumber" className="w-full">Number</BaseInput>
					</div>
					{
						identificationType.id === 1 &&
						<div className="sm:col-span-2">
							{/* <ClientOnly> */}
							{/* <template #fallback>
								<div className="w-full rounded-lg border border-border bg-gray-200 py-2 pl-3 pr-10 animate-pulse"></div>
							</template> */}
							<Combobox value={identificationOther} onChange={setIdentificationOther}>
								<div className="relative mb-2">
									<Combobox.Button className="flex">
										<Combobox.Input
											className="w-full rounded-lg border border-border bg-white py-2 pl-3 pr-10 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 md:text-xl text-lg h-12 text-forrest-700"
											displayValue={(state) => state?.name}
											onChange={(e) => setQuery(e.target.value)}
										/>
										<div
											className="absolute inset-y-1 right-1 flex items-center rounded-lg px-1 focus:outline-none bg-border/60 hover:bg-border"
										>
											<ChevronUpDownIcon className="h-8 w-8 text-gray-600" aria-hidden="true" />
										</div>
									</Combobox.Button>

									<Combobox.Options
										className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none md:text-lg text-base text-left"
									>
										{
											filteredStates.length === 0 && query !== '' &&
											<div
												className="relative cursor-default select-none py-2 px-4 text-gray-700"
											>
												Nothing found.
											</div>
										}
										{
											filteredStates.map((state, index) => (
												<Combobox.Option
													key={index}
													value={state}
												// as="template"
												>
													{
														(({ active, selected }) => (
															<li
																className={clsx(
																	'relative cursor-default select-none py-2 pl-4 pr-9',
																	active ? 'bg-green-700 text-white' : 'text-textblack',
																)}
															>
																<span className={clsx('block truncate', selected && 'font-semibold')}>
																	{state.name}
																</span>

																{
																	selected &&
																	<span
																		className={clsx(
																			'absolute inset-y-0 right-0 flex items-center pr-4',
																			active ? 'text-white' : 'text-indigo-600',
																		)}
																	>
																		<CheckIcon className="h-5 w-5" aria-hidden="true" />
																	</span>
																}
															</li>
														))
													}

												</Combobox.Option>
											))
										}

									</Combobox.Options>
								</div>
							</Combobox>
							{/* </ClientOnly> */}
						</div>
					}
				</div>
			</div>
			<div className="w-full flex flex-row justify-end pt-2">
				<BaseButton disabled={isSubmitDisabled} onClick={submitIdentityInfo}>Submit</BaseButton>
			</div>
		</div>
	);
}