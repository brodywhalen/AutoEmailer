import { useCallback } from 'react';
import { Handle, Position } from '@xyflow/react';
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
        
    </>
  );
}

export default ListNode;