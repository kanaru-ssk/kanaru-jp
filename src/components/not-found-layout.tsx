export function NotFoundLayout() {
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
          src="/avatar-sad.webp"
          width={256}
        />
        <h1>404 Not Found</h1>
      </div>

      <p>
        Sorry, we couldn’t find the page you were looking for.
        <br />
        It might have been moved or deleted.
      </p>
      <p>
        <a href="/"> Return Home </a>
      </p>
    </>
  );
}
