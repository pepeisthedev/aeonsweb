import React, { useState } from 'react';
import "./CheckWallet.css"

type ResponseType = {
    VIP?: string;
    FCFS?: string;
    error?: string;
};

const CheckWallet = () => {
    const [address, setAddress] = useState('');
    const [response, setResponse] = useState<ResponseType | null>(null); // Declare the type of response here
    const [error, setError] = useState<string | null>(null);

    const validateAddress = (address: string) => {
        if (!address) {
            return 'Wallet address is required';
        }
        if (!address.startsWith('bc1')) {
            return 'Wallet address must start with "bc1"';
        }
        if (address.length < 40 || address.length > 70) {
            return 'Not a valid BTC address';
        }
        return null;
    };

    const handleClick = async () => {
        setResponse(null);
        const validationError = validateAddress(address);
        if (validationError) {
            setError(validationError);
            return;
        }
        try {
            const res = await fetch('/api/checkwallet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ address }),
            });
            const data = await res.json();
            setResponse(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-9xl mb-8">
                <span className="aeons-white">CHE</span><span className="aeons-yellow">CK </span><span
                className="aeons-white">WALL</span><span className="aeons-yellow">ET</span>
            </h1>
            <div>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => {
                        setAddress(e.target.value);
                        setError(null); // Reset the error state when the input value changes
                    }}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleClick();
                        }
                    }}
                    placeholder="Enter your wallet address"

                    className="mb-4 p-2 input-wallet "
                />
                <button onClick={handleClick} className="ml-3 button-style">
                    Submit
                </button>
            </div>
            {error && (
                <div className="congrats">
                    {error}
                </div>
            )}
            {response && (
                <div>
                    {response.VIP === '1' && <p className="congrats">Congratulations, your wallet qualifies for 1 <span
                        className="aeons-yellow">VIP mint</span> and
                        1 <span className="aeons-orange">FCFS mint</span>.</p>}
                    {response.VIP !== '1' && response.FCFS === '1' && <p className="congrats">Congratulations, your wallet qualifies for 1 <span className="aeons-orange">FCFS mint</span>.
                    </p>}
                    {response.VIP !== '1' && response.FCFS !== '1' && <p className="to-bad">Your wallet doesn´t qualify for the mint. It may take up to 72 hours for the team to update your wallet if you have won it through a giveaway. If you think theres a mistake, get in touch with us through a ticket on the discord.</p>}
                </div>
            )}
        </div>
    );
};

export default CheckWallet;