# trimPNG

trimPNG is a TypeScript function to remove transparent pixels from the borders of images

## Installation

### npm

```bash
npm install trimpng
```

### Yarn

```bash
yarn add trimpng
```

## Usage

```javascript
import trimPNG from 'trimpng';

const imageElement = document.getElementsByTagName('img')[0];
const trimmedImageDataURL = trimPNG(imageElement);
imageElement.src = trimmedImageDataURL;
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit)
