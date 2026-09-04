"use client";

import { useState, useSyncExternalStore } from "react";
import { supabase } from "@/lib/supabase";
import { VoteOption } from "@/lib/poll";
import { getSnapshot, getServerSnapshot, subscribe, setVote } from "@/lib/voteStorage";
import VoteButtons from "./VoteButtons";
import ResultsChart from "./ResultsChart";

export default function PollApp() {
  const storedVote = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [submitting, setSubmitting] = useState<VoteOption | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleVote(option: VoteOption) {
    setError(null);
    setSubmitting(option);
    const { error: insertError } = await supabase.from("votes").insert({ option });
    setSubmitting(null);

    if (insertError) {
      setError("Something went wrong submitting your vote. Please try again.");
      return;
    }

    setVote(option);
  }

  if (storedVote) return <ResultsChart />;

  return <VoteButtons onVote={handleVote} submitting={submitting} error={error} />;
}
