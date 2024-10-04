import React, {useEffect, useState} from 'react'
import { TwitterTweetEmbed } from 'react-twitter-embed'

interface Submission {
    name: string
    description: string
    artist: string
    twitter_url: string
    content_type: string
}

function getTweetId(url: string) {
    const match = url.match(/x\.com\/\w+\/status\/(\d+)/)
    return match ? match[1] : ""
}

export default function SubmissionGallery() {

    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [error, setError] = useState<string | null>(null);

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

    useEffect(() => {
        fetchSubmissions();
    }, []);

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Submission Gallery</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {submissions.map((submission, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <div className="p-4">
                            <h2 className="text-xl font-semibold mb-2">{submission.name}</h2>
                            <p className="text-gray-600 mb-2">{submission.description}</p>
                            <p className="text-sm text-gray-500">Artist: {submission.artist}</p>
                        </div>
                        <div className="p-4 bg-gray-50">

                                <TwitterTweetEmbed
                                    tweetId={getTweetId(submission.twitter_url)}
                                    options={{ height: 400 }}
                                />

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}