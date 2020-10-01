# gpus.midgar.fr

> The source code to gpus.midgar.fr

## Installation

Clone the repository:

```bash
git clone git@github.com:xavierdutreilh/gpus.midgar.fr.git
```

Enter the directory:

```bash
cd gpus.midgar.fr
```

Install all dependencies:

```bash
npm install
```

## Usage

Start the application:

```bash
npm start
```

Test the application:

```bash
npm test
```

Build the application:

```bash
VERSION=$(cat package.json | jq -r .version)
docker build -t docker.pkg.github.com/xavierdutreilh/gpus.midgar.fr/api:$VERSION .
docker push docker.pkg.github.com/xavierdutreilh/gpus.midgar.fr/api:$VERSION
```

## License

`gpus.midgar.fr` is released under the [MIT license](https://en.wikipedia.org/wiki/MIT_License).
