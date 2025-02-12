/* eslint-disable @typescript-eslint/no-unused-vars */
import '@xyflow/react/dist/style.css'
import {
    ReactFlow,
    addEdge,
    useEdgesState,
    useNodesState,
    Panel,
    Background,
    Controls,
    Connection,
    useReactFlow,
    ReactFlowProvider
  } from '@xyflow/react';
import { useCallback } from 'react';
import { BackgroundVariant } from '@xyflow/react';
import { useState, useContext, createContext } from 'react';
import { largestPropinObjArray } from '../utils/helperFuncs';
import '../component-styles/flowStyles.css'


// import custom node

import ListNode from './custom-nodes/ListNode';


const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Input Node' },
    position: { x: 250, y: 25 },
  },
 
  {
    id: '2',
    // you can also pass a React component as a label
    data: { label: <div>Default Node</div> },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'Output Node' },
    position: { x: 250, y: 250 },
  },
];
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3', animated: true },
];
// const nodeTypes = {list} add node types here. Create seperate folder for node types. Documentation seems straight forward
const nodeTypes = {listNode: ListNode}
const largestProps = {
  objArray: initialNodes,
  property: 'id'
}
let id = largestPropinObjArray(largestProps); // for DND id pirposes.
const getId = () => `dndnode_${id++}`
// DND Context Code

const DnDContext = createContext<[string | null, (type: string) => void]>([null, (_:string) => {}]);
const DnDProvider = ({children}: {children: React.ReactNode}) => {
  const [myType, setMyType] = useState<string | null>(null);
  return(
    <DnDContext.Provider value = {[myType, setMyType]}>
      {children}
    </DnDContext.Provider>
  )
}


const useDnD = () => {
  return useContext(DnDContext)
}


const Flow = () => {


const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
const [menutoggle, setMenuToggle] = useState<boolean>(false)
const {screenToFlowPosition} = useReactFlow();


//Event listener code

const [type, setType] = useDnD();

const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
);
const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
  event.preventDefault();
  if(event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move';
  }
  
},[])

const onDrop = useCallback((event: React.DragEvent<HTMLDivElement> )=> {
  event.preventDefault();

  if (!type){
    return;
  }
  const position = screenToFlowPosition({
    x: event.clientX,
    y: event.clientY
  })
  const newNode = {
    id: getId(),
    type,
    position,
    data: { label: `${type} node`}
  }

  console.log('NewNode: ', newNode)

  setNodes((nodes) => nodes.concat(newNode))

},[screenToFlowPosition, setNodes, type])

const onDragStart = (event:React.DragEvent, nodeType:string) => {
  setType(nodeType);
  if(event.dataTransfer){
    event.dataTransfer.effectAllowed = 'move';
  }
  
};

const OpenMenu = () => {
  setMenuToggle(true)
}

// drag and drop functionality

    return(
        <div style={{height: '90vh', width: '90vw',border: '4px solid black'}}>

              <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onDrop={onDrop}
              onDragOver={onDragOver}
              nodeTypes={nodeTypes}
              fitView
              >
                <Controls/>
                <Background variant = {BackgroundVariant.Lines} />
                <Panel position='bottom-center' style={{width : '75vw', height: '10vh', backgroundColor: 'grey', display: 'flex', flexFlow: 'column', alignItems: 'center', borderRadius: '8px' }}>
                  <h2>Drag Nodes</h2>
                  <div className='draggableNode' onDragStart={(event:React.DragEvent<HTMLDivElement>) => onDragStart(event, 'listNode')} draggable> List </div>
                  <div> Email </div>
                  <div> LinkedIn </div>
                </Panel>


              </ReactFlow>

      </div>
    )
}

const DnDFlow = () => { return(
  <ReactFlowProvider>
    <DnDProvider>
      <Flow/>
    </DnDProvider>
  </ReactFlowProvider>)
}

export default DnDFlow;