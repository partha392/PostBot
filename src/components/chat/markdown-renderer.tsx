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
  // Use a more robust regex to handle multiple bold sections and links in a single line
  const parts = line.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('[') && part.includes('](')) {
      const match = /\[(.*?)\]\((.*?)\)/.exec(part);
      if (match) {
        return <a key={index} href={match[2]} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{match[1]}</a>;
      }
    }
    return part;
  });
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

      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={i} className="font-headline text-md font-semibold mt-3">
            {renderLine(line.substring(4))}
          </h3>
        );
      } else if (line.startsWith('## ')) {
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
