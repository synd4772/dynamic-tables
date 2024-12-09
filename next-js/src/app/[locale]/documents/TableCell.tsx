'use client';

export const TableCell =({
  value
}: TableCellProps) => {
  return (
    <td 
      className={typeof value === "number" ? "right-align": "left-align" }
      >
      { value || '-'}
    </td>
  ) 
};

interface TableCellProps{
  key: string, 
  value: number | string | boolean
}