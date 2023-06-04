# Simple Resume
<!-- <p align="center">
  <a href=""><img src="https://img.shields.io/badge/lang-en-green.svg" /></a>
</p> -->

## Project Introduction
A simple front-end resume generator that does not collect any of your data and does not make any backend requests. Therefore, all changes are saved in `localStorage`. You can experience it at the following website:

<a style="font-size: 16px;" href="https://evankwolf.github.io/simple-resume/" target="_black">Project Link</a>

## Usage
Use the content and style editor to dynamically edit your resume, then click `Export PDF` button, and in the browser's pop-up window, choose `Save as PDF` to save it.

Remember to check `Background graphics` so that the background color can be applied correctly.


<img src="./src/assets/guide-1.png" />

## Acknowledgements
### Source of Idea
Originally, I wanted to write a resume for myself, so I searched for open-source resume generators on GitHub and found two that I found very useful.

1. [Visky/resume](https://github.com/visiky/resume)
2. [AmruthPillai/Reactive-Resume](https://github.com/AmruthPillai/Reactive-Resume)

Both of these projects are very useful, and I think they can meet most needs. However, I found that when using the latter, the project description would compress the date text when it is too long, and when using the former, I wished for more customization options. So, I embarked on an endless journey of searching.

After going through

1. Needing registration/login
2. Needing to manually format and write pure MD
3. Needing manual formatting for template in docs format
4. ...

I decided to write one generator myself (lol)

Since I prefer a simple resume layout, this project doesn't have any complex formatting.

以上です。

### Dependencies
Many thanks to the following open-source libraries and contributors. They have made my development experience incredibly enjoyable and effortless.

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Iconify](https://iconify.design/)
- [Ant-design](https://ant.design/)
- [Typescript](https://github.com/microsoft/TypeScript/)
- [Unocss](https://unocss.dev/)
- [react-i18n](https://react.i18next.com/)
- [react-markdown](https://github.com/remarkjs/react-markdown)
- [gh-pages](https://github.com/tschaub/gh-pages)
- [html2pdf.js](https://github.com/eKoopmans/html2pdf.js)
- [react-to-print](https://github.com/gregnb/react-to-print)
- [Husky](https://github.com/typicode/husky)

## Frequently Asked Questions
### 1. Can I copy someone else's resume?
Yes, you can ask your friend to select `Export Configuration` locally and send you the JSON file. Then you can select `Import Configuration` to use it.

### 2. Where can I find more icons?
You can directly go to [Iconify Icons](https://icon-sets.iconify.design/) to search for icons, and then copy the corresponding code and use it.
<img src="./src/assets/icon-guide.png" />

## Local Setup
Clone/download the project code to your local machine, and then run the following commands (it is strongly recommended to use Pnpm).

### Install dependencies
```bash
pnpm install


```

### Development
```bash
pnpm dev
```

### Build
```bash
pnpm build
```

### Deploy on your GitHub pages
```bash
pnpm publish
```
