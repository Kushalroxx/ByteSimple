import { contactInterface } from '@/lib/interfaces'
import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui'

export default function ContactTable({
    contacts
}: {
    contacts: contactInterface[]
}) {
    return (
            <Table>
                <TableCaption>A list of All Contacts.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="">Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead className=" text-right">Description</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                            contacts.map((contact) => (
                                <TableRow className='max-w-full' key={contact._id}>
                                    <TableCell className=" break-words whitespace-normal">{contact.name}</TableCell>
                                    <TableCell className=" break-all whitespace-normal">{contact.email}</TableCell>
                                    <TableCell className=" break-words whitespace-normal">{contact.phone}</TableCell>
                                    <TableCell className=" break-words whitespace-normal">{contact.description}</TableCell>
                                </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
    )
}
