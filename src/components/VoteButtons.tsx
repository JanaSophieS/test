"use client";

import { POLL_CHOICES, VoteOption } from "@/lib/poll";

interface VoteButtonsProps {
  onVote: (option: VoteOption) => void;
  submitting: VoteOption | null;
  error: string | null;
}

export default function VoteButtons({ onVote, submitting, error }: VoteButtonsProps) {
  return (
    <div className="fadeIn">
      <h1 className="heading">
        How are you finding <span className="accent">Lavinia&rsquo;s</span> session?
      </h1>

      {error && <p className="error">{error}</p>}

      <div className="choices">
        {POLL_CHOICES.map((choice) => (
          <button
            key={choice.option}
            type="button"
            className="choiceButton"
            lang={choice.lang === "ar" ? "ar" : undefined}
            dir={choice.lang === "ar" ? "rtl" : undefined}
            onClick={() => onVote(choice.option)}
            disabled={submitting !== null}
          >
            {choice.label}
          </button>
        ))}
      </div>
    </div>
  );
}
