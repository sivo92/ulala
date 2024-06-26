import { useState, useEffect } from "react";

import newMember from "../images/new.png";
import tank from "../images/tank.png";
import heal from "../images/heal.png";

function getClassColor(class_name) {
    switch(class_name) {
        case "Gladiator":
            return "text-red-500";
        case "Warrior":
            return "text-red-500";
        case "Druid":
            return "text-cyan-500";
        case "Shaman":
            return "text-violet-600";
        case "Hunter":
            return "text-yellow-600";
        case "Mage":
            return "text-cyan-500";
        case "Assassin":
            return "text-yellow-600";
        case "Warlock":
            return "text-violet-600";
        default:
            return "";
    }
}

function getClassIcon(class_name) {
    switch(class_name) {
        case "Tank":
            return <img src={tank.src} alt="tank" className="ml-1 mr-1 w-4 h-4" />;
        case "Healer":
            return <img src={heal.src} alt="heal" className="ml-1 mr-1 w-4 h-4" />;
        default:
            return "";
    }
}

function PowerList({ current_data, previous_data }) {
    const [sortedData, setSortedData] = useState(current_data.chars);
    const [isSortedByGains, setIsSortedByGains] = useState(false);
    const [sortConfig, setSortConfig] = useState({ key: "power", direction: "desc" });

    const sortByGains = () => {
        if (isSortedByGains) {
            setIsSortedByGains(false);
        } else {
            setIsSortedByGains(true);
        }

        const newUrl = new URL(window.location);
        newUrl.searchParams.set("g", !isSortedByGains);
        window.history.pushState({}, "", newUrl);
    };

    const sortBy = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
          direction = "desc";
        }
        setSortConfig({ key, direction });
        pushUrl(key, direction);
    };
    
    const pushUrl = (key, direction) => {
        const newDirection = direction === "desc" ? "desc" : "asc";
        const newUrl = new URL(window.location);
        newUrl.searchParams.set("k", key);
        newUrl.searchParams.set("d", newDirection);
        window.history.pushState({}, "", newUrl);
    }

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const sortKey = searchParams.get("k");
        const sortDirection = searchParams.get("d");
        const sortGains = searchParams.get("g");
        if (sortKey && sortDirection) {
            setSortConfig({ key: sortKey, direction: sortDirection });
        }
        if (sortGains === "true") {
            setIsSortedByGains(true);
        }
    }, []);

    useEffect(() => {
        if (isSortedByGains) {
            if (sortConfig.key === "name") {
                if (sortConfig.direction === "asc") {
                    const sorted = [...current_data.chars].sort((a, b) => a.char_name.localeCompare(b.char_name));
                    setSortedData(sorted);
                } else {
                    const sorted = [...current_data.chars].sort((a, b) => b.char_name.localeCompare(a.char_name));  
                    setSortedData(sorted);
                }  
            }

            if (sortConfig.key === "power") {
                if (sortConfig.direction === "asc") {
                    const sorted = [...sortedData].sort((a, b) => {
                        const a_previous_char = previous_data && previous_data.chars ? previous_data.chars.find(pc => pc.char_id === a.char_id) : undefined;
                        const b_previous_char = previous_data && previous_data.chars ? previous_data.chars.find(pc => pc.char_id === b.char_id) : undefined;
                
                        const a_cp_gain = a_previous_char ? a.char_cp - a_previous_char.char_cp : 0;
                        const b_cp_gain = b_previous_char ? b.char_cp - b_previous_char.char_cp : 0;
              
                        return a_cp_gain - b_cp_gain;
                    });                    
                    setSortedData(sorted);
                } else {
                    const sorted = [...sortedData].sort((a, b) => {
                        const a_previous_char = previous_data && previous_data.chars ? previous_data.chars.find(pc => pc.char_id === a.char_id) : undefined;
                        const b_previous_char = previous_data && previous_data.chars ? previous_data.chars.find(pc => pc.char_id === b.char_id) : undefined;
                
                        const a_cp_gain = a_previous_char ? a.char_cp - a_previous_char.char_cp : 0;
                        const b_cp_gain = b_previous_char ? b.char_cp - b_previous_char.char_cp : 0;
              
                        return b_cp_gain - a_cp_gain;
                    });                    
                    setSortedData(sorted);
                }  
            }

            if (sortConfig.key === "level") {
                if (sortConfig.direction === "asc") {
                    const sorted = [...sortedData].sort((a, b) => {
                        const a_previous_char = previous_data && previous_data.chars ? previous_data.chars.find(pc => pc.char_id === a.char_id) : undefined;
                        const b_previous_char = previous_data && previous_data.chars ? previous_data.chars.find(pc => pc.char_id === b.char_id) : undefined;
                
                        const a_level_gain = a_previous_char ? a.char_level - a_previous_char.char_level : 0;
                        const b_level_gain = b_previous_char ? b.char_level - b_previous_char.char_level : 0;
              
                        return a_level_gain - b_level_gain;
                    });                    
                    setSortedData(sorted);
                } else {
                    const sorted = [...sortedData].sort((a, b) => {
                        const a_previous_char = previous_data && previous_data.chars ? previous_data.chars.find(pc => pc.char_id === a.char_id) : undefined;
                        const b_previous_char = previous_data && previous_data.chars ? previous_data.chars.find(pc => pc.char_id === b.char_id) : undefined;
                
                        const a_level_gain = a_previous_char ? a.char_level - a_previous_char.char_level : 0;
                        const b_level_gain = b_previous_char ? b.char_level - b_previous_char.char_level : 0;
              
                        return b_level_gain - a_level_gain;
                    });                    
                    setSortedData(sorted);
                }  
            }

            if (sortConfig.key === "pet") {
                if (sortConfig.direction === "asc") {
                    const sorted = [...sortedData].sort((a, b) => {
                        const a_previous_char = previous_data && previous_data.chars ? previous_data.chars.find(pc => pc.char_id === a.char_id) : undefined;
                        const b_previous_char = previous_data && previous_data.chars ? previous_data.chars.find(pc => pc.char_id === b.char_id) : undefined;
                
                        const a_pet_gain = a_previous_char ? a.pet_level - a_previous_char.pet_level : 0;
                        const b_pet_gain = b_previous_char ? b.pet_level - b_previous_char.pet_level : 0;
              
                        return a_pet_gain - b_pet_gain;
                    });                    
                    setSortedData(sorted);
                } else {
                    const sorted = [...sortedData].sort((a, b) => {
                        const a_previous_char = previous_data && previous_data.chars ? previous_data.chars.find(pc => pc.char_id === a.char_id) : undefined;
                        const b_previous_char = previous_data && previous_data.chars ? previous_data.chars.find(pc => pc.char_id === b.char_id) : undefined;
                
                        const a_pet_gain = a_previous_char ? a.pet_level - a_previous_char.pet_level : 0;
                        const b_pet_gain = b_previous_char ? b.pet_level - b_previous_char.pet_level : 0;
              
                        return b_pet_gain - a_pet_gain;
                    });                    
                    setSortedData(sorted);
                }  
            }
        } else {
            if (sortConfig.key === "name") {
                if (sortConfig.direction === "asc") {
                    const sorted = [...current_data.chars].sort((a, b) => a.char_name.localeCompare(b.char_name));
                    setSortedData(sorted);
                } else {
                    const sorted = [...current_data.chars].sort((a, b) => b.char_name.localeCompare(a.char_name));  
                    setSortedData(sorted);
                }  
            }

            if (sortConfig.key === "power") {
                if (sortConfig.direction === "asc") {
                    const sorted = [...current_data.chars].sort((a, b) => a.char_cp - b.char_cp);
                    setSortedData(sorted);
                } else {
                    const sorted = [...current_data.chars].sort((a, b) => b.char_cp - a.char_cp);  
                    setSortedData(sorted);
                }  
            }

            if (sortConfig.key === "level") {
                if (sortConfig.direction === "asc") {
                    const sorted = [...current_data.chars].sort((a, b) => a.char_level - b.char_level);
                    setSortedData(sorted);
                } else {
                    const sorted = [...current_data.chars].sort((a, b) => b.char_level - a.char_level);  
                    setSortedData(sorted);
                }  
            }

            if (sortConfig.key === "pet") {
                if (sortConfig.direction === "asc") {
                    const sorted = [...current_data.chars].sort((a, b) => a.pet_level - b.pet_level);
                    setSortedData(sorted);
                } else {
                    const sorted = [...current_data.chars].sort((a, b) => b.pet_level - a.pet_level);  
                    setSortedData(sorted);
                }  
            }
        }
    }, [isSortedByGains, sortConfig]);

    return (
        <div className="bg-gray-800 p-2">
            <div className="flex justify-between w-full md:w-3/4 xl:w-2/4 mx-auto pt-5 pb-5">
                <div className="flex justify-start"> 
                    <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={isSortedByGains} onChange={sortByGains} />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className="ms-3 text-lg font-bold text-neutral-300">sort by gains</span>
                    </label>
                </div>
                <div className="flex justify-end text-lg font-bold text-neutral-300 items-center">
                    <a href="/power-lists" className="hover:underline">More Lists</a>
                </div>
            </div>
            <table className="table-auto w-full md:w-3/4 xl:w-2/4 mx-auto">
                <thead>
                    <tr className="text-orange-300">
                        <th className="text-lg font-bold text-left pb-4 pl-1 pr-1"></th>
                        <th className="text-lg font-bold text-left pb-4 pl-1 pr-1">
                            <button onClick={(e) => {e.preventDefault(); sortBy("name")}} className="hover:underline">
                                <span className="mr-0.5">Name</span>
                                {sortConfig.key === "name" && (
                                    sortConfig.direction === "asc" ? <span className="absolute">↑</span> : <span className="absolute">↓</span>
                                )}
                            </button>
                        </th>
                        <th className="text-lg font-bold text-left pb-4 pl-1 pr-1">
                            <button onClick={(e) => {e.preventDefault(); sortBy("power")}} className=" hover:underline">
                                <span className="mr-0.5">Power</span>
                                {sortConfig.key === "power" && (
                                    sortConfig.direction === "asc" ? <span className="absolute">↑</span> : <span className="absolute">↓</span>
                                )}
                            </button>
                        </th>
                        <th className="text-lg font-bold text-left pb-4 pl-1 pr-1">
                            <button onClick={(e) => {e.preventDefault(); sortBy("level")}} className="hover:underline">
                                <span className="mr-0.5">Level</span>
                                {sortConfig.key === "level" && (
                                    sortConfig.direction === "asc" ? <span className="absolute">↑</span> : <span className="absolute">↓</span>
                                )}
                            </button>
                        </th>
                        <th className="text-lg font-bold text-left pb-4 pl-1 pr-1">
                            <button onClick={(e) => {e.preventDefault(); sortBy("pet")}} className="hover:underline">
                                <span className="mr-0.5">Pet</span>
                                {sortConfig.key === "pet" && (
                                    sortConfig.direction === "asc" ? <span className="absolute">↑</span> : <span className="absolute">↓</span>
                                )}
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((char, index) => {
                        const previous_char = previous_data && previous_data.chars ? previous_data.chars.find(c => c.char_id === char.char_id) : undefined;    
                        const cp_diff = previous_char?.char_cp ? char.char_cp - previous_char.char_cp : 0;
                        const level_diff = previous_char?.char_level ? char.char_level - previous_char.char_level : 0;
                        const pet_diff = previous_char?.pet_level ? char.pet_level - previous_char.pet_level : 0;
                        
                        const cp_arrow = cp_diff > 0 ? "↑" : cp_diff < 0 ? "↓" : "=";
                        const level_arrow = level_diff > 0 ? "↑" : level_diff < 0 ? "↓" : "=";
                        const pet_arrow = pet_diff > 0 ? "↑" : pet_diff < 0 ? "↓" : "=";

                        const cp_color = cp_diff > 0 ? "text-green-500" : cp_diff < 0 ? "text-red-500" : "text-gray-500";
                        const level_color = level_diff > 0 ? "text-green-500" : level_diff < 0 ? "text-red-500" : "text-gray-500";
                        const pet_color = pet_diff > 0 ? "text-green-500" : pet_diff < 0 ? "text-red-500" : "text-gray-500";

                        return (
                            <tr className="text-neutral-300 border-t border-gray-700" key={index}>
                                <td className="text-right text-slate-500 pl-1 pr-1">{index + 1}</td> 
                                <td>
                                    <div className="flex items-center">
                                        <span className={`text-lg font-bold ${getClassColor(char.class_name)}`}>{char.char_name}</span>
                                        { getClassIcon(char.class_type) }
                                        {!previous_char && <img src={newMember.src} alt="new" className="ml-1 mr-1 w-4 h-4" /> }
                                    </div>
                                </td>
                                <td>
                                    <div className="md:flex md:items-center pl-1 pr-1">
                                        <span className="md:text-lg font-bold">{Number(char.char_cp).toLocaleString()}</span>
                                        <div className="md:ml-2">
                                            <span className={`text-sm ${cp_color}`}>{cp_arrow} {Number(cp_diff).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="md:flex md:items-center pl-1 pr-1">
                                        <span className="md:text-lg font-bold">{Number(char.char_level).toLocaleString()}</span>
                                        <div className="md:ml-2">
                                            <span className={`text-sm ${level_color}`}>{level_arrow} {Number(level_diff).toLocaleString()}</span>
                                        </div>
                                        
                                    </div>
                                </td>
                                <td>
                                    <div className="md:flex md:items-center pl-1 pr-1">
                                        <span className="md:text-lg font-bold">{Number(char.pet_level).toLocaleString()}</span>
                                        <div className="md:ml-2">
                                            <span className={`text-sm ${pet_color}`}>{pet_arrow} {Number(pet_diff).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default PowerList;