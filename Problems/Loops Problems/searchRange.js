var searchRange = function (nums, target) {
    let result = [-1, -1];
    let count = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] == target) {
            if (count == 0) {
                result[0] = i;
                count += 1;
            } else {
                result[1] = i;
            }
        }
    }
    return result;
};

console.log(searchRange([5, 7, 7, 8, 8, 10],8));
