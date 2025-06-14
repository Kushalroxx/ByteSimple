"use client"
import React, { useEffect, useState } from 'react';
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
import EditorNav from './editorNav';
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
import { Input, Label, Loader } from '../ui';
import { serverUrl } from '@/lib/exportEnv';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'nextjs-toploader/app';
import { CustomHeading, generateUniqueId } from '@/lib/CustomHeading';

const lowlight = createLowlight(all)
const Editor = ({
  editable,
  editUrl,
  editTitle,
  editDescription,
  _id
}: {
  _id?:string,
  editable: boolean,
  editTitle?: string,
  editUrl?: string,
  editDescription?: string
}) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter()
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
          class: 'mx-auto w-full md:w-3/5',
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
    content: `
      <p> Click here to Start typing...</p>
    `,
  })
  useEffect(() => {   
    if (editTitle && editDescription&&editUrl) {
      setTitle(editTitle)
      setUrl(editUrl)
      editor?.commands.setContent(editDescription)
      return
    }
  }, [editor,editDescription,editTitle])
  const handleSave = async () => {
    if (!title) {
      return
    }
    if (editTitle && editDescription && editor) {
      try {
        setLoading(true)
        await axios.put(`${serverUrl}/admin/blogs?id=${_id}`, {
          blogName: title,
          description: editor.getJSON()
        }, {
          withCredentials: true
        })
        router.push("/blog")
      } catch (error) {
        console.log(error);
        
        if (error instanceof AxiosError) {
          if (error.status === 401) {
            router.push("/signin")
          }

        }
      } finally {
        setLoading(false)
      }
      return
    }
    if (editor && title) {
      const json = editor.getJSON()
      try {
        setLoading(true)
        await axios.post(`${serverUrl}/admin/blogs`, {
          blogName: title,
          links:[url],
          description: json
        }, {
          withCredentials: true
        })
        router.push("/blog")
      } catch (error) {
        if (error instanceof AxiosError) {
          if (error.status === 401) {
            router.push("/signin")
          }

        }
      } finally {
        setLoading(false)
      }

    }
  }
  if (loading) {
    return (
      <Loader />
    )
  }
  if (editor) {
    return <div className='relative max-h-screen overflow-y-auto max-w-full'>
      <EditorNav handleSave={() => handleSave()} editor={editor} />
        <Label className=' md:mx-auto mt-4 max-w-screen-md text-lg mx-2' htmlFor='titleInput'>Title</Label>
      <Input id='titleInput' value={title} onChange={e => {
        setTitle(e.target.value)
      }} type='text' className=' md:mx-auto mt-4 max-w-screen-md' placeholder='Enter the Title' />
      <Label className=' md:mx-auto mt-4 max-w-screen-md text-lg mx-2' htmlFor='urlInput'>Display Image URL</Label>
      <Input id='urlInput' value={url} onChange={e => {
        setUrl(e.target.value)
      }} type='url' className=' md:mx-auto mt-4 max-w-screen-md' placeholder='Enter the Display Image URL' />
      <div className='mx-6 md:mx-auto mt-4 max-w-screen-md'>
        <EditorContent className=' prose sm:prose-lg lg:prose-2xl dark:prose-invert w-full' editor={editor} /></div></div>
  }
}

export default Editor;
