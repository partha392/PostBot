import React from 'react';
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

const renderLine = (line: string) => {
  line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  return <span dangerouslySetInnerHTML={{ __html: line }} />;
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
              <TableHead key={i}>{renderLine(cell)}</TableHead>
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
                  <TableCell key={j}>{renderLine(cell)}</TableCell>
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  const lines = content.trim().split('\n');
  const elements = [];
  let listItems = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const isListItem = line.startsWith('- ') || line.startsWith('* ');

    if (isListItem) {
      listItems.push(line.substring(2));
    } else {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`ul-${i}`} className="list-disc list-inside space-y-1 pl-4">
            {listItems.map((item, index) => (
              <li key={index}>{renderLine(item)}</li>
            ))}
          </ul>
        );
        listItems = [];
      }

      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={i} className="font-headline text-lg font-semibold mt-4">
            {renderLine(line.substring(3))}
          </h2>
        );
      } else if (line !== '') {
        elements.push(<p key={i}>{renderLine(line)}</p>);
      } else {
        elements.push(<div key={i} className="py-1" />); // Represents a newline
      }
    }
  }

  if (listItems.length > 0) {
    elements.push(
      <ul key={`ul-end`} className="list-disc list-inside space-y-1 pl-4">
        {listItems.map((item, index) => (
          <li key={index}>{renderLine(item)}</li>
        ))}
      </ul>
    );
  }

  return (
    <div className="space-y-2 text-sm md:text-base">
      {elements.map((el, i) => React.cloneElement(el, { key: i }))}
    </div>
  );
}
