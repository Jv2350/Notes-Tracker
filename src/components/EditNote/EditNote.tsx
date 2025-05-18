import type { NoteData } from "../../types/note";
import type { Tag } from "../../types/tag";
import { useNote } from "../Layout/NoteLayout";
import { NoteForm } from "../NoteForm/NoteForm";

type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export function EditNote({ onSubmit, onAddTag, availableTags }: EditNoteProps) {
  const note = useNote() as unknown as import("../../types/note").Note;
  return (
    <>
      <h1 className="mb-4">Edit Note</h1>
      <NoteForm
        title={note.title}
        markdown={note.markdown}
        tags={note.tags}
        onSubmit={(data: import("../../types/note").NoteData) =>
          onSubmit(note.id, data)
        }
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}
