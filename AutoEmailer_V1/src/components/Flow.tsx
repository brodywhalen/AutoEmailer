import '@xyflow/react/dist/style.css'
import {
    ReactFlow,
    addEdge,
    useEdgesState,
    useNodesState,
    Panel,
    Background,
    Controls
  } from '@xyflow/react';
import { useCallback } from 'react';
import { BackgroundVariant } from '@xyflow/react';
import { useState } from 'react';

const Flow = () => {

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


const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
const [menutoggle, setMenuToggle] = useState<boolean>(false)

const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges],
);

const OpenMenu = () => {
  setMenuToggle(true)
}

// drag and drop functionality

const onDragStart = (event, nodeType) => {
  scryRenderedComponentsWithType(node)
}






    return(
        <div style={{height: '90vh', width: '90vw',border: '4px solid black'}}>
            <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            >
              <Controls/>
              <Background variant = {BackgroundVariant.Lines} />
              <Panel position='bottom-center' style={{width : '75vw', height: '10vh', backgroundColor: 'grey'}}>
                <h2>Drag Nodes</h2>
                <button> List </button>
                <button> Email </button>
                <button> LinkedIn </button>
              </Panel>


            </ReactFlow>
      </div>
    )
}

export default Flow;