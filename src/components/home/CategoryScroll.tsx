"use client";

import { categories } from "@/lib/mockData";
import { useState } from "react";

interface CategoryScrollProps {
  onSelect?: (id: string) => void;
}

export default function CategoryScroll({ onSelect }: CategoryScrollProps) {
  const [selected, setSelected] = useState("all");

  const handleSelect = (id: string) => {
    setSelected(id);
    onSelect?.(id);
  };

  return (
    <div className="mt-3">
      <div className="flex gap-2 overflow-x-auto px-4 pb-1 scrollbar-none" style={{ scrollbarWidth: "none" }}>
        {categories.map((cat) => {
          const isActive = selected === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleSelect(cat.id)}
              className="flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-all"
              style={
                isActive
                  ? { backgroundColor: "var(--ck-primary)", color: "#fff" }
                  : { backgroundColor: "#F3F4F6", color: "#4B5563" }
              }
            >
              <span className="text-xs">{cat.emoji}</span>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
