# Rider onboarding — Address verification prototype

Interactive prototype mirroring the [Wolt Dx Roo onboarding Figma audit](https://www.figma.com/design/53mKDntRt5qwVMUxnBgvqS/%F0%9F%9A%80-Onboarding---Wolt---Dx---Roo-audit?node-id=40005281-16342).

## Flow

1. Enter name and email
2. Select proof-of-address document type
3. Upload (Take photo / Upload file)
4. Extract address from document
5. Choose eligible riding area (sorted by proximity)
6. Select vehicle type (optional referral code)
7. Waitlist (if oversupplied area selected)

## Run locally

```bash
cd ~/Projects/rider-onboarding-av-prototype
npm install
npm run dev
```

Opens at http://localhost:5174 with a sidebar to jump between screens.

## Figma fidelity

This project uses **CSS design tokens** copied from Figma / Prism exports (`#43ddc8` primary, `#f1f1f1` tertiary, IBM Plex Sans, 393px device width, list cells, pill buttons).

### Upgrading to `@doordash/prism-react`

Prism is on Deliveroo JFrog (not public npm). To use real Prism components:

1. Copy `.npmrc` from `consumer-web-app` (already in this repo).
2. Set `DELIVEROO_JFROG_TOKEN` in your environment.
3. `npm install @doordash/prism-react@9.33.7`
4. Wrap the app with `DeliverooPrismProvider` (see `consumer-web-app/app/areas/shared/pedregal/DeliverooPrismProvider.tsx`) and replace `src/components/prism-components.tsx` with Prism imports.

## Reference Figma nodes

| Screen | Node |
|--------|------|
| Document selection | `40005904:52493` |
| Upload instructions | `40005918:105548` |
| Location / areas | `40006715:36182` |
| Map snippet | `40006715:40600` |
