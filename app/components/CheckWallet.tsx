import React, { useState } from 'react';
import "./CheckWallet.css"

const CheckWallet = () => {
    const [address, setAddress] = useState('');
    const [response, setResponse] = useState({ VIP: '', FCFS: '' });

    const handleClick = async () => {
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
                    onChange={(e) => setAddress(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleClick();
                        }
                    }}
                    placeholder="Enter your wallet address"
                    style={{
                        backgroundColor: 'rgba(211, 211, 211, 0.5)',
                        width: '60vw',
                        borderRadius: '10px',
                        textAlign: 'center',
                        fontSize: '20px',
                        fontFamily: 'Helvetica',

                    }}
                    className="mb-4 p-2"
                />
                <button onClick={handleClick} className="ml-3 button-style">
                    Submit
                </button>
            </div>
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