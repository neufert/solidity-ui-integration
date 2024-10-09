// DOM elements
const connectWalletButton = document.getElementById('connectWalletButton');
const walletStatusDiv = document.getElementById('walletStatus');

// Wallet installation status
let isWalletInstalled = false;

// Check if MetaMask (or another Ethereum wallet) is installed
function checkWalletInstalled() {
    if (typeof window.ethereum !== 'undefined') {
        isWalletInstalled = true;
        console.log('Wallet is installed');
        // Initialize Web3 using the new provider
        window.web3 = new Web3(window.ethereum);
    } else {
        console.log('Wallet is not installed');
        connectWalletButton.style.display = 'block'; // show the connect button
    }
}
checkWalletInstalled();

// Update wallet UI: Show account address and balance
async function updateWalletUI(account) {
    console.log('Wallet connected:', account);

    // Show wallet status
    walletStatusDiv.style.display = 'block';

    // Update account address
    document.getElementById('accountAddress').innerText = account;

    try {
        // Get and display balance
        const balance = await window.web3.eth.getBalance(account);
        const etherBalance = window.web3.utils.fromWei(balance, 'ether');
        document.getElementById('accountBalance').innerText = etherBalance + ' ETH';

        // Hide the connect button
        connectWalletButton.style.display = 'none';
    } catch (error) {
        console.error('Error fetching balance:', error);
    }
}

// Automatically check for connected account on page load
window.onload = async function () {
    if (isWalletInstalled) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            if (accounts.length > 0) {
                await updateWalletUI(accounts[0]);
            }
        } catch (error) {
            console.error('Error checking wallet connection:', error);
        }
    }
}

// Connect wallet on button click
async function connectWallet() {
    if (isWalletInstalled) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            if (accounts.length > 0) {
                await updateWalletUI(accounts[0]);
            }
        } catch (error) {
            console.error('Error connecting wallet:', error);
        }
    } else {
        console.log('Wallet is not connected.');
    }
}
connectWalletButton.addEventListener('click', connectWallet);

// Listen for account changes
if (isWalletInstalled) {
    window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
            updateWalletUI(accounts[0]);
        } else {
            walletStatusDiv.style.display = 'none'; // Hide wallet status
            connectWalletButton.style.display = 'block'; // Show the connect button
            connectWalletButton.disabled = false;
        }
    });
}
