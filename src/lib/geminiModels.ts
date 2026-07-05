// Models are tried in order; Gemini returns 503/429/5xx when a model is
// overloaded or rate-limited on the free tier, so the API route falls back
// automatically. Keep this list to real, published Gemini model ids only —
// an invented/retired name just wastes a fallback attempt (400/404).
export const GEMINI_MODELS = ["gemini-2.5-flash", "gemini-2.0-flash"];
