import Link from "next/link";
import WhiteLogo from "@/assets/img/logo/cottage-logo-combined-white.svg";
import styles from "./ExternalFooter.module.scss";

export const ExternalFooter = () => (
	<footer className={styles.footer}>
		<div className="flex flex-row w-full justify-center items-center">
			<div className="container flex flex-row justify-between py-12 px-4 items-center">
				<div className="footer-logo">
					<Link href="/">
						<WhiteLogo height={52} width={197} />
					</Link>
				</div>
				<div className="flex flex-row flex-wrap justify-end px-4 space-y-1 md:px-0 md:space-x-12 md:space-y-0">
					<Link className="text-white text-base font-semibold" href="mailto:support@energybycottage.com">
						Contact
					</Link>
					<Link href="/partnerships" className="text-white text-base font-semibold">
						Partnerships
					</Link>
					<Link href="/terms-of-service" className="text-white text-base font-semibold">
						Terms of Service
					</Link>
					<Link href="/privacy-policy" className="text-white text-base font-semibold">
						Privacy Policy
					</Link>
					<Link
						className="text-white text-base font-semibold"
						target="_blank"
						rel="noopener noreferrer"
						href="https://blocksurvey.io/survey/1AM9tCqpoR1ARzaFRVQgwaDHc2d4L9623v/e54a1477-6072-493f-8621-4cbf8ef9f757/r/l"
					>
						Feedback
					</Link>
				</div>
			</div>
		</div>

		<div className="flex flex-col w-full bg-forrest-900 text-white items-center">
			<div className="container py-4 px-4">&copy; Cottage Energy, Inc. 2023</div>
		</div>
	</footer>
);
