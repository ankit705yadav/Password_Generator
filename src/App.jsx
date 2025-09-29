import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+";
    for (let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
    setCopied(false);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed, generatePassword]);

  const copyToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-lg w-full rounded-2xl bg-gray-800 p-8 shadow-2xl text-orange-500">
        <h1 className="text-3xl text-orange-300 font-bold text-center mb-8">
          Password Generator
        </h1>
        <div className="flex mb-6 shadow rounded-lg overflow-hidden">
          <input
            type="text"
            value={password}
            className="w-full py-2 px-4 text-lg outline-none bg-gray-900 text-orange-400 font-mono rounded-l-lg"
            ref={passwordRef}
            readOnly
            placeholder="Password"
          />
          <button
            onClick={copyToClipboard}
            className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 font-semibold rounded-r-lg transition-colors"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <div className="space-y-6">
          <div className="flex items-center gap-x-3">
            <label htmlFor="length" className="text-white">
              Length:
            </label>
            <input
              type="range"
              min={6}
              max={50}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="accent-orange-500"
            />
            <span className="font-mono text-orange-300">{length}</span>
          </div>
          <div className="flex items-center gap-x-3">
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
              id="number"
              className="accent-orange-500 scale-110"
            />
            <label htmlFor="number" className="text-white select-none">
              Numbers
            </label>
          </div>
          <div className="flex items-center gap-x-3">
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
              id="charInput"
              className="accent-orange-500 scale-110"
            />
            <label htmlFor="charInput" className="text-white select-none">
              Special Characters
            </label>
          </div>
        </div>
        <p className="mt-8 text-xs text-center text-orange-400 opacity-80">
          Built with React & Tailwind CSS
        </p>
      </div>
    </div>
  );
}

export default App;
