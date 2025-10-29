import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

interface MarkdownRendererProps {
  content: string;
  isTable?: boolean;
}

export function MarkdownRenderer({ content, isTable }: MarkdownRendererProps) {
  if (isTable) {
    const rows = content.trim().split('\n');
    if (rows.length < 2) return <p>{content}</p>; // Not a valid table

    const headerRow = rows[0];
    const headerCells = headerRow
      .split('|')
      .map((cell) => cell.trim())
      .filter(Boolean);
    const bodyRows = rows.slice(2); // Skip header and separator

    return (
      <Table>
        <TableHeader>
          <TableRow>
            {headerCells.map((cell, i) => (
              <TableHead key={i}>{cell}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {bodyRows.map((row, i) => (
            <TableRow key={i}>
              {row
                .split('|')
                .map((cell) => cell.trim())
                .filter(Boolean)
                .map((cell, j) => (
                  <TableCell key={j}>{cell}</TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  const lines = content.trim().split('\n');
  return (
    <div className="space-y-2 text-sm md:text-base">
      {lines.map((line, i) => {
        if (line.startsWith('## ')) {
          return (
            <h2 key={i} className="font-headline text-lg font-semibold mt-4">
              {line.substring(3)}
            </h2>
          );
        }
        if (line.startsWith('- ') || line.startsWith('* ')) {
          return (
            <ul key={i} className="list-disc list-inside pl-4">
              <li>{line.substring(2)}</li>
            </ul>
          );
        }
        if (line.trim() === '') {
            return <div key={i} className="py-1" />; // Represents a newline
        }
        return <p key={i}>{line}</p>;
      })}
    </div>
  );
}
