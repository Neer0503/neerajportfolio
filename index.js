import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../components/ui/card";
import { FaEnvelope, FaPhone, FaLinkedin } from "react-icons/fa";
import Image from "next/image";

export default function Portfolio() {
  const [showBot, setShowBot] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello, I’m Neeraj’s portfolio assistant. Let me walk you through his profile!" },
  ]);
  const [input, setInput] = useState("");

  useEffect(() => {
    document.title = "Neeraj Singh | Portfolio";
    startWalkthrough();
  }, []);

  const speak = (text) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.pitch = 1;
      utterance.rate = 1;
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(v => v.name.toLowerCase().includes("female") || v.name.toLowerCase().includes("woman"));
      if (femaleVoice) utterance.voice = femaleVoice;
      window.speechSynthesis.speak(utterance);
    }
  };

  const startWalkthrough = () => {
    const walkthrough = [
      "About Me: Neeraj is a motivated Civil Services aspirant passionate about governance, public policy, and decision-making.",
      "Education: Pursuing B.Sc. (General Science) from IGNOU, Delhi (2022–2025) with certifications in Cultural Anthropology, Governance, and Time Management.",
      "Skills: Policy Analysis & Research, Governance & Administration, Public Affairs & Social Impact, Research Writing, Current Affairs Analysis, and Communication Skills.",
      "Projects: Federalism & Governance (centre-state relations), Climate Policy in India (commitments & outcomes), Grassroots Democracy (Panchayati Raj empowerment).",
      "Contact: You can reach Neeraj at bishtneer372@gmail.com or call 7455813039."
    ];

    walkthrough.forEach((msg, index) => {
      setTimeout(() => {
        setMessages(prev => [...prev, { sender: "bot", text: msg }]);
        speak(msg);
      }, (index + 1) * 5000);
    });
  };

  const responses = {
    skills: "Neeraj’s key skills include Policy Analysis & Research, Governance & Administration, Public Affairs & Social Impact, Research Writing, Current Affairs Analysis, and Communication Skills.",
    projects: "Neeraj has worked on projects like: Federalism & Governance (centre-state relations), Climate Policy in India (review of commitments), and Grassroots Democracy (Panchayati Raj empowerment).",
    education: "Neeraj is pursuing a B.Sc. (General Science) from IGNOU, Delhi (2022–2025) and has certifications in Cultural Anthropology, Identity Governance, and Time Management.",
    about: "Neeraj is a motivated Civil Services aspirant passionate about governance, public policy, and evidence-based decision-making.",
    contact: "You can reach Neeraj at bishtneer372@gmail.com or call 7455813039."
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages([...messages, userMsg]);

    let reply = "I’m not sure about that. Try asking about skills, projects, education, or contact.";
    const lower = input.toLowerCase();
    if (lower.includes("skill")) reply = responses.skills;
    else if (lower.includes("project")) reply = responses.projects;
    else if (lower.includes("education")) reply = responses.education;
    else if (lower.includes("about")) reply = responses.about;
    else if (lower.includes("contact")) reply = responses.contact;

    setMessages(prev => [...prev, userMsg, { sender: "bot", text: reply }]);
    speak(reply);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800">
      <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-center py-12">
        <img src="/photo.jpg" alt="Neeraj Singh" className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg border-4 border-indigo-200" />
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-700">Welcome to Neeraj's Portfolio</h1>
        <p className="mt-2 text-lg text-gray-600">Civil Services Aspirant | Governance & Policy Enthusiast | Research Professional</p>
      </motion.div>

      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-6">
        <Card><CardContent><h2 className="text-xl font-semibold text-indigo-600 mb-3">About Me</h2><p>Motivated and disciplined Civil Services aspirant with a deep interest in governance, public policy, and evidence-based decision-making. Skilled in policy analysis, research writing, and issue analysis.</p></CardContent></Card>

        <Card><CardContent><h2 className="text-xl font-semibold text-indigo-600 mb-3">Education & Certifications</h2><ul className="list-disc pl-5 space-y-1"><li>B.Sc. (General Science), IGNOU, Delhi (2022–2025)</li><li>Diploma in Cultural Anthropology – Alison</li><li>Identity Governance – Infosys Springboard</li><li>Time Management – Atingi.org</li><li>Volunteer Program – 38th National Games Uttarakhand 2025</li></ul></CardContent></Card>

        <Card><CardContent><h2 className="text-xl font-semibold text-indigo-600 mb-3">Key Skills</h2><div className="grid grid-cols-2 gap-2 text-sm"><span>• Policy Analysis & Research</span><span>• Governance & Administration</span><span>• Public Affairs & Social Impact</span><span>• Research Writing</span><span>• Current Affairs Analysis</span><span>• Time & Resource Management</span><span>• Communication Skills</span></div></CardContent></Card>

        <Card><CardContent><h2 className="text-xl font-semibold text-indigo-600 mb-3">Projects & Research</h2><ul className="list-disc pl-5 space-y-1 text-sm"><li><b>Federalism & Governance:</b> Centre-state relations in India</li><li><b>Climate Policy in India:</b> Review of environmental commitments</li><li><b>Grassroots Democracy:</b> Panchayati Raj and rural empowerment</li></ul></CardContent></Card>
      </div>

      <div className="text-center py-8">
        <h3 className="text-lg font-semibold mb-2">Let's Connect</h3>
        <div className="flex justify-center space-x-6 text-indigo-600 text-xl">
          <a href="mailto:bishtneer372@gmail.com"><FaEnvelope /></a>
          <a href="tel:+917455813039"><FaPhone /></a>
          <a href="https://linkedin.com" target="_blank"><FaLinkedin /></a>
        </div>
      </div>

      <div className="fixed bottom-6 right-6">
        {!showBot && (<button onClick={() => setShowBot(true)} className="rounded-full shadow-lg"><Image src="/female-avatar.png" alt="AI Assistant" width={60} height={60} className="rounded-full border-2 border-indigo-400 hover:scale-105 transition-transform" /></button>)}

        {showBot && (<motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="bg-white w-80 h-96 shadow-lg rounded-xl flex flex-col">
          <div className="bg-indigo-600 text-white p-3 rounded-t-xl font-semibold flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Image src="/female-avatar.png" alt="AI Assistant" width={28} height={28} className="rounded-full" />
              <span>Portfolio Assistant</span>
            </div>
            <button onClick={() => setShowBot(false)}>✖</button>
          </div>
          <div className="flex-1 p-3 overflow-y-auto text-sm space-y-2">
            {messages.map((msg, i) => (
              <div key={i} className={msg.sender === "bot" ? "text-left" : "text-right"}>
                <span className={`inline-block px-3 py-2 rounded-lg ${msg.sender === "bot" ? "bg-indigo-100 text-gray-800" : "bg-indigo-600 text-white"}`}>{msg.text}</span>
              </div>
            ))}
          </div>
          <div className="p-2 border-t flex items-center space-x-1">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSend()} className="flex-1 border rounded-l px-2 py-1 text-sm" placeholder="Ask about skills, projects..." />
            <button onClick={handleSend} className="bg-indigo-600 text-white px-3 rounded-r">Send</button>
          </div>
          <div className="p-2 border-t text-center">
            <button onClick={startWalkthrough} className="text-indigo-600 text-sm font-semibold hover:underline">▶ Restart Walkthrough</button>
          </div>
        </motion.div>)}
      </div>
    </div>
  );
}