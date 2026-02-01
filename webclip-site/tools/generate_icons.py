import os
from PIL import Image


def main() -> None:
    repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    out_dir = os.path.join(repo_root, "icons")
    source = os.path.abspath(os.path.join(repo_root, "..", "tupian", "image.png"))

    img = Image.open(source).convert("RGBA")
    w, h = img.size
    side = min(w, h)
    left = (w - side) // 2
    top = (h - side) // 2
    img = img.crop((left, top, left + side, top + side))

    for size in (180, 192, 512):
        out_path = os.path.join(out_dir, f"icon-{size}.png")
        resized = img.resize((size, size), Image.Resampling.LANCZOS)
        os.makedirs(os.path.dirname(out_path), exist_ok=True)
        resized.save(out_path, format="PNG", optimize=True)

    print(out_dir)


if __name__ == "__main__":
    main()
