```MERMAID
graph TD;
    A[Page Loads<br>Hide Wallet Info<br>Hide connect button]
    --> B{Is MetaMask Installed?};
    B -->|Yes| C[Check if Account is Connected];
    B -->|No| D[Show MetaMask Not Found];
    C -->|Yes| E[Display Wallet Info<br>Hide connect button];
    C -->|No| F[Wait for Connect Button Click];
    E --> G[Listen for Account Changes];
    G -->|Account Changed| H[Update New Account Info];
    G -->|Disconnected| I[Hide Wallet Info, Show Connect Button Again];
```