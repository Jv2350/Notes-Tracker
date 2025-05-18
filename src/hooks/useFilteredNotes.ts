import { useMemo } from "react";
import type { Tag } from "../types/tag";

// Define a local type for SimplifiedNote to avoid import issues
export type SimplifiedNote = {
  tags: Tag[];
  title: string;
  id: string;
};

export function useFilteredNotes(
  notes: SimplifiedNote[],
  title: string,
  selectedTags: Tag[]
) {
  return useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag: Tag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);
}
