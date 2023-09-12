/*import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, HomeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const navigation = [
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-blue-600">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <span className="sr-only">Home</span>
          <Link href="/" className="-m-1.5 p-1.5 cursor-pointer">
            <HomeIcon
              className="h-8 w-auto text-white cursor-pointer"
              aria-hidden="true"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-blue-300"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              <a className="text-sm font-semibold leading-6 text-white">
                {" "}
                {item.name}
              </a>
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end"></div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <span className="sr-only">Home</span>
            <Link href="/" className="-m-1.5 p-1.5">
              <HomeIcon
                className="h-8 w-auto text-white cursor-pointer"
                aria-hidden="true"
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
            <Link key={item.name} href={item.href}>
              <a className="text-sm font-semibold leading-6 text-white">
                {" "}
                {item.name}
              </a>
            </Link>
                ))}
              </div>
              <div className="py-6"></div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
*/
import Link from "next/link";
import { Dialog } from "@headlessui/react";

export default function Header() {
  const navigation = [
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
  ];
  return (
    <header className="bg-blue-600">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <Dialog
          as="div"
          className="lg:hidden"
          open={true}
          onClose={() => {
            alert("hello");
          }}
        >
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <span className="sr-only">Home</span>
              <Link href="/" className="-m-1.5 p-1.5">
                Home
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => {
                  console.log("close");
                }}
              >
                <span className="sr-only">Close menu</span>
                icon
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <a className="text-sm font-semibold leading-6 text-white">
                        {" "}
                        {item.name}
                      </a>
                    </Link>
                  ))}
                </div>
                <div className="py-6"></div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
        <div className="flex lg:flex-1">
          <span className="sr-only">Home</span>
          <Link href="/" className="-m-1.5 p-1.5 cursor-pointer">
            Home
          </Link>
        </div>
      </nav>
    </header>
  );
}
