import fs from 'fs-extra'
import generateMatches from './generate-matches'

export default function linkify() {
  fs.emptyDirSync('./out')

  // Step 2: style the links
  fs.readdirSync('./src').forEach((category) => {
    if (category === '.DS_Store') return

    fs.ensureDirSync(`./out/${category}`)

    fs.readdirSync(`./src/${category}`).forEach((entry) => {
      const entryName = entry.split('.md')[0]
      // These are WAY too common...handle them somehow else

      const entryData = fs.readFileSync(`./src/${category}/${entry}`, {
        encoding: 'utf8',
      })

      // Grab matched term data
      const matches = generateMatches(entryData, entryName)

      // Turn entry data into an array for later manipulation
      let finalEntryData = entryData

      // This is to account for each replacement adding characters per match
      let indexOffset = 0
      matches.forEach(({ startIndex, term, base, link }) => {
        // Replace the matched term at match.startIndex + indexOffset with match.link
        finalEntryData = stringSplicer(
          finalEntryData,
          startIndex + indexOffset,
          term.length,
          link
        )

        // Determine the characters now introduced into the data
        const addedChars = link.includes('|')
          ? stringSplicer(link, link.indexOf(term), term.length)
          : link.split(base).join('')

        // Add this count to the offset for future runs
        indexOffset += addedChars.length
      })

      fs.writeFileSync(`./out/${category}/${entryName}.md`, finalEntryData)
    })
  })
}

function stringSplicer(str, where, numToRemove, addition) {
  const stringAsArray = str.split('')
  addition
    ? stringAsArray.splice(where, numToRemove, addition)
    : stringAsArray.splice(where, numToRemove)
  return stringAsArray.join('')
}
