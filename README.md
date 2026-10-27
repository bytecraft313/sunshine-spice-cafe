# Sunshine Spice Bakery & Cafe website

A static site, no build step. Upload the whole folder to any host
(Netlify, Vercel, GitHub Pages, cPanel hosting, etc.) and open `index.html`.

## Files
- `index.html`: the homepage
- `css/styles.css`: all styles; colors and fonts are variables at the top
- `js/main.js`: mobile menu, live "Open now" status (Boise time), footer year
- `images/`: logo, favicon and food photos

## Still needed from the client
Search `index.html` for `TODO` and `[` to find every placeholder:
- Street addresses and a Google Maps link for each location
- Menu descriptions and prices
- A photo of the Shams sisters, and a quote from them
- Press logos (the press section is commented out until then)
- Full-resolution photos and a vector logo (the current images are small Wix copies)

## Changing hours
Update the hours text in `index.html` (hours strip, both location cards,
and the JSON-LD block in the head) and the `OPEN_DAYS`, `OPEN_MIN` and
`CLOSE_MIN` values in `js/main.js`.
