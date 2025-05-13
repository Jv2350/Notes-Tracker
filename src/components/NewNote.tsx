import React from "react";
import NoteForm from "./NoteForm";
import type { NoteData } from "../App";

type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
};

export default function NewNote({ onSubmit }: NewNoteProps) {
  return (
    <>
      <h1 className="mb-4">New Note</h1>
      <NoteForm onSubmit={onSubmit} />
    </>
  );
}
