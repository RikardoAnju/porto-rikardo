# Theme Configuration Guide

Semua konfigurasi warna, font, dan design tokens tersentralisasi di sini untuk memudahkan maintenance dan consistency.

## 📁 File Structure

```
src/config/
├── theme.ts       # Main theme configuration (TypeScript)
├── theme.css      # CSS variables
└── THEME.md       # This file
```

## 🎨 Usage Examples

### 1. Import Theme Configuration

```typescript
import { colors, fonts, gradients, shadows } from "@/src/config/theme";

// Access colors
const primaryColor = colors.primary[400];     // #6366f1
const secondaryColor = colors.secondary[400]; // #67e8f9

// Access fonts
const headingSize = fonts.sizes["4xl"];       // 2.25rem
const bodyWeight = fonts.weights.normal;      // 400

// Access gradients
const gradient = gradients.primaryToCyan;     // linear-gradient(...)

// Access shadows
const glowShadow = shadows.glow;              // 0 0 20px...
```

### 2. Menggunakan useTheme Hook

```typescript
"use client";

import { useTheme } from "@/src/hooks/useTheme";

export default function MyComponent() {
  const theme = useTheme();

  return (
    <div style={{
      color: theme.colors.primary[400],
      fontSize: theme.fonts.sizes.lg,
      background: theme.gradients.primaryToCyan,
    }}>
      Hello Theme!
    </div>
  );
}
```

### 3. CSS Variables (Global)

```css
/* Di file CSS atau component */
.my-element {
  color: var(--color-primary-400);
  font-size: var(--font-size-lg);
  background: var(--gradient-primary-to-cyan);
  box-shadow: var(--shadow-glow);
  border-radius: var(--radius-lg);
}
```

### 4. Tailwind Classes + Theme

```jsx
// Menggunakan Tailwind dengan custom colors
<div className="bg-indigo-500 text-white shadow-lg">
  // Tailwind will use the indigo-500 color dari config
</div>

// Atau gunakan CSS variables untuk lebih custom
<div style={{ 
  color: `var(--color-primary-400)`,
  background: `var(--gradient-primary-to-cyan)`
}}>
  Custom styling
</div>
```

## 🎯 Color Palette

### Primary Colors (Indigo - Soft)
- **400** `#6366f1` - Main brand color ⭐
- **500** `#4f46e5` - Hover/Active state
- **600** `#4338ca` - Darker variant

### Secondary Colors (Cyan - Light)
- **400** `#67e8f9` - Main secondary color ⭐
- **500** `#06b6d4` - Darker variant
- **600** `#0891b2` - Darkest variant

### Neutral Colors (Slate)
- **50** `#f8fafc` - Background light
- **900** `#0f172a` - Background dark
- **700** `#334155` - Text light
- **100** `#f1f5f9` - Borders light

## 🔤 Typography Presets

```typescript
// Heading sizes
typography.heading.h1  // 4.5rem, bold, tight
typography.heading.h2  // 3rem, bold, tight
typography.heading.h3  // 2.25rem, bold, snug

// Body text
typography.body.large  // 1.125rem, normal, relaxed
typography.body.base   // 1rem, normal, normal
typography.body.small  // 0.875rem, normal, snug

// Components
typography.button      // 1rem, semibold
typography.label       // 0.875rem, medium
```

## 🎨 Gradients Available

```typescript
gradients.primaryToCyan      // Indigo to Cyan
gradients.primaryToSecondary // Primary to Secondary
gradients.bgGradient         // Background gradient (light)
gradients.bgDarkGradient     // Background gradient (dark)
```

## ✨ Shadows

```typescript
shadows.sm     // Small shadow
shadows.base   // Base shadow
shadows.md     // Medium shadow
shadows.lg     // Large shadow
shadows.xl     // Extra large shadow
shadows.glow   // Indigo glow effect
shadows.glowCyan // Cyan glow effect
```

## 🔧 Customization

### Untuk mengubah warna primary:

1. Edit `src/config/theme.ts`:
```typescript
primary: {
  400: "#6366f1", // Ubah value ini
  // ...
}
```

2. Update juga di `src/config/theme.css`:
```css
--color-primary-400: #6366f1; /* Ubah value ini */
```

### Untuk menambah font baru:

```typescript
// Di theme.ts
fonts: {
  serif: "'Georgia', serif",  // Tambah di sini
  // ...
}
```

### Untuk menambah warna baru:

```typescript
// Di theme.ts
colors: {
  brand: {
    light: "#e0e7ff",
    main: "#6366f1",
    dark: "#3730a3",
  }
  // ...
}
```

## 📝 Best Practices

1. **Selalu gunakan theme values** - jangan hardcode warna
2. **Import dari satu tempat** - semua dari `theme.ts` atau CSS variables
3. **Konsisten dengan naming** - gunakan palette yang sudah ada
4. **Untuk warna baru** - tambahkan di `theme.ts` terlebih dahulu
5. **Dark mode** - theme sudah support, gunakan CSS variables untuk automatic

## 🚀 Quick Reference

```typescript
// Colors
colors.primary[400]      // #6366f1 - Main brand
colors.secondary[400]    // #67e8f9 - Accent
colors.neutral[900]      // #0f172a - Dark text
colors.status.success    // #10b981 - Success green

// Fonts
fonts.sans               // Geist Sans
fonts.mono               // Geist Mono
fonts.sizes.lg           // 1.125rem
fonts.weights.bold       // 700

// Spacing
spacing[4]               // 1rem
spacing[8]               // 2rem
spacing[12]              // 3rem

// Border Radius
borderRadius.md          // 0.5rem
borderRadius.lg          // 0.75rem
borderRadius.full        // 9999px

// Gradients
gradients.primaryToCyan  // Indigo to Cyan gradient

// Z-Index
zIndex.loader            // 9999
zIndex.modal             // 50
zIndex.dropdown          // 10
```

---

**Update theme di satu tempat, perubahan otomatis di seluruh app!** ✨
