一句话简述：

	基于检索增强生成判断行级别代码安全

文献调研：

	目前还没有相关的IDEA


![](assets/Pasted%20image%2020240414000811.png)![](assets/Pasted%20image%2020240414000813.png)

RAG：

最火热的应用是什么，那我必须主推检索增强生成（RAG，Retrieval Augmented Generation）。RAG最初是为了解决LLM的各类问题的（后面会提到）产生的


```
1. 参考文档： OpenAI API 文档 LangChain 文档
2. 基础：Sven项目的代码
3. 对应位置：
    1. mutator/mutator_online
    2. sven/evaler.py
4. 架构：通过外接大模型，向Evaler中增加Instruction
    1. 形式1： RAG匹配到MSR20中最相关的函数，使用API 返回一句话目标函数描述的形式
    2. 形式2： RAG匹配到MSR20中最相关的函数，使用API 返回最可能出现的漏洞
        ….
5. 预计日期
```
