"use client";

import clsx from "clsx";
import { useParams } from "next/navigation";
import { ChangeEvent, ReactNode, useTransition } from "react";
import { useRouter, usePathname } from "../../navigation";
import { Locale } from "../../types";
import {Link} from "../../navigation"
import { NEXT_BODY_SUFFIX } from "next/dist/lib/constants";
import styles from "./LocaleSwitcherSelect.module.css";

type Props = {
  children: ReactNode;
  defaultValue: string;
  label: string;
};

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
    //   router.replace(
    //     {
    //       pathname,
    //       params,
    //     },
    //     { locale: nextLocale }
    //   );
    router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    // <label
    //   className={clsx(
    //     "relative text-gray-400",
    //     isPending && "transition-opacity [&:disabled]:opacity-30"
    //   )}
    // >
    //   {/* <p className="sr-only">{label}</p> */}
    //   <select
    //     className="inline-flex appearance-none bg-transparent py-3 pl-2 pr-6"
    //     defaultValue={defaultValue}
    //     disabled={isPending}
    //     onChange={onSelectChange}
    //   >
    //     {children}
    //   </select>
    //   <span className="pointer-events-none absolute right-2 top-[8px]"></span>
    // </label>
    <label className={clsx(styles.wrapper, isPending && styles.pending)}>
      <select
        className={styles.select}
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
      <span className={styles.arrow}></span>
    </label>
  );
}
