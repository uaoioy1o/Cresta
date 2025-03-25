import re
import tiktoken

enc = tiktoken.get_encoding("o200k_base")
# enc = tiktoken.get_encoding("cl100k_base")


def contains_chinese(text):
    return re.search(r"[\u4e00-\u9fff]", text) is not None


def dump_long_token():
    token_dict = {}
    for i in range(enc.n_vocab):
        try:
            c = enc.decode([i])
            if contains_chinese(c):
                token_dict[i] = c
        except:
            pass

    long_tokens = list(
        sorted(token_dict.items(), key=lambda x: len(x[1]), reverse=True)
    )[:1000]
    for i, c in long_tokens:
        print(f'{i}: "{c}"')


if __name__ == "__main__":
    dump_long_token()
