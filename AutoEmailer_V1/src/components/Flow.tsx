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
    ReactFlowProvider,
    NodeTypes,
    type Node
  } from '@xyflow/react';
import { useCallback } from 'react';
import { BackgroundVariant } from '@xyflow/react';
import { useState, useContext, createContext } from 'react';
// import { largestPropinObjArray } from '../utils/helperFuncs';
import '../component-styles/flowStyles.css'
import { NewList } from '../utils/types';
import { saveState } from '../services/saving';

// import custom nodes

import ListNode from './custom-nodes/ListNode';
import EmailNode from './custom-nodes/emailNode';
import Timer from './custom-nodes/timer'



// DND Context Code

interface DNDProviderProps {
  children: React.ReactNode,
  myLists: NewList[]
}


const DnDContext = createContext<[string | null, (type: string) => void, NewList[]]>([null, (_:string) => {}, [{listName: '', contacts: [], id: ''}]]);
const DnDProvider = ({children, myLists}: DNDProviderProps) => {
  const [myType, setMyType] = useState<string | null>(null);
  return(
    <DnDContext.Provider value = {[myType, setMyType, myLists]}>
      {children}
    </DnDContext.Provider>
  )
}


const useDnD = () => {
  return useContext(DnDContext)
}
let id = 0;
const getId = () => `dndnode_${id++}`
// begin component code
const Flow = () => {

// interface NodeTypeData {
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   [key: string]: any
// }
// interface PositionData{
//   [key:string]:number
// }

// interface NodeType {
//   id:number,
//   type:string,
//   data: NodeTypeData,
//   position: PositionData
// }  
// const initialNodes:Node[]|null[]  = [
//   // {
//   //   id: '1',
//   //   type: 'input',
//   //   data: { label: 'Input Node' },
//   //   position: { x: 250, y: 25 },
//   // },
 
// ];
// interface EdgeType {
//   id: string,
//   source: string,
//   target: string,
// }
// const initialEdges: EdgeType[] = [
  
// ];
// const nodeTypes = {list} add node types here. Create seperate folder for node types. Documentation seems straight forward

// const nodeTypes = {listNode: ListNode}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const initialNodes= [];
// const largestProps = {
//   objArray: initialNodes,
//   property: 'id'
// }

// let id:number = largestPropinObjArray(largestProps); // for DND id pirposes.


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  // const [_menutoggle, setMenuToggle] = useState<boolean>(false)
  const {screenToFlowPosition} = useReactFlow();

// let dragImage; 


//Event listener code

const [type, setType,myLists] = useDnD();
const nodeTypes = {
  listNode: ListNode,
  emailNode: EmailNode,
  timerLogic: Timer
}

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
    // console.log('dropped')
    

    if (!type){
      return;
    }

  const deleteNodebyID = (id: string) => {
    console.log('delete');
    setNodes((nodes) => nodes.filter((node) => node.id !== id))
  }  

  const position = screenToFlowPosition({
    x: event.clientX,
    y: event.clientY
  })

  if(type === 'listNode'){
    const newNode = [{
        id: getId(),
        type,
        position,
        // dragHandle: '.handle',
        data: { label: `${type} node`,
        lists: myLists,
        deleteNode: deleteNodebyID,
        setNodes: setNodes,
        // nodes: nodes,
        selected_id: null 
      }
    }]
    // const newNodes = nodes.concat(newNode) 
    setNodes((nodes) => nodes.concat(newNode))
  } else if (type == 'emailNode'){
    const newNode = {
      id:getId(),
      type,
      position,
      dragHandle: '.drag-handle',
      data: {label: `${type} node`,
        deleteNode: deleteNodebyID
      },
    
    }
    setNodes((nodes) => nodes.concat(newNode))
  } else if(type == 'timerLogic'){
    const newNode = {
      id:getId(),
      type,
      position,
      // dragHandle: '.drag-handle',
      data: {label: `${type} node`,
        deleteNode: deleteNodebyID,
        setNodes: setNodes
      },
    
    }
    setNodes((nodes) => nodes.concat(newNode))
  } 
  
  
  else {
    const newNode = {
      id: getId(),
      type,
      position,
      data: { label: `${type} node`,
        deleteNode:deleteNodebyID}
    }
    setNodes((nodes) => nodes.concat(newNode))
  }


  },[type, screenToFlowPosition, setNodes, myLists])

  const onDragStart = (event:React.DragEvent, nodeType:string) => {
    setType(nodeType);





    if(event.dataTransfer){
      event.dataTransfer.effectAllowed = 'move';
      // event.dataTransfer.setDragImage( dragImage as Element, 0 , 0 );
      // event.dataTransfer.setDragImage( dragImage as Element, (dragImage as HTMLElement).offsetWidth/2 , (dragImage as HTMLElement).offsetHeight/2 );
    }
    
  };



  // const OpenMenu = () => {
  //   setMenuToggle(true)
  // }


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
                <Panel position='top-right' style={{backgroundColor: 'grey', padding: '4px', borderRadius: '4px'}}>
                  <button style={{marginRight: '4px'}}> Save </button>
                  <button onClick={() => saveState(nodes, edges)}> Save As </button>
                </Panel>
                <Panel position='bottom-center' style={{width : '75vw', height: '10vh', backgroundColor: 'grey', display: 'flex', flexFlow: 'row', alignItems: 'center', borderRadius: '8px' }}>
                  <div style={{display: 'flex', flexFlow: 'column', width: '50%', alignItems: 'center'}}>
                    <h2>Drag Nodes</h2>
                    <div className='draggableNode' onDragStart={(event:React.DragEvent<HTMLDivElement>) => onDragStart(event, 'listNode')} draggable> List </div>
                    <div className='draggableNode' onDragStart={(event:React.DragEvent<HTMLDivElement>) => onDragStart(event, 'emailNode')} draggable> Email </div>
                    {/* <div> Email </div> */}
                    {/* <div> LinkedIn </div> */}
                  </div>
                  <div style={{display: 'flex', flexFlow: 'column', width: '50%', alignItems: 'center', justifyContent: 'start' }}>
                    <h2> Logic </h2>
                    <div className='draggableNode' onDragStart={(event:React.DragEvent<HTMLDivElement>) => onDragStart(event, 'timerLogic')} draggable> Timer </div>
                    <div className='draggableNode' onClick={() => console.log(nodes)}> logger </div>
                  </div>
                </Panel>


              </ReactFlow>

      </div>
    )
}

const DnDFlow = ({myLists}: {myLists: NewList[]}) => { return(
  <ReactFlowProvider>
    <DnDProvider myLists={myLists}>
      <Flow/>
    </DnDProvider>
  </ReactFlowProvider>)
}

export default DnDFlow;