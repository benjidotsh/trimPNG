# trim-image-dataurl

trim-image-dataurl is a TypeScript function to remove transparent pixels from the borders of images

## Installation

Use the package manager [npm](https://www.npmjs.com) or [Yarn](https://yarnpkg.com) to install the dependencies.

```bash
npm/yarn install
```

## Usage

```javascript
import trimImage from 'trim-image-dataurl';

const imageElement = document.getElementsByTagName('img')[0];
const trimmedImageDataURL = trimImage(imageElement);
imageElement.src = trimmedImageDataURL;
```

### Build for production

```bash
npm run build
```
