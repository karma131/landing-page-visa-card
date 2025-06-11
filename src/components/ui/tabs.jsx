// src/components/ui/tabs.jsx
import React, { useState } from "react";

export function Tabs({ defaultValue, children }) {
  const [active, setActive] = useState(defaultValue);
  const triggers = [];
  const contents = [];

  React.Children.forEach(children, (child) => {
    if (child.type.displayName === "TabsTrigger") {
      triggers.push(
        React.cloneElement(child, {
          isActive: child.props.value === active,
          onClick: () => setActive(child.props.value),
        })
      );
    }
    if (child.type.displayName === "TabsContent" && child.props.value === active) {
      contents.push(child);
    }
  });

  return (
    <div>
      <div className="flex border-b space-x-4">{triggers}</div>
      <div className="mt-4">{contents}</div>
    </div>
  );
}

export function TabsList({ children }) {
  return <div className="flex space-x-4">{children}</div>;
}

export function TabsTrigger({ value, children, isActive, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium border-b-2 transition-all duration-200 ${
        isActive ? "border-red-600 text-red-600" : "border-transparent text-gray-500 hover:text-red-600"
      }`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ children }) {
  return <div>{children}</div>;
}

TabsTrigger.displayName = "TabsTrigger";
TabsContent.displayName = "TabsContent";
