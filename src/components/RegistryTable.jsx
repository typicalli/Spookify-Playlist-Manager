import { useMemo, useState } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

const columnHelper = createColumnHelper()

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  )
}

function RegistryTable({ tracks, selectedId, onSelectRow, onDeleteTrack }) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 4,
  })

  const data = useMemo(() => tracks, [tracks])

  const columns = useMemo(
    () => [
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
      columnHelper.display({
        id: 'actions',
        header: '',
        cell: (info) => (
          <button
            type="button"
            className="row-delete-btn"
            aria-label={`Delete ${info.row.original.title}`}
            onClick={(event) => {
              event.stopPropagation()
              onDeleteTrack(info.row.original.id)
            }}
          >
            <TrashIcon />
          </button>
        ),
      }),
    ],
    [onDeleteTrack],
  )

  const table = useReactTable({
    data,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  if (tracks.length === 0) {
    return <p className="empty-state">No tracks yet. Add one from the form to populate the registry.</p>
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
