import { Kanal } from "../../../types/kanaler";
import { LocaleBlock, LocaleString } from "../common-types";

export type ChannelProps = {
  _id?: string;
  answer_time?: LocaleString;
  status?: {
    closed?: boolean;
    message?: LocaleBlock;
  }
  description?: LocaleBlock;
  preamble?: LocaleBlock;
};

export type Channels = {
  isLoaded: boolean;
  props: ChannelList;
};

export type ChannelList = { [key in Kanal]: ChannelProps };

export const forsideSanityId = "forsiden";

const initialProps = Object.values(Kanal).reduce((acc, kanal) =>
  ({ ...acc, [kanal]: {} }), {});

export const initialChannels = {
  isLoaded: false,
  props: initialProps
};

export const createCompleteChannelList = (channelProps: ChannelProps[]) =>
  Object.values(Kanal).reduce((acc, kanalId) =>
    ({...acc, [kanalId]: channelProps.find(cp => cp._id === kanalId) || {}}), {});
