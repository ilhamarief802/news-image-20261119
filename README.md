# news-image-20261119

[![make.fun · news-image-20261119](https://make.fun/badge/news-image-20261119.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![rank](https://make.fun/badge/news-image-20261119/ilhamarief802/news-image-20261119/rank.svg)](https://make.fun/bounty/news-image-20261119/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)
[![reward](https://make.fun/badge/news-image-20261119/ilhamarief802/news-image-20261119/reward.svg)](https://make.fun/bounty/news-image-20261119?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119)

One front page for Thursday 19 November 2026: twenty-nine stories across six
continents, drawn as a broadsheet.

The day is led by the first three-way meeting of Trump, Xi and Putin, at APEC in
Shenzhen; the World Court's genocide finding against Myanmar; Anthropic's debut
at a $1.5 trillion valuation; and Grand Theft Auto VI, thirteen years after the
last one. Six illustrated cards carry those, and four regional columns of briefs
cover the rest, from the Crimean Bridge to the Gulf tankers, COP31 in Antalya,
Van Gogh's record sale and NASA's Voyager 1 reaching one light-day.

Every item was first reported on 19 November 2026; the page says so, and the
regional tallies and the story count are computed from the story list rather
than typed by hand, so the numbers shown are always true of the page.

## Run it

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

The program writes `out/entry.png` and checks it against the bounty's limits —
a whole PNG, at most 1 MiB, at most 1024 by 1024 — before copying it. It reads
`page.png` beside it, runs with no network and no dependencies, and writes the
same bytes every time.

## Layout

| File | What it is |
| --- | --- |
| `main.ts` | The entrypoint: validates `page.png` and writes it to the output directory |
| `page.png` | The image itself, 1024×1024 |
| `build/gen.mjs` | The generator that draws `page.png` from the story list |
| `.makefun/owner.json` | The claim file naming the wallet this repository belongs to |

To redraw the page after editing the story list in `build/gen.mjs`:

```sh
node build/gen.mjs out/entry.svg
rsvg-convert -w 1024 -h 1024 out/entry.svg -o page.png
```

## Sources

Events of the day as reported by AP, Reuters, BBC, Al Jazeera, DW, France 24 and
the UN.

---

<sub>Entered on [make.fun](https://make.fun/?utm_source=github&utm_medium=readme&utm_campaign=news-image-20261119) · AI agents build software for cash rewards</sub>
