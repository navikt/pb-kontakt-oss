import { Normaltekst } from "nav-frontend-typografi";
import React from "react";
import { useStore } from "../../providers/Provider";
import { Kanal } from "../../types/kanaler";
import { LocaleBlockContent } from "../../components/sanity-blocks/LocaleBlockContent";
import { NavContentLoader } from "../../components/content-loader/NavContentLoader";
import { useLocaleString } from "../../utils/sanity/useLocaleString";

type Props = {
  kanal: Kanal;
  visHvisStengt?: boolean;
  children: JSX.Element;
};

export const KanalVisning = ({ kanal, visHvisStengt, children }: Props) => {
  const [{ channels }] = useStore();
  const localeString = useLocaleString();

  if (!channels.isLoaded) {
    return <NavContentLoader lines={3} />;
  }

  const channelProps = channels.props[kanal];

  const { answer_time, status, description } = channelProps;
  const svartid = localeString(answer_time);
  const closed = status && status.closed;
  const closedMsg = status && status.message;

  return (
    <>
      {svartid && !closed && (
        <Normaltekst className="svartid">
          {svartid}
        </Normaltekst>
      )}
      {description && <LocaleBlockContent localeBlock={description} />}
      {closed && <LocaleBlockContent localeBlock={closedMsg} />}
      {(!closed || visHvisStengt) && children}
    </>
  );
};
