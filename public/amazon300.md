## 🗂️ Arrays & Strings

### Q1) Two Sum
- **Problem:** Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Use a hash map to store elements and their indices as you iterate. For each element, check if `target - element` exists in the hash map.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (seen.count(complement)) {
                return {seen[complement], i};
            }
            seen[nums[i]] = i;
        }
        return {};
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q2) Best Time to Buy and Sell Stock I
- **Problem:** Find the maximum profit you can achieve from buying on one day and selling on a future day.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Keep track of the minimum price seen so far. At each step, calculate the profit if you sold today, and update the maximum profit.
- **C++ Code:**
```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int minPrice = INT_MAX, maxProfit = 0;
        for (int price : prices) {
            minPrice = min(minPrice, price);
            maxProfit = max(maxProfit, price - minPrice);
        }
        return maxProfit;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q3) Best Time to Buy and Sell Stock II
- **Problem:** Find the maximum profit where you can buy and sell multiple times (but hold only one share at a time).
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Since we know all future prices, simply add up all the positive differences between consecutive days.
- **C++ Code:**
```cpp
class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int profit = 0;
        for (int i = 1; i < prices.size(); i++) {
            if (prices[i] > prices[i - 1]) {
                profit += prices[i] - prices[i - 1];
            }
        }
        return profit;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q4) Maximum Subarray
- **Problem:** Find the contiguous subarray with the largest sum and return its sum.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Kadane's Algorithm. Keep a running sum. If the running sum becomes less than the current element, reset the running sum to the current element. Update max sum continuously.
- **C++ Code:**
```cpp
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int maxSum = nums[0], currentSum = nums[0];
        for (int i = 1; i < nums.size(); i++) {
            currentSum = max(nums[i], currentSum + nums[i]);
            maxSum = max(maxSum, currentSum);
        }
        return maxSum;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q5) Product of Array Except Self
- **Problem:** Return an array such that `ans[i]` is equal to the product of all elements of `nums` except `nums[i]`, without using division.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Use two passes. First, calculate the prefix product for each index. Then, compute the suffix product on the fly while multiplying it with the prefix product array.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int n = nums.size();
        vector<int> res(n, 1);
        int prefix = 1;
        for (int i = 0; i < n; i++) {
            res[i] = prefix;
            prefix *= nums[i];
        }
        int suffix = 1;
        for (int i = n - 1; i >= 0; i--) {
            res[i] *= suffix;
            suffix *= nums[i];
        }
        return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(1) // Output array doesn't count towards space

---

### Q6) Maximum Product Subarray
- **Problem:** Find a contiguous subarray within an array that has the largest product.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Track both max product and min product (to handle negative numbers turning positive). Swap max and min when a negative number is encountered.
- **C++ Code:**
```cpp
class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int maxProd = nums[0], minProd = nums[0], ans = nums[0];
        for (int i = 1; i < nums.size(); i++) {
            if (nums[i] < 0) swap(maxProd, minProd);
            maxProd = max(nums[i], maxProd * nums[i]);
            minProd = min(nums[i], minProd * nums[i]);
            ans = max(ans, maxProd);
        }
        return ans;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q7) Container With Most Water
- **Problem:** Find two lines that together with the x-axis form a container, such that the container contains the most water.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Use two pointers at the ends of the array. The area is limited by the shorter line. Move the pointer pointing to the shorter line inward to try and find a taller line.
- **C++ Code:**
```cpp
class Solution {
public:
    int maxArea(vector<int>& height) {
        int left = 0, right = height.size() - 1;
        int maxArea = 0;
        while (left < right) {
            int currentArea = min(height[left], height[right]) * (right - left);
            maxArea = max(maxArea, currentArea);
            if (height[left] < height[right]) left++;
            else right--;
        }
        return maxArea;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q8) 3Sum
- **Problem:** Find all unique triplets in the array which gives the sum of zero.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Sort the array. Iterate through, fixing one element `nums[i]`. Use two pointers (`left` and `right`) for the remainder of the array to find pairs that sum to `-nums[i]`. Skip duplicates to ensure unique triplets.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        vector<vector<int>> res;
        sort(nums.begin(), nums.end());
        for (int i = 0; i < nums.size(); i++) {
            if (i > 0 && nums[i] == nums[i - 1]) continue;
            int l = i + 1, r = nums.size() - 1;
            while (l < r) {
                int sum = nums[i] + nums[l] + nums[r];
                if (sum == 0) {
                    res.push_back({nums[i], nums[l], nums[r]});
                    while (l < r && nums[l] == nums[l + 1]) l++;
                    while (l < r && nums[r] == nums[r - 1]) r--;
                    l++; r--;
                } else if (sum < 0) {
                    l++;
                } else {
                    r--;
                }
            }
        }
        return res;
    }
};
```
- **Complexity:** T: O(N^2) | S: O(1) or O(N) depending on sorting algo

---

### Q9) 3Sum Closest
- **Problem:** Find three integers in `nums` such that the sum is closest to `target`.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Sort the array and use the same two-pointer approach as 3Sum. Track the closest sum found so far by comparing absolute differences with the target.
- **C++ Code:**
```cpp
class Solution {
public:
    int threeSumClosest(vector<int>& nums, int target) {
        sort(nums.begin(), nums.end());
        int closest = nums[0] + nums[1] + nums[2];
        for (int i = 0; i < nums.size() - 2; i++) {
            int l = i + 1, r = nums.size() - 1;
            while (l < r) {
                int sum = nums[i] + nums[l] + nums[r];
                if (abs(target - sum) < abs(target - closest)) {
                    closest = sum;
                }
                if (sum < target) l++;
                else if (sum > target) r--;
                else return sum; // Exact match
            }
        }
        return closest;
    }
};
```
- **Complexity:** T: O(N^2) | S: O(1)

---

### Q10) Subarray Sum Equals K
- **Problem:** Return the total number of continuous subarrays whose sum equals to `k`.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Prefix Sum + Hash Map. Track cumulative sum frequencies. If `current_sum - k` exists in the map, it means there's a subarray ending at the current index summing to `k`.
- **C++ Code:**
```cpp
class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        unordered_map<int, int> prefixFreq;
        prefixFreq[0] = 1; // Base case
        int currentSum = 0, count = 0;
        for (int num : nums) {
            currentSum += num;
            if (prefixFreq.count(currentSum - k)) {
                count += prefixFreq[currentSum - k];
            }
            prefixFreq[currentSum]++;
        }
        return count;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q11) Longest Consecutive Sequence
- **Problem:** Find the length of the longest consecutive elements sequence in an unsorted array.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Put all elements in a HashSet. For each number, if `num - 1` is NOT in the set, it's the start of a sequence. Count upwards checking `num + 1`, `num + 2`, etc.
- **C++ Code:**
```cpp
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        unordered_set<int> numSet(nums.begin(), nums.end());
        int longest = 0;
        for (int num : numSet) {
            if (!numSet.count(num - 1)) {
                int currentNum = num;
                int currentStreak = 1;
                while (numSet.count(currentNum + 1)) {
                    currentNum++;
                    currentStreak++;
                }
                longest = max(longest, currentStreak);
            }
        }
        return longest;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q12) Merge Intervals
- **Problem:** Merge all overlapping intervals.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Sort intervals by start time. Iterate and push into result. If current interval's start <= last pushed interval's end, merge them by updating the end time.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        if (intervals.empty()) return {};
        sort(intervals.begin(), intervals.end());
        vector<vector<int>> merged;
        merged.push_back(intervals[0]);
        for (int i = 1; i < intervals.size(); i++) {
            if (intervals[i][0] <= merged.back()[1]) {
                merged.back()[1] = max(merged.back()[1], intervals[i][1]);
            } else {
                merged.push_back(intervals[i]);
            }
        }
        return merged;
    }
};
```
- **Complexity:** T: O(N log N) | S: O(N) for sorting

---

### Q13) Insert Interval
- **Problem:** Insert a new interval into a sorted array of non-overlapping intervals and merge if necessary.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Process intervals in three phases: 1. Add all intervals ending before new interval starts. 2. Merge overlapping intervals into the new interval. 3. Add all remaining intervals.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        vector<vector<int>> res;
        int i = 0, n = intervals.size();
        // Phase 1
        while (i < n && intervals[i][1] < newInterval[0]) {
            res.push_back(intervals[i++]);
        }
        // Phase 2
        while (i < n && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = min(newInterval[0], intervals[i][0]);
            newInterval[1] = max(newInterval[1], intervals[i][1]);
            i++;
        }
        res.push_back(newInterval);
        // Phase 3
        while (i < n) {
            res.push_back(intervals[i++]);
        }
        return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(1) (excluding result array)

---

### Q14) Meeting Rooms II
- **Problem:** Find the minimum number of conference rooms required.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Separate start and end times, sort both. Iterate through start times; if a meeting starts before the earliest ending meeting finishes, you need a new room. Otherwise, a room freed up, so move the end pointer.
- **C++ Code:**
```cpp
class Solution {
public:
    int minMeetingRooms(vector<vector<int>>& intervals) {
        vector<int> starts, ends;
        for (auto& i : intervals) {
            starts.push_back(i[0]);
            ends.push_back(i[1]);
        }
        sort(starts.begin(), starts.end());
        sort(ends.begin(), ends.end());
        int rooms = 0, endIdx = 0;
        for (int i = 0; i < starts.size(); i++) {
            if (starts[i] < ends[endIdx]) {
                rooms++; // Need new room
            } else {
                endIdx++; // Reuse room
            }
        }
        return rooms;
    }
};
```
- **Complexity:** T: O(N log N) | S: O(N)

---

### Q15) Kth Largest Element in Array
- **Problem:** Find the `k`-th largest element in an unsorted array.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Use a min-heap of size K. Iterate through the array, pushing elements into the heap. If heap size exceeds K, pop. The top will hold the Kth largest. (Alternatively, QuickSelect).
- **C++ Code:**
```cpp
class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        priority_queue<int, vector<int>, greater<int>> minHeap;
        for (int num : nums) {
            minHeap.push(num);
            if (minHeap.size() > k) {
                minHeap.pop();
            }
        }
        return minHeap.top();
    }
};
```
- **Complexity:** T: O(N log K) | S: O(K)

---

### Q16) Top K Frequent Elements
- **Problem:** Return the `k` most frequent elements in an integer array.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Count frequencies using a hash map. Use a bucket sort approach where index is frequency and value is a list of elements, or use a min-heap of size K based on frequency. (Bucket sort shown below).
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        unordered_map<int, int> counts;
        for (int num : nums) counts[num]++;
        
        vector<vector<int>> buckets(nums.size() + 1);
        for (auto& [num, freq] : counts) {
            buckets[freq].push_back(num);
        }
        
        vector<int> res;
        for (int i = buckets.size() - 1; i >= 0 && res.size() < k; i--) {
            for (int num : buckets[i]) {
                res.push_back(num);
                if (res.size() == k) break;
            }
        }
        return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q17) Sort Colors
- **Problem:** Sort an array of 0s, 1s, and 2s in-place (Dutch National Flag problem).
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Use 3 pointers: `low`, `mid`, `high`. `low` tracks the boundary for 0s, `high` tracks the boundary for 2s. Traverse with `mid`, swapping elements to correct regions.
- **C++ Code:**
```cpp
class Solution {
public:
    void sortColors(vector<int>& nums) {
        int low = 0, mid = 0, high = nums.size() - 1;
        while (mid <= high) {
            if (nums[mid] == 0) {
                swap(nums[low++], nums[mid++]);
            } else if (nums[mid] == 1) {
                mid++;
            } else {
                swap(nums[mid], nums[high--]);
            }
        }
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q18) Move Zeroes
- **Problem:** Move all 0s to the end of an array while maintaining the relative order of non-zero elements.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Use a two-pointer approach. Keep a pointer `insertPos` for the next non-zero element. Push all non-zeros forward, then fill the remainder with zeros.
- **C++ Code:**
```cpp
class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int insertPos = 0;
        for (int num : nums) {
            if (num != 0) {
                nums[insertPos++] = num;
            }
        }
        while (insertPos < nums.size()) {
            nums[insertPos++] = 0;
        }
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q19) Rotate Array
- **Problem:** Rotate an array to the right by `k` steps.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Array reversal technique. Reverse the entire array, reverse the first `k` elements, then reverse the remaining `n-k` elements.
- **C++ Code:**
```cpp
class Solution {
public:
    void rotate(vector<int>& nums, int k) {
        int n = nums.size();
        k %= n;
        reverse(nums.begin(), nums.end());
        reverse(nums.begin(), nums.begin() + k);
        reverse(nums.begin() + k, nums.end());
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q20) Find Minimum in Rotated Sorted Array
- **Problem:** Find the minimum element in an array sorted in ascending order that has been rotated.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Binary search. If `nums[mid] > nums[right]`, the minimum is in the right half. Else, the minimum is the mid itself or in the left half.
- **C++ Code:**
```cpp
class Solution {
public:
    int findMin(vector<int>& nums) {
        int left = 0, right = nums.size() - 1;
        while (left < right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] > nums[right]) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return nums[left];
    }
};
```
- **Complexity:** T: O(log N) | S: O(1)

---

### Q21) Search in Rotated Sorted Array
- **Problem:** Search for a target value in a rotated sorted array.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Binary search. In each step, check which half is strictly sorted. Then check if the target falls within the bounds of that sorted half to decide where to search next.
- **C++ Code:**
```cpp
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int l = 0, r = nums.size() - 1;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            if (nums[mid] == target) return mid;
            // Left half is sorted
            if (nums[l] <= nums[mid]) {
                if (target >= nums[l] && target < nums[mid]) r = mid - 1;
                else l = mid + 1;
            } 
            // Right half is sorted
            else {
                if (target > nums[mid] && target <= nums[r]) l = mid + 1;
                else r = mid - 1;
            }
        }
        return -1;
    }
};
```
- **Complexity:** T: O(log N) | S: O(1)

---

### Q22) Longest Substring Without Repeating Characters
- **Problem:** Find the length of the longest substring without repeating characters.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Sliding window. Track the latest index of each character using a hash map. Move the left pointer to the right of the previous occurrence if a duplicate is found.
- **C++ Code:**
```cpp
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        vector<int> charIndex(128, -1);
        int maxLen = 0, left = 0;
        for (int right = 0; right < s.length(); right++) {
            if (charIndex[s[right]] >= left) {
                left = charIndex[s[right]] + 1;
            }
            charIndex[s[right]] = right;
            maxLen = max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};
```
- **Complexity:** T: O(N) | S: O(1) (fixed array size 128)

---

### Q23) Longest Repeating Character Replacement
- **Problem:** Find the length of the longest substring containing the same letter you can get after replacing at most `k` characters.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Sliding window. Keep a frequency count. The valid window condition is `(window length) - (max frequency character in window) <= k`. If invalid, shrink left pointer.
- **C++ Code:**
```cpp
class Solution {
public:
    int characterReplacement(string s, int k) {
        vector<int> count(26, 0);
        int maxCount = 0, maxLen = 0, left = 0;
        for (int right = 0; right < s.length(); right++) {
            maxCount = max(maxCount, ++count[s[right] - 'A']);
            if (right - left + 1 - maxCount > k) {
                count[s[left] - 'A']--;
                left++;
            }
            maxLen = max(maxLen, right - left + 1);
        }
        return maxLen;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q24) Minimum Window Substring
- **Problem:** Find the minimum substring of `s` that contains all characters of `t`.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Sliding window with a hash map. Expand `right` to include characters until all of `t` is found. Then shrink `left` to minimize the window as long as it still contains all of `t`.
- **C++ Code:**
```cpp
class Solution {
public:
    string minWindow(string s, string t) {
        vector<int> map(128, 0);
        for (char c : t) map[c]++;
        int counter = t.size(), left = 0, right = 0, d = INT_MAX, head = 0;
        while (right < s.size()) {
            if (map[s[right++]]-- > 0) counter--;
            while (counter == 0) {
                if (right - left < d) d = right - (head = left);
                if (map[s[left++]]++ == 0) counter++;
            }
        }
        return d == INT_MAX ? "" : s.substr(head, d);
    }
};
```
- **Complexity:** T: O(N) | S: O(1) (fixed array size 128)

---

### Q25) Valid Anagram
- **Problem:** Determine if string `t` is an anagram of string `s`.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Count character frequencies of `s`. Decrement for `t`. If all counts are zero, it's an anagram.
- **C++ Code:**
```cpp
class Solution {
public:
    bool isAnagram(string s, string t) {
        if (s.length() != t.length()) return false;
        vector<int> count(26, 0);
        for (int i = 0; i < s.length(); i++) {
            count[s[i] - 'a']++;
            count[t[i] - 'a']--;
        }
        for (int c : count) {
            if (c != 0) return false;
        }
        return true;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q26) Group Anagrams
- **Problem:** Group an array of strings into anagrams.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Use a hash map where the key is the sorted version of the string, and the value is a list of all strings that match that sorted version.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        unordered_map<string, vector<string>> map;
        for (string s : strs) {
            string key = s;
            sort(key.begin(), key.end());
            map[key].push_back(s);
        }
        vector<vector<string>> res;
        for (auto& pair : map) {
            res.push_back(pair.second);
        }
        return res;
    }
};
```
- **Complexity:** T: O(N * K log K) where N is strings and K is max length | S: O(N * K)

---

### Q27) Valid Palindrome
- **Problem:** Check if a string is a palindrome, considering only alphanumeric characters and ignoring cases.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Two pointers starting from the beginning and end. Skip non-alphanumeric characters, and compare lowercase versions of the valid characters.
- **C++ Code:**
```cpp
class Solution {
public:
    bool isPalindrome(string s) {
        int l = 0, r = s.length() - 1;
        while (l < r) {
            while (l < r && !isalnum(s[l])) l++;
            while (l < r && !isalnum(s[r])) r--;
            if (tolower(s[l]) != tolower(s[r])) return false;
            l++; r--;
        }
        return true;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q28) Longest Palindromic Substring
- **Problem:** Find the longest palindromic substring in `s`.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Expand Around Center. For each character (and each pair of characters), expand outwards to find the maximum length palindrome centered there.
- **C++ Code:**
```cpp
class Solution {
public:
    string longestPalindrome(string s) {
        int start = 0, maxLen = 0;
        for (int i = 0; i < s.length(); i++) {
            auto expand = [&](int l, int r) {
                while (l >= 0 && r < s.length() && s[l] == s[r]) { l--; r++; }
                return r - l - 1;
            };
            int len = max(expand(i, i), expand(i, i + 1));
            if (len > maxLen) {
                maxLen = len;
                start = i - (len - 1) / 2;
            }
        }
        return s.substr(start, maxLen);
    }
};
```
- **Complexity:** T: O(N^2) | S: O(1)

---

### Q29) Palindromic Substrings
- **Problem:** Count how many palindromic substrings exist in a string.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Expand Around Center. Similar to Q28, but instead of tracking the max length, just increment a counter every time a valid palindrome is found during expansion.
- **C++ Code:**
```cpp
class Solution {
public:
    int countSubstrings(string s) {
        int count = 0;
        for (int i = 0; i < s.length(); i++) {
            auto expand = [&](int l, int r) {
                int c = 0;
                while (l >= 0 && r < s.length() && s[l] == s[r]) {
                    c++; l--; r++;
                }
                return c;
            };
            count += expand(i, i);     // Odd lengths
            count += expand(i, i + 1); // Even lengths
        }
        return count;
    }
};
```
- **Complexity:** T: O(N^2) | S: O(1)

---

### Q30) String to Integer (atoi)
- **Problem:** Implement the `atoi` function to convert a string to a 32-bit signed integer.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Iterate the string: skip leading spaces, check for sign, then parse digits until a non-digit is hit. Protect against integer overflow by checking `INT_MAX / 10`.
- **C++ Code:**
```cpp
class Solution {
public:
    int myAtoi(string s) {
        int i = 0, sign = 1, result = 0;
        while (i < s.size() && s[i] == ' ') i++;
        if (i < s.size() && (s[i] == '-' || s[i] == '+')) {
            sign = (s[i++] == '-') ? -1 : 1;
        }
        while (i < s.size() && isdigit(s[i])) {
            int digit = s[i++] - '0';
            if (result > INT_MAX / 10 || (result == INT_MAX / 10 && digit > 7)) {
                return sign == 1 ? INT_MAX : INT_MIN;
            }
            result = result * 10 + digit;
        }
        return result * sign;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q31) Integer to Roman
- **Problem:** Convert an integer to a Roman numeral string.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Use parallel arrays (or a list of pairs) of values and symbols sorted descending. Subtract the largest possible value and append its symbol until `num` is 0.
- **C++ Code:**
```cpp
class Solution {
public:
    string intToRoman(int num) {
        vector<pair<int, string>> rom = {
            {1000, "M"}, {900, "CM"}, {500, "D"}, {400, "CD"},
            {100, "C"}, {90, "XC"}, {50, "L"}, {40, "XL"},
            {10, "X"}, {9, "IX"}, {5, "V"}, {4, "IV"}, {1, "I"}
        };
        string res = "";
        for (auto& p : rom) {
            while (num >= p.first) {
                res += p.second;
                num -= p.first;
            }
        }
        return res;
    }
};
```
- **Complexity:** T: O(1) (Bounded integer) | S: O(1)

---

### Q32) Roman to Integer
- **Problem:** Convert a Roman numeral string to an integer.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Iterate right to left. Add the value of the symbol. If the current symbol's value is less than the previous one, subtract it instead.
- **C++ Code:**
```cpp
class Solution {
public:
    int romanToInt(string s) {
        unordered_map<char, int> m = {
            {'I', 1}, {'V', 5}, {'X', 10}, {'L', 50},
            {'C', 100}, {'D', 500}, {'M', 1000}
        };
        int res = 0, prev = 0;
        for (int i = s.length() - 1; i >= 0; i--) {
            int curr = m[s[i]];
            if (curr < prev) res -= curr;
            else res += curr;
            prev = curr;
        }
        return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q33) Implement strStr()
- **Problem:** Find the index of the first occurrence of string `needle` in string `haystack`, or -1 if not found.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Sliding window checking substrings (or KMP for O(N+M)). The STL `find` function handles it directly, but implementing a simple nested loop or KMP is expected.
- **C++ Code:**
```cpp
class Solution {
public:
    int strStr(string haystack, string needle) {
        int m = haystack.size(), n = needle.size();
        for (int i = 0; i <= m - n; i++) {
            if (haystack.substr(i, n) == needle) {
                return i;
            }
        }
        return -1;
    }
};
```
- **Complexity:** T: O(N * M) | S: O(1)

---

### Q34) Reverse Words in a String
- **Problem:** Reverse the order of words in a string, removing extra spaces.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Use two pointers to reverse the whole string, then reverse each individual word. Lastly, clean up the extra spaces using a two-pointer shift.
- **C++ Code:**
```cpp
class Solution {
public:
    string reverseWords(string s) {
        reverse(s.begin(), s.end());
        int i = 0, j = 0, n = s.size(), lastSpace = 0;
        while (j < n) {
            while (j < n && s[j] == ' ') j++; // skip spaces
            int start = i;
            while (j < n && s[j] != ' ') {
                s[i++] = s[j++];
                lastSpace = i;
            }
            reverse(s.begin() + start, s.begin() + lastSpace);
            if (i < n) s[i++] = ' ';
        }
        s.resize(lastSpace);
        return s;
    }
};
```
- **Complexity:** T: O(N) | S: O(1) in-place modifications

---

### Q35) Find All Anagrams in a String
- **Problem:** Find all start indices of `p`'s anagrams in `s`.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Sliding window with a character frequency map. Maintain a window of size `p.length()` over `s` and update character counts. If the map matches `p`'s map, record the index.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> findAnagrams(string s, string p) {
        vector<int> res;
        if (s.size() < p.size()) return res;
        vector<int> pCount(26, 0), sCount(26, 0);
        for (int i = 0; i < p.size(); i++) {
            pCount[p[i] - 'a']++;
            sCount[s[i] - 'a']++;
        }
        if (pCount == sCount) res.push_back(0);
        for (int i = p.size(); i < s.size(); i++) {
            sCount[s[i] - 'a']++;
            sCount[s[i - p.size()] - 'a']--;
            if (pCount == sCount) res.push_back(i - p.size() + 1);
        }
        return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(1) (Array of 26)

---

### Q36) Permutation in String
- **Problem:** Return true if `s2` contains a permutation of `s1`.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Same sliding window hash map approach as Find All Anagrams. Compare frequency array of `s1` with a fixed window frequency array of `s2`.
- **C++ Code:**
```cpp
class Solution {
public:
    bool checkInclusion(string s1, string s2) {
        if (s1.size() > s2.size()) return false;
        vector<int> map1(26, 0), map2(26, 0);
        for (int i = 0; i < s1.size(); i++) {
            map1[s1[i] - 'a']++;
            map2[s2[i] - 'a']++;
        }
        if (map1 == map2) return true;
        for (int i = s1.size(); i < s2.size(); i++) {
            map2[s2[i] - 'a']++;
            map2[s2[i - s1.size()] - 'a']--;
            if (map1 == map2) return true;
        }
        return false;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q37) Encode and Decode Strings
- **Problem:** Design an algorithm to encode a list of strings to a single string and decode it back.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Prepend each string with its length followed by a delimiter (e.g., `#`). For decoding, read the integer length until `#`, then extract that many characters.
- **C++ Code:**
```cpp
class Codec {
public:
    string encode(vector<string>& strs) {
        string res = "";
        for (string s : strs) {
            res += to_string(s.length()) + "#" + s;
        }
        return res;
    }

    vector<string> decode(string s) {
        vector<string> res;
        int i = 0;
        while (i < s.size()) {
            int j = i;
            while (s[j] != '#') j++;
            int len = stoi(s.substr(i, j - i));
            res.push_back(s.substr(j + 1, len));
            i = j + 1 + len;
        }
        return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(N) for string building

---

### Q38) Reorganize String
- **Problem:** Rearrange characters in a string so that no two adjacent characters are the same.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Count frequencies. Use a max-heap to continually append the most frequent remaining character that isn't the one just used.
- **C++ Code:**
```cpp
class Solution {
public:
    string reorganizeString(string s) {
        unordered_map<char, int> freq;
        for (char c : s) freq[c]++;
        priority_queue<pair<int, char>> pq;
        for (auto& p : freq) pq.push({p.second, p.first});
        
        string res = "";
        pair<int, char> prev = {0, '#'};
        while (!pq.empty()) {
            auto curr = pq.top(); pq.pop();
            res += curr.second;
            curr.first--;
            if (prev.first > 0) pq.push(prev);
            prev = curr;
        }
        return res.size() == s.size() ? res : "";
    }
};
```
- **Complexity:** T: O(N log K) | S: O(K) where K <= 26

---

### Q39) Count and Say
- **Problem:** The count-and-say sequence is generated by describing the previous term (e.g., "1" -> "one 1" -> "11"). Find the `n`-th term.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Start with "1". Loop `n-1` times. For the current string, count consecutive identical characters and append `count` + `character` to a new string.
- **C++ Code:**
```cpp
class Solution {
public:
    string countAndSay(int n) {
        string res = "1";
        for (int i = 2; i <= n; i++) {
            string temp = "";
            int count = 1;
            for (int j = 1; j <= res.size(); j++) {
                if (j < res.size() && res[j] == res[j - 1]) count++;
                else {
                    temp += to_string(count) + res[j - 1];
                    count = 1;
                }
            }
            res = temp;
        }
        return res;
    }
};
```
- **Complexity:** T: O(M) where M is total length of string generated | S: O(L) where L is max string length

---

### Q40) Compare Version Numbers
- **Problem:** Compare two version number strings.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Iterate both strings simultaneously using two pointers. Parse the numeric chunk between `.` delimiters and compare them.
- **C++ Code:**
```cpp
class Solution {
public:
    int compareVersion(string version1, string version2) {
        int i = 0, j = 0;
        while (i < version1.size() || j < version2.size()) {
            int num1 = 0, num2 = 0;
            while (i < version1.size() && version1[i] != '.') {
                num1 = num1 * 10 + (version1[i++] - '0');
            }
            while (j < version2.size() && version2[j] != '.') {
                num2 = num2 * 10 + (version2[j++] - '0');
            }
            if (num1 > num2) return 1;
            else if (num1 < num2) return -1;
            i++; j++; // skip the '.'
        }
        return 0;
    }
};
```
- **Complexity:** T: O(max(N, M)) | S: O(1)

---

### Q41) Longest Common Prefix
- **Problem:** Find the longest common prefix string amongst an array of strings.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Take the first string as the base. Compare character by character with the rest of the strings until a mismatch is found or the string ends.
- **C++ Code:**
```cpp
class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        if (strs.empty()) return "";
        string prefix = strs[0];
        for (int i = 1; i < strs.size(); i++) {
            while (strs[i].find(prefix) != 0) {
                prefix = prefix.substr(0, prefix.size() - 1);
                if (prefix.empty()) return "";
            }
        }
        return prefix;
    }
};
```
- **Complexity:** T: O(S) where S is sum of characters | S: O(1)

---

### Q42) Isomorphic Strings
- **Problem:** Determine if two strings are isomorphic (characters of `s` can be replaced to get `t` maintaining order).
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Use two arrays/hashmaps to map characters of `s` to `t` and `t` to `s`. Ensure consistent 1:1 mapping at each step.
- **C++ Code:**
```cpp
class Solution {
public:
    bool isIsomorphic(string s, string t) {
        vector<int> mapS(256, -1), mapT(256, -1);
        for (int i = 0; i < s.length(); i++) {
            if (mapS[s[i]] != mapT[t[i]]) return false;
            mapS[s[i]] = i;
            mapT[t[i]] = i;
        }
        return true;
    }
};
```
- **Complexity:** T: O(N) | S: O(1) (Fixed 256 size array)

---

### Q43) Word Pattern
- **Problem:** Find if a string `s` follows a given `pattern` mapping exactly.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Extract words from `s`. Use two hashmaps to strictly map char -> word and word -> char.
- **C++ Code:**
```cpp
class Solution {
public:
    bool wordPattern(string pattern, string s) {
        unordered_map<char, string> charToWord;
        unordered_map<string, char> wordToChar;
        stringstream ss(s);
        string word;
        int i = 0, n = pattern.size();
        
        while (ss >> word) {
            if (i == n) return false;
            char c = pattern[i];
            if (charToWord.count(c) && charToWord[c] != word) return false;
            if (wordToChar.count(word) && wordToChar[word] != c) return false;
            charToWord[c] = word;
            wordToChar[word] = c;
            i++;
        }
        return i == n;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q44) Valid Parentheses
- **Problem:** Determine if input string has validly matched brackets `()[]{}`.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Stack. Push opening brackets. For closing brackets, check if stack is empty or the top doesn't match the corresponding opening bracket.
- **C++ Code:**
```cpp
class Solution {
public:
    bool isValid(string s) {
        stack<char> st;
        for (char c : s) {
            if (c == '(' || c == '{' || c == '[') st.push(c);
            else {
                if (st.empty()) return false;
                if (c == ')' && st.top() != '(') return false;
                if (c == '}' && st.top() != '{') return false;
                if (c == ']' && st.top() != '[') return false;
                st.pop();
            }
        }
        return st.empty();
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q45) Simplify Path
- **Problem:** Convert an absolute Unix path to its simplified canonical path.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Parse by separating with `/`. Use a stack (or vector) to build the path. Push valid directory names, ignore `.` and empty strings, and pop for `..`.
- **C++ Code:**
```cpp
class Solution {
public:
    string simplifyPath(string path) {
        vector<string> st;
        stringstream ss(path);
        string dir;
        while (getline(ss, dir, '/')) {
            if (dir == "" || dir == ".") continue;
            if (dir == "..") {
                if (!st.empty()) st.pop_back();
            } else {
                st.push_back(dir);
            }
        }
        string res = "";
        for (string s : st) res += "/" + s;
        return res.empty() ? "/" : res;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q46) Decode String
- **Problem:** Decode a string formatted as `k[encoded_string]`, expanding it `k` times.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Use a stack. When encountering `]`, pop characters to build the string, pop the `[`, then pop the number. Multiply the string and push it back onto the stack.
- **C++ Code:**
```cpp
class Solution {
public:
    string decodeString(string s) {
        stack<int> counts;
        stack<string> strings;
        string res = "";
        int num = 0;
        for (char c : s) {
            if (isdigit(c)) num = num * 10 + (c - '0');
            else if (isalpha(c)) res += c;
            else if (c == '[') {
                counts.push(num);
                strings.push(res);
                num = 0; res = "";
            } else if (c == ']') {
                string temp = strings.top(); strings.pop();
                int k = counts.top(); counts.pop();
                while (k--) temp += res;
                res = temp;
            }
        }
        return res;
    }
};
```
- **Complexity:** T: O(Output Length) | S: O(Output Length)

---

### Q47) Next Permutation
- **Problem:** Rearrange numbers into the lexicographically next greater permutation.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Find the first dip from the right (`nums[i] < nums[i+1]`). Find the smallest element to its right that is greater than it. Swap them. Reverse everything to the right of `i`.
- **C++ Code:**
```cpp
class Solution {
public:
    void nextPermutation(vector<int>& nums) {
        int i = nums.size() - 2;
        while (i >= 0 && nums[i] >= nums[i + 1]) i--;
        if (i >= 0) {
            int j = nums.size() - 1;
            while (nums[j] <= nums[i]) j--;
            swap(nums[i], nums[j]);
        }
        reverse(nums.begin() + i + 1, nums.end());
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q48) Majority Element
- **Problem:** Find the element that appears more than `n / 2` times.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Boyer-Moore Voting Algorithm. Maintain a candidate and a count. If count hits 0, update candidate. If matching candidate, increment count; otherwise decrement.
- **C++ Code:**
```cpp
class Solution {
public:
    int majorityElement(vector<int>& nums) {
        int count = 0, candidate = 0;
        for (int num : nums) {
            if (count == 0) candidate = num;
            count += (num == candidate) ? 1 : -1;
        }
        return candidate;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q49) Majority Element II
- **Problem:** Find all elements that appear more than `n / 3` times.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Extended Boyer-Moore Voting Algorithm. Keep 2 candidates and 2 counts. Make sure to do a second pass to verify if the final candidates actually appear more than `n/3` times.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> majorityElement(vector<int>& nums) {
        int c1 = 0, c2 = 0, count1 = 0, count2 = 0;
        for (int n : nums) {
            if (n == c1) count1++;
            else if (n == c2) count2++;
            else if (count1 == 0) { c1 = n; count1 = 1; }
            else if (count2 == 0) { c2 = n; count2 = 1; }
            else { count1--; count2--; }
        }
        count1 = count2 = 0;
        for (int n : nums) {
            if (n == c1) count1++;
            else if (n == c2) count2++;
        }
        vector<int> res;
        if (count1 > nums.size() / 3) res.push_back(c1);
        if (count2 > nums.size() / 3) res.push_back(c2);
        return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q50) Missing Number
- **Problem:** Find the missing number in an array containing `n` distinct numbers in the range `[0, n]`.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Expected sum of `1..n` is `n * (n + 1) / 2`. Subtract each number in the array. The remaining value is the missing number. (Or use XOR).
- **C++ Code:**
```cpp
class Solution {
public:
    int missingNumber(vector<int>& nums) {
        int expectedSum = nums.size() * (nums.size() + 1) / 2;
        int actualSum = 0;
        for (int num : nums) actualSum += num;
        return expectedSum - actualSum;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q51) First Missing Positive
- **Problem:** Find the smallest missing positive integer in an unsorted array.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Cycle sort approach. Try to place each number `i` at index `i - 1`. Finally, scan the array; the first index where `nums[i] != i + 1` gives the missing positive.
- **C++ Code:**
```cpp
class Solution {
public:
    int firstMissingPositive(vector<int>& nums) {
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {
                swap(nums[i], nums[nums[i] - 1]);
            }
        }
        for (int i = 0; i < n; i++) {
            if (nums[i] != i + 1) return i + 1;
        }
        return n + 1;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q52) Set Matrix Zeroes
- **Problem:** If an element is 0, set its entire row and column to 0 in-place.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Use the first row and first column as markers to record if a specific row or column needs to be zeroed. Use separate variables for the first row/col themselves.
- **C++ Code:**
```cpp
class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        bool firstRowZero = false, firstColZero = false;
        int rows = matrix.size(), cols = matrix[0].size();
        for (int i = 0; i < rows; i++) {
            if (matrix[i][0] == 0) firstColZero = true;
        }
        for (int j = 0; j < cols; j++) {
            if (matrix[0][j] == 0) firstRowZero = true;
        }
        for (int i = 1; i < rows; i++) {
            for (int j = 1; j < cols; j++) {
                if (matrix[i][j] == 0) {
                    matrix[i][0] = 0;
                    matrix[0][j] = 0;
                }
            }
        }
        for (int i = 1; i < rows; i++) {
            for (int j = 1; j < cols; j++) {
                if (matrix[i][0] == 0 || matrix[0][j] == 0) {
                    matrix[i][j] = 0;
                }
            }
        }
        if (firstColZero) for (int i = 0; i < rows; i++) matrix[i][0] = 0;
        if (firstRowZero) for (int j = 0; j < cols; j++) matrix[0][j] = 0;
    }
};
```
- **Complexity:** T: O(R * C) | S: O(1)

---

### Q53) Spiral Matrix
- **Problem:** Return all elements of an `m x n` matrix in spiral order.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Define boundaries `top`, `bottom`, `left`, `right`. Traverse top row, right col, bottom row, left col, updating boundaries each time. Break if boundaries cross.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        vector<int> res;
        int top = 0, bottom = matrix.size() - 1;
        int left = 0, right = matrix[0].size() - 1;
        while (top <= bottom && left <= right) {
            for (int i = left; i <= right; i++) res.push_back(matrix[top][i]);
            top++;
            for (int i = top; i <= bottom; i++) res.push_back(matrix[i][right]);
            right--;
            if (top <= bottom) {
                for (int i = right; i >= left; i--) res.push_back(matrix[bottom][i]);
                bottom--;
            }
            if (left <= right) {
                for (int i = bottom; i >= top; i--) res.push_back(matrix[i][left]);
                left++;
            }
        }
        return res;
    }
};
```
- **Complexity:** T: O(R * C) | S: O(1)

---

### Q54) Diagonal Traverse
- **Problem:** Return an array of all the elements of a matrix in diagonal order.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Direction flips. Sum of row `i` and col `j` identifies the diagonal. If sum is even, traverse up-right (`r-1, c+1`); if odd, traverse down-left (`r+1, c-1`). Adjust boundaries.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> findDiagonalOrder(vector<vector<int>>& mat) {
        int m = mat.size(), n = mat[0].size();
        vector<int> res(m * n);
        int r = 0, c = 0;
        for (int i = 0; i < m * n; i++) {
            res[i] = mat[r][c];
            if ((r + c) % 2 == 0) { // Moving up
                if (c == n - 1) { r++; }
                else if (r == 0) { c++; }
                else { r--; c++; }
            } else { // Moving down
                if (r == m - 1) { c++; }
                else if (c == 0) { r++; }
                else { r++; c--; }
            }
        }
        return res;
    }
};
```
- **Complexity:** T: O(R * C) | S: O(1)

---

### Q55) Increasing Triplet Subsequence
- **Problem:** Return true if there exist `i < j < k` such that `nums[i] < nums[j] < nums[k]`.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Keep track of the two smallest numbers seen so far (`first` and `second`). If you find a number bigger than both, a triplet exists.
- **C++ Code:**
```cpp
class Solution {
public:
    bool increasingTriplet(vector<int>& nums) {
        int first = INT_MAX, second = INT_MAX;
        for (int num : nums) {
            if (num <= first) first = num;
            else if (num <= second) second = num;
            else return true;
        }
        return false;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q56) Longest Mountain in Array
- **Problem:** Find the length of the longest subarray which is a mountain (strictly increasing, then strictly decreasing).
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Find a peak (`nums[i-1] < nums[i] > nums[i+1]`). Expand outwards to find the full width of the mountain. Move your pointer past the current mountain.
- **C++ Code:**
```cpp
class Solution {
public:
    int longestMountain(vector<int>& arr) {
        int maxLen = 0, n = arr.size();
        for (int i = 1; i < n - 1; i++) {
            if (arr[i] > arr[i - 1] && arr[i] > arr[i + 1]) { // peak found
                int left = i - 1, right = i + 1;
                while (left > 0 && arr[left - 1] < arr[left]) left--;
                while (right < n - 1 && arr[right + 1] < arr[right]) right++;
                maxLen = max(maxLen, right - left + 1);
            }
        }
        return maxLen;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q57) Maximum Points You Can Obtain from Cards
- **Problem:** Pick exactly `k` cards from either the beginning or the end of an array to maximize your sum.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Sliding window. Since you pick `k` cards from ends, it's equivalent to finding a contiguous subarray of size `n - k` with the *minimum* sum.
- **C++ Code:**
```cpp
class Solution {
public:
    int maxScore(vector<int>& cardPoints, int k) {
        int totalSum = 0;
        for (int p : cardPoints) totalSum += p;
        int windowSize = cardPoints.size() - k;
        int currentWindow = 0;
        for (int i = 0; i < windowSize; i++) currentWindow += cardPoints[i];
        int minWindow = currentWindow;
        for (int i = windowSize; i < cardPoints.size(); i++) {
            currentWindow += cardPoints[i] - cardPoints[i - windowSize];
            minWindow = min(minWindow, currentWindow);
        }
        return totalSum - minWindow;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q58) Minimum Size Subarray Sum
- **Problem:** Find the minimal length of a contiguous subarray of which the sum `>= target`.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Sliding window. Expand `right` to increase sum. Once sum is `>= target`, track minimum length and shrink from `left` until the sum is no longer valid.
- **C++ Code:**
```cpp
class Solution {
public:
    int minSubArrayLen(int target, vector<int>& nums) {
        int left = 0, sum = 0, minLen = INT_MAX;
        for (int right = 0; right < nums.size(); right++) {
            sum += nums[right];
            while (sum >= target) {
                minLen = min(minLen, right - left + 1);
                sum -= nums[left++];
            }
        }
        return minLen == INT_MAX ? 0 : minLen;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q59) Sliding Window Maximum
- **Problem:** Return the maximums from a sliding window of size `k` moving from left to right.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Use a Monotonic Deque. Store indices. Keep elements in decreasing order in the deque. Discard elements outside the current window and elements smaller than the current one.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        deque<int> dq;
        vector<int> res;
        for (int i = 0; i < nums.size(); i++) {
            // Remove outside window
            if (!dq.empty() && dq.front() == i - k) dq.pop_front();
            // Maintain monotonic decreasing
            while (!dq.empty() && nums[dq.back()] <= nums[i]) dq.pop_back();
            dq.push_back(i);
            // Record max
            if (i >= k - 1) res.push_back(nums[dq.front()]);
        }
        return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(K)

---

### Q60) Trapping Rain Water
- **Problem:** Compute how much water can be trapped after raining based on an elevation map.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Two pointers approach. Track max left height and max right height. Move the pointer pointing to the smaller max height inward, adding trapped water safely.
- **C++ Code:**
```cpp
class Solution {
public:
    int trap(vector<int>& height) {
        int l = 0, r = height.size() - 1;
        int lMax = 0, rMax = 0, ans = 0;
        while (l < r) {
            if (height[l] < height[r]) {
                lMax = max(lMax, height[l]);
                ans += lMax - height[l];
                l++;
            } else {
                rMax = max(rMax, height[r]);
                ans += rMax - height[r];
                r--;
            }
        }
        return ans;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

## 🗂️ Linked List

### Q61) Reverse Linked List
- **Problem:** Reverse a singly linked list.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Iteratively update the `next` pointer of the current node to point to the `prev` node.
- **C++ Code:**
```cpp
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        ListNode *prev = nullptr, *curr = head;
        while (curr) {
            ListNode* nextTemp = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nextTemp;
        }
        return prev;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q62) Reverse Linked List II
- **Problem:** Reverse the nodes of the list from position `left` to position `right`.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Create a dummy head. Traverse to the node just before `left`. Repeatedly move the next node of `left` to the front of the reversed section until `right` is reached.
- **C++ Code:**
```cpp
class Solution {
public:
    ListNode* reverseBetween(ListNode* head, int left, int right) {
        if (!head) return nullptr;
        ListNode dummy(0);
        dummy.next = head;
        ListNode* pre = &dummy;
        for (int i = 0; i < left - 1; i++) pre = pre->next;
        ListNode* start = pre->next;
        ListNode* then = start->next;
        for (int i = 0; i < right - left; i++) {
            start->next = then->next;
            then->next = pre->next;
            pre->next = then;
            then = start->next;
        }
        return dummy.next;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q63) Merge Two Sorted Lists
- **Problem:** Merge two sorted linked lists into one sorted linked list.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Dummy node and two pointers. Compare values at `list1` and `list2`, linking the smaller value next. Attach the remaining tail when one list is exhausted.
- **C++ Code:**
```cpp
class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        ListNode dummy(0);
        ListNode* tail = &dummy;
        while (list1 && list2) {
            if (list1->val < list2->val) {
                tail->next = list1;
                list1 = list1->next;
            } else {
                tail->next = list2;
                list2 = list2->next;
            }
            tail = tail->next;
        }
        tail->next = list1 ? list1 : list2;
        return dummy.next;
    }
};
```
- **Complexity:** T: O(N + M) | S: O(1)

---

### Q64) Merge K Sorted Lists
- **Problem:** Merge `k` sorted linked lists.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Use a min-heap (priority queue) to store the current nodes of all `k` lists. Always extract the minimum and push its `next` node back to the heap.
- **C++ Code:**
```cpp
class Solution {
    struct Compare {
        bool operator()(ListNode* l, ListNode* r) { return l->val > r->val; }
    };
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        priority_queue<ListNode*, vector<ListNode*>, Compare> pq;
        for (auto l : lists) if (l) pq.push(l);
        ListNode dummy(0);
        ListNode* tail = &dummy;
        while (!pq.empty()) {
            ListNode* curr = pq.top(); pq.pop();
            tail->next = curr;
            tail = curr;
            if (curr->next) pq.push(curr->next);
        }
        return dummy.next;
    }
};
```
- **Complexity:** T: O(N log K) | S: O(K)

---

### Q65) Add Two Numbers
- **Problem:** Add two numbers represented by linked lists in reverse order.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Traverse both lists and add corresponding digits along with any `carry`. Build a new result list on the fly.
- **C++ Code:**
```cpp
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode dummy(0);
        ListNode* curr = &dummy;
        int carry = 0;
        while (l1 || l2 || carry) {
            int sum = carry + (l1 ? l1->val : 0) + (l2 ? l2->val : 0);
            carry = sum / 10;
            curr->next = new ListNode(sum % 10);
            curr = curr->next;
            if (l1) l1 = l1->next;
            if (l2) l2 = l2->next;
        }
        return dummy.next;
    }
};
```
- **Complexity:** T: O(max(N, M)) | S: O(max(N, M)) for result

---

### Q66) Remove Nth Node From End
- **Problem:** Remove the `n`-th node from the end of a linked list.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Fast and slow pointers. Give `fast` a head start of `n` nodes. When `fast` reaches the end, `slow` will be at the node right before the one to delete.
- **C++ Code:**
```cpp
class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode dummy(0);
        dummy.next = head;
        ListNode* slow = &dummy;
        ListNode* fast = &dummy;
        for (int i = 0; i <= n; i++) fast = fast->next;
        while (fast) {
            fast = fast->next;
            slow = slow->next;
        }
        ListNode* toDelete = slow->next;
        slow->next = slow->next->next;
        delete toDelete;
        return dummy.next;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q67) Linked List Cycle
- **Problem:** Detect if a linked list has a cycle.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Floyd's Tortoise and Hare. Send a slow pointer (1 step) and a fast pointer (2 steps). If they meet, there is a cycle.
- **C++ Code:**
```cpp
class Solution {
public:
    bool hasCycle(ListNode *head) {
        ListNode *slow = head, *fast = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
            if (slow == fast) return true;
        }
        return false;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q68) Linked List Cycle II
- **Problem:** Find the node where the cycle begins.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Find the meeting point using Floyd's cycle detection. Then reset one pointer to `head` and move both pointers 1 step at a time. They will meet at the cycle entry point.
- **C++ Code:**
```cpp
class Solution {
public:
    ListNode *detectCycle(ListNode *head) {
        ListNode *slow = head, *fast = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
            if (slow == fast) {
                slow = head;
                while (slow != fast) {
                    slow = slow->next;
                    fast = fast->next;
                }
                return slow;
            }
        }
        return nullptr;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q69) Intersection of Two Linked Lists
- **Problem:** Find the node at which two linked lists intersect.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Start two pointers at `headA` and `headB`. When a pointer reaches the end, reset it to the head of the *other* list. They traverse the same total distance and meet at the intersection.
- **C++ Code:**
```cpp
class Solution {
public:
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        if (!headA || !headB) return nullptr;
        ListNode *a = headA, *b = headB;
        while (a != b) {
            a = a ? a->next : headB;
            b = b ? b->next : headA;
        }
        return a;
    }
};
```
- **Complexity:** T: O(N + M) | S: O(1)

---

### Q70) Copy List with Random Pointer
- **Problem:** Deep copy a linked list where nodes also have a `random` pointer.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Three passes without map. 1) Interweave original nodes with their deep copies. 2) Assign random pointers for copies. 3) Separate the two interwoven lists.
- **C++ Code:**
```cpp
class Solution {
public:
    Node* copyRandomList(Node* head) {
        if (!head) return nullptr;
        for (Node* curr = head; curr; curr = curr->next->next) {
            Node* clone = new Node(curr->val);
            clone->next = curr->next;
            curr->next = clone;
        }
        for (Node* curr = head; curr; curr = curr->next->next) {
            if (curr->random) curr->next->random = curr->random->next;
        }
        Node dummy(0);
        Node* tail = &dummy;
        for (Node* curr = head; curr; curr = curr->next) {
            tail->next = curr->next;
            tail = tail->next;
            curr->next = curr->next->next;
        }
        return dummy.next;
    }
};
```
- **Complexity:** T: O(N) | S: O(1) (excluding result)

---

### Q71) Reorder List
- **Problem:** Reorder list to `L0 -> Ln -> L1 -> Ln-1...`
- **Difficulty:** Medium
- **Concept / Optimal Algo:** 1. Find the middle of the list. 2. Reverse the second half. 3. Merge the two halves alternately.
- **C++ Code:**
```cpp
class Solution {
public:
    void reorderList(ListNode* head) {
        if (!head || !head->next) return;
        ListNode *slow = head, *fast = head;
        while (fast && fast->next) { slow = slow->next; fast = fast->next->next; }
        
        ListNode *prev = nullptr, *curr = slow->next;
        slow->next = nullptr;
        while (curr) {
            ListNode* nextTemp = curr->next;
            curr->next = prev;
            prev = curr;
            curr = nextTemp;
        }
        
        ListNode *first = head, *second = prev;
        while (second) {
            ListNode* tmp1 = first->next;
            ListNode* tmp2 = second->next;
            first->next = second;
            second->next = tmp1;
            first = tmp1;
            second = tmp2;
        }
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q72) Rotate List
- **Problem:** Rotate the linked list to the right by `k` places.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Find list length and connect tail to head (make it circular). Move to length - `(k % length)` and break the circle there to form the new head and tail.
- **C++ Code:**
```cpp
class Solution {
public:
    ListNode* rotateRight(ListNode* head, int k) {
        if (!head || !head->next || k == 0) return head;
        int len = 1;
        ListNode* tail = head;
        while (tail->next) { tail = tail->next; len++; }
        tail->next = head; // Make circular
        
        k %= len;
        for (int i = 0; i < len - k; i++) tail = tail->next;
        
        head = tail->next;
        tail->next = nullptr;
        return head;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q73) Swap Nodes in Pairs
- **Problem:** Swap every two adjacent nodes in a linked list.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Dummy node pointing to head. Iterate in pairs. Store `first` and `second` node, rewrite the links to swap them, then move pointer forward by 2.
- **C++ Code:**
```cpp
class Solution {
public:
    ListNode* swapPairs(ListNode* head) {
        ListNode dummy(0);
        dummy.next = head;
        ListNode* prev = &dummy;
        while (prev->next && prev->next->next) {
            ListNode* first = prev->next;
            ListNode* second = prev->next->next;
            first->next = second->next;
            second->next = first;
            prev->next = second;
            prev = first;
        }
        return dummy.next;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q74) Reverse Nodes in K-Group
- **Problem:** Reverse the nodes of a linked list `k` at a time.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Find the `k`th node from the current head. If it exists, reverse the sublist. Recursively call for the rest, linking the current reversed group to the returned recursive result.
- **C++ Code:**
```cpp
class Solution {
public:
    ListNode* reverseKGroup(ListNode* head, int k) {
        ListNode* curr = head;
        int count = 0;
        while (curr && count < k) {
            curr = curr->next;
            count++;
        }
        if (count == k) {
            ListNode* prev = reverseKGroup(curr, k);
            curr = head;
            while (count-- > 0) {
                ListNode* temp = curr->next;
                curr->next = prev;
                prev = curr;
                curr = temp;
            }
            head = prev;
        }
        return head;
    }
};
```
- **Complexity:** T: O(N) | S: O(N/K) recursion stack or O(1) iteratively

---

### Q75) Palindrome Linked List
- **Problem:** Check if a singly linked list is a palindrome.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Find the middle using fast and slow pointers. Reverse the second half of the list. Compare the first half and the reversed second half node by node.
- **C++ Code:**
```cpp
class Solution {
public:
    bool isPalindrome(ListNode* head) {
        ListNode *slow = head, *fast = head;
        while (fast && fast->next) { slow = slow->next; fast = fast->next->next; }
        
        ListNode *prev = nullptr;
        while (slow) {
            ListNode* temp = slow->next;
            slow->next = prev;
            prev = slow;
            slow = temp;
        }
        
        ListNode *left = head, *right = prev;
        while (right) {
            if (left->val != right->val) return false;
            left = left->next; right = right->next;
        }
        return true;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q76) Odd Even Linked List
- **Problem:** Group all nodes with odd indices together followed by the nodes with even indices.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Use two pointers: one for odd indexed nodes and one for even. Connect odd->next to even->next, then move the pointers forward. Attach even head to odd tail.
- **C++ Code:**
```cpp
class Solution {
public:
    ListNode* oddEvenList(ListNode* head) {
        if (!head) return nullptr;
        ListNode *odd = head, *even = head->next, *evenHead = even;
        while (even && even->next) {
            odd->next = even->next;
            odd = odd->next;
            even->next = odd->next;
            even = even->next;
        }
        odd->next = evenHead;
        return head;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q77) Delete Node in a Linked List
- **Problem:** Delete a given node in a linked list (access only to the node to be deleted).
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Copy the value of the next node into the current node, then delete/bypass the next node.
- **C++ Code:**
```cpp
class Solution {
public:
    void deleteNode(ListNode* node) {
        node->val = node->next->val;
        ListNode* toDelete = node->next;
        node->next = node->next->next;
        delete toDelete;
    }
};
```
- **Complexity:** T: O(1) | S: O(1)

---

### Q78) Sort List
- **Problem:** Sort a linked list in ascending order.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Merge Sort on linked list. Find the middle, recursively sort the left and right halves, then merge the two sorted halves.
- **C++ Code:**
```cpp
class Solution {
public:
    ListNode* sortList(ListNode* head) {
        if (!head || !head->next) return head;
        ListNode *slow = head, *fast = head->next;
        while (fast && fast->next) { slow = slow->next; fast = fast->next->next; }
        ListNode *mid = slow->next;
        slow->next = nullptr;
        
        ListNode *left = sortList(head);
        ListNode *right = sortList(mid);
        
        ListNode dummy(0);
        ListNode *tail = &dummy;
        while (left && right) {
            if (left->val < right->val) { tail->next = left; left = left->next; }
            else { tail->next = right; right = right->next; }
            tail = tail->next;
        }
        tail->next = left ? left : right;
        return dummy.next;
    }
};
```
- **Complexity:** T: O(N log N) | S: O(log N) for recursion

---

### Q79) Remove Duplicates from Sorted List II
- **Problem:** Delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Use a dummy node. If `head->val == head->next->val`, skip all nodes with that value. Else, advance the `prev` pointer normally.
- **C++ Code:**
```cpp
class Solution {
public:
    ListNode* deleteDuplicates(ListNode* head) {
        ListNode dummy(0, head);
        ListNode* prev = &dummy;
        while (head) {
            if (head->next && head->val == head->next->val) {
                while (head->next && head->val == head->next->val) head = head->next;
                prev->next = head->next; // skip the duplicates
            } else {
                prev = prev->next;
            }
            head = head->next;
        }
        return dummy.next;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q80) Partition List
- **Problem:** Partition a list such that all nodes less than `x` come before nodes greater than or equal to `x`.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Maintain two sublists: one for values `< x` and one for values `>= x`. Connect them at the end.
- **C++ Code:**
```cpp
class Solution {
public:
    ListNode* partition(ListNode* head, int x) {
        ListNode lessHead(0), greaterHead(0);
        ListNode *less = &lessHead, *greater = &greaterHead;
        while (head) {
            if (head->val < x) { less->next = head; less = less->next; }
            else { greater->next = head; greater = greater->next; }
            head = head->next;
        }
        greater->next = nullptr;
        less->next = greaterHead.next;
        return lessHead.next;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q81) Flatten a Multilevel Doubly Linked List
- **Problem:** Flatten a multilevel doubly linked list where nodes also have a `child` pointer to another linked list.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** DFS. Whenever a `child` is encountered, flatten it recursively. Attach the flattened child between the current node and the `next` node. Ensure `prev` pointers are updated correctly.
- **C++ Code:**
```cpp
class Solution {
public:
    Node* flatten(Node* head) {
        Node* curr = head;
        while (curr) {
            if (curr->child) {
                Node* nextNode = curr->next;
                Node* childList = flatten(curr->child);
                curr->next = childList;
                childList->prev = curr;
                curr->child = nullptr;
                
                Node* tail = childList;
                while (tail->next) tail = tail->next;
                tail->next = nextNode;
                if (nextNode) nextNode->prev = tail;
            }
            curr = curr->next;
        }
        return head;
    }
};
```
- **Complexity:** T: O(N) | S: O(Depth) for recursion

---

### Q82) Design Linked List
- **Problem:** Implement a Singly or Doubly Linked List.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Maintain `head`, `size`, and optionally `tail`. Implement `get`, `addAtHead`, `addAtTail`, `addAtIndex`, and `deleteAtIndex` maintaining pointer validity.
- **C++ Code:**
```cpp
class MyLinkedList {
    struct Node { int val; Node* next; Node(int v): val(v), next(nullptr) {} };
    Node* head; int size;
public:
    MyLinkedList() : head(nullptr), size(0) {}
    int get(int index) {
        if (index >= size || index < 0) return -1;
        Node* curr = head;
        for (int i=0; i<index; ++i) curr = curr->next;
        return curr->val;
    }
    void addAtHead(int val) { addAtIndex(0, val); }
    void addAtTail(int val) { addAtIndex(size, val); }
    void addAtIndex(int index, int val) {
        if (index > size) return;
        Node* curr = new Node(val);
        if (index <= 0) { curr->next = head; head = curr; }
        else {
            Node* pred = head;
            for (int i=0; i<index-1; ++i) pred = pred->next;
            curr->next = pred->next; pred->next = curr;
        }
        size++;
    }
    void deleteAtIndex(int index) {
        if (index >= size || index < 0) return;
        if (index == 0) { Node* temp = head; head = head->next; delete temp; }
        else {
            Node* pred = head;
            for (int i=0; i<index-1; ++i) pred = pred->next;
            Node* temp = pred->next; pred->next = temp->next; delete temp;
        }
        size--;
    }
};
```
- **Complexity:** T: O(N) for adding/getting/deleting at index | S: O(1)

---

### Q83) Add Two Numbers II
- **Problem:** Add two numbers represented by linked lists in normal order (most significant digit first).
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Use two stacks to store the lists' values to process them from least significant digit. Add using carry and build the result list backward.
- **C++ Code:**
```cpp
class Solution {
public:
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        stack<int> s1, s2;
        while (l1) { s1.push(l1->val); l1 = l1->next; }
        while (l2) { s2.push(l2->val); l2 = l2->next; }
        
        ListNode* head = nullptr;
        int carry = 0;
        while (!s1.empty() || !s2.empty() || carry) {
            int sum = carry;
            if (!s1.empty()) { sum += s1.top(); s1.pop(); }
            if (!s2.empty()) { sum += s2.top(); s2.pop(); }
            carry = sum / 10;
            ListNode* curr = new ListNode(sum % 10);
            curr->next = head;
            head = curr;
        }
        return head;
    }
};
```
- **Complexity:** T: O(N + M) | S: O(N + M)

---

### Q84) Split Linked List in Parts
- **Problem:** Split a linked list into `k` consecutive linked list parts, sizes differing by at most 1.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** First calculate length `N`. Base size is `N / k`, and the first `N % k` parts have size `N / k + 1`. Traverse and sever the links at the computed bounds.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<ListNode*> splitListToParts(ListNode* head, int k) {
        int n = 0;
        for (ListNode* curr = head; curr; curr = curr->next) n++;
        int part_size = n / k, extra = n % k;
        vector<ListNode*> res(k, nullptr);
        ListNode* curr = head;
        for (int i = 0; i < k && curr; i++) {
            res[i] = curr;
            int size = part_size + (extra-- > 0 ? 1 : 0);
            for (int j = 1; j < size; j++) curr = curr->next;
            ListNode* nextPart = curr->next;
            curr->next = nullptr;
            curr = nextPart;
        }
        return res;
    }
};
```
- **Complexity:** T: O(N + K) | S: O(K) for output

---

### Q85) Remove Zero Sum Consecutive Nodes
- **Problem:** Repeatedly delete consecutive sequences of nodes that sum to 0.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Use prefix sum and a Hash Map. If the same prefix sum is seen again, the subarray between the previous sum and the current sum adds to 0. Bypass it and erase intermediate sums.
- **C++ Code:**
```cpp
class Solution {
public:
    ListNode* removeZeroSumSublists(ListNode* head) {
        ListNode dummy(0); dummy.next = head;
        unordered_map<int, ListNode*> prefixMap;
        int prefix = 0;
        for (ListNode* curr = &dummy; curr; curr = curr->next) {
            prefix += curr->val;
            prefixMap[prefix] = curr;
        }
        prefix = 0;
        for (ListNode* curr = &dummy; curr; curr = curr->next) {
            prefix += curr->val;
            curr->next = prefixMap[prefix]->next;
        }
        return dummy.next;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q86) Plus One Linked List
- **Problem:** Add one to a non-negative integer represented as a linked list (Premium problem, standard algo).
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Use a pointer to find the rightmost not-9 digit. Increment it, and set all following 9s to 0. If all are 9s, append/insert a new 1 at head.
- **C++ Code:**
```cpp
class Solution {
public:
    ListNode* plusOne(ListNode* head) {
        ListNode dummy(0); dummy.next = head;
        ListNode* notNine = &dummy;
        for (ListNode* curr = head; curr; curr = curr->next) {
            if (curr->val != 9) notNine = curr;
        }
        notNine->val++;
        for (ListNode* curr = notNine->next; curr; curr = curr->next) {
            curr->val = 0;
        }
        return dummy.val == 1 ? &dummy : dummy.next;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q87) Next Greater Node in Linked List
- **Problem:** For each node, find the value of the next strictly greater node.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** First, extract values into a vector. Then use a Monotonic Stack (storing indices) to track elements looking for a greater element, updating results iteratively.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> nextLargerNodes(ListNode* head) {
        vector<int> vals;
        while (head) { vals.push_back(head->val); head = head->next; }
        vector<int> res(vals.size(), 0);
        stack<int> st; // monotonic descending, stores indices
        for (int i = 0; i < vals.size(); i++) {
            while (!st.empty() && vals[st.top()] < vals[i]) {
                res[st.top()] = vals[i];
                st.pop();
            }
            st.push(i);
        }
        return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q88) Insertion Sort List
- **Problem:** Sort a linked list using insertion sort.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Dummy node to build sorted list. For each node in original list, traverse the sorted part from dummy to find the proper insertion point and rewire pointers.
- **C++ Code:**
```cpp
class Solution {
public:
    ListNode* insertionSortList(ListNode* head) {
        ListNode dummy(0);
        ListNode* curr = head;
        while (curr) {
            ListNode* prev = &dummy;
            while (prev->next && prev->next->val <= curr->val) {
                prev = prev->next;
            }
            ListNode* nextTemp = curr->next;
            curr->next = prev->next;
            prev->next = curr;
            curr = nextTemp;
        }
        return dummy.next;
    }
};
```
- **Complexity:** T: O(N^2) | S: O(1)

---

### Q89) Convert Binary Number in a Linked List to Integer
- **Problem:** A linked list represents a binary number. Return the decimal value.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Traverse list. Multiply current total by 2 (left shift) and add the current node's value.
- **C++ Code:**
```cpp
class Solution {
public:
    int getDecimalValue(ListNode* head) {
        int val = 0;
        while (head) {
            val = (val << 1) | head->val;
            head = head->next;
        }
        return val;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q90) Maximum Twin Sum of a Linked List
- **Problem:** Find the maximum twin sum (sum of node `i` and node `n-1-i`).
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Find the middle of the linked list. Reverse the second half. Traverse the first half and reversed second half together, taking the max of their sum.
- **C++ Code:**
```cpp
class Solution {
public:
    int pairSum(ListNode* head) {
        ListNode *slow = head, *fast = head;
        while (fast && fast->next) { slow = slow->next; fast = fast->next->next; }
        
        ListNode* prev = nullptr;
        while (slow) {
            ListNode* tmp = slow->next;
            slow->next = prev;
            prev = slow;
            slow = tmp;
        }
        
        int maxSum = 0;
        ListNode *first = head, *second = prev;
        while (second) {
            maxSum = max(maxSum, first->val + second->val);
            first = first->next;
            second = second->next;
        }
        return maxSum;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

## 🗂️ Stack & Queue

### Q91) Min Stack
- **Problem:** Design a stack that supports `push`, `pop`, `top`, and retrieving the minimum element in constant time.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Keep a parallel stack that tracks the minimum value up to the current level. Or store a pair `{val, min_val}` in a single stack.
- **C++ Code:**
```cpp
class MinStack {
    stack<pair<int, int>> st;
public:
    void push(int val) {
        int currentMin = st.empty() ? val : min(val, st.top().second);
        st.push({val, currentMin});
    }
    void pop() { st.pop(); }
    int top() { return st.top().first; }
    int getMin() { return st.top().second; }
};
```
- **Complexity:** T: O(1) for all ops | S: O(N)

---

### Q92) Evaluate Reverse Polish Notation
- **Problem:** Evaluate the value of an arithmetic expression in RPN.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Use a stack. For numbers, push. For operators, pop two elements, apply the operator, and push the result.
- **C++ Code:**
```cpp
class Solution {
public:
    int evalRPN(vector<string>& tokens) {
        stack<long> st;
        for (string t : tokens) {
            if (t == "+" || t == "-" || t == "*" || t == "/") {
                long b = st.top(); st.pop();
                long a = st.top(); st.pop();
                if (t == "+") st.push(a + b);
                else if (t == "-") st.push(a - b);
                else if (t == "*") st.push(a * b);
                else st.push(a / b);
            } else {
                st.push(stol(t));
            }
        }
        return st.top();
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q93) Daily Temperatures
- **Problem:** Given an array of temperatures, return how many days until a warmer temperature.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Monotonic Decreasing Stack. Store indices. If current temp is greater than temp at index on top of stack, pop it and calculate difference in indices.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temps) {
        int n = temps.size();
        vector<int> res(n, 0);
        stack<int> st; // stores indices
        for (int i = 0; i < n; i++) {
            while (!st.empty() && temps[i] > temps[st.top()]) {
                int idx = st.top(); st.pop();
                res[idx] = i - idx;
            }
            st.push(i);
        }
        return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q94) Next Greater Element I
- **Problem:** Find the next greater element for elements in a subset array `nums1` relative to `nums2`.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Monotonic stack + Hash Map. Traverse `nums2` and use a stack to find the next greater element for all elements, storing them in a map. Query map for `nums1`.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {
        stack<int> st;
        unordered_map<int, int> nextGreater;
        for (int num : nums2) {
            while (!st.empty() && num > st.top()) {
                nextGreater[st.top()] = num;
                st.pop();
            }
            st.push(num);
        }
        vector<int> res;
        for (int num : nums1) {
            res.push_back(nextGreater.count(num) ? nextGreater[num] : -1);
        }
        return res;
    }
};
```
- **Complexity:** T: O(N + M) | S: O(N)

---

### Q95) Next Greater Element II
- **Problem:** Find next greater element in a circular array.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Monotonic Stack. Traverse the array twice `2*N` to simulate circular behavior. Use indices modulo `N` to push and pop from the stack correctly.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> nextGreaterElements(vector<int>& nums) {
        int n = nums.size();
        vector<int> res(n, -1);
        stack<int> st;
        for (int i = 0; i < n * 2; i++) {
            while (!st.empty() && nums[i % n] > nums[st.top()]) {
                res[st.top()] = nums[i % n];
                st.pop();
            }
            if (i < n) st.push(i);
        }
        return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q96) Largest Rectangle in Histogram
- **Problem:** Find the area of largest rectangle in the histogram.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Monotonic Increasing Stack. Store indices. If current height is less than stack top, compute area for the popped index as height, with width spanning from current index to the new top of stack index.
- **C++ Code:**
```cpp
class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        stack<int> st;
        int maxArea = 0, n = heights.size();
        for (int i = 0; i <= n; i++) {
            int h = (i == n ? 0 : heights[i]);
            while (!st.empty() && h < heights[st.top()]) {
                int height = heights[st.top()];
                st.pop();
                int width = st.empty() ? i : i - st.top() - 1;
                maxArea = max(maxArea, height * width);
            }
            st.push(i);
        }
        return maxArea;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q97) Basic Calculator
- **Problem:** Evaluate strings containing `+`, `-`, digits, and parentheses `()`.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Keep an ongoing sum. Keep track of current `sign`. When `(` is encountered, push sum and sign to stack. On `)`, multiply by stack top sign and add stack top sum.
- **C++ Code:**
```cpp
class Solution {
public:
    int calculate(string s) {
        stack<int> st;
        int result = 0, sign = 1, num = 0;
        for (int i = 0; i < s.size(); i++) {
            char c = s[i];
            if (isdigit(c)) num = num * 10 + (c - '0');
            else if (c == '+') { result += sign * num; num = 0; sign = 1; }
            else if (c == '-') { result += sign * num; num = 0; sign = -1; }
            else if (c == '(') {
                st.push(result); st.push(sign);
                result = 0; sign = 1;
            } else if (c == ')') {
                result += sign * num; num = 0;
                result *= st.top(); st.pop();
                result += st.top(); st.pop();
            }
        }
        return result + (sign * num);
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q98) Basic Calculator II
- **Problem:** Evaluate a string with digits, `+`, `-`, `*`, `/`.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Keep track of the `lastSign`. Parse numbers. On an operator, if lastSign was `+` or `-`, push `num` (or `-num`). If `*` or `/`, pop top, apply operation, push back. Sum the stack at the end.
- **C++ Code:**
```cpp
class Solution {
public:
    int calculate(string s) {
        stack<int> st;
        char sign = '+';
        int num = 0;
        for (int i = 0; i < s.size(); i++) {
            if (isdigit(s[i])) num = num * 10 + (s[i] - '0');
            if (!isdigit(s[i]) && !isspace(s[i]) || i == s.size() - 1) {
                if (sign == '+') st.push(num);
                else if (sign == '-') st.push(-num);
                else {
                    int top = st.top(); st.pop();
                    if (sign == '*') st.push(top * num);
                    else st.push(top / num);
                }
                sign = s[i];
                num = 0;
            }
        }
        int res = 0;
        while (!st.empty()) { res += st.top(); st.pop(); }
        return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q99) Remove All Adjacent Duplicates in String II
- **Problem:** Remove `k` adjacent duplicates recursively.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Use a stack storing `{character, frequency}`. If the character matches the top, increment freq. If freq hits `k`, pop it. Rebuild string at the end.
- **C++ Code:**
```cpp
class Solution {
public:
    string removeDuplicates(string s, int k) {
        vector<pair<char, int>> st;
        for (char c : s) {
            if (!st.empty() && st.back().first == c) {
                if (++st.back().second == k) st.pop_back();
            } else {
                st.push_back({c, 1});
            }
        }
        string res = "";
        for (auto& p : st) {
            res.append(p.second, p.first);
        }
        return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q100) Online Stock Span
- **Problem:** Compute the span of stock's price today (max consecutive days before and including today where price <= today's price).
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Monotonic Stack storing `{price, span}`. While stack is not empty and top price <= today's price, pop and accumulate their span. Push current price and accumulated span.
- **C++ Code:**
```cpp
class StockSpanner {
    stack<pair<int, int>> st; // {price, span}
public:
    StockSpanner() {}
    int next(int price) {
        int span = 1;
        while (!st.empty() && st.top().first <= price) {
            span += st.top().second;
            st.pop();
        }
        st.push({price, span});
        return span;
    }
};
```
- **Complexity:** T: Amortized O(1) per call | S: O(N)

---

### Q101) Implement Queue using Stacks
- **Problem:** Implement a first-in-first-out (FIFO) queue using only two stacks.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Use `s1` for pushing. For popping/peeking, use `s2`. If `s2` is empty, move all elements from `s1` to `s2` to reverse their order.
- **C++ Code:**
```cpp
class MyQueue {
    stack<int> s1, s2;
public:
    MyQueue() {}
    void push(int x) { s1.push(x); }
    int pop() {
        int val = peek();
        s2.pop();
        return val;
    }
    int peek() {
        if (s2.empty()) {
            while (!s1.empty()) {
                s2.push(s1.top());
                s1.pop();
            }
        }
        return s2.top();
    }
    bool empty() { return s1.empty() && s2.empty(); }
};
```
- **Complexity:** T: Amortized O(1) for pop/peek, O(1) for push | S: O(N)

---

### Q102) Implement Stack using Queues
- **Problem:** Implement a last-in-first-out (LIFO) stack using only two queues (or one).
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Use a single queue. When pushing an element, enqueue it, then dequeue and enqueue all other elements so the new element is at the front.
- **C++ Code:**
```cpp
class MyStack {
    queue<int> q;
public:
    MyStack() {}
    void push(int x) {
        q.push(x);
        for (int i = 0; i < q.size() - 1; i++) {
            q.push(q.front());
            q.pop();
        }
    }
    int pop() {
        int val = q.front();
        q.pop();
        return val;
    }
    int top() { return q.front(); }
    bool empty() { return q.empty(); }
};
```
- **Complexity:** T: O(N) for push, O(1) for pop/top | S: O(N)

---

### Q103) Design Circular Queue
- **Problem:** Design your implementation of the circular queue.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Use a fixed-size vector. Keep track of the `head` index, `tail` index, and current `size`. Increment indices using modulo `capacity`.
- **C++ Code:**
```cpp
class MyCircularQueue {
    vector<int> q;
    int head, tail, size, capacity;
public:
    MyCircularQueue(int k) : q(k), head(0), tail(0), size(0), capacity(k) {}
    bool enQueue(int value) {
        if (isFull()) return false;
        q[tail] = value;
        tail = (tail + 1) % capacity;
        size++;
        return true;
    }
    bool deQueue() {
        if (isEmpty()) return false;
        head = (head + 1) % capacity;
        size--;
        return true;
    }
    int Front() { return isEmpty() ? -1 : q[head]; }
    int Rear() { return isEmpty() ? -1 : q[(tail - 1 + capacity) % capacity]; }
    bool isEmpty() { return size == 0; }
    bool isFull() { return size == capacity; }
};
```
- **Complexity:** T: O(1) for all operations | S: O(K)

---

### Q104) Sliding Window Maximum
- **Problem:** Return the maximums from a sliding window of size `k` moving right (Repeated conceptually to fit Queue segment).
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Use a Double-Ended Queue (Deque) to store indices. Keep indices in descending order of their values. Pop elements that fall out of the window.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        deque<int> dq;
        vector<int> res;
        for (int i = 0; i < nums.size(); i++) {
            if (!dq.empty() && dq.front() < i - k + 1) dq.pop_front();
            while (!dq.empty() && nums[dq.back()] <= nums[i]) dq.pop_back();
            dq.push_back(i);
            if (i >= k - 1) res.push_back(nums[dq.front()]);
        }
        return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(K)

---

### Q105) Asteroid Collision
- **Problem:** Find out the state of the asteroids after all collisions (positive=right, negative=left).
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Use a stack. For right-moving (positive), push. For left-moving (negative), compare with top (if top is positive). The smaller asteroid explodes. If equal, both explode.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> asteroidCollision(vector<int>& asteroids) {
        vector<int> st;
        for (int a : asteroids) {
            bool destroyed = false;
            while (!st.empty() && st.back() > 0 && a < 0) {
                if (st.back() < -a) {
                    st.pop_back();
                    continue; // current asteroid keeps going
                } else if (st.back() == -a) {
                    st.pop_back();
                }
                destroyed = true;
                break;
            }
            if (!destroyed) st.push_back(a);
        }
        return st;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q106) Car Fleet
- **Problem:** Return the number of car fleets that will arrive at the destination.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Sort cars by starting position descending. Calculate the time needed to reach the target: `(target - pos) / speed`. If a car's time `<= ` previous fleet's time, it joins that fleet; otherwise, it forms a new fleet.
- **C++ Code:**
```cpp
class Solution {
public:
    int carFleet(int target, vector<int>& position, vector<int>& speed) {
        int n = position.size();
        vector<pair<int, double>> cars;
        for (int i = 0; i < n; i++) {
            cars.push_back({position[i], (double)(target - position[i]) / speed[i]});
        }
        sort(cars.rbegin(), cars.rend());
        
        int fleets = 0;
        double maxTime = 0.0;
        for (int i = 0; i < n; i++) {
            if (cars[i].second > maxTime) {
                maxTime = cars[i].second;
                fleets++;
            }
        }
        return fleets;
    }
};
```
- **Complexity:** T: O(N log N) | S: O(N)

---

### Q107) Decode String
- **Problem:** Decode string formatted as `k[encoded_string]` (Repeated in Stack segment).
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Use two stacks (or a single recursive function). One for the numeric multipliers, one for the ongoing string. Pop and assemble when encountering `]`.
- **C++ Code:**
```cpp
class Solution {
public:
    string decodeString(string s) {
        stack<int> numStack;
        stack<string> strStack;
        string currStr = "";
        int currNum = 0;
        for (char c : s) {
            if (isdigit(c)) {
                currNum = currNum * 10 + (c - '0');
            } else if (c == '[') {
                numStack.push(currNum);
                strStack.push(currStr);
                currNum = 0;
                currStr = "";
            } else if (c == ']') {
                int k = numStack.top(); numStack.pop();
                string temp = strStack.top(); strStack.pop();
                while (k-- > 0) temp += currStr;
                currStr = temp;
            } else {
                currStr += c;
            }
        }
        return currStr;
    }
};
```
- **Complexity:** T: O(Output Length) | S: O(Output Length)

---

### Q108) Valid Parenthesis String
- **Problem:** Given `(`, `)`, and `*` (which can be empty, `(`, or `)`), validate the string.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Track the range of possible open parentheses. `cmin` is minimum possible open parens, `cmax` is maximum. `*` decreases `cmin` and increases `cmax`. If `cmax < 0`, it's invalid. `cmin` can't go below 0.
- **C++ Code:**
```cpp
class Solution {
public:
    bool checkValidString(string s) {
        int cmin = 0, cmax = 0;
        for (char c : s) {
            if (c == '(') { cmin++; cmax++; }
            else if (c == ')') { cmin--; cmax--; }
            else if (c == '*') { cmin--; cmax++; }
            if (cmax < 0) return false; // More ')' than '(' and '*'
            cmin = max(cmin, 0);        // Treat extra '*' as empty strings
        }
        return cmin == 0;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q109) Sum of Subarray Minimums
- **Problem:** Find the sum of `min(b)` over all contiguous subarrays `b`. Return modulo `10^9 + 7`.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Use Monotonic Increasing Stacks to find the distance to the next smaller element on the left and right for each element. The number of subarrays where `nums[i]` is the minimum is `left_dist * right_dist`.
- **C++ Code:**
```cpp
class Solution {
public:
    int sumSubarrayMins(vector<int>& arr) {
        int n = arr.size(), mod = 1e9 + 7;
        vector<int> left(n), right(n);
        stack<int> s1, s2;
        
        for (int i = 0; i < n; i++) {
            while (!s1.empty() && arr[s1.top()] > arr[i]) s1.pop();
            left[i] = s1.empty() ? i + 1 : i - s1.top();
            s1.push(i);
        }
        for (int i = n - 1; i >= 0; i--) {
            while (!s2.empty() && arr[s2.top()] >= arr[i]) s2.pop();
            right[i] = s2.empty() ? n - i : s2.top() - i;
            s2.push(i);
        }
        
        long long res = 0;
        for (int i = 0; i < n; i++) {
            res = (res + (long long)arr[i] * left[i] * right[i]) % mod;
        }
        return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q110) Maximum Frequency Stack
- **Problem:** Implement a stack that pops the most frequent element. Ties broken by closest to top of stack.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Map element to frequency. Map frequency to a stack of elements. Track `maxFreq`. On pop, pop from the stack mapped to `maxFreq`; if empty, decrement `maxFreq`.
- **C++ Code:**
```cpp
class FreqStack {
    unordered_map<int, int> freq;
    unordered_map<int, stack<int>> group;
    int maxFreq;
public:
    FreqStack() : maxFreq(0) {}
    
    void push(int val) {
        freq[val]++;
        maxFreq = max(maxFreq, freq[val]);
        group[freq[val]].push(val);
    }
    
    int pop() {
        int val = group[maxFreq].top();
        group[maxFreq].pop();
        freq[val]--;
        if (group[maxFreq].empty()) maxFreq--;
        return val;
    }
};
```
- **Complexity:** T: O(1) | S: O(N)

---

### Q111) Remove K Digits
- **Problem:** Remove `k` digits from a string number to form the smallest possible integer.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Monotonic Increasing Stack. If the current digit is smaller than the stack's top and we still have `k` removals, pop the top. Handle leading zeros and edge cases where we still have `k` > 0 at the end.
- **C++ Code:**
```cpp
class Solution {
public:
    string removeKdigits(string num, int k) {
        string res = "";
        for (char c : num) {
            while (res.size() && res.back() > c && k > 0) {
                res.pop_back();
                k--;
            }
            if (res.size() > 0 || c != '0') res.push_back(c);
        }
        while (res.size() && k > 0) {
            res.pop_back();
            k--;
        }
        return res.empty() ? "0" : res;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q112) Evaluate Boolean Expression
- **Problem:** Evaluate a boolean expression with operators `!`, `&`, `|` and `()`.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Use a stack. Push everything except `,`. On `)`, pop elements until `(` to gather boolean values. Then pop the operator before `(`, evaluate the grouped booleans, and push the result `t` or `f` back.
- **C++ Code:**
```cpp
class Solution {
public:
    bool parseBoolExpr(string expression) {
        stack<char> st;
        for (char c : expression) {
            if (c == ',') continue;
            if (c != ')') st.push(c);
            else {
                bool hasT = false, hasF = false;
                while (st.top() != '(') {
                    if (st.top() == 't') hasT = true;
                    if (st.top() == 'f') hasF = true;
                    st.pop();
                }
                st.pop(); // pop '('
                char op = st.top(); st.pop(); // pop operator
                if (op == '!') st.push(hasT ? 'f' : 't');
                else if (op == '&') st.push(hasF ? 'f' : 't');
                else if (op == '|') st.push(hasT ? 't' : 'f');
            }
        }
        return st.top() == 't';
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q113) Trapping Rain Water (Stack Approach)
- **Problem:** Compute trapped water using a stack.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Monotonic Decreasing Stack. Store indices. If current height is greater than stack top, the top becomes a "basin". Pop it, use the new top as the left wall, current as right wall, and compute water bounded between them.
- **C++ Code:**
```cpp
class Solution {
public:
    int trap(vector<int>& height) {
        stack<int> st;
        int water = 0;
        for (int i = 0; i < height.size(); i++) {
            while (!st.empty() && height[i] > height[st.top()]) {
                int bottom = st.top(); st.pop();
                if (st.empty()) break; // No left wall
                int left = st.top();
                int width = i - left - 1;
                int h = min(height[i], height[left]) - height[bottom];
                water += width * h;
            }
            st.push(i);
        }
        return water;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q114) Monotonic Stack Pattern (General)
- **Problem:** General template for finding Next Greater/Smaller Elements.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Maintain a stack of indices. For "Next Greater", keep the stack monotonic decreasing. For "Next Smaller", monotonic increasing. When the condition breaks, we found the answer for the popped element.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> nextGreaterElementTemplate(vector<int>& nums) {
        vector<int> res(nums.size(), -1);
        stack<int> st; // stores indices
        for (int i = 0; i < nums.size(); i++) {
            // Change > to < for Next Smaller Element
            while (!st.empty() && nums[i] > nums[st.top()]) {
                res[st.top()] = nums[i];
                st.pop();
            }
            st.push(i);
        }
        return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q115) Design Browser History
- **Problem:** Design browser history with `visit`, `back`, and `forward`.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Use two stacks (history and future) or an array/vector with a current pointer. Vector with a pointer is O(1) for all ops and cleanly handles clearing forward history.
- **C++ Code:**
```cpp
class BrowserHistory {
    vector<string> history;
    int curr;
public:
    BrowserHistory(string homepage) {
        history.push_back(homepage);
        curr = 0;
    }
    void visit(string url) {
        history.resize(curr + 1); // clear forward history
        history.push_back(url);
        curr++;
    }
    string back(int steps) {
        curr = max(0, curr - steps);
        return history[curr];
    }
    string forward(int steps) {
        curr = min((int)history.size() - 1, curr + steps);
        return history[curr];
    }
};
```
- **Complexity:** T: O(1) for all | S: O(N)

---

### Q116) Design Hit Counter
- **Problem:** Count the number of hits received in the past 5 minutes (300 seconds).
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Use a Queue. `hit` enqueues timestamp. `getHits` dequeues timestamps that are `timestamp - 300` or older. For high volume, a circular array of size 300 storing `{timestamp, count}` is better. (Queue shown here).
- **C++ Code:**
```cpp
class HitCounter {
    queue<int> q;
public:
    HitCounter() {}
    void hit(int timestamp) {
        q.push(timestamp);
    }
    int getHits(int timestamp) {
        while (!q.empty() && timestamp - q.front() >= 300) {
            q.pop();
        }
        return q.size();
    }
};
```
- **Complexity:** T: Amortized O(1) | S: O(N)

---

### Q117) Exclusive Time of Functions
- **Problem:** Find the exclusive time of each function given a list of logs (`id:start/end:time`).
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Stack storing function `id`. Track `prevTime`. On "start", add time elapsed to current top's ID, push new ID. On "end", add time elapsed (inclusive) to top's ID, pop it, increment `prevTime`.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> exclusiveTime(int n, vector<string>& logs) {
        vector<int> res(n, 0);
        stack<int> st;
        int prevTime = 0;
        for (string log : logs) {
            int pos1 = log.find(':');
            int pos2 = log.find(':', pos1 + 1);
            int id = stoi(log.substr(0, pos1));
            string type = log.substr(pos1 + 1, pos2 - pos1 - 1);
            int time = stoi(log.substr(pos2 + 1));
            
            if (type == "start") {
                if (!st.empty()) res[st.top()] += time - prevTime;
                st.push(id);
                prevTime = time;
            } else {
                res[st.top()] += time - prevTime + 1;
                st.pop();
                prevTime = time + 1;
            }
        }
        return res;
    }
};
```
- **Complexity:** T: O(L) where L is logs length | S: O(L)

---

### Q118) Simplify Path (Stack Segment)
- **Problem:** Simplify Unix directory path.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Using a literal `std::stack` or vector simulating a stack to push directory names and pop on `..`.
- **C++ Code:**
```cpp
class Solution {
public:
    string simplifyPath(string path) {
        vector<string> st;
        string temp;
        stringstream ss(path);
        while (getline(ss, temp, '/')) {
            if (temp == "" || temp == ".") continue;
            if (temp == "..") {
                if (!st.empty()) st.pop_back();
            } else {
                st.push_back(temp);
            }
        }
        string res = "";
        for (string dir : st) res += "/" + dir;
        return res.empty() ? "/" : res;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q119) Baseball Game
- **Problem:** Keep score based on rules: integer (add), `+` (sum last 2), `D` (double last), `C` (remove last).
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Simply maintain a stack (vector) of the valid scores. Apply rules by reading from the back of the vector.
- **C++ Code:**
```cpp
class Solution {
public:
    int calPoints(vector<string>& operations) {
        vector<int> scores;
        for (string op : operations) {
            if (op == "+") {
                scores.push_back(scores.back() + scores[scores.size() - 2]);
            } else if (op == "D") {
                scores.push_back(scores.back() * 2);
            } else if (op == "C") {
                scores.pop_back();
            } else {
                scores.push_back(stoi(op));
            }
        }
        int total = 0;
        for (int s : scores) total += s;
        return total;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q120) Make The String Great
- **Problem:** Remove adjacent characters of same letter but different cases (e.g., 'a' and 'A').
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Use string as a stack. If the last character and the current character are the same letter but different case (`abs(c1 - c2) == 32`), pop the last character. Otherwise, push.
- **C++ Code:**
```cpp
class Solution {
public:
    string makeGood(string s) {
        string res = "";
        for (char c : s) {
            if (!res.empty() && abs(res.back() - c) == 32) {
                res.pop_back();
            } else {
                res.push_back(c);
            }
        }
        return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

## 🗂️ Trees & BST

### Q121) Binary Tree Level Order Traversal
- **Problem:** Return the level order traversal of a binary tree's nodes' values (BFS).
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Standard BFS using a queue. Keep track of the size of the queue at the start of each iteration to process level by level.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        if (!root) return {};
        vector<vector<int>> res;
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            int size = q.size();
            vector<int> level;
            while (size--) {
                TreeNode* node = q.front(); q.pop();
                level.push_back(node->val);
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
            res.push_back(level);
        }
        return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q122) Binary Tree Zigzag Level Order Traversal
- **Problem:** Return the zigzag level order traversal (left->right, right->left, alternate).
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Same as Level Order BFS, but keep a boolean flag `leftToRight`. Reverse the level array before pushing to result if the flag is false. Toggle flag per level.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
        if (!root) return {};
        vector<vector<int>> res;
        queue<TreeNode*> q;
        q.push(root);
        bool leftToRight = true;
        while (!q.empty()) {
            int size = q.size();
            vector<int> level(size);
            for (int i = 0; i < size; i++) {
                TreeNode* node = q.front(); q.pop();
                int idx = leftToRight ? i : (size - 1 - i);
                level[idx] = node->val;
                if (node->left) q.push(node->left);
                if (node->right) q.push(node->right);
            }
            res.push_back(level);
            leftToRight = !leftToRight;
        }
        return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q123) Maximum Depth of Binary Tree
- **Problem:** Return the maximum depth of a binary tree.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** DFS recursively. `1 + max(maxDepth(left), maxDepth(right))`.
- **C++ Code:**
```cpp
class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (!root) return 0;
        return 1 + max(maxDepth(root->left), maxDepth(root->right));
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q124) Minimum Depth of Binary Tree
- **Problem:** Return the minimum depth (shortest path from root to leaf node).
- **Difficulty:** Easy
- **Concept / Optimal Algo:** DFS. If a child is null, return the depth of the other child + 1. If both exist, return `1 + min(left, right)`. BFS is also highly optimal as it stops at the first leaf.
- **C++ Code:**
```cpp
class Solution {
public:
    int minDepth(TreeNode* root) {
        if (!root) return 0;
        if (!root->left) return 1 + minDepth(root->right);
        if (!root->right) return 1 + minDepth(root->left);
        return 1 + min(minDepth(root->left), minDepth(root->right));
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q125) Invert Binary Tree
- **Problem:** Invert a binary tree (swap left and right subtrees).
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Traverse (DFS or BFS) and swap `left` and `right` child pointers for every node.
- **C++ Code:**
```cpp
class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        if (!root) return nullptr;
        TreeNode* temp = root->left;
        root->left = invertTree(root->right);
        root->right = invertTree(temp);
        return root;
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q126) Symmetric Tree
- **Problem:** Check whether a binary tree is a mirror of itself (symmetric around center).
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Recursive helper taking left and right nodes. It is symmetric if `L.val == R.val`, and `L.left` is a mirror of `R.right`, and `L.right` is a mirror of `R.left`.
- **C++ Code:**
```cpp
class Solution {
    bool isMirror(TreeNode* t1, TreeNode* t2) {
        if (!t1 && !t2) return true;
        if (!t1 || !t2) return false;
        return (t1->val == t2->val)
            && isMirror(t1->right, t2->left)
            && isMirror(t1->left, t2->right);
    }
public:
    bool isSymmetric(TreeNode* root) {
        return isMirror(root, root);
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q127) Same Tree
- **Problem:** Check if two binary trees are structurally identical and nodes have the same value.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** DFS traversing both simultaneously. Compare node values, and recursively check `left == left` and `right == right`.
- **C++ Code:**
```cpp
class Solution {
public:
    bool isSameTree(TreeNode* p, TreeNode* q) {
        if (!p && !q) return true;
        if (!p || !q) return false;
        return (p->val == q->val)
            && isSameTree(p->left, q->left)
            && isSameTree(p->right, q->right);
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q128) Diameter of Binary Tree
- **Problem:** Return the length of the diameter (longest path between any two nodes).
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Keep a global max variable. The longest path through a node is `depth(left) + depth(right)`. Compute depth in standard post-order DFS.
- **C++ Code:**
```cpp
class Solution {
    int maxDiameter = 0;
    int depth(TreeNode* node) {
        if (!node) return 0;
        int L = depth(node->left);
        int R = depth(node->right);
        maxDiameter = max(maxDiameter, L + R);
        return 1 + max(L, R);
    }
public:
    int diameterOfBinaryTree(TreeNode* root) {
        depth(root);
        return maxDiameter;
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q129) Path Sum
- **Problem:** Given `targetSum`, return true if the tree has a root-to-leaf path summing to target.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** DFS subtracting the current node's value from target. When hitting a leaf, check if `targetSum == node->val`.
- **C++ Code:**
```cpp
class Solution {
public:
    bool hasPathSum(TreeNode* root, int targetSum) {
        if (!root) return false;
        if (!root->left && !root->right) return targetSum == root->val;
        return hasPathSum(root->left, targetSum - root->val) || 
               hasPathSum(root->right, targetSum - root->val);
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q130) Path Sum II
- **Problem:** Return all root-to-leaf paths where the sum equals `targetSum`.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Backtracking via DFS. Maintain a current `path` vector. Add node value, explore left and right. If leaf matches sum, copy path to results. Pop value before backtracking.
- **C++ Code:**
```cpp
class Solution {
    void dfs(TreeNode* node, int target, vector<int>& path, vector<vector<int>>& res) {
        if (!node) return;
        path.push_back(node->val);
        if (!node->left && !node->right && target == node->val) {
            res.push_back(path);
        } else {
            dfs(node->left, target - node->val, path, res);
            dfs(node->right, target - node->val, path, res);
        }
        path.pop_back();
    }
public:
    vector<vector<int>> pathSum(TreeNode* root, int targetSum) {
        vector<vector<int>> res;
        vector<int> path;
        dfs(root, targetSum, path, res);
        return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(N) + Output

---

### Q131) Binary Tree Maximum Path Sum
- **Problem:** Find the maximum path sum between any two nodes in a tree.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** DFS. At each node, compute max sum extending left and extending right. Max path *through* node is `val + left + right`. Update global max. Return max single path `val + max(left, right)`. Ignore negative paths.
- **C++ Code:**
```cpp
class Solution {
    int maxSum = INT_MIN;
    int dfs(TreeNode* node) {
        if (!node) return 0;
        int L = max(0, dfs(node->left));
        int R = max(0, dfs(node->right));
        maxSum = max(maxSum, node->val + L + R);
        return node->val + max(L, R);
    }
public:
    int maxPathSum(TreeNode* root) {
        dfs(root);
        return maxSum;
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q132) Lowest Common Ancestor
- **Problem:** Find the lowest common ancestor (LCA) of two given nodes in a binary tree.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** DFS. If node matches `p` or `q`, return node. Recursively search left and right. If both sides return non-null, this node is the LCA. Else return the non-null side.
- **C++ Code:**
```cpp
class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if (!root || root == p || root == q) return root;
        TreeNode* left = lowestCommonAncestor(root->left, p, q);
        TreeNode* right = lowestCommonAncestor(root->right, p, q);
        if (left && right) return root;
        return left ? left : right;
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q133) Validate Binary Search Tree
- **Problem:** Determine if a binary tree is a valid BST.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** DFS tracking boundaries `(min, max)`. Left child must be strictly less than parent (`max = node->val`). Right child strictly greater (`min = node->val`). (Use `long` to avoid `INT_MAX` bugs).
- **C++ Code:**
```cpp
class Solution {
    bool isValid(TreeNode* node, long minVal, long maxVal) {
        if (!node) return true;
        if (node->val <= minVal || node->val >= maxVal) return false;
        return isValid(node->left, minVal, node->val) &&
               isValid(node->right, node->val, maxVal);
    }
public:
    bool isValidBST(TreeNode* root) {
        return isValid(root, LONG_MIN, LONG_MAX);
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q134) Kth Smallest Element in BST
- **Problem:** Find the `k`-th smallest element in a BST.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** In-order traversal (Left, Node, Right) visits nodes in sorted order. Keep a counter and return the node value when counter equals `k`.
- **C++ Code:**
```cpp
class Solution {
    int count = 0, ans = -1;
    void inorder(TreeNode* node, int k) {
        if (!node || count >= k) return;
        inorder(node->left, k);
        count++;
        if (count == k) {
            ans = node->val;
            return;
        }
        inorder(node->right, k);
    }
public:
    int kthSmallest(TreeNode* root, int k) {
        inorder(root, k);
        return ans;
    }
};
```
- **Complexity:** T: O(H + K) | S: O(H)

---

### Q135) Convert Sorted Array to BST
- **Problem:** Convert a strictly increasing array into a height-balanced BST.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Take the middle element as the root. Recursively do the same for the left half (left subtree) and right half (right subtree).
- **C++ Code:**
```cpp
class Solution {
    TreeNode* build(vector<int>& nums, int left, int right) {
        if (left > right) return nullptr;
        int mid = left + (right - left) / 2;
        TreeNode* root = new TreeNode(nums[mid]);
        root->left = build(nums, left, mid - 1);
        root->right = build(nums, mid + 1, right);
        return root;
    }
public:
    TreeNode* sortedArrayToBST(vector<int>& nums) {
        return build(nums, 0, nums.size() - 1);
    }
};
```
- **Complexity:** T: O(N) | S: O(log N) for recursion

---

### Q136) Convert Sorted List to BST
- **Problem:** Convert a singly linked list (ascending order) to a height-balanced BST.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Find the middle of the linked list using slow and fast pointers. The middle becomes root. Disconnect left half, recursively build left and right subtrees.
- **C++ Code:**
```cpp
class Solution {
public:
    TreeNode* sortedListToBST(ListNode* head) {
        if (!head) return nullptr;
        if (!head->next) return new TreeNode(head->val);
        ListNode *slow = head, *fast = head, *prev = nullptr;
        while (fast && fast->next) {
            prev = slow;
            slow = slow->next;
            fast = fast->next->next;
        }
        prev->next = nullptr; // cut list
        TreeNode* root = new TreeNode(slow->val);
        root->left = sortedListToBST(head);
        root->right = sortedListToBST(slow->next);
        return root;
    }
};
```
- **Complexity:** T: O(N log N) | S: O(log N)

---

### Q137) Serialize and Deserialize Binary Tree
- **Problem:** Design an algorithm to serialize and deserialize a binary tree.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Pre-order traversal. For serialization, append `val,` or `N,` for null. For deserialization, use a stringstream and queue, recursively consuming values.
- **C++ Code:**
```cpp
class Codec {
public:
    string serialize(TreeNode* root) {
        if (!root) return "N,";
        return to_string(root->val) + "," + serialize(root->left) + serialize(root->right);
    }

    TreeNode* deserialize(string data) {
        queue<string> q;
        stringstream ss(data);
        string item;
        while (getline(ss, item, ',')) q.push(item);
        return build(q);
    }
    
    TreeNode* build(queue<string>& q) {
        string val = q.front(); q.pop();
        if (val == "N") return nullptr;
        TreeNode* root = new TreeNode(stoi(val));
        root->left = build(q);
        root->right = build(q);
        return root;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q138) Count Univalue Subtrees
- **Problem:** Count the number of subtrees where all nodes have the same value.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Bottom-up DFS. A subtree is univalue if left and right are univalue AND their values match the root's value. Null nodes are implicitly univalue.
- **C++ Code:**
```cpp
class Solution {
    int count = 0;
    bool isUnival(TreeNode* node) {
        if (!node) return true;
        bool left = isUnival(node->left);
        bool right = isUnival(node->right);
        if (left && right) {
            if (node->left && node->left->val != node->val) return false;
            if (node->right && node->right->val != node->val) return false;
            count++;
            return true;
        }
        return false;
    }
public:
    int countUnivalSubtrees(TreeNode* root) {
        isUnival(root);
        return count;
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q139) Sum Root to Leaf Numbers
- **Problem:** Calculate the sum of all root-to-leaf paths representing integers (e.g., path 1->2->3 is 123).
- **Difficulty:** Medium
- **Concept / Optimal Algo:** DFS. Pass `currentSum * 10 + node->val` downwards. When a leaf is reached, return the sum. Otherwise, return the sum of left and right paths.
- **C++ Code:**
```cpp
class Solution {
    int dfs(TreeNode* node, int sum) {
        if (!node) return 0;
        sum = sum * 10 + node->val;
        if (!node->left && !node->right) return sum;
        return dfs(node->left, sum) + dfs(node->right, sum);
    }
public:
    int sumNumbers(TreeNode* root) {
        return dfs(root, 0);
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q140) Binary Tree Right Side View
- **Problem:** Return the values of nodes you can see from the right side.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** BFS or DFS. For DFS: Prioritize right child, if depth equals the result size, it's the first node seen at this level.
- **C++ Code:**
```cpp
class Solution {
    void dfs(TreeNode* node, int depth, vector<int>& res) {
        if (!node) return;
        if (depth == res.size()) res.push_back(node->val);
        dfs(node->right, depth + 1, res); // Right first
        dfs(node->left, depth + 1, res);
    }
public:
    vector<int> rightSideView(TreeNode* root) {
        vector<int> res;
        dfs(root, 0, res);
        return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q141) Flatten Binary Tree to Linked List
- **Problem:** Flatten tree to a "linked list" structurally using the `right` child pointer in pre-order.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Post-order-like traversal (Right, Left, Root). Keep a global `prev` pointer indicating the previously processed node. Point root's right to `prev`, left to null.
- **C++ Code:**
```cpp
class Solution {
    TreeNode* prev = nullptr;
public:
    void flatten(TreeNode* root) {
        if (!root) return;
        flatten(root->right);
        flatten(root->left);
        root->right = prev;
        root->left = nullptr;
        prev = root;
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q142) Balanced Binary Tree
- **Problem:** Determine if a tree is height-balanced (left/right subtree heights differ by at most 1).
- **Difficulty:** Easy
- **Concept / Optimal Algo:** DFS returning height. If at any node `abs(left - right) > 1`, return `-1` to flag it's unbalanced. Pass `-1` upwards.
- **C++ Code:**
```cpp
class Solution {
    int checkHeight(TreeNode* node) {
        if (!node) return 0;
        int left = checkHeight(node->left);
        if (left == -1) return -1;
        int right = checkHeight(node->right);
        if (right == -1) return -1;
        if (abs(left - right) > 1) return -1;
        return max(left, right) + 1;
    }
public:
    bool isBalanced(TreeNode* root) {
        return checkHeight(root) != -1;
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q143) Binary Search Tree Iterator
- **Problem:** Implement an iterator over the in-order traversal of a BST.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Maintain a stack. Initialize by pushing the root and all its left children. On `next()`, pop and return the top. If the popped node has a right child, push it and all its left children.
- **C++ Code:**
```cpp
class BSTIterator {
    stack<TreeNode*> st;
    void pushAllLeft(TreeNode* node) {
        while (node) {
            st.push(node);
            node = node->left;
        }
    }
public:
    BSTIterator(TreeNode* root) {
        pushAllLeft(root);
    }
    int next() {
        TreeNode* top = st.top(); st.pop();
        pushAllLeft(top->right);
        return top->val;
    }
    bool hasNext() {
        return !st.empty();
    }
};
```
- **Complexity:** T: Amortized O(1) for next() | S: O(H)

---

### Q144) Recover Binary Search Tree
- **Problem:** Two nodes of a BST were swapped. Recover the tree without changing structure.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** In-order traversal. Find anomalies where `prev->val > curr->val`. First anomaly sets `first` and `middle`. Second anomaly sets `last`. Swap `first` and `last` (or `middle` if adjacent).
- **C++ Code:**
```cpp
class Solution {
    TreeNode *first = nullptr, *middle = nullptr, *last = nullptr, *prev = nullptr;
    void inorder(TreeNode* root) {
        if (!root) return;
        inorder(root->left);
        if (prev && prev->val > root->val) {
            if (!first) { first = prev; middle = root; }
            else { last = root; }
        }
        prev = root;
        inorder(root->right);
    }
public:
    void recoverTree(TreeNode* root) {
        inorder(root);
        if (first && last) swap(first->val, last->val);
        else if (first && middle) swap(first->val, middle->val);
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q145) Construct Binary Tree from Preorder and Inorder Traversal
- **Problem:** Rebuild tree from preorder and inorder arrays.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** First element in preorder is root. Find its index in inorder to get left/right subtree sizes. Recursively build `left` and `right` using pointer indices. Use HashMap for O(1) inorder lookups.
- **C++ Code:**
```cpp
class Solution {
    unordered_map<int, int> inMap;
    int preIdx = 0;
    TreeNode* build(vector<int>& preorder, int left, int right) {
        if (left > right) return nullptr;
        int rootVal = preorder[preIdx++];
        TreeNode* root = new TreeNode(rootVal);
        int mid = inMap[rootVal];
        root->left = build(preorder, left, mid - 1);
        root->right = build(preorder, mid + 1, right);
        return root;
    }
public:
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        for (int i = 0; i < inorder.size(); i++) inMap[inorder[i]] = i;
        return build(preorder, 0, inorder.size() - 1);
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q146) Populating Next Right Pointers in Each Node
- **Problem:** Connect every node's `next` pointer to its right node in a perfect binary tree.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Use the already established `next` pointers to traverse horizontally. `node->left->next = node->right`. If `node->next` exists, `node->right->next = node->next->left`.
- **C++ Code:**
```cpp
class Solution {
public:
    Node* connect(Node* root) {
        if (!root) return nullptr;
        Node* levelStart = root;
        while (levelStart->left) {
            Node* curr = levelStart;
            while (curr) {
                curr->left->next = curr->right;
                if (curr->next) curr->right->next = curr->next->left;
                curr = curr->next;
            }
            levelStart = levelStart->left;
        }
        return root;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q147) Lowest Common Ancestor of a Binary Search Tree
- **Problem:** Find LCA of two nodes in a BST.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Utilize BST properties. If both `p` and `q` are strictly less than root, LCA is in left subtree. If strictly greater, in right. Otherwise, the split occurs here, so root is LCA.
- **C++ Code:**
```cpp
class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        while (root) {
            if (p->val < root->val && q->val < root->val) root = root->left;
            else if (p->val > root->val && q->val > root->val) root = root->right;
            else return root;
        }
        return nullptr;
    }
};
```
- **Complexity:** T: O(H) | S: O(1)

---

### Q148) Trim a Binary Search Tree
- **Problem:** Trim BST so all elements lie in `[low, high]`.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** DFS. If `root->val < low`, the root and its left subtree are discarded, return trimmed right subtree. If `root->val > high`, return trimmed left subtree. Else trim both.
- **C++ Code:**
```cpp
class Solution {
public:
    TreeNode* trimBST(TreeNode* root, int low, int high) {
        if (!root) return nullptr;
        if (root->val < low) return trimBST(root->right, low, high);
        if (root->val > high) return trimBST(root->left, low, high);
        root->left = trimBST(root->left, low, high);
        root->right = trimBST(root->right, low, high);
        return root;
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q149) Delete Node in a BST
- **Problem:** Delete a node with a specific key in a BST.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Find node. If leaf, delete. If 1 child, replace with child. If 2 children, find In-Order Successor (min in right subtree), replace value, and recursively delete the successor in right subtree.
- **C++ Code:**
```cpp
class Solution {
public:
    TreeNode* deleteNode(TreeNode* root, int key) {
        if (!root) return nullptr;
        if (key < root->val) root->left = deleteNode(root->left, key);
        else if (key > root->val) root->right = deleteNode(root->right, key);
        else {
            if (!root->left) { TreeNode* temp = root->right; delete root; return temp; }
            if (!root->right) { TreeNode* temp = root->left; delete root; return temp; }
            TreeNode* temp = root->right;
            while (temp->left) temp = temp->left; // find successor
            root->val = temp->val;
            root->right = deleteNode(root->right, temp->val);
        }
        return root;
    }
};
```
- **Complexity:** T: O(H) | S: O(H)

---

### Q150) Range Sum of BST
- **Problem:** Return the sum of values of all nodes with a value in range `[low, high]`.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** DFS. Prune search: only search left if `val > low`, only search right if `val < high`. Add current `val` if it's within bounds.
- **C++ Code:**
```cpp
class Solution {
public:
    int rangeSumBST(TreeNode* root, int low, int high) {
        if (!root) return 0;
        int sum = 0;
        if (root->val >= low && root->val <= high) sum += root->val;
        if (root->val > low) sum += rangeSumBST(root->left, low, high);
        if (root->val < high) sum += rangeSumBST(root->right, low, high);
        return sum;
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q151) Vertical Order Traversal of a Binary Tree
- **Problem:** Return the vertical order traversal (group by column, sort by row then value).
- **Difficulty:** Hard
- **Concept / Optimal Algo:** BFS or DFS tracking `(row, col)`. Store in `map<col, multiset<pair<row, val>>>`. The map automatically sorts columns, and multiset sorts by row then value.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<vector<int>> verticalTraversal(TreeNode* root) {
        map<int, multiset<pair<int, int>>> nodes; // col -> {row, val}
        queue<pair<TreeNode*, pair<int, int>>> q; // node, {row, col}
        q.push({root, {0, 0}});
        while (!q.empty()) {
            auto p = q.front(); q.pop();
            TreeNode* node = p.first;
            int r = p.second.first, c = p.second.second;
            nodes[c].insert({r, node->val});
            if (node->left) q.push({node->left, {r + 1, c - 1}});
            if (node->right) q.push({node->right, {r + 1, c + 1}});
        }
        vector<vector<int>> res;
        for (auto& [c, st] : nodes) {
            vector<int> col;
            for (auto& p : st) col.push_back(p.second);
            res.push_back(col);
        }
        return res;
    }
};
```
- **Complexity:** T: O(N log N) | S: O(N)

---

### Q152) All Nodes Distance K in Binary Tree
- **Problem:** Return all node values that are distance `k` from the `target` node.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Convert to an undirected graph using DFS to build parent pointers. Then BFS from `target` up to distance `k`.
- **C++ Code:**
```cpp
class Solution {
    unordered_map<TreeNode*, TreeNode*> parent;
    void findParents(TreeNode* node, TreeNode* par) {
        if (!node) return;
        parent[node] = par;
        findParents(node->left, node);
        findParents(node->right, node);
    }
public:
    vector<int> distanceK(TreeNode* root, TreeNode* target, int k) {
        findParents(root, nullptr);
        unordered_set<TreeNode*> visited;
        queue<TreeNode*> q;
        q.push(target);
        visited.insert(target);
        int dist = 0;
        
        while (!q.empty() && dist < k) {
            int size = q.size();
            while (size--) {
                TreeNode* curr = q.front(); q.pop();
                if (curr->left && visited.insert(curr->left).second) q.push(curr->left);
                if (curr->right && visited.insert(curr->right).second) q.push(curr->right);
                if (parent[curr] && visited.insert(parent[curr]).second) q.push(parent[curr]);
            }
            dist++;
        }
        
        vector<int> res;
        while (!q.empty()) { res.push_back(q.front()->val); q.pop(); }
        return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q153) Count Complete Tree Nodes
- **Problem:** Count number of nodes in a complete binary tree.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Compare left-most depth and right-most depth. If equal, it's a full tree `(2^h - 1)` nodes. If not, recursively do `1 + count(left) + count(right)`.
- **C++ Code:**
```cpp
class Solution {
public:
    int countNodes(TreeNode* root) {
        if (!root) return 0;
        int lDepth = 0, rDepth = 0;
        TreeNode *l = root, *r = root;
        while (l) { lDepth++; l = l->left; }
        while (r) { rDepth++; r = r->right; }
        if (lDepth == rDepth) return (1 << lDepth) - 1;
        return 1 + countNodes(root->left) + countNodes(root->right);
    }
};
```
- **Complexity:** T: O(log^2 N) | S: O(log N)

---

### Q154) Find Duplicate Subtrees
- **Problem:** Return the roots of all duplicate subtrees in a tree.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Serialize each subtree as a string in post-order. Store frequency of string in a HashMap. If count == 2, push to results.
- **C++ Code:**
```cpp
class Solution {
    unordered_map<string, int> count;
    vector<TreeNode*> res;
    string postorder(TreeNode* node) {
        if (!node) return "#";
        string serial = to_string(node->val) + "," + postorder(node->left) + "," + postorder(node->right);
        if (++count[serial] == 2) res.push_back(node);
        return serial;
    }
public:
    vector<TreeNode*> findDuplicateSubtrees(TreeNode* root) {
        postorder(root);
        return res;
    }
};
```
- **Complexity:** T: O(N^2) (string concat) | S: O(N^2)

---

### Q155) Maximum Width of Binary Tree
- **Problem:** Find maximum width among all levels.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** BFS tracking node indices. If parent index is `i`, left child is `2*i`, right is `2*i+1`. Width of a level is `last_idx - first_idx + 1`. Normalize indices per level to avoid overflow.
- **C++ Code:**
```cpp
class Solution {
public:
    int widthOfBinaryTree(TreeNode* root) {
        if (!root) return 0;
        unsigned long long maxWidth = 0;
        queue<pair<TreeNode*, unsigned long long>> q;
        q.push({root, 1});
        while (!q.empty()) {
            int size = q.size();
            unsigned long long first = q.front().second;
            unsigned long long last = first;
            while (size--) {
                auto [node, idx] = q.front(); q.pop();
                last = idx;
                if (node->left) q.push({node->left, 2 * idx});
                if (node->right) q.push({node->right, 2 * idx + 1});
            }
            maxWidth = max(maxWidth, last - first + 1);
        }
        return maxWidth;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q156) Cousins in Binary Tree
- **Problem:** Determine if two nodes `x` and `y` are cousins (same depth, different parents).
- **Difficulty:** Easy
- **Concept / Optimal Algo:** BFS or DFS tracking depth and parent for each node. If `depth(x) == depth(y)` and `parent(x) != parent(y)`, true.
- **C++ Code:**
```cpp
class Solution {
    int xDepth = -1, yDepth = -1;
    TreeNode *xParent = nullptr, *yParent = nullptr;
    void dfs(TreeNode* node, TreeNode* parent, int depth, int x, int y) {
        if (!node) return;
        if (node->val == x) { xDepth = depth; xParent = parent; }
        if (node->val == y) { yDepth = depth; yParent = parent; }
        dfs(node->left, node, depth + 1, x, y);
        dfs(node->right, node, depth + 1, x, y);
    }
public:
    bool isCousins(TreeNode* root, int x, int y) {
        dfs(root, nullptr, 0, x, y);
        return (xDepth == yDepth) && (xParent != yParent);
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q157) Subtree of Another Tree
- **Problem:** Determine if `subRoot` is a subtree of `root`.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** DFS over `root`. At each node, check `isSameTree(node, subRoot)`. Alternatively, serialize both to strings and check substring (O(N) with KMP).
- **C++ Code:**
```cpp
class Solution {
    bool isSame(TreeNode* s, TreeNode* t) {
        if (!s && !t) return true;
        if (!s || !t || s->val != t->val) return false;
        return isSame(s->left, t->left) && isSame(s->right, t->right);
    }
public:
    bool isSubtree(TreeNode* root, TreeNode* subRoot) {
        if (!root) return false;
        if (isSame(root, subRoot)) return true;
        return isSubtree(root->left, subRoot) || isSubtree(root->right, subRoot);
    }
};
```
- **Complexity:** T: O(M * N) | S: O(H)

---

### Q158) Binary Tree Paths
- **Problem:** Return all root-to-leaf paths as strings.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Backtracking via DFS. Carry ongoing string `path`. If leaf, add to results. Else, append `->` and traverse children.
- **C++ Code:**
```cpp
class Solution {
    void dfs(TreeNode* node, string path, vector<string>& res) {
        if (!node) return;
        path += to_string(node->val);
        if (!node->left && !node->right) res.push_back(path);
        else {
            path += "->";
            dfs(node->left, path, res);
            dfs(node->right, path, res);
        }
    }
public:
    vector<string> binaryTreePaths(TreeNode* root) {
        vector<string> res;
        dfs(root, "", res);
        return res;
    }
};
```
- **Complexity:** T: O(N * H) for string concat | S: O(H) (recursion) + Output

---

### Q159) Binary Search Tree to Greater Sum Tree
- **Problem:** Convert BST to Greater Sum Tree (every node is replaced with sum of itself + all nodes strictly greater).
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Reverse In-Order Traversal (Right, Node, Left). Maintain a global `sum`. Add current value to `sum`, update current node value.
- **C++ Code:**
```cpp
class Solution {
    int sum = 0;
public:
    TreeNode* bstToGst(TreeNode* root) {
        if (root) {
            bstToGst(root->right);
            sum += root->val;
            root->val = sum;
            bstToGst(root->left);
        }
        return root;
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q160) Construct BST from Preorder Traversal
- **Problem:** Build a BST from its preorder traversal array.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** DFS with upper bound. The first element is root. Elements smaller than root go left, until we hit the upper bound.
- **C++ Code:**
```cpp
class Solution {
    int i = 0;
    TreeNode* build(vector<int>& preorder, int bound) {
        if (i == preorder.size() || preorder[i] > bound) return nullptr;
        TreeNode* root = new TreeNode(preorder[i++]);
        root->left = build(preorder, root->val);
        root->right = build(preorder, bound);
        return root;
    }
public:
    TreeNode* bstFromPreorder(vector<int>& preorder) {
        return build(preorder, INT_MAX);
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q161) Sum of Left Leaves
- **Problem:** Return the sum of all left leaves.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** DFS passing a boolean `isLeft`. If a node is a leaf and `isLeft` is true, return its value. Otherwise, recurse summing left and right.
- **C++ Code:**
```cpp
class Solution {
    int sum(TreeNode* node, bool isLeft) {
        if (!node) return 0;
        if (!node->left && !node->right && isLeft) return node->val;
        return sum(node->left, true) + sum(node->right, false);
    }
public:
    int sumOfLeftLeaves(TreeNode* root) {
        return sum(root, false);
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q162) House Robber III (Tree DP)
- **Problem:** Max money to rob in a binary tree where you cannot rob directly connected nodes.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Post-order DFS returning a pair: `{rob_current, skip_current}`. 
If rob: `node->val + left.skip + right.skip`. 
If skip: `max(left.rob, left.skip) + max(right.rob, right.skip)`.
- **C++ Code:**
```cpp
class Solution {
    pair<int, int> dfs(TreeNode* node) {
        if (!node) return {0, 0};
        auto left = dfs(node->left);
        auto right = dfs(node->right);
        
        int rob = node->val + left.second + right.second;
        int skip = max(left.first, left.second) + max(right.first, right.second);
        
        return {rob, skip};
    }
public:
    int rob(TreeNode* root) {
        auto res = dfs(root);
        return max(res.first, res.second);
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q163) Path Sum III
- **Problem:** Count number of paths that sum to `targetSum` (paths must go downwards, but need not start at root).
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Prefix sum with HashMap in DFS. Count how many times `currentSum - targetSum` has occurred. Backtrack by removing current sum frequency before returning.
- **C++ Code:**
```cpp
class Solution {
    unordered_map<long, int> prefixCounts;
    int count = 0;
    void dfs(TreeNode* node, long currentSum, int targetSum) {
        if (!node) return;
        currentSum += node->val;
        if (currentSum == targetSum) count++;
        if (prefixCounts.count(currentSum - targetSum)) {
            count += prefixCounts[currentSum - targetSum];
        }
        prefixCounts[currentSum]++;
        dfs(node->left, currentSum, targetSum);
        dfs(node->right, currentSum, targetSum);
        prefixCounts[currentSum]--;
    }
public:
    int pathSum(TreeNode* root, int targetSum) {
        dfs(root, 0, targetSum);
        return count;
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q164) Check Completeness of a Binary Tree
- **Problem:** Determine if a binary tree is complete (all levels filled except possibly last, strictly left to right).
- **Difficulty:** Medium
- **Concept / Optimal Algo:** BFS. Once you see a null node, every node you process after must also be null. If not, it's not complete.
- **C++ Code:**
```cpp
class Solution {
public:
    bool isCompleteTree(TreeNode* root) {
        bool nullSeen = false;
        queue<TreeNode*> q;
        q.push(root);
        while (!q.empty()) {
            TreeNode* node = q.front(); q.pop();
            if (!node) {
                nullSeen = true;
            } else {
                if (nullSeen) return false;
                q.push(node->left);
                q.push(node->right);
            }
        }
        return true;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q165) Diameter of N-ary Tree (Premium)
- **Problem:** Find the longest path between any two nodes in an N-ary tree.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** DFS. Same logic as binary tree. Find top 2 deepest children for the current node. `diameter = max(diameter, top1 + top2)`. Return `top1 + 1`.
- **C++ Code:**
```cpp
class Solution {
    int maxDiameter = 0;
    int dfs(Node* node) {
        if (!node) return 0;
        int max1 = 0, max2 = 0;
        for (Node* child : node->children) {
            int depth = dfs(child);
            if (depth > max1) {
                max2 = max1;
                max1 = depth;
            } else if (depth > max2) {
                max2 = depth;
            }
        }
        maxDiameter = max(maxDiameter, max1 + max2);
        return max1 + 1;
    }
public:
    int diameter(Node* root) {
        dfs(root);
        return maxDiameter;
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q166) Lowest Common Ancestor IV (Premium)
- **Problem:** LCA of `k` nodes in a binary tree.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** DFS. Same as regular LCA, but put target nodes in a HashSet for O(1) lookup. If node is in set, return node. Count non-null returns from children.
- **C++ Code:**
```cpp
class Solution {
    unordered_set<TreeNode*> targets;
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, vector<TreeNode*> &nodes) {
        for (auto n : nodes) targets.insert(n);
        return dfs(root);
    }
    TreeNode* dfs(TreeNode* root) {
        if (!root || targets.count(root)) return root;
        TreeNode* L = dfs(root->left);
        TreeNode* R = dfs(root->right);
        if (L && R) return root;
        return L ? L : R;
    }
};
```
- **Complexity:** T: O(N) | S: O(H + K)

---

### Q167) Maximum Ancestor Difference
- **Problem:** Find max value of `|a.val - b.val|` where `a` is an ancestor of `b`.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** DFS. Pass down the `min` and `max` values seen on the path from root. The max difference for the current path is `max - min`.
- **C++ Code:**
```cpp
class Solution {
    int dfs(TreeNode* node, int curMin, int curMax) {
        if (!node) return curMax - curMin;
        curMin = min(curMin, node->val);
        curMax = max(curMax, node->val);
        int leftDiff = dfs(node->left, curMin, curMax);
        int rightDiff = dfs(node->right, curMin, curMax);
        return max(leftDiff, rightDiff);
    }
public:
    int maxAncestorDiff(TreeNode* root) {
        if (!root) return 0;
        return dfs(root, root->val, root->val);
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q168) Distribute Coins in Binary Tree
- **Problem:** Given `N` nodes and `N` coins, find minimum moves to make every node have exactly 1 coin.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Post-order DFS. The "balance" of a subtree is `coins - nodes`. Moves required across an edge equals the absolute value of the subtree's balance. Accumulate total moves globally.
- **C++ Code:**
```cpp
class Solution {
    int moves = 0;
    int dfs(TreeNode* node) {
        if (!node) return 0;
        int leftBalance = dfs(node->left);
        int rightBalance = dfs(node->right);
        moves += abs(leftBalance) + abs(rightBalance);
        return node->val + leftBalance + rightBalance - 1;
    }
public:
    int distributeCoins(TreeNode* root) {
        dfs(root);
        return moves;
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q169) Time Needed to Inform All Employees
- **Problem:** Given an organization tree, find the total time to inform all employees.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Build an adjacency list (manager to subordinates). Run DFS starting from the `headID`. `Time = manager_time + max(time for each subordinate)`.
- **C++ Code:**
```cpp
class Solution {
    int dfs(int u, vector<vector<int>>& adj, vector<int>& informTime) {
        int maxTime = 0;
        for (int v : adj[u]) {
            maxTime = max(maxTime, dfs(v, adj, informTime));
        }
        return informTime[u] + maxTime;
    }
public:
    int numOfMinutes(int n, int headID, vector<int>& manager, vector<int>& informTime) {
        vector<vector<int>> adj(n);
        for (int i = 0; i < n; i++) {
            if (manager[i] != -1) adj[manager[i]].push_back(i);
        }
        return dfs(headID, adj, informTime);
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q170) Find Mode in Binary Search Tree
- **Problem:** Find the most frequently occurring elements in a BST (with duplicates).
- **Difficulty:** Easy
- **Concept / Optimal Algo:** In-order traversal to process elements sequentially. Maintain `currVal`, `currCount`, and `maxCount`. If `currCount == maxCount`, push to result. If `>` clear result and push.
- **C++ Code:**
```cpp
class Solution {
    int currVal = -1, currCount = 0, maxCount = 0;
    vector<int> res;
    void inorder(TreeNode* node) {
        if (!node) return;
        inorder(node->left);
        if (node->val == currVal) currCount++;
        else { currVal = node->val; currCount = 1; }
        
        if (currCount == maxCount) res.push_back(currVal);
        else if (currCount > maxCount) {
            maxCount = currCount;
            res = {currVal};
        }
        inorder(node->right);
    }
public:
    vector<int> findMode(TreeNode* root) {
        inorder(root);
        return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(H) (or O(1) if Morris traversal)

---

### Q171) Largest BST Subtree (Premium)
- **Problem:** Find the largest subtree that is a valid BST.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Bottom-up DFS. Return `{size, minVal, maxVal}`. If `left_max < node < right_min`, it's a BST: `size = left_size + right_size + 1`. If not, return `{max(left_size, right_size), -inf, +inf}`.
- **C++ Code:**
```cpp
class Solution {
    // Returns {size, min, max}
    vector<int> dfs(TreeNode* node) {
        if (!node) return {0, INT_MAX, INT_MIN};
        auto L = dfs(node->left);
        auto R = dfs(node->right);
        
        if (L[0] != -1 && R[0] != -1 && node->val > L[2] && node->val < R[1]) {
            int sz = 1 + L[0] + R[0];
            int curMin = min(L[1], node->val);
            int curMax = max(R[2], node->val);
            return {sz, curMin, curMax};
        }
        return {-1, max(L[0], R[0]), 0}; // -1 flags invalid BST
    }
public:
    int largestBSTSubtree(TreeNode* root) {
        if (!root) return 0;
        vector<int> res = dfs(root);
        return max(0, res[0] == -1 ? res[1] : res[0]);
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q172) Count Good Nodes in Binary Tree
- **Problem:** Count "good" nodes. A node `X` is good if in the path from root to `X`, there are no nodes with a value strictly greater than `X`.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** DFS carrying the `maxVal` seen so far. If `node->val >= maxVal`, it's a good node.
- **C++ Code:**
```cpp
class Solution {
    int dfs(TreeNode* node, int maxVal) {
        if (!node) return 0;
        int res = (node->val >= maxVal) ? 1 : 0;
        maxVal = max(maxVal, node->val);
        res += dfs(node->left, maxVal);
        res += dfs(node->right, maxVal);
        return res;
    }
public:
    int goodNodes(TreeNode* root) {
        return dfs(root, INT_MIN);
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q173) Sum of Nodes with Even-Valued Grandparent
- **Problem:** Sum nodes with an even-valued grandparent.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** DFS keeping track of parent and grandparent. Add to sum if grandparent is even.
- **C++ Code:**
```cpp
class Solution {
    int sum = 0;
    void dfs(TreeNode* node, TreeNode* p, TreeNode* gp) {
        if (!node) return;
        if (gp && gp->val % 2 == 0) sum += node->val;
        dfs(node->left, node, p);
        dfs(node->right, node, p);
    }
public:
    int sumEvenGrandparent(TreeNode* root) {
        dfs(root, nullptr, nullptr);
        return sum;
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q174) Smallest Subtree with all Deepest Nodes
- **Problem:** Return the LCA of all the deepest nodes.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** DFS returning pair `{depth, node}`. Get left and right results. If left deeper, return left. If right deeper, return right. If depths match, current node is the subtree root covering them.
- **C++ Code:**
```cpp
class Solution {
    pair<int, TreeNode*> dfs(TreeNode* node, int depth) {
        if (!node) return {depth, nullptr};
        auto L = dfs(node->left, depth + 1);
        auto R = dfs(node->right, depth + 1);
        if (L.first == R.first) return {L.first, node};
        return L.first > R.first ? L : R;
    }
public:
    TreeNode* subtreeWithAllDeepest(TreeNode* root) {
        return dfs(root, 0).second;
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q175) Convert Binary Search Tree to Sorted Doubly Linked List (Premium)
- **Problem:** Convert BST to an in-place circular doubly linked list.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** In-order traversal. Keep a global `first` pointer and `last` pointer. `last->right = node`, `node->left = last`. Update `last`. In the end, link `first` and `last`.
- **C++ Code:**
```cpp
class Solution {
    Node *first = nullptr, *last = nullptr;
    void inorder(Node* node) {
        if (!node) return;
        inorder(node->left);
        if (last) {
            last->right = node;
            node->left = last;
        } else {
            first = node; // Head of DLL
        }
        last = node;
        inorder(node->right);
    }
public:
    Node* treeToDoublyList(Node* root) {
        if (!root) return nullptr;
        inorder(root);
        last->right = first;
        first->left = last;
        return first;
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q176) Binary Tree Cameras
- **Problem:** Min cameras needed to cover all nodes (camera covers itself, parent, children).
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Post-order DP/Greedy. Returns states: 0 (leaf, needs cover), 1 (has camera), 2 (covered, no camera). If left or right is 0, node MUST have camera (return 1, increment count). If left or right is 1, node is covered (return 2). Else return 0. Handle root specially.
- **C++ Code:**
```cpp
class Solution {
    int cameras = 0;
    int dfs(TreeNode* node) {
        if (!node) return 2; // Covered
        int L = dfs(node->left);
        int R = dfs(node->right);
        
        if (L == 0 || R == 0) {
            cameras++;
            return 1; // Has camera
        }
        if (L == 1 || R == 1) {
            return 2; // Covered
        }
        return 0; // Needs cover
    }
public:
    int minCameraCover(TreeNode* root) {
        if (dfs(root) == 0) cameras++;
        return cameras;
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q177) Maximum Sum BST in Binary Tree
- **Problem:** Return the max sum of a valid BST inside a binary tree.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Bottom-up DFS returning `{isValid, min, max, sum}`. If both children are valid BSTs and `left.max < node < right.min`, it's a BST. Update `maxSum` globally.
- **C++ Code:**
```cpp
class Solution {
    int maxSum = 0;
    // Returns: {isBST(1/0), min, max, sum}
    vector<int> dfs(TreeNode* node) {
        if (!node) return {1, INT_MAX, INT_MIN, 0};
        auto L = dfs(node->left);
        auto R = dfs(node->right);
        
        if (L[0] && R[0] && node->val > L[2] && node->val < R[1]) {
            int sum = node->val + L[3] + R[3];
            maxSum = max(maxSum, sum);
            return {1, min(L[1], node->val), max(R[2], node->val), sum};
        }
        return {0, 0, 0, 0};
    }
public:
    int maxSumBST(TreeNode* root) {
        dfs(root);
        return maxSum;
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q178) Delete Leaves With a Given Value
- **Problem:** Remove all leaf nodes with `target` value. Repeat if parents become leaf nodes with `target`.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Post-order DFS. First process left, then right. Then check if current node is a leaf AND its value is `target`. If so, return `nullptr` (delete it).
- **C++ Code:**
```cpp
class Solution {
public:
    TreeNode* removeLeafNodes(TreeNode* root, int target) {
        if (!root) return nullptr;
        root->left = removeLeafNodes(root->left, target);
        root->right = removeLeafNodes(root->right, target);
        if (!root->left && !root->right && root->val == target) {
            return nullptr;
        }
        return root;
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q179) Find Leaves of Binary Tree (Premium)
- **Problem:** Collect and remove all leaves. Repeat until tree is empty. Return list of lists of leaves.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** DFS calculating height from bottom. Leaves have height 0. Append node value to `res[height]`. Return `height`.
- **C++ Code:**
```cpp
class Solution {
    vector<vector<int>> res;
    int dfs(TreeNode* node) {
        if (!node) return -1;
        int height = 1 + max(dfs(node->left), dfs(node->right));
        if (res.size() == height) res.push_back({});
        res[height].push_back(node->val);
        return height;
    }
public:
    vector<vector<int>> findLeaves(TreeNode* root) {
        dfs(root);
        return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q180) Check If Tree is Mirror (Symmetric Pattern)
- **Problem:** General Pattern for mirror checks (Isomorphic or symmetric variation). (Repeated essentially as Q126 per instructions).
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Recursive checking `left->left == right->right` and `left->right == right->left`.
- **C++ Code:**
```cpp
class Solution {
    bool isMirror(TreeNode* t1, TreeNode* t2) {
        if (!t1 && !t2) return true;
        if (!t1 || !t2) return false;
        return (t1->val == t2->val) && isMirror(t1->left, t2->right) && isMirror(t1->right, t2->left);
    }
public:
    bool isSymmetric(TreeNode* root) {
        return isMirror(root, root);
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

## 🗂️ Graphs / BFS / DFS

### Q181) Number of Islands
- **Problem:** Count connected components of `'1'`s (land) horizontally or vertically.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Iterate grid. When finding a `'1'`, increment count, and trigger a DFS/BFS to mark all connected `'1'`s as visited (or turn them to `'0'`).
- **C++ Code:**
```cpp
class Solution {
    void dfs(vector<vector<char>>& grid, int r, int c) {
        if (r < 0 || c < 0 || r >= grid.size() || c >= grid[0].size() || grid[r][c] == '0') return;
        grid[r][c] = '0';
        dfs(grid, r + 1, c); dfs(grid, r - 1, c);
        dfs(grid, r, c + 1); dfs(grid, r, c - 1);
    }
public:
    int numIslands(vector<vector<char>>& grid) {
        int count = 0;
        for (int i = 0; i < grid.size(); i++) {
            for (int j = 0; j < grid[0].size(); j++) {
                if (grid[i][j] == '1') {
                    count++;
                    dfs(grid, i, j);
                }
            }
        }
        return count;
    }
};
```
- **Complexity:** T: O(M * N) | S: O(M * N) (recursion stack)

---

### Q182) Max Area of Island
- **Problem:** Find the maximum area (number of connected `1`s) of an island.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Similar to Num Islands. DFS returns the area of the current island (`1 + dfs(up) + dfs(down)...`). Track global max.
- **C++ Code:**
```cpp
class Solution {
    int dfs(vector<vector<int>>& grid, int r, int c) {
        if (r < 0 || c < 0 || r >= grid.size() || c >= grid[0].size() || grid[r][c] == 0) return 0;
        grid[r][c] = 0;
        return 1 + dfs(grid, r+1, c) + dfs(grid, r-1, c) + dfs(grid, r, c+1) + dfs(grid, r, c-1);
    }
public:
    int maxAreaOfIsland(vector<vector<int>>& grid) {
        int maxArea = 0;
        for (int i = 0; i < grid.size(); i++) {
            for (int j = 0; j < grid[0].size(); j++) {
                if (grid[i][j] == 1) {
                    maxArea = max(maxArea, dfs(grid, i, j));
                }
            }
        }
        return maxArea;
    }
};
```
- **Complexity:** T: O(M * N) | S: O(M * N)

---

### Q183) Number of Connected Components in an Undirected Graph (Premium)
- **Problem:** Given `n` nodes and array of edges, find total connected components.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Union-Find or DFS/BFS. With Union-Find, start with `n` components. Union edges; if roots differ, decrement component count.
- **C++ Code:**
```cpp
class Solution {
    vector<int> parent;
    int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]);
    }
public:
    int countComponents(int n, vector<vector<int>>& edges) {
        parent.resize(n);
        for (int i = 0; i < n; i++) parent[i] = i;
        int components = n;
        for (auto& edge : edges) {
            int root1 = find(edge[0]);
            int root2 = find(edge[1]);
            if (root1 != root2) {
                parent[root1] = root2;
                components--;
            }
        }
        return components;
    }
};
```
- **Complexity:** T: O(V + E) (inverse Ackermann) | S: O(V)

---

### Q184) Graph Valid Tree (Premium)
- **Problem:** Check if given edges make up a valid tree (connected and acyclic).
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Must have exactly `n - 1` edges. Use Union-Find to detect cycles. If cycle exists, false. If no cycle and `n-1` edges, it's a tree.
- **C++ Code:**
```cpp
class Solution {
    vector<int> parent;
    int find(int i) {
        return parent[i] == i ? i : parent[i] = find(parent[i]);
    }
public:
    bool validTree(int n, vector<vector<int>>& edges) {
        if (edges.size() != n - 1) return false;
        parent.resize(n);
        for (int i = 0; i < n; i++) parent[i] = i;
        for (auto& edge : edges) {
            int root1 = find(edge[0]);
            int root2 = find(edge[1]);
            if (root1 == root2) return false; // cycle
            parent[root1] = root2;
        }
        return true;
    }
};
```
- **Complexity:** T: O(V + E) | S: O(V)

---

### Q185) Clone Graph
- **Problem:** Return a deep copy of a connected undirected graph.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** DFS/BFS with a HashMap mapping original node to cloned node. If neighbor isn't in map, clone and recurse. Then push cloned neighbor to current clone's neighbors.
- **C++ Code:**
```cpp
class Solution {
    unordered_map<Node*, Node*> copies;
public:
    Node* cloneGraph(Node* node) {
        if (!node) return nullptr;
        if (copies.count(node)) return copies[node];
        Node* clone = new Node(node->val);
        copies[node] = clone;
        for (Node* neighbor : node->neighbors) {
            clone->neighbors.push_back(cloneGraph(neighbor));
        }
        return clone;
    }
};
```
- **Complexity:** T: O(V + E) | S: O(V)

---

### Q186) Course Schedule
- **Problem:** Can you finish all `numCourses` given prerequisite pairs?
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Detect cycle in directed graph. Topological sort via Kahn's Algorithm (BFS) using in-degrees. If processed nodes == `numCourses`, true.
- **C++ Code:**
```cpp
class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> adj(numCourses);
        vector<int> inDegree(numCourses, 0);
        for (auto& pre : prerequisites) {
            adj[pre[1]].push_back(pre[0]);
            inDegree[pre[0]]++;
        }
        queue<int> q;
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) q.push(i);
        }
        int count = 0;
        while (!q.empty()) {
            int curr = q.front(); q.pop();
            count++;
            for (int next : adj[curr]) {
                if (--inDegree[next] == 0) q.push(next);
            }
        }
        return count == numCourses;
    }
};
```
- **Complexity:** T: O(V + E) | S: O(V + E)

---

### Q187) Course Schedule II
- **Problem:** Return the ordering of courses you should take to finish all courses.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Same as Course Schedule (Kahn's BFS). Push nodes to a result vector instead of just counting. If cycle, return empty vector.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> adj(numCourses);
        vector<int> inDegree(numCourses, 0);
        for (auto& pre : prerequisites) {
            adj[pre[1]].push_back(pre[0]);
            inDegree[pre[0]]++;
        }
        queue<int> q;
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) q.push(i);
        }
        vector<int> order;
        while (!q.empty()) {
            int curr = q.front(); q.pop();
            order.push_back(curr);
            for (int next : adj[curr]) {
                if (--inDegree[next] == 0) q.push(next);
            }
        }
        return order.size() == numCourses ? order : vector<int>();
    }
};
```
- **Complexity:** T: O(V + E) | S: O(V + E)

---

### Q188) Word Ladder
- **Problem:** Find length of shortest transformation sequence from `beginWord` to `endWord`.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** BFS for shortest path. Put dict in HashSet. For each word in queue, change each char from 'a'-'z' and check if in set.
- **C++ Code:**
```cpp
class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        unordered_set<string> dict(wordList.begin(), wordList.end());
        if (!dict.count(endWord)) return 0;
        queue<string> q;
        q.push(beginWord);
        int level = 1;
        while (!q.empty()) {
            int size = q.size();
            while (size--) {
                string word = q.front(); q.pop();
                if (word == endWord) return level;
                for (int i = 0; i < word.size(); i++) {
                    char orig = word[i];
                    for (char c = 'a'; c <= 'z'; c++) {
                        word[i] = c;
                        if (dict.count(word)) {
                            q.push(word);
                            dict.erase(word);
                        }
                    }
                    word[i] = orig;
                }
            }
            level++;
        }
        return 0;
    }
};
```
- **Complexity:** T: O(M^2 * N) (M word len, N words) | S: O(N)

---

### Q189) Word Ladder II
- **Problem:** Return all shortest transformation sequences.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** BFS to find shortest paths and build an adjacency list of valid edges backwards. Then use DFS backtracking from `beginWord` to `endWord` to build the actual paths.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<vector<string>> findLadders(string beginWord, string endWord, vector<string>& wordList) {
        unordered_set<string> dict(wordList.begin(), wordList.end());
        if (!dict.count(endWord)) return {};
        dict.erase(beginWord);
        unordered_map<string, vector<string>> adj;
        unordered_set<string> q1{beginWord};
        bool found = false;
        
        while (!q1.empty() && !found) {
            for (auto w : q1) dict.erase(w);
            unordered_set<string> q2;
            for (auto word : q1) {
                string curr = word;
                for (int i = 0; i < curr.size(); i++) {
                    char orig = curr[i];
                    for (char c = 'a'; c <= 'z'; c++) {
                        curr[i] = c;
                        if (dict.count(curr)) {
                            if (curr == endWord) found = true;
                            adj[word].push_back(curr);
                            q2.insert(curr);
                        }
                    }
                    curr[i] = orig;
                }
            }
            q1 = q2;
        }
        vector<vector<string>> res;
        vector<string> path = {beginWord};
        dfs(beginWord, endWord, adj, path, res);
        return res;
    }
    
    void dfs(string& node, string& endNode, unordered_map<string, vector<string>>& adj, vector<string>& path, vector<vector<string>>& res) {
        if (node == endNode) { res.push_back(path); return; }
        for (string& next : adj[node]) {
            path.push_back(next);
            dfs(next, endNode, adj, path, res);
            path.pop_back();
        }
    }
};
```
- **Complexity:** T: O(V + E + Paths) | S: O(V + E)

---

### Q190) Alien Dictionary (Premium)
- **Problem:** Derive alphabet order from a sorted list of alien language words.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Topological Sort. Compare adjacent words to find first differing char to build directed edges (`c1 -> c2`). Count in-degrees. Use BFS (Kahn's). If resulting string len != unique chars, there's a cycle.
- **C++ Code:**
```cpp
class Solution {
public:
    string alienOrder(vector<string>& words) {
        unordered_map<char, unordered_set<char>> adj;
        unordered_map<char, int> inDegree;
        for (string w : words) for (char c : w) inDegree[c] = 0;
        
        for (int i = 0; i < words.size() - 1; i++) {
            string w1 = words[i], w2 = words[i+1];
            if (w1.size() > w2.size() && w1.substr(0, w2.size()) == w2) return ""; // Invalid
            for (int j = 0; j < min(w1.size(), w2.size()); j++) {
                if (w1[j] != w2[j]) {
                    if (adj[w1[j]].insert(w2[j]).second) inDegree[w2[j]]++;
                    break;
                }
            }
        }
        
        queue<char> q;
        for (auto& p : inDegree) if (p.second == 0) q.push(p.first);
        string res = "";
        while (!q.empty()) {
            char c = q.front(); q.pop();
            res += c;
            for (char next : adj[c]) {
                if (--inDegree[next] == 0) q.push(next);
            }
        }
        return res.size() == inDegree.size() ? res : "";
    }
};
```
- **Complexity:** T: O(C) total chars | S: O(1) (26 chars max)

---

### Q191) Rotting Oranges
- **Problem:** Minutes until all oranges rot (adjacent spread 1 per minute).
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Multi-source BFS. Put all rotten oranges in queue initially, count fresh ones. Process level by level, decrementing fresh count. Return level count if fresh becomes 0.
- **C++ Code:**
```cpp
class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        queue<pair<int, int>> q;
        int fresh = 0, mins = 0;
        int dirs[4][2] = {{1,0}, {-1,0}, {0,1}, {0,-1}};
        for (int i=0; i<grid.size(); i++) {
            for (int j=0; j<grid[0].size(); j++) {
                if (grid[i][j] == 2) q.push({i, j});
                else if (grid[i][j] == 1) fresh++;
            }
        }
        if (fresh == 0) return 0;
        while (!q.empty()) {
            int size = q.size();
            bool rotted = false;
            while (size--) {
                auto [r, c] = q.front(); q.pop();
                for (auto d : dirs) {
                    int nr = r + d[0], nc = c + d[1];
                    if (nr>=0 && nc>=0 && nr<grid.size() && nc<grid[0].size() && grid[nr][nc] == 1) {
                        grid[nr][nc] = 2;
                        q.push({nr, nc});
                        fresh--;
                        rotted = true;
                    }
                }
            }
            if (rotted) mins++;
        }
        return fresh == 0 ? mins : -1;
    }
};
```
- **Complexity:** T: O(M * N) | S: O(M * N)

---

### Q192) Pacific Atlantic Water Flow
- **Problem:** Find cells that can flow to both Pacific (Top/Left) and Atlantic (Bottom/Right).
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Multi-source DFS/BFS. Flow UP from oceans. Run DFS from Pacific edges and Atlantic edges keeping track of reachable cells in boolean matrices. Return intersection.
- **C++ Code:**
```cpp
class Solution {
    void dfs(vector<vector<int>>& h, vector<vector<bool>>& ocean, int r, int c) {
        ocean[r][c] = true;
        int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
        for (auto d : dirs) {
            int nr = r + d[0], nc = c + d[1];
            if (nr>=0 && nc>=0 && nr<h.size() && nc<h[0].size() && !ocean[nr][nc] && h[nr][nc] >= h[r][c]) {
                dfs(h, ocean, nr, nc);
            }
        }
    }
public:
    vector<vector<int>> pacificAtlantic(vector<vector<int>>& heights) {
        int m = heights.size(), n = heights[0].size();
        vector<vector<bool>> pac(m, vector<bool>(n, false));
        vector<vector<bool>> atl(m, vector<bool>(n, false));
        for (int i=0; i<m; i++) { dfs(heights, pac, i, 0); dfs(heights, atl, i, n-1); }
        for (int j=0; j<n; j++) { dfs(heights, pac, 0, j); dfs(heights, atl, m-1, j); }
        
        vector<vector<int>> res;
        for (int i=0; i<m; i++) {
            for (int j=0; j<n; j++) {
                if (pac[i][j] && atl[i][j]) res.push_back({i, j});
            }
        }
        return res;
    }
};
```
- **Complexity:** T: O(M * N) | S: O(M * N)

---

### Q193) Flood Fill
- **Problem:** Perform a flood fill starting from `(sr, sc)` replacing old color with `newColor`.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Standard DFS/BFS starting from the given coordinates. Make sure `newColor != oldColor` before recursing to avoid infinite loops.
- **C++ Code:**
```cpp
class Solution {
    void dfs(vector<vector<int>>& image, int r, int c, int oldColor, int newColor) {
        if (r < 0 || c < 0 || r >= image.size() || c >= image[0].size() || image[r][c] != oldColor) return;
        image[r][c] = newColor;
        dfs(image, r+1, c, oldColor, newColor);
        dfs(image, r-1, c, oldColor, newColor);
        dfs(image, r, c+1, oldColor, newColor);
        dfs(image, r, c-1, oldColor, newColor);
    }
public:
    vector<vector<int>> floodFill(vector<vector<int>>& image, int sr, int sc, int color) {
        if (image[sr][sc] != color) {
            dfs(image, sr, sc, image[sr][sc], color);
        }
        return image;
    }
};
```
- **Complexity:** T: O(M * N) | S: O(M * N)

---

### Q194) Walls and Gates (Premium)
- **Problem:** Fill each empty room (INF) with distance to nearest gate (0). Walls are -1.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Multi-source BFS starting from all gates simultaneously. This ensures the first time an empty room is reached, it's via the shortest path.
- **C++ Code:**
```cpp
class Solution {
public:
    void wallsAndGates(vector<vector<int>>& rooms) {
        int m = rooms.size();
        if (m == 0) return;
        int n = rooms[0].size();
        queue<pair<int, int>> q;
        for (int i=0; i<m; i++) {
            for (int j=0; j<n; j++) {
                if (rooms[i][j] == 0) q.push({i, j});
            }
        }
        int dirs[4][2] = {{1,0},{-1,0},{0,1},{0,-1}};
        while (!q.empty()) {
            auto [r, c] = q.front(); q.pop();
            for (auto d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr>=0 && nc>=0 && nr<m && nc<n && rooms[nr][nc] == 2147483647) {
                    rooms[nr][nc] = rooms[r][c] + 1;
                    q.push({nr, nc});
                }
            }
        }
    }
};
```
- **Complexity:** T: O(M * N) | S: O(M * N)

---

### Q195) Shortest Path in Binary Matrix
- **Problem:** Find length of shortest clear path (0s) from top-left to bottom-right (8 directions).
- **Difficulty:** Medium
- **Concept / Optimal Algo:** BFS (shortest path in unweighted graph). Push start to queue, mark visited (by mutating grid to 1). Process layer by layer until target.
- **C++ Code:**
```cpp
class Solution {
public:
    int shortestPathBinaryMatrix(vector<vector<int>>& grid) {
        int n = grid.size();
        if (grid[0][0] == 1 || grid[n-1][n-1] == 1) return -1;
        queue<pair<int, int>> q;
        q.push({0, 0});
        grid[0][0] = 1; // mark visited by making it 1
        int dist = 1;
        int dirs[8][2] = {{1,0},{-1,0},{0,1},{0,-1},{1,1},{1,-1},{-1,1},{-1,-1}};
        
        while (!q.empty()) {
            int size = q.size();
            while (size--) {
                auto [r, c] = q.front(); q.pop();
                if (r == n - 1 && c == n - 1) return dist;
                for (auto d : dirs) {
                    int nr = r + d[0], nc = c + d[1];
                    if (nr>=0 && nc>=0 && nr<n && nc<n && grid[nr][nc] == 0) {
                        grid[nr][nc] = 1;
                        q.push({nr, nc});
                    }
                }
            }
            dist++;
        }
        return -1;
    }
};
```
- **Complexity:** T: O(N^2) | S: O(N^2)

---

### Q196) Is Graph Bipartite?
- **Problem:** Determine if an undirected graph is bipartite.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Graph coloring using BFS or DFS. Color nodes 0 and 1. If a neighbor has the same color as the current node, it's not bipartite. Process all components.
- **C++ Code:**
```cpp
class Solution {
public:
    bool isBipartite(vector<vector<int>>& graph) {
        int n = graph.size();
        vector<int> colors(n, -1);
        for (int i = 0; i < n; i++) {
            if (colors[i] != -1) continue;
            queue<int> q;
            q.push(i);
            colors[i] = 0;
            while (!q.empty()) {
                int node = q.front(); q.pop();
                for (int neighbor : graph[node]) {
                    if (colors[neighbor] == -1) {
                        colors[neighbor] = 1 - colors[node];
                        q.push(neighbor);
                    } else if (colors[neighbor] == colors[node]) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
};
```
- **Complexity:** T: O(V + E) | S: O(V)

---

### Q197) Network Delay Time
- **Problem:** Time for a signal to reach all nodes from `k` in a directed weighted graph.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Dijkstra's Algorithm. Use a Min-Heap (Priority Queue) to find the shortest path from `k` to all other nodes. Return max of all shortest paths. If unreachable nodes exist, return -1.
- **C++ Code:**
```cpp
class Solution {
public:
    int networkDelayTime(vector<vector<int>>& times, int n, int k) {
        vector<vector<pair<int, int>>> adj(n + 1);
        for (auto& t : times) adj[t[0]].push_back({t[1], t[2]});
        
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
        vector<int> dist(n + 1, INT_MAX);
        
        dist[k] = 0;
        pq.push({0, k}); // {time, node}
        
        while (!pq.empty()) {
            auto [d, u] = pq.top(); pq.pop();
            if (d > dist[u]) continue;
            for (auto& edge : adj[u]) {
                int v = edge.first, w = edge.second;
                if (dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    pq.push({dist[v], v});
                }
            }
        }
        
        int ans = 0;
        for (int i = 1; i <= n; i++) {
            if (dist[i] == INT_MAX) return -1;
            ans = max(ans, dist[i]);
        }
        return ans;
    }
};
```
- **Complexity:** T: O(E log V) | S: O(V + E)

---

### Q198) Evaluate Division
- **Problem:** Evaluate queries given pairs of variables forming division equations.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Directed weighted graph where edge `A->B` is `value` and `B->A` is `1/value`. Answer query `C/D` by running DFS/BFS from `C` to `D` multiplying edge weights.
- **C++ Code:**
```cpp
class Solution {
    double dfs(string curr, string target, unordered_map<string, vector<pair<string, double>>>& adj, unordered_set<string>& visited, double value) {
        if (curr == target) return value;
        visited.insert(curr);
        for (auto& neighbor : adj[curr]) {
            if (!visited.count(neighbor.first)) {
                double res = dfs(neighbor.first, target, adj, visited, value * neighbor.second);
                if (res != -1.0) return res;
            }
        }
        return -1.0;
    }
public:
    vector<double> calcEquation(vector<vector<string>>& equations, vector<double>& values, vector<vector<string>>& queries) {
        unordered_map<string, vector<pair<string, double>>> adj;
        for (int i = 0; i < equations.size(); i++) {
            adj[equations[i][0]].push_back({equations[i][1], values[i]});
            adj[equations[i][1]].push_back({equations[i][0], 1.0 / values[i]});
        }
        vector<double> res;
        for (auto& q : queries) {
            if (!adj.count(q[0]) || !adj.count(q[1])) res.push_back(-1.0);
            else if (q[0] == q[1]) res.push_back(1.0);
            else {
                unordered_set<string> visited;
                res.push_back(dfs(q[0], q[1], adj, visited, 1.0));
            }
        }
        return res;
    }
};
```
- **Complexity:** T: O(Q * (V + E)) | S: O(V + E)

---

### Q199) Cheapest Flights Within K Stops
- **Problem:** Find cheapest flight from `src` to `dst` with at most `k` stops.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Bellman-Ford algorithm variation (run exactly `k+1` times) or BFS with prices tracked. A standard Dijkstra might find a cheaper path that exceeds `k` stops and mask the valid path, so queue must store `{cost, node, stops}`.
- **C++ Code:**
```cpp
class Solution {
public:
    int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {
        vector<int> dist(n, INT_MAX);
        dist[src] = 0;
        // Run Bellman-Ford K + 1 times
        for (int i = 0; i <= k; i++) {
            vector<int> temp = dist;
            for (auto& flight : flights) {
                int u = flight[0], v = flight[1], w = flight[2];
                if (dist[u] != INT_MAX) {
                    temp[v] = min(temp[v], dist[u] + w);
                }
            }
            dist = temp;
        }
        return dist[dst] == INT_MAX ? -1 : dist[dst];
    }
};
```
- **Complexity:** T: O(K * E) | S: O(V)

---

### Q200) Accounts Merge
- **Problem:** Merge user accounts if they share an email address.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Union-Find or DFS. Treat emails as nodes. Connect all emails in an account. Then find connected components. Map roots/components back to emails and sort them.
- **C++ Code:**
```cpp
class Solution {
    unordered_map<string, string> parent;
    string find(string s) {
        return parent[s] == s ? s : parent[s] = find(parent[s]);
    }
public:
    vector<vector<string>> accountsMerge(vector<vector<string>>& accounts) {
        for (auto& acc : accounts) {
            for (int i = 1; i < acc.size(); i++) {
                if (!parent.count(acc[i])) parent[acc[i]] = acc[i];
            }
        }
        for (auto& acc : accounts) {
            string p1 = find(acc[1]);
            for (int i = 2; i < acc.size(); i++) {
                parent[find(acc[i])] = p1; // union
            }
        }
        unordered_map<string, vector<string>> components;
        for (auto& p : parent) {
            components[find(p.first)].push_back(p.first);
        }
        
        vector<vector<string>> res;
        for (auto& acc : accounts) {
            string root = find(acc[1]);
            if (components.count(root)) {
                vector<string> merged = {acc[0]};
                sort(components[root].begin(), components[root].end());
                merged.insert(merged.end(), components[root].begin(), components[root].end());
                res.push_back(merged);
                components.erase(root); // process once
            }
        }
        return res;
    }
};
```
- **Complexity:** T: O(N * K log(N * K)) | S: O(N * K) where N is accounts, K is max emails

---

## 🗂️ GRAPHS / BFS / DFS

### Q201) Accounts Merge (721)
- **Problem:** Merge accounts belonging to the same person based on common emails.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Use Disjoint Set Union (DSU) or DFS to connect emails to their corresponding accounts. Map each email to a unique ID, then group connected emails and map back to the account name.
- **C++ Code:**
```cpp
class Solution {
public:
    unordered_map<string, vector<string>> adj;
    unordered_set<string> visited;
    
    void dfs(string& email, vector<string>& merged) {
        visited.insert(email);
        merged.push_back(email);
        for (const string& neighbor : adj[email]) {
            if (visited.find(neighbor) == visited.end()) {
                dfs(neighbor, merged);
            }
        }
    }
    
    vector<vector<string>> accountsMerge(vector<vector<string>>& accounts) {
        for (const auto& acc : accounts) {
            string firstEmail = acc[1];
            for (int i = 2; i < acc.size(); ++i) {
                adj[firstEmail].push_back(acc[i]);
                adj[acc[i]].push_back(firstEmail);
            }
        }
        
        vector<vector<string>> res;
        for (const auto& acc : accounts) {
            string name = acc[0];
            string firstEmail = acc[1];
            if (visited.find(firstEmail) == visited.end()) {
                vector<string> merged;
                dfs(firstEmail, merged);
                sort(merged.begin(), merged.end());
                merged.insert(merged.begin(), name);
                res.push_back(merged);
            }
        }
        return res;
    }
};
```
- **Complexity:** T: O(N log N) | S: O(N)

---

### Q202) Reconstruct Itinerary (332)
- **Problem:** Find the lexicographically smallest itinerary starting from "JFK".
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Hierholzer's algorithm to find an Eulerian path. Use a post-order DFS with a min-heap (or sorted array) for adjacency list to visit lexicographically smallest destinations first.
- **C++ Code:**
```cpp
class Solution {
public:
    unordered_map<string, priority_queue<string, vector<string>, greater<string>>> adj;
    vector<string> res;
    
    void dfs(string src) {
        while (!adj[src].empty()) {
            string next = adj[src].top();
            adj[src].pop();
            dfs(next);
        }
        res.push_back(src);
    }
    
    vector<string> findItinerary(vector<vector<string>>& tickets) {
        for (const auto& t : tickets) {
            adj[t[0]].push(t[1]);
        }
        dfs("JFK");
        reverse(res.begin(), res.end());
        return res;
    }
};
```
- **Complexity:** T: O(E log(E/V)) | S: O(E)

---

### Q203) Minimum Height Trees (310)
- **Problem:** Find the root(s) of MHTs. 
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Topological sort using BFS. Iteratively remove leaf nodes (degree == 1) layer by layer until 1 or 2 nodes remain. Those are the centroids of the graph.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> findMinHeightTrees(int n, vector<vector<int>>& edges) {
        if (n == 1) return {0};
        vector<int> degree(n, 0);
        vector<vector<int>> adj(n);
        for (const auto& e : edges) {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
            degree[e[0]]++;
            degree[e[1]]++;
        }
        
        queue<int> q;
        for (int i = 0; i < n; ++i) {
            if (degree[i] == 1) q.push(i);
        }
        
        int remaining = n;
        while (remaining > 2) {
            int size = q.size();
            remaining -= size;
            for (int i = 0; i < size; ++i) {
                int curr = q.front();
                q.pop();
                for (int neighbor : adj[curr]) {
                    if (--degree[neighbor] == 1) {
                        q.push(neighbor);
                    }
                }
            }
        }
        
        vector<int> res;
        while (!q.empty()) {
            res.push_back(q.front());
            q.pop();
        }
        return res;
    }
};
```
- **Complexity:** T: O(V + E) | S: O(V + E)

---

### Q204) Redundant Connection (684)
- **Problem:** Find the edge that creates a cycle in an undirected graph.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Use Union-Find (DSU). For each edge, if both vertices already belong to the same set, this edge forms a cycle and is the answer.
- **C++ Code:**
```cpp
class Solution {
    vector<int> parent;
    
    int find(int i) {
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]);
    }
    
    bool unite(int i, int j) {
        int rootI = find(i);
        int rootJ = find(j);
        if (rootI == rootJ) return false;
        parent[rootI] = rootJ;
        return true;
    }
public:
    vector<int> findRedundantConnection(vector<vector<int>>& edges) {
        int n = edges.size();
        parent.resize(n + 1);
        for (int i = 1; i <= n; ++i) parent[i] = i;
        
        for (const auto& edge : edges) {
            if (!unite(edge[0], edge[1])) {
                return edge;
            }
        }
        return {};
    }
};
```
- **Complexity:** T: O(V) practically with path compression | S: O(V)

---

### Q205) Redundant Connection II (685)
- **Problem:** Remove an edge in a directed graph so it becomes a valid rooted tree.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** 2 issues can invalidate a directed tree: a node having 2 parents, or a directed cycle. Find if any node has in-degree 2. If it does, temporarily remove one of its edges and check for cycles using DSU.
- **C++ Code:**
```cpp
class Solution {
    vector<int> parent;
    int find(int i) {
        return parent[i] == i ? i : parent[i] = find(parent[i]);
    }
public:
    vector<int> findRedundantDirectedConnection(vector<vector<int>>& edges) {
        int n = edges.size();
        vector<int> inDegree(n + 1, 0);
        int nodeWithTwoParents = -1;
        int edge1 = -1, edge2 = -1;
        
        for (int i = 0; i < n; ++i) {
            int u = edges[i][0], v = edges[i][1];
            if (inDegree[v] != 0) {
                nodeWithTwoParents = v;
                edge1 = inDegree[v] - 1; // Previous edge index
                edge2 = i;               // Current edge index
                break;
            } else {
                inDegree[v] = i + 1;
            }
        }
        
        parent.resize(n + 1);
        for (int i = 1; i <= n; ++i) parent[i] = i;
        
        for (int i = 0; i < n; ++i) {
            if (i == edge2) continue; // Skip the second edge
            int u = edges[i][0], v = edges[i][1];
            int rootU = find(u), rootV = find(v);
            if (rootU == rootV) {
                return edge1 == -1 ? edges[i] : edges[edge1];
            }
            parent[rootV] = rootU;
        }
        return edges[edge2];
    }
};
```
- **Complexity:** T: O(V + E) | S: O(V)

---

### Q206) All Paths From Source to Target (797)
- **Problem:** Find all possible paths from node 0 to node n-1 in a DAG.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Use DFS (Backtracking) to explore all paths. Since it's a Directed Acyclic Graph, no need for a `visited` set to avoid infinite cycles.
- **C++ Code:**
```cpp
class Solution {
    vector<vector<int>> res;
    vector<int> path;
    
    void dfs(int curr, int target, const vector<vector<int>>& graph) {
        path.push_back(curr);
        if (curr == target) {
            res.push_back(path);
        } else {
            for (int neighbor : graph[curr]) {
                dfs(neighbor, target, graph);
            }
        }
        path.pop_back(); // Backtrack
    }
public:
    vector<vector<int>> allPathsSourceTarget(vector<vector<int>>& graph) {
        dfs(0, graph.size() - 1, graph);
        return res;
    }
};
```
- **Complexity:** T: O(2^V * V) | S: O(V) for recursion stack

---

### Q207) Path With Maximum Probability (1514)
- **Problem:** Find max probability path from start to end node.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Modified Dijkstra's Algorithm using a Max-Heap. Relax edges by maximizing the product of probabilities.
- **C++ Code:**
```cpp
class Solution {
public:
    double maxProbability(int n, vector<vector<int>>& edges, vector<double>& succProb, int start, int end) {
        vector<vector<pair<int, double>>> adj(n);
        for (int i = 0; i < edges.size(); ++i) {
            adj[edges[i][0]].push_back({edges[i][1], succProb[i]});
            adj[edges[i][1]].push_back({edges[i][0], succProb[i]});
        }
        
        vector<double> probs(n, 0.0);
        probs[start] = 1.0;
        priority_queue<pair<double, int>> pq;
        pq.push({1.0, start});
        
        while (!pq.empty()) {
            auto [prob, curr] = pq.top();
            pq.pop();
            
            if (curr == end) return prob;
            if (prob < probs[curr]) continue;
            
            for (auto& [neighbor, edgeProb] : adj[curr]) {
                if (probs[curr] * edgeProb > probs[neighbor]) {
                    probs[neighbor] = probs[curr] * edgeProb;
                    pq.push({probs[neighbor], neighbor});
                }
            }
        }
        return 0.0;
    }
};
```
- **Complexity:** T: O(E log V) | S: O(V + E)

---

### Q208) Open the Lock (752)
- **Problem:** Find minimum turns to reach target on a 4-wheel lock avoiding deadends.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Shortest path in unweighted graph -> standard BFS. From each string, generate 8 next states (roll each of 4 wheels up or down). Track visited/deadends.
- **C++ Code:**
```cpp
class Solution {
public:
    int openLock(vector<string>& deadends, string target) {
        unordered_set<string> dead(deadends.begin(), deadends.end());
        if (dead.count("0000")) return -1;
        if (target == "0000") return 0;
        
        queue<string> q;
        q.push("0000");
        dead.insert("0000"); // Mark visited
        
        int steps = 0;
        while (!q.empty()) {
            int size = q.size();
            for (int i = 0; i < size; ++i) {
                string curr = q.front();
                q.pop();
                
                if (curr == target) return steps;
                
                for (int j = 0; j < 4; ++j) {
                    string up = curr, down = curr;
                    up[j] = (up[j] - '0' == 9) ? '0' : up[j] + 1;
                    down[j] = (down[j] - '0' == 0) ? '9' : down[j] - 1;
                    
                    if (!dead.count(up)) { dead.insert(up); q.push(up); }
                    if (!dead.count(down)) { dead.insert(down); q.push(down); }
                }
            }
            steps++;
        }
        return -1;
    }
};
```
- **Complexity:** T: O(10^4) max combinations | S: O(10^4)

---

### Q209) Keys and Rooms (841)
- **Problem:** Can you visit all rooms starting from room 0 given keys inside them?
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Simple graph traversal (DFS/BFS) to count reachable nodes. Return true if count equals number of rooms.
- **C++ Code:**
```cpp
class Solution {
public:
    bool canVisitAllRooms(vector<vector<int>>& rooms) {
        int n = rooms.size();
        vector<bool> visited(n, false);
        queue<int> q;
        
        q.push(0);
        visited[0] = true;
        int count = 1;
        
        while (!q.empty()) {
            int curr = q.front();
            q.pop();
            for (int key : rooms[curr]) {
                if (!visited[key]) {
                    visited[key] = true;
                    q.push(key);
                    count++;
                }
            }
        }
        return count == n;
    }
};
```
- **Complexity:** T: O(V + E) | S: O(V)

---

### Q210) Possible Bipartition (886)
- **Problem:** Divide people into 2 groups such that no two in a 'dislike' pair are in the same group.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Same as Checking if Graph is Bipartite. Use BFS/DFS to color nodes with 0 or 1. If an adjacent node has the same color, return false.
- **C++ Code:**
```cpp
class Solution {
public:
    bool possibleBipartition(int n, vector<vector<int>>& dislikes) {
        vector<vector<int>> adj(n + 1);
        for (const auto& d : dislikes) {
            adj[d[0]].push_back(d[1]);
            adj[d[1]].push_back(d[0]);
        }
        
        vector<int> colors(n + 1, -1);
        for (int i = 1; i <= n; ++i) {
            if (colors[i] == -1) {
                queue<int> q;
                q.push(i);
                colors[i] = 0;
                while (!q.empty()) {
                    int curr = q.front();
                    q.pop();
                    for (int neighbor : adj[curr]) {
                        if (colors[neighbor] == -1) {
                            colors[neighbor] = 1 - colors[curr];
                            q.push(neighbor);
                        } else if (colors[neighbor] == colors[curr]) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }
};
```
- **Complexity:** T: O(V + E) | S: O(V + E)

---

### Q211) Find Eventual Safe States (802)
- **Problem:** Find nodes that eventually only lead to terminal nodes (no cycles ahead).
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Reverse graph + Topological Sort (Kahn's) OR DFS graph coloring (0=unvisited, 1=visiting, 2=safe). Any node in cycle stays 1.
- **C++ Code:**
```cpp
class Solution {
    bool dfs(int curr, const vector<vector<int>>& graph, vector<int>& state) {
        if (state[curr] > 0) return state[curr] == 2;
        state[curr] = 1; // Mark visiting
        for (int neighbor : graph[curr]) {
            if (state[neighbor] == 1 || !dfs(neighbor, graph, state)) {
                return false;
            }
        }
        state[curr] = 2; // Mark safe
        return true;
    }
public:
    vector<int> eventualSafeNodes(vector<vector<int>>& graph) {
        int n = graph.size();
        vector<int> state(n, 0);
        vector<int> res;
        for (int i = 0; i < n; ++i) {
            if (dfs(i, graph, state)) {
                res.push_back(i);
            }
        }
        return res;
    }
};
```
- **Complexity:** T: O(V + E) | S: O(V)

---

### Q212) Shortest Bridge (934)
- **Problem:** Find min flips to connect 2 islands in a grid.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** 1. DFS to find and mark the first island, adding all its cells to a queue. 2. BFS from those cells to find the shortest path to the second island.
- **C++ Code:**
```cpp
class Solution {
    int dirs[4][2] = {{0,1}, {1,0}, {0,-1}, {-1,0}};
    void dfs(vector<vector<int>>& grid, int r, int c, queue<pair<int, int>>& q) {
        if (r < 0 || r >= grid.size() || c < 0 || c >= grid[0].size() || grid[r][c] != 1) return;
        grid[r][c] = 2; // mark visited
        q.push({r, c});
        for (auto& d : dirs) dfs(grid, r + d[0], c + d[1], q);
    }
public:
    int shortestBridge(vector<vector<int>>& grid) {
        int n = grid.size();
        queue<pair<int, int>> q;
        bool found = false;
        
        for (int i = 0; i < n && !found; ++i) {
            for (int j = 0; j < n && !found; ++j) {
                if (grid[i][j] == 1) {
                    dfs(grid, i, j, q);
                    found = true;
                }
            }
        }
        
        int steps = 0;
        while (!q.empty()) {
            int size = q.size();
            while (size--) {
                auto [r, c] = q.front(); q.pop();
                for (auto& d : dirs) {
                    int nr = r + d[0], nc = c + d[1];
                    if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
                        if (grid[nr][nc] == 1) return steps;
                        if (grid[nr][nc] == 0) {
                            grid[nr][nc] = 2;
                            q.push({nr, nc});
                        }
                    }
                }
            }
            steps++;
        }
        return -1;
    }
};
```
- **Complexity:** T: O(N^2) | S: O(N^2)

---

### Q213) Swim in Rising Water (778)
- **Problem:** Find min time to reach bottom-right corner where you can only swim to neighbors if their height <= time.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Dijkstra's Algorithm using Min-Heap tracking `max(time, grid[r][c])` along the path. 
- **C++ Code:**
```cpp
class Solution {
public:
    int swimInWater(vector<vector<int>>& grid) {
        int n = grid.size();
        priority_queue<vector<int>, vector<vector<int>>, greater<vector<int>>> pq;
        vector<vector<bool>> vis(n, vector<bool>(n, false));
        int dirs[4][2] = {{0,1},{1,0},{0,-1},{-1,0}};
        
        pq.push({grid[0][0], 0, 0});
        vis[0][0] = true;
        
        while (!pq.empty()) {
            auto curr = pq.top(); pq.pop();
            int t = curr[0], r = curr[1], c = curr[2];
            
            if (r == n - 1 && c == n - 1) return t;
            
            for (auto& d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && !vis[nr][nc]) {
                    vis[nr][nc] = true;
                    pq.push({max(t, grid[nr][nc]), nr, nc});
                }
            }
        }
        return -1;
    }
};
```
- **Complexity:** T: O(N^2 log N) | S: O(N^2)

---

### Q214) Detect Cycles in Graph (Practice via 207)
- **Problem:** Determine if a directed graph has a cycle.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Use DFS with an recursion stack (coloring method) or Kahn's Topological Sort (if count of sorted nodes != total nodes, there's a cycle).
- **C++ Code:**
```cpp
class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> adj(numCourses);
        vector<int> indegree(numCourses, 0);
        
        for (auto& pre : prerequisites) {
            adj[pre[1]].push_back(pre[0]);
            indegree[pre[0]]++;
        }
        
        queue<int> q;
        for (int i = 0; i < numCourses; ++i) {
            if (indegree[i] == 0) q.push(i);
        }
        
        int count = 0;
        while (!q.empty()) {
            int curr = q.front();
            q.pop();
            count++;
            for (int neighbor : adj[curr]) {
                if (--indegree[neighbor] == 0) {
                    q.push(neighbor);
                }
            }
        }
        
        return count == numCourses; // If not equal, cycle exists
    }
};
```
- **Complexity:** T: O(V + E) | S: O(V + E)

---

### Q215) Topological Sort (Practice via 210)
- **Problem:** Find ordering of nodes such that for every directed edge U -> V, U comes before V.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Kahn’s Algorithm (BFS) using in-degrees. Decrement in-degree of neighbors, add to queue when 0.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> adj(numCourses);
        vector<int> inDegree(numCourses, 0);
        for (const auto& pre : prerequisites) {
            adj[pre[1]].push_back(pre[0]);
            inDegree[pre[0]]++;
        }
        
        queue<int> q;
        for (int i = 0; i < numCourses; ++i) {
            if (inDegree[i] == 0) q.push(i);
        }
        
        vector<int> res;
        while (!q.empty()) {
            int curr = q.front(); q.pop();
            res.push_back(curr);
            for (int neighbor : adj[curr]) {
                if (--inDegree[neighbor] == 0) {
                    q.push(neighbor);
                }
            }
        }
        
        return res.size() == numCourses ? res : vector<int>();
    }
};
```
- **Complexity:** T: O(V + E) | S: O(V + E)

---

### Q216) Count Sub Islands (1905)
- **Problem:** Count islands in grid2 that are fully contained within an island in grid1.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** DFS over grid2 islands. If any part of the grid2 island is water (0) in grid1, the sub-island property is violated.
- **C++ Code:**
```cpp
class Solution {
    int m, n;
    bool dfs(vector<vector<int>>& grid1, vector<vector<int>>& grid2, int r, int c) {
        if (r < 0 || r >= m || c < 0 || c >= n || grid2[r][c] == 0) return true;
        
        grid2[r][c] = 0; // Mark visited
        bool isSub = (grid1[r][c] == 1);
        
        isSub &= dfs(grid1, grid2, r + 1, c);
        isSub &= dfs(grid1, grid2, r - 1, c);
        isSub &= dfs(grid1, grid2, r, c + 1);
        isSub &= dfs(grid1, grid2, r, c - 1);
        
        return isSub;
    }
public:
    int countSubIslands(vector<vector<int>>& grid1, vector<vector<int>>& grid2) {
        m = grid1.size(); n = grid1[0].size();
        int count = 0;
        
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                if (grid2[i][j] == 1) {
                    if (dfs(grid1, grid2, i, j)) {
                        count++;
                    }
                }
            }
        }
        return count;
    }
};
```
- **Complexity:** T: O(M * N) | S: O(M * N) (DFS Stack)

---

### Q217) Find if Path Exists in Graph (1971)
- **Problem:** Given edges, determine if there is a valid path from source to destination.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Simple BFS/DFS traversal or Union-Find to check if source and destination are connected.
- **C++ Code:**
```cpp
class Solution {
public:
    bool validPath(int n, vector<vector<int>>& edges, int source, int destination) {
        vector<vector<int>> adj(n);
        for (const auto& e : edges) {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
        }
        
        vector<bool> vis(n, false);
        queue<int> q;
        q.push(source);
        vis[source] = true;
        
        while (!q.empty()) {
            int curr = q.front(); q.pop();
            if (curr == destination) return true;
            for (int neighbor : adj[curr]) {
                if (!vis[neighbor]) {
                    vis[neighbor] = true;
                    q.push(neighbor);
                }
            }
        }
        return false;
    }
};
```
- **Complexity:** T: O(V + E) | S: O(V + E)

---

### Q218) Graph BFS Template
- **Problem:** Generic shortest path or level-by-level traversal.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Use a Queue. Enqueue start node, mark visited. Process level by level, pushing unvisited neighbors.
- **C++ Code:**
```cpp
class Solution {
public:
    void bfsTemplate(int start, vector<vector<int>>& adj) {
        int n = adj.size();
        vector<bool> visited(n, false);
        queue<int> q;
        
        q.push(start);
        visited[start] = true;
        
        while (!q.empty()) {
            int curr = q.front();
            q.pop();
            // Process curr
            
            for (int neighbor : adj[curr]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    q.push(neighbor);
                }
            }
        }
    }
};
```
- **Complexity:** T: O(V + E) | S: O(V)

---

### Q219) Graph DFS Template
- **Problem:** Explore as far as possible along each branch before backtracking.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Use recursion + a `visited` array to prevent cycles.
- **C++ Code:**
```cpp
class Solution {
    void dfs(int curr, vector<vector<int>>& adj, vector<bool>& visited) {
        visited[curr] = true;
        // Process curr
        
        for (int neighbor : adj[curr]) {
            if (!visited[neighbor]) {
                dfs(neighbor, adj, visited);
            }
        }
    }
public:
    void dfsTemplate(int n, vector<vector<int>>& adj) {
        vector<bool> visited(n, false);
        for (int i = 0; i < n; ++i) { // For disconnected graphs
            if (!visited[i]) {
                dfs(i, adj, visited);
            }
        }
    }
};
```
- **Complexity:** T: O(V + E) | S: O(V)

---

### Q220) Time Needed to Inform All Employees (1376)
- **Problem:** Return the time needed to inform all employees about urgent news.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Build a tree from `manager` array. Do DFS from headID. Cost at node is `informTime[node] + max(DFS on subordinates)`.
- **C++ Code:**
```cpp
class Solution {
    int dfs(int curr, const vector<vector<int>>& adj, const vector<int>& informTime) {
        int maxTime = 0;
        for (int sub : adj[curr]) {
            maxTime = max(maxTime, dfs(sub, adj, informTime));
        }
        return informTime[curr] + maxTime;
    }
public:
    int numOfMinutes(int n, int headID, vector<int>& manager, vector<int>& informTime) {
        vector<vector<int>> adj(n);
        for (int i = 0; i < n; ++i) {
            if (manager[i] != -1) {
                adj[manager[i]].push_back(i);
            }
        }
        return dfs(headID, adj, informTime);
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q221) Number of Provinces (547)
- **Problem:** Count connected components (provinces) given an adjacency matrix.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Use DSU or DFS. DFS over all nodes, increment province counter for every unvisited node you start a DFS from.
- **C++ Code:**
```cpp
class Solution {
    void dfs(int u, const vector<vector<int>>& isConnected, vector<bool>& vis) {
        vis[u] = true;
        for (int v = 0; v < isConnected.size(); ++v) {
            if (isConnected[u][v] == 1 && !vis[v]) {
                dfs(v, isConnected, vis);
            }
        }
    }
public:
    int findCircleNum(vector<vector<int>>& isConnected) {
        int n = isConnected.size(), count = 0;
        vector<bool> vis(n, false);
        
        for (int i = 0; i < n; ++i) {
            if (!vis[i]) {
                count++;
                dfs(i, isConnected, vis);
            }
        }
        return count;
    }
};
```
- **Complexity:** T: O(N^2) | S: O(N)

---

## 🗂️ HEAP / GREEDY

### Q222) K Closest Points to Origin (973)
- **Problem:** Find the K closest points to the origin (0,0).
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Max-Heap of size K. Keep pushing distance. If size exceeds K, pop. (Alternatively QuickSelect for O(N)).
- **C++ Code:**
```cpp
class Solution {
public:
    vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
        priority_queue<pair<int, vector<int>>> pq;
        for (auto& p : points) {
            int dist = p[0] * p[0] + p[1] * p[1];
            pq.push({dist, p});
            if (pq.size() > k) {
                pq.pop();
            }
        }
        vector<vector<int>> res;
        while (!pq.empty()) {
            res.push_back(pq.top().second);
            pq.pop();
        }
        return res;
    }
};
```
- **Complexity:** T: O(N log K) | S: O(K)

---

### Q223) Find Median from Data Stream (295)
- **Problem:** Design a structure to add numbers and find the median efficiently.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Maintain two heaps: a Max-Heap for the lower half and a Min-Heap for the upper half. Balance them so size difference is at most 1.
- **C++ Code:**
```cpp
class MedianFinder {
    priority_queue<int> maxHeap; // Lower half
    priority_queue<int, vector<int>, greater<int>> minHeap; // Upper half
public:
    MedianFinder() {}
    
    void addNum(int num) {
        maxHeap.push(num);
        minHeap.push(maxHeap.top());
        maxHeap.pop();
        
        if (maxHeap.size() < minHeap.size()) {
            maxHeap.push(minHeap.top());
            minHeap.pop();
        }
    }
    
    double findMedian() {
        if (maxHeap.size() > minHeap.size()) return maxHeap.top();
        return (maxHeap.top() + minHeap.top()) / 2.0;
    }
};
```
- **Complexity:** T: O(log N) for add | S: O(N)

---

### Q224) Top K Frequent Words (692)
- **Problem:** Return top k frequent words. Sort by frequency desc, then alphabetical asc.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Hash map for counts + Min-Heap. Custom comparator required since we need the Min-Heap to sort alphabetically descending when frequencies are equal (so they get popped if over k).
- **C++ Code:**
```cpp
class Solution {
    struct Comp {
        bool operator()(const pair<int, string>& a, const pair<int, string>& b) {
            if (a.first == b.first) return a.second < b.second; // Max-heap behavior for string
            return a.first > b.first; // Min-heap behavior for count
        }
    };
public:
    vector<string> topKFrequent(vector<string>& words, int k) {
        unordered_map<string, int> counts;
        for (auto& w : words) counts[w]++;
        
        priority_queue<pair<int, string>, vector<pair<int, string>>, Comp> pq;
        for (auto& it : counts) {
            pq.push({it.second, it.first});
            if (pq.size() > k) pq.pop();
        }
        
        vector<string> res(k);
        for (int i = k - 1; i >= 0; --i) {
            res[i] = pq.top().second;
            pq.pop();
        }
        return res;
    }
};
```
- **Complexity:** T: O(N log K) | S: O(N)

---

### Q225) Task Scheduler (621)
- **Problem:** Given tasks and a cooldown `n`, find minimum intervals required.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Math/Greedy. Find max frequency task. The formula: `(maxFreq - 1) * (n + 1) + countOfMaxFreqTasks`. Compare it with `tasks.size()`.
- **C++ Code:**
```cpp
class Solution {
public:
    int leastInterval(vector<char>& tasks, int n) {
        vector<int> counts(26, 0);
        int maxFreq = 0, maxCount = 0;
        
        for (char t : tasks) {
            counts[t - 'A']++;
            if (counts[t - 'A'] == maxFreq) {
                maxCount++;
            } else if (counts[t - 'A'] > maxFreq) {
                maxFreq = counts[t - 'A'];
                maxCount = 1;
            }
        }
        
        int intervals = (maxFreq - 1) * (n + 1) + maxCount;
        return max((int)tasks.size(), intervals);
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q226) Reorganize String (767)
- **Problem:** Rearrange characters so no two adjacent are identical.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Hash map + Max-Heap. Always place the most frequent remaining char. Temporarily pop and hold the last used char so it isn't used consecutively.
- **C++ Code:**
```cpp
class Solution {
public:
    string reorganizeString(string s) {
        vector<int> count(26, 0);
        for (char c : s) count[c - 'a']++;
        
        priority_queue<pair<int, char>> pq;
        for (int i = 0; i < 26; ++i) {
            if (count[i] > 0) pq.push({count[i], i + 'a'});
        }
        
        string res = "";
        pair<int, char> prev = {-1, '#'};
        
        while (!pq.empty()) {
            auto curr = pq.top(); pq.pop();
            res += curr.second;
            curr.first--;
            
            if (prev.first > 0) pq.push(prev);
            prev = curr;
        }
        
        return res.length() == s.length() ? res : "";
    }
};
```
- **Complexity:** T: O(N log 26) = O(N) | S: O(26) = O(1)

---

### Q227) Meeting Rooms I (252)
- **Problem:** Determine if a person can attend all meetings.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Sort intervals by start time. Check if any start time is less than the previous end time.
- **C++ Code:**
```cpp
class Solution {
public:
    bool canAttendMeetings(vector<vector<int>>& intervals) {
        sort(intervals.begin(), intervals.end());
        for (int i = 1; i < intervals.size(); ++i) {
            if (intervals[i][0] < intervals[i - 1][1]) {
                return false;
            }
        }
        return true;
    }
};
```
- **Complexity:** T: O(N log N) | S: O(1)

---

### Q228) Meeting Rooms II (253)
- **Problem:** Find the minimum number of meeting rooms required.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Separate and sort start and end arrays. Use two pointers to simulate chronological progression. When a meeting starts, room count++. When it ends, room count--. Track max rooms.
- **C++ Code:**
```cpp
class Solution {
public:
    int minMeetingRooms(vector<vector<int>>& intervals) {
        vector<int> starts, ends;
        for (auto& i : intervals) {
            starts.push_back(i[0]);
            ends.push_back(i[1]);
        }
        sort(starts.begin(), starts.end());
        sort(ends.begin(), ends.end());
        
        int s = 0, e = 0;
        int rooms = 0, maxRooms = 0;
        while (s < starts.size()) {
            if (starts[s] < ends[e]) {
                rooms++;
                s++;
            } else {
                rooms--;
                e++;
            }
            maxRooms = max(maxRooms, rooms);
        }
        return maxRooms;
    }
};
```
- **Complexity:** T: O(N log N) | S: O(N)

---

### Q229) IPO (502)
- **Problem:** Maximize total capital by picking at most `k` projects.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Sort projects by required capital. Push affordable profits into a Max-Heap. Pop max profit to increase capital, repeat `k` times.
- **C++ Code:**
```cpp
class Solution {
public:
    int findMaximizedCapital(int k, int w, vector<int>& profits, vector<int>& capital) {
        vector<pair<int, int>> projects;
        for (int i = 0; i < profits.size(); ++i) {
            projects.push_back({capital[i], profits[i]});
        }
        sort(projects.begin(), projects.end());
        
        priority_queue<int> maxHeap;
        int i = 0;
        while (k--) {
            while (i < projects.size() && projects[i].first <= w) {
                maxHeap.push(projects[i].second);
                i++;
            }
            if (maxHeap.empty()) break;
            w += maxHeap.top();
            maxHeap.pop();
        }
        return w;
    }
};
```
- **Complexity:** T: O(N log N) | S: O(N)

---

### Q230) Minimum Cost to Connect Sticks (1167)
- **Problem:** Connect all sticks into one with minimum cost (cost = sum of two stick lengths).
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Always merge the two shortest sticks. Use a Min-Heap. Sum of the two shortest goes back into the heap.
- **C++ Code:**
```cpp
class Solution {
public:
    int connectSticks(vector<int>& sticks) {
        priority_queue<int, vector<int>, greater<int>> minHeap(sticks.begin(), sticks.end());
        int cost = 0;
        while (minHeap.size() > 1) {
            int first = minHeap.top(); minHeap.pop();
            int second = minHeap.top(); minHeap.pop();
            int sum = first + second;
            cost += sum;
            minHeap.push(sum);
        }
        return cost;
    }
};
```
- **Complexity:** T: O(N log N) | S: O(N)

---

### Q231) Split Array into Consecutive Subsequences (659)
- **Problem:** Can array be split into subsequences of strictly increasing numbers of length >= 3?
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Greedy. Hash maps to count availability and end requirements. Always try to append to an existing subsequence first, else start a new one of length 3.
- **C++ Code:**
```cpp
class Solution {
public:
    bool isPossible(vector<int>& nums) {
        unordered_map<int, int> count, endMap;
        for (int n : nums) count[n]++;
        
        for (int n : nums) {
            if (count[n] == 0) continue;
            count[n]--;
            
            if (endMap[n - 1] > 0) {
                endMap[n - 1]--;
                endMap[n]++;
            } else if (count[n + 1] > 0 && count[n + 2] > 0) {
                count[n + 1]--;
                count[n + 2]--;
                endMap[n + 2]++;
            } else {
                return false;
            }
        }
        return true;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q232) Car Pooling (1094)
- **Problem:** Determine if a car can pick up and drop off all passengers without exceeding capacity.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Line sweep / difference array technique. Increment passengers at start, decrement at end. Run a cumulative sum and check against capacity.
- **C++ Code:**
```cpp
class Solution {
public:
    bool carPooling(vector<vector<int>>& trips, int capacity) {
        vector<int> stops(1001, 0);
        for (auto& t : trips) {
            stops[t[1]] += t[0];
            stops[t[2]] -= t[0];
        }
        int curr = 0;
        for (int i = 0; i <= 1000; ++i) {
            curr += stops[i];
            if (curr > capacity) return false;
        }
        return true;
    }
};
```
- **Complexity:** T: O(N + 1000) | S: O(1000)

---

### Q233) Furthest Building You Can Reach (1642)
- **Problem:** Jump to next building using limited bricks or ladders. Ladders cross any gap.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Min-Heap for gaps covered by ladders. If we run out of ladders, pop smallest gap from Min-Heap and cover it with bricks instead. If bricks < 0, return index.
- **C++ Code:**
```cpp
class Solution {
public:
    int furthestBuilding(vector<int>& heights, int bricks, int ladders) {
        priority_queue<int, vector<int>, greater<int>> minHeap;
        for (int i = 0; i < heights.size() - 1; ++i) {
            int diff = heights[i + 1] - heights[i];
            if (diff > 0) {
                minHeap.push(diff);
                if (minHeap.size() > ladders) {
                    bricks -= minHeap.top();
                    minHeap.pop();
                }
                if (bricks < 0) return i;
            }
        }
        return heights.size() - 1;
    }
};
```
- **Complexity:** T: O(N log L) | S: O(L)

---

### Q234) Gas Station (134)
- **Problem:** Find starting index to complete circular route. 
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Greedy. If total gas < total cost, return -1. Else there's a unique start. Track current gas, if it drops below 0, reset start point to `i + 1` and `current gas` to 0.
- **C++ Code:**
```cpp
class Solution {
public:
    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
        int totalGas = 0, currGas = 0, start = 0;
        for (int i = 0; i < gas.size(); ++i) {
            int diff = gas[i] - cost[i];
            totalGas += diff;
            currGas += diff;
            if (currGas < 0) {
                currGas = 0;
                start = i + 1;
            }
        }
        return totalGas >= 0 ? start : -1;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q235) Candy (135)
- **Problem:** Min candies such that kids with higher ratings than neighbors get more candies.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Two passes. Left to right: if higher rating than left, candy[i] = candy[i-1] + 1. Right to left: if higher rating than right, candy[i] = max(candy[i], candy[i+1] + 1).
- **C++ Code:**
```cpp
class Solution {
public:
    int candy(vector<int>& ratings) {
        int n = ratings.size();
        vector<int> candies(n, 1);
        for (int i = 1; i < n; ++i) {
            if (ratings[i] > ratings[i - 1]) candies[i] = candies[i - 1] + 1;
        }
        int sum = candies[n - 1];
        for (int i = n - 2; i >= 0; --i) {
            if (ratings[i] > ratings[i + 1]) candies[i] = max(candies[i], candies[i + 1] + 1);
            sum += candies[i];
        }
        return sum;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q236) Queue Reconstruction by Height (406)
- **Problem:** Reconstruct people array `(h, k)` where `h` is height, `k` is # of taller people in front.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Sort descending by height, ascending by k. Then insert each person at index `k`. Since taller people are inserted first, inserting shorter ones doesn't break the `k` property of taller ones.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<vector<int>> reconstructQueue(vector<vector<int>>& people) {
        sort(people.begin(), people.end(), [](vector<int>& a, vector<int>& b) {
            if (a[0] == b[0]) return a[1] < b[1];
            return a[0] > b[0];
        });
        vector<vector<int>> res;
        for (auto& p : people) {
            res.insert(res.begin() + p[1], p);
        }
        return res;
    }
};
```
- **Complexity:** T: O(N^2) | S: O(N)

---

### Q237) Minimum Number of Arrows to Burst Balloons (452)
- **Problem:** Find min arrows to burst overlapping intervals.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Sort intervals by END time. Place first arrow at end of first interval. Skip all subsequent intervals that start before or at the arrow's position.
- **C++ Code:**
```cpp
class Solution {
public:
    int findMinArrowShots(vector<vector<int>>& points) {
        if (points.empty()) return 0;
        sort(points.begin(), points.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[1] < b[1];
        });
        
        int arrows = 1;
        int currentEnd = points[0][1];
        for (int i = 1; i < points.size(); ++i) {
            if (points[i][0] > currentEnd) {
                arrows++;
                currentEnd = points[i][1];
            }
        }
        return arrows;
    }
};
```
- **Complexity:** T: O(N log N) | S: O(1)

---

### Q238) Non-overlapping Intervals (435)
- **Problem:** Min intervals to remove to make the rest non-overlapping.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Same as finding max number of valid intervals. Sort by END time. Greedily pick the interval that ends earliest to leave room for others.
- **C++ Code:**
```cpp
class Solution {
public:
    int eraseOverlapIntervals(vector<vector<int>>& intervals) {
        if (intervals.empty()) return 0;
        sort(intervals.begin(), intervals.end(), [](const vector<int>& a, const vector<int>& b) {
            return a[1] < b[1];
        });
        
        int count = 1; // max non-overlapping intervals
        int end = intervals[0][1];
        for (int i = 1; i < intervals.size(); ++i) {
            if (intervals[i][0] >= end) {
                count++;
                end = intervals[i][1];
            }
        }
        return intervals.size() - count;
    }
};
```
- **Complexity:** T: O(N log N) | S: O(1)

---

### Q239) Jump Game (55)
- **Problem:** Determine if you can reach the last index.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Greedy. Maintain a `maxReach` index. If `i > maxReach`, we can't progress. Update `maxReach = max(maxReach, i + nums[i])`.
- **C++ Code:**
```cpp
class Solution {
public:
    bool canJump(vector<int>& nums) {
        int maxReach = 0;
        for (int i = 0; i < nums.size(); ++i) {
            if (i > maxReach) return false;
            maxReach = max(maxReach, i + nums[i]);
            if (maxReach >= nums.size() - 1) return true;
        }
        return true;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q240) Jump Game II (45)
- **Problem:** Find min jumps to reach the last index (guaranteed reachable).
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Greedy BFS. Keep track of current jump end (`currEnd`) and furthest you can reach (`farthest`). When `i == currEnd`, increment jump, `currEnd = farthest`.
- **C++ Code:**
```cpp
class Solution {
public:
    int jump(vector<int>& nums) {
        int jumps = 0, currEnd = 0, farthest = 0;
        for (int i = 0; i < nums.size() - 1; ++i) {
            farthest = max(farthest, i + nums[i]);
            if (i == currEnd) {
                jumps++;
                currEnd = farthest;
            }
        }
        return jumps;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q241) Hand of Straights (846)
- **Problem:** Group cards into sequences of groupSize.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Map for frequencies. Iterate via a sorted map (like a Min-Heap). If a number is present, subtract `count` from `curr, curr+1... curr+groupSize-1`.
- **C++ Code:**
```cpp
class Solution {
public:
    bool isNStraightHand(vector<int>& hand, int groupSize) {
        if (hand.size() % groupSize != 0) return false;
        map<int, int> counts;
        for (int n : hand) counts[n]++;
        
        for (auto [start, count] : counts) {
            if (count > 0) {
                for (int i = 0; i < groupSize; ++i) {
                    if (counts[start + i] < count) return false;
                    counts[start + i] -= count;
                }
            }
        }
        return true;
    }
};
```
- **Complexity:** T: O(N log N) | S: O(N)

---

### Q242) Dota2 Senate (649)
- **Problem:** Decide winning party ('R' or 'D') given strict rotation elimination.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Two queues holding indices. Pop one from each, the smaller index eliminates the larger. The survivor goes back to end of queue with `index + n`.
- **C++ Code:**
```cpp
class Solution {
public:
    string predictPartyVictory(string senate) {
        queue<int> rad, dir;
        int n = senate.length();
        for (int i = 0; i < n; ++i) {
            if (senate[i] == 'R') rad.push(i);
            else dir.push(i);
        }
        
        while (!rad.empty() && !dir.empty()) {
            int r = rad.front(); rad.pop();
            int d = dir.front(); dir.pop();
            if (r < d) rad.push(r + n);
            else dir.push(d + n);
        }
        return rad.empty() ? "Dire" : "Radiant";
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q243) Advantage Shuffle (870)
- **Problem:** Maximize matches where nums1[i] > nums2[i].
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Sort `nums1` and sorted indices of `nums2`. Two pointers on `nums1`. If `nums1[right]` can beat `nums2`, assign it. Otherwise assign `nums1[left]` (sacrifice weakest).
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> advantageCount(vector<int>& nums1, vector<int>& nums2) {
        sort(nums1.begin(), nums1.end());
        vector<pair<int, int>> sortedN2;
        for (int i = 0; i < nums2.size(); ++i) sortedN2.push_back({nums2[i], i});
        sort(sortedN2.begin(), sortedN2.end(), [](pair<int, int>& a, pair<int, int>& b){
            return a.first > b.first; // Descending
        });
        
        vector<int> res(nums1.size());
        int left = 0, right = nums1.size() - 1;
        for (auto& p : sortedN2) {
            int val = p.first, idx = p.second;
            if (nums1[right] > val) {
                res[idx] = nums1[right--];
            } else {
                res[idx] = nums1[left++];
            }
        }
        return res;
    }
};
```
- **Complexity:** T: O(N log N) | S: O(N)

---

### Q244) Minimum Platforms (GFG Practice)
- **Problem:** Find min platforms required given train arrival and departure times.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Similar to Meeting Rooms II. Sort arrival and departure arrays independently. Two pointers line sweep.
- **C++ Code:**
```cpp
class Solution {
public:
    int findPlatform(int arr[], int dep[], int n) {
        sort(arr, arr + n);
        sort(dep, dep + n);
        
        int platforms = 0, maxPlat = 0;
        int i = 0, j = 0;
        while (i < n) {
            if (arr[i] <= dep[j]) {
                platforms++;
                i++;
            } else {
                platforms--;
                j++;
            }
            maxPlat = max(maxPlat, platforms);
        }
        return maxPlat;
    }
};
```
- **Complexity:** T: O(N log N) | S: O(1)

---

### Q245) Connect Ropes with Minimum Cost
- **Problem:** Same logic as Minimum Cost to Connect Sticks (1167).
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Min-Heap.
- **C++ Code:**
```cpp
class Solution {
public:
    long long minCost(long long arr[], long long n) {
        priority_queue<long long, vector<long long>, greater<long long>> pq(arr, arr + n);
        long long cost = 0;
        while (pq.size() > 1) {
            long long a = pq.top(); pq.pop();
            long long b = pq.top(); pq.pop();
            cost += (a + b);
            pq.push(a + b);
        }
        return cost;
    }
};
```
- **Complexity:** T: O(N log N) | S: O(N)

---

### Q246) Huffman Encoding
- **Problem:** Build Huffman Tree and generate codes.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Min-Heap storing `{freq, string}`. Combine two smallest, prepend '0' to left branch codes and '1' to right. 
- **C++ Code:**
```cpp
class Solution {
    struct Node {
        int freq; string c;
        Node *left, *right;
        Node(int f, string ch) : freq(f), c(ch), left(nullptr), right(nullptr) {}
    };
    struct Comp {
        bool operator()(Node* l, Node* r) { return l->freq > r->freq; }
    };
    void dfs(Node* root, string code, vector<string>& res) {
        if (!root->left && !root->right) {
            res.push_back(code);
            return;
        }
        if (root->left) dfs(root->left, code + "0", res);
        if (root->right) dfs(root->right, code + "1", res);
    }
public:
    vector<string> huffmanCodes(string S, vector<int> f, int N) {
        priority_queue<Node*, vector<Node*>, Comp> pq;
        for (int i = 0; i < N; ++i) pq.push(new Node(f[i], string(1, S[i])));
        
        while (pq.size() > 1) {
            Node* left = pq.top(); pq.pop();
            Node* right = pq.top(); pq.pop();
            Node* parent = new Node(left->freq + right->freq, "");
            parent->left = left; parent->right = right;
            pq.push(parent);
        }
        vector<string> res;
        dfs(pq.top(), "", res);
        return res;
    }
};
```
- **Complexity:** T: O(N log N) | S: O(N)

---

## 🗂️ DYNAMIC PROGRAMMING

*(Note: DP Solutions include both Memoization and Tabulation where appropriate within a single class for comparison)*

### Q247) Climbing Stairs (70)
- **Problem:** Distinct ways to climb to top taking 1 or 2 steps.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Fibonacci sequence. Current ways = ways to reach `n-1` + ways to reach `n-2`.
- **C++ Code:**
```cpp
class Solution {
public:
    // Approach 1: Memoization
    int memoHelper(int n, vector<int>& dp) {
        if (n <= 2) return n;
        if (dp[n] != -1) return dp[n];
        return dp[n] = memoHelper(n - 1, dp) + memoHelper(n - 2, dp);
    }
    int climbStairsMemo(int n) {
        vector<int> dp(n + 1, -1);
        return memoHelper(n, dp);
    }
    
    // Approach 2: Tabulation (Space Optimized)
    int climbStairs(int n) {
        if (n <= 2) return n;
        int prev2 = 1, prev1 = 2;
        for (int i = 3; i <= n; ++i) {
            int curr = prev1 + prev2;
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
};
```
- **Complexity:** T: O(N) | S: O(1) (Tabulation) / O(N) (Memo)

---

### Q248) Min Cost Climbing Stairs (746)
- **Problem:** Find min cost to reach top of stairs taking 1 or 2 steps.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** At step `i`, min cost is `cost[i] + min(cost[i-1], cost[i-2])`. Space optimization allows O(1) space.
- **C++ Code:**
```cpp
class Solution {
public:
    // Approach 1: Memoization
    int memoHelper(vector<int>& cost, int i, vector<int>& dp) {
        if (i <= 1) return cost[i];
        if (dp[i] != -1) return dp[i];
        return dp[i] = cost[i] + min(memoHelper(cost, i - 1, dp), memoHelper(cost, i - 2, dp));
    }
    int minCostClimbingStairsMemo(vector<int>& cost) {
        int n = cost.size();
        vector<int> dp(n, -1);
        return min(memoHelper(cost, n - 1, dp), memoHelper(cost, n - 2, dp));
    }
    
    // Approach 2: Tabulation (Space Optimized)
    int minCostClimbingStairs(vector<int>& cost) {
        int n = cost.size();
        int prev2 = cost[0], prev1 = cost[1];
        for (int i = 2; i < n; ++i) {
            int curr = cost[i] + min(prev1, prev2);
            prev2 = prev1;
            prev1 = curr;
        }
        return min(prev1, prev2);
    }
};
```
- **Complexity:** T: O(N) | S: O(1) (Tabulation) / O(N) (Memo)

---

### Q249) House Robber (198)
- **Problem:** Max money you can rob without robbing adjacent houses.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Max value at `i` is `max(rob[i-1], rob[i-2] + nums[i])`.
- **C++ Code:**
```cpp
class Solution {
public:
    // Approach 1: Memoization
    int memo(vector<int>& nums, int i, vector<int>& dp) {
        if (i < 0) return 0;
        if (dp[i] != -1) return dp[i];
        return dp[i] = max(memo(nums, i - 1, dp), memo(nums, i - 2, dp) + nums[i]);
    }
    
    // Approach 2: Tabulation
    int rob(vector<int>& nums) {
        int prev2 = 0, prev1 = 0;
        for (int x : nums) {
            int temp = max(prev1, prev2 + x);
            prev2 = prev1;
            prev1 = temp;
        }
        return prev1;
    }
};
```
- **Complexity:** T: O(N) | S: O(1) (Tabulation)

---

### Q250) House Robber II (213)
- **Problem:** Same as House Robber, but houses are in a circle (first and last adjacent).
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Return `max(robHelper(0 to n-2), robHelper(1 to n-1))`.
- **C++ Code:**
```cpp
class Solution {
    int robHelper(vector<int>& nums, int start, int end) {
        int prev2 = 0, prev1 = 0;
        for (int i = start; i <= end; ++i) {
            int temp = max(prev1, prev2 + nums[i]);
            prev2 = prev1;
            prev1 = temp;
        }
        return prev1;
    }
public:
    // Tabulation approach reused via helper
    int rob(vector<int>& nums) {
        if (nums.size() == 1) return nums[0];
        return max(robHelper(nums, 0, nums.size() - 2), 
                   robHelper(nums, 1, nums.size() - 1));
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q251) House Robber III (337)
- **Problem:** Max money without robbing directly linked binary tree nodes.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** DFS returning pair `{includeRoot, excludeRoot}`. For each node: Include = node.val + excludeLeft + excludeRight. Exclude = max(left) + max(right).
- **C++ Code:**
```cpp
class Solution {
public:
    // DP on Trees (Memoization implicitly in pair return)
    pair<int, int> dfs(TreeNode* root) {
        if (!root) return {0, 0};
        auto left = dfs(root->left);
        auto right = dfs(root->right);
        
        int robThis = root->val + left.second + right.second;
        int skipThis = max(left.first, left.second) + max(right.first, right.second);
        
        return {robThis, skipThis};
    }
    
    int rob(TreeNode* root) {
        auto res = dfs(root);
        return max(res.first, res.second);
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q252) Coin Change (322)
- **Problem:** Min coins to make up an amount.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Unbounded knapsack. `dp[i] = min(dp[i], dp[i-coin] + 1)`.
- **C++ Code:**
```cpp
class Solution {
public:
    // Approach 1: Memoization
    int dfs(vector<int>& coins, int amount, vector<int>& dp) {
        if (amount == 0) return 0;
        if (amount < 0) return -1;
        if (dp[amount] != -2) return dp[amount];
        
        int minCoins = INT_MAX;
        for (int coin : coins) {
            int res = dfs(coins, amount - coin, dp);
            if (res != -1) minCoins = min(minCoins, res + 1);
        }
        return dp[amount] = (minCoins == INT_MAX) ? -1 : minCoins;
    }
    
    // Approach 2: Tabulation
    int coinChange(vector<int>& coins, int amount) {
        vector<int> dp(amount + 1, amount + 1);
        dp[0] = 0;
        for (int i = 1; i <= amount; ++i) {
            for (int coin : coins) {
                if (i - coin >= 0) {
                    dp[i] = min(dp[i], dp[i - coin] + 1);
                }
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
};
```
- **Complexity:** T: O(amount * len(coins)) | S: O(amount)

---

### Q253) Coin Change II (518)
- **Problem:** Number of ways to make up an amount.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Unbounded knapsack. Iterate coins in outer loop to avoid permutations. `dp[i] += dp[i-coin]`.
- **C++ Code:**
```cpp
class Solution {
public:
    // Approach 1: Memoization
    int dfs(int idx, int amount, vector<int>& coins, vector<vector<int>>& dp) {
        if (amount == 0) return 1;
        if (idx == coins.size() || amount < 0) return 0;
        if (dp[idx][amount] != -1) return dp[idx][amount];
        
        int pick = dfs(idx, amount - coins[idx], coins, dp);
        int skip = dfs(idx + 1, amount, coins, dp);
        return dp[idx][amount] = pick + skip;
    }
    
    // Approach 2: Tabulation
    int change(int amount, vector<int>& coins) {
        vector<int> dp(amount + 1, 0);
        dp[0] = 1;
        for (int coin : coins) {
            for (int i = coin; i <= amount; ++i) {
                dp[i] += dp[i - coin];
            }
        }
        return dp[amount];
    }
};
```
- **Complexity:** T: O(amount * len(coins)) | S: O(amount)

---

### Q254) Longest Increasing Subsequence (300)
- **Problem:** Length of longest strictly increasing subsequence.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Use DP or Binary Search (`std::lower_bound`). DP is O(N^2), Binary Search replacement array is O(N log N).
- **C++ Code:**
```cpp
class Solution {
public:
    // Tabulation O(N^2)
    int lengthOfLIS_DP(vector<int>& nums) {
        vector<int> dp(nums.size(), 1);
        int maxLen = 1;
        for(int i=1; i<nums.size(); ++i) {
            for(int j=0; j<i; ++j) {
                if(nums[i] > nums[j]) dp[i] = max(dp[i], dp[j] + 1);
            }
            maxLen = max(maxLen, dp[i]);
        }
        return maxLen;
    }

    // Optimal O(N log N)
    int lengthOfLIS(vector<int>& nums) {
        vector<int> sub;
        for (int x : nums) {
            auto it = lower_bound(sub.begin(), sub.end(), x);
            if (it == sub.end()) sub.push_back(x);
            else *it = x;
        }
        return sub.size();
    }
};
```
- **Complexity:** T: O(N log N) | S: O(N)

---

### Q255) Longest Common Subsequence (1143)
- **Problem:** Find length of LCS between two strings.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** If `s1[i]==s2[j]`, `1 + dp[i-1][j-1]`. Else, `max(dp[i-1][j], dp[i][j-1])`.
- **C++ Code:**
```cpp
class Solution {
public:
    // Approach 1: Memoization
    int dfs(string& t1, string& t2, int i, int j, vector<vector<int>>& dp) {
        if (i == t1.length() || j == t2.length()) return 0;
        if (dp[i][j] != -1) return dp[i][j];
        if (t1[i] == t2[j]) return dp[i][j] = 1 + dfs(t1, t2, i+1, j+1, dp);
        return dp[i][j] = max(dfs(t1, t2, i+1, j, dp), dfs(t1, t2, i, j+1, dp));
    }

    // Approach 2: Tabulation
    int longestCommonSubsequence(string text1, string text2) {
        int m = text1.size(), n = text2.size();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        for (int i = 1; i <= m; ++i) {
            for (int j = 1; j <= n; ++j) {
                if (text1[i - 1] == text2[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1];
                else dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
        return dp[m][n];
    }
};
```
- **Complexity:** T: O(M * N) | S: O(M * N)

---

### Q256) Edit Distance (72)
- **Problem:** Min operations (insert, delete, replace) to convert word1 to word2.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** If match, `dp[i-1][j-1]`. Else `1 + min(insert(dp[i][j-1]), delete(dp[i-1][j]), replace(dp[i-1][j-1]))`.
- **C++ Code:**
```cpp
class Solution {
public:
    // Approach 1: Memoization
    int solve(string& w1, string& w2, int i, int j, vector<vector<int>>& dp) {
        if (i < 0) return j + 1;
        if (j < 0) return i + 1;
        if (dp[i][j] != -1) return dp[i][j];
        if (w1[i] == w2[j]) return dp[i][j] = solve(w1, w2, i-1, j-1, dp);
        return dp[i][j] = 1 + min({solve(w1, w2, i, j-1, dp), 
                                   solve(w1, w2, i-1, j, dp), 
                                   solve(w1, w2, i-1, j-1, dp)});
    }

    // Approach 2: Tabulation
    int minDistance(string word1, string word2) {
        int m = word1.length(), n = word2.length();
        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
        for (int i = 0; i <= m; ++i) dp[i][0] = i;
        for (int j = 0; j <= n; ++j) dp[0][j] = j;
        
        for (int i = 1; i <= m; ++i) {
            for (int j = 1; j <= n; ++j) {
                if (word1[i - 1] == word2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
                else dp[i][j] = 1 + min({dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]});
            }
        }
        return dp[m][n];
    }
};
```
- **Complexity:** T: O(M * N) | S: O(M * N)

---

### Q257) Unique Paths (62)
- **Problem:** Total paths to reach bottom-right corner. Only down and right allowed.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** `dp[i][j] = dp[i-1][j] + dp[i][j-1]`.
- **C++ Code:**
```cpp
class Solution {
public:
    // Approach 1: Memoization
    int solve(int m, int n, vector<vector<int>>& dp) {
        if (m == 1 || n == 1) return 1;
        if (dp[m][n] != -1) return dp[m][n];
        return dp[m][n] = solve(m-1, n, dp) + solve(m, n-1, dp);
    }
    
    // Approach 2: Tabulation
    int uniquePaths(int m, int n) {
        vector<int> dp(n, 1);
        for (int i = 1; i < m; ++i) {
            for (int j = 1; j < n; ++j) {
                dp[j] += dp[j - 1];
            }
        }
        return dp[n - 1];
    }
};
```
- **Complexity:** T: O(M * N) | S: O(N) (Tabulation optimized)

---

### Q258) Unique Paths II (63)
- **Problem:** Same as Unique Paths but with obstacles (grid[i][j] == 1).
- **Difficulty:** Medium
- **Concept / Optimal Algo:** If obstacle, `dp = 0`. Else same recurrence.
- **C++ Code:**
```cpp
class Solution {
public:
    // Approach 1: Memoization
    int dfs(vector<vector<int>>& grid, int r, int c, vector<vector<int>>& dp) {
        if (r < 0 || c < 0 || grid[r][c] == 1) return 0;
        if (r == 0 && c == 0) return 1;
        if (dp[r][c] != -1) return dp[r][c];
        return dp[r][c] = dfs(grid, r-1, c, dp) + dfs(grid, r, c-1, dp);
    }

    // Approach 2: Tabulation
    int uniquePathsWithObstacles(vector<vector<int>>& obstacleGrid) {
        if (obstacleGrid[0][0] == 1) return 0;
        int m = obstacleGrid.size(), n = obstacleGrid[0].size();
        vector<long> dp(n, 0);
        dp[0] = 1;
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                if (obstacleGrid[i][j] == 1) dp[j] = 0;
                else if (j > 0) dp[j] += dp[j - 1];
            }
        }
        return dp[n - 1];
    }
};
```
- **Complexity:** T: O(M * N) | S: O(N)

---

### Q259) Minimum Path Sum (64)
- **Problem:** Min cost path from top-left to bottom-right.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** `dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])`. Space optimizable to 1D array or in-place.
- **C++ Code:**
```cpp
class Solution {
public:
    // Approach 1: Memoization
    int dfs(vector<vector<int>>& grid, int r, int c, vector<vector<int>>& dp) {
        if (r == 0 && c == 0) return grid[0][0];
        if (r < 0 || c < 0) return 1e9;
        if (dp[r][c] != -1) return dp[r][c];
        return dp[r][c] = grid[r][c] + min(dfs(grid, r-1, c, dp), dfs(grid, r, c-1, dp));
    }

    // Approach 2: Tabulation (In-place)
    int minPathSum(vector<vector<int>>& grid) {
        int m = grid.size(), n = grid[0].size();
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                if (i == 0 && j == 0) continue;
                int up = (i > 0) ? grid[i - 1][j] : 1e9;
                int left = (j > 0) ? grid[i][j - 1] : 1e9;
                grid[i][j] += min(up, left);
            }
        }
        return grid[m - 1][n - 1];
    }
};
```
- **Complexity:** T: O(M * N) | S: O(1) (In-place Tabulation)

---

### Q260) Decode Ways (91)
- **Problem:** Number of ways to decode a string of digits (1='A' ... 26='Z').
- **Difficulty:** Medium
- **Concept / Optimal Algo:** `dp[i] = dp[i-1]` (if single digit valid) `+ dp[i-2]` (if two digits form 10-26).
- **C++ Code:**
```cpp
class Solution {
public:
    // Approach 1: Memoization
    int dfs(string& s, int i, vector<int>& dp) {
        if (i == s.length()) return 1;
        if (s[i] == '0') return 0;
        if (dp[i] != -1) return dp[i];
        
        int ways = dfs(s, i + 1, dp);
        if (i + 1 < s.length() && (s[i] == '1' || (s[i] == '2' && s[i+1] <= '6'))) {
            ways += dfs(s, i + 2, dp);
        }
        return dp[i] = ways;
    }

    // Approach 2: Tabulation
    int numDecodings(string s) {
        if (s.empty() || s[0] == '0') return 0;
        int prev2 = 1, prev1 = 1; // prev2 = dp[i-2], prev1 = dp[i-1]
        for (int i = 1; i < s.length(); ++i) {
            int curr = 0;
            if (s[i] != '0') curr += prev1;
            int twoDigit = stoi(s.substr(i - 1, 2));
            if (twoDigit >= 10 && twoDigit <= 26) curr += prev2;
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q261) Word Break (139)
- **Problem:** Can string be segmented into space-separated dictionary words?
- **Difficulty:** Medium
- **Concept / Optimal Algo:** `dp[i]` is true if there exists `j < i` where `dp[j]` is true and `s[j:i]` is in dict.
- **C++ Code:**
```cpp
class Solution {
public:
    // Approach 1: Memoization
    bool dfs(string& s, unordered_set<string>& dict, int start, vector<int>& dp) {
        if (start == s.length()) return true;
        if (dp[start] != -1) return dp[start];
        for (int i = start + 1; i <= s.length(); ++i) {
            if (dict.count(s.substr(start, i - start)) && dfs(s, dict, i, dp)) {
                return dp[start] = 1;
            }
        }
        return dp[start] = 0;
    }

    // Approach 2: Tabulation
    bool wordBreak(string s, vector<string>& wordDict) {
        unordered_set<string> dict(wordDict.begin(), wordDict.end());
        vector<bool> dp(s.length() + 1, false);
        dp[0] = true;
        
        for (int i = 1; i <= s.length(); ++i) {
            for (int j = 0; j < i; ++j) {
                if (dp[j] && dict.count(s.substr(j, i - j))) {
                    dp[i] = true;
                    break;
                }
            }
        }
        return dp[s.length()];
    }
};
```
- **Complexity:** T: O(N^3) | S: O(N)

---

### Q262) Word Break II (140)
- **Problem:** Return all possible word break sentences.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Backtracking + Memoization. Memoize string -> vector of valid sentences. For each valid prefix, recurse on suffix and append prefix to results.
- **C++ Code:**
```cpp
class Solution {
    unordered_map<string, vector<string>> memo;
public:
    vector<string> wordBreak(string s, vector<string>& wordDict) {
        if (memo.count(s)) return memo[s];
        if (s.empty()) return {""};
        
        unordered_set<string> dict(wordDict.begin(), wordDict.end());
        vector<string> res;
        
        for (int i = 1; i <= s.length(); ++i) {
            string prefix = s.substr(0, i);
            if (dict.count(prefix)) {
                vector<string> suffixes = wordBreak(s.substr(i), wordDict);
                for (string suff : suffixes) {
                    res.push_back(prefix + (suff.empty() ? "" : " ") + suff);
                }
            }
        }
        return memo[s] = res;
    }
};
```
- **Complexity:** T: O(N^3 + 2^N) | S: O(2^N)

---

### Q263) Partition Equal Subset Sum (416)
- **Problem:** Partition array into two subsets with equal sum.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** 0/1 Knapsack. Target sum = Total Sum / 2. Find if any subset adds up to Target.
- **C++ Code:**
```cpp
class Solution {
public:
    // Approach 1: Memoization
    bool dfs(vector<int>& nums, int i, int target, vector<vector<int>>& dp) {
        if (target == 0) return true;
        if (i == nums.size() || target < 0) return false;
        if (dp[i][target] != -1) return dp[i][target];
        return dp[i][target] = dfs(nums, i+1, target-nums[i], dp) || dfs(nums, i+1, target, dp);
    }

    // Approach 2: Tabulation
    bool canPartition(vector<int>& nums) {
        int sum = accumulate(nums.begin(), nums.end(), 0);
        if (sum % 2 != 0) return false;
        int target = sum / 2;
        
        vector<bool> dp(target + 1, false);
        dp[0] = true;
        
        for (int x : nums) {
            for (int j = target; j >= x; --j) {
                dp[j] = dp[j] || dp[j - x];
            }
        }
        return dp[target];
    }
};
```
- **Complexity:** T: O(N * Target) | S: O(Target)

---

### Q264) Target Sum (494)
- **Problem:** Assign +/- to elements to reach `target`.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Subset sum. Math reduces this to: `SubsetPos = (Target + TotalSum) / 2`. Find ways to form `SubsetPos`.
- **C++ Code:**
```cpp
class Solution {
public:
    // Tabulation approach on derived target
    int findTargetSumWays(vector<int>& nums, int target) {
        int sum = accumulate(nums.begin(), nums.end(), 0);
        if (abs(target) > sum || (target + sum) % 2 != 0) return ```cpp
        // Approach 1: Memoization
        // Helper function: int dfs(vector<int>& nums, int i, int sum, int target, vector<unordered_map<int, int>>& dp)
        
        // Approach 2: Tabulation (Space Optimized)
        int sum = accumulate(nums.begin(), nums.end(), 0);
        if (abs(target) > sum || (target + sum) % 2 != 0) return 0;
        int s = (target + sum) / 2;
        
        vector<int> dp(s + 1, 0);
        dp[0] = 1;
        for (int x : nums) {
            for (int j = s; j >= x; --j) {
                dp[j] += dp[j - x];
            }
        }
        return dp[s];
    }
};
```
- **Complexity:** T: O(N * Target) | S: O(Target)

---

### Q265) Combination Sum IV (377)
- **Problem:** Number of possible combinations that add up to a positive integer `target`.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Unbounded knapsack with permutations. `dp[i] += dp[i - num]`.
- **C++ Code:**
```cpp
class Solution {
public:
    // Approach 1: Memoization
    int dfs(vector<int>& nums, int target, vector<int>& dp) {
        if (target == 0) return 1;
        if (target < 0) return 0;
        if (dp[target] != -1) return dp[target];
        int res = 0;
        for (int x : nums) res += dfs(nums, target - x, dp);
        return dp[target] = res;
    }

    // Approach 2: Tabulation
    int combinationSum4(vector<int>& nums, int target) {
        vector<unsigned int> dp(target + 1, 0);
        dp[0] = 1;
        for (int i = 1; i <= target; ++i) {
            for (int x : nums) {
                if (i >= x) dp[i] += dp[i - x];
            }
        }
        return dp[target];
    }
};
```
- **Complexity:** T: O(N * Target) | S: O(Target)

---

### Q266) Palindromic Substrings (647)
- **Problem:** Count the number of palindromic substrings.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** DP table `dp[i][j]` is true if `s[i] == s[j]` and `dp[i+1][j-1]` is true. (Note: Expand around center is O(1) space, but DP is requested).
- **C++ Code:**
```cpp
class Solution {
public:
    // Approach 1: Tabulation DP
    int countSubstringsDP(string s) {
        int n = s.length(), count = 0;
        vector<vector<bool>> dp(n, vector<bool>(n, false));
        for (int len = 1; len <= n; ++len) {
            for (int i = 0; i <= n - len; ++i) {
                int j = i + len - 1;
                if (s[i] == s[j] && (len <= 2 || dp[i + 1][j - 1])) {
                    dp[i][j] = true;
                    count++;
                }
            }
        }
        return count;
    }

    // Approach 2: Expand Around Center (Optimal Space)
    int countSubstrings(string s) {
        int count = 0;
        for (int i = 0; i < s.length(); ++i) {
            count += expand(s, i, i);     // odd
            count += expand(s, i, i + 1); // even
        }
        return count;
    }
    int expand(string& s, int l, int r) {
        int res = 0;
        while (l >= 0 && r < s.length() && s[l] == s[r]) {
            res++; l--; r++;
        }
        return res;
    }
};
```
- **Complexity:** T: O(N^2) | S: O(N^2) for DP / O(1) for Expand

---

### Q267) Longest Palindromic Subsequence (516)
- **Problem:** Find the length of the longest palindromic subsequence.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** If `s[i] == s[j]`, `2 + dp[i+1][j-1]`. Else `max(dp[i+1][j], dp[i][j-1])`. (Alternatively: LCS of string and its reverse).
- **C++ Code:**
```cpp
class Solution {
public:
    // Approach 1: Memoization
    int dfs(string& s, int i, int j, vector<vector<int>>& dp) {
        if (i > j) return 0;
        if (i == j) return 1;
        if (dp[i][j] != -1) return dp[i][j];
        if (s[i] == s[j]) return dp[i][j] = 2 + dfs(s, i+1, j-1, dp);
        return dp[i][j] = max(dfs(s, i+1, j, dp), dfs(s, i, j-1, dp));
    }

    // Approach 2: Tabulation
    int longestPalindromeSubseq(string s) {
        int n = s.length();
        vector<vector<int>> dp(n, vector<int>(n, 0));
        for (int i = n - 1; i >= 0; --i) {
            dp[i][i] = 1;
            for (int j = i + 1; j < n; ++j) {
                if (s[i] == s[j]) dp[i][j] = dp[i + 1][j - 1] + 2;
                else dp[i][j] = max(dp[i + 1][j], dp[i][j - 1]);
            }
        }
        return dp[0][n - 1];
    }
};
```
- **Complexity:** T: O(N^2) | S: O(N^2)

---

### Q268) Maximum Length of Repeated Subarray (718)
- **Problem:** Longest common substring (contiguous) between two arrays.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** If `A[i] == B[j]`, `dp[i][j] = 1 + dp[i-1][j-1]`, else `0`. Keep track of max.
- **C++ Code:**
```cpp
class Solution {
public:
    // Approach 1: Memoization
    int dfs(vector<int>& nums1, vector<int>& nums2, int i, int j, vector<vector<int>>& dp, int& maxLen) {
        if (i == 0 || j == 0) return 0;
        if (dp[i][j] != -1) return dp[i][j];
        int val = 0;
        if (nums1[i-1] == nums2[j-1]) val = 1 + dfs(nums1, nums2, i-1, j-1, dp, maxLen);
        dfs(nums1, nums2, i-1, j, dp, maxLen); // explore
        dfs(nums1, nums2, i, j-1, dp, maxLen); // explore
        maxLen = max(maxLen, val);
        return dp[i][j] = val;
    }

    // Approach 2: Tabulation (Space Optimized to O(N))
    int findLength(vector<int>& nums1, vector<int>& nums2) {
        int m = nums1.size(), n = nums2.size(), res = 0;
        vector<int> dp(n + 1, 0);
        for (int i = 1; i <= m; ++i) {
            for (int j = n; j >= 1; --j) { // backwards to use 1D array
                if (nums1[i - 1] == nums2[j - 1]) {
                    dp[j] = 1 + dp[j - 1];
                    res = max(res, dp[j]);
                } else dp[j] = 0;
            }
        }
        return res;
    }
};
```
- **Complexity:** T: O(M * N) | S: O(N)

---

### Q269) Best Time to Buy and Sell Stock with Cooldown (309)
- **Problem:** Max profit given unlimited transactions but 1-day cooldown after selling.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** State machine: `Hold` (currently own stock), `Sold` (just sold, now in cooldown), `Rest` (no stock, can buy).
- **C++ Code:**
```cpp
class Solution {
public:
    // Approach 1: Memoization
    int dfs(int i, int buying, vector<int>& prices, vector<vector<int>>& dp) {
        if (i >= prices.size()) return 0;
        if (dp[i][buying] != -1) return dp[i][buying];
        
        if (buying) {
            int buy = dfs(i + 1, 0, prices, dp) - prices[i];
            int cooldown = dfs(i + 1, 1, prices, dp);
            return dp[i][buying] = max(buy, cooldown);
        } else {
            int sell = dfs(i + 2, 1, prices, dp) + prices[i]; // i+2 for cooldown
            int cooldown = dfs(i + 1, 0, prices, dp);
            return dp[i][buying] = max(sell, cooldown);
        }
    }

    // Approach 2: Tabulation (State Machine variables)
    int maxProfit(vector<int>& prices) {
        int hold = -prices[0], sold = 0, rest = 0;
        for (int i = 1; i < prices.size(); ++i) {
            int prevHold = hold;
            hold = max(hold, rest - prices[i]);
            rest = max(rest, sold);
            sold = prevHold + prices[i];
        }
        return max(rest, sold);
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q270) Best Time to Buy and Sell Stock III (123)
- **Problem:** Max profit with at most 2 transactions.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** 3D DP or State Machine variables mapping to Buy1, Sell1, Buy2, Sell2.
- **C++ Code:**
```cpp
class Solution {
public:
    // Approach 1: Memoization
    int dfs(vector<int>& p, int i, int tx, int buying, vector<vector<vector<int>>>& dp) {
        if (i == p.size() || tx == 0) return 0;
        if (dp[i][tx][buying] != -1) return dp[i][tx][buying];
        if (buying) {
            return dp[i][tx][buying] = max(dfs(p, i+1, tx, 0, dp) - p[i], dfs(p, i+1, tx, 1, dp));
        } else {
            return dp[i][tx][buying] = max(dfs(p, i+1, tx-1, 1, dp) + p[i], dfs(p, i+1, tx, 0, dp));
        }
    }

    // Approach 2: Tabulation (Space Optimized variables)
    int maxProfit(vector<int>& prices) {
        int buy1 = INT_MIN, sell1 = 0;
        int buy2 = INT_MIN, sell2 = 0;
        for (int p : prices) {
            buy1 = max(buy1, -p);
            sell1 = max(sell1, buy1 + p);
            buy2 = max(buy2, sell1 - p);
            sell2 = max(sell2, buy2 + p);
        }
        return sell2;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q271) Best Time to Buy and Sell Stock IV (188)
- **Problem:** Max profit with at most `k` transactions.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Extend Stock III using arrays of size `k+1`. `buy[j] = max(buy[j], sell[j-1] - p)`, `sell[j] = max(sell[j], buy[j] + p)`.
- **C++ Code:**
```cpp
class Solution {
public:
    // Approach 1: Memoization same as III but tx = k
    
    // Approach 2: Tabulation
    int maxProfit(int k, vector<int>& prices) {
        if (k == 0 || prices.empty()) return 0;
        vector<int> buy(k + 1, INT_MIN);
        vector<int> sell(k + 1, 0);
        
        for (int p : prices) {
            for (int i = 1; i <= k; ++i) {
                buy[i] = max(buy[i], sell[i - 1] - p);
                sell[i] = max(sell[i], buy[i] + p);
            }
        }
        return sell[k];
    }
};
```
- **Complexity:** T: O(N * K) | S: O(K)

---

### Q272) Burst Balloons (312)
- **Problem:** Burst balloons to maximize coins. Bursting `i` gives `nums[i-1] * nums[i] * nums[i+1]`.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** DP on intervals. Reverse thinking: pick balloon `i` to burst LAST in the interval `[left, right]`. `dp[l][r] = max(dp[l][i-1] + val + dp[i+1][r])`.
- **C++ Code:**
```cpp
class Solution {
public:
    // Approach 1: Memoization
    int dfs(vector<int>& nums, int l, int r, vector<vector<int>>& dp) {
        if (l > r) return 0;
        if (dp[l][r] != -1) return dp[l][r];
        int maxCoins = 0;
        for (int i = l; i <= r; ++i) {
            int coins = nums[l-1] * nums[i] * nums[r+1] 
                      + dfs(nums, l, i-1, dp) + dfs(nums, i+1, r, dp);
            maxCoins = max(maxCoins, coins);
        }
        return dp[l][r] = maxCoins;
    }

    // Approach 2: Tabulation
    int maxCoins(vector<int>& nums) {
        vector<int> arr = {1};
        for (int x : nums) arr.push_back(x);
        arr.push_back(1);
        int n = arr.size();
        
        vector<vector<int>> dp(n, vector<int>(n, 0));
        for (int len = 1; len <= n - 2; ++len) {
            for (int l = 1; l <= n - 2 - len + 1; ++l) {
                int r = l + len - 1;
                for (int i = l; i <= r; ++i) {
                    dp[l][r] = max(dp[l][r], dp[l][i-1] + arr[l-1]*arr[i]*arr[r+1] + dp[i+1][r]);
                }
            }
        }
        return dp[1][n - 2];
    }
};
```
- **Complexity:** T: O(N^3) | S: O(N^2)

---

### Q273) Frog Jump (403)
- **Problem:** Can frog cross river? Jump can be `k-1, k, k+1`.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** DP/Hash Map mapping `stone_position -> set_of_jumps_that_reached_it`. Iterate and propagate future jumps.
- **C++ Code:**
```cpp
class Solution {
public:
    // Tabulation using Hash Map for sparse positions
    bool canCross(vector<int>& stones) {
        unordered_map<int, unordered_set<int>> dp;
        dp[stones[0]].insert(0); // position -> jumps reached by
        
        for (int i = 0; i < stones.size(); ++i) {
            int pos = stones[i];
            for (int jump : dp[pos]) {
                for (int nextJump = jump - 1; nextJump <= jump + 1; ++nextJump) {
                    if (nextJump > 0) {
                        dp[pos + nextJump].insert(nextJump);
                    }
                }
            }
        }
        return !dp[stones.back()].empty();
    }
};
```
- **Complexity:** T: O(N^2) | S: O(N^2)

---

### Q274) Triangle (120)
- **Problem:** Min path sum from top to bottom of triangle.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Bottom-up DP. `dp[i][j] = triangle[i][j] + min(dp[i+1][j], dp[i+1][j+1])`. Space optimizable to O(N).
- **C++ Code:**
```cpp
class Solution {
public:
    // Approach 1: Memoization
    int dfs(vector<vector<int>>& tri, int r, int c, vector<vector<int>>& dp) {
        if (r == tri.size()) return 0;
        if (dp[r][c] != -1) return dp[r][c];
        return dp[r][c] = tri[r][c] + min(dfs(tri, r+1, c, dp), dfs(tri, r+1, c+1, dp));
    }

    // Approach 2: Tabulation (Space Optimized)
    int minimumTotal(vector<vector<int>>& triangle) {
        int n = triangle.size();
        vector<int> dp = triangle.back(); // initialize with last row
        
        for (int i = n - 2; i >= 0; --i) {
            for (int j = 0; j <= i; ++j) {
                dp[j] = triangle[i][j] + min(dp[j], dp[j + 1]);
            }
        }
        return dp[0];
    }
};
```
- **Complexity:** T: O(N^2) | S: O(N)

---

### Q275) Integer Break (343)
- **Problem:** Max product of breaking integer `n` into `k` positive integers (k >= 2).
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Math: Break into 3s as much as possible. DP: `dp[i] = max(j * (i-j), j * dp[i-j])`.
- **C++ Code:**
```cpp
class Solution {
public:
    // Approach 1: Tabulation
    int integerBreakDP(int n) {
        vector<int> dp(n + 1, 0);
        dp[1] = 1;
        for (int i = 2; i <= n; ++i) {
            for (int j = 1; j < i; ++j) {
                dp[i] = max({dp[i], j * (i - j), j * dp[i - j]});
            }
        }
        return dp[n];
    }

    // Approach 2: Math (Optimal)
    int integerBreak(int n) {
        if (n == 2) return 1;
        if (n == 3) return 2;
        int res = 1;
        while (n > 4) {
            res *= 3;
            n -= 3;
        }
        return res * n;
    }
};
```
- **Complexity:** T: O(N^2) (DP) / O(N) (Math) | S: O(N) (DP) / O(1) (Math)

---

### Q276) Delete and Earn (740)
- **Problem:** Max points by deleting `num` and implicitly deleting `num-1` and `num+1`.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Map to House Robber. Sum values of each number. Then rob non-adjacent sums.
- **C++ Code:**
```cpp
class Solution {
public:
    int deleteAndEarn(vector<int>& nums) {
        int maxVal = *max_element(nums.begin(), nums.end());
        vector<int> sums(maxVal + 1, 0);
        for (int x : nums) sums[x] += x;
        
        // Tabulation (House Robber logic)
        int prev1 = 0, prev2 = 0;
        for (int i = 0; i <= maxVal; ++i) {
            int curr = max(prev1, prev2 + sums[i]);
            prev2 = prev1;
            prev1 = curr;
        }
        return prev1;
    }
};
```
- **Complexity:** T: O(N + MaxVal) | S: O(MaxVal)

---

### Q277) Paint House (256)
- **Problem:** Min cost to paint houses such that no two adjacent have the same color.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** `dp[i][c] = cost[i][c] + min(dp[i-1][other1], dp[i-1][other2])`.
- **C++ Code:**
```cpp
class Solution {
public:
    // Approach: Tabulation Space Optimized
    int minCost(vector<vector<int>>& costs) {
        if (costs.empty()) return 0;
        int r = costs[0][0], b = costs[0][1], g = costs[0][2];
        for (int i = 1; i < costs.size(); ++i) {
            int curr_r = costs[i][0] + min(b, g);
            int curr_b = costs[i][1] + min(r, g);
            int curr_g = costs[i][2] + min(r, b);
            r = curr_r; b = curr_b; g = curr_g;
        }
        return min({r, b, g});
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q278) Paint Fence (276)
- **Problem:** Paint `n` posts with `k` colors, at most 2 adjacent can be same.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** `same = diff * 1` (since prev diff colors, we just copy prev color). `diff = (same + diff) * (k - 1)`.
- **C++ Code:**
```cpp
class Solution {
public:
    int numWays(int n, int k) {
        if (n == 0) return 0;
        if (n == 1) return k;
        int same = k;
        int diff = k * (k - 1);
        for (int i = 3; i <= n; ++i) {
            int prevDiff = diff;
            diff = (same + diff) * (k - 1);
            same = prevDiff;
        }
        return same + diff;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q279) Count Square Submatrices with All Ones (1277)
- **Problem:** Return count of all square submatrices with all 1s.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Same DP as Maximal Square. `dp[i][j] = min({up, left, diag}) + 1`. The value `dp[i][j]` equals the number of squares bottom-righted at `(i,j)`. Sum them all.
- **C++ Code:**
```cpp
class Solution {
public:
    int countSquares(vector<vector<int>>& matrix) {
        int m = matrix.size(), n = matrix[0].size();
        int res = 0;
        // In-place Tabulation
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                if (matrix[i][j] == 1 && i > 0 && j > 0) {
                    matrix[i][j] = min({matrix[i-1][j], matrix[i][j-1], matrix[i-1][j-1]}) + 1;
                }
                res += matrix[i][j];
            }
        }
        return res;
    }
};
```
- **Complexity:** T: O(M * N) | S: O(1)

---

### Q280) Maximum Sum Circular Subarray (918)
- **Problem:** Max sum of a contiguous subarray in a circular array.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Result is `max(Kadane Max, Total Sum - Kadane Min)`. Edge case: if all negative, return Kadane Max.
- **C++ Code:**
```cpp
class Solution {
public:
    int maxSubarraySumCircular(vector<int>& nums) {
        int total = 0, maxSum = nums[0], curMax = 0, minSum = nums[0], curMin = 0;
        for (int x : nums) {
            curMax = max(curMax + x, x);
            maxSum = max(maxSum, curMax);
            
            curMin = min(curMin + x, x);
            minSum = min(minSum, curMin);
            
            total += x;
        }
        return maxSum > 0 ? max(maxSum, total - minSum) : maxSum;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q281) Minimum Falling Path Sum (931)
- **Problem:** Min sum falling from top to bottom picking adjacent cols.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Bottom-up DP (or top-down). `dp[i][j] = matrix[i][j] + min(topL, top, topR)`.
- **C++ Code:**
```cpp
class Solution {
public:
    // Tabulation In-Place
    int minFallingPathSum(vector<vector<int>>& matrix) {
        int n = matrix.size();
        for (int i = 1; i < n; ++i) {
            for (int j = 0; j < n; ++j) {
                int L = j > 0 ? matrix[i-1][j-1] : INT_MAX;
                int U = matrix[i-1][j];
                int R = j < n - 1 ? matrix[i-1][j+1] : INT_MAX;
                matrix[i][j] += min({L, U, R});
            }
        }
        int minSum = INT_MAX;
        for (int j = 0; j < n; ++j) minSum = min(minSum, matrix[n-1][j]);
        return minSum;
    }
};
```
- **Complexity:** T: O(N^2) | S: O(1)

---

### Q282) Maximum Product Subarray (152)
- **Problem:** Max product of a contiguous subarray.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** DP tracking both max and min (because negative * negative = positive). `temp_max = max(num, max_so_far*num, min_so_far*num)`.
- **C++ Code:**
```cpp
class Solution {
public:
    int maxProduct(vector<int>& nums) {
        int res = nums[0];
        int curMax = nums[0], curMin = nums[0];
        
        for (int i = 1; i < nums.size(); ++i) {
            int temp = curMax * nums[i];
            curMax = max({nums[i], temp, curMin * nums[i]});
            curMin = min({nums[i], temp, curMin * nums[i]});
            res = max(res, curMax);
        }
        return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q283) Knapsack 0/1 (General)
- **Problem:** Maximize value given weights and fixed capacity W. Each item picked at most once.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** `dp[w] = max(dp[w], val[i] + dp[w - weight[i]])`. Traverse backwards to prevent reusing items.
- **C++ Code:**
```cpp
class Solution {
public:
    // Tabulation Space Optimized
    int knapSack(int W, int wt[], int val[], int n) { 
        vector<int> dp(W + 1, 0);
        for (int i = 0; i < n; ++i) {
            for (int w = W; w >= wt[i]; --w) { // Backward traversal
                dp[w] = max(dp[w], dp[w - wt[i]] + val[i]);
            }
        }
        return dp[W];
    }
};
```
- **Complexity:** T: O(N * W) | S: O(W)

---

### Q284) Unbounded Knapsack (General)
- **Problem:** Maximize value, items can be picked multiple times.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** `dp[w] = max(dp[w], val[i] + dp[w - weight[i]])`. Traverse forward to allow reuse.
- **C++ Code:**
```cpp
class Solution {
public:
    // Tabulation Space Optimized
    int knapSack(int W, int wt[], int val[], int n) {
        vector<int> dp(W + 1, 0);
        for (int i = 0; i < n; ++i) {
            for (int w = wt[i]; w <= W; ++w) { // Forward traversal
                dp[w] = max(dp[w], dp[w - wt[i]] + val[i]);
            }
        }
        return dp[W];
    }
};
```
- **Complexity:** T: O(N * W) | S: O(W)

---

### Q285) Rod Cutting (General)
- **Problem:** Cut rod of length n to maximize profit.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Exact same as Unbounded Knapsack. `dp[i] = max(dp[i], price[j] + dp[i - length[j]])`.
- **C++ Code:**
```cpp
class Solution {
public:
    int cutRod(int price[], int n) {
        vector<int> dp(n + 1, 0);
        for (int i = 1; i <= n; ++i) {
            for (int j = 0; j < i; ++j) {
                dp[i] = max(dp[i], price[j] + dp[i - (j + 1)]);
            }
        }
        return dp[n];
    }
};
```
- **Complexity:** T: O(N^2) | S: O(N)

---

### Q286) Egg Dropping Problem (General)
- **Problem:** Min floors to test to find critical floor using `e` eggs and `f` floors.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** DP + Binary Search. `dp[e][f] = 1 + min(max(break, not_break))`. Binary Search optimizes finding intersection of ascending `break` line and descending `not_break` line.
- **C++ Code:**
```cpp
class Solution {
    int memo[101][10001];
public:
    int superEggDrop(int k, int n) {
        memset(memo, -1, sizeof(memo));
        return dfs(k, n);
    }
    int dfs(int k, int n) {
        if (n == 0 || n == 1) return n;
        if (k == 1) return n;
        if (memo[k][n] != -1) return memo[k][n];
        
        int minAttempts = INT_MAX, l = 1, r = n;
        while (l <= r) {
            int mid = l + (r - l) / 2;
            int broke = dfs(k - 1, mid - 1);
            int safe = dfs(k, n - mid);
            if (broke > safe) {
                r = mid - 1;
                minAttempts = min(minAttempts, broke + 1);
            } else {
                l = mid + 1;
                minAttempts = min(minAttempts, safe + 1);
            }
        }
        return memo[k][n] = minAttempts;
    }
};
```
- **Complexity:** T: O(K * N log N) | S: O(K * N)

---

## 🗂️ BACKTRACKING / RECURSION

### Q287) Permutations (46)
- **Problem:** Return all possible permutations of an array of distinct integers.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Swap current index `i` with elements from `i` to `n-1`. Recurse. Swap back (backtrack).
- **C++ Code:**
```cpp
class Solution {
    void backtrack(vector<int>& nums, int start, vector<vector<int>>& res) {
        if (start == nums.size()) {
            res.push_back(nums);
            return;
        }
        for (int i = start; i < nums.size(); ++i) {
            swap(nums[start], nums[i]);
            backtrack(nums, start + 1, res);
            swap(nums[start], nums[i]);
        }
    }
public:
    vector<vector<int>> permute(vector<int>& nums) {
        vector<vector<int>> res;
        backtrack(nums, 0, res);
        return res;
    }
};
```
- **Complexity:** T: O(N * N!) | S: O(N)

---

### Q288) Permutations II (47)
- **Problem:** Return all unique permutations (contains duplicates).
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Sort first. Use a boolean `used` array. Skip if `i > 0 && nums[i] == nums[i-1] && !used[i-1]`.
- **C++ Code:**
```cpp
class Solution {
    void backtrack(vector<int>& nums, vector<bool>& used, vector<int>& path, vector<vector<int>>& res) {
        if (path.size() == nums.size()) {
            res.push_back(path);
            return;
        }
        for (int i = 0; i < nums.size(); ++i) {
            if (used[i]) continue;
            if (i > 0 && nums[i] == nums[i - 1] && !used[i - 1]) continue; // Skip duplicates
            
            used[i] = true;
            path.push_back(nums[i]);
            backtrack(nums, used, path, res);
            path.pop_back();
            used[i] = false;
        }
    }
public:
    vector<vector<int>> permuteUnique(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> res;
        vector<int> path;
        vector<bool> used(nums.size(), false);
        backtrack(nums, used, path, res);
        return res;
    }
};
```
- **Complexity:** T: O(N * N!) | S: O(N)

---

### Q289) Subsets (78)
- **Problem:** Return all possible subsets (power set).
- **Difficulty:** Medium
- **Concept / Optimal Algo:** For each element, choose to include it in the path or not. Backtrack.
- **C++ Code:**
```cpp
class Solution {
    void backtrack(int idx, vector<int>& nums, vector<int>& path, vector<vector<int>>& res) {
        res.push_back(path); // Add current subset
        for (int i = idx; i < nums.size(); ++i) {
            path.push_back(nums[i]);
            backtrack(i + 1, nums, path, res);
            path.pop_back();
        }
    }
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<vector<int>> res;
        vector<int> path;
        backtrack(0, nums, path, res);
        return res;
    }
};
```
- **Complexity:** T: O(N * 2^N) | S: O(N)

---

### Q290) Subsets II (90)
- **Problem:** Return all unique subsets (contains duplicates).
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Sort first. Skip duplicate choices at the same recursion level `if (i > idx && nums[i] == nums[i-1])`.
- **C++ Code:**
```cpp
class Solution {
    void backtrack(int idx, vector<int>& nums, vector<int>& path, vector<vector<int>>& res) {
        res.push_back(path);
        for (int i = idx; i < nums.size(); ++i) {
            if (i > idx && nums[i] == nums[i - 1]) continue; // Skip duplicates
            path.push_back(nums[i]);
            backtrack(i + 1, nums, path, res);
            path.pop_back();
        }
    }
public:
    vector<vector<int>> subsetsWithDup(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> res;
        vector<int> path;
        backtrack(0, nums, path, res);
        return res;
    }
};
```
- **Complexity:** T: O(N * 2^N) | S: O(N)

---

### Q291) Combination Sum (39)
- **Problem:** Find unique combinations summing to `target` (reuse allowed).
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Recurse. Since reuse is allowed, pass `i` instead of `i+1` into the recursive call. Pop to backtrack.
- **C++ Code:**
```cpp
class Solution {
    void backtrack(int idx, int target, vector<int>& cand, vector<int>& path, vector<vector<int>>& res) {
        if (target == 0) { res.push_back(path); return; }
        if (target < 0) return;
        
        for (int i = idx; i < cand.size(); ++i) {
            path.push_back(cand[i]);
            backtrack(i, target - cand[i], cand, path, res); // Pass 'i', not 'i+1'
            path.pop_back();
        }
    }
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        vector<vector<int>> res;
        vector<int> path;
        backtrack(0, target, candidates, path, res);
        return res;
    }
};
```
- **Complexity:** T: O(2^(Target/Min)) | S: O(Target/Min)

---

### Q292) Combination Sum II (40)
- **Problem:** Find combinations summing to `target` (each number used once, array has duplicates).
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Sort first. Pass `i+1`. Skip duplicates via `if (i > idx && cand[i] == cand[i-1])`.
- **C++ Code:**
```cpp
class Solution {
    void backtrack(int idx, int target, vector<int>& cand, vector<int>& path, vector<vector<int>>& res) {
        if (target == 0) { res.push_back(path); return; }
        if (target < 0) return;
        
        for (int i = idx; i < cand.size(); ++i) {
            if (i > idx && cand[i] == cand[i - 1]) continue; // Skip duplicates
            path.push_back(cand[i]);
            backtrack(i + 1, target - cand[i], cand, path, res); // Move to 'i+1'
            path.pop_back();
        }
    }
public:
    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
        sort(candidates.begin(), candidates.end());
        vector<vector<int>> res;
        vector<int> path;
        backtrack(0, target, candidates, path, res);
        return res;
    }
};
```
- **Complexity:** T: O(2^N) | S: O(N)

---

### Q293) Generate Parentheses (22)
- **Problem:** Generate all combinations of well-formed parentheses.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Keep count of `open` and `close` brackets. Add '(' if `open < n`. Add ')' if `close < open`.
- **C++ Code:**
```cpp
class Solution {
    void backtrack(int open, int close, int n, string path, vector<string>& res) {
        if (open == n && close == n) {
            res.push_back(path);
            return;
        }
        if (open < n) backtrack(open + 1, close, n, path + "(", res);
        if (close < open) backtrack(open, close + 1, n, path + ")", res);
    }
public:
    vector<string> generateParenthesis(int n) {
        vector<string> res;
        backtrack(0, 0, n, "", res);
        return res;
    }
};
```
- **Complexity:** T: O(4^N / sqrt(N)) | S: O(N)

---

### Q294) Letter Combinations of Phone Number (17)
- **Problem:** All possible letter combinations a phone number string could represent.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Map digits to letters. Recurse over each digit, loop over its mapped letters, and append to path.
- **C++ Code:**
```cpp
class Solution {
    vector<string> pad = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};
    void backtrack(int idx, string& digits, string path, vector<string>& res) {
        if (idx == digits.length()) {
            res.push_back(path);
            return;
        }
        string letters = pad[digits[idx] - '0'];
        for (char c : letters) {
            backtrack(idx + 1, digits, path + c, res);
        }
    }
public:
    vector<string> letterCombinations(string digits) {
        if (digits.empty()) return {};
        vector<string> res;
        backtrack(0, digits, "", res);
        return res;
    }
};
```
- **Complexity:** T: O(4^N) | S: O(N)

---

### Q295) Palindrome Partitioning (131)
- **Problem:** Partition string so every substring is a palindrome. Return all partitions.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Loop through string, if prefix is palindrome, append to path and recurse on the suffix. 
- **C++ Code:**
```cpp
class Solution {
    bool isPal(string& s, int l, int r) {
        while (l < r) if (s[l++] != s[r--]) return false;
        return true;
    }
    void backtrack(int start, string& s, vector<string>& path, vector<vector<string>>& res) {
        if (start == s.length()) {
            res.push_back(path);
            return;
        }
        for (int i = start; i < s.length(); ++i) {
            if (isPal(s, start, i)) {
                path.push_back(s.substr(start, i - start + 1));
                backtrack(i + 1, s, path, res);
                path.pop_back();
            }
        }
    }
public:
    vector<vector<string>> partition(string s) {
        vector<vector<string>> res;
        vector<string> path;
        backtrack(0, s, path, res);
        return res;
    }
};
```
- **Complexity:** T: O(N * 2^N) | S: O(N)

---

### Q296) Restore IP Addresses (93)
- **Problem:** Return all valid IP addresses from string.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Backtrack dividing into 4 segments. Segment valid if `len <= 3`, `val <= 255`, and no leading zero unless it is `"0"`.
- **C++ Code:**
```cpp
class Solution {
    void backtrack(int idx, int dots, string path, string& s, vector<string>& res) {
        if (dots == 4 && idx == s.length()) {
            res.push_back(path.substr(0, path.length() - 1)); // remove trailing dot
            return;
        }
        if (dots > 4) return;
        
        for (int i = 1; i <= 3 && idx + i <= s.length(); ++i) {
            string part = s.substr(idx, i);
            if (part.length() > 1 && part[0] == '0') continue; // leading zero
            if (stoi(part) > 255) continue; // Out of range
            backtrack(idx + i, dots + 1, path + part + ".", s, res);
        }
    }
public:
    vector<string> restoreIpAddresses(string s) {
        vector<string> res;
        backtrack(0, 0, "", s, res);
        return res;
    }
};
```
- **Complexity:** T: O(3^4) = O(1) max ops | S: O(1) max depth

---

### Q297) Word Search (79)
- **Problem:** Check if word exists in grid (can move in 4 directions, cannot reuse cells).
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Standard DFS + Backtracking. Mark `grid[r][c] = '#'` to visit, recurse, then revert back to original char.
- **C++ Code:**
```cpp
class Solution {
    bool dfs(vector<vector<char>>& b, string& w, int r, int c, int idx) {
        if (idx == w.length()) return true;
        if (r < 0 || r >= b.size() || c < 0 || c >= b[0].size() || b[r][c] != w[idx]) return false;
        
        char temp = b[r][c];
        b[r][c] = '#'; // Mark visited
        bool found = dfs(b, w, r+1, c, idx+1) || dfs(b, w, r-1, c, idx+1) || 
                     dfs(b, w, r, c+1, idx+1) || dfs(b, w, r, c-1, idx+1);
        b[r][c] = temp; // Backtrack
        return found;
    }
public:
    bool exist(vector<vector<char>>& board, string word) {
        for (int i = 0; i < board.size(); ++i) {
            for (int j = 0; j < board[0].size(); ++j) {
                if (dfs(board, word, i, j, 0)) return true;
            }
        }
        return false;
    }
};
```
- **Complexity:** T: O(M * N * 4^L) | S: O(L)

---

### Q298) Word Search II (212)
- **Problem:** Find all words from a dictionary present in the grid```markdown
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Build a Trie from the list of words. Traverse the grid with DFS, checking against the Trie. If a node marks the end of a word, add to results and mark it as found (to avoid duplicates).
- **C++ Code:**
```cpp
class Solution {
    struct TrieNode {
        unordered_map<char, TrieNode*> children;
        string word = "";
    };
    
    TrieNode* root;
    vector<string> res;
    
    void insert(string& word) {
        TrieNode* curr = root;
        for (char c : word) {
            if (!curr->children.count(c)) curr->children[c] = new TrieNode();
            curr = curr->children[c];
        }
        curr->word = word;
    }
    
    void dfs(vector<vector<char>>& board, int r, int c, TrieNode* curr) {
        if (r < 0 || r >= board.size() || c < 0 || c >= board[0].size()) return;
        char ch = board[r][c];
        if (ch == '#' || !curr->children.count(ch)) return;
        
        curr = curr->children[ch];
        if (!curr->word.empty()) {
            res.push_back(curr->word);
            curr->word = ""; // Prevent duplicate adding
        }
        
        board[r][c] = '#'; // Mark visited
        dfs(board, r + 1, c, curr);
        dfs(board, r - 1, c, curr);
        dfs(board, r, c + 1, curr);
        dfs(board, r, c - 1, curr);
        board[r][c] = ch; // Backtrack
    }
public:
    vector<string> findWords(vector<vector<char>>& board, vector<string>& words) {
        root = new TrieNode();
        for (string& w : words) insert(w);
        
        for (int i = 0; i < board.size(); ++i) {
            for (int j = 0; j < board[0].size(); ++j) {
                dfs(board, i, j, root);
            }
        }
        return res;
    }
};
```
- **Complexity:** T: O(M * N * 3^L) | S: O(Sum of words length in Trie)

---

### Q299) N-Queens (51)
- **Problem:** Place `n` queens on an `n x n` board such that no two attack each other.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Backtracking. Place row by row. Use sets (or arrays) to track columns, positive diagonals `(r + c)`, and negative diagonals `(r - c)` under attack.
- **C++ Code:**
```cpp
class Solution {
    vector<vector<string>> res;
    unordered_set<int> cols, posDiag, negDiag;
    
    void backtrack(int r, int n, vector<string>& board) {
        if (r == n) {
            res.push_back(board);
            return;
        }
        for (int c = 0; c < n; ++c) {
            if (cols.count(c) || posDiag.count(r + c) || negDiag.count(r - c)) continue;
            
            // Place Queen
            cols.insert(c); posDiag.insert(r + c); negDiag.insert(r - c);
            board[r][c] = 'Q';
            
            backtrack(r + 1, n, board);
            
            // Backtrack
            cols.erase(c); posDiag.erase(r + c); negDiag.erase(r - c);
            board[r][c] = '.';
        }
    }
public:
    vector<vector<string>> solveNQueens(int n) {
        vector<string> board(n, string(n, '.'));
        backtrack(0, n, board);
        return res;
    }
};
```
- **Complexity:** T: O(N!) | S: O(N)

---

### Q300) Sudoku Solver (37)
- **Problem:** Fill a 9x9 grid so that every row, column, and 3x3 sub-box contains digits 1-9 without repetition.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Backtracking. Find an empty cell, try placing 1-9. Check validity before placing. Recursively call solver. If stuck, backtrack to `'.'`.
- **C++ Code:**
```cpp
class Solution {
    bool isValid(vector<vector<char>>& board, int r, int c, char k) {
        for (int i = 0; i < 9; ++i) {
            if (board[r][i] == k) return false; // Check row
            if (board[i][c] == k) return false; // Check col
            // Check 3x3 box
            if (board[3 * (r / 3) + i / 3][3 * (c / 3) + i % 3] == k) return false;
        }
        return true;
    }
    
    bool solve(vector<vector<char>>& board) {
        for (int r = 0; r < 9; ++r) {
            for (int c = 0; c < 9; ++c) {
                if (board[r][c] == '.') {
                    for (char k = '1'; k <= '9'; ++k) {
                        if (isValid(board, r, c, k)) {
                            board[r][c] = k;
                            if (solve(board)) return true; // Found solution
                            board[r][c] = '.'; // Backtrack
                        }
                    }
                    return false; // No valid number found for this cell
                }
            }
        }
        return true; // All cells filled
    }
public:
    void solveSudoku(vector<vector<char>>& board) {
        solve(board);
    }
};
```
- **Complexity:** T: O(9^(Empty Cells)) | S: O(81) = O(1)

---
```