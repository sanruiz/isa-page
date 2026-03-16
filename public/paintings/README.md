# Paintings Directory

This directory contains all painting images for the gallery.

## Naming Convention

Use **kebab-case** for all painting image files:

```
{title-in-lowercase}.{extension}
```

### Examples

| Painting Title    | File Name              |
| ----------------- | ---------------------- |
| Pensamientos I    | `pensamientos-i.png`   |
| Pensamientos II   | `pensamientos-ii.png`  |
| En la Memoria I   | `en-la-memoria-i.png`  |
| Orquídeas         | `orquideas.png`        |
| Botanica I        | `botanica-i.png`       |
| Copetón           | `copeton.png`          |
| Labios            | `labios.png`           |

### Rules

1. **Lowercase only** - No uppercase letters
2. **Kebab-case** - Use hyphens (`-`) instead of spaces
3. **No accents** - Replace accented characters (á→a, é→e, í→i, ó→o, ú→u, ñ→n)
4. **Roman numerals** - Keep as lowercase (I→i, II→ii, III→iii)
5. **No metadata in filename** - Don't include size, medium, or year in the filename
6. **Preferred formats** - Use `.png`, `.jpg`, or `.webp`

### Image Specifications

- **Recommended resolution**: At least 1200px on the longest side
- **Aspect ratio**: Maintain original painting proportions
- **Format**: PNG for best quality, WebP for optimization
- **Color profile**: sRGB for web display

## Adding New Paintings

1. Add the image file following the naming convention above
2. Update `src/constants/paintings.ts` with the painting data:
   ```typescript
   {
     id: [next-id],
     title: "Painting Title",
     series: "Series Name",
     size: "16×20 in",
     medium: "Oil on canvas",
     color: "#hexcolor",  // fallback background color
     accent: "#hexcolor", // accent color
     image: "/paintings/painting-title.png",
   }
   ```

## Current Paintings

- [x] `en-la-memoria-iv-detail.png` - En la Memoria IV (Detail) (16×20 in, Oil on wood panel)
- [x] `orquideas.png` - Orquídeas (16×20 in, Oil on wood panel)
- [x] `pensamientos-i.png` - Pensamientos I (6×6 in, Oil on wood panel)
- [x] `pensamientos-ii.png` - Pensamientos II (6×6 in, Oil on wood panel)
- [x] `pensamientos-iii.png` - Pensamientos III (12×12 in, Oil on wood panel)
- [x] `pensamientos-iv.png` - Pensamientos IV (6×6 in, Oil on wood panel)
- [x] `pensamientos-v.png` - Pensamientos V (8×8 in, Oil on wood panel)
- [x] `copeton.png` - Copetón (8×8 in, Oil on wood)
- [x] `sparrow.png` - Sparrow (8×8 in, Oil on wood panel)
- [x] `en-la-memoria-v.jpg` - En la Memoria V (8×8 in, Oil on wood panel)
