// import { Handle, useReactFlow } from "@xyflow/react"
import { Handle,  Position, useReactFlow } from '@xyflow/react'
// import { NewList } from '../../utils/types';
import { useNodeId } from '@xyflow/react';
import '../../component-styles/flowStyles.css'

interface TimerProps {
    label: string;
    time: string;
    timezone: string;
    deleteNode: (id:string) => void
}

const Timer = ({data}: {data:TimerProps}): React.ReactNode => {

const timezones = ['EDT', 'CST', 'MST', 'PST'];

const reactFlow = useReactFlow()
const handleStyle = {}
const id = useNodeId();
const changeTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newNode = reactFlow.getNodes().map(node => {
        if(node.id === id){
            console.log('selected time', event.target.value)
            return{
                ...node,
                data:{
                    ...node.data,
                    time: event.target.value
                }
            }
        } else {
            return node
        }
    })
} 

return(
    <>

          <div style={{padding: '0px', border: '1px solid black', borderRadius: '4px', background: 'white'}}>
          <div className='toolbar2'> Time </div>
          <div className='node-content' style={{padding: '4px'}}>
            { id ? <a  className = "exitButton nodrag" onClick={() => data.deleteNode(id)}>  </a> : null}
              <input onChange={changeTime}type='time'/><select>{timezones.map(zone => <option> {zone}</option>)}</select>   
              <Handle type="source" position={Position.Bottom} id="b" style={handleStyle}/>
              <Handle type ="target" position= {Position.Top} id= "a" style={handleStyle}/>
          </div>
    
          </div>
    </>
)


}
export default Timer;