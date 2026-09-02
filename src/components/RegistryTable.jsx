import { useMemo, useState } from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import RoleBadge from './RoleBadge.jsx'

const columnHelper = createColumnHelper()
const ROLE_FILTERS = ['All', 'Creator', 'Listener']
const GENRE_FILTERS = ['All Genres', 'Pop', 'Rock', 'Indie', 'Jazz', 'K-Pop']

// Mirrors the column order below so <colgroup> can lock each column to a fixed share of the table width.
// User Role gets extra room (vs. a plain-text column) to fit the "CREATOR"/"LISTENER" badge without clipping.
const COLUMN_WIDTHS = ['22%', '11%', '18%', '11%', '20%', '18%']

function RegistryTable({ tracks, selectedId, onSelectRow }) {
  const [roleFilter, setRoleFilter] = useState('All')
  const [genreFilter, setGenreFilter] = useState('All Genres')
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 4,
  })

  function handleRoleFilterChange(role) {
    setRoleFilter(role)
    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
  }

  function handleGenreFilterChange(event) {
    setGenreFilter(event.target.value)
    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
  }

  const data = useMemo(
    () =>
      tracks.filter(
        (track) =>
          (roleFilter === 'All' || track.role === roleFilter) &&
          (genreFilter === 'All Genres' || track.genre === genreFilter),
      ),
    [tracks, roleFilter, genreFilter],
  )

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
        cell: (info) => <RoleBadge role={info.getValue()} />,
      }),
    ],
    [],
  )

  const table = useReactTable({
    data,
    columns,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  const filtersActive = roleFilter !== 'All' || genreFilter !== 'All Genres'

  return (
    <div className="registry-table-wrap">
      <div className="table-toolbar">
        <div className="toolbar-title">
          <h2 className="panel-title">Playlist</h2>
          <span className="tracks-count">
            {data.length} {data.length === 1 ? 'track' : 'tracks'}
          </span>
        </div>

        {tracks.length > 0 && (
          <div className="filter-controls">
            <div className="role-filter" role="group" aria-label="Filter by user role">
              {ROLE_FILTERS.map((role) => (
                <button
                  key={role}
                  type="button"
                  className={role === roleFilter ? 'filter-btn active' : 'filter-btn'}
                  onClick={() => handleRoleFilterChange(role)}
                >
                  {role}
                </button>
              ))}
            </div>

            <select
              className="genre-select"
              aria-label="Filter by genre"
              value={genreFilter}
              onChange={handleGenreFilterChange}
            >
              {GENRE_FILTERS.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {tracks.length === 0 ? (
        <p className="empty-state">No tracks yet. Add one from the form to populate the registry.</p>
      ) : data.length === 0 ? (
        <p className="empty-state">
          {filtersActive ? 'No tracks match the selected filters.' : 'No tracks yet.'}
        </p>
      ) : (
        <>
          <div className="table-scroll">
            <table className="registry-table">
              <colgroup>
                {COLUMN_WIDTHS.map((width, index) => (
                  <col key={index} style={{ width }} />
                ))}
              </colgroup>
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} title={String(header.column.columnDef.header)}>
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
                      <td key={cell.id} title={String(cell.getValue())}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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
        </>
      )}
    </div>
  )
}

export default RegistryTable
