"use client"
import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import 'highlight.js/styles/github-dark.css';
import Blockquote from '@tiptap/extension-blockquote';
import { all, createLowlight } from 'lowlight'
import BulletList from '@tiptap/extension-bullet-list';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Document from '@tiptap/extension-document'
import Heading from '@tiptap/extension-heading'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Image from '@tiptap/extension-image'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'
import Paragraph from '@tiptap/extension-paragraph'
import Bold from '@tiptap/extension-bold'
import Code from '@tiptap/extension-code'
import Text from '@tiptap/extension-text'
import Italic from '@tiptap/extension-italic'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import Strike from '@tiptap/extension-strike'
import History from '@tiptap/extension-history'
import Typography from '@tiptap/extension-typography'
import HardBreak from '@tiptap/extension-hard-break'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Youtube from '@tiptap/extension-youtube';
import TextAlign from '@tiptap/extension-text-align'
import { Color } from '@tiptap/extension-color'
import { Content } from '@tiptap/react';
import { blogInterface } from '@/lib/interfaces';

const lowlight = createLowlight(all)
const Editor = ({
  editable,
  blog,
}: {
  editable: boolean,
  blog: blogInterface,
  }) => { 
    const editor = useEditor({
      immediatelyRender: false,
      editable: editable,
      extensions: [
        Document,
        Paragraph,
        Text,
        Typography,
        HardBreak,
        Table.configure({
          resizable: true,
        }),
        TableRow,
        TableHeader,
        TableCell,
        Heading.configure({ levels: [1, 2, 3] }),
        Blockquote,
        HorizontalRule,
        BulletList,
        OrderedList,
        ListItem,
        Image.configure({
          HTMLAttributes: {
            class: 'mx-auto w-full md:w-3/5 lg:w-4/5 rounded',
          },
        }),
        Color,
        Youtube.configure({
          HTMLAttributes: {
            class: 'mx-auto w-full md:w-3/4',
          },
          controls: true,
          nocookie: true,
        }),
        TextAlign.configure({
          types: ['heading', 'paragraph', 'table', 'image', 'youtube', 'codeBlock', 'blockquote', 'orderedList', 'bulletList', 'listItem', 'tableHeader', 'tableRow', 'tableCell', 'code', 'textStyle', 'strike', 'underline', 'bold', 'italic', 'link', 'strike', 'underline', 'bold', 'italic', 'link', 'strike', 'underline', 'bold', 'italic', 'link',],
        }),
        Bold,
        Code,
        Italic,
        TextStyle,
        Underline,
        Strike,
        History,
        Highlight.configure({ multicolor: true }),
        CodeBlockLowlight.configure({ lowlight }),
        Link.configure({
          HTMLAttributes:{
            class:"text-blue-500 hover:text-blue-700"
          },
          openOnClick: false,
          autolink: true,
          defaultProtocol: 'https',
          protocols: ['http', 'https'],
          isAllowedUri: (url, ctx) => {
            try {
              // construct URL
              const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`)
  
              // use default validation
              if (!ctx.defaultValidate(parsedUrl.href)) {
                return false
              }
  
              // disallowed protocols
              const disallowedProtocols = ['ftp', 'file', 'mailto']
              const protocol = parsedUrl.protocol.replace(':', '')
  
              if (disallowedProtocols.includes(protocol)) {
                return false
              }
  
              // only allow protocols specified in ctx.protocols
              const allowedProtocols = ctx.protocols.map(p => (typeof p === 'string' ? p : p.scheme))
  
              if (!allowedProtocols.includes(protocol)) {
                return false
              }
  
              // disallowed domains
              const disallowedDomains = ['example-phishing.com', 'malicious-site.net']
              const domain = parsedUrl.hostname
  
              if (disallowedDomains.includes(domain)) {
                return false
              }
  
              // all checks have passed
              return true
            } catch {
              return false
            }
          },
          shouldAutoLink: url => {
            try {
              // construct URL
              const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`)
  
              // only auto-link if the domain is not in the disallowed list
              const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com']
              const domain = parsedUrl.hostname
  
              return !disallowedDomains.includes(domain)
            } catch {
              return false
            }
          },
  
        }),
      ],
      content:"",
    })
    useEffect(()=>{
      editor?.commands.setContent({
        type: 'doc',
        content: [
          {
            type: 'heading',
            attrs: { level: 1 },
            content: [{ type: 'text', text: blog.blogName }],
          },
          ...blog.description, 
        ],
      })
    },[editor])
  if (editor) {
    return <div className='relative max-w-full'>

      <div className='mx-6 md:mx-auto mt-4 max-w-screen-md '>
        <EditorContent className='prose sm:prose-lg lg:prose-xl dark:prose-invert w-full' editor={editor} /></div></div>
  }
}

export default Editor;
