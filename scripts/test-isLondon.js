// Test isLondon() function with specified postcodes
const londonPfx = ["E","EC","N","NW","SE","SW","W","WC","BR","CR","DA","EN","HA","IG","KT","RM","SM","TW","UB","WD"]

function isLondon(pc) {
  const c = pc.toUpperCase().replace(/\s+/g,"")
  if (c.length < 2) return null
  const pfx = c.match(/^[A-Z]+/)?.[0] || ""
  return londonPfx.includes(pfx) ? true : false
}

// Test cases from requirements
const tests = [
  { postcode: 'RM12', expected: true, reason: 'RM is in londonPfx' },
  { postcode: 'E14', expected: true, reason: 'E is in londonPfx' },
  { postcode: 'SW1A', expected: true, reason: 'SW is in londonPfx' },
]

console.log('Testing isLondon() function:\n')
tests.forEach(({ postcode, expected, reason }) => {
  const result = isLondon(postcode)
  const status = result === expected ? '✅ PASS' : '❌ FAIL'
  console.log(`${status} isLondon("${postcode}") => ${result} (expected: ${expected})`)
  console.log(`   Reason: ${reason}\n`)
})
