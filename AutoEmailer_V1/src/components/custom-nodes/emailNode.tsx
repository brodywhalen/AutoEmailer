import '../../component-styles/flowStyles.css'
import { Position, useNodeId } from '@xyflow/react';
import LexicalEditor from '../LexicalEditor';
import { Handle } from '@xyflow/react';


interface EmailNodeProps {
  label: string;
//   lists: NewList[];
  deleteNode: (id: string) => void;
  // setNodes: React.Dispatch<React.SetStateAction<Node>>;
  // nodes: Node[]
}

const EmailNode = ({data}:{data:EmailNodeProps}) => {

    const id = useNodeId();
    // console.log('rendered')

    return(


        <div className='resizable-box'>
            <Handle type = 'target' position={Position.Top} />
            <Handle type = 'source' position={Position.Bottom}/>
            <div className='drag-handle toolbar2'> Email Node</div>
            <div className='node-content' style={{padding: '4px', height: '100%'}}>
            { id ? <a  className = "exitButton nodrag" onClick={() => data.deleteNode(id)}>  </a> : null}
            <LexicalEditor/>
                
            </div>
        </div>


    )

}

export default EmailNode;