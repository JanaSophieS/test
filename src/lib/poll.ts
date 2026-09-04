export type VoteOption = "amazing" | "wonderful" | "mumtaz" | "mnee7";

export interface PollChoice {
  option: VoteOption;
  label: string;
  lang: "en" | "ar";
}

export const POLL_CHOICES: PollChoice[] = [
  { option: "amazing", label: "Amazing", lang: "en" },
  { option: "wonderful", label: "Wonderful", lang: "en" },
  { option: "mumtaz", label: "ممتاز", lang: "ar" },
  { option: "mnee7", label: "منيح", lang: "ar" },
];

export const VOTE_STORAGE_KEY = "alsama_lavinia_poll_vote";
