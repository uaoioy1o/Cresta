We sincerely thank you for your meticulous review of our paper and the valuable comments you provided. These suggestions have provided extremely important guidance for us to further optimize the content of the paper. Below is our response to your specific feedback.

---

## 1. Regarding "Ambiguities and Lack of Details in the Paper"

Thanks for highlighting the lack of detail in our paper's methodology and dataset construction. We understand its importance. Due to paper length, we moved some details to the appendix. Now, we've added more to the main text.

The main added content is as follows:

- Methodology: Overview of the retrieval model's architecture, including the dual-tower encoder configuration, embedding processing, and discriminator design.  
- Dataset Construction: Explanation of dataset creation, covering data source, screening criteria, scenario-based sample division (Easy, Challenge, Expert), along with structured examples of sample data.

---

## 2. Notation in Eq.7 and 'Reflective text' in Figure 2

In Equation 7, the symbols are defined as:
1. $FFN$: Feed-Forward Neural Network for feature transformation.  
2. $h_{c}$: Feature vector of code $c$.  
3. $h_{q}$: Feature vector of query $q$.  
4. $AttnEnc$: Attention Encoder for code dependencies.  
5. $\mathcal{G}_{c}$: Dependency graph of code $c$.

We apologize for the unclear description of the meaning of **AttnEnc** in the paper. Here, **AttnEnc** refers to an attention encoding mechanism, and **Reflect Text** represents the feedback information of the Discriminator model on the retrieval results. We will further improve the explanations of these key terms during the revision to ensure that readers can intuitively understand the relevant content.

---

## 5. Regarding "Literature Review Issues"

Thanks for highlighting our literature review's shortcomings. Your feedback helps us improve the paper. We admit we overlooked some 2024 code model - related works while focusing on code retrieval. Due to your reminder, we've added a comparison of GraphCodeBert, UniXcoder, and ReCo, and cited them. For the experimental results, you can refer to the reply to Reviewer DNDb#2 and .

You mentioned that the **ReCo** paper is a very interesting work. Adding a code rewriting step based on Generation - Augmented Retrieval (GAR) is of great significance for improving the efficiency of code search and understanding code style similarity. It is a highly valuable research achievement. We have added relevant experimental content. 

---

## 6. Regarding "Choice of Loss Function"
Thanks for your detailed comments on the loss function choice, especially the reference to paper [2]. We agree it's an interesting and pioneering work, effectively demonstrating the performance of **InfoNCE** and **BinaryCross - Entropy**.

In our repository - level code retrieval scenario, as there are large differences in code - query correlations, we chose **TripleLoss** as the main optimization target. Unlike **InfoNCE** and **BinaryCross - Entropy**, **TripleLoss** focuses more on learning the relative distance between positive and negative samples, which can better solve local correlation issues. This aligns with the conclusion in paper [1].

We also experimented with training ReflectCode using **InfoNCE**. It converged faster initially but had slightly worse final performance than **TripleLoss**. Our preference is for training embedding representations with strong discriminative power, as seen in models like **BGE - Embedding**'s contrastive learning method. We've noted that **Triple Margin Loss** has shown good results in many code - related models, such as **UniXcoder** and the classic **GraphCodeBert**, which use similar contrastive learning forms.

Relevant citations:
1. [Wang et al., 2024] CEBin: A Cost - effective Framework for Large - scale Binary Code Similarity Detection. ACM SIGSOFT International Symposium.  
2. [Li et al., 2023] Rethinking Negative Pairs in Code Search. arXiv preprint arXiv:2310.08069.  
3. [Guo et al., 2020] GraphCodeBert: Pre - training Code Representations with Data Flow. arXiv preprint arXiv:2009.08366. 

---

## 7. Regarding "Comparison with Repository - level Baselines"
We appreciate your concerns about repository-level code retrieval. **RepoBench** centers on code completion using current(query) and next lines(ground truth label), which doesn’t align with our query-focused approach. **RepoMasterEval** is limited to Arxiv, with no formal publication or released dataset, making direct comparison difficult. We'll keep an eye on relevant baseline research to ensure our work is comprehensive.  

---

## 8. Regarding "Dataset Example"

Thank you for your valuable feedback! We categorized three levels of difficulty based on the number of functions and classes corresponding to a single user change request. For dataset examples, you can refer to response to Reviewer tDCw #5. If there are still unclear points, please continue to point them out. We are very willing to further improve the relevant content!