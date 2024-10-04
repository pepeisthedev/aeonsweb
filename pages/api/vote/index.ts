// pages/api/submissions/vote.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { SubmissionsDatabase } from '../utils/SubmissionsDatabase';
import { AuthUtil } from '../utils/AuthUtil';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Authenticate the user using the JWT
    const user = AuthUtil.validateJWT(req);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const { submissionId } = req.body;
    console.log("VOTE WITH SUMBISSION ID: " + submissionId);
    if (!submissionId) {
      return res.status(400).json({ message: 'Missing submission ID' });
    }
        // Call the voteForSubmission function
        console.log("VOTE WITH USER ID: " + user.id);

  if (req.method === 'POST') {

    const voteResult = await SubmissionsDatabase.voteForSubmission(submissionId, user.id);

    if (voteResult === 'success') {
      return res.status(200).json({ message: 'Vote submitted successfully' });
    } else if (voteResult === 'already_voted') {
      return res.status(400).json({ message: 'You have already voted on this submission.' });
    } else if (voteResult === 'no_votes_left') {
      return res.status(400).json({ message: 'You have no votes left.' });
    } else {
      return res.status(500).json({ message: 'Failed to submit vote' });
    }
  } else if (req.method === 'DELETE') {
    const voteResult = await SubmissionsDatabase.revokeVoteForSubmission(submissionId, user.id);

    if (voteResult === 'revoked') {
      return res.status(200).json({ message: 'Vote removed successfully' });
    } else if (voteResult === 'not_voted') {
      return res.status(400).json({ message: 'You have not voted on this submission.' });
    } else {
      return res.status(500).json({ message: 'Failed to remove vote' });
    }
  }
  
  else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
