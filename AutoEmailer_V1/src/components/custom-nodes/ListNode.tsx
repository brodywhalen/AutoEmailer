import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
<<<<<<< HEAD
import { NewList } from '../../utils/types';
import { useNodeId } from '@xyflow/react';
// import { NewList } from '../../utils/types';
 
const handleStyle = { };
 
interface ListNodeProps {
  label: string;
  lists: NewList[];
  deleteNode: (id: string) => void;
}

const ListNode = ({data}: {data: ListNodeProps}) => {
  const onChange = useCallback((evt:React.ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value);
  }, []);

  const id = useNodeId();
 
  return (
    <>  
      
      { id ? <button onClick={() => data.deleteNode(id)}> X </button> : null}
      
        
      <div style={{padding: '10px', border: '1px solid black', borderRadius: '4px'}}>
      
        <label htmlFor="text">{data.lists[1].listName}</label>
        
        <input id="text" name="text" onChange={onChange} className="nodrag" />
        <Handle type="source" position={Position.Bottom} id="a" style={handleStyle}/>
      </div>
        
=======
 
const handleStyle = { left: 10 };
 
const ListNode = () => {
  const onChange = useCallback((evt:React.ChangeEvent<HTMLInputElement>) => {
    console.log(evt.target.value);
  }, []);
 
  return (
    <>
      <Handle type="target" position={Position.Top} />
      <div>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={handleStyle}
      />
>>>>>>> 51a1e90c36342c8e551300f2a3d0637a3021c51f
    </>
  );
}

export default ListNode;