"use client";
import Header from "../Header";
import Footer from "../Footer";
import { useTranslations } from "next-intl";
import HeroSection from "../components/corporate_fitness/HeroSection";
import { BenefitSection } from "../components/corporate_fitness/BenefitSection";
import NetworkSection from "../components/corporate_fitness/NetworkSection";
import BenefitsForCompany from "../components/corporate_fitness/BenefitsForCompany";
import DynamicList from "../components/corporate_fitness/DynamicList";
export default function Companies({ params: { locale } }) {
  //  unstable_setRequestLocale(locale);
  const t = useTranslations("HomePage");
  return (
    <>
      <Header />
      <HeroSection></HeroSection>
      <BenefitSection></BenefitSection>
      <NetworkSection></NetworkSection>
      <BenefitsForCompany></BenefitsForCompany>
      <DynamicList></DynamicList>
      <Footer />
    </>
  );
}
