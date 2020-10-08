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

## Usage

Start the application:

```bash
docker-compose -f docker-compose.development.yml up
```

Test the application:

```bash
docker-compose -f docker-compose.test.yml up --abort-on-container-exit
```

Release the application:

```bash
npm version major|minor|patch
git push --follow-tags origin master
VERSION=$(cat package.json | jq -r .version)
docker build -t docker.pkg.github.com/xavierdutreilh/gpus.midgar.fr/api:$VERSION .
docker push docker.pkg.github.com/xavierdutreilh/gpus.midgar.fr/api:$VERSION
```

## License

`gpus.midgar.fr` is released under the [MIT license](https://en.wikipedia.org/wiki/MIT_License).
