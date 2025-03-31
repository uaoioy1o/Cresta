### 1. Repository-Level Code Retrieval and User Change Request Definition

**User Change Request** refers to a user's modification requirements for a codebase, typically originating from product managers or GitHub issues. Two key application scenarios are:

- **Feature Addition**: Example - Introducing Code Property Graph (CPG) as a dynamic graph tool.
- **Bug Fixing**: Example - Resolving the error **TypeError: RST.__init__() got an unexpected keyword argument**.

Definition of repository - level code retrieval: In the traditional code retrieval process, it's likely that the result we obtain is a relevant function or class, which is correct. However, this kind of retrieval largely depends only on keyword or syntactic relevance. But repository - level retrieval requires a comprehensive consideration of the dependencies between functions. For example, a function - assisting class may not be directly related to the user - searched keyword but is still very important.

The model addresses **User Change Requests** through two innovations:
1. A tailored dataset built around **User Change Requests**, ensuring higher adaptability to real-world needs.
2. **LLM Discriminator** dynamically injects **reflective text** during the model operation, thereby further enhancing the model's ability to capture change intentions and the depth of its understanding of queries. This mechanism effectively supports the real-time adjustment of the model in complex problems, enabling it to meet user needs more flexibly.

### 2. Regarding "GraphCodeBERT and UniXCoder"

Thank you very much for your valuable suggestions! We fully agree that **GraphCodeBERT** and **UniXCoder** are powerful baseline models for code search tasks. In our experiments, ReflectCode was compared in detail with these models in terms of performance. Specifically, the performance of **GraphCodeBERT** and **UniXCoder** lies between that of **PolyCoder** and **InCoder**. 

| **Model**          | **F1 - Score ** | **Precision * | **Recall ** | **MRR** | **Top - 5 Accuracy** |
|---------------------|-------------------------|-------------------------|---------------------|------------------|-----------------------------|
| GraphCodeBERT      | 10.76                  | 9.87                   | 20.91              | 0.195            | 29.83                      |
| UniXCoder          | 12.61                  | 11.25                  | 22.73              | 0.218            | 31.82                      |
| ReCo           | 13.88                  | 11.45                  | 27.32              | 0.243            | 34.11                      |
| **ReflectCode**     | **14.30**              | 11.56                  | **31.29**          | **0.260**        | **34.86**                  |

The performance advantage of ReflectCode is mainly reflected in its high F1 - Score and Recall in complex scenarios, with significant improvements compared to other models.

If you have other models or metrics you recommend paying attention to, please feel free to let us know! We are very happy to further discuss and supplement relevant analysis content.

---

### 3. Regarding the "Potential Overhead of ReflectCode"

Thank you for raising concerns about the potential computational overhead of ReflectCode. Indeed, the implementation of ReflectCode incorporates a discriminator based on large language models, along with repository-level syntax tree preprocessing, which inevitably introduces increased computational resource demands and longer runtime. The comparison data regarding overhead during the experiments is summarized in the table below:  

| **Model**         | **Time per 1,000 Queries (Minutes)** |
|-------------------|--------------------------------------|
| CodeBERT          | 8                                   |
| ReflectCode       | 15                                  |  

We hope that in the next stage we can reduce the extra computational overhead and improve the overall efficiency by introducing lightweight discriminators and pre-syntax tree preprocessing.

---

### 4. Regarding "Key implementation details"

Thank you for your feedback. We added more methodology details (e.g., model architecture, training protocol) in Appendix C and dataset construction specifics in Appendix E. 

- Methodology: Overview of the retrieval model's architecture, including the dual-tower encoder configuration, embedding processing, and discriminator design.  
- Dataset Construction: Explanation of dataset creation, covering data source, screening criteria, scenario-based sample division (Easy, Challenge, Expert), along with structured examples of sample data.

Meanwhile, Figure 1 was updated to clarify repository-level code retrieval inputs/outputs, with examples added for better understanding. We have also put exact prompts for LLM discriminators in the appendix.