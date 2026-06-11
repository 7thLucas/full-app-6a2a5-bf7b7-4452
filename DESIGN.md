# ForageIQ — Design Guidelines

## Brand Identity
- App name: ForageIQ
- Tagline: "Know what's growing. Know what's safe."
- Personality: Trustworthy field companion — practical, calm, authoritative

## Color Palette
- Primary green: #2D6A4F (deep forest/pasture green) — for primary actions, headers
- Secondary green: #40916C (mid-tone grass green) — for accents, active states
- Light background: #F8F9F2 (off-white, natural/earthy) — main background
- Surface white: #FFFFFF — chat bubbles (AI), cards
- User bubble: #D8F3DC (light mint green) — user message bubbles
- Warning red: #C0392B — toxicity/danger warnings (high contrast, bold)
- Warning amber: #E67E22 — caution/moderate risk notices
- Text primary: #1B2E1F (near-black, dark green-tinted)
- Text secondary: #5A7A62 (muted green-gray)
- Border/divider: #C8E6C9

## Typography
- Font family: System sans-serif stack: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
- Heading: 20–24px, font-weight 700, color #1B2E1F
- Body text: 16px, font-weight 400, line-height 1.6
- Chat message text: 15px, line-height 1.5
- Label/meta text: 13px, font-weight 500, color #5A7A62
- Minimum touch target: 44px (mobile-first)

## Layout & Structure
- Mobile-first, responsive
- Max content width: 680px centered
- Header: fixed top bar — logo + app name "ForageIQ", height 56px
- Chat area: scrollable, full-height below header, padding 16px
- Input area: fixed at bottom — text input + send button + optional photo upload icon
- No sidebar, no navigation drawer — single-screen focus

## Chat UI Components

### User Message Bubble
- Background: #D8F3DC
- Border-radius: 18px 18px 4px 18px (rounded except bottom-right)
- Max-width: 78% of container, aligned right
- Padding: 10px 14px

### AI Message Bubble
- Background: #FFFFFF with subtle shadow (0 1px 3px rgba(0,0,0,0.08))
- Border-radius: 18px 18px 18px 4px (rounded except bottom-left)
- Max-width: 88% of container, aligned left
- Padding: 12px 16px

### Identification Result Card (rendered inside AI bubble)
Structured sections — rendered as clean card within the AI response:
1. TOXICITY STATUS — always first, bold label, red/amber/green badge
2. Plant Name — common name large, scientific name smaller italic
3. Nutritional Profile — compact table or inline stats (protein %, fiber %, moisture %)
4. Livestock Suitability — icons or badges for cattle/horse/sheep/goat with rating
5. Seasonal Notes — brief text
6. Feeding Recommendation — bold action statement at bottom

### Safety Warning Banner
- When any toxicity detected: full-width amber or red banner at top of result card
- Background: #FDEDEC (light red) or #FEF9E7 (light amber)
- Left border: 4px solid #C0392B or #E67E22
- Bold icon + text: "CAUTION:" or "WARNING:" prefix

## Input Area
- Input field: rounded pill shape, border 1.5px solid #C8E6C9, focus ring #40916C
- Placeholder text: "Describe a plant or upload a photo..."
- Send button: filled circle, background #2D6A4F, white arrow icon, 44px diameter
- Photo upload: camera icon button, 44px, left of input field
- Background: white with top border separator

## Welcome State
- Centered illustration or icon (leaf/plant motif, simple line art)
- Heading: "What plant would you like to identify?"
- Subtext: "Describe what you see — color, leaf shape, stem, smell — or upload a photo."
- Three example prompt chips (tappable): 
  - "Tall grass with purple seedheads"
  - "Clover-like plant, white flowers"
  - "Broad leaves, strong smell"

## Elevation & Shadows
- Cards: box-shadow 0 1px 4px rgba(0,0,0,0.08)
- Input bar: box-shadow 0 -2px 8px rgba(0,0,0,0.06)
- Header: box-shadow 0 2px 6px rgba(0,0,0,0.08)

## Motion & Interaction
- Typing indicator: three animated dots in AI bubble while response loads
- Smooth scroll to latest message
- Input auto-focus on page load (desktop)
- Tap example chips to pre-fill input

## Mobile Considerations
- Full-height viewport (handle mobile keyboard push-up)
- Large tap targets (minimum 44px)
- No hover-only interactions
- Readable at arm's length in bright outdoor light (high contrast)
