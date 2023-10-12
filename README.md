# hacker-house-examples

# Publish packages from the coins
~/sui/target/debug/sui client publish --gas-budget 2000000000 sources

Now we get 10 million Gold, and 1 million Fish, Iron, Wood

# Transfer example

Fish
0xe14891fe2df8da5ca23d8c72a2047ff80c342668337009d6e924e31e5f678754
Gold
0xaeb77d1785ec0c81e24810533fdca7477c7dae36306efa6b2c7bd8bbe9292cdd

sui client transfer --to 0xd02c0676a9cd9d70e554b5c3ee8bd17cfe93792f6aaa327b02b096ac3359a210 --object-id 0xe14891fe2df8da5ca23d8c72a2047ff80c342668337009d6e924e31e5f678754 --gas-budget 1000000000

sui client transfer --to 0xd02c0676a9cd9d70e554b5c3ee8bd17cfe93792f6aaa327b02b096ac3359a210 --object-id 0xaeb77d1785ec0c81e24810533fdca7477c7dae36306efa6b2c7bd8bbe9292cdd --gas-budget 1000000000