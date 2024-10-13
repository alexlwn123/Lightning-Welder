import Github from "./icons/Github";

export function Footer() {
  return (
    <div className="flex flex-col items-center justify-center py-8">
      <footer className="flex items-center gap-2 font-mono text-3xl">
      FOSS
      <a
        href="https://github.com/alexlwn123/lastpaywins"
          target="_blank"
          rel="noreferrer"
        >
          <Github />
        </a>
      </footer>
    </div>
  );
}
