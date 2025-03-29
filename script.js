import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChatGPT } from "@/components/ui/chatgpt";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const foodDatabase = {
  "Chicken Breast": { calories: 165, protein: 31 },
  "Rice (1 cup)": { calories: 205, protein: 4 },
  "Egg (1 large)": { calories: 70, protein: 6 },
  "Banana": { calories: 105, protein: 1.3 },
  "Chocolate Chip Cookie": { calories: 170, protein: 2 },
};

export default function CalorieTracker() {
  const [weight, setWeight] = useState(70);
  const [caloriesNeeded, setCaloriesNeeded] = useState(2500);
  const [chatMessages, setChatMessages] = useState([]);

  const calculateCalories = () => {
    const maintenance = weight * 35;
    setCaloriesNeeded(maintenance);
  };

  const askChatGPT = async () => {
    const response = await ChatGPT.ask(I am ${weight}kg. What should I eat to meet my daily calorie goal of ${caloriesNeeded} kcal?);
    setChatMessages([...chatMessages, { role: "AI", content: response }]);
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-r from-blue-400 to-purple-500 min-h-screen text-white">
      <h1 className="text-3xl font-bold text-center">Calorie & Nutrition Tracker</h1>
      <Card className="bg-white text-black p-4 rounded-lg shadow-lg">
        <CardContent className="space-y-4">
          <label className="block text-lg">Enter Your Weight (kg):</label>
          <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="text-lg p-2 rounded-md border border-gray-300" />
          <Button onClick={calculateCalories} className="bg-blue-600 text-white p-2 rounded-lg">Calculate Calories</Button>
          <p className="text-lg font-semibold">Estimated Daily Calories: {caloriesNeeded} kcal</p>
        </CardContent>
      </Card>

      <Card className="bg-white text-black p-4 rounded-lg shadow-lg">
        <CardContent className="space-y-4">
          <h2 className="text-2xl font-bold">Food Nutrition Info</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={Object.entries(foodDatabase).map(([name, data]) => ({ name, ...data }))}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="calories" fill="#ff7f50" />
              <Bar dataKey="protein" fill="#4682b4" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-white text-black p-4 rounded-lg shadow-lg">
        <CardContent className="space-y-4">
          <h2 className="text-2xl font-bold">AI Meal Advisor</h2>
          <Button onClick={askChatGPT} className="bg-purple-600 text-white p-2 rounded-lg">Ask ChatGPT</Button>
          {chatMessages.map((msg, index) => (
            <p key={index} className="text-lg p-2 border border-gray-300 rounded-md bg-gray-100">{msg.content}</p>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}