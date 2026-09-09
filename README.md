# Gopinath S — Gameplay Programmer Portfolio

Updated static portfolio with a 25.6-second gameplay background, responsive contact controls, an on-demand project browser and optimized images. No build step or package installation is required for hosting.

## Preview

Extract the ZIP. In the folder containing index.html run `python -m http.server 8080`, then open http://localhost:8080. Your editor's Live Server extension also works. Double-clicking index.html does not support the JavaScript modules used by the site.

## Customize

Start with **CONFIGURATION.md**. Appearance, responsive behavior, video sources and performance controls are in `config/experience.js`. Profile text/font sizes are in `config/profile.js`; project content in `config/projects.js`; navigation and resume in `config/site.js`; contact details in `config/contact.js`. Global colors/fonts remain in `config/theme.js`.

## Static hosting

Put this folder's CONTENTS in your GitHub Pages publishing directory, with index.html, config, css, js and assets as siblings. Preserve folder names and filename capitalization. Include .nojekyll. Bundled asset paths are relative and have been checked under a repository-style subdirectory. No deployment has been made for you.

Keep your original ZIP as a backup of the full-resolution image inputs. This package uses the smaller assets/optimized library and omits duplicate original images.

## Contact and resume

Your contact information is already configured. The form opens the visitor's email application with a draft; it does not send directly from the website. GitHub Pages cannot execute the optional server example in server/.

The resume button was disabled because its PDF was missing. Add your real PDF and enable its action in config/site.js. No resume was invented or substituted.

## Optional check

With Node.js installed, run `npm run check`. No packages are required. This checks JavaScript syntax, project IDs and configured local assets with exact filename case. It does not verify external services.

See UPDATE-NOTES.md for changes/checks and GAMEPLAY-SOURCES.md for the gameplay link inventory.
