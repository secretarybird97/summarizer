import { GitHubLogoIcon } from "@radix-ui/react-icons";

export default function Footer() {
  return (
    <footer className="w-full border-t py-2">
      <div className="flex justify-between items-center mx-4">
        <p className="font-bold font-serif text-NavText">© 2024 Summarizer.</p>
        <a
          href="https://github.com/secretarybird97/summarizer"
          target="_blank"
          rel="noopener noreferrer"
          className="text-NavText hover:text-gray-600"
          aria-label="GitHub"
        >
          <GitHubLogoIcon className="w-6 h-6" />
        </a>
      </div>
    </footer>
  );
}
