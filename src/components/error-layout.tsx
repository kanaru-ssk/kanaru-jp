type Props = {
	title: string;
	messages: string[];
};

export function ErrorLayout({ title, messages }: Props) {
	return (
		<>
			<div class="profile">
				<img
					alt=""
					class="avatar"
					decoding="sync"
					fetchpriority="high"
					height={256}
					loading="eager"
					src="/avatar-sad.webp"
					width={256}
				/>
				<h1>{title}</h1>
			</div>

			<p>
				{messages.map((message, i) => (
					<>
						{i !== 0 && <br />}
						{message}
					</>
				))}
			</p>
			<p>
				<a href="/">Return Home</a>
			</p>
		</>
	);
}
