
import React, { useState, useEffect } from 'react';

interface AuthGateProps {
  onSuccess: () => void;
}

const AuthGate: React.FC<AuthGateProps> = ({ onSuccess }) => {
  const [password, setPassword] = useState('*****');
  const [status, setStatus] = useState<'idle' | 'checking' | 'success' | 'error'>('idle');
  const [isVisible, setIsVisible] = useState(false);

  const TARGET_PASSWORD = 'STARS';

  useEffect(() => {
    setIsVisible(true);
    
    // 1. スキャン開始までの溜め (非常に短く)
    const startTimer = setTimeout(() => {
      handleAutoSubmit();
    }, 400);

    return () => clearTimeout(startTimer);
  }, []);

  const handleAutoSubmit = async () => {
    setStatus('checking');
    
    // 2. 認証スキャン演出 (スリットアニメーションのような時間を想定)
    await new Promise(resolve => setTimeout(resolve, 800));

    // 認証完了時に本来のパスワードをパッと表示
    setPassword(TARGET_PASSWORD);
    setStatus('success');
    
    // 3. 成功サインを表示してからメインページへ
    setTimeout(() => {
      onSuccess();
    }, 800);
  };

  return (
    <div className={`fixed inset-0 z-[200] bg-brand-black flex items-center justify-center transition-all duration-1000 ${status === 'success' ? 'bg-white' : ''}`}>
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(197,160,89,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(197,160,89,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      </div>

      <div className={`relative w-full max-w-md px-8 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        
        {/* Status Indicator */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className={`w-2 h-2 rounded-full ${status === 'checking' ? 'bg-brand-gold animate-ping' : status === 'success' ? 'bg-green-500' : 'bg-brand-gold'}`} />
            <span className="text-[10px] font-mono tracking-[0.5em] text-brand-gold uppercase font-bold">
              {status === 'checking' ? 'Bypassing Security...' : 
               status === 'success' ? 'Access Granted' : 'Encrypted Gate'}
            </span>
          </div>
          <h2 className={`text-2xl md:text-3xl font-display font-bold transition-colors duration-500 ${status === 'success' ? 'text-brand-black' : 'text-white'}`}>
            {status === 'success' ? 'SYSTEM UNLOCKED' : 'SYSTEM AUTHENTICATION'}
          </h2>
        </div>

        {status !== 'success' ? (
          <div className="space-y-8">
            <div className="relative group">
              <div className={`w-full bg-transparent border-b-2 py-4 px-2 text-center font-mono tracking-[0.5em] transition-all duration-500 min-h-[60px] flex items-center justify-center ${status === 'checking' ? 'text-brand-goldLight border-brand-gold' : 'text-white border-neutral-800'}`}>
                {password}
                {status === 'checking' && (
                  <div className="absolute inset-0 bg-brand-gold/5 animate-pulse overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-brand-gold/40 animate-scan-line" />
                  </div>
                )}
              </div>
              <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-brand-gold transition-all duration-500 ${status === 'checking' ? 'w-full opacity-100' : 'w-0 opacity-0'}`} />
            </div>

            <div
              className={`w-full py-5 text-[10px] font-mono font-bold tracking-[0.6em] uppercase transition-all duration-500 relative overflow-hidden text-center text-white`}
            >
              <span className="relative z-10">
                {status === 'checking' ? 'Verifying Credentials...' : 'Establishing Secure Link'}
              </span>
              <div className={`absolute inset-0 bg-brand-gold/20 transition-transform duration-500 translate-y-full ${status === 'checking' ? 'translate-y-0' : ''}`} />
            </div>
            
            <p className="text-[9px] text-center text-neutral-600 font-mono tracking-widest leading-loose uppercase">
              Secure Session Active<br />
              Authorized Protocol: STARS_V2
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center animate-spring-up">
            <div className="w-20 h-20 rounded-full border-2 border-brand-gold flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(197,160,89,0.4)] bg-brand-gold/10">
              <div className="w-12 h-12 bg-brand-gold rounded-full flex items-center justify-center animate-pulse">
                <span className="text-white text-2xl font-bold">★</span>
              </div>
            </div>
            <div className="space-y-4 text-center">
              <p className="text-brand-gold font-mono text-[10px] tracking-[0.8em] uppercase font-bold animate-fade-in">Welcome to Stars.</p>
              <div className="h-px w-32 bg-brand-gold/30 mx-auto animate-grow-x" />
            </div>
          </div>
        )}
      </div>

      {/* Success Flash Effect */}
      {status === 'success' && (
        <div className="absolute inset-0 bg-brand-gold opacity-0 animate-flash-gold pointer-events-none" />
      )}

      <style>{`
        @keyframes scan-line {
          0% { transform: translateY(0); }
          100% { transform: translateY(60px); }
        }
        .animate-scan-line {
          animation: scan-line 1s linear infinite;
        }
        @keyframes spring-up {
          0% { opacity: 0; transform: translateY(20px) scale(0.9); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-spring-up {
          animation: spring-up 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
        }
        @keyframes grow-x {
          from { width: 0; opacity: 0; }
          to { width: 128px; opacity: 1; }
        }
        .animate-grow-x {
          animation: grow-x 1.2s ease-out forwards;
        }
        @keyframes flash-gold {
          0% { opacity: 0; }
          10% { opacity: 0.9; }
          100% { opacity: 0; }
        }
        .animate-flash-gold {
          animation: flash-gold 1.8s ease-out forwards;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default AuthGate;
