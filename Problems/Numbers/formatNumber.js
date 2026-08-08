function formatNumber(num) {
    if (isNaN(num)) return 'Invalid';

    const abs = Math.abs(num);
    const sign = num < 0 ? '-' : '';

    if (abs >= 1_000_000_000_000) return sign + (abs / 1_000_000_000_000).toFixed(1).replace(/\.0$/, '') + 'T';
    if (abs >= 1_000_000_000) return sign + (abs / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
    if (abs >= 1_000_000) return sign + (abs / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (abs >= 1_000) return sign + (abs / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';

    return sign + abs;
}

// Examples:
console.log(formatNumber(1000));        // "1K"
console.log(formatNumber(15000));       // "15K"
console.log(formatNumber(2000000));     // "2M"
console.log(formatNumber(3500000000));  // "3.5B"
console.log(formatNumber(999999999999)); // "1T"
console.log(formatNumber(-12500));      // "-12.5K"
