import { useState } from 'react';
import type { Note } from '../store/planStore';

// A simple add/remove text list — used for "My Plan"'s open questions and
// next steps slots (docs/ux_redesign_plan.md Phase 4). Deliberately plain:
// this is Lucy's own scratch space, not a computed or validated list.
export function NotesList({
  notes,
  onAdd,
  onRemove,
  placeholder,
}: {
  notes: Note[];
  onAdd: (text: string) => void;
  onRemove: (id: string) => void;
  placeholder: string;
}) {
  const [draft, setDraft] = useState('');

  const submit = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setDraft('');
  };

  return (
    <div className="flex flex-col gap-2">
      {notes.length > 0 && (
        <ul className="flex flex-col gap-1.5">
          {notes.map((note) => (
            <li
              key={note.id}
              className="flex items-start justify-between gap-2 rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-700"
            >
              <span>{note.text}</span>
              <button
                type="button"
                onClick={() => onRemove(note.id)}
                aria-label="Remove"
                className="shrink-0 min-h-6 min-w-6 text-stone-400 hover:text-red-600"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') submit();
          }}
          placeholder={placeholder}
          className="flex-1 min-h-11 rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm"
        />
        <button
          type="button"
          onClick={submit}
          className="min-h-11 rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50"
        >
          Add
        </button>
      </div>
    </div>
  );
}
