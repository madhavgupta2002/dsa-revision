## 🗂️ Arrays and Hashing

### Q1) Next Permutation
- **Problem:** Find the lexicographically next greater permutation of a sequence of numbers.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** 1) Find the "pivot" (first element from right where `arr[i] < arr[i+1]`). 2) If no pivot, reverse the whole array. 3) If pivot exists, find the smallest element to the right of pivot that is larger than `arr[pivot]`. 4) Swap them. 5) Reverse everything to the right of the pivot index.
- **C++ Code:**
```cpp
class Solution {
public:
    void nextPermutation(vector<int>& nums) {
        int n = nums.size(), i, j;
        for (i = n - 2; i >= 0; i--) {
            if (nums[i] < nums[i + 1]) break;
        }
        if (i < 0) {
            reverse(nums.begin(), nums.end());
        } else {
            for (j = n - 1; j > i; j--) {
                if (nums[j] > nums[i]) break;
            }
            swap(nums[i], nums[j]);
            reverse(nums.begin() + i + 1, nums.end());
        }
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q2) 3 Sum
- **Problem:** Find all unique triplets in the array which gives the sum of zero.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Sort the array. Fix one pointer `i` and use two pointers (`low` and `high`) for the remaining part. To avoid duplicates, skip identical elements for `i`, `low`, and `high`.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        sort(nums.begin(), nums.end());
        vector<vector<int>> res;
        for (int i = 0; i < nums.size(); i++) {
            if (i > 0 && nums[i] == nums[i-1]) continue;
            int low = i + 1, high = nums.size() - 1;
            while (low < high) {
                int sum = nums[i] + nums[low] + nums[high];
                if (sum == 0) {
                    res.push_back({nums[i], nums[low], nums[high]});
                    while (low < high && nums[low] == nums[low+1]) low++;
                    while (low < high && nums[high] == nums[high-1]) high--;
                    low++; high--;
                } else if (sum < 0) low++;
                else high--;
            }
        }
        return res;
    }
};
```
- **Complexity:** T: O(N²) | S: O(1) (excluding output)

---

### Q3) Kadane's Algorithm
- **Problem:** Find the contiguous subarray which has the largest sum.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Maintain a `currentSum`. Iterate through the array, adding elements to `currentSum`. If `currentSum` becomes negative, reset it to 0. Keep track of the maximum sum encountered.
- **C++ Code:**
```cpp
class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        int maxi = INT_MIN, sum = 0;
        for (int x : nums) {
            sum += x;
            maxi = max(maxi, sum);
            if (sum < 0) sum = 0;
        }
        return maxi;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q4) Majority Element-II
- **Problem:** Find all elements that appear more than ⌊ n/3 ⌋ times.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Extended Boyer-Moore Voting Algorithm. Use two candidates and two counters. In a second pass, verify if the candidates actually appear more than n/3 times.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> majorityElement(vector<int>& nums) {
        int cnt1 = 0, cnt2 = 0, el1 = INT_MIN, el2 = INT_MIN;
        for (int x : nums) {
            if (cnt1 == 0 && x != el2) { cnt1 = 1; el1 = x; }
            else if (cnt2 == 0 && x != el1) { cnt2 = 1; el2 = x; }
            else if (x == el1) cnt1++;
            else if (x == el2) cnt2++;
            else { cnt1--; cnt2--; }
        }
        vector<int> res;
        cnt1 = 0; cnt2 = 0;
        for (int x : nums) {
            if (x == el1) cnt1++;
            if (x == el2) cnt2++;
        }
        if (cnt1 > nums.size() / 3) res.push_back(el1);
        if (cnt2 > nums.size() / 3) res.push_back(el2);
        return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q5) Count subarrays with given XOR K
- **Problem:** Find the total number of subarrays having XOR sum equal to K.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Use a hash map to store the prefix XOR frequencies. If current prefix XOR is `XR`, we check if `XR ^ K` exists in the map. The property `XR ^ target = K` implies `target = XR ^ K`.
- **C++ Code:**
```cpp
int solve(vector<int> &A, int K) {
    map<int, int> mp;
    int xr = 0, count = 0;
    mp[0] = 1;
    for (int x : A) {
        xr ^= x;
        int target = xr ^ K;
        count += mp[target];
        mp[xr]++;
    }
    return count;
}
```
- **Complexity:** T: O(N log N) or O(N) | S: O(N)

---

### Q6) Find the Repeating and Missing Number
- **Problem:** Given an array of size N containing elements from 1 to N, one number is repeated and one is missing.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Use Math (Sum and Sum of Squares). 
  `Sum(1..N) - Sum(Arr) = M - R`
  `SumSq(1..N) - SumSq(Arr) = M² - R²`.
  Solve the two linear equations.
- **C++ Code:**
```cpp
vector<int> findMissingRepeatingNumbers(vector<int> a) {
    long long n = a.size();
    long long SN = (n * (n + 1)) / 2;
    long long S2N = (n * (n + 1) * (2 * n + 1)) / 6;
    long long S = 0, S2 = 0;
    for (int i = 0; i < n; i++) {
        S += a[i];
        S2 += (long long)a[i] * (long long)a[i];
    }
    long long val1 = S - SN; // R - M
    long long val2 = S2 - S2N; // R^2 - M^2
    val2 = val2 / val1; // R + M
    long long x = (val1 + val2) / 2; // R
    long long y = x - val1; // M
    return {(int)x, (int)y};
}
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q7) Count Inversions
- **Problem:** Count how many pairs `(i, j)` exist such that `i < j` and `arr[i] > arr[j]`.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Enhanced Merge Sort. During the merge step, if `left[i] > right[j]`, then all elements from `i` to `mid` in the left array are greater than `right[j]`. Add `(mid - i + 1)` to the counter.
- **C++ Code:**
```cpp
long long merge(vector<int> &arr, int low, int mid, int high) {
    vector<int> temp;
    int left = low, right = mid + 1;
    long long cnt = 0;
    while (left <= mid && right <= high) {
        if (arr[left] <= arr[right]) {
            temp.push_back(arr[left++]);
        } else {
            cnt += (mid - left + 1);
            temp.push_back(arr[right++]);
        }
    }
    while (left <= mid) temp.push_back(arr[left++]);
    while (right <= high) temp.push_back(arr[right++]);
    for (int i = low; i <= high; i++) arr[i] = temp[i - low];
    return cnt;
}

long long mergeSort(vector<int> &arr, int low, int high) {
    long long cnt = 0;
    if (low >= high) return cnt;
    int mid = (low + high) / 2;
    cnt += mergeSort(arr, low, mid);
    cnt += mergeSort(arr, mid + 1, high);
    cnt += merge(arr, low, mid, high);
    return cnt;
}
```
- **Complexity:** T: O(N log N) | S: O(N)

---

### Q8) Maximum Product Subarray
- **Problem:** Find the contiguous subarray within an array that has the largest product.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Prefix and Suffix products. The maximum product will either be a prefix product or a suffix product (handling zeros by resetting product to 1).
- **C++ Code:**
```cpp
class Solution {
public:
    int maxProduct(vector<int>& nums) {
        double pre = 1, suff = 1;
        double ans = INT_MIN;
        int n = nums.size();
        for (int i = 0; i < n; i++) {
            if (pre == 0) pre = 1;
            if (suff == 0) suff = 1;
            pre *= nums[i];
            suff *= nums[n - i - 1];
            ans = max(ans, max(pre, suff));
        }
        return (int)ans;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

## 🗂️ Binary Search

### Q9) Search in Rotated Sorted Array II
- **Problem:** Search for a target in a rotated sorted array that may contain duplicates.
- **Difficulty:** Medium (Listed as Easy in prompt, but standard is Medium)
- **Concept / Optimal Algo:** Standard binary search with a tweak: if `arr[low] == arr[mid] == arr[high]`, we cannot determine which half is sorted, so we increment `low` and decrement `high`.
- **C++ Code:**
```cpp
class Solution {
public:
    bool search(vector<int>& nums, int target) {
        int low = 0, high = nums.size() - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] == target) return true;
            if (nums[low] == nums[mid] && nums[mid] == nums[high]) {
                low++; high--; continue;
            }
            if (nums[low] <= nums[mid]) {
                if (nums[low] <= target && target <= nums[mid]) high = mid - 1;
                else low = mid + 1;
            } else {
                if (nums[mid] <= target && target <= nums[high]) low = mid + 1;
                else high = mid - 1;
            }
        }
        return false;
    }
};
```
- **Complexity:** T: O(N) (worst case), O(log N) average | S: O(1)

---

### Q10) Find Minimum in Rotated Sorted Array
- **Problem:** Find the minimum element in a rotated sorted array.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Binary search. If `arr[low] <= arr[mid]`, the left half is sorted, so the minimum could be `arr[low]`, then search in the right half. Else, the right half is sorted, minimum could be `arr[mid]`, then search in the left.
- **C++ Code:**
```cpp
class Solution {
public:
    int findMin(vector<int>& nums) {
        int low = 0, high = nums.size() - 1, ans = INT_MAX;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[low] <= nums[mid]) {
                ans = min(ans, nums[low]);
                low = mid + 1;
            } else {
                ans = min(ans, nums[mid]);
                high = mid - 1;
            }
        }
        return ans;
    }
};
```
- **Complexity:** T: O(log N) | S: O(1)

---

### Q11) Find Peak Element
- **Problem:** Find an index `i` such that `arr[i-1] < arr[i] > arr[i+1]`.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Binary search. If `arr[mid] > arr[mid-1]`, we are on an increasing slope, so the peak is to the right. Else, the peak is to the left.
- **C++ Code:**
```cpp
class Solution {
public:
    int findPeakElement(vector<int>& nums) {
        int n = nums.size();
        if (n == 1) return 0;
        if (nums[0] > nums[1]) return 0;
        if (nums[n-1] > nums[n-2]) return n-1;
        int low = 1, high = n - 2;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (nums[mid] > nums[mid-1] && nums[mid] > nums[mid+1]) return mid;
            if (nums[mid] > nums[mid-1]) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
};
```
- **Complexity:** T: O(log N) | S: O(1)

---

### Q12) Koko Eating Bananas
- **Problem:** Find the minimum speed `k` to eat all bananas within `h` hours.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Binary search on the answer (speed). The range is `1` to `max(piles)`. For each speed, calculate total hours.
- **C++ Code:**
```cpp
class Solution {
public:
    long long calculateTotalHours(vector<int>& piles, int hourly) {
        long long totalH = 0;
        for (int x : piles) totalH += ceil((double)x / (double)hourly);
        return totalH;
    }
    int minEatingSpeed(vector<int>& piles, int h) {
        int low = 1, high = *max_element(piles.begin(), piles.end());
        int ans = high;
        while (low <= high) {
            int mid = low + (high - low) / 2;
            if (calculateTotalHours(piles, mid) <= h) {
                ans = mid;
                high = mid - 1;
            } else low = mid + 1;
        }
        return ans;
    }
};
```
- **Complexity:** T: O(N log(max_pile)) | S: O(1)

---

### Q13) Aggressive Cows
- **Problem:** Place `k` cows in stalls such that the minimum distance between any two is maximized.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Binary search on the distance. Sort the stalls. Range: `1` to `max-min`. For a distance `d`, check if `k` cows can be placed.
- **C++ Code:**
```cpp
bool canPlace(vector<int> &stalls, int dist, int k) {
    int cnt = 1, last = stalls[0];
    for (int i = 1; i < stalls.size(); i++) {
        if (stalls[i] - last >= dist) {
            cnt++;
            last = stalls[i];
        }
    }
    return cnt >= k;
}
int aggressiveCows(vector<int> &stalls, int k) {
    sort(stalls.begin(), stalls.end());
    int low = 1, high = stalls.back() - stalls[0], ans = 0;
    while (low <= high) {
        int mid = (low + high) / 2;
        if (canPlace(stalls, mid, k)) {
            ans = mid;
            low = mid + 1;
        } else high = mid - 1;
    }
    return ans;
}
```
- **Complexity:** T: O(N log N + N log(max_dist)) | S: O(1)

---

### Q14) Book Allocation Problem
- **Problem:** Allocate books to `m` students such that the maximum number of pages assigned to a student is minimized.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Binary search on the answer. Range: `max(pages)` to `sum(pages)`. A helper function checks if it's possible to allocate books such that no student gets more than `mid` pages.
- **C++ Code:**
```cpp
int countStudents(vector<int> &arr, int pages) {
    int students = 1, pagesStudent = 0;
    for (int x : arr) {
        if (pagesStudent + x <= pages) pagesStudent += x;
        else { students++; pagesStudent = x; }
    }
    return students;
}
int findPages(vector<int>& arr, int n, int m) {
    if (m > n) return -1;
    int low = *max_element(arr.begin(), arr.end());
    int high = accumulate(arr.begin(), arr.end(), 0);
    while (low <= high) {
        int mid = (low + high) / 2;
        if (countStudents(arr, mid) > m) low = mid + 1;
        else high = mid - 1;
    }
    return low;
}
```
- **Complexity:** T: O(N log(Sum-Max)) | S: O(1)

---

### Q15) Median of 2 Sorted Arrays
- **Problem:** Find the median of two sorted arrays of different sizes.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Binary search on the partition of the smaller array. Ensure that the total elements on the left side of the partition in both arrays is half the total size. Check if `L1 <= R2` and `L2 <= R1`.
- **C++ Code:**
```cpp
class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        int n1 = nums1.size(), n2 = nums2.size();
        if (n1 > n2) return findMedianSortedArrays(nums2, nums1);
        int low = 0, high = n1, left = (n1 + n2 + 1) / 2;
        while (low <= high) {
            int mid1 = (low + high) >> 1;
            int mid2 = left - mid1;
            int l1 = (mid1 == 0) ? INT_MIN : nums1[mid1 - 1];
            int l2 = (mid2 == 0) ? INT_MIN : nums2[mid2 - 1];
            int r1 = (mid1 == n1) ? INT_MAX : nums1[mid1];
            int r2 = (mid2 == n2) ? INT_MAX : nums2[mid2];
            if (l1 <= r2 && l2 <= r1) {
                if ((n1 + n2) % 2 == 1) return max(l1, l2);
                return (max(l1, l2) + min(r1, r2)) / 2.0;
            }
            if (l1 > r2) high = mid1 - 1;
            else low = mid1 + 1;
        }
        return 0.0;
    }
};
```
- **Complexity:** T: O(log(min(N1, N2))) | S: O(1)

---

### Q16) Minimize Max Distance to Gas Station
- **Problem:** Add `k` gas stations such that the maximum distance between adjacent stations is minimized.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Binary search on the distance. Range `0` to `max_diff`. For a distance `dist`, calculate how many stations are required: `stations += (arr[i+1]-arr[i])/dist`.
- **C++ Code:**
```cpp
bool check(double dist, vector<int>& stations, int k) {
    int cnt = 0;
    for (int i = 0; i < stations.size() - 1; i++) {
        cnt += (int)((stations[i + 1] - stations[i]) / dist);
    }
    return cnt <= k;
}
double minMaxDistance(vector<int> &stations, int k) {
    double low = 0, high = stations.back() - stations[0];
    while (high - low > 1e-6) {
        double mid = (low + high) / 2.0;
        if (check(mid, stations, k)) high = mid;
        else low = mid;
    }
    return high;
}
```
- **Complexity:** T: O(N log(Range/1e-6)) | S: O(1)

---

## 🗂️ Linked List

### Q17) Middle of a LinkedList
- **Problem:** Find the middle node of a linked list.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Tortoise and Hare approach. Move `slow` by 1 step and `fast` by 2 steps. When `fast` reaches the end, `slow` is at the middle.
- **C++ Code:**
```cpp
class Solution {
public:
    ListNode* middleNode(ListNode* head) {
        ListNode *slow = head, *fast = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
        }
        return slow;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q18) Detect a loop in LL
- **Problem:** Check if a linked list contains a cycle.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Floyd's Cycle-Finding algorithm. If `slow` and `fast` pointers meet, there is a cycle.
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

### Q19) Remove Nth node from the back of the LL
- **Problem:** Delete the N-th node from the end.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Two pointers. Move `fast` N steps forward. Then move both `slow` and `fast` until `fast` reaches the end. `slow->next` is the node to delete.
- **C++ Code:**
```cpp
class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode *dummy = new ListNode(0, head), *slow = dummy, *fast = dummy;
        for (int i = 0; i < n; i++) fast = fast->next;
        while (fast->next) {
            slow = slow->next;
            fast = fast->next;
        }
        slow->next = slow->next->next;
        return dummy->next;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q20) Find the intersection point of Y LL
- **Problem:** Find the node where two singly linked lists intersect.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Initialize two pointers at heads. Move each. When one reaches the end, redirect it to the head of the other list. They will eventually meet at the intersection.
- **C++ Code:**
```cpp
class Solution {
public:
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        if (!headA || !headB) return NULL;
        ListNode *a = headA, *b = headB;
        while (a != b) {
            a = a == NULL ? headB : a->next;
            b = b == NULL ? headA : b->next;
        }
        return a;
    }
};
```
- **Complexity:** T: O(N+M) | S: O(1)

---

### Q21) Sort LL
- **Problem:** Sort a linked list in O(N log N).
- **Difficulty:** Hard (Commonly Medium)
- **Concept / Optimal Algo:** Merge Sort. Find the middle, split the list, recursively sort halves, and merge them.
- **C++ Code:**
```cpp
class Solution {
public:
    ListNode* merge(ListNode* l1, ListNode* l2) {
        ListNode dummy(0); ListNode* cur = &dummy;
        while (l1 && l2) {
            if (l1->val < l2->val) { cur->next = l1; l1 = l1->next; }
            else { cur->next = l2; l2 = l2->next; }
            cur = cur->next;
        }
        cur->next = l1 ? l1 : l2;
        return dummy.next;
    }
    ListNode* sortList(ListNode* head) {
        if (!head || !head->next) return head;
        ListNode *slow = head, *fast = head, *pre = NULL;
        while (fast && fast->next) {
            pre = slow; slow = slow->next; fast = fast->next->next;
        }
        pre->next = NULL;
        return merge(sortList(head), sortList(slow));
    }
};
```
- **Complexity:** T: O(N log N) | S: O(log N) (recursion stack)

---

### Q22) Segregate odd and even nodes in Linked List
- **Problem:** Group all odd nodes together followed by even nodes based on node indices.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Maintain two pointers `odd` and `even`. Link odd nodes together and even nodes together, then connect the tail of the odd list to the head of the even list.
- **C++ Code:**
```cpp
class Solution {
public:
    ListNode* oddEvenList(ListNode* head) {
        if (!head) return head;
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

## 🗂️ Recursion and Backtracking

### Q23) Power Set
- **Problem:** Generate all subsets (the power set) of a set.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Recursion (Pick/Non-pick approach). For every element, either include it in the current subset or don't.
- **C++ Code:**
```cpp
class Solution {
public:
    void backtrack(int idx, vector<int>& nums, vector<int>& path, vector<vector<int>>& res) {
        res.push_back(path);
        for (int i = idx; i < nums.size(); i++) {
            path.push_back(nums[i]);
            backtrack(i + 1, nums, path, res);
            path.pop_back();
        }
    }
    vector<vector<int>> subsets(vector<int>& nums) {
        vector<vector<int>> res;
        vector<int> path;
        backtrack(0, nums, path, res);
        return res;
    }
};
```
- **Complexity:** T: O(2^N) | S: O(N)

---

### Q24) Combination Sum
- **Problem:** Find all unique combinations in candidates where the numbers sum to target.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Recursion. At each step, either pick the current element (and stay at the same index because we can reuse elements) or skip to the next element.
- **C++ Code:**
```cpp
class Solution {
public:
    void find(int idx, int target, vector<int>& arr, vector<vector<int>>& res, vector<int>& ds) {
        if (idx == arr.size()) {
            if (target == 0) res.push_back(ds);
            return;
        }
        if (arr[idx] <= target) {
            ds.push_back(arr[idx]);
            find(idx, target - arr[idx], arr, res, ds);
            ds.pop_back();
        }
        find(idx + 1, target, arr, res, ds);
    }
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        vector<vector<int>> res;
        vector<int> ds;
        find(0, target, candidates, res, ds);
        return res;
    }
};
```
- **Complexity:** T: O(2^T * K) where T is target/min element | S: O(K * combinations)

---

### Q25) N Queen
- **Problem:** Place N queens on an NxN chessboard such that no two queens attack each other.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Backtracking. Place queens row by row. Use three sets (or arrays) to track occupied columns, 45-degree diagonals, and 135-degree diagonals.
- **C++ Code:**
```cpp
class Solution {
public:
    void solve(int row, int n, vector<string>& board, vector<vector<string>>& res, 
               vector<int>& col, vector<int>& d1, vector<int>& d2) {
        if (row == n) { res.push_back(board); return; }
        for (int c = 0; c < n; c++) {
            if (!col[c] && !d1[row + c] && !d2[row - c + n - 1]) {
                board[row][c] = 'Q';
                col[c] = d1[row + c] = d2[row - c + n - 1] = 1;
                solve(row + 1, n, board, res, col, d1, d2);
                col[c] = d1[row + c] = d2[row - c + n - 1] = 0;
                board[row][c] = '.';
            }
        }
    }
    vector<vector<string>> solveNQueens(int n) {
        vector<vector<string>> res;
        vector<string> board(n, string(n, '.'));
        vector<int> col(n, 0), d1(2 * n, 0), d2(2 * n, 0);
        solve(0, n, board, res, col, d1, d2);
        return res;
    }
};
```
- **Complexity:** T: O(N!) | S: O(N²)

---

### Q26) Sudoku Solver
- **Problem:** Fill a 9x9 Sudoku board.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Backtracking. For every empty cell, try placing '1'-'9'. Check validity (row, column, 3x3 box). If valid, recurse. If it fails, backtrack.
- **C++ Code:**
```cpp
class Solution {
public:
    bool isValid(vector<vector<char>>& board, int r, int c, char ch) {
        for (int i = 0; i < 9; i++) {
            if (board[i][c] == ch) return false;
            if (board[r][i] == ch) return false;
            if (board[3 * (r / 3) + i / 3][3 * (c / 3) + i % 3] == ch) return false;
        }
        return true;
    }
    bool solve(vector<vector<char>>& board) {
        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                if (board[i][j] == '.') {
                    for (char c = '1'; c <= '9'; c++) {
                        if (isValid(board, i, j, c)) {
                            board[i][j] = c;
                            if (solve(board)) return true;
                            board[i][j] = '.';
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
    void solveSudoku(vector<vector<char>>& board) { solve(board); }
};
```
- **Complexity:** T: O(9^(N²)) | S: O(1)

---

### Q27) M Coloring Problem
- **Problem:** Color a graph with `M` colors such that no two adjacent vertices have the same color.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Backtracking. Assign a color to a vertex, check adjacency, then recurse for the next vertex.
- **C++ Code:**
```cpp
bool isSafe(int node, int color[], bool graph[101][101], int n, int col) {
    for (int k = 0; k < n; k++) {
        if (k != node && graph[k][node] == 1 && color[k] == col) return false;
    }
    return true;
}
bool solve(int node, int color[], int m, int n, bool graph[101][101]) {
    if (node == n) return true;
    for (int i = 1; i <= m; i++) {
        if (isSafe(node, color, graph, n, i)) {
            color[node] = i;
            if (solve(node + 1, color, m, n, graph)) return true;
            color[node] = 0;
        }
    }
    return false;
}
```
- **Complexity:** T: O(M^N) | S: O(N)

---

### Q28) Word Search
- **Problem:** Find if a word exists in a 2D grid of characters.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** DFS + Backtracking. Start DFS from every cell matching the first letter. Mark the current cell as visited (usually by changing it to a special character) and explore 4 neighbors.
- **C++ Code:**
```cpp
class Solution {
public:
    bool dfs(vector<vector<char>>& board, string& word, int i, int j, int s) {
        if (s == word.length()) return true;
        if (i < 0 || i >= board.size() || j < 0 || j >= board[0].size() || board[i][j] != word[s]) return false;
        char tmp = board[i][j];
        board[i][j] = '#';
        bool found = dfs(board, word, i + 1, j, s + 1) || dfs(board, word, i - 1, j, s + 1) ||
                     dfs(board, word, i, j + 1, s + 1) || dfs(board, word, i, j - 1, s + 1);
        board[i][j] = tmp;
        return found;
    }
    bool exist(vector<vector<char>>& board, string word) {
        for (int i = 0; i < board.size(); i++)
            for (int j = 0; j < board[0].size(); j++)
                if (dfs(board, word, i, j, 0)) return true;
        return false;
    }
};
```
- **Complexity:** T: O(N * M * 4^L) where L is word length | S: O(L)

---

## 🗂️ Stacks/Queues

### Q29) Next Greater Element
- **Problem:** For each element in an array, find the next element to its right that is strictly larger.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Monotonic decreasing stack. Traverse the array from right to left. While stack top is ≤ current element, pop. Stack top is the NGE. Push current element.
- **C++ Code:**
```cpp
vector<long long> nextLargerElement(vector<long long> arr, int n) {
    stack<long long> st;
    vector<long long> res(n);
    for (int i = n - 1; i >= 0; i--) {
        while (!st.empty() && st.top() <= arr[i]) st.pop();
        res[i] = st.empty() ? -1 : st.top();
        st.push(arr[i]);
    }
    return res;
}
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q30) Trapping Rainwater
- **Problem:** Given an elevation map, calculate how much water it can trap after raining.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Two Pointers. Maintain `leftMax` and `rightMax`. If `height[l] <= height[r]`, water trapped at `l` depends on `leftMax`. Else, it depends on `rightMax`.
- **C++ Code:**
```cpp
class Solution {
public:
    int trap(vector<int>& height) {
        int l = 0, r = height.size() - 1, lM = 0, rM = 0, res = 0;
        while (l <= r) {
            if (height[l] <= height[r]) {
                if (height[l] >= lM) lM = height[l];
                else res += lM - height[l];
                l++;
            } else {
                if (height[r] >= rM) rM = height[r];
                else res += rM - height[r];
                r--;
            }
        }
        return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q31) Largest Rectangle in Histogram
- **Problem:** Find the area of the largest rectangle in a histogram.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Monotonic increasing stack. For each bar, find the first smaller bar to the left and right. Area = `height[i] * (right_smaller - left_smaller - 1)`.
- **C++ Code:**
```cpp
class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        int n = heights.size();
        stack<int> st;
        int maxA = 0;
        for (int i = 0; i <= n; i++) {
            while (!st.empty() && (i == n || heights[st.top()] >= heights[i])) {
                int h = heights[st.top()];
                st.pop();
                int w = st.empty() ? i : i - st.top() - 1;
                maxA = max(maxA, h * w);
            }
            st.push(i);
        }
        return maxA;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q32) Asteroid Collision
- **Problem:** Simulate collisions of asteroids moving left (negative) and right (positive).
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Use a stack. If an asteroid is positive, push it. If negative, check for collisions with positive asteroids on top of the stack.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> asteroidCollision(vector<int>& a) {
        vector<int> st;
        for (int x : a) {
            while (!st.empty() && x < 0 && st.back() > 0) {
                if (st.back() < -x) { st.pop_back(); continue; }
                else if (st.back() == -x) st.pop_back();
                x = 0;
            }
            if (x != 0) st.push_back(x);
        }
        return st;
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q33) Sliding Window Maximum
- **Problem:** Find the maximum in each sliding window of size `k`.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Deque (Monotonic). Maintain indices in a deque such that values are in decreasing order. Remove indices outside the window from the front and smaller values from the back.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> maxSlidingWindow(vector<int>& nums, int k) {
        deque<int> dq;
        vector<int> res;
        for (int i = 0; i < nums.size(); i++) {
            if (!dq.empty() && dq.front() == i - k) dq.pop_front();
            while (!dq.empty() && nums[dq.back()] < nums[i]) dq.pop_back();
            dq.push_back(i);
            if (i >= k - 1) res.push_back(nums[dq.front()]);
        }
        return res;
    }
};
```
- **Complexity:** T: O(N) | S: O(K)

---

### Q34) LRU Cache
- **Problem:** Design a Least Recently Used (LRU) cache.
- **Difficulty:** Medium (Listed as Hard in some contexts, prompt says Hard)
- **Concept / Optimal Algo:** Hash Map + Doubly Linked List. Map stores key to Node pointer. List stores keys in order of use. Most recent at head, least recent at tail.
- **C++ Code:**
```cpp
class LRUCache {
public:
    struct Node { int k, v; Node *prev, *next; };
    unordered_map<int, Node*> mp;
    Node *head = new Node(), *tail = new Node();
    int cap;
    LRUCache(int capacity) {
        cap = capacity; head->next = tail; tail->prev = head;
    }
    void addNode(Node* n) {
        n->next = head->next; n->prev = head;
        head->next->prev = n; head->next = n;
    }
    void deleteNode(Node* n) {
        n->prev->next = n->next; n->next->prev = n->prev;
    }
    int get(int key) {
        if (mp.count(key)) {
            Node* res = mp[key];
            deleteNode(res); addNode(res);
            return res->v;
        }
        return -1;
    }
    void put(int key, int value) {
        if (mp.count(key)) {
            deleteNode(mp[key]); mp.erase(key);
        }
        if (mp.size() == cap) {
            mp.erase(tail->prev->k); deleteNode(tail->prev);
        }
        Node* newNode = new Node{key, value};
        addNode(newNode); mp[key] = newNode;
    }
};
```
- **Complexity:** T: O(1) per operation | S: O(Capacity)

---

## 🗂️ Heaps

### Q35) K-th Largest Element in an Array
- **Problem:** Find the k-th largest element.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Min-Heap of size `k`. Push elements into the heap; if size > `k`, pop. The top will be the k-th largest.
- **C++ Code:**
```cpp
class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        priority_queue<int, vector<int>, greater<int>> minH;
        for (int x : nums) {
            minH.push(x);
            if (minH.size() > k) minH.pop();
        }
        return minH.top();
    }
};
```
- **Complexity:** T: O(N log K) | S: O(K)

---

### Q36) Task Scheduler
- **Problem:** Minimum time to finish tasks given a cooldown `n`.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Greedy with Math. Frequency of the most frequent task `f_max`. Formula: `(f_max - 1) * (n + 1) + (count of tasks with f_max frequency)`. Compare this with the total number of tasks.
- **C++ Code:**
```cpp
class Solution {
public:
    int leastInterval(vector<char>& tasks, int n) {
        vector<int> f(26, 0);
        for (char c : tasks) f[c - 'A']++;
        int maxF = *max_element(f.begin(), f.end());
        int countMaxF = 0;
        for (int x : f) if (x == maxF) countMaxF++;
        int ans = (maxF - 1) * (n + 1) + countMaxF;
        return max(ans, (int)tasks.size());
    }
};
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q37) Implement Min Heap
- **Problem:** Implement a Min Heap data structure.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Use an array. For index `i`: parent is `(i-1)/2`, children are `2i+1` and `2i+2`. Use `heapifyUp` for insertion and `heapifyDown` for extraction.
- **C++ Code:**
```cpp
class MinHeap {
    vector<int> heap;
public:
    void push(int x) {
        heap.push_back(x);
        int i = heap.size() - 1;
        while (i > 0 && heap[(i - 1) / 2] > heap[i]) {
            swap(heap[i], heap[(i - 1) / 2]);
            i = (i - 1) / 2;
        }
    }
    int pop() {
        int res = heap[0];
        heap[0] = heap.back(); heap.pop_back();
        int i = 0, n = heap.size();
        while (2 * i + 1 < n) {
            int j = 2 * i + 1;
            if (j + 1 < n && heap[j + 1] < heap[j]) j++;
            if (heap[i] <= heap[j]) break;
            swap(heap[i], heap[j]); i = j;
        }
        return res;
    }
};
```
- **Complexity:** T: O(log N) for push/pop | S: O(N)

---

## 🗂️ Trees (BT + BST)

### Q38) Diameter of Binary Tree
- **Problem:** Longest path between any two nodes.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Post-order traversal. At each node, calculate `leftHeight` and `rightHeight`. Diameter is `max(diameter, leftHeight + rightHeight)`. Return `1 + max(leftHeight, rightHeight)`.
- **C++ Code:**
```cpp
class Solution {
public:
    int height(TreeNode* node, int& d) {
        if (!node) return 0;
        int lh = height(node->left, d);
        int rh = height(node->right, d);
        d = max(d, lh + rh);
        return 1 + max(lh, rh);
    }
    int diameterOfBinaryTree(TreeNode* root) {
        int d = 0;
        height(root, d);
        return d;
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q39) Maximum Path Sum
- **Problem:** Find the maximum path sum in a binary tree.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Similar to diameter, but calculate sum. Ignore negative sums by taking `max(0, subPathSum)`.
- **C++ Code:**
```cpp
class Solution {
public:
    int solve(TreeNode* root, int& maxi) {
        if (!root) return 0;
        int l = max(0, solve(root->left, maxi));
        int r = max(0, solve(root->right, maxi));
        maxi = max(maxi, l + r + root->val);
        return root->val + max(l, r);
    }
    int maxPathSum(TreeNode* root) {
        int maxi = INT_MIN;
        solve(root, maxi);
        return maxi;
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q40) Bottom View of BT
- **Problem:** Print nodes visible from the bottom.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** BFS + Vertical order. Use a map `(column -> last_node_value)`. Horizontal distance `hd` is 0 for root, `hd-1` for left, `hd+1` for right.
- **C++ Code:**
```cpp
vector <int> bottomView(Node *root) {
    map<int, int> mp;
    queue<pair<Node*, int>> q;
    q.push({root, 0});
    while (!q.empty()) {
        auto p = q.front(); q.pop();
        Node* node = p.first; int hd = p.second;
        mp[hd] = node->data;
        if (node->left) q.push({node->left, hd - 1});
        if (node->right) q.push({node->right, hd + 1});
    }
    vector<int> res;
    for (auto x : mp) res.push_back(x.second);
    return res;
}
```
- **Complexity:** T: O(N log N) | S: O(N)

---

### Q41) LCA in BT
- **Problem:** Find the Lowest Common Ancestor of two nodes.
- **Difficulty:** Medium (Prompt says Hard, standard is Medium)
- **Concept / Optimal Algo:** Recursive search. If current node is `p` or `q`, return current node. Recurse left and right. If both return non-null, current node is LCA. If only one returns non-null, return that.
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

### Q42) Minimum Time to Burn the BT
- **Problem:** Calculate time to burn the entire tree starting from a target node.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** 1) BFS to map parent pointers. 2) BFS starting from the target node, moving to left, right, and parent simultaneously.
- **C++ Code:**
```cpp
int timeToBurn(Node* root, int start) {
    map<Node*, Node*> parent;
    Node* target;
    queue<Node*> q; q.push(root);
    while(!q.empty()){
        Node* node = q.front(); q.pop();
        if(node->data == start) target = node;
        if(node->left) { parent[node->left] = node; q.push(node->left); }
        if(node->right) { parent[node->right] = node; q.push(node->right); }
    }
    map<Node*, bool> vis; q.push(target); vis[target] = 1;
    int dist = 0;
    while(!q.empty()){
        int size = q.size(); int flag = 0;
        for(int i=0; i<size; i++){
            Node* cur = q.front(); q.pop();
            if(cur->left && !vis[cur->left]) { flag = 1; vis[cur->left] = 1; q.push(cur->left); }
            if(cur->right && !vis[cur->right]) { flag = 1; vis[cur->right] = 1; q.push(cur->right); }
            if(parent[cur] && !vis[parent[cur]]) { flag = 1; vis[parent[cur]] = 1; q.push(parent[cur]); }
        }
        if(flag) dist++;
    }
    return dist;
}
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q43) Construct a BT from Preorder and Inorder
- **Problem:** Build the tree given two traversal arrays.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Preorder's first element is root. Find its index in Inorder. Left of that index is the left subtree, right is the right subtree.
- **C++ Code:**
```cpp
class Solution {
public:
    TreeNode* build(vector<int>& pre, int preS, int preE, vector<int>& in, int inS, int inE, map<int,int>& mp) {
        if (preS > preE || inS > inE) return NULL;
        TreeNode* root = new TreeNode(pre[preS]);
        int inRoot = mp[root->val];
        int numsLeft = inRoot - inS;
        root->left = build(pre, preS + 1, preS + numsLeft, in, inS, inRoot - 1, mp);
        root->right = build(pre, preS + numsLeft + 1, preE, in, inRoot + 1, inE, mp);
        return root;
    }
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        map<int, int> mp;
        for (int i = 0; i < inorder.size(); i++) mp[inorder[i]] = i;
        return build(preorder, 0, preorder.size() - 1, inorder, 0, inorder.size() - 1, mp);
    }
};
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q44) Morris Preorder Traversal
- **Problem:** Preorder traversal in O(1) space.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Threaded Binary Tree. Use the right child of the predecessor to point back to the current node.
- **C++ Code:**
```cpp
vector<int> preorderTraversal(TreeNode* root) {
    vector<int> res;
    TreeNode* cur = root;
    while (cur) {
        if (!cur->left) {
            res.push_back(cur->val);
            cur = cur->right;
        } else {
            TreeNode* prev = cur->left;
            while (prev->right && prev->right != cur) prev = prev->right;
            if (!prev->right) {
                prev->right = cur;
                res.push_back(cur->val);
                cur = cur->left;
            } else {
                prev->right = NULL;
                cur = cur->right;
            }
        }
    }
    return res;
}
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q45) Delete a node in BST
- **Problem:** Remove a node from a Binary Search Tree.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Find node. If it has 0 or 1 child, replace it with the child. If 2 children, find the "Inorder Successor" (smallest in right subtree), replace node's value with it, and delete the successor.
- **C++ Code:**
```cpp
class Solution {
public:
    TreeNode* deleteNode(TreeNode* root, int key) {
        if (!root) return NULL;
        if (root->val > key) root->left = deleteNode(root->left, key);
        else if (root->val < key) root->right = deleteNode(root->right, key);
        else {
            if (!root->left) return root->right;
            if (!root->right) return root->left;
            TreeNode* temp = root->right;
            while (temp->left) temp = temp->left;
            root->val = temp->val;
            root->right = deleteNode(root->right, temp->val);
        }
        return root;
    }
};
```
- **Complexity:** T: O(H) | S: O(H)

---

### Q46) LCA in BST
- **Problem:** Lowest Common Ancestor in a BST.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** If both `p` and `q` are smaller than root, LCA is in left. If both are larger, LCA is in right. Else, root is LCA.
- **C++ Code:**
```cpp
class Solution {
public:
    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if (root->val > p->val && root->val > q->val) return lowestCommonAncestor(root->left, p, q);
        if (root->val < p->val && root->val < q->val) return lowestCommonAncestor(root->right, p, q);
        return root;
    }
};
```
- **Complexity:** T: O(H) | S: O(H)

---

### Q47) Two Sum in BST
- **Problem:** Check if a pair exists with sum K.
- **Difficulty:** Hard (Listed as Hard, usually Medium)
- **Concept / Optimal Algo:** Use BST Iterators. One iterator for ascending order (next), one for descending (before). Use two-pointer logic on the values returned by iterators.
- **C++ Code:**
```cpp
class BSTIterator {
    stack<TreeNode*> st; bool reverse;
public:
    BSTIterator(TreeNode* root, bool isReverse) { reverse = isReverse; pushAll(root); }
    int next() {
        TreeNode* node = st.top(); st.pop();
        if(!reverse) pushAll(node->right); else pushAll(node->left);
        return node->val;
    }
    void pushAll(TreeNode* node) {
        while(node) { st.push(node); node = reverse ? node->right : node->left; }
    }
};
class Solution {
public:
    bool findTarget(TreeNode* root, int k) {
        BSTIterator l(root, false), r(root, true);
        int i = l.next(), j = r.next();
        while(i < j) {
            if(i + j == k) return true;
            if(i + j < k) i = l.next(); else j = r.next();
        }
        return false;
    }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

### Q48) Largest BST in Binary Tree
- **Problem:** Find the size of the largest subtree that is a BST.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Post-order traversal. Each node returns `{isBST, size, minVal, maxVal}`. A node is part of BST if `node->val > maxLeft` and `node->val < minRight`.
- **C++ Code:**
```cpp
struct NodeValue { int minNode, maxNode, maxSize; };
class Solution {
public:
    NodeValue solve(Node* root) {
        if (!root) return {INT_MAX, INT_MIN, 0};
        auto left = solve(root->left);
        auto right = solve(root->right);
        if (root->data > left.maxNode && root->data < right.minNode) {
            return {min(root->data, left.minNode), max(root->data, right.maxNode), 1 + left.maxSize + right.maxSize};
        }
        return {INT_MIN, INT_MAX, max(left.maxSize, right.maxSize)};
    }
    int largestBst(Node *root) { return solve(root).maxSize; }
};
```
- **Complexity:** T: O(N) | S: O(H)

---

## 🗂️ Graphs

### Q49) Rotten Oranges
- **Problem:** Find minimum time until no fresh orange remains.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Multi-source BFS. Put all rotten oranges in a queue. Every step, rot the adjacent fresh oranges.
- **C++ Code:**
```cpp
class Solution {
public:
    int orangesRotting(vector<vector<int>>& grid) {
        int n = grid.size(), m = grid[0].size(), fresh = 0, time = 0;
        queue<pair<int, int>> q;
        for (int i = 0; i < n; i++)
            for (int j = 0; j < m; j++) {
                if (grid[i][j] == 2) q.push({i, j});
                if (grid[i][j] == 1) fresh++;
            }
        int d[] = {0, 1, 0, -1, 0};
        while (!q.empty() && fresh > 0) {
            int size = q.size();
            for (int i = 0; i < size; i++) {
                auto [r, c] = q.front(); q.pop();
                for (int k = 0; k < 4; k++) {
                    int nr = r + d[k], nc = c + d[k+1];
                    if (nr >= 0 && nr < n && nc >= 0 && nc < m && grid[nr][nc] == 1) {
                        grid[nr][nc] = 2; fresh--; q.push({nr, nc});
                    }
                }
            }
            time++;
        }
        return fresh == 0 ? time : -1;
    }
};
```
- **Complexity:** T: O(N*M) | S: O(N*M)

---

### Q50) Word Ladder I
- **Problem:** Length of shortest transformation sequence from start to end word.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** BFS. For the current word, try changing each character 'a'-'z'. If the new word is in the dictionary, add to queue and remove from dictionary.
- **C++ Code:**
```cpp
class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        unordered_set<string> s(wordList.begin(), wordList.end());
        queue<pair<string, int>> q; q.push({beginWord, 1});
        s.erase(beginWord);
        while (!q.empty()) {
            string word = q.front().first; int dist = q.front().second; q.pop();
            if (word == endWord) return dist;
            for (int i = 0; i < word.length(); i++) {
                char original = word[i];
                for (char c = 'a'; c <= 'z'; c++) {
                    word[i] = c;
                    if (s.count(word)) { s.erase(word); q.push({word, dist + 1}); }
                }
                word[i] = original;
            }
        }
        return 0;
    }
};
```
- **Complexity:** T: O(N * WordLen * 26) | S: O(N)

---

### Q51) Number of Islands
- **Problem:** Count number of connected components of '1's.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** BFS or DFS. Iterate through grid. When a '1' is found, increment count and sink the entire island (turn connected '1's to '0's).
- **C++ Code:**
```cpp
class Solution {
public:
    void dfs(vector<vector<char>>& grid, int r, int c) {
        if (r < 0 || c < 0 || r >= grid.size() || c >= grid[0].size() || grid[r][c] == '0') return;
        grid[r][c] = '0';
        dfs(grid, r+1, c); dfs(grid, r-1, c); dfs(grid, r, c+1); dfs(grid, r, c-1);
    }
    int numIslands(vector<vector<char>>& grid) {
        int count = 0;
        for (int i = 0; i < grid.size(); i++)
            for (int j = 0; j < grid[0].size(); j++)
                if (grid[i][j] == '1') { count++; dfs(grid, i, j); }
        return count;
    }
};
```
- **Complexity:** T: O(N*M) | S: O(N*M)

---

### Q52) Course Schedule II
- **Problem:** Order of courses to take to finish all courses.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Kahn's Algorithm (Topological Sort). Calculate indegrees. Process nodes with indegree 0. If sorted size != number of courses, a cycle exists.
- **C++ Code:**
```cpp
class Solution {
public:
    vector<int> findOrder(int n, vector<vector<int>>& prerequisites) {
        vector<int> adj[n], indegree(n, 0), res;
        for (auto& p : prerequisites) { adj[p[1]].push_back(p[0]); indegree[p[0]]++; }
        queue<int> q;
        for (int i = 0; i < n; i++) if (indegree[i] == 0) q.push(i);
        while (!q.empty()) {
            int u = q.front(); q.pop(); res.push_back(u);
            for (int v : adj[u]) if (--indegree[v] == 0) q.push(v);
        }
        return res.size() == n ? res : vector<int>();
    }
};
```
- **Complexity:** T: O(V+E) | S: O(V+E)

---

### Q53) Alien Dictionary
- **Problem:** Find the order of characters in a new language.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Build a graph by comparing adjacent words. The first differing character `c1` in `word1` and `c2` in `word2` implies an edge `c1 -> c2`. Perform Topological Sort.
- **C++ Code:**
```cpp
string findOrder(string dict[], int n, int k) {
    vector<int> adj[k]; vector<int> indegree(k, 0);
    for (int i = 0; i < n - 1; i++) {
        string s1 = dict[i], s2 = dict[i+1];
        for (int j = 0; j < min(s1.length(), s2.length()); j++) {
            if (s1[j] != s2[j]) {
                adj[s1[j] - 'a'].push_back(s2[j] - 'a');
                indegree[s2[j] - 'a']++; break;
            }
        }
    }
    queue<int> q; string res = "";
    for (int i = 0; i < k; i++) if (indegree[i] == 0) q.push(i);
    while (!q.empty()) {
        int u = q.front(); q.pop(); res += (char)(u + 'a');
        for (int v : adj[u]) if (--indegree[v] == 0) q.push(v);
    }
    return res;
}
```
- **Complexity:** T: O(N * WordLen + K) | S: O(K)

---

### Q54) Dijkstra's Algorithm
- **Problem:** Shortest path from source in a weighted graph.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Priority Queue (Min-Heap). Store `{distance, node}`. Always expand the node with the smallest distance. Relax neighbors.
- **C++ Code:**
```cpp
vector<int> dijkstra(int V, vector<vector<int>> adj[], int S) {
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    vector<int> dist(V, 1e9);
    dist[S] = 0; pq.push({0, S});
    while (!pq.empty()) {
        int d = pq.top().first; int u = pq.top().second; pq.pop();
        for (auto& edge : adj[u]) {
            int v = edge[0], weight = edge[1];
            if (d + weight < dist[v]) {
                dist[v] = d + weight; pq.push({dist[v], v});
            }
        }
    }
    return dist;
}
```
- **Complexity:** T: O(E log V) | S: O(V+E)

---

### Q55) Cheapest Flight Within K Stops
- **Problem:** Shortest path from `src` to `dst` with at most `K` stops.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Modified BFS. Store `{stops, node, cost}` in queue. Use `stops` as the level for BFS. Relax distance only if current stops < K.
- **C++ Code:**
```cpp
class Solution {
public:
    int findCheapestPrice(int n, vector<vector<int>>& flights, int src, int dst, int k) {
        vector<pair<int, int>> adj[n];
        for (auto& f : flights) adj[f[0]].push_back({f[1], f[2]});
        queue<pair<int, pair<int, int>>> q; // {stops, {node, cost}}
        q.push({0, {src, 0}});
        vector<int> dist(n, 1e9); dist[src] = 0;
        while (!q.empty()) {
            auto it = q.front(); q.pop();
            int stops = it.first, u = it.second.first, cost = it.second.second;
            if (stops > k) continue;
            for (auto& iter : adj[u]) {
                int v = iter.first, weight = iter.second;
                if (cost + weight < dist[v]) {
                    dist[v] = cost + weight;
                    q.push({stops + 1, {v, dist[v]}});
                }
            }
        }
        return dist[dst] == 1e9 ? -1 : dist[dst];
    }
};
```
- **Complexity:** T: O(E) | S: O(V+E)

---

### Q56) Bellman Ford Algorithm
- **Problem:** Shortest path with negative weights; detect negative cycles.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Relax all edges `V-1` times. If a `V`-th relaxation changes a distance, a negative cycle exists.
- **C++ Code:**
```cpp
vector<int> bellman_ford(int V, vector<vector<int>>& edges, int S) {
    vector<int> dist(V, 1e8); dist[S] = 0;
    for (int i = 0; i < V - 1; i++) {
        for (auto it : edges) {
            if (dist[it[0]] != 1e8 && dist[it[0]] + it[2] < dist[it[1]])
                dist[it[1]] = dist[it[0]] + it[2];
        }
    }
    for (auto it : edges) {
        if (dist[it[0]] != 1e8 && dist[it[0]] + it[2] < dist[it[1]]) return {-1};
    }
    return dist;
}
```
- **Complexity:** T: O(V * E) | S: O(V)

---

### Q57) Floyd Warshall Algorithm
- **Problem:** All-pairs shortest path.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** DP approach. Update distance between every pair `(i, j)` using every intermediate node `k`. `dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])`.
- **C++ Code:**
```cpp
void shortest_distance(vector<vector<int>>& matrix) {
    int n = matrix.size();
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++) if (matrix[i][j] == -1) matrix[i][j] = 1e9;
    for (int k = 0; k < n; k++)
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                matrix[i][j] = min(matrix[i][j], matrix[i][k] + matrix[k][j]);
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++) if (matrix[i][j] == 1e9) matrix[i][j] = -1;
}
```
- **Complexity:** T: O(V³) | S: O(V²)

---

### Q58) Find MST Weight (Kruskal's)
- **Problem:** Minimum Spanning Tree weight.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Kruskal's Algorithm. Sort all edges by weight. Use Disjoint Set Union (DSU) to add edges if they don't form a cycle.
- **C++ Code:**
```cpp
struct Edge { int u, v, w; };
bool comp(Edge a, Edge b) { return a.w < b.w; }
int find(int i, vector<int>& parent) {
    if (parent[i] == i) return i;
    return parent[i] = find(parent[i], parent);
}
int spanningTree(int V, vector<vector<int>> adj[]) {
    vector<Edge> edges;
    for (int i = 0; i < V; i++)
        for (auto it : adj[i]) edges.push_back({i, it[0], it[1]});
    sort(edges.begin(), edges.end(), comp);
    vector<int> parent(V); iota(parent.begin(), parent.end(), 0);
    int mstWeight = 0;
    for (auto e : edges) {
        int u = find(e.u, parent), v = find(e.v, parent);
        if (u != v) { mstWeight += e.w; parent[u] = v; }
    }
    return mstWeight;
}
```
- **Complexity:** T: O(E log E) | S: O(V+E)

---

### Q59) Accounts Merge
- **Problem:** Merge email accounts belonging to the same person.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Use DSU. Map each email to an ID. If two emails are in the same account, union their IDs.
- **C++ Code:**
```cpp
class Solution {
public:
    int findU(int i, vector<int>& p) { return p[i] == i ? i : p[i] = findU(p[i], p); }
    vector<vector<string>> accountsMerge(vector<vector<string>>& accounts) {
        int n = accounts.size(); vector<int> p(n); iota(p.begin(), p.end(), 0);
        unordered_map<string, int> mailToId;
        for (int i = 0; i < n; i++) {
            for (int j = 1; j < accounts[i].size(); j++) {
                if (mailToId.count(accounts[i][j])) {
                    p[findU(i, p)] = findU(mailToId[accounts[i][j]], p);
                } else mailToId[accounts[i][j]] = i;
            }
        }
        unordered_map<int, vector<string>> merged;
        for (auto& it : mailToId) merged[findU(it.second, p)].push_back(it.first);
        vector<vector<string>> res;
        for (auto& it : merged) {
            sort(it.second.begin(), it.second.end());
            vector<string> tmp = {accounts[it.first][0]};
            tmp.insert(tmp.end(), it.second.begin(), it.second.end());
            res.push_back(tmp);
        }
        return res;
    }
};
```
- **Complexity:** T: O(TotalEmails * log(TotalEmails)) | S: O(TotalEmails)

---

### Q60) Bridges in Graph
- **Problem:** Find all edges that, if removed, increase the number of connected components.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Tarjan's Algorithm (Discovery and Low-link values). An edge `(u, v)` is a bridge if `low[v] > disc[u]`.
- **C++ Code:**
```cpp
class Solution {
public:
    void dfs(int u, int p, int& timer, vector<int>& disc, vector<int>& low, vector<vector<int>>& adj, vector<vector<int>>& res) {
        disc[u] = low[u] = ++timer;
        for (int v : adj[u]) {
            if (v == p) continue;
            if (!disc[v]) {
                dfs(v, u, timer, disc, low, adj, res);
                low[u] = min(low[u], low[v]);
                if (low[v] > disc[u]) res.push_back({u, v});
            } else low[u] = min(low[u], disc[v]);
        }
    }
    vector<vector<int>> criticalConnections(int n, vector<vector<int>>& connections) {
        vector<vector<int>> adj(n), res;
        for (auto& e : connections) { adj[e[0]].push_back(e[1]); adj[e[1]].push_back(e[0]); }
        vector<int> disc(n, 0), low(n, 0); int timer = 0;
        dfs(0, -1, timer, disc, low, adj, res);
        return res;
    }
};
```
- **Complexity:** T: O(V+E) | S: O(V+E)

---

## 🗂️ Dynamic Programming

### Q61) Maximum Sum of Non-Adjacent Elements
- **Problem:** Find maximum sum of a subset where no two elements are adjacent.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** DP. At each element, either pick it (and add to `dp[i-2]`) or don't pick it (and take `dp[i-1]`). Space optimize using two variables.
- **C++ Code:**
```cpp
int solve(vector<int>& nums) {
    int prev = nums[0], prev2 = 0;
    for (int i = 1; i < nums.size(); i++) {
        int pick = nums[i] + prev2;
        int nonPick = prev;
        int cur = max(pick, nonPick);
        prev2 = prev; prev = cur;
    }
    return prev;
}
```
- **Complexity:** T: O(N) | S: O(1)

---

### Q62) Ninja's Training
- **Problem:** Max points Ninja can get by doing activities over N days (no same activity on consecutive days).
- **Difficulty:** Medium
- **Concept / Optimal Algo:** 2D DP. `dp[day][last_task]` = max points.
- **C++ Code:**
```cpp
int ninjaTraining(int n, vector<vector<int>>& points) {
    vector<int> prev(4, 0);
    prev[0] = max(points[0][1], points[0][2]);
    prev[1] = max(points[0][0], points[0][2]);
    prev[2] = max(points[0][0], points[0][1]);
    prev[3] = max({points[0][0], points[0][1], points[0][2]});
    for (int day = 1; day < n; day++) {
        vector<int> cur(4, 0);
        for (int last = 0; last < 4; last++) {
            for (int task = 0; task < 3; task++) {
                if (task != last) cur[last] = max(cur[last], points[day][task] + prev[task]);
            }
        }
        prev = cur;
    }
    return prev[3];
}
```
- **Complexity:** T: O(N * 4 * 3) | S: O(4)

---

### Q63) Minimum Path Sum in Grid
- **Problem:** Path from top-left to bottom-right with minimum sum.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** `dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])`.
- **C++ Code:**
```cpp
class Solution {
public:
    int minPathSum(vector<vector<int>>& grid) {
        int n = grid.size(), m = grid[0].size();
        vector<int> prev(m, 0);
        for (int i = 0; i < n; i++) {
            vector<int> cur(m, 0);
            for (int j = 0; j < m; j++) {
                if (i == 0 && j == 0) cur[j] = grid[i][j];
                else {
                    int up = grid[i][j] + (i > 0 ? prev[j] : 1e9);
                    int left = grid[i][j] + (j > 0 ? cur[j - 1] : 1e9);
                    cur[j] = min(up, left);
                }
            }
            prev = cur;
        }
        return prev[m - 1];
    }
};
```
- **Complexity:** T: O(N*M) | S: O(M)

---

### Q64) Subset Sum Equal to Target
- **Problem:** Check if a subset with given sum exists.
- **Difficulty:** Hard (Usually Medium)
- **Concept / Optimal Algo:** 2D DP. `dp[i][target]` is true if target can be achieved using first `i` elements.
- **C++ Code:**
```cpp
bool subsetSumToK(int n, int k, vector<int> &arr) {
    vector<bool> prev(k + 1, false);
    prev[0] = true;
    if (arr[0] <= k) prev[arr[0]] = true;
    for (int i = 1; i < n; i++) {
        vector<bool> cur(k + 1, false);
        cur[0] = true;
        for (int target = 1; target <= k; target++) {
            bool notTake = prev[target];
            bool take = false;
            if (arr[i] <= target) take = prev[target - arr[i]];
            cur[target] = take || notTake;
        }
        prev = cur;
    }
    return prev[k];
}
```
- **Complexity:** T: O(N * Target) | S: O(Target)

---

### Q65) Assign Cookies
- **Problem:** Maximize satisfied children with limited cookies.
- **Difficulty:** Easy
- **Concept / Optimal Algo:** Greedy. Sort both arrays. Assign the smallest available cookie that satisfies the child with the smallest greed factor.
- **C++ Code:**
```cpp
class Solution {
public:
    int findContentChildren(vector<int>& g, vector<int>& s) {
        sort(g.begin(), g.end()); sort(s.begin(), s.end());
        int i = 0, j = 0;
        while (i < g.size() && j < s.size()) {
            if (s[j] >= g[i]) i++;
            j++;
        }
        return i;
    }
};
```
- **Complexity:** T: O(N log N + M log M) | S: O(1)

---

### Q66) Rod Cutting Problem
- **Problem:** Cut rod to maximize profit.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Unbounded Knapsack. `dp[i][w]` is max profit with rod length `w` using first `i` cut options.
- **C++ Code:**
```cpp
int cutRod(vector<int> &price, int n) {
    vector<int> prev(n + 1, 0);
    for (int i = 0; i <= n; i++) prev[i] = i * price[0];
    for (int i = 1; i < n; i++) {
        for (int j = 0; j <= n; j++) {
            int notTake = prev[j];
            int take = -1e9;
            if (i + 1 <= j) take = price[i] + prev[j - (i + 1)];
            prev[j] = max(take, notTake);
        }
    }
    return prev[n];
}
```
- **Complexity:** T: O(N²) | S: O(N)

---

### Q67) Longest Common Subsequence
- **Problem:** Find length of longest subsequence present in both strings.
- **Difficulty:** Hard (Usually Medium)
- **Concept / Optimal Algo:** 2D DP. If `s1[i] == s2[j]`, `dp[i][j] = 1 + dp[i-1][j-1]`. Else, `max(dp[i-1][j], dp[i][j-1])`.
- **C++ Code:**
```cpp
class Solution {
public:
    int longestCommonSubsequence(string s1, string s2) {
        int n = s1.size(), m = s2.size();
        vector<int> prev(m + 1, 0), cur(m + 1, 0);
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= m; j++) {
                if (s1[i - 1] == s2[j - 1]) cur[j] = 1 + prev[j - 1];
                else cur[j] = max(prev[j], cur[j - 1]);
            }
            prev = cur;
        }
        return prev[m];
    }
};
```
- **Complexity:** T: O(N*M) | S: O(M)

---

### Q68) Longest Palindromic Subsequence
- **Problem:** Longest subsequence which is a palindrome.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Equivalent to finding LCS of the string and its reverse.
- **C++ Code:**
```cpp
class Solution {
public:
    int longestPalindromeSubseq(string s) {
        string t = s; reverse(t.begin(), t.end());
        int n = s.size();
        vector<int> prev(n + 1, 0), cur(n + 1, 0);
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (s[i-1] == t[j-1]) cur[j] = 1 + prev[j-1];
                else cur[j] = max(prev[j], cur[j-1]);
            }
            prev = cur;
        }
        return prev[n];
    }
};
```
- **Complexity:** T: O(N²) | S: O(N)

---

### Q69) Edit Distance
- **Problem:** Minimum operations to convert string A to B.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** 2D DP. If characters match, `dp[i][j] = dp[i-1][j-1]`. Else, `1 + min(insert, delete, replace)`.
- **C++ Code:**
```cpp
class Solution {
public:
    int minDistance(string s1, string s2) {
        int n = s1.size(), m = s2.size();
        vector<int> prev(m + 1, 0), cur(m + 1, 0);
        for (int j = 0; j <= m; j++) prev[j] = j;
        for (int i = 1; i <= n; i++) {
            cur[0] = i;
            for (int j = 1; j <= m; j++) {
                if (s1[i - 1] == s2[j - 1]) cur[j] = prev[j - 1];
                else cur[j] = 1 + min({prev[j - 1], prev[j], cur[j - 1]});
            }
            prev = cur;
        }
        return prev[m];
    }
};
```
- **Complexity:** T: O(N*M) | S: O(M)

---

### Q70) Best Time to Buy and Sell Stock IV
- **Problem:** Max profit with at most K transactions.
- **Difficulty:** Medium (Prompt says Medium, usually Hard)
- **Concept / Optimal Algo:** 3D DP space optimized to 2D. `dp[transaction][buy_state]`.
- **C++ Code:**
```cpp
class Solution {
public:
    int maxProfit(int k, vector<int>& prices) {
        int n = prices.size();
        vector<vector<int>> after(k + 1, vector<int>(2, 0)), cur(k + 1, vector<int>(2, 0));
        for (int i = n - 1; i >= 0; i--) {
            for (int cap = 1; cap <= k; cap++) {
                cur[cap][1] = max(-prices[i] + after[cap][0], after[cap][1]);
                cur[cap][0] = max(prices[i] + after[cap - 1][1], after[cap][0]);
            }
            after = cur;
        }
        return after[k][1];
    }
};
```
- **Complexity:** T: O(N * K) | S: O(K)

---

### Q71) Longest Increasing Subsequence
- **Problem:** Length of the longest strictly increasing subsequence.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Binary Search approach (Patience Sorting). Maintain a list `tails` where `tails[i]` is the smallest tail of all increasing subsequences of length `i+1`.
- **C++ Code:**
```cpp
class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        vector<int> temp;
        temp.push_back(nums[0]);
        for (int i = 1; i < nums.size(); i++) {
            if (nums[i] > temp.back()) temp.push_back(nums[i]);
            else {
                int idx = lower_bound(temp.begin(), temp.end(), nums[i]) - temp.begin();
                temp[idx] = nums[i];
            }
        }
        return temp.size();
    }
};
```
- **Complexity:** T: O(N log N) | S: O(N)

---

### Q72) Burst Balloons
- **Problem:** Burst balloons to maximize coins.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Matrix Chain Multiplication style DP. `dp[i][j]` is the max coins by bursting balloons between `i` and `j`. Consider `k` as the *last* balloon to burst in the range.
- **C++ Code:**
```cpp
class Solution {
public:
    int maxCoins(vector<int>& nums) {
        int n = nums.size();
        nums.insert(nums.begin(), 1); nums.push_back(1);
        vector<vector<int>> dp(n + 2, vector<int>(n + 2, 0));
        for (int i = n; i >= 1; i--) {
            for (int j = i; j <= n; j++) {
                for (int k = i; k <= j; k++) {
                    int steps = nums[i - 1] * nums[k] * nums[j + 1] + dp[i][k - 1] + dp[k + 1][j];
                    dp[i][j] = max(dp[i][j], steps);
                }
            }
        }
        return dp[1][n];
    }
};
```
- **Complexity:** T: O(N³) | S: O(N²)

---

## 🗂️ Tries

### Q73) Trie Implementation
- **Problem:** Implement insert, search, and startsWith.
- **Difficulty:** Hard (Usually Medium)
- **Concept / Optimal Algo:** A tree where each node has 26 children (pointers) and a boolean `isEnd`.
- **C++ Code:**
```cpp
struct Node {
    Node *links[26]; bool flag = false;
    bool containsKey(char ch) { return links[ch - 'a'] != NULL; }
    void put(char ch, Node *node) { links[ch - 'a'] = node; }
    Node *get(char ch) { return links[ch - 'a']; }
    void setEnd() { flag = true; }
};
class Trie {
    Node* root;
public:
    Trie() { root = new Node(); }
    void insert(string word) {
        Node *node = root;
        for (char c : word) {
            if (!node->containsKey(c)) node->put(c, new Node());
            node = node->get(c);
        }
        node->setEnd();
    }
    bool search(string word) {
        Node *node = root;
        for (char c : word) {
            if (!node->containsKey(c)) return false;
            node = node->get(c);
        }
        return node->flag;
    }
};
```
- **Complexity:** T: O(Length) | S: O(N * Length)

---

### Q74) Maximum XOR with an Element from Array
- **Problem:** Maximize `x ^ nums[i]` such that `nums[i] <= m`.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Sort queries and array. Insert numbers into Trie bit by bit (31 to 0). For XOR, try to pick the opposite bit at each step.
- **C++ Code:**
```cpp
struct Node { Node *links[2]; };
class Trie {
    Node* root = new Node();
public:
    void insert(int num) {
        Node* node = root;
        for(int i=31; i>=0; i--) {
            int bit = (num >> i) & 1;
            if(!node->links[bit]) node->links[bit] = new Node();
            node = node->links[bit];
        }
    }
    int getMax(int num) {
        Node* node = root; int maxNum = 0;
        for(int i=31; i>=0; i--) {
            int bit = (num >> i) & 1;
            if(node->links[1 - bit]) { maxNum |= (1 << i); node = node->links[1 - bit]; }
            else if(node->links[bit]) node = node->links[bit];
            else return -1;
        }
        return maxNum;
    }
};
```
- **Complexity:** T: O(Q log Q + N log N) | S: O(N * 32)

---

### Q75) Number of Distinct Substrings
- **Problem:** Count unique substrings of a string.
- **Difficulty:** Medium
- **Concept / Optimal Algo:** Insert all suffixes into a Trie. The total number of nodes created (excluding root) is the number of distinct substrings.
- **C++ Code:**
```cpp
int countDistinctSubstrings(string &s) {
    Node* root = new Node(); int cnt = 0;
    for (int i = 0; i < s.length(); i++) {
        Node* node = root;
        for (int j = i; j < s.length(); j++) {
            if (!node->containsKey(s[j])) { cnt++; node->put(s[j], new Node()); }
            node = node->get(s[j]);
        }
    }
    return cnt + 1; // +1 for empty string
}
```
- **Complexity:** T: O(N²) | S: O(N²)

---

## 🗂️ Strings

### Q76) Minimum Bracket Reversals
- **Problem:** Minimum flips to balance a string of `{` and `}`.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Remove already balanced parts using a stack. For the remaining string of form `}}}{{{`, the answer is `ceil(open/2) + ceil(close/2)`.
- **C++ Code:**
```cpp
int countRev(string s) {
    if (s.length() % 2 != 0) return -1;
    stack<char> st;
    for (char c : s) {
        if (c == '{') st.push(c);
        else {
            if (!st.empty() && st.top() == '{') st.pop();
            else st.push(c);
        }
    }
    int open = 0, close = 0;
    while (!st.empty()) {
        if (st.top() == '{') open++; else close++;
        st.pop();
    }
    return (open + 1) / 2 + (close + 1) / 2;
}
```
- **Complexity:** T: O(N) | S: O(N)

---

### Q77) Rabin Karp Algorithm
- **Problem:** Pattern matching using rolling hash.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Calculate hash of pattern and first window of text. Slide window by updating hash: subtract leading char, multiply by base, add trailing char.
- **C++ Code:**
```cpp
void search(string pat, string txt, int q) {
    int M = pat.length(), N = txt.length(), p = 0, t = 0, h = 1, d = 256;
    for (int i = 0; i < M - 1; i++) h = (h * d) % q;
    for (int i = 0; i < M; i++) { p = (d * p + pat[i]) % q; t = (d * t + txt[i]) % q; }
    for (int i = 0; i <= N - M; i++) {
        if (p == t) {
            bool match = true;
            for (int j = 0; j < M; j++) if (txt[i + j] != pat[j]) match = false;
            if (match) cout << "Pattern found at " << i << endl;
        }
        if (i < N - M) {
            t = (d * (t - txt[i] * h) + txt[i + M]) % q;
            if (t < 0) t = (t + q);
        }
    }
}
```
- **Complexity:** T: O(N+M) average, O(NM) worst | S: O(1)

---

### Q78) Z function
- **Problem:** Find occurrences of pattern in text in linear time.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Create string `P + # + T`. Compute Z-array where `Z[i]` is the length of the longest common prefix between string and suffix starting at `i`.
- **C++ Code:**
```cpp
vector<int> z_function(string s) {
    int n = s.length(); vector<int> z(n);
    for (int i = 1, l = 0, r = 0; i < n; i++) {
        if (i <= r) z[i] = min(r - i + 1, z[i - l]);
        while (i + z[i] < n && s[z[i]] == s[i + z[i]]) z[i]++;
        if (i + z[i] - 1 > r) l = i, r = i + z[i] - 1;
    }
    return z;
}
```
- **Complexity:** T: O(N+M) | S: O(N+M)

---

### Q79) KMP Algorithm (LPS Array)
- **Problem:** String matching using the Longest Proper Prefix which is also a Suffix.
- **Difficulty:** Hard
- **Concept / Optimal Algo:** Precompute LPS array to avoid redundant comparisons. If mismatch, use LPS to skip characters in pattern.
- **C++ Code:**
```cpp
vector<int> computeLPS(string pat) {
    int m = pat.length(); vector<int> lps(m);
    int len = 0, i = 1;
    while (i < m) {
        if (pat[i] == pat[len]) lps[i++] = ++len;
        else if (len != 0) len = lps[len - 1];
        else lps[i++] = 0;
    }
    return lps;
}
```
- **Complexity:** T: O(N+M) | S: O(M)

---