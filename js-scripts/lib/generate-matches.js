import pluralize from 'pluralize'
import fs from 'fs-extra'
import slugify from 'slugify'

// List of terms not to generate variants for
// because they are too headscratching to reconcile at once
const noVariants = [
  'ID',
  'Arias',
  '4D Being',
  'Continent of Gaitt',
  'Elicoor',
  'Sector',
  'Earth',
  'Aldian',
  'Aqua',
  'Evia',
  'Lias',
  'Grats',
  'Executioners',
  'Dragon',
  'Sphere',
  'Orb',
  'Station',
  'Irisa',
  'Surferio',
  'Apris',
  'Church of Apris',
  'Emissary of Apris',
  'Shar',
  'Solon',
  'Dirna',
  'Oreas',
  'Leiria',
  'Greeton',
  'Vox',
  'Santa',
  'Elena',
  'Vendeen',
  'Battleship',
  'Aire',
  'Erinia',
  'Gravitic Warp',
  'Underdeveloped Planet',
  'Shield',
  'Scanner',
  'Symbol',
  'Palmira',
  'Fayt Leingod',
  'Sophia Esteed',
  'Maria Traydor',
  'Cliff Fittir',
  'Nel Zelpher',
  'Roger S. Huxley',
  'Peppita Rossetti',
  'Adray Lasbard',
  'Albel Nox',
  'Mirage Koas',
  'Admiral Hermes',
  'Aire Duxis',
  'Airyglyph I',
  'Airyglyph XIII',
  'Ameena Leffeld',
  'Ansala',
  'Aqua',
  'Aquaria I',
  'Aquaria XXVII',
  'Arzei Bohnleid',
  'Astor Wolfricht',
  'Azazer',
  'Aznor S. T. Huxley',
  'Balbados',
  'Belzeber',
  'Berial',
  'Biwig',
  'Blair Lansfeld',
  'Boyd',
  'Brigadier General Schilling',
  'Chilico',
  'Clair Lasbard',
  'Clive Esteed',
  'Commodore Wittcomb',
  'Cornelius',
  'Count Mattalun',
  'Count Noppen',
  'Count Woltar',
  'Crestia Dyne',
  'Crosell',
  'Damda Mooda',
  'Demetrio',
  'Dejison',
  'Dion Landers',
  'Dirna Hamilton',
  'Dribe',
  'Duke Vox',
  'Dulcinea Rossetti',
  'Edyglyph',
  'Elayne Rossetti',
  'Eleanor Duran',
  'Elena Frahm',
  'Eliza',
  'Evia',
  'Farleen',
  'Flad Garrand',
  'Folstar Rood',
  'Forte G. Huxley',
  'Gant Basner XIII',
  'Glou Nox',
  'Gonnella',
  'Gossam',
  'Grats',
  'Gregory von Dermein III',
  'Guild Master',
  'Gusto',
  'Irisa Pahm',
  'Izak',
  'Jessie Traydor',
  'Julee Garrand',
  'Kyoko Esteed',
  'Lancar',
  'Leiria Zeit',
  'Lezard',
  'Lias',
  'Lieber',
  'Louise',
  'Lucien',
  'Luther Lansfeld',
  'Mackwell',
  'Magistrate Lasselle',
  'Marietta',
  'Mayu',
  'Meena',
  'Melt',
  'Meryl',
  'Milenya',
  'Mishell',
  'Misty Lear',
  'Nevelle Zelpher',
  'Niklas',
  'Norton',
  'Oddeye',
  'Oreas Rumac',
  'Osman',
  'Palmira Armes',
  'Piccolotto Rossetti',
  'Professor Trillas Bachtein',
  'Puffy',
  'Quantestorie',
  'Richard Traydor',
  'Rigel',
  'Robert Leingod',
  'Romeria Zin Emurille',
  'Ronaldo Dyne',
  'Ruddle Crispin',
  'Rumina G. Dogin',
  'Ryoko Leingod',
  'Santa',
  'Santa, Mercantilean',
  'Schweimer',
  'Sergeant Brooklund',
  'Shar Zeit',
  'Shelby',
  'Sirvia I',
  'Solon Solute',
  'Stanice',
  'Steeg',
  'Tempest',
  'The Killer Chef',
  'The Snake of Valeria',
  'Tynave',
  'Ursus',
]

export default function generateMatches(entryData, callingEntry) {
  const entryNames = []
  const finalMatches = []

  let linkData = {}

  // Step 1: Generate link data
  fs.readdirSync('./src').forEach((category) => {
    if (category === '.DS_Store') return
    linkData[category] = []

    fs.readdirSync(`./src/${category}`).forEach((entry) => {
      linkData[category].push({
        category:
          category === 'Political Bodies + Places'
            ? 'political-bodies-places'
            : slugify(category, { lower: true }),
        name: entry.split('.md')[0],
      })
    })
  })

  let newLinkData = []

  for (let [linkCategory, categoryData] of [...Object.entries(linkData)]) {
    categoryData.forEach((data) => {
      newLinkData.push(data)
    })
  }

  linkData = newLinkData

  fs.readdirSync('./src').forEach((category) => {
    if (category === '.DS_Store') return

    fs.readdirSync(`./src/${category}`).forEach((entry) => {
      entryNames.push(entry.split('.md')[0])
    })
  })

  // Generate match data to be used by the caller
  entryNames.forEach((entryName) => {
    const entryLinkData = linkData.find((data) => data.name === entryName)

    // Plural/singular, and lowercase of each to account for
    // cases like runological weapon, space-time discontinuity effect, etc
    const matchData = {
      base: entryName,
      variants: [],
    }

    let genVariants = true
    if (noVariants.includes(entryName)) {
      genVariants = false
      // Make exceptions here for one-off variants like continent of Gaitt
      switch (entryName) {
        case '4D Being':
          matchData.variants.push('4D beings')
          matchData.off = true
          break
        case 'Continent of Gaitt':
          matchData.variants.push('continent of Gaitt')
          break
        case 'Fayt Leingod':
          matchData.variants.push('Fayt')
          break
        case 'Maria Traydor':
          matchData.variants.push('Maria')
          break
        case 'Nel Zelpher':
          matchData.variants.push('Nel')
          break
        case 'Cliff Fittir':
          matchData.variants.push('Cliff')
          break
        case 'Adray Lasbard':
          matchData.variants.push('Adray')
          break
        case 'Duke Vox':
          matchData.variants.push('Vox')
          break
        case 'Shelby':
          matchData.variants.push('Shelby the Heavy-Handed')
          break
        case 'Sophia Esteed':
          matchData.variants.push('Sophia')
          break
        case 'Roger S. Huxley':
          matchData.variants.push('Roger')
          break
        case 'Peppita Rossetti':
          matchData.variants.push('Peppita')
          break
        case 'Albel Nox':
          matchData.variants.push('Albel')
          matchData.variants.push('Albel the Wicked')
          break
        case 'Mirage Koas':
          matchData.variants.push('Mirage')
          break
        default:
          break
      }
    }

    if (genVariants) {
      matchData.variants.push(pluralize(entryName, 1))
      matchData.variants.push(pluralize(entryName, 2))
      matchData.variants.push(pluralize(entryName, 1).toLowerCase())
      matchData.variants.push(pluralize(entryName, 2).toLowerCase())

      // 2-word entry variants
      if (entryName.split(' ').length === 2) {
        const wordOne = entryName.split(' ')[0]
        const wordTwo = entryName.split(' ')[1]
        matchData.variants.push(wordOne + ' ' + wordTwo.toLowerCase())
        matchData.variants.push(
          wordOne + ' ' + pluralize(wordTwo, 2).toLowerCase()
        )
        matchData.variants.push(wordOne.toLowerCase() + ' ' + wordTwo)
        matchData.variants.push(
          wordOne.toLowerCase() + ' ' + pluralize(wordTwo, 2)
        )
      }

      // 3-word entry variants
      if (entryName.split(' ').length === 3) {
        const wordOne = entryName.split(' ')[0]
        const wordTwo = entryName.split(' ')[1]
        const wordThree = entryName.split(' ')[2]
        matchData.variants.push(
          wordOne.toLowerCase() + ' ' + wordTwo.toLowerCase() + ' ' + wordThree
        )
        matchData.variants.push(
          wordOne + ' ' + wordTwo.toLowerCase() + ' ' + wordThree.toLowerCase()
        )
        matchData.variants.push(
          wordOne.toLowerCase() + ' ' + wordTwo + ' ' + wordThree.toLowerCase()
        )
        matchData.variants.push(
          wordOne.toLowerCase() + ' ' + wordTwo + ' ' + wordThree
        )
        matchData.variants.push(
          wordOne + ' ' + wordTwo.toLowerCase() + ' ' + wordThree
        )
        matchData.variants.push(
          wordOne + ' ' + wordTwo + ' ' + wordThree.toLowerCase()
        )
        matchData.variants.push(
          wordOne + ' ' + wordTwo + ' ' + pluralize(wordThree, 2).toLowerCase()
        )
      }
    }

    // find everywhere where the base title is
    const entryBaseIndices = getInstancesOf(matchData.base, entryData)
    let canGenBaseLinks = true
    // If no entry indices
    // OR the entry is a Sphere employee who shares their first name with an
    // Elicoorian god(dess), don't generate base links
    if (
      entryBaseIndices.length === 0 ||
      (callingEntry === 'Aire Duxis' && entryName === 'Aire') ||
      (callingEntry === 'Dirna Hamilton' && entryName === 'Dirna') ||
      (callingEntry === 'Folstar Rood' && entryName === 'Folstar') ||
      (callingEntry === 'Irisa Pahm' && entryName === 'Irisa') ||
      (callingEntry === 'Leiria Zeit' && entryName === 'Leiria') ||
      (callingEntry === 'Oreas Rumac' && entryName === 'Oreas') ||
      (callingEntry === 'Palmira Armes' && entryName === 'Palmira') ||
      (callingEntry === 'Shar Zeit' && entryName === 'Shar') ||
      (callingEntry === 'Solon Solute' && entryName === 'Solon')
    )
      canGenBaseLinks = false

    if (canGenBaseLinks) {
      // Return array of indices one can find the match and variants
      // If it exists in the entryData, loop over its indices and push to results
      entryBaseIndices.forEach((entryIndex) => {
        // assign all matches a startIndex
        // also list the base they belong to
        finalMatches.push({
          term: matchData.base,
          startIndex: entryIndex,
          link: `<span class="${entryLinkData.category}">[[${matchData.base}]]</span>`,
          base: matchData.base,
        })
      })
    }

    // Similar idea but for variants
    if (matchData.variants.length > 0)
      matchData.variants.forEach((variant) => {
        const variantIndices = getInstancesOf(variant, entryData)
        if (variantIndices.length === 0) return
        if (variant === matchData.base) return
        variantIndices.forEach((variantIndex) => {
          finalMatches.push({
            term: variant,
            startIndex: variantIndex,
            link: `<span class="${entryLinkData.category}">[[${matchData.base}|${variant}]]</span>`,
            base: matchData.base,
          })
        })
      })
  })

  let prevMatch = {
    term: '',
    startIndex: 0,
    link: '',
    base: '',
  }

  const orderedMatches = finalMatches
    .sort((a, b) => {
      return a.startIndex - b.startIndex
    })
    .filter((currMatch) => {
      let valid = true
      const currMatchIsNew = prevMatch.term !== currMatch.term
      const currMatchStartsInsidePrevMatch =
        prevMatch.startIndex < currMatch.startIndex &&
        currMatch.startIndex < prevMatch.startIndex + prevMatch.term.length
      if (currMatchIsNew && currMatchStartsInsidePrevMatch) {
        valid = false
      }

      prevMatch = currMatch
      return valid
    })

  return orderedMatches
}

// Shamelessly ripped from the following StackOverflow. Thanks Tim Down for this answer!
// https://stackoverflow.com/questions/3410464/how-to-find-indices-of-all-occurrences-of-one-string-in-another-in-javascript
function getInstancesOf(searchStr, str, caseSensitive = true) {
  const searchStrLen = searchStr.length
  if (searchStrLen == 0) {
    return []
  }
  let startIndex = 0
  let index
  const indices = []
  if (!caseSensitive) {
    str = str.toLowerCase()
    searchStr = searchStr.toLowerCase()
  }

  while ((index = str.indexOf(searchStr, startIndex)) > -1) {
    const configs = [
      ` ${searchStr} `,
      ` ${searchStr}"`,
      ` ${searchStr}.`,
      ` ${searchStr},`,
      ` ${searchStr}'`,
      ` ${searchStr}?`,
      ` ${searchStr}!`,
      ` ${searchStr}-`,
      ` ${searchStr}-`,
      `\n${searchStr} `,
      `\n${searchStr}"`,
      `\n${searchStr}.`,
      `\n${searchStr},`,
      `\n${searchStr}'`,
      `\n${searchStr}?`,
      `\n${searchStr}!`,
      `\n${searchStr}-`,
      `\n${searchStr}-`,
      `"${searchStr}"`,
      `-${searchStr}.`,
      `-${searchStr} `,
    ]

    // if the config can be found at the index - 1, push index
    for (let config of configs) {
      if (str.indexOf(config) === index - 1) {
        indices.push(index)
      }
    }
    startIndex = index + searchStrLen
  }
  return indices
}
