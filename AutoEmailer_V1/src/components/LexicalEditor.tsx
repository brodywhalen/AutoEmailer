// import {$getRoot, $getSelection} from 'lexical';
// import {useEffect} from 'react';

import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {LexicalErrorBoundary} from '@lexical/react/LexicalErrorBoundary';
import ToolbarPlugin from './lexical-plugins/ToolbarPlugin';
// import ToolbarPlugin from './plugins/ToolbarPlugin';
import '../component-styles/EditorStyles.css' 

const theme = {
}
const onError = (error:Error) => {
    console.error(error)
}

const LexicalEditor = () => {


   
    const initialConfig = {
        namespace: "MyEditor",
        theme,
        onError
    }
    

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <div style={{width: '350px', height: ''}}>
                <ToolbarPlugin/>
                <RichTextPlugin
                    contentEditable={
                        <ContentEditable
                            style={{height: "200px", margin: "8px"}}
                            aria-placeholder={'compose your email...'}
                            placeholder={<div> compose your email... </div>}
                        />
                    }
                    ErrorBoundary={LexicalErrorBoundary}
                />
            </div>
            <HistoryPlugin/>
            <AutoFocusPlugin/>
        </LexicalComposer>
    )





}
export default LexicalEditor;