// FIX: Removed references to "node" and "vite/client" to resolve type definition errors.
// The interfaces below provide the necessary types for import.meta.env for the project to compile.
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
