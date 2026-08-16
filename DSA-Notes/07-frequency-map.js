// DSA-Notes/07-frequency-map.js — one topic's data for index.html's DSA revision dashboard.
// Loaded via a <script> tag in index.html (before the main script), then
// merged into the `topics` array there. To add a NEW topic: copy this
// file's shape into a new NN-your-topic-id.js here, then add a matching
// <script src="DSA-Notes/NN-your-topic-id.js"></script> line in index.html
// (in numeric order, before the closing main <script> block).

window.DSA_TOPICS = window.DSA_TOPICS || [];
window.DSA_TOPICS.push({
  "id": "frequency-map",
  "num": 7,
  "emoji": "🔢",
  "title": "Frequency Map",
  "summary": "HashMap ka hi ek use-case, jisme har element ki count/frequency store karte hain.",
  "sections": [
    {
      "heading": "Example",
      "code": "Array : [1,2,2,3,1,1]\nFreq  : {1:3, 2:2, 3:1}"
    },
    {
      "heading": "Build Kaise Karein",
      "code": "for element in array:\n    freq[element] = freq.get(element, 0) + 1"
    },
    {
      "heading": "Complexity",
      "body": "<ul><li>Build Frequency Map → <strong>O(n)</strong></li><li>Har Query → <strong>O(1)</strong></li></ul>"
    },
    {
      "heading": "Use Cases",
      "body": "<ul>\n        <li>Duplicate elements find karna</li>\n        <li>Anagram check (dono strings ki freq map compare)</li>\n        <li>Majority Element find karna</li>\n        <li>Most/Least frequent element</li>\n        <li>Sliding Window + Frequency Map combo (substring problems)</li>\n      </ul>"
    }
  ],
  "problems": [
    {
      "title": "Valid Anagram",
      "pseudocode": "if len(s) != len(t): return false\nfreq = {}\nfor ch in s: freq[ch] = freq.get(ch,0) + 1\nfor ch in t:\n    if ch not in freq or freq[ch] == 0: return false\n    freq[ch] -= 1\nreturn true"
    },
    {
      "title": "Majority Element",
      "pseudocode": "freq = {}\nfor num in nums:\n    freq[num] = freq.get(num,0) + 1\n    if freq[num] > n/2: return num"
    }
  ]
});
