"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { VOTE_STORAGE_KEY, VoteOption } from "@/lib/poll";
import VoteButtons from "./VoteButtons";
import ResultsChart from "./ResultsChart";

type View = "checking" | "vote" | "results";

export default function PollApp() {
  const [view, setView] = useState<View>("checking");
  const [submitting, setSubmitting] = useState<VoteOption | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const existingVote = window.localStorage.getItem(VOTE_STORAGE_KEY);
    setView(existingVote ? "results" : "vote");
  }, []);

  async function handleVote(option: VoteOption) {
    setError(null);
    setSubmitting(option);
    const { error: insertError } = await supabase.from("votes").insert({ option });
    setSubmitting(null);

    if (insertError) {
      setError("Something went wrong submitting your vote. Please try again.");
      return;
    }

    window.localStorage.setItem(VOTE_STORAGE_KEY, option);
    setView("results");
  }

  if (view === "checking") return null;

  if (view === "vote") {
    return <VoteButtons onVote={handleVote} submitting={submitting} error={error} />;
  }

  return <ResultsChart />;
}
