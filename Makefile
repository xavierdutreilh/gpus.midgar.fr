install:
	npm install

run: install
	npm start

test: install
	npm test

.PHONY: install run test
