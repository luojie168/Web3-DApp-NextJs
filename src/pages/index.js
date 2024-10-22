import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
    const [currentAccount, setCurrentAccount] = useState(null);
    const [toastMessage, setToastMessage] = useState('');
    const [isConnected, setIsConnected] = useState(false);


    useEffect(() => {
        checkMetaMask();
        connectWallet();
    }, []);

    const checkMetaMask = async () => {
        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed!');
            return true;
        } else {
            showToast('MetaMask is not installed. Please install it to use this DApp.');
        }
    };

    const connectWallet = async () => {
        const isMetaMaskInstalled = await checkMetaMask();
        if (!isMetaMaskInstalled) return;
        if (isConnected) return;


        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setCurrentAccount(accounts[0]);
            console.log('Connected account:', accounts[0]);
            showToast('Connected: ' + accounts[0]);
            setIsConnected(true);
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
            showToast('Error connecting to wallet. Please try again.');
        }
    };

    const disconnectWallet = () => {
        setCurrentAccount(null);
        showToast('Disconnected from wallet.');
        setIsConnected(false);
    };

    const showToast = (message) => {
        setToastMessage(message);
        setTimeout(() => {
            setToastMessage('');
        }, 3000);
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>My Web3 DApp</h1>
                <nav className={styles.nav}>
                    <a href="#about" className={styles.navLink}>About</a>
                    <a href="#features" className={styles.navLink}>Features</a>
                    <a href="#contact" className={styles.navLink}>Contact</a>
                </nav>
                <button
                    className={styles.connectButton}
                    onClick={currentAccount ? disconnectWallet : connectWallet}
                >
                    {currentAccount ? `${currentAccount.slice(0, 6)}...${currentAccount.slice(-4)}` : 'Connect Wallet'}
                </button>
            </header>

            <div className={styles.content}>
                <h2>Welcome to My Web3 DApp</h2>
                <p>This is a simple Web3 application using next js. You can connect your MetaMask wallet to interact with the blockchain.</p>
                <p>Explore the features and benefits of decentralized applications!</p>
            </div>

            <footer className={styles.footer}>
                <p>&copy; 2024 My Web3 DApp. All rights reserved.</p>
            </footer>

            {toastMessage && (
                <div className={styles.toast}>
                    {toastMessage}
                </div>
            )}
        </div>
    );
}
