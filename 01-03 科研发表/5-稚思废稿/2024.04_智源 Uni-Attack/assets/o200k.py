import tiktoken

# Get the encoding for "o200k_base"
encoding = tiktoken.get_encoding("o200k_base")

# Retrieve the 177431st token
token_id = 177431
token = encoding.decode([token_id])

print(f"The 177431st token in 'o200k_base' encoding is: {token}")
