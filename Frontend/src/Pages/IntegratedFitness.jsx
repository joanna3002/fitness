import React, { useState } from "react"; 
export default function IntegratedFitness() { 
const [tab, setTab] = useState("meal"); 
const [gender, setGender] = useState("female"); 
const [allergies, setAllergies] = useState([]); 
const backendUrl = process.env.REACT_APP_BACKEND_URL

// --- MEAL PLANNER --- 
const [mealInput, setMealInput] = useState(""); 
const [mealPlan, setMealPlan] = useState(null); 
const meals = { 
affordable: { 
female: { breakfast: ["Oats + banana","Boiled egg + toast","Fruit yogurt"], lunch:["Tuna rice bowl","Vegetable pasta","Chicken salad"], dinner:["Soup + veggies","Rice + tofu","Egg fried rice"] }, 
male: { breakfast:["Peanut butter toast","Omelette + rice","Protein oatmeal"], lunch:["Chicken rice","Pork stir fry","Beef & veggies"], dinner:["Rice + meat","Veggie stir fry + egg","Soup + chicken"] }, 
}, 
muscle: { 
female: { breakfast:["Protein smoothie","Oats + berries","Egg whites + toast"], lunch:["Chicken quinoa","Salmon & veggies","Beef wrap"], dinner:["Rice + chicken breast","Turkey bowl","Pasta + tuna"] }, 
male: { breakfast:["Oats + whey","Eggs + bagel","Protein shake + toast"], lunch:["Steak rice bowl","Chicken pasta","Beef burrito"], dinner:["High-protein ramen","Rice + salmon","Chicken sweet potato"] }, 
}, 
weightloss: { 
female: { breakfast:["Low-cal yogurt","Fruit bowl","Egg white omelette"], lunch:["Salad + tuna","Chicken wrap","Vegetable bowl"], dinner:["Soup + veggies","Rice + tofu","Low-cal pasta"] }, 
male: { breakfast:["Greek yogurt","Boiled eggs","Smoothie"], lunch:["Chicken salad","Fish + veggies","Tuna wrap"], dinner:["Veggie soup","Rice + chicken","Stir fry bowl"] }, 
}, 
}; 
const pick = arr => arr[Math.floor(Math.random() * arr.length)]; 
const generateMealPlan = () => { 
if (!mealInput.trim()) return; 
let category = "affordable"; 
const lower = mealInput.toLowerCase(); 
if (lower.includes("muscle")) category = "muscle"; 
else if (lower.includes("weight")) category = "weightloss"; 
else if (lower.includes("cheap")) category = "affordable"; 
const selectedMeals = meals[category][gender]; 
const week = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"].reduce((acc, day) => { 
acc[day] = { 
breakfast: pick(selectedMeals.breakfast), 
lunch: pick(selectedMeals.lunch), 
dinner: pick(selectedMeals.dinner) 
}; 
return acc; 
}, {}); 
setMealPlan({ request: mealInput, category, week }); 
setMealInput(""); 
}; 
// --- WORKOUT PLANNER --- 
const [workoutInput, setWorkoutInput] = useState(""); 
const [workoutPlan, setWorkoutPlan] = useState(""); 
const generateWorkoutPlan = async () => { 
if (!workoutInput.trim()) return; 
try { 
const res = await fetch(`${backendUrl}/api/fitness`, { 
method:"POST", 
headers:{ "Content-Type":"application/json" }, 
body:JSON.stringify({ prompt: workoutInput, gender, allergies }) 
}); 
const data = await res.json(); 
setWorkoutPlan(data.reply || "No workout generated."); 
} catch { 
setWorkoutPlan("Failed to generate workout plan."); 
} 
setWorkoutInput(""); 
}; 
// --- CHAT COACH --- 
const [chatInput, setChatInput] = useState(""); 
const [messages, setMessages] = useState([]); 
const [isTyping, setIsTyping] = useState(false); 
const pushMessage = (msg) => { 
setMessages(prev => { 
const newMessages = [...prev, msg]; 
return newMessages.slice(-15); // keep last 15 messages 
}); 
}; 
const handleSendChat = async () => { 
const trimmed = chatInput.trim(); 
if (!trimmed) return; 
pushMessage({ role: "user", content: trimmed }); 
setChatInput(""); 
setIsTyping(true); 
try { 
const res = await fetch(`${backendUrl}/api/fitness`, { 
method: "POST", 
headers: { "Content-Type": "application/json" }, 
body: JSON.stringify({ prompt: trimmed, gender, allergies, messages }) 
}); 
const data = await res.json(); 
pushMessage({ role: "assistant", content: data.reply || "I got your message!" }); 
} catch { 
pushMessage({ role: "assistant", content: "Can't reach AI backend." }); 
} finally { setIsTyping(false); } 
}; 
// --- Format AI chat responses --- 
const renderAIContent = (text) => { 
return text.split("\n").map((line, idx) => { 
if (line.startsWith("###")) return <h4 key={idx} style={{ color:"#00e676" }}>{line.replace(/###\s*/,"")}</h4>; 
if (line.startsWith("- ")) return <li key={idx}>{line.replace("- ","")}</li>; 
return <div key={idx}>{line}</div>; 
}); 
}; 
// --- RENDER --- 
return ( 
<div style={{ maxWidth: 1000, margin:"20px auto", padding:20, background:"#121212", borderRadius:12, color:"#eee" }}> 
<h2>AI Fitness Platform</h2> 
{/* Gender & Allergies */} 
<div style={{ display:"flex", gap:10, marginBottom:20 }}> 
<button onClick={()=>setGender("female")} style={{ flex:1, padding:10, background:gender==="female"?"#00e676":"#1a1a1a" }}>Female</button> 
<button onClick={()=>setGender("male")} style={{ flex:1, padding:10, background:gender==="male"?"#00e676":"#1a1a1a" }}>Male</button> 
<input value={allergies.join(",")} onChange={e=>setAllergies(e.target.value.split(","))} placeholder="Allergies (comma)" style={{ padding:10, flex:1 }}/> 
</div> 
{/* Tabs */} 
<div style={{ display:"flex", gap:10, marginBottom:20 }}> 
<button onClick={()=>setTab("meal")} style={{ flex:1, padding:10, background:tab==="meal"?"#00e676":"#1a1a1a" }}>Meal Planner</button> 
<button onClick={()=>setTab("workout")} style={{ flex:1, padding:10, background:tab==="workout"?"#00e676":"#1a1a1a" }}>Workout Planner</button> 
<button onClick={()=>setTab("chat")} style={{ flex:1, padding:10, background:tab==="chat"?"#00e676":"#1a1a1a" }}>ChatCoach</button> 
</div> 
{/* Conditional Tabs */} 
{tab==="meal" && ( 
<> 
<div style={{ display:"flex", gap:10, marginBottom:20 }}> 
<input value={mealInput} onChange={e=>setMealInput(e.target.value)} placeholder='Ex: "affordable meals"' style={{ flex:1, padding:10 }} onKeyDown={e=>e.key==="Enter" && generateMealPlan()}/> 
<button onClick={generateMealPlan} style={{ padding:"10px 18px", background:"#0f8b3c", color:"#b8ffcc" }}>Generate</button> 
</div> 
{mealPlan && <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:10 }}> 
{Object.entries(mealPlan.week).map(([day, meals]) => ( 
<div key={day} style={{ background:"#1b1b1b", padding:12, borderRadius:10, border:"1px solid #333" }}> 
<h4 style={{ color:"#00e676", marginBottom:8 }}>{day}</h4> 
{["breakfast","lunch","dinner"].map((mtype) => ( 
<div key={mtype}> 
<b>{mtype.charAt(0).toUpperCase() + mtype.slice(1)}:</b>{" "} 
<input value={meals[mtype]} onChange={e=>{ 
const newWeek = {...mealPlan.week}; 
newWeek[day][mtype] = e.target.value; 
setMealPlan({...mealPlan, week: newWeek}); 
}} style={{ width:"100%", padding:4, margin:"2px 0", background:"#2a2a2a", color:"white", border:"none", borderRadius:4 }}/> 
</div> 
))} 
</div> 
))} 
</div>} 
</> 
)} 
{tab==="workout" && ( 
<> 
<div style={{ display:"flex", gap:10, marginBottom:20 }}> 
<input value={workoutInput} onChange={e=>setWorkoutInput(e.target.value)} placeholder='Ex: "3-day home workout"' style={{ flex:1, padding:10 }} onKeyDown={e=>e.key==="Enter" && generateWorkoutPlan()}/> 
<button onClick={generateWorkoutPlan} style={{ padding:"10px 18px", background:"#0f8b3c", color:"#b8ffcc" }}>Generate</button> 
</div> 
{workoutPlan && <pre style={{ whiteSpace:"pre-wrap", background:"#1b1b1b", padding:12, borderRadius:10 }}>{workoutPlan}</pre>} 
</> 
)} 
{tab==="chat" && ( 
<> 
<div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:20 }}> 
<div style={{ flex:1, maxHeight:300, overflowY:"auto", padding:10, background:"#1b1b1b", borderRadius:10 }}> 
{messages.map((m,i) => ( 
<div key={i} style={{ marginBottom:10, textAlign:m.role==="user"?"right":"left" }}> 
<div style={{ display:"inline-block", background:m.role==="user"?"#2ecc71":"#2a2a2a", color:m.role==="user"?"black":"white", padding:"8px 12px", borderRadius:12 }}> 
{renderAIContent(m.content)} 
</div> 
</div> 
))} 
{isTyping && <div style={{ fontStyle:"italic", opacity:0.7 }}>Coach is typing...</div>} 
</div> 
<div style={{ display:"flex", gap:10 }}> 
<input value={chatInput} onChange={e=>setChatInput(e.target.value)} placeholder="Ask your AI Coach..." style={{ flex:1, padding:10 }} onKeyDown={e=>e.key==="Enter" && handleSendChat()}/> 
<button onClick={handleSendChat} style={{ padding:"10px 18px", background:"#0f8b3c", color:"#b8ffcc" }}>Send</button> 
</div> 
</div> 
</> 
)} 
</div> 
); 
}
