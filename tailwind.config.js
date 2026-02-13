const plugin = require('tailwindcss/plugin');
module.exports = {
  content: ['./index.html', './src/**/*.{html,js,svelte,ts}'],
  theme: {
    'flex-basis': (theme) => ({
      1: '100%',
      2: '50%',
      3: '33.333333%',
      4: '25%',
      5: '20%',
      6: '16.666666%',
      7: '14.285714%',
      0: '12.5%',
      'w-384': '384px',
      'w-336': '336px',
      'w-288': '288px',
      'w-240': '240px',
      'w-192': '192px',
      'w-144': '144px',
      'w-96': '96px',
      'w-48': '48px',
    }),
    flexGrow: {
      DEFAULT: 1,
      1: 1,
      2: 2,
      3: 3,
      4: 4,
      5: 5,
      6: 6,
      7: 7,
      8: 8,
    },
    colors: {
      // Monochrome design system
      transparent: 'transparent',
      current: 'currentColor',

      // Core semantic colors (CSS variables)
      background: 'var(--background)',
      foreground: 'var(--foreground)',
      card: 'var(--card)',
      'card-foreground': 'var(--card-foreground)',
      border: 'var(--border)',
      input: 'var(--input)',
      ring: 'var(--ring)',

      // Muted
      muted: 'var(--muted)',
      'muted-foreground': 'var(--muted-foreground)',

      // Primary (white in dark mode, black in light mode)
      primary: 'var(--primary)',
      'primary-foreground': 'var(--primary-foreground)',

      // Secondary
      secondary: 'var(--secondary)',
      'secondary-foreground': 'var(--secondary-foreground)',

      // Accent (subtle highlight)
      accent: 'var(--accent)',
      'accent-foreground': 'var(--accent-foreground)',

      // Destructive
      destructive: 'var(--destructive)',
      'destructive-foreground': 'var(--destructive-foreground)',

      // Success
      success: '#10B981',
      'success-foreground': '#000000',

      // Legacy colors for compatibility
      black1: '#000000',
      black2: '#111111',
      white: '#ffffff',
      white2: '#f5f5f5',
      white2inverse: '#0A0A0A',

      // Grey scale
      grey1: '#282828',
      grey1inverse: '#D6D2C6',
      grey2: '#b2b4b6',
      grey3: '#222222',
      grey3inverse: '#dcd7cc',
      grey5: '#202020',
      grey5inverse: '#DEDBD3',
      grey10: '#0e0e0e',
      grey10inverse: '#eeeeee',
      grey15: '#111111',
      grey15inverse: '#DDDDDD',
      grey18: '#222222',
      grey18inverse: '#eee9e3',
      grey20: '#101010',
      grey20inverse: '#efebe5',
      grey30: '#000000',
      grey30inverse: '#F1EEE9',
      lightgrey1: '#b7b7b7',
      lightgrey1inverse: '#484848',
      lightgrey5: '#b0b0b0',
      lightgrey5inverse: '#4f4f4f',
      lightgrey10: '#979BA2',
      lightgrey10inverse: '#68645d',
      lightgrey20: '#4d5466',
      lightgrey20inverse: '#b2ab99',
      darkgrey1: '#909090',

      // Status colors
      red1: '#fc4544',
      red2: '#220908',
      red3: '#DC1D1D',
      red4: '#471311',
      red5: '#931c18',
      orange1: '#ec8339',
      orange2: '#FE6A02',
      green1: '#2ecc94',
      green2: '#3EB88E',
      green3: '#01FFD4',
      green4: '#42B792',
      blue1: '#0E8AD0',
      blue2: '#0557e8',

      // Social
      twitter: '#4CABFA',
      discord: '#7289DA',

      // Networks
      ethereum: '#647fe5',
      arbitrum: '#93b4d5',
      optimism: '#ed3a2a',
      lux: '#ffffff',
      zoo: '#10B981',
      hanzo: '#8B5CF6',
    },
    fontFamily: {
      sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      mono: ['ui-monospace', 'SFMono-Regular', 'monospace'],
      alcxLogo: ['Inter', 'sans-serif'],
      alcxTitles: ['Inter', 'sans-serif'],
      alcxFlow: ['Inter', 'sans-serif'],
      alcxMono: ['Inter'],
    },
    extend: {
      backgroundSize: {
        'size-200': '200% 200%',
      },
      backgroundPosition: {
        'pos-0': '0% 0%',
        'pos-100': '100% 100%',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  variants: {
    'flex-basis': ['responsive'],
    extend: {
      cursor: ['hover'],
      opacity: ['disabled'],
      block: ['group-hover'],
      backgroundPosition: ['hover'],
    },
  },
  plugins: [
    require('@tkh/tailwind-plugin-flex-basis')(),
    plugin(function ({ addVariant, e, postcss }) {
      addVariant('firefox', ({ container, seperator }) => {
        const isFirefoxRule = postcss.atRule({
          name: '-moz-document',
          params: 'url-prefix()',
        });
        isFirefoxRule.append(container.nodes);
        container.append(isFirefoxRule);
        isFirefoxRule.walkRules((rule) => {
          rule.selector = `.${e(`firefox${seperator}${rule.selector.slice(1)}`)}`;
        });
      });
    }),
  ],
  purge: false,
};
