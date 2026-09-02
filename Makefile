#!/usr/bin/make -f

MAKEFLAGS += --always-make
ifndef VERBOSE
    MAKEFLAGS += --no-print-directory
endif

CV := downloads/Evgeni_Gordeev_CV
IMG_DIR := images

help:
	@echo "build      install toolchain and node modules"
	@echo "run        serve the site on http://localhost:3001"
	@echo "json       resume.yml  -> resume.json"
	@echo "md         resume.json -> $(CV).md"
	@echo "docx       resume.json -> $(CV).docx"
	@echo "pdf        $(CV).docx  -> $(CV).pdf"
	@echo "all        json, md, docx and pdf"
	@echo "diff       what a hand-edited docx says that resume.yml does not"
	@echo "print      legacy: PDF printed from the running site (needs 'make run')"
	@echo "verify     ATS and content checks on the generated docx"
	@echo "images     losslessly shrink $(IMG_DIR)/ in place (safe to repeat)"
	@echo "clean      remove node_modules"

build:
	brew install yq poppler node pnpm
	brew install --cask libreoffice
	pnpm install
	pip3 install --user python-docx

run:
	pnpm start

json:
	pnpm run yaml2json

md:
	pnpm run yaml2md

docx:
	pnpm run yaml2doc

pdf:
	pnpm run yaml2pdf

all: md pdf

# Run before regenerating: 'make docx' overwrites the file you edited in Word.
diff:
	pnpm run docx-diff

print:
	pnpm run print

verify:
	python3 ../job-hunt/.claude/skills/job-search-toolkit/scripts/verify_resume.py $(CV).docx

clean:
	pnpm run clean

# In-place and lossless: JPEG is only re-packed (Huffman tables + progressive scan, pixels untouched)
# and PNG is only re-compressed, so this is safe to run repeatedly. A file is replaced only when the
# result is genuinely smaller. EXIF is dropped, except on a JPEG whose Orientation is not 1, where
# stripping it would rotate the picture.
images:
	@before=$$(find $(IMG_DIR) -type f -exec stat -f%z {} + | awk '{t+=$$1} END{print t+0}'); \
	for f in $(IMG_DIR)/*.jpg $(IMG_DIR)/*.jpeg $(IMG_DIR)/*.JPG; do \
		[ -e "$$f" ] || continue; \
		o=$$(magick identify -format '%[EXIF:Orientation]' "$$f" 2>/dev/null); \
		case "$$o" in ''|1) keep=none ;; *) keep=all ;; esac; \
		jpegtran -optimize -progressive -copy $$keep -outfile "$$f.tmp" "$$f" 2>/dev/null || continue; \
		if [ -s "$$f.tmp" ] && [ $$(stat -f%z "$$f.tmp") -lt $$(stat -f%z "$$f") ]; then \
			mv "$$f.tmp" "$$f"; echo "  jpeg  $$f"; \
		else rm -f "$$f.tmp"; fi; \
	done; \
	for f in $(IMG_DIR)/*.png; do \
		[ -e "$$f" ] || continue; \
		magick "$$f" -strip -define png:compression-level=9 -define png:compression-filter=5 "$$f.tmp" 2>/dev/null || continue; \
		if [ -s "$$f.tmp" ] && [ $$(stat -f%z "$$f.tmp") -lt $$(stat -f%z "$$f") ]; then \
			mv "$$f.tmp" "$$f"; echo "  png   $$f"; \
		else rm -f "$$f.tmp"; fi; \
	done; \
	after=$$(find $(IMG_DIR) -type f -exec stat -f%z {} + | awk '{t+=$$1} END{print t+0}'); \
	awk -v b=$$before -v a=$$after 'BEGIN{printf "$(IMG_DIR): %.0f KB -> %.0f KB (%.1f%% smaller)\n", b/1024, a/1024, b?100-100*a/b:0}'
