First and foremost, we sincerely appreciate your comprehensive and meticulous review of our paper. Your valuable comments are of great guiding significance for us to further enhance the quality of the paper. We express our heartfelt gratitude to you! Below is our detailed response to each of the issues raised in your feedback:

---

## 1. Issues with the Title's Expression

Thank you for your suggestion. We have removed the colorful small icons used in the introduction to ensure a clearer presentation and avoid potential visual clutter.

For example:

- Limitation (Line 41): Revised to: *"The fundamental limitation stems from prevailing function-centric paradigms that treat code artifacts as isolated units, ignoring the intricate web of cross-component dependencies inherent in modern software architectures..."*
- Motivation (Line 58): Revised to:
  *"Current evaluation frameworks critically limit progress by narrowly focusing on single-function retrieval tasks..."*
  ...

---

## 2. Issues with Variable Definitions and Descriptions

Thank you for your feedback! We have revised variable definitions, provide clear descriptions, and add a symbol comparison table in the appendix for easy reference. Here are part of sorted variables:

### Related to Loss Functions

- $\mathcal{L}_{align}$: Adaptive margin triplet loss for cross-modal alignment.
- $k$: Number of hard negative samples corresponding to each positive sample.
- $c^{+}$: Positive sample code snippet corresponding to query $q$.
- $c_{i}^{-}$: The $i$-th hard negative sample code snippet.
- $\alpha(\cdot)$: Function of the edge-aware margin mechanism.
- $s(c, q)$: Similarity score between code snippet $c$ and query $q$.
- $\tau$: Parameter for adjusting the probability distribution of similarity scores.
  ...

---

## 3. Comparison of Performance with InCoder

Thank you for your comments! We have re - examined the process of comparing the performance of ReflectCode and InCoder to ensure the objectivity and accuracy of the experimental conclusions. Although InCoder performs well in some metrics, ReflectCode demonstrates more outstanding overall performance. Specifically, ReflectCode outperformed InCoder in 13 out of 15 comparison metrics. In addition, we have also supplemented the performance comparison of ReflectCode with GraphCodeBERT and UniXCoder. For details, please refer to the reply to the reviewer DNDb #2.

---

## 4. Issues with Grammatical Errors and Sentence Structures

We are very grateful to you for pointing out the issues regarding grammar and expression, and we have made the following modifications:

- In line 63 -> change to "They could support repository - level understanding to ensure consistency and semantic coherence, especially during code changes."
- In line 105 -> change to "The ablation study quantifies the contributions of core components, revealing that controlled parameter independence and dynamic negative mining are critical for robust cross - modal alignment."
- In line 169 -> change to "In this work, a patch refers to a snippet of code or content extracted during the code extraction process. Some statistics about patch can be found in Table 1."
- In lines 278–281 -> We have deleted one of the sentences
- In figure 2 -> We have redrawn the diagram, but due to openreview restrictions, we cannot upload it.

...

---

## 5. Regarding "Dataset Example"

We categorized three levels of difficulty based on the number of functions and classes corresponding to a single user change request. Here is an example for the dataset

**User Change Request:**

> We noticed we were getting this warning message from Firefox:
> 'Cookie “messages” will be soon rejected because it has the “sameSite” attribute set to “none” or an invalid value, without the “secure” attribute. To know more about the “sameSite“ attribute, read ​https://developer.mozilla.org/docs/Web/HTTP/Headers/Set-Cookie/SameSite'
> ...

**Number of Relevant Code Snippet**: 25

**Number of Total Code Snippet**: 49

**Example Truth Code Snippets:**

```python
# File: django/contrib/messages/storage/cookie.py

def _update_cookie(self, encoded_data, response):
    ...
    samesite=settings.SESSION_COOKIE_SAMESITE,
                )
            else:
                response.delete_cookie(self.cookie_name, domain=settings.SESSION_COOKIE_DOMAIN)
    ...

# File: django/contrib/sessions/middleware.py
def process_response(self, request, response):
    ...
    settings.SESSION_COOKIE_NAME,
                  path=settings.SESSION_COOKIE_PATH,
                  domain=settings.SESSION_COOKIE_DOMAIN,
              )
              patch_vary_headers(response, ('Cookie',))
   ...
```
