// import {$getRoot, $getSelection} from 'lexical';
// import {useEffect} from 'react';

import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {LexicalErrorBoundary} from '@lexical/react/LexicalErrorBoundary';
import ToolbarPlugin from './lexical-plugins/ToolbarPlugin';
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin';
// import ToolbarPlugin from './plugins/ToolbarPlugin';
import '../component-styles/EditorStyles.css' 

const theme = {
    code: 'editor-code',
  heading: {
    h1: 'editor-heading-h1',
    h2: 'editor-heading-h2',
    h3: 'editor-heading-h3',
    h4: 'editor-heading-h4',
    h5: 'editor-heading-h5',
  },
  image: 'editor-image',
  link: 'editor-link',
  list: {
    listitem: 'editor-listitem',
    nested: {
      listitem: 'editor-nested-listitem',
    },
    ol: 'editor-list-ol',
    ul: 'editor-list-ul',
  },
  ltr: 'ltr',
  paragraph: 'editor-paragraph',
  placeholder: 'editor-placeholder',
  quote: 'editor-quote',
  rtl: 'rtl',
  text: {
    bold: 'editor-text-bold',
    code: 'editor-text-code',
    hashtag: 'editor-text-hashtag',
    italic: 'editor-text-italic',
    overflowed: 'editor-text-overflowed',
    strikethrough: 'editor-text-strikethrough',
    underline: 'editor-text-underline',
    underlineStrikethrough: 'editor-text-underlineStrikethrough',
  },

}
const onError = (error:Error) => {
    console.error(error)
}

const LexicalEditor = () => {


   
    const initialConfig = {
        namespace: "MyEditor",
        theme: theme,
        onError
    }
    

    return (
      <div style={{height: '100%'}}>
        <LexicalComposer initialConfig={initialConfig} >
            <div className='pointer' >
                <ToolbarPlugin/>
                <TabIndentationPlugin/>
                <RichTextPlugin
                    contentEditable={
                        <ContentEditable
                            className='text-enter'
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
        </div>
    )





}
export default LexicalEditor;