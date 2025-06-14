"use client"
import React from 'react'
import { Button } from '../ui'
import { Editor } from '@tiptap/react'
import { cn } from '@/lib/utils'
import { FaI, FaImage, FaTable } from "react-icons/fa6";
import ToolTipProvider from './toolTipProvider'
import { MdOndemandVideo} from "react-icons/md"
import { FaBold } from "react-icons/fa";
import { FaItalic } from "react-icons/fa";
import { FaUnderline } from "react-icons/fa";
import { FaStrikethrough } from "react-icons/fa";
import { FaHighlighter } from "react-icons/fa";
import { FaCode } from "react-icons/fa";
import { FaParagraph } from "react-icons/fa";
import { BsDashLg, BsTypeH1 } from "react-icons/bs";
import { BsTypeH2 } from "react-icons/bs";
import { BsTypeH3 } from "react-icons/bs";
import { FaAlignLeft } from "react-icons/fa";
import { FaAlignCenter } from "react-icons/fa";
import { FaAlignRight } from "react-icons/fa";  
import { ImCross } from "react-icons/im";
import { MdFormatListBulleted } from "react-icons/md";
import { GoListOrdered } from "react-icons/go";
import { FaFileCode } from "react-icons/fa";
import { GrBlockQuote } from "react-icons/gr";
import { AiOutlineEnter, AiOutlineSave } from "react-icons/ai";
import { IoArrowRedoSharp, IoArrowUndo, IoLinkSharp } from "react-icons/io5";
import { AiOutlineFontColors } from "react-icons/ai";
import { RiInsertColumnLeft, RiMergeCellsHorizontal, RiSplitCellsHorizontal } from "react-icons/ri";
import { RiInsertColumnRight } from "react-icons/ri";
import { RiInsertRowTop } from "react-icons/ri";
import { RiInsertRowBottom } from "react-icons/ri";
import { RiDeleteColumn } from "react-icons/ri";
import { RiDeleteRow } from "react-icons/ri";
import { LiaTabletsSolid } from "react-icons/lia";
import { GrLinkNext } from "react-icons/gr";
import { GrLinkPrevious } from "react-icons/gr";

export default function EditorNav({editor,handleSave}:{
  editor:Editor,
  handleSave:()=>void
}) {
    const addImage = () => {
        const url = prompt('Enter image URL')
        if (url) editor?.chain().focus().setImage({ src: url }).run()
      }
    const addLink = () => {
        const url = prompt('Enter link URL')
        const text = prompt('Enter Link text')
        if (url) editor?.chain().focus().insertContent(`<a target="_blank" href="${url}">${text}</a>`).run()
    }
    const addYoutubeVideo = () => {
      const url = prompt('Enter YouTube URL')
  
      if (url) {
        editor.commands.setYoutubeVideo({
          src: url,
        })
      }
    }
  
  return (
    
    <div className='sticky top-0 bg-foreground/10 backdrop-blur py-3 z-10 shadow-xs shadow-foreground/20'>
        <div className="Button-group flex justify-center gap-2 items-center flex-wrap ">
        <ToolTipProvider onClick={() => addImage()} toolTip="Add Image">
          <FaImage/>
        </ToolTipProvider>
        <ToolTipProvider
        toolTip='Add Link'
          onClick={() => addLink()}
        >
          <IoLinkSharp />
        </ToolTipProvider>
        <ToolTipProvider
        toolTip='Add youtube Video'
          onClick={() => addYoutubeVideo()}
        >
          <MdOndemandVideo/>
        </ToolTipProvider>
        <ToolTipProvider toolTip='Bold'
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
          className={editor.isActive('bold') ? 'bg-secondary hover:bg-secondary font-bold text-forground' : ''}
        >
          <FaBold/>
        </ToolTipProvider>
        <ToolTipProvider toolTip='Italic'
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
          className={editor.isActive('italic') ? 'bg-secondary hover:bg-secondary font-bold text-forground' : ''}
        >
          <FaItalic/>
        </ToolTipProvider>
        <ToolTipProvider toolTip='Underline'
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleUnderline()
              .run()
          }
          className={editor.isActive('underline') ? 'bg-secondary hover:bg-secondary font-bold text-forground' : ''}
        >
          <FaUnderline/>
        </ToolTipProvider> 
        <ToolTipProvider toolTip='Strike'
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleStrike()
              .run()
          }
          className={editor.isActive('strike') ? 'bg-secondary hover:bg-secondary font-bold text-forground' : ''}
        >
          <FaStrikethrough/>
        </ToolTipProvider>
        <ToolTipProvider toolTip='Highlight'
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleHighlight()
              .run()
          }
          className={editor.isActive('highlight') ? 'bg-secondary hover:bg-secondary font-bold text-forground' : ''}
        >
          <FaHighlighter/>
        </ToolTipProvider>
        <ToolTipProvider toolTip='Code'
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleCode()
              .run()
          }
          className={editor.isActive('code') ? 'bg-secondary hover:bg-secondary font-bold text-forground' : ''}
        >
          <FaCode/>
        </ToolTipProvider>
        <ToolTipProvider toolTip='Paragraph'
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'bg-secondary hover:bg-secondary font-bold text-forground' : ''}
        >
          <FaParagraph/>
        </ToolTipProvider>
        <ToolTipProvider toolTip='Heading 1'
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'bg-secondary hover:bg-secondary font-bold text-forground' : ''}
        >
          <BsTypeH1/>
        </ToolTipProvider>
        <ToolTipProvider toolTip='Heading 2'
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'bg-secondary hover:bg-secondary font-bold text-forground' : ''}
        >
          <BsTypeH2/>
        </ToolTipProvider>
        <ToolTipProvider toolTip='Heading 3'
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'bg-secondary hover:bg-secondary font-bold text-forground' : ''}
        >
          <BsTypeH3/>
        </ToolTipProvider>
        <ToolTipProvider toolTip='Align Left'
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
          >
            <FaAlignLeft/>
          </ToolTipProvider>
          <ToolTipProvider toolTip='Align Center'
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
          >
            <FaAlignCenter/>
          </ToolTipProvider>
          <ToolTipProvider toolTip='Align Right'
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
          >
            <FaAlignRight/>
          </ToolTipProvider>
          <ToolTipProvider toolTip='Unset Text Align'
           onClick={() => editor.chain().focus().unsetTextAlign().run()}>
            <ImCross/>
          </ToolTipProvider>
        <ToolTipProvider toolTip='Bullet list'
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'bg-secondary hover:bg-secondary font-bold text-forground' : ''}
        >
          <MdFormatListBulleted/>
        </ToolTipProvider>
        <ToolTipProvider toolTip='Ordered list'
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'bg-secondary hover:bg-secondary font-bold text-forground' : ''}
        >
          <GoListOrdered/>
        </ToolTipProvider>
        <ToolTipProvider toolTip='Code block'
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'bg-secondary hover:bg-secondary font-bold text-forground' : ''}
        >
         <FaFileCode/>
        </ToolTipProvider>
        <ToolTipProvider toolTip='Blockquote'
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive('blockquote') ? 'bg-secondary  hover:bg-secondary font-bold text-forground' : ''}
        >
          <GrBlockQuote/>
        </ToolTipProvider>
        <ToolTipProvider toolTip='Horizontal rule'
         onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <BsDashLg/>
        </ToolTipProvider>
        <ToolTipProvider toolTip='Hard break'
         onClick={() => editor.chain().focus().setHardBreak().run()}>
          <AiOutlineEnter/>
        </ToolTipProvider>
        <ToolTipProvider toolTip='Undo'
          onClick={() => editor.chain().focus().undo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
          }
        >
          <IoArrowUndo />
        </ToolTipProvider>
        <ToolTipProvider toolTip='Redo'
          onClick={() => editor.chain().focus().redo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .redo()
              .run()
          }
        >
          <IoArrowRedoSharp />
        </ToolTipProvider>
        <ToolTipProvider toolTip='purple'
          onClick={() => editor.chain().focus().setColor('#958DF1').run()}
          className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'bg-secondary hover:bg-secondary font-bold text-forground' : ''}
        >
          <AiOutlineFontColors/>
        </ToolTipProvider>
        <ToolTipProvider toolTip='Insert table'
            onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
            }
          >
            <FaTable />
          </ToolTipProvider>
          <ToolTipProvider toolTip='Add column before'
           onClick={() => editor.chain().focus().addColumnBefore().run()}>
            <RiInsertColumnLeft/>
          </ToolTipProvider>
          <ToolTipProvider toolTip='Add column after' onClick={() => editor.chain().focus().addColumnAfter().run()}>
            <RiInsertColumnRight/>
            </ToolTipProvider>
          <ToolTipProvider toolTip='Add row before' onClick={() => editor.chain().focus().addRowBefore().run()}>
            <RiInsertRowTop/>
          </ToolTipProvider>
          <ToolTipProvider toolTip='Add row after' onClick={() => editor.chain().focus().addRowAfter().run()}>
            <RiInsertRowBottom/>
            </ToolTipProvider>
          <ToolTipProvider toolTip='Delete column' onClick={() => editor.chain().focus().deleteColumn().run()}>
            <RiDeleteColumn/>
            </ToolTipProvider>
          <ToolTipProvider toolTip='Delete row' onClick={() => editor.chain().focus().deleteRow().run()}>
            <RiDeleteRow/>
            </ToolTipProvider>
          <ToolTipProvider toolTip='Delete table' onClick={() => editor.chain().focus().deleteTable().run()}>
            <LiaTabletsSolid/>
            </ToolTipProvider>
          <ToolTipProvider toolTip='Merge cells' onClick={() => editor.chain().focus().mergeCells().run()}>
            <RiMergeCellsHorizontal/>
            </ToolTipProvider>
          <ToolTipProvider toolTip='Split cell' onClick={() => editor.chain().focus().splitCell().run()}>
            <RiSplitCellsHorizontal/>
            </ToolTipProvider>
          <Button onClick={() => editor.chain().focus().mergeOrSplit().run()}>Merge or split</Button>
          <Button onClick={() => editor.chain().focus().setCellAttribute('colspan', 2).run()}>
            Set cell attribute
          </Button>
          <ToolTipProvider toolTip='Fix tables' onClick={() => editor.chain().focus().fixTables().run()}>
            Fix </ToolTipProvider>
          <ToolTipProvider toolTip='Go to previous cell' onClick={() => editor.chain().focus().goToPreviousCell().run()}>
            <GrLinkPrevious/>
            </ToolTipProvider>
          <ToolTipProvider toolTip='Go to next cell' onClick={() => editor.chain().focus().goToNextCell().run()}>
            <GrLinkNext/>
            </ToolTipProvider>
          <ToolTipProvider toolTip='Save' onClick={() =>{handleSave()} }>
            <AiOutlineSave/>
            </ToolTipProvider>
      </div>
      
    </div>
  )
}
