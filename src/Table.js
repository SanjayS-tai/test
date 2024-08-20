import React,{useState} from 'react';
import './App.css';

const Table = () => {
    const [data,setData] = useState([]);
    const [newData,setNewData] =useState({name:"",job:"",score:""});
    const [addRow,setAddRow]=useState(false);
    const [isEdit,setIsEdit]=useState(false);
    const [editCell,setEditCell]=useState(null);
    const [nameFilter, setNameFilter] = useState("");
    const [minScore, setMinScore] = useState("");
    const [maxScore, setMaxScore] = useState("");
    const [filteredData, setFilteredData] = useState([]);


    const handleDelete=(index)=>{
        const updatedData=[...data];
        console.log(index);
        updatedData.splice(index, 1); 
        setData(updatedData);         
        setFilteredData(filterData(updatedData,nameFilter,minScore,maxScore));
    };
    
    const handleAdd = () => {
        setData((prevData) => {
            const updatedData = [...prevData, newData];
            setFilteredData(filterData(updatedData,nameFilter,minScore,maxScore));
            return updatedData;
        });
        setNewData({name:"",age:"",job:"",score:""});
        setAddRow(false);
        console.log("Row added");
    };

        const handleInputChange=(e)=>{
            setNewData({...newData,[e.target.name]:e.target.value});
        };

      const handleAddRows=()=>{
        setAddRow(true);
        console.log("Row add is called");
        // setIsEdit(false);
      };

      const handleCellChange=(e,index)=>{
        const updatedData=[...data];
        updatedData[index][e.target.name]=e.target.value;
        setData(updatedData);
        setFilteredData(filterData(updatedData,nameFilter,minScore,maxScore));
      }

      const handleSave=()=>{
        setIsEdit(false);
        setEditCell(null);
        console.log("Saved");
      }

      const handleEditCell=(index)=>{
        setIsEdit(true);
        setEditCell(index);
      }

      const filterData = (data,name,min,max) => {
        return data.filter(student => {
            const matchesName=student.name.toLowerCase().includes(name.toLowerCase());
            const matchesScore=(!min||student.score >= min)&&(!max||student.score<= max);
            return matchesName&&matchesScore;
        });
    };
    
    const handleFilter = () => {
        setFilteredData(filterData(data,nameFilter,minScore,maxScore));
    };
    const removeFilter = () => {
        setNameFilter("");
        setMinScore("");
        setMaxScore("");
        setFilteredData(data); 
    };
    
  return (
    <div> Table 
        <div>
                <input
                    type="text"
                    placeholder="Filter by name"
                    value={nameFilter}
                    onChange={(e)=>setNameFilter(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Min score"
                    value={minScore}
                    onChange={(e)=>setMinScore(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Max score"
                    value={maxScore}
                    onChange={(e)=>setMaxScore(e.target.value)}
                />
                 <button onClick={handleFilter}>Filter</button>
                 <button onClick={removeFilter}>Remove Filter</button>
            </div>
    <table border ="1">
    <tr>
        <th> Name </th>
        <th> Age</th>
        <th>Job</th>
        <th>Score</th>
        <th>Actions</th>
    </tr>
    {filteredData.map((student,ind)=>(
        <tr key={ind}>
            {isEdit && editCell===ind ?(
            <>
            <td>
                <input
                type='text'
                name='name'
                value={student.name}
                onChange={(e)=>handleCellChange(e,ind)}
                />
            </td>
            <td>
                <input
                type='number'
                name='age'
                value={student.age}
                onChange={(e)=>handleCellChange(e,ind)}
                />
            </td>
            <td>
                <input
                type='text'
                name='job'
                value={student.job}
                onChange={(e)=>handleCellChange(e,ind)}
                />
            </td>
            <td>
                <input
                type='number'
                name='score'
                value={student.score}
                onChange={(e)=>handleCellChange(e,ind)}
                />
            </td>
            <td>
                <button onClick={handleSave}>Save</button>
            </td>
            </>
            ):(
            <>
            <td onClick={()=>handleEditCell(ind)}>{student.name}</td>
            <td onClick={()=>handleEditCell(ind)}>{student.age}</td>
            <td onClick={()=>handleEditCell(ind)}>{student.job}</td>
            <td onClick={()=>handleEditCell(ind)}>{student.score}</td>
            <td>
                <button onClick={() => handleDelete(ind)}>Delete</button>
            </td>
            </>
            )}
        </tr>
    ))}
    </table>
    {!addRow &&(
        <div>
          <button onClick={handleAddRows}>Add New Row</button>
        </div>
    )}

    {addRow &&(
        <div>
            <input 
            type='text'
            name='name'
            placeholder='Name'
            value={newData.name}
            onChange={handleInputChange}
            />
            <input
            type='number'
            name='age'
            placeholder='Age'
            value={newData.age}
            onChange={handleInputChange}
            />
            <input
            type='text'
            name='job'
            placeholder='Job'
            value={newData.job}
            onChange={handleInputChange}
            />
            <input 
            type='number'
            name='score'
            placeholder='Score'
            value={newData.score}
            onChange={handleInputChange}
            />
            <button onClick={handleAdd}>Add</button>
            </div>
    )}
    </div>
  )
}

export default Table

