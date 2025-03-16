import { Handle, useReactFlow } from "@xyflow/react"
import { Handle,  Position, useReactFlow } from '@xyflow/react'
import { NewList } from '../../utils/types';
import { useNodeId } from '@xyflow/react';
import '../../component-styles/flowStyles.css'

const Timer = (): React.ReactNode => {

const reactFlow = useReactFlow()
const handleStyle = {}
const id = useNodeId();

return(
    <>

          <div style={{padding: '0px', border: '1px solid black', borderRadius: '4px', background: 'white'}}>
          <div className='toolbar2'> List Node</div>
          <div className='node-content' style={{padding: '4px'}}>
            { id ? <a  className = "exitButton nodrag" onClick={() => data.deleteNode(id)}>  </a> : null}
              <label style= {{padding: '2px'}}htmlFor="text">{'Select List'}</label>
              <Handle type="source" position={Position.Bottom} id="b" style={handleStyle}/>
              <Handle type ="target" position= {Position.Top} id= "a" style={handleStyle}/>
          </div>
    
          </div>
    </>
)


}
export default Timer;