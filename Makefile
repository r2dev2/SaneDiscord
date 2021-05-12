VERSION = 420.69
flags = -DVERSION="\"${VERSION}\""
pp = cpp -traditional-cpp -P ${flags}

.PHONY: build
build:
	mkdir -p dist
	mkdir -p build/js
	$(pp) manifest.json > build/manifest.json
	$(pp) src/main.js > build/js/main.js
	cp src/background.js build/js/background.js
	cd build && zip -9r ../dist/SaneDiscord.zip .
