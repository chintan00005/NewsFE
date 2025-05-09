import React from "react";

const BreakingNewsBanner = ({ headlines = [] }) => {
  const breakingTitle = headlines[0]?.title || "No breaking news at the moment.";

  return (
    <div className="bg-red-600 text-white text-sm my-4 py-3 px-4 w-full">
      <div className="overflow-hidden">
        <div
          className="inline-block whitespace-nowrap"
          style={{
            animation: "marquee 15s linear infinite",
            padding: "0.5rem 0", // direct fallback padding
          }}
        >
          🔴 {breakingTitle}
        </div>
      </div>
    </div>
  );
};

export default BreakingNewsBanner;
