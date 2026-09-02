import { useMemo, useState } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

const columnHelper = createColumnHelper()

const columns = [
  columnHelper.accessor('title', {
    header: 'Track Title',
  }),
  columnHelper.accessor('genre', {
    header: 'Genre',
    cell: (info) => <span className="table-pill">{info.getValue()}</span>,
  }),
  columnHelper.accessor('artist', {
    header: 'Artist Name',
  }),
  columnHelper.accessor('rating', {
    header: 'Rating / BPM',
  }),
  columnHelper.accessor('label', {
    header: 'Record Label',
  }),
  columnHelper.accessor('role', {
    header: 'User Role',
  }),
]

function RegistryTable({ tracks, selectedId, onSelectRow }) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 4,
  })

  const data = useMemo(() => tracks, [tracks])

  const table = useReactTable({
    data,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  if (tracks.length === 0) {
    return <p className="empty-state">No tracks yet. Add one from the form tab to populate the registry.</p>
  }

  return (
    <div className="registry-table-wrap">
      <table className="registry-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => onSelectRow(row.original.id)}
              className={row.original.id === selectedId ? 'row-selected' : ''}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-bar">
        <button
          type="button"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>
        <span className="page-counter">
          Page {table.getState().pagination.pageIndex + 1} of {Math.max(table.getPageCount(), 1)}
        </span>
        <button
          type="button"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default RegistryTable
