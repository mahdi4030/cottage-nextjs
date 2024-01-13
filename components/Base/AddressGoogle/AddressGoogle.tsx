"use client"

import { useState, useRef, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import clsx from "clsx";

import { AppStore } from "@/store";
import styles from '@/assets/scss/pages/input.module.scss';

type AddressGoogleProps = {
	modelValue: string;
	inputName: string;
	inputClass?: string;
	inputControl?: string;
	validAddressProp?: string;
	returnFullAddress: boolean;
	hasErrors?: boolean;
	setAddressComponents: (...args: any[]) => void;
	children: React.ReactNode;
	placeholder?: string;
	onInputChange: (value: string) => void;
};

export const AddressGoogle:React.FC<AddressGoogleProps> = (
	{ 
		modelValue, 
		inputName, 
		inputClass, 
		inputControl, 
		validAddressProp, 
		returnFullAddress, 
		hasErrors, 
		setAddressComponents, 
		children,
		placeholder, 
		onInputChange = (value: string) => {}
	}
) => {
	// const { modelValue, inputName, inputClass, inputControl, validAddressProp, returnFullAddress, hasErrors, setAddressComponents, placeholder, onInputChange } = props;
	const [inputValue, setInputValue] = useState<string>(modelValue);
	const [firstRender, setFirstRender] = useState(true);
	const autocompleteInput = useRef(null);

	const { locationLoaded, location, fetch } = AppStore();

	useEffect(() => {
		onInputChange(inputValue);
	}, [inputValue])


	useEffect(() => {
		async function toUseAsync() {
			const loader = new Loader({
				apiKey: "AIzaSyApdZHm51raPUiM-K0muDBQq_OAWxMi9Pk",
				version: "weekly",
				libraries: ["places"],
			});
	
			let lat = 40.7128;
			let lng = -74.006;
	
			if (!locationLoaded) {
				await fetch();
			}
			try {
				lat = location.latitude;
				lng = location.longitude;
			} catch (error) {
				console.error(error);
			}
	
			loader
				.load()
				.then((google: any) => {
					const center = { lat, lng };
					const defaultBounds = {
						north: center.lat + 2,
						south: center.lat - 2,
						east: center.lng + 2,
						west: center.lng - 2,
					};
	
					const autocomplete = new google.maps.places.Autocomplete(autocompleteInput.current, {
						types: ["address"],
						bounds: defaultBounds,
						strictBounds: false,
						componentRestrictions: { country: "us" },
					});
	
					autocomplete.addListener("place_changed", () => {
						const place = autocomplete.getPlace();
						const ac = place.address_components;
	
						if (ac !== undefined) {
							const streetNum = ac.find((comp: any) => comp.types.includes("street_number"));
							if (streetNum !== undefined) {
								const streetName = ac.find((comp: any) => comp.types.includes("route"));
								let city = ac.find((comp: any) => comp.types.includes("sublocality_level_1"));
								if (city === undefined) {
									city = ac.find((comp: any) => comp.types.includes("locality") && comp.types.includes("political"));
								}
								const state = ac.find((comp: any) => comp.types.includes("administrative_area_level_1"));
								const zip = ac.find((comp: any) => comp.types.includes("postal_code"));

								const selectedAddressComps = {
									place_id: place.place_id,
									streetNum: streetNum.short_name,
									streetName: streetName.short_name,
									city: city.short_name,
									state: state.long_name,
									zip: zip.short_name,
								} as any;
	
								if (returnFullAddress) {
									setInputValue(place.formatted_address);
									selectedAddressComps.formatted_address=place.formatted_address;
								} else {
									setInputValue(streetNum.short_name + " " + streetName.short_name);
									selectedAddressComps.formatted_address=streetNum.short_name + " " + streetName.short_name;
								}
								setAddressComponents(selectedAddressComps);
							} else {
								const inputtedAddress = (document.getElementById(inputName) as HTMLInputElement).value;
								const addressComps = inputtedAddress.split(",");
								const streetNum = addressComps[0].split(" ")[0];
								const streetName = addressComps[0].split(" ")[1];
	
								let city = ac.find((comp: any) => comp.types.includes("sublocality_level_1"));
								if (city === undefined) {
									city = ac.find((comp: any) => comp.types.includes("locality") && comp.types.includes("political"));
								}
								if (city === undefined) {
									city = addressComps[1];
								}
	
								const state = ac.find((comp: any) => comp.types.includes("administrative_area_level_1"));
								const zip = ac.find((comp: any) => comp.types.includes("postal_code"));
	
								const selectedAddressComps = {
									place_id: place.place_id,
									streetNum,
									streetName,
									city: city.short_name,
									state: state.long_name,
									zip: zip?.short_name??"",
								} as any;
	
								if (returnFullAddress) {
									setInputValue(inputtedAddress);
									selectedAddressComps.formatted_address=inputtedAddress;
								} else {
									setInputValue(streetNum + " " + streetName);
									selectedAddressComps.formatted_address=streetNum + " " + streetName;
								}
								setAddressComponents(selectedAddressComps);
							}
						} else {
							setInputValue("");
							setAddressComponents({
								streetNum: "",
								streetName: "",
								city: "",
								state: "",
								zip: "",
							});
						}
					});
				})
				.catch((e: Error) => {
					console.error("FAILED TO LOAD", e);
				});
		}

		toUseAsync();
	}, []);

	return (
		<div className={clsx(inputClass, styles.inputGroup)}>
			<div className={clsx(inputControl, styles.inputControl)}>
				<input
					id={inputName}
					ref={autocompleteInput}
					value={inputValue}
					className={clsx(
						inputValue.length > 0 ? styles.filled : "",
						hasErrors ? "!border-rose-600 ring-2 ring-rose-600 !bg-rose-400/5" : ""
					)}
					placeholder={placeholder??""}
					onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
					onSubmit={(e) => e.preventDefault()}
					onChange={(e) => {setInputValue(e.target.value);}}
				/>
				<label htmlFor={inputName} className={hasErrors ? "!border-rose-600" : ""}>
					{children}
				</label>
			</div>
		</div>
	);
};
