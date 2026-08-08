function findMin(nums) {
    let left = 0;
    let right = nums.length - 1;

    // ✅ Edge case: If the array is already sorted with no rotation
    if (nums[left] <= nums[right]) {
        return nums[left];
    }

    // 🔁 Binary Search Loop
    while (left < right) {
        let mid = Math.floor((left + right) / 2);

        /**
         * 🤔 Key logic:
         * - If nums[mid] > nums[right], the smallest element must be to the right of mid
         * - Else, the smallest element is at mid or to the left of mid
         */
        if (nums[mid] > nums[right]) {
            left = mid + 1; // ➡️ Move right, skip mid
        } else {
            right = mid;    // ⬅️ Include mid in next search
        }
    }

    // ✅ After loop, left === right and points to the minimum element
    return nums[left];
}


console.log(findMin([4, 5, 6, 7, 0, 1, 2]));//0