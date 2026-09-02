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

clean:
	pnpm run clean

# In-place and lossless: JPEG is only re-packed (Huffman tables + progressive scan, pixels untouched)
# and PNG is only re-compressed, so this is safe to run repeatedly. A file is replaced only when the
# result is genuinely smaller. EXIF is dropped, except on a JPEG whose Orientation is not 1, where
# stripping it would rotate the picture.
# Lossless and in-place: JPEG is repacked (Huffman + progressive, pixels untouched), PNG is
# recompressed. Safe to run repeatedly; EXIF is kept, so orientation cannot be lost.
images:
	@for f in $(IMG_DIR)/*.jpg $(IMG_DIR)/*.jpeg; do [ -e "$$f" ] || continue; \
		jpegtran -optimize -progressive -copy all "$$f" > "$$f.t" && mv "$$f.t" "$$f"; done
	@for f in $(IMG_DIR)/*.png; do [ -e "$$f" ] || continue; \
		magick "$$f" -strip -define png:compression-level=9 "$$f"; done
	@du -sh $(IMG_DIR)
