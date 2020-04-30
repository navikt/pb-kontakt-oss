import { useStore } from "../../providers/Provider";
import { defaultLocale, Locale } from "../locale";

export const useLocaleString = () => {
  const [{ locale }] = useStore();

  return (text: { [key in Locale]: string } | undefined) => (text && (text[locale] || text[defaultLocale])) || "";
};
