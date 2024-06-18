import { useState } from "react";

function SortableTable({ current_data, previous_data }) {
    const [sortedData, setSortedData] = useState(current_data.chars);
    const [isSorted, setIsSorted] = useState(false);
  
    const sortTable = () => {
        if (isSorted) {
            setSortedData(current_data.chars);
            setIsSorted(false);
        } else {
            const sorted = [...sortedData].sort((a, b) => {
                const a_previous_char = previous_data && previous_data.chars ? previous_data.chars.find(pc => pc.char_id === a.char_id) : undefined;
                const b_previous_char = previous_data && previous_data.chars ? previous_data.chars.find(pc => pc.char_id === b.char_id) : undefined;
        
                const a_cp_gain = a_previous_char ? a.char_cp - a_previous_char.char_cp : 0;
                const b_cp_gain = b_previous_char ? b.char_cp - b_previous_char.char_cp : 0;
      
                return b_cp_gain - a_cp_gain;
            });
            setSortedData(sorted);
            setIsSorted(true);
        }
    };

  return (
    <>

        <div className="bg-gray-800 text-white m-4">
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={sortTable}>Sort by CP Gain</button>
            <table className="table-auto w-3/4 mx-auto">
                <thead>
                    <tr className="text-orange-300">
                        <th className="text-lg font-bold text-left pb-4"></th>
                        <th className="text-lg font-bold text-left pb-4">Name</th>
                        <th className="text-lg font-bold text-left pb-4 pl-3 pr-3">Power</th>
                        <th className="text-lg font-bold text-left pb-4 pl-3 pr-3">Level</th>
                        <th className="text-lg font-bold text-left pb-4">Pet</th>
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
                            <tr className="text-neutral-300 border-t border-gray-700">
                                <td className="text-right text-slate-500 pr-1">{index + 1}</td> 
                                <td>
                                    <div className="md:flex md:items-center">
                                        {!previous_char && <span className="text-sm text-red-500">NEW</span>}<span className="text-lg font-bold">{char.char_name}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className="md:flex md:items-center pl-3 pr-3">
                                        <span className="text-lg font-bold">{Number(char.char_cp).toLocaleString()}</span>
                                        <div className="md:ml-2">
                                            <span className={`text-sm ${cp_color}`}>{cp_arrow} {Number(cp_diff).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="md:flex md:items-center pl-3 pr-3">
                                        <span className="text-lg font-bold">{Number(char.char_level).toLocaleString()}</span>
                                        <div className="md:ml-2">
                                            <span className={`text-sm ${level_color}`}>{level_arrow} {Number(level_diff).toLocaleString()}</span>
                                        </div>
                                        
                                    </div>
                                </td>
                                <td>
                                    <div className="md:flex md:items-center">
                                        <span className="text-lg font-bold">{Number(char.pet_level).toLocaleString()}</span>
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
    </>
  );
}

export default SortableTable;