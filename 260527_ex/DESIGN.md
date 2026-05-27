---
name: Serene Feline Care
colors:
  surface: '#fbf9f8'
  surface-dim: '#dbd9d9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#eae8e7'
  surface-container-highest: '#e4e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#43474f'
  inverse-surface: '#303030'
  inverse-on-surface: '#f2f0f0'
  outline: '#737780'
  outline-variant: '#c3c6d0'
  surface-tint: '#3a608e'
  primary: '#375e8c'
  on-primary: '#ffffff'
  primary-container: '#5177a6'
  on-primary-container: '#fdfcff'
  inverse-primary: '#a4c9fd'
  secondary: '#536348'
  on-secondary: '#ffffff'
  secondary-container: '#d0e3c1'
  on-secondary-container: '#55664b'
  tertiary: '#5d5c58'
  on-tertiary: '#ffffff'
  tertiary-container: '#767470'
  on-tertiary-container: '#fcffe0'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d3e4ff'
  primary-fixed-dim: '#a4c9fd'
  on-primary-fixed: '#001c38'
  on-primary-fixed-variant: '#1f4875'
  secondary-fixed: '#d6e8c6'
  secondary-fixed-dim: '#baccab'
  on-secondary-fixed: '#111f0a'
  on-secondary-fixed-variant: '#3c4b32'
  tertiary-fixed: '#e5e2dc'
  tertiary-fixed-dim: '#c9c6c1'
  on-tertiary-fixed: '#1c1c18'
  on-tertiary-fixed-variant: '#474743'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e2'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  caption:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1200px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

The brand personality is rooted in "Gentle Expertise." It balances the clinical precision of veterinary medicine with a warm, maternal atmosphere tailored specifically for feline comfort. The design system prioritizes a stress-free experience for cat owners, evoking feelings of safety, patience, and specialized care.

The visual style is **Minimalist with Tactile Softness**. It avoids the stark, cold aesthetics of traditional medicine in favor of high-quality whitespace, breathing room, and soft transitions. By utilizing subtle depth and rounded geometry, the UI feels approachable and "cushioned," mimicking the soft environment a feline-only clinic provides.

## Colors

The palette is designed to lower cortisol levels and project calm. 
- **Primary (Soft Pastel Blue):** Used for primary actions and key brand moments. It represents professional trust and serenity.
- **Secondary (Gentle Sage):** Used for success states, wellness-related information, and secondary accents. It anchors the clinical aspect in nature and health.
- **Tertiary (Calming Cream):** The primary background color. Unlike pure white, this off-white tone feels warmer and more domestic.
- **Neutral (Charcoal):** Reserved for high-legibility text and borders, ensuring the soft palette remains accessible and structured.

## Typography

The typography uses **Plus Jakarta Sans** across all levels to maintain a friendly, modern, and highly legible interface. The rounded terminals of the characters mirror the soft shapes of the UI, reinforcing the "feline-friendly" narrative.

- **Headlines:** Use Bold weights with slight negative letter spacing to feel impactful yet approachable.
- **Body:** Standardized at 16px and 18px for maximum readability for a wide demographic of pet owners.
- **Line Heights:** Generous leading is applied to prevent text-heavy medical information from feeling overwhelming.

## Layout & Spacing

The design system utilizes a **Fixed Grid** for desktop to ensure content remains centered and focused, transitioning to a fluid model for mobile devices. 

- **Desktop:** 12-column grid, 1200px max-width, with wide margins to emphasize a boutique, premium feel.
- **Mobile/Tablet:** 4-column and 8-column grids respectively. 
- **Rhythm:** An 8px base unit drives all padding and margin decisions. Deep vertical padding (`stack-lg`) is used between sections to create a sense of unhurried, calm pacing.

## Elevation & Depth

This design system avoids harsh shadows. Instead, it uses **Ambient Shadows** and **Tonal Layers** to create depth.

- **Surface Levels:** The base background is Tertiary (Cream). Cards and containers use pure White (#FFFFFF) to "lift" off the page.
- **Shadow Profile:** Shadows are highly diffused (20px - 40px blur) with very low opacity (5-8%) and a subtle blue tint (#6C91C2) rather than pure black. This creates a "glow" effect rather than a "drop" effect, contributing to the soft, comforting atmosphere.
- **Interactions:** Upon hover, elements slightly lift (y-offset increases) to provide gentle, tactile feedback.

## Shapes

The shape language is consistently **Rounded**. There are no sharp corners in the UI, as they translate subconsciously to "danger" or "edges"—the opposite of the desired feline-safe environment.

- **Standard Elements:** Buttons, inputs, and small cards use a 0.5rem (8px) radius.
- **Large Elements:** Featured image containers and hero cards use "rounded-xl" (1.5rem / 24px) to create a distinct, modern silhouette.
- **Iconography:** Icons should be thick-stroked with rounded caps and joins, avoiding thin or jagged lines.

## Components

- **Buttons:** Primary buttons are pill-shaped or heavily rounded, using the Primary Blue with white text. Secondary buttons use a Sage outline.
- **Cards:** Cards should have a white background, subtle ambient shadows, and generous internal padding (min 24px). They are the primary vehicle for "Healthy Cat" imagery.
- **Input Fields:** Soft cream backgrounds with 1px Sage borders. Focus states use a soft blue outer glow.
- **Chips/Tags:** Used for service categories (e.g., "Dental," "Vaccination"). These are small, pill-shaped, and use low-saturation background tints of the primary colors.
- **Lists:** Bullet points are replaced with custom "paw" icons or simple soft-blue circles to maintain the brand theme.
- **Image Treatment:** All photography must have rounded corners (matching the `rounded-xl` token) and, where possible, a very subtle soft-focus edge to blend into the cream background.
