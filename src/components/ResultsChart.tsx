"use client";

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { POLL_CHOICES, VoteOption } from "@/lib/poll";

type Counts = Record<VoteOption, number>;

const emptyCounts: Counts = {
  amazing: 0,
  wonderful: 0,
  mumtaz: 0,
  mnee7: 0,
};

export default function ResultsChart() {
  const [counts, setCounts] = useState<Counts>(emptyCounts);
  const votesById = useRef(new Map<string, VoteOption>());

  useEffect(() => {
    let cancelled = false;

    function recompute() {
      const next: Counts = { ...emptyCounts };
      for (const option of votesById.current.values()) {
        next[option] += 1;
      }
      if (!cancelled) setCounts(next);
    }

    async function loadInitial() {
      const { data } = await supabase.from("votes").select("id, option");
      if (cancelled || !data) return;
      for (const row of data) {
        votesById.current.set(row.id, row.option as VoteOption);
      }
      recompute();
    }

    const channel = supabase
      .channel("votes-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "votes" },
        (payload) => {
          const row = payload.new as { id: string; option: VoteOption };
          votesById.current.set(row.id, row.option);
          recompute();
        }
      )
      .subscribe();

    loadInitial();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, []);

  const total = POLL_CHOICES.reduce((sum, choice) => sum + counts[choice.option], 0);
  const maxVotes = Math.max(...POLL_CHOICES.map((choice) => counts[choice.option]));
  const leadingOption =
    maxVotes > 0
      ? POLL_CHOICES.find((choice) => counts[choice.option] === maxVotes)?.option
      : null;

  return (
    <div className="fadeIn">
      <h1 className="resultsHeading">Here&rsquo;s what everyone said</h1>
      <p className="resultsSubtext">
        {total === 0
          ? "No votes yet — you're the first."
          : `${total} ${total === 1 ? "vote" : "votes"} so far`}
      </p>

      <div className="bars">
        {POLL_CHOICES.map((choice) => {
          const voteCount = counts[choice.option];
          const percentage = total > 0 ? Math.round((voteCount / total) * 100) : 0;
          const isLeading = choice.option === leadingOption;

          return (
            <div className="barRow" key={choice.option}>
              <div className="barLabelRow">
                <span
                  className="barLabel"
                  lang={choice.lang === "ar" ? "ar" : undefined}
                  dir={choice.lang === "ar" ? "rtl" : undefined}
                >
                  {choice.label}
                </span>
                <span className="barMeta">
                  {percentage}% · {voteCount}
                </span>
              </div>
              <div
                className="barTrack"
                role="progressbar"
                aria-valuenow={percentage}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={choice.label}
              >
                <div
                  className={`barFill${isLeading ? " leading" : ""}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
