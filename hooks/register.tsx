import type { Register, ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'

// Daylight pond by day, moonlit pond by night. Koi orange is the accent.
const { theme, problems } = makeColors({
  label: 'Koi pond',
  roles: { accent: '#d9622b', danger: '#b8323a', success: '#3f8a5a', warning: '#b07a12', pro: '#5a6fb0' },
  light: {
    gray: {
      anchors: {
        'surface-0': '#dde9e4',
        'surface-1': '#e6f0ec',
        'surface-2': '#f0f6f3',
        'text-primary': '#14302b',
        'text-secondary': '#2f4d47',
        'text-muted': '#46635c',
      },
    },
  },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#0d1c1b',
        'surface-1': '#132523',
        'surface-2': '#192e2b',
        'surface-3': '#1f3532',
        'text-primary': '#e4f0ea',
        'text-secondary': '#bcd2c9',
        'text-muted': '#94aea4',
      },
    },
  },
})

const fish = (id: string, body: string, spot: string) => `
  <g id="${id}">
    <path class="tail" d="M-34 0 C-48 -10 -58 -12 -62 -6 C-56 0 -56 0 -62 6 C-58 12 -48 10 -34 0Z" fill="${body}" opacity="0.85"/>
    <path d="M30 0 C28 -10 10 -13 -10 -10 C-26 -7 -34 -2 -36 0 C-34 2 -26 7 -10 10 C10 13 28 10 30 0Z" fill="${body}"/>
    <path d="M-4 -10 L-14 -18 L-16 -9Z M-4 10 L-14 18 L-16 9Z" fill="${body}" opacity="0.8"/>
    <ellipse cx="8" cy="-2" rx="9" ry="5" fill="${spot}"/>
    <ellipse cx="-14" cy="2" rx="6" ry="3.5" fill="${spot}"/>
  </g>`

const SCENE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
<style>
  .water { fill: #cfe3dc; }
  .deep { fill: #b6d4ca; }
  .pad { fill: #6f9a6a; }
  .padline { stroke: #5a8457; }
  .ripple { fill: none; stroke: #ffffff; stroke-opacity: 0.35; stroke-width: 2; }
  @media (prefers-color-scheme: dark) {
    .water { fill: #0d1c1b; }
    .deep { fill: #102624; }
    .pad { fill: #24412f; }
    .padline { stroke: #1b3324; }
    .ripple { stroke: #bfe0d6; stroke-opacity: 0.15; }
  }
  .swim1 { animation: swim1 90s linear infinite; }
  .swim2 { animation: swim2 120s linear infinite; }
  .swim3 { animation: swim3 105s linear infinite; }
  .tail { transform-origin: -34px 0; animation: wag 2.4s ease-in-out infinite alternate; }
  .drift { animation: drift 40s ease-in-out infinite alternate; }
  .ring { transform-box: fill-box; transform-origin: center; animation: ring 9s ease-out infinite; }
  .ring.b { animation-delay: 4.5s; }
  @keyframes swim1 { from { transform: translate(-200px, 820px) rotate(-8deg); } to { transform: translate(1800px, 640px) rotate(-8deg); } }
  @keyframes swim2 { from { transform: translate(1800px, 180px) rotate(186deg); } to { transform: translate(-200px, 300px) rotate(186deg); } }
  @keyframes swim3 { from { transform: translate(-200px, 140px) rotate(10deg); } to { transform: translate(1800px, 420px) rotate(10deg); } }
  @keyframes wag { from { transform: rotate(-12deg); } to { transform: rotate(12deg); } }
  @keyframes drift { from { transform: translate(0, 0) rotate(0deg); } to { transform: translate(24px, 14px) rotate(6deg); } }
  @keyframes ring { from { transform: scale(0.3); opacity: 0.9; } to { transform: scale(2.2); opacity: 0; } }
</style>
<defs>${fish('k1', '#e8743b', '#fbf3ea')}${fish('k2', '#f4efe6', '#d9462b')}${fish('k3', '#e9a23b', '#2b2522')}</defs>
<rect class="water" width="1600" height="1000"/>
<ellipse class="deep" cx="800" cy="520" rx="760" ry="420" opacity="0.6"/>
<!-- koi, kept near the edges -->
<g class="swim1" transform="translate(160 860) rotate(-8)"><use href="#k1" transform="scale(1.6)"/></g>
<g class="swim2" transform="translate(1400 200) rotate(186)"><use href="#k2" transform="scale(1.4)"/></g>
<g class="swim3" transform="translate(300 160) rotate(10)"><use href="#k3" transform="scale(1.2)"/></g>
<!-- ripples -->
<circle class="ripple ring" cx="1320" cy="760" r="40"/>
<circle class="ripple ring b" cx="260" cy="420" r="34"/>
<!-- lily pads in the corners -->
<g class="drift" transform="translate(1460 120)"><path class="pad padline" stroke-width="3" d="M0 0 L90 -10 A90 90 0 1 1 80 -40Z"/></g>
<g class="drift" transform="translate(120 140)"><path class="pad padline" stroke-width="3" d="M0 0 L-60 50 A70 70 0 1 1 -20 66Z"/></g>
<g class="drift" transform="translate(1500 900)"><path class="pad padline" stroke-width="3" d="M0 0 L-70 -40 A80 80 0 1 1 -40 -70Z"/><circle cx="-20" cy="20" r="14" fill="#f2b8c6"/><circle cx="-20" cy="20" r="6" fill="#f6dd8a"/></g>
</svg>`

const LOOK: ThemeSetArgs = { colors: theme, backdrop: { scene: 'koi-pond', glass: { blur: 10, opacity: 0.6 } } }

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const unpainted = problems.find(line => line.startsWith("Desktop won't paint"))

    if (unpainted !== undefined) {
      $.ui.toast(unpainted)
    }
    const set = await $.theme.set(LOOK)

    if (!set.isDrawn) {
      $.ui.status(set.reason)
    }

    return next(e)
  })

  on('ui.render', { component: 'Backdrop' }, ($, e, next) => {
    if (e.surface !== 'desktop' && e.surface !== 'mobile') {
      return next(e)
    }
    const { Svg } = $.ui.resolve(e)

    return <Svg source={SCENE} alt="Koi swimming slowly beneath lily pads in a pond" />
  })
}
