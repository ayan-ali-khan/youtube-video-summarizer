/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_NHOST_SUBDOMAIN=
  VITE_NHOST_REGION=
  VITE_RAPID_API_KEY=
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
