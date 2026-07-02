import { EMAIL } from "@/lib/constant";

type Props = {
  title: string;
  descriptions: string[];
};

const links = [
  {
    label: "GitHub",
    url: "https://github.com/kanaru-ssk",
  },
  {
    label: "LinkedIn",
    url: "https://www.linkedin.com/in/kanaru-ssk/",
  },
];

export function HomeLayout({ title, descriptions }: Props) {
  return (
    <>
      <div class="profile">
        <img
          alt="avatar"
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
        {links.map((link) => (
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
