import React, { useEffect, useState } from 'react';
import { FixedSizeGrid as Grid, GridChildComponentProps } from 'react-window';
import './SubmissionsGrid.css';  // Create or update your CSS file for styling
import SubmissionVoteButton from './SubmissionVoteButton';
import { UserData } from "../discordAuth/User";

interface Submission {
  id: string;
  name: string;
  description: string;
  artist_name: string;
  content_url: string;
  votes: number;
  content_type: string;
}

interface SubmissionsGridProps {
  userData: UserData | null;
  onVoteChange: () => void;
}

const columnLabels = ["Name", "Description", "Artist", "URL", "Votes", "Content Type", "Vote"];

const SubmissionsGrid: React.FC<SubmissionsGridProps> = ({ userData, onVoteChange }) => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch all submissions from the API
    const fetchSubmissions = async () => {
      try {
        const response = await fetch('/api/submissions');
        if (!response.ok) {
          throw new Error('Failed to fetch submissions');
        }
        const data: Submission[] = await response.json();
        setSubmissions(data);
      } catch (err) {
        console.error('Error fetching submissions:', err);
        setError('Failed to load submissions. Please try again later.');
      }
    };

    fetchSubmissions();
  }, []);

  // Grid dimensions and cell sizes
  const columnCount = columnLabels.length;
  const rowCount = submissions.length + 1; // +1 for the header row
  const columnWidth = 150;
  const rowHeight = 50;

  // Cell Renderer for react-window Grid
  const Cell = ({ columnIndex, rowIndex, style }: GridChildComponentProps) => {
    if (rowIndex === 0) {
      // Render the header
      return (
        <div style={{ ...style, backgroundColor: '#333', color: 'white', padding: '10px', boxSizing: 'border-box' }}>
          <strong>{columnLabels[columnIndex]}</strong>
        </div>
      );
    } else {
      // Render the rows with submission data
      const submission = submissions[rowIndex - 1]; // Because rowIndex 0 is the header
      switch (columnIndex) {
        case 0:
          return <div style={style}>{submission.name}</div>;
        case 1:
          return <div style={style}>{submission.description}</div>;
        case 2:
          return <div style={style}>{submission.artist_name}</div>;
        case 3:
          return (
            <div style={style}>
              <a href={submission.content_url} target="_blank" rel="noopener noreferrer">
                View Content
              </a>
            </div>
          );
        case 4:
          return <div style={style}>{submission.votes}</div>;
        case 5:
          return <div style={style}>{submission.content_type}</div>;
        case 6:
          return (
            <div style={style}>
              <SubmissionVoteButton
                submissionId={submission.id}
                userData={userData}
                onVoteChange={onVoteChange}
              />
            </div>
          );
        default:
          return null;
      }
    }
  };

  return (
    <div>
      <h2 className="text-5xl">All Submissions</h2>
      {error && <p>{error}</p>}

      <div className="submission-grid-container">
        {/* FixedSizeGrid for displaying the headers and rows */}
        <Grid
          className="submission-grid"
          columnCount={columnCount}
          columnWidth={columnWidth}
          height={500}           
          rowCount={rowCount}
          rowHeight={rowHeight}
          width={1050}            
        >
          {Cell}
        </Grid>
      </div>
    </div>
  );
};

export default SubmissionsGrid;
