// import { useCallback } from 'react';
import { Handle,  Position, useReactFlow, type Node } from '@xyflow/react'
import { NewList } from '../../utils/types';
import { useNodeId } from '@xyflow/react';
import '../../component-styles/flowStyles.css'
// import { NewList } from '../../utils/types';
 
const handleStyle = { };
 
interface ListNodeProps {
  label: string;
  lists: NewList[];
  deleteNode: (id: string) => void;
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>
  // nodes: Node[]
}

const listOptions = (lists: NewList[]) : React.ReactNode => {
   return (
    <>
      <option disabled value='default' > --- </option>
      {lists.map(list => { return <option value={list.id} key= {list.id} id= {list.id}> {list.listName} </option>})}
    </>
  )
   
}


const ListNode = ({data}: {data: ListNodeProps}) => {


  const reactFlow = useReactFlow()
  
  // const onChange = useCallback((evt:React.ChangeEvent<HTMLInputElement>) => {
  //   console.log(evt.target.value);
  // }, []);
  const changeNodeState = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log('id selected: ',  event.target.value)
    // console.log('existing nodes: ', reactFlow.getNodes())
    // set new nodeset with changes
    const newNodes: Node[] = reactFlow.getNodes().map(node => {
      if(node.id === id) {
        console.log('selected_ID ', event.target.value)
        return{
          ...node,
          data:{...node.data, 
            selected_id: event.target.value
            
          }
          
        }
      } else {
        // console.log('unchanged node :', node)
        return node
      }
    })
    // console.log('newNodes: ', newNodes)
    data.setNodes(newNodes);

  }

  const id = useNodeId();
 
  return (
    <>  
      
      
      
        
      <div style={{padding: '0px', border: '1px solid black', borderRadius: '4px', background: 'white'}}>
      <div className='toolbar2'> List Node</div>
      <div className='node-content' style={{padding: '4px'}}>
        { id ? <a  className = "exitButton nodrag" onClick={() => data.deleteNode(id)}>  </a> : null}
          <label style= {{padding: '2px'}}htmlFor="text">{'Select List'}</label>
          
          {/* <input id="text" name="text" onChange={onChange} className="nodrag" /> */}
          <select defaultValue='default' style= {{padding: '2px'}}onChange={event => changeNodeState(event)} >
            {listOptions(data.lists)}
          </select>
          <Handle type="source" position={Position.Bottom} id="a" style={handleStyle}/>
      </div>

      </div>
        
    </>
  );
}

export default ListNode;