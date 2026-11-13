# Third-party notices

Libraries are installed from npm at build time (not committed) and copied into the app.

| Component | Version | License | Use |
| --- | --- | --- | --- |
| [mp4-muxer](https://github.com/Vanilagy/mp4-muxer) | 5.1.3 | MIT | MP4 export |
| [html2canvas](https://github.com/niklasvh/html2canvas) | 1.4.1 | MIT | Rendering HTML to canvas |
| [lamejs](https://github.com/zhuker/lamejs) | 1.2.1 | LGPL-3.0 | MP3 export. Loaded as a separate, replaceable file (`vendor/lame.min.js`) |
| [Capacitor](https://github.com/ionic-team/capacitor) and `@capacitor/app`, `filesystem`, `share` | 6.x | MIT | Android wrapper |
| [capacitor-secure-storage-plugin](https://github.com/martinkasa/capacitor-secure-storage-plugin) | 0.10.0 | MIT | API key storage on Android |

Downloaded at run time when the matching feature is used (not bundled):

| Component | License | Use |
| --- | --- | --- |
| [@huggingface/transformers](https://github.com/huggingface/transformers.js) | Apache-2.0 | Speech engine for captions |
| `onnx-community/whisper-*` models (huggingface.co) | see each model card | Speech-to-text |
| Google Fonts: Inter, Baloo Da 2, Hind Siliguri, Tiro Bangla, Noto Serif Bengali | SIL Open Font License 1.1 | UI and text fonts |

Check licenses of the exact versions you ship. If you add or replace an asset, list its source and license here.

## Built-in sound effects

`www/index.html` embeds a small set of sound effects (MP3 data). **Maintainer: record their source and license here before publishing** (see PUBLISH_CHECKLIST.md).
