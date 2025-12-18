// utils/TimeBox.tsx
"use client";
import { motion } from "framer-motion";

interface TimeBoxProps {
    value: number;
    label: string;
}

const TimeBox = ({ value, label }: TimeBoxProps) => {
    const formattedValue = value.toString().padStart(2, '0');

    return (
        <div className="flex flex-col items-center">
            <motion.div
                key={formattedValue}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="bg-white text-gray-900 font-bold text-base px-2 py-1.5 rounded shadow-inner min-w-[2rem] text-center border border-gray-300"
            >
                {formattedValue}
            </motion.div>
            <span className="text-xs text-gray-600 mt-0.5 font-medium">{label}</span>
        </div>
    );
};

export default TimeBox;