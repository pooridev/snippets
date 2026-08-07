export type SyntaxTheme = {
  key: string
  name: string
  /** Window (fake editor) background */
  background: string
  /** Base text color */
  text: string
  /** Header / tab-bar overlay, layered on top of `background` */
  headerOverlay: string
  tokens: {
    comment: string
    punctuation: string
    property: string
    string: string
    operator: string
    keyword: string
    function: string
    variable: string
  }
}

export const SYNTAX_THEMES: SyntaxTheme[] = [
  {
    key: 'midnight',
    name: 'Midnight',
    background: 'rgb(34, 39, 46)',
    text: '#e6edf3',
    headerOverlay: 'rgba(255, 255, 255, 0.06)',
    tokens: {
      comment: '#768390',
      punctuation: '#adbac7',
      property: '#6cb6ff',
      string: '#96d0ff',
      operator: '#f47067',
      keyword: '#f47067',
      function: '#dcbdfb',
      variable: '#f69d50',
    },
  },
  {
    key: 'one-dark',
    name: 'One Dark',
    background: '#282c34',
    text: '#abb2bf',
    headerOverlay: 'rgba(255, 255, 255, 0.06)',
    tokens: {
      comment: '#5c6370',
      punctuation: '#abb2bf',
      property: '#d19a66',
      string: '#98c379',
      operator: '#56b6c2',
      keyword: '#c678dd',
      function: '#61afef',
      variable: '#e06c75',
    },
  },
  {
    key: 'dracula',
    name: 'Dracula',
    background: '#282a36',
    text: '#f8f8f2',
    headerOverlay: 'rgba(255, 255, 255, 0.06)',
    tokens: {
      comment: '#6272a4',
      punctuation: '#f8f8f2',
      property: '#bd93f9',
      string: '#f1fa8c',
      operator: '#ff79c6',
      keyword: '#ff79c6',
      function: '#50fa7b',
      variable: '#8be9fd',
    },
  },
  {
    key: 'nord',
    name: 'Nord',
    background: '#2e3440',
    text: '#d8dee9',
    headerOverlay: 'rgba(255, 255, 255, 0.06)',
    tokens: {
      comment: '#616e88',
      punctuation: '#eceff4',
      property: '#8fbcbb',
      string: '#a3be8c',
      operator: '#81a1c1',
      keyword: '#81a1c1',
      function: '#88c0d0',
      variable: '#d08770',
    },
  },
  {
    key: 'github-light',
    name: 'GitHub Light',
    background: '#ffffff',
    text: '#24292f',
    headerOverlay: 'rgba(0, 0, 0, 0.05)',
    tokens: {
      comment: '#6e7781',
      punctuation: '#24292f',
      property: '#0550ae',
      string: '#0a3069',
      operator: '#cf222e',
      keyword: '#cf222e',
      function: '#8250df',
      variable: '#953800',
    },
  },
]

export const DEFAULT_SYNTAX_THEME = SYNTAX_THEMES[0].key

export const findSyntaxTheme = (key: string): SyntaxTheme =>
  SYNTAX_THEMES.find(theme => theme.key === key) || SYNTAX_THEMES[0]

/** Prism token styles for a theme, scoped to whatever element the CSS is attached to. */
export const buildTokenStyles = (theme: SyntaxTheme) => `
  .token.comment, .token.prolog, .token.doctype, .token.cdata {
    color: ${theme.tokens.comment};
    font-style: italic;
  }
  .token.punctuation {
    color: ${theme.tokens.punctuation};
  }
  .token.property, .token.tag, .token.boolean, .token.number, .token.constant, .token.symbol {
    color: ${theme.tokens.property};
  }
  .token.selector, .token.attr-name, .token.string, .token.char, .token.builtin, .token.inserted {
    color: ${theme.tokens.string};
  }
  .token.operator, .token.entity, .token.url, .token.deleted {
    color: ${theme.tokens.operator};
  }
  .token.atrule, .token.attr-value, .token.keyword {
    color: ${theme.tokens.keyword};
  }
  .token.function, .token.class-name {
    color: ${theme.tokens.function};
  }
  .token.regex, .token.important, .token.variable {
    color: ${theme.tokens.variable};
  }
  .token.important, .token.bold {
    font-weight: bold;
  }
  .token.italic {
    font-style: italic;
  }
`
