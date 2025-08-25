import React from 'react'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui'

export default function PaginationForBlog({ page, noOfPages }: {
    page: number,
    noOfPages: number
}) {
    const getPageNumber = () => {
        let paginationPages: (number | "ellipsis")[] = []
        paginationPages.push(1)
        if (page >2) {
            paginationPages.push("ellipsis")
        }
        for (let i = page; i <= Math.min(noOfPages, page + 3); i++) {
            if (i === 1) {
                continue
            }
            paginationPages.push(i)
        }
        if (noOfPages > page + 2) {
            paginationPages.push("ellipsis")
        }
        return paginationPages
    }
    return (
        <Pagination className="my-10">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href={`/blogs?page=${page-1>=1&&page-1}`} />
                </PaginationItem>
                {
                    getPageNumber().map((e, i) => (
                        e === "ellipsis" ? (
                            <PaginationItem key={i}>
                                <PaginationEllipsis />
                            </PaginationItem>
                        ) : (
                            <PaginationItem key={i}>
                                <PaginationLink isActive={page === e} href={`/blogs?page=${e}`}>{e}</PaginationLink>
                            </PaginationItem>
                        )
                    ))
                }
                <PaginationItem>
                    <PaginationNext href={`/blogs?page=${page+1<=noOfPages&&page+1}`} />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
