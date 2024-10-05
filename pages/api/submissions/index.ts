import { NextApiRequest, NextApiResponse } from 'next';
import { SubmissionsDatabase, InsertSubmissionStatus } from '../utils/SubmissionsDatabase';
import { AuthUtil } from '../utils/AuthUtil';
import { Submission } from '../interfaces/Submission';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Check for a query parameter `my=true` to get submissions for the authenticated user
    if (req.query.my === 'true') {
      const user = AuthUtil.validateJWT(req);
      if (!user) {
        return res.status(401).json({ isAuthenticated: false, message: 'Unauthorized access. Invalid or missing token.' });
      }
      // Get submissions for the authenticated user
      const userSubmission = await SubmissionsDatabase.getSubmissionsByUserId(user.id);
      if (userSubmission) {
        return res.status(200).json(userSubmission);
      } else {
        return res.status(404).json({ message: 'getSubmissionsByUserId.' });
      }
    } else {
      // GET all submissions without authentication
      const submissions = await SubmissionsDatabase.getAllSubmissions();
      if (submissions) {
        return res.status(200).json(submissions);
      } else {
        return res.status(500).json({ message: 'Error retrieving submissions.' });
      }
    }
  } else if (req.method === 'POST' || req.method === 'PUT') {
    // POST: Create a new submission
    const user = AuthUtil.validateJWT(req);
    if (!user) {
      return res.status(401).json({ isAuthenticated: false, message: 'Unauthorized access. Invalid or missing token.' });
    }

    const { title, description, twitter_url, content_type, team_members } = req.body;

    if (!title || !description || !twitter_url || !content_type || !team_members) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if(req.method === 'POST') {
      const newSubmission: Submission = {
        title,
        description,
        author: user.username, // Set the author to the authenticated user's username
        twitter_url,
        votes: 0, // New submissions start with 0 votes
        content_type,
        team_members,
        discord_id: user.id,
        media_url: "https://pbs.twimg.com/media/GY-bTwOXEAAr1Pa?format=jpg&name=900x900"
      };
     const insertStatus = await SubmissionsDatabase.insertSubmission(newSubmission);
     switch (insertStatus) {
      case InsertSubmissionStatus.Success:
        return res.status(201).json({ message: 'Submission created successfully' });
      case InsertSubmissionStatus.Duplicate:
        return res.status(400).json({ message: 'You have already submitted a submission.' });
      case InsertSubmissionStatus.Error:
      default:
        return res.status(500).json({ message: 'Error creating submission' });
    }
    } else {
      let updatedSubmission = {
        title,
        description,
        author: user.username,
        twitter_url,
        content_type,
        team_members
      };
      const insertStatus = await SubmissionsDatabase.updateSubmissionById(user.id, updatedSubmission);
      if (insertStatus) {
        return res.status(200).json({ message: 'Submission updated successfully' });
      } else {
        return res.status(500).json({ message: 'Error updating submission' });
      }
    }

  } else if (req.method === 'DELETE') {
    // DELETE: Remove a submission by the authenticated user
    const user = AuthUtil.validateJWT(req);
    if (!user) {
      return res.status(401).json({ isAuthenticated: false, message: 'Unauthorized access. Invalid or missing token.' });
    }

    // Delete the user's submission using their discord_id
    const deleteResult = await SubmissionsDatabase.deleteSubmissionByUserId(user.id);

    if (deleteResult) {
      return res.status(200).json({ message: 'Submission deleted successfully' });
    } else {
      return res.status(500).json({ message: 'Error deleting submission' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
