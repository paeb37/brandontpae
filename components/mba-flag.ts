// ── MBA announcement toggle ────────────────────────────────────────────────
// MIT Sloan admission is deferred until decisions are public. While `false`:
//   • the Journey timeline shows a neutral placeholder node
//   • the About bio omits the MIT Sloan sentence
//   • the page <meta> description omits the MIT Sloan mention
// Flip this single constant to `true` to restore the real MIT Sloan content
// everywhere at once.
export const ANNOUNCE_MBA = false;
