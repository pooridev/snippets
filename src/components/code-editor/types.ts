export type SnippetFile = {
  id: string
  name: string
  code: string
  /** Explicit language override; null means "auto-detect from the file extension" */
  language: string | null
}
