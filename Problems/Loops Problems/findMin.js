var findMin = function (nums) {
    let left = 0;
    let right = nums.length - 1;

    // Handle edge case where array is not rotated
    if (nums[left] <= nums[right]) {
        return nums[left];
    }

    while (left < right) {
        let mid = Math.floor((left + right) / 2);

        // If mid element is greater than right, the minimum is in the right half
        if (nums[mid] > nums[right]) {
            left = mid + 1;
        } else {
            // Otherwise, the minimum is in the left half (including mid)
            right = mid;
        }
    }

    return nums[left];
};

console.log(findMin([4, 5, 6, 7, 0, 1, 2]));