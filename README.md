<img src="https://i.postimg.cc/yNvdf5mX/mswap-mingweb3.jpg" alt="mswap-mingweb3" border="0" width="100%">

# Swap SPL Token - SOLANA - TS 

### Read this part first, before staring review the project
👋 Please read this note first, i want to explain some thing before i guide you go around with me. Thank you so much!!! 🫶

1. I designed the UI/UX by myself. I have the figma file. (Logo, color, UX...). I imagined i have to build a product so i design this ui and i want to send to you the concept about swap and my idea in the UI.
2. I built this project from the beginning on ViteJS. I added husky, eslint, did config of compiling code
3. I use some api from Jupiter to polish the UI/UX. I copied some ideas on Jupiter and Uniswap...
4. Swap function will work with AAT & BBT token actually
5. Please claim AAT token and BBT token to your wallet by clicking on airdrop page and get them (devnet - sol). No airdrop program just using a demo program (reason: save time and focus on frontend side)
6. Then swap AAT <-> BBT in SWAP page (SPL)
7. This project is a demo i've built in 4 full working days. so there are some missing points (+1 day to test and record video. total is 5days). It can not be a final product. there are a lot functions / features in my mind that i want to build if it's real world. please focus on the demo only.

[![PC](https://i.postimg.cc/T2kBTdbW/Screenshot-2024-01-11-at-15-48-15.png)](https://postimg.cc/qg31Ldjk) 

[![Mobile](https://i.postimg.cc/rmG05ZSv/Screenshot-2024-01-11-at-15-48-24.png)](https://postimg.cc/ZBR5Scsc)

----
### Now! Let go.

- Nodejs: 18+
- using yarn

### Install Node Modules
`yarn install` or `npm install`

### Dev on local
`yarn dev` or `npm run dev`

### Build & Deploy
`yarn build` then `yarn preview`

----

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
