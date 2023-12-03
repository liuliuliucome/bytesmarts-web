import { usePathname } from "next/navigation";
import { FC, useState } from "react";
import { isExternalUrl } from "../../utils/helpers";
import { Icon, IconName } from "./Icon";
import { Label } from "./Label";
import { Logo } from "./Logo";
import { A } from "./A";
import { ColorSchemeSwitcher } from "./ColorSchemeSwitcher";
import IconFont from "./IconFont";
import { LangSwitcher } from "./LangSwitcher";

const navLinks: Array<{ label: string; url: string }> = [
  { label: "Documentation", url: "/" },
  //
  // Removing this temporarily, until it is more active.
  { label: "Blogs", url: "/blog" },
  //
  // NOTE until we have a proper example overview page and multiple examples, link directly to Next.js example
  // { label: "Examples", url: "/examples/nextjs" },
];

const iconLinks: Array<{ label: string; icon: IconName; url: string }> = [
  {
    label: "Github",
    icon: "github",
    url: "https://github.com/contentlayerdev/contentlayer",
  },
  { label: "Discord", icon: "discord", url: "https://discord.gg/rytFErsARm" },
];

const NavLink: FC<{
  label?: string;
  hideLabel?: boolean;
  icon?: IconName;
  url: string;
}> = ({ label, hideLabel = false, icon, url }) => {
  const pathname = usePathname();
  const active = pathname.split("/")[1] == url.replace("/", "");

  return (
    <A
      href={url}
      className={`group flex h-8 items-center rounded-md bg-transparent px-3 text-sm font-medium leading-none ${
        active
          ? "bg-violet-50 text-violet-900 dark:bg-violet-500/20 dark:text-violet-50"
          : "text-slate-600 hover:bg-gray-50 hover:text-slate-700 dark:text-slate-300 dark:hover:bg-gray-900 dark:hover:text-slate-200"
      }`}
      target={isExternalUrl(url) ? "_blank" : undefined}
      rel={isExternalUrl(url) ? "noreferrer" : undefined}
    >
      {icon && (
        <span className="block w-5 text-slate-400 group-hover:text-slate-500 dark:text-slate-500 dark:group-hover:text-slate-400">
          <Icon name={icon} />
        </span>
      )}
      {label && <span className={hideLabel ? "sr-only" : ""}>{label}</span>}
    </A>
  );
};

export const SearchButton: FC<{ showShortcut?: boolean }> = ({
  showShortcut = true,
}) => {
  return (
    <button
      data-testid="SearchButton"
      aria-label="Search"
      className="flex h-8 cursor-text items-center rounded-md border border-gray-200 bg-gray-50 px-2 text-sm hover:border-gray-300 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700 dark:hover:bg-gray-800"
    >
      <span className="mr-2 block w-3">
        <Icon name="search" />
      </span>
      <span className="mr-8 text-slate-400 dark:text-slate-500">Search...</span>
      {showShortcut && <Label text="⌘K" />}
    </button>
  );
};

export const MainNavigation = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed z-50 w-full border-b border-gray-200 bg-secondary dark:border-none">
      <div className="mr-auto flex h-16 w-full max-w-screen-2xl items-center justify-between px-4 md:px-8 lg:px-16">
        <div className="flex items-center space-x-2.5">
          <A
            href="/"
            className="flex items-center space-x-2.5 font-bold text-slate-800 no-underline dark:text-text-primary"
          >
            <Logo />
            <span className="-mt-0.5">Bytesmarts-web</span>
          </A>
        </div>
        <div className="inline-flex lg:hidden">
          <ColorSchemeSwitcher />
          <LangSwitcher />
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen(!open)}
            className="flex h-8 w-8 items-center justify-end text-text-primary dark:text-slate-300"
          >
            <span className="inline-block w-4">
              <IconFont type={open ? "icon-close" : "icon-menu"} />
            </span>
          </button>
          {open && (
            <div className="fixed inset-0 top-[65px] z-50 h-screen bg-gray-950/10 pb-20 backdrop-blur-lg backdrop-filter dark:bg-gray-950/50">
              <nav className="absolute right-0 h-full divide-y divide-gray-200 border-l border-gray-200 bg-white p-8 dark:divide-gray-800 dark:border-gray-800 dark:bg-gray-950">
                <div className="flex flex-col items-end space-y-2 pb-8">
                  {/* <div className="mb-2">
                    <SearchButton showShortcut={false} />
                  </div> */}
                  {navLinks.map(({ label, url }, index) => (
                    <NavLink
                      key={index}
                      label={label}
                      url={url}
                      icon={isExternalUrl(url) ? "external-link" : undefined}
                    />
                  ))}
                </div>
              </nav>
            </div>
          )}
        </div>
        <nav className="hidden items-center divide-x divide-gray-200 text-text-primary dark:divide-gray-800 lg:flex">
          <div className="flex items-center pr-2 lg:space-x-4 lg:pr-8">
            {navLinks.map(({ label, url }, index) => (
              <NavLink
                key={index}
                label={label}
                url={url}
                icon={isExternalUrl(url) ? "external-link" : undefined}
              />
            ))}
            {/* <div className="px-3">
              <SearchButton />
            </div> */}
          </div>
          <ColorSchemeSwitcher />
          <LangSwitcher />
        </nav>
      </div>
    </header>
  );
};
