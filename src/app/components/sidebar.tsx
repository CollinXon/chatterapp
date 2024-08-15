import React from "react";

const ScrollingNews = () => {
  const newsItems = [
    "Breaking News: Market hits new highs",
    "Sports: Local team wins championship",
    "Weather: Sunny days ahead this week",
    "Entertainment: New movie release breaks records",
    "Technology: New smartphone model unveiled",
    "Politics: Election results announced",
    "Health: New research on mental health",
    "Travel: Top destinations for 2024",
    "Economy: Inflation rates decrease",
    "Science: Space mission successful",
    
  ];

  return (
    <div className="relative overflow-hidden  w-5/12 bg-gray-100">
      <div className="absolute top-0 animate-scroll">
        <ul className="space-y-4">
          {newsItems.map((item, index) => (
            <li key={index} className="bg-gray-200 p-4 rounded">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ScrollingNews;
