// src/components/BirthDatePicker.jsx
import React, { useEffect, useState } from "react";

export default function BirthDatePicker({ value, onChange }) {
  const today = new Date();
  const years = Array.from({ length: 100 }, (_, i) => today.getFullYear() - i);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");

  // Khởi tạo từ `value` nếu có
  useEffect(() => {
    if (value) {
      const d = new Date(value);
      setDay(d.getDate().toString());
      setMonth(months[d.getMonth()]);
      setYear(d.getFullYear().toString());
    }
  }, [value]);

const handleChange = (type, val) => {
  const newDay = type === "day" ? val : day;
  const newMonth = type === "month" ? val : month;
  const newYear = type === "year" ? val : year;

  setDay(newDay);
  setMonth(newMonth);
  setYear(newYear);

  if (newDay && newMonth && newYear) {
    const mIdx = months.indexOf(newMonth);
    const iso = new Date(`${newYear}-${mIdx + 1}-${newDay}`).toISOString();
    onChange(iso);
  }
};
  return (
    <div className="flex gap-2">
      <select value={month} onChange={(e) => handleChange("month", e.target.value)} className="border px-2 py-1 rounded">
        <option value="">Month</option>
        {months.map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>

      <select value={day} onChange={(e) => handleChange("day", e.target.value)} className="border px-2 py-1 rounded">
        <option value="">Day</option>
        {days.map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>

      <select value={year} onChange={(e) => handleChange("year", e.target.value)} className="border px-2 py-1 rounded">
        <option value="">Year</option>
        {years.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
    </div>
  );
}
