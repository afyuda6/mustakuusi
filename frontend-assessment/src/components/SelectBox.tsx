import React from "react";
import {
    MapPin,
    Building2,
    Landmark,
} from "lucide-react";

interface Option {
    id: number | string;
    name: string;
}

interface SelectBoxProps {
    label: string;
    name: string;
    value: string;
    options: Option[];
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectBox({
                                      label,
                                      name,
                                      value,
                                      options,
                                      onChange,
                                  }: SelectBoxProps) {
    const getIcon = () => {
        switch (name) {
            case "province":
                return <Landmark className="w-4 h-4 text-gray-500" />;
            case "regency":
                return <Building2 className="w-4 h-4 text-gray-500" />;
            case "district":
                return <MapPin className="w-4 h-4 text-gray-500" />;
            default:
                return null;
        }
    };

    return (
        <div className="mb-6">
            <label className="text-xs font-semibold text-gray-400 tracking-widest block mb-2">
                {label}
            </label>
            <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    {getIcon()}
                </span>
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    className="w-full appearance-none bg-white border border-gray-200 rounded-2xl pl-10 pr-10 py-3.5 text-sm text-gray-700 font-medium shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none transition-all duration-150 cursor-pointer hover:border-gray-300 hover:shadow-md"
                >
                    <option value="">Pilih {label}</option>
                    {options.map((opt: Option) => (
                        <option key={opt.id} value={opt.id}>
                            {opt.name}
                        </option>
                    ))}
                </select>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6"/>
                </svg>
            </div>
        </div>
    );
}