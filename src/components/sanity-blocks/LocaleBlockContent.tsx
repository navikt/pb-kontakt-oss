import React from "react";
import BlockContent from "@sanity/block-content-to-react";
import { serializers } from "../../utils/sanity/serializers";
import { useStore } from "../../providers/Provider";
import { LocaleBlock } from "../../utils/sanity/common-types";
import { defaultLocale } from "../../utils/locale";

type Props = {
  localeBlock: LocaleBlock | undefined
};

export const LocaleBlockContent = ({ localeBlock }: Props) => {
  const [{ locale }] = useStore();
  if (!localeBlock) {
    return null;
  }

  const blocks = localeBlock[locale] || localeBlock[defaultLocale];

  return (blocks
      ? <BlockContent blocks={blocks} serializers={serializers} />
      : null
  );
};
