import fs from 'fs-extra'

export default function generateFiles() {
  // Empty out the out directory
  fs.emptyDirSync('./out')

  // Read the source files' filenames w/extension, into an array
  // Then, loop over it
  fs.readdirSync('./src').forEach((categoryFile) => {
    // Isolate just the filename sans extension
    const category = categoryFile.split('.txt')[0]

    // Create a directory for the category
    fs.ensureDirSync(`./out/${category}`)

    // Read the category's file into a string
    const rawData = fs.readFileSync(`./src/${categoryFile}`, {
      encoding: 'utf8',
    })

    // Split each category's data into chunks on the line breaks
    const rawEntries = rawData.split('\n\n')

    // Loop over each entry
    rawEntries.forEach((entry) => {
      // Chunk the entries by line for now
      const rawEntryData = entry.split('\n')

      // The first line is always the title, but that might change.
      // So, just grab the body for sure for now
      const entryBody = rawEntryData.slice(1)

      // Set up the file tag and title vars
      let entryTitle = ''
      let tag = ''

      // If parentheses in the title get the tag
      // Not foolproof; doesn't account for, say, abbreviations or (Part 2)
      if (rawEntryData[0].includes(' (')) {
        // Grab what's before the split as title
        entryTitle = rawEntryData[0].split(' (')[0]
        // Grab the first instance after a ' (' (should be the last, maybe -1?)
        // Then, grab all text from that but ')', then remove the spaces
        tag = `#${rawEntryData[0]
          .split(' (')[1]
          .slice(0, -1)
          .split(' ')
          .join('')}`
      } else {
        // No parentheses? just set the title
        entryTitle = rawEntryData[0]
      }

      // Got a tag? Add it to the end of the entry body, with a newline to space it
      // This is important for Obsidian's rendering system to isolate it
      if (tag) entryBody.push(`\n${tag}`)

      // Turn that array of entry chunks into a single string, separated by newlines
      // Each newline must be manually removed to ensure it's the right one
      const finalEntryBody = entryBody.join('\n')

      // Write the actual files
      fs.writeFileSync(`./out/${category}/${entryTitle}.md`, finalEntryBody)
    })
  })
}
