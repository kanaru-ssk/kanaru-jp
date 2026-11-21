import { EMAIL, SOCIAL_LINKS } from "../lib/constant";

type Props = {
	title: string;
	descriptions: string[];
};

export function HomeLayout({ title, descriptions }: Props) {
	return (
		<>
			<div class="profile">
				<img
					alt={title}
					class="avatar"
					decoding="sync"
					fetchpriority="high"
					height={256}
					loading="eager"
					src="/avatar.webp"
					width={256}
				/>
				<h1>{title}</h1>
			</div>

			<p class="links">
				{SOCIAL_LINKS.map((link) => (
					<a href={link.url} rel="noopener noreferrer" target="_blank">
						{link.label}
					</a>
				))}
				<a href={`mailto:${EMAIL}`}>{EMAIL}</a>
			</p>

			<p>
				{descriptions.map((description, i) => (
					<>
						{i !== 0 && <br />}
						{description}
					</>
				))}
			</p>
		</>
	);
}
