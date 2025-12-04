# 99% Wrong Facts

A fun, mobile-responsive React JS website that displays completely fake, humorous facts in Roman Urdu with a serious tone.

## Features

- 🎨 **Multiple Themes**: Neon, Retro, and Comic themes
- 📱 **Mobile-First Design**: Responsive layout for phones, tablets, and desktops
- 🎭 **Smooth Animations**: Fade-in, bounce, typewriter, wiggle, and explode effects
- 📊 **Confidence Meter**: Always stuck at 99%
- 🎯 **Category Selector**: Animals, Science, Programming, History, and Random
- 📅 **Daily Lie**: A new fact every 24 hours with countdown
- 🔊 **Sound Effects**: Subtle sounds on button clicks and fact reveals
- 📤 **Shareable Lies**: Copy, Tweet, WhatsApp, and Facebook sharing options
- 🥚 **Easter Eggs**: Hidden facts triggered by user interactions
- ❤️ **Like System**: Like your favorite lies and see the Hall of Fame
- 📜 **Fact History**: Scrollable list of previous lies to revisit
- ✨ **Particle Effects**: Interactive particle bursts on new facts
- 🔄 **No Repeats**: Facts won't repeat until all facts in a category are shown

## Tech Stack

- React 18
- Webpack 5
- Babel
- CSS3 with animations
- Web Audio API for sound effects

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/wrongfacts.git
cd wrongfacts
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Build for Production

```bash
npm run build
```

This creates optimized production files in the `dist/` folder.

## Project Structure

```
WrongFacts/
├── src/
│   ├── main.jsx          # React entry point
│   ├── index.css         # Global styles
│   └── screens/
│       ├── App.jsx       # Main React component
│       └── App.css       # Component styles
├── public/               # Public assets
├── index.html            # HTML template
├── webpack.config.js     # Webpack configuration
├── .babelrc              # Babel configuration
└── package.json          # Dependencies and scripts
```

## License

MIT

## Remember

99% of these facts are wrong. The other 1% is also wrong. 😄
