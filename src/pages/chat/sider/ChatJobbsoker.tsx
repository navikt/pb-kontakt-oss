import React from "react";
import ChatTemaSideBase from "../ChatTemasideBase";
import { ChatTema, ChatTemaData } from "../../../types/chat";
import FormattedMsgMedParagrafer from "../../../components/intl-msg-med-paragrafer/FormattedMsgMedParagrafer";
import { apningsTider } from "../../../Config";

const chatTemaData: ChatTemaData = {
  tittelTekstId: "chat.jobbsoker.tittel",
  chatTema: ChatTema.Jobbsoker,
  apningstider: apningsTider.jobbsoker
};

const ChatJobbsoker = () => {
  return(
    <ChatTemaSideBase
      chatTemaData={chatTemaData}
    >
      <>
        <FormattedMsgMedParagrafer id={"chat.jobbsoker.ingress"} />
        <FormattedMsgMedParagrafer id={"chat.advarsel.personvern"} />
      </>
    </ChatTemaSideBase>
  );
};

export default ChatJobbsoker;
