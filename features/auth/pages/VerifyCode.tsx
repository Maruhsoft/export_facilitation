
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout';

const VerifyCode: React.FC = () => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [countdown, setCountdown] = useState(5);
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = countdown > 0 && setInterval(() => setCountdown(countdown - 1), 1000);
        return () => clearInterval(timer);
    }, [countdown]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;
        if (/^[0-9]$/.test(value) || value === '') {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Move to next input
            if (value && index < 3) {
                inputsRef.current[index + 1]?.focus();
            }
        }
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleProceed = (e: React.FormEvent) => {
        e.preventDefault();
        const code = otp.join('');
        if (code.length === 4) {
            // Handle verification logic
            navigate('/dashboard');
        } else {
            alert('Please enter the full code.');
        }
    };
    
    const handleResend = () => {
        setCountdown(5);
        // Handle resend logic
    }

    return (
        <AuthLayout>
            <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">Verification Code</h1>
                <p className="text-gray-500 mb-8">
                    We have sent a verification code to <span className="font-bold text-gray-800">johndoe@gmail.com</span>.
                </p>
                
                <form onSubmit={handleProceed}>
                    <div className="flex justify-center gap-4 mb-8">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                ref={el => { inputsRef.current[index] = el; }}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="w-16 h-16 text-center text-2xl font-semibold border border-gray-300 rounded-lg focus:ring-brand-green focus:border-brand-green"
                            />
                        ))}
                    </div>

                    <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                        Proceed
                    </button>
                </form>

                <p className="mt-6 text-sm text-gray-500">Didn't receive the verification code? it could take a bit of time.</p>
                {countdown > 0 ? (
                    <p className="mt-2 text-sm text-gray-500">Request new code in {countdown} seconds</p>
                ) : (
                    <button onClick={handleResend} className="mt-2 font-semibold text-brand-green hover:underline">
                        Resend Code
                    </button>
                )}
            </div>
        </AuthLayout>
    );
};

export default VerifyCode;
