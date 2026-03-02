# super-duper-happiness
# super-duper-happiness

A tiny, playful wellness app concept: **Happiness Arcade**.

## Vision
`super-duper-happiness` is a lightweight daily positivity app where users spend 2–3 minutes to log mood, write one gratitude line, and complete one tiny quest.

## v0 Scope
- Mood selection (1–5)
- One-line gratitude entry
- Tiny quest completion toggle
- 7-day local timeline view

## Project Structure
- `app/` – static frontend scaffold (HTML/CSS/JS)
- `docs/PRODUCT.md` – product concept and user flow
- `.github/workflows/ci.yml` – basic repository checks

## Run Locally
From repository root:

```bash
python3 -m http.server 8080
```

Then open:
- `http://localhost:8080/app/`

No backend or database is required for v0; data is stored in browser localStorage.
