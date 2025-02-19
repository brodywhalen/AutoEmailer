// import {$getRoot, $getSelection} from 'lexical';
// import {useEffect} from 'react';

import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {LexicalErrorBoundary} from '@lexical/react/LexicalErrorBoundary';

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
            <RichTextPlugin
                contentEditable={
                    <ContentEditable
                        aria-placeholder={'compose your email...'}
                        placeholder={<div> compose your email... </div>}
                    />
                }
                ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin/>
            <AutoFocusPlugin/>
        </LexicalComposer>
    )





}
export default LexicalEditor;