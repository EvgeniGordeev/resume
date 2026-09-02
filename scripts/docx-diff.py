#!/usr/bin/env python3
"""Show what a hand-edited .docx says that resume.json does not -- the docx -> yml sync task.

    python3 scripts/docx-diff.py [edited.docx] [resume.json]

The docx is generated from resume.json, so editing it in Word forks the truth. This renders
resume.json through the same generator into a temporary docx, extracts the visible text of both,
and prints a unified diff: "-" is what resume.json currently says, "+" is what the Word file says.
Port every "+" line you want to keep into resume.yml, then regenerate. Nothing is written here.
"""
import difflib, json, os, subprocess, sys, tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(ROOT, "scripts"))

try:
    from docx import Document
except ImportError:
    raise SystemExit("python-docx is required: pip install python-docx")


W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"


def para_text(p):
    """paragraph.text drops runs inside w:hyperlink, which is most of the links in this resume."""
    return "".join(t.text or "" for t in p._p.iter(W + "t"))


def lines(path):
    return [" ".join(para_text(p).split()) for p in Document(path).paragraphs if para_text(p).strip()]


def main():
    edited = sys.argv[1] if len(sys.argv) > 1 else None
    src = sys.argv[2] if len(sys.argv) > 2 else os.path.join(ROOT, "resume.json")
    data = json.load(open(src))
    if edited is None:
        edited = os.path.join(ROOT, data.get("docx") or "downloads/CV.docx")
    if not os.path.exists(edited):
        raise SystemExit(f"no such file: {edited}")

    import resume2docx
    with tempfile.TemporaryDirectory() as tmp:
        expected = os.path.join(tmp, "expected.docx")
        resume2docx.build(data, expected)
        diff = list(difflib.unified_diff(
            lines(expected), lines(edited),
            fromfile=f"{os.path.relpath(src, ROOT)} (generated)",
            tofile=f"{os.path.relpath(edited, ROOT)} (edited in Word)",
            lineterm="", n=1))

    if not diff:
        print("In sync: the Word file matches resume.json.")
        return 0
    print("\n".join(diff))
    adds = sum(1 for d in diff if d.startswith("+") and not d.startswith("+++"))
    dels = sum(1 for d in diff if d.startswith("-") and not d.startswith("---"))
    print(f"\n{adds} line(s) only in the Word file, {dels} only in resume.json."
          "\nPort what you want into resume.yml, then: pnpm run yaml2doc")
    return 1


if __name__ == "__main__":
    sys.exit(main())
