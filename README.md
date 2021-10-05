# JS Bindings for the Solend protocol on Solana

- `/src` has everything necessary to build the instructions, including state and actual builders
- `/cli` has examples of how to use /src

To control cluster, adjust the program IDs inside of `cli/blockchain`. The instructions are agnostic and take cluster as a param. By default the IDs are set to `devnet`.
