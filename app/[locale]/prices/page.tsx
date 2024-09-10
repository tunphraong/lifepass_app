"use client";
import Header from "../Header";
import Footer from "../Footer";
import { useTranslations } from "next-intl";
import { PricingIntroduction } from "../PricingIntro";

export default function HeroTitle({ params: { locale } }) {
  //  unstable_setRequestLocale(locale);
  const t = useTranslations("HomePage");
  return (
    <>
      <Header />
        <PricingIntroduction></PricingIntroduction>
      <Footer />
    </>
  );
}
