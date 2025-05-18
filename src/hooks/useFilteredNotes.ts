import { useMemo } from "react";
import type { Tag, NoteListProps } from "../App";

export function useFilteredNotes(
  notes: NoteListProps["notes"],
  title: string,
  selectedTags: Tag[]
) {
  return useMemo(() => {
    return notes.filter((note: { title: string; tags: { id: string }[] }) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag: { id: string }) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);
}
