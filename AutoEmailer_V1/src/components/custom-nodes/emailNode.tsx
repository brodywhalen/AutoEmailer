import '../../component-styles/flowStyles.css'
import { useNodeId } from '@xyflow/react';
import LexicalEditor from '../LexicalEditor';


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
            <div className='drag-handle toolbar2'> Email Node</div>
            <div className='node-content' style={{padding: '4px', height: '100%'}}>
            { id ? <a  className = "exitButton nodrag" onClick={() => data.deleteNode(id)}>  </a> : null}
            <LexicalEditor/>
                
            </div>
        </div>


    )

}

export default EmailNode;