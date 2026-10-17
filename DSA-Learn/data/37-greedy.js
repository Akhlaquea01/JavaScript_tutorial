// Greedy Algorithms — learn-first format. Shape is documented at the top of 00-meta.js.
(function () {
  const pair = (iv) => "[" + iv[0] + ", " + iv[1] + "]";
  const pairs = (a) => "[" + a.map(pair).join(", ") + "]";
  const maxEnd = (ivs) => Math.max(...ivs.map((p) => p[1]));
  const RULES = {
    end: { key: (iv) => iv[1], name: "earliest END first", why: "The interval that finishes first leaves the most room for everything after it." },
    start: { key: (iv) => iv[0], name: "earliest START first", why: "Simply going from left to right." },
    short: { key: (iv) => iv[1] - iv[0], name: "SHORTEST first", why: "Short intervals take up the least room, or so it seems." }
  };
  const best = (ivs) => {
    const sorted = ivs.slice().sort((a, b) => a[1] - b[1]);
    let n = 0;
    let lastEnd = -Infinity;
    for (const [s, e] of sorted) if (s >= lastEnd) { n++; lastEnd = e; }
    return n;
  };
  // the true minimum number of coins (dynamic programming), used only to compare with the greedy answer
  const bestCoins = (coins, amount) => {
    const dp = Array(amount + 1).fill(Infinity);
    const from = Array(amount + 1).fill(0);
    dp[0] = 0;
    for (let a = 1; a <= amount; a++) for (const c of coins) if (a >= c && dp[a - c] + 1 < dp[a]) { dp[a] = dp[a - c] + 1; from[a] = c; }
    if (dp[amount] === Infinity) return null;
    const out = [];
    for (let a = amount; a > 0; a -= from[a]) out.push(from[a]);
    return out.sort((x, y) => y - x);
  };

  const SCHEDULE_CODE = {
    fn: "SCHEDULE",
    lines: [
      `function SCHEDULE(intervals, rule) {`,
      [`  const key = { end: (iv) => iv[1], start: (iv) => iv[0], short: (iv) => iv[1] - iv[0] }[rule];`, "The greedy **rule** is just the sort key: what do we try first?", "sort"],
      [`  const sorted = intervals.slice().sort((a, b) => key(a) - key(b));`, "Sort by that key. This is the most important decision in a greedy algorithm.", "sort"],
      `  const chosen = [];`,
      `  for (const [s, e] of sorted) {`,
      [`    const clash = chosen.some(([cs, ce]) => s < ce && cs < e);`, "Does this interval overlap one we already chose?", "check"],
      [`    if (!clash) chosen.push([s, e]);`, "No clash: **take it, for good**. We never undo a choice.", "take"],
      `  }`,
      [`  return chosen;`, "", "done"],
      `}`
    ]
  };

  const COINS_CODE = {
    fn: "GREEDY_COINS",
    lines: [
      `function GREEDY_COINS(coins, amount) {`,
      [`  const sorted = coins.slice().sort((a, b) => b - a);`, "Biggest coin first. (Always give `sort` a comparator.)", "sort"],
      `  const used = [];`,
      `  let left = amount;`,
      [`  for (const coin of sorted) {`, "Go through the coins from the biggest to the smallest.", "coin"],
      [`    while (left >= coin) {`, "While this coin still fits in what is left...", "take"],
      [`      used.push(coin);`, "...take it...", "take"],
      [`      left -= coin;`, "...and never look back.", "take"],
      `    }`,
      `  }`,
      [`  return left === 0 ? used : null;`, "If something is left over, the greedy got stuck: `null`.", "done"],
      `}`
    ]
  };

  const MAX_NON_OVERLAP_CODE = {
    fn: "maxNonOverlapping",
    lines: [
      `function maxNonOverlapping(intervals) {`,
      [`  const sorted = intervals.slice().sort((a, b) => a[1] - b[1]);`, "Sort by **end** time."],
      `  let count = 0, lastEnd = -Infinity;`,
      `  for (const [s, e] of sorted) {`,
      [`    if (s >= lastEnd) {`, "It starts after the last chosen one ended (touching is fine)."],
      `      count++;`,
      [`      lastEnd = e;`, "Because we go by end time, comparing with the last chosen end is enough."],
      `    }`,
      `  }`,
      `  return count;`,
      `}`
    ]
  };

  const FRACTIONAL_CODE = {
    fn: "fractionalKnapsack",
    lines: [
      `function fractionalKnapsack(items, W) {`,
      [`  const sorted = items.slice().sort((a, b) => b[0] / b[1] - a[0] / a[1]);`, "Best value per kilo first. (items are [value, weight].)"],
      `  let total = 0;`,
      `  for (const [value, weight] of sorted) {`,
      [`    if (W >= weight) {`, "The whole item fits: take it all."],
      `      total += value;`,
      `      W -= weight;`,
      `    } else {`,
      [`      total += value * (W / weight);`, "Only a part fits: take that **fraction** and stop. (Not allowed in the 0/1 version!)"],
      `      break;`,
      `    }`,
      `  }`,
      `  return total;`,
      `}`
    ]
  };

  const COIN_DP_CODE = {
    fn: "coinChangeDP",
    lines: [
      `function coinChangeDP(coins, amount) {`,
      [`  const dp = new Array(amount + 1).fill(Infinity);`, "dp[a] = the fewest coins that make amount a."],
      `  dp[0] = 0;`,
      `  for (let a = 1; a <= amount; a++) {`,
      `    for (const c of coins) {`,
      [`      if (a >= c) dp[a] = Math.min(dp[a], dp[a - c] + 1);`, "Try every coin as the last one. This tries **all** options, so it is always right."],
      `    }`,
      `  }`,
      `  return dp[amount] === Infinity ? -1 : dp[amount];`,
      `}`
    ]
  };

  window.DSA_TOPICS = window.DSA_TOPICS || [];
  window.DSA_TOPICS.push({
    id: "greedy",
    group: "intervals",
    emoji: "🤑",
    title: "Greedy Algorithms",
    tagline: "At every step take the choice that looks best right now, lock it in and never undo it. It is fast and short, but it only works when that local choice is provably safe.",
    level: "Core",
    needs: ["intervals", "backtracking"],

    gist: [
      "**Greedy** = at each step pick the locally best option and **never go back**. The hope (that must be proven) is that these local choices add up to the global optimum.",
      "It works when two properties hold: the **greedy-choice property** (a locally best choice is part of some optimal solution) and **optimal substructure** (what remains is a smaller problem of the same kind).",
      "Typical shape: **sort by the right key, then one pass** taking what is feasible. Usually O(n log n). The sort key is the most important decision.",
      "Greedy is **not always correct**. Test it with a tiny counter-example (brute force on 3 or 4 items). If it fails, you probably need Dynamic Programming or backtracking."
    ],

    complexity: {
      time: "Usually O(n log n)",
      space: "O(1) to O(n)",
      why: [
        "Most greedy algorithms are “sort, then one pass”, so the time is the sort, O(n log n), plus O(n) for the pass. Some need a heap instead (Huffman coding, Dijkstra), giving O(n log n) as well.",
        "Memory is typically O(1) extra (or O(n) for the answer). This speed is why greedy is so attractive when it is correct."
      ],
      more: [
        {
          type: "table",
          heading: "Greedy vs dynamic programming vs backtracking",
          columns: ["", "Greedy", "Dynamic programming", "Backtracking"],
          rows: [
            ["Choices", "One, irrevocable", "Tries all, remembers results", "Tries all, undoes them"],
            ["Needs overlapping subproblems?", "No", "Yes", "No"],
            ["Speed", "Fastest (often O(n log n))", "Polynomial", "Exponential"],
            ["Always correct?", "Only with a proof", "Yes, with a right recurrence", "Yes (it is brute force)"],
            ["Examples", "Interval scheduling, fractional knapsack, Huffman, Dijkstra", "0/1 knapsack, general coin change, LIS", "N-Queens, permutations, Sudoku"]
          ]
        }
      ]
    },

    idea: {
      plain: [
        "A greedy algorithm is like choosing a path by always stepping in the direction that looks best **right now**, and never reconsidering. When the problem has the right structure this gives the perfect answer very quickly. When it does not, you end up with a decent-looking but wrong answer, which is why a greedy needs a **reason** it works.",
        "The reason is usually an **exchange argument**: take any optimal solution that makes a different first choice than the greedy one, swap that choice for the greedy one, and show the solution did not get worse. Then the greedy choice is always safe. You do not have to write proofs in an interview, but you must be able to test a rule: make a tiny example (3 or 4 items), find the true best by brute force and compare it with your rule. One mismatch kills the rule.",
        "In many greedy problems, **sorting makes the right choice visible**. The question to ask is: “sort by *what*?” For scheduling the answer is the **end time**; for the fractional knapsack it is **value per weight**; for coins it is the **largest coin**. The wrong sort key looks plausible and silently gives wrong answers."
      ],
      signals: [
        "“**Minimum number of** …”, “**maximum number of non-overlapping** …”, “schedule / arrange to minimise …”, “can I **reach** the end?”.",
        "After sorting, a simple rule is visible: earliest finish, best ratio, largest first, smallest first.",
        "A tiny brute-force example agrees with the rule every time you try it."
      ],
      notFor: [
        "When your rule has a counter-example: coins `[1, 3, 4]`, amount 6 (greedy gives 4+1+1, the best is 3+3).",
        "When you may not split items (0/1 knapsack): that needs Dynamic Programming."
      ],
      more: [
        {
          type: "code",
          title: "Example 1: most non-overlapping intervals, sorted by END time (verified code)",
          code: MAX_NON_OVERLAP_CODE
        },
        {
          type: "points",
          heading: "Why “end time” and not start or length?",
          items: [
            "**Earliest start** fails on `[1, 10], [2, 3], [4, 5]`: taking `[1, 10]` blocks everything (1 interval), but `[2, 3]` and `[4, 5]` fit (2 intervals).",
            "**Shortest first** fails on `[1, 5], [4, 7], [6, 10]`: the shortest, `[4, 7]`, blocks both others (1 interval), but `[1, 5]` and `[6, 10]` fit (2).",
            "**Earliest end** is safe: the interval that finishes first leaves the largest possible room for all later ones. (Try all three in the demo.)",
            "*Non-overlapping Intervals* (minimum removals) is simply `n - maxNonOverlapping`."
          ]
        },
        {
          type: "code",
          title: "Example 2: fractional knapsack, best value per weight first (verified code)",
          code: FRACTIONAL_CODE
        },
        {
          type: "points",
          heading: "Fractional vs 0/1 knapsack",
          items: [
            "With items `(value, weight)` = (60, 10), (100, 20), (120, 30) and capacity 50, taking whole items by best ratio gives 60 + 100 = 160, but the best 0/1 choice is 100 + 120 = 220. Taking a **fraction** of the last item (80) gives 240 in the fractional version.",
            "So the ratio rule is only correct when you may **split** items. For 0/1 knapsack you need DP (see your `Problems/Techniques/DynamicProgramming/knapsack.js`)."
          ]
        },
        {
          type: "code",
          title: "When greedy fails, fall back on dynamic programming: coin change (verified code)",
          code: COIN_DP_CODE
        },
        {
          type: "table",
          heading: "Classic greedy problems and their rule",
          columns: ["Problem", "Greedy rule"],
          rows: [
            ["Activity selection / minimum removals for non-overlapping", "Sort by end time, skip what clashes"],
            ["Jump Game (the practice problem)", "Track the farthest reachable index; fail if you are beyond it"],
            ["Assign Cookies", "Sort both; give the smallest cookie that satisfies the least greedy child"],
            ["Gas Station", "If total gas ≥ total cost a start exists; restart after the tank goes negative"],
            ["Minimum platforms / meeting rooms", "Sort and sweep (previous topic)"],
            ["Huffman coding", "Always merge the two least frequent nodes (min-heap)"],
            ["Dijkstra / Prim / Kruskal", "Greedy on graphs: the cheapest next edge or node"]
          ]
        }
      ]
    },

    analogy: {
      title: "Planning a movie marathon",
      story: [
        "You want to watch as many films as possible from a cinema's timetable, and you cannot be in two screenings at once. The tempting rules are “start with the first one”, or “pick the shortest film”. But the winning rule is: **pick the film that finishes earliest**, then the next film that starts after it ends, and so on. The film that ends soonest hands you back the most evening.",
        "Now think of a cashier giving change in coins. “Hand over the biggest coin that fits” works perfectly for normal coins (25, 10, 5, 1). But in a country with coins 1, 3 and 4, giving change for 6 with the biggest coin first gives 4 + 1 + 1 (three coins) when 3 + 3 (two coins) is better. A greedy rule is only as good as the money system, or the problem, it is applied to."
      ],
      map: [
        ["Choosing which film to watch next", "Greedy choice at each step"],
        ["“Finishes earliest” rule", "Sort key: the end time"],
        ["Never un-watching a film", "No backtracking: choices are final"],
        ["Cashier with coins 25, 10, 5, 1", "A case where greedy is correct"],
        ["Cashier with coins 1, 3, 4", "A case where greedy fails: use DP"]
      ],
      breaks: "A film marathon has a nice exchange argument that proves the rule. For other problems there is no such guarantee, which is why you must test your rule on small examples."
    },

    demos: [
      {
        id: "schedule",
        title: "Interval scheduling: which rule really works?",
        intro: "Pick as many **non-overlapping** intervals as you can. The only thing that changes is the **order we try them in** (the greedy rule). Run all three rules on the default intervals: only “earliest end first” always finds the best answer.",
        codeIntro: "The loop is the same for every rule. Only the sort key differs.",
        viz: "intervals",
        legend: [["cur", "being considered"], ["good", "chosen"], ["bad", "skipped (clashes)"], ["dim", "not tried yet"]],
        inputs: [
          { type: "intervals", name: "intervals", label: "Intervals (start-end)", value: [[0, 12], [1, 5], [4, 7], [6, 10]], len: [3, 7], min: 0, max: 14 },
          { type: "select", name: "rule", label: "Greedy rule", value: "end", options: [["end", "earliest end first"], ["start", "earliest start first"], ["short", "shortest first"]] }
        ],
        scene: (inp) => ({ min: 0, max: maxEnd(inp.intervals), n: inp.intervals.length, rows: inp.intervals.length, merged: true, mergedMax: inp.intervals.length }),
        frames(inp, snap) {
          const rule = RULES[inp.rule];
          const sorted = inp.intervals.slice().sort((a, b) => rule.key(a) - rule.key(b));
          const n = sorted.length;
          const tones = Array(n).fill(undefined);
          const chosen = [];
          const draw = () => sorted.map((p, i) => ({ s: p[0], e: p[1], tone: tones[i] }));
          const lane = () => chosen.map((p) => ({ s: p[0], e: p[1], tone: "good" }));
          snap({ at: ["sort"], intervals: draw(), merged: [], mergedLabel: "chosen so far", say: "Rule: **" + rule.name + "**. " + rule.why + " The intervals are listed in that order, and we will go through them one by one." });
          for (let i = 0; i < n; i++) tones[i] = "dim";
          sorted.forEach(([s, e], i) => {
            tones[i] = "cur";
            const hit = chosen.find(([cs, ce]) => s < ce && cs < e);
            snap({ at: ["check"], intervals: draw(), merged: lane(), mergedLabel: "chosen so far", vars: { candidate: pair([s, e]) }, say: "Next in line: **" + pair([s, e]) + "**. Does it overlap anything already chosen?" + (hit ? " Yes: it clashes with **" + pair(hit) + "**." : " No.") });
            if (!hit) {
              chosen.push([s, e]);
              tones[i] = "good";
              snap({ at: ["check", "take"], intervals: draw(), merged: lane(), mergedLabel: "chosen so far", vars: { chosen: chosen.length }, say: "No clash, so **take " + pair([s, e]) + "** and never undo it. Chosen so far: **" + chosen.length + "**." });
            } else {
              tones[i] = "bad";
              snap({ at: ["check"], intervals: draw(), merged: lane(), mergedLabel: "chosen so far", vars: { chosen: chosen.length }, say: "**Skip " + pair([s, e]) + "**." });
            }
          });
          const optimum = best(inp.intervals);
          const ok = chosen.length === optimum;
          snap({
            at: ["done"],
            intervals: draw(),
            merged: lane(),
            mergedLabel: "chosen",
            out: "chosen " + chosen.length + (ok ? " (the best possible)" : ", but the best possible is " + optimum),
            outTone: ok ? undefined : "bad",
            say: ok ? "The rule picked **" + chosen.length + "** intervals: **" + pairs(chosen) + "**. That is the best possible here." + (inp.rule === "end" ? " (This rule is always optimal.)" : " (This rule just happened to work on this input; try the default intervals.)") : "The rule picked only **" + chosen.length + "**, but the sort-by-end rule can fit **" + optimum + "**. So “" + rule.name + "” is a **wrong greedy rule** for this problem: this is why you test a greedy idea on small counter-examples.",
            result: chosen.map((p) => p.slice())
          });
        },
        code: SCHEDULE_CODE,
        call: (fn, inp) => fn(inp.intervals, inp.rule)
      },

      {
        id: "coins",
        title: "Coin change: when greedy works and when it breaks",
        intro: "Take the biggest coin as many times as it fits, then the next biggest, and so on. The page also computes the true best answer so you can compare. Try the default `1, 3, 4` for `6` (greedy fails), then `25, 10, 5, 1` for `63` (greedy is perfect), then `5, 4` for `8` (greedy gets stuck).",
        codeIntro: "Greedy coin change in a few lines. Whether it is right depends on the coins, not on the code.",
        viz: "none",
        legend: [["cur", "coin being used"], ["done", "coin already passed"]],
        inputs: [
          { type: "numlist", name: "coins", label: "Coin values", value: [1, 3, 4], len: [2, 5], min: 1, max: 30, unique: true },
          { type: "number", name: "amount", label: "Amount", value: 6, min: 1, max: 60 }
        ],
        frames(inp, snap) {
          const sorted = inp.coins.slice().sort((a, b) => b - a);
          const used = [];
          let left = inp.amount;
          const coinsBox = (k) => ({ label: "coins, biggest first", kind: "list", items: sorted.map((c, j) => ({ v: c, tone: j === k ? "cur" : j < k ? "done" : undefined })) });
          const usedBox = () => ({ label: "coins taken", kind: "list", items: used.slice() });
          snap({ at: ["sort"], vars: { amount: inp.amount, left }, boxes: [coinsBox(-1), usedBox()], say: "Make change for **" + inp.amount + "**. Greedy rule: always use the **biggest coin that still fits**. Coins, biggest first: **" + sorted.join(", ") + "**." });
          sorted.forEach((coin, k) => {
            const times = Math.floor(left / coin);
            for (let t = 0; t < times; t++) used.push(coin);
            const before = left;
            left -= times * coin;
            snap({
              at: ["coin", "take"],
              vars: { coin, taken: times, left },
              boxes: [coinsBox(k), usedBox()],
              say: times > 0 ? "Coin **" + coin + "** fits **" + times + "** time" + (times === 1 ? "" : "s") + " in " + before + ": take " + (times === 1 ? "it" : "them") + ". **" + left + "** left." : "Coin **" + coin + "** does not fit in " + before + ", so skip it."
            });
          });
          const opt = bestCoins(inp.coins, inp.amount);
          const result = left === 0 ? used.slice() : null;
          let out;
          let outTone;
          let say;
          if (left !== 0) {
            out = "greedy got stuck with " + left + " left";
            outTone = "bad";
            say = "**" + left + "** is left over and no coin fits any more: greedy **fails to find any answer**." + (opt ? " But the amount can be made with **" + opt.length + "** coins (" + opt.join(" + ") + "), which a dynamic programming search finds." : " (This amount can not be made at all.)");
          } else if (opt && opt.length < used.length) {
            out = "greedy used " + used.length + " coins, the best is " + opt.length;
            outTone = "bad";
            say = "Greedy used **" + used.length + "** coins (" + used.join(" + ") + "), but **" + opt.length + "** are enough (" + opt.join(" + ") + "). The rule “biggest coin first” is **wrong for these coins**: the local choice was not part of an optimal solution.";
          } else {
            out = "greedy used " + used.length + " coins, which is the best";
            say = "Greedy used **" + used.length + "** coins (" + used.join(" + ") + "), and that is the minimum. For these coins the greedy rule happens to be correct (as it is for 25, 10, 5, 1).";
          }
          snap({ at: ["done"], vars: { left }, boxes: [coinsBox(sorted.length), usedBox()], out, outTone, say, result });
        },
        code: COINS_CODE,
        call: (fn, inp) => fn(inp.coins, inp.amount)
      }
    ],

    checks: [
      {
        code: SCHEDULE_CODE,
        tests: [
          { args: [[[1, 3], [2, 5], [4, 6], [6, 8], [5, 7], [8, 9]], "end"], expect: [[1, 3], [4, 6], [6, 8], [8, 9]] },
          { args: [[[0, 12], [1, 5], [4, 7], [6, 10]], "end"], expect: [[1, 5], [6, 10]] },
          { args: [[[0, 12], [1, 5], [4, 7], [6, 10]], "start"], expect: [[0, 12]] },
          { args: [[[0, 12], [1, 5], [4, 7], [6, 10]], "short"], expect: [[4, 7]] }
        ]
      },
      {
        code: COINS_CODE,
        tests: [
          { args: [[25, 10, 5, 1], 63], expect: [25, 25, 10, 1, 1, 1] },
          { args: [[1, 3, 4], 6], expect: [4, 1, 1] },
          { args: [[5, 4], 8], expect: null }
        ]
      },
      {
        code: MAX_NON_OVERLAP_CODE,
        tests: [
          { args: [[[1, 3], [2, 5], [4, 6], [6, 8], [5, 7], [8, 9]]], expect: 4 },
          { args: [[[1, 2], [2, 3], [3, 4], [1, 3]]], expect: 3 },
          { args: [[[1, 10], [2, 3], [4, 5]]], expect: 2 }
        ]
      },
      {
        code: FRACTIONAL_CODE,
        tests: [
          { args: [[[60, 10], [100, 20], [120, 30]], 50], expect: 240 },
          { args: [[[10, 5]], 2], expect: 4 }
        ]
      },
      {
        code: COIN_DP_CODE,
        tests: [
          { args: [[1, 3, 4], 6], expect: 2 },
          { args: [[5, 4], 8], expect: 2 },
          { args: [[2], 3], expect: -1 },
          { args: [[1, 5, 10, 25], 63], expect: 6 }
        ]
      }
    ],

    mistakes: [
      {
        oops: "Using a greedy rule without testing it",
        why: "Plausible rules fail quietly. “Biggest coin first” is wrong for coins `[1, 3, 4]` and amount 6.",
        fix: "Make a 3 or 4 item example, find the true best by brute force and compare. One mismatch means the rule is wrong."
      },
      {
        oops: "Sorting by the wrong key in interval scheduling",
        why: "Earliest start and shortest-first both have simple counter-examples. Only the **earliest end** is safe.",
        fix: "Sort by end time, then take every interval that starts at or after the last chosen end."
      },
      {
        oops: "Treating 0/1 knapsack like fractional knapsack",
        why: "Best ratio first only works when items can be split. With whole items it can be far from optimal.",
        fix: "If items cannot be split, use dynamic programming."
      },
      {
        oops: "Mistaking “it works on the examples” for a proof",
        why: "The sample inputs in a problem are chosen to be friendly. A greedy that passes them can still fail on the hidden tests.",
        fix: "Think about why a local choice is safe (an exchange argument) and test adversarial inputs."
      },
      {
        oops: "Using `>` instead of `>=` for touching intervals",
        why: "`[1, 3]` and `[3, 5]` can both be chosen; `s > lastEnd` wrongly skips the second one.",
        fix: "Use `s >= lastEnd` unless the problem says touching counts as overlapping."
      },
      {
        oops: "Forgetting the “stuck” case",
        why: "Greedy coin change can leave a remainder (coins `[5, 4]`, amount 8), so “return the count” is not always valid.",
        fix: "Check that nothing is left over, otherwise report failure (or switch to DP)."
      }
    ],

    remember: {
      mnemonic: "Sort by the RIGHT key, take what fits, never look back, then try to break your rule with a tiny counter-example.",
      rules: [
        "Greedy needs: the greedy choice is safe + the rest is the same problem, smaller.",
        "Intervals: sort by **end**. Fractional knapsack: sort by **value / weight**. Canonical coins: biggest first.",
        "Counter-example check: 3 to 4 items, brute force versus your rule.",
        "Greedy fails → dynamic programming (overlapping subproblems) or backtracking.",
        "Typical cost: O(n log n) for the sort + O(n)."
      ],
      template: {
        lines: [
          [`sort candidates by <the right key>`, "The key is the whole idea."],
          [`result = []`, ""],
          [`for (const item of candidates) {`, ""],
          [`  if (feasible(item, result)) result.push(item)`, "Lock it in. No undo."],
          [`}`, ""],
          [`return result`, ""]
        ]
      },
      more: [
        {
          type: "callout",
          kind: "tip",
          text: "Your own files: `Problems/Techniques/Greedy/greedyCoinChange.js` (works for canonical coins only) and `Problems/Techniques/DynamicProgramming/knapsack.js` (the 0/1 version that greedy cannot solve)."
        }
      ]
    },

    practice: {
      title: "Jump Game",
      level: "Medium",
      problem: "`nums[i]` is the **maximum** number of steps you can jump forward from index `i`. Starting at index 0, can you reach the last index? Return `true` or `false`.",
      examples: [
        { input: "nums = [2, 3, 1, 1, 4]", output: "true", why: "Jump 1 step to index 1, then 3 steps to the end." },
        { input: "nums = [3, 2, 1, 0, 4]", output: "false", why: "Every path ends at index 3, where the jump length is 0." }
      ],
      hints: [
        "Do not try every jump. Track just **one number**: the farthest index you can reach so far.",
        "Walk through the array. At index `i` first check: is `i` beyond the farthest index you could reach? Then you are stuck, so return `false`.",
        "Otherwise update `farthest = Math.max(farthest, i + nums[i])`. If you finish the loop, return `true`."
      ],
      solution: {
        explain: [
          "The greedy choice: from every reachable index, only the **farthest** place you can get to matters, because every index before it is also reachable. If you ever stand on an index that is beyond that farthest point, you could not have gotten there.",
          "One pass: O(n) time and O(1) memory."
        ],
        code: {
          fn: "canJump",
          lines: [
            `function canJump(nums) {`,
            [`  let farthest = 0;`, "The farthest index we can reach so far."],
            `  for (let i = 0; i < nums.length; i++) {`,
            [`    if (i > farthest) return false;`, "We can not even get to index i: stuck."],
            [`    farthest = Math.max(farthest, i + nums[i]);`, "From i we can reach up to i + nums[i]."],
            `  }`,
            [`  return true;`, "We never got stuck, so the last index is reachable."],
            `}`
          ]
        }
      },
      tests: [
        { args: [[2, 3, 1, 1, 4]], expect: true },
        { args: [[3, 2, 1, 0, 4]], expect: false },
        { args: [[0]], expect: true },
        { args: [[1, 0, 1]], expect: false },
        { args: [[2, 0, 0]], expect: true },
        { args: [[1, 1, 1, 1]], expect: true },
        { args: [[0, 1]], expect: false },
        { args: [[5, 0, 0, 0, 0, 1]], expect: true }
      ]
    },

    recall: [
      { q: "What are the two properties that make a greedy algorithm correct?", a: "The greedy-choice property (a locally best choice is part of some optimal solution) and optimal substructure (what is left is the same kind of smaller problem)." },
      { q: "Which sort key solves interval scheduling (most non-overlapping intervals)?", a: "The end time: take the interval that finishes first, then the next one that starts after it. Earliest start and shortest-first have counter-examples." },
      { q: "How do you quickly test a greedy idea?", a: "Build a tiny example (3 or 4 items), find the true optimum by brute force, and compare. A single mismatch disproves the rule." },
      { q: "Give a case where greedy coin change fails.", a: "Coins 1, 3, 4 and amount 6: greedy gives 4 + 1 + 1 (3 coins) but 3 + 3 (2 coins) is better. With coins 5 and 4 and amount 8 it gets stuck." },
      { q: "What do you do when greedy is wrong?", a: "Use dynamic programming if subproblems overlap (0/1 knapsack, general coin change), or backtracking with pruning for search problems." }
    ],

    related: {
      topics: ["intervals", "sweep-line", "heap", "backtracking", "pruning"],
      files: ["Problems/Techniques/Greedy/greedyCoinChange.js", "Problems/Techniques/DynamicProgramming/knapsack.js"]
    }
  });
})();
