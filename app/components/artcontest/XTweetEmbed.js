import React, { useState, useEffect } from 'react';

const XTweetEmbed = ({ tweetUrl }) => {
  const [tweetData, setTweetData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTweetData = async () => {
      if (!tweetUrl) {
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        // Extract tweet ID from the URL
        const tweetId = tweetUrl.split('/').pop().split('?')[0];
        
        // Replace this with your actual API endpoint
        const response = await fetch(`https://api.twitter.com/2/tweets/${tweetId}?expansions=author_id,attachments.media_keys&user.fields=name,username,profile_image_url&media.fields=url,preview_image_url`, {
          headers: {
            'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch tweet data');
        }

        const data = await response.json();
        setTweetData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTweetData();
  }, [tweetUrl]);

  if (loading) {
    return <div className="text-center">Loading tweet...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error loading tweet: {error}</div>;
  }

  if (!tweetData) {
    return <div className="text-gray-500">No tweet data available</div>;
  }

  const { data: tweet, includes } = tweetData;
  const author = includes.users[0];
  const media = includes.media?.[0];

  return (
    <div className="bg-white rounded-lg shadow p-4 max-w-xl mx-auto">
      <div className="flex items-center mb-2">
        <img src={author.profile_image_url} alt={author.name} className="w-12 h-12 rounded-full mr-3" />
        <div>
          <div className="font-bold">{author.name}</div>
          <div className="text-gray-500">@{author.username}</div>
        </div>
      </div>
      <p className="mb-2">{tweet.text}</p>
      {media && (
        <img src={media.url || media.preview_image_url} alt="Tweet media" className="w-full rounded-lg mb-2" />
      )}
      <div className="text-gray-500 text-sm">
        {new Date(tweet.created_at).toLocaleString()}
      </div>
    </div>
  );
};

export default XTweetEmbed;