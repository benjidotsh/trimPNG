# trim-image-dataurl

trim-image-dataurl is a TypeScript function to remove transparent pixels from the borders of images

## Installation

### npm

```bash
npm install trim-image-dataurl
```

### Yarn

```bash
yarn add trim-image-dataurl
```

## Usage

```javascript
import trimImage from 'trim-image-dataurl';

const imageElement = document.getElementsByTagName('img')[0];
const trimmedImageDataURL = trimImage(imageElement);
imageElement.src = trimmedImageDataURL;
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
