# Obsidian SO3 Dictionary

A fully-linked implementation of the [Star Ocean: Till the End of Time](https://en.wikipedia.org/wiki/Star_Ocean:_Till_the_End_of_Time) dictionary feature as an [Obsidian](https://obsidian.md) vault.

In this repo you'll find:

- The Obsidian vault proper (in `so3-dictionary`)
- The JS I wrote for all the text manipulation up until I thought "That's enough hand-rolled text manipulation coding in JS for one lifetime, thanks" (in `js-scripts`)
- _**MAJOR SPOILERS FOR THE GAME.**_ Yeah, it's almost 16 years old at this point, but this is just a fair warning!

Currently the CSS theme powering the appearance is stable (-ish) in Obsidian version `0.7.3`. Updates will occur to restabilize as Obsidian rapidly develops!

# Table of contents

- [How to use the vault](#how-to-use-the-vault)
- [Differences from the in-game dictionary](#differences-from-the-in-game-dictionary)
- [Differences in functionality from a typical Obsidian CSS theme](#differences-in-functionality-from-a-typical-obsidian-css-theme)
- [Steps I took to make this (in brief)](#steps-i-took-to-make-this-in-brief)
- [Disclaimer](#disclaimer)
- [Credits](#credits)
- [Screenshots!](#screenshots)

## How to use the vault

1. Download and install [Obsidian](https://obsidian.md).
2. Download/clone down this repo.
3. Copy the `so3-dictionary` folder somewhere (or, use it right from the repo folder via the next step).
4. Open Obsidian and point it to the `so3-dictionary` folder.
5. Click around the category folders or tags and enjoy!

## Differences from the in-game dictionary

### Entry text changes

- All "(Part 2)" and/or "(Part 3)" entries are now moved to their respective base entries, under "Part 2/3" headings.
- All entry types (Weapon, Universe, Scientific Term etc.) have been added to the bottom of each entry's file as `#tags`.

### Linking as per in-game term highlighting

- Many more links were added as I thought appropriate. For example, there were some instances of "humans" or "dragons" that are unlinked in-game, even when almost all other instances are.
- All Remote Station and Federation Station entry titles had their `#` characters removed, but in-entry text correctly links to them. This is due to Obsidian's "link to heading" feature interpreting the numbers as headings.
- All instances of "Federation" link to the entry for the Pangalactic Federation.
- Some highlighted-in-game terms that reference non-existent entries remain unlinked, but are still highlighted as they would be in-game.
- Certain entry types (such as "Myth/Tradition") were altered to get around Obsidian's tag-parsing limitations.

## Differences in functionality from a typical Obsidian CSS theme

All of these can be turned off by going into `obsidian.css` and commenting out/deleting code in the "SO3-Specific Presentational Styles" section. Use `Ctrl/Cmd+F` in your text editor and search for "SO3" to get there fast.

- Your actions bar is now in the bottom right of your note's pane. The entry type now covers the top right of the header so it had to go somewhere!
- The "drag this note" icon has been moved into the square in the top-left of the note.
- All hover-able links pop up a white hand, intended to be analogous to the in-game white glove on menu choices.
- Tooltips when hovering over titles/tabs are removed.
- Note actions have had their descriptive text altered (this text is overall-theme-specific and will have to be disabled from above the SO3-specific styles. Search for the descriptive text to find where it's defined.)

## Steps I took to make this (in brief)

1. Paste the entries into four plaintext files as per the top-level categories in-game. **BIG credit** to [Rashidi's Dictionary FAQ on GameFAQs](https://gamefaqs.gamespot.com/ps2/536705-star-ocean-till-the-end-of-time/faqs/34190) for that starting point.
2. Generate separate entries with NodeJS, adding them to folders by category.
3. **Manually** go into each file to remove _all_ the newlines added by GameFAQs' formatting.
4. Breathe.
5. Hack away for days on a solution to parse each entry, `[[internal-link-ifying]]` each reference (as well as variants like plurals), all without clashes or overlaps.
6. Get really close to intended, then just use Visual Studio Code find-and-replace to get the rest and fix bizarre output errors, so I can move on with my life lol.

## Disclaimer

I DO NOT OWN STAR OCEAN: TILL THE END OF TIME OR RELATED INTELLECTUAL PROPERTY/TRADEMARKS. Any applicable ownership rights/copyrights belong to the game's publisher Square Enix and/or its developer triAce, or any other unmentioned owners.

This project is purely a labor of passion for the game, is NOT FOR PROFIT, and is intended for NON-COMMERCIAL USE.

## Credits

All the entries use text scraped from the [Star Ocean: Till the End of Time Dictionary FAQ on GameFAQs](https://gamefaqs.gamespot.com/ps2/536705-star-ocean-till-the-end-of-time/faqs/34190). All credit for compiling that text goes to the author, [GameFAQs user Rashidi](https://gamefaqs.gamespot.com/community/Rashidi).

All I did was manipulate that text and programmatically add `<span>` tags to that text to generate the Markdown files (and quite a few manually...). BIG credit to Rashidi for actually transcribing what they did and compiling that FAQ.

## Screenshots!

![Irisa in preview mode](screenshots/irisa.png)
![Irisa in edit mode](screenshots/irisa-edit.png)
![Irisa with tags](screenshots/irisa-tag.png)
