import React, { useState, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';
import Leaderboard from './Leaderboard';
import Navigation from './Navigation';
import MySubmission from './MySubmission';
import { FilterDropdown } from '@/app/components/artcontest/FilterDropDown';
import { FullResImageModal } from '@/app/components/artcontest/FullResImageModal';
import { ImageCard } from '@/app/components/artcontest/ImageCard';
import { Section } from '@/app/components/artcontest/Section';
import DiscordAuth from "@/app/components/artcontest/DiscordAuth";
import UserStatus from "@/app/components/artcontest/UserData";


const fetchSubmissions = async () => {
  try {
    const response = await fetch('/api/submissions');
    if (!response.ok) {
      throw new Error('Failed to fetch submissions');
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error fetching submissions:', err);
    throw err;
  }
};

const Gallery = () => {
  const [visibleImages, setVisibleImages] = useState(20);
  const [activeSection, setActiveSection] = useState('Leaderboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState(null);

  const refreshUserData = useCallback(async () => {
    if (userData) {
      try {
        const response = await fetch(`/api/user`);
        if (response.ok) {
          const updatedUserData = await response.json();
          setUserData(updatedUserData); // Update the state with refreshed data
        }
      } catch (error) {
        console.error('Failed to refresh user data:', error);
      }
    }
  }, [userData]);

  // Function to fetch the submissions data again
  const refreshSubmissions = useCallback(async () => {
    try {
      const data = await fetchSubmissions();
      setSubmissions(data);
    } catch (err) {
      setError('Failed to load submissions. Please try again later.');
    }
  }, []);

  // Function that combines both user data and submissions refresh
  const refreshData = useCallback(() => {
    refreshUserData();  // Refresh user data
    refreshSubmissions();  // Refresh submissions
  }, [refreshUserData, refreshSubmissions]);

  useEffect(() => {
    refreshSubmissions();  // Load submissions on component mount
  }, [refreshSubmissions]);

  const handleSubmissionClick = (image) => {
    setSelectedImageId(image.id);
  };

  const closeFullResImage = () => {
    setSelectedImageId(null);
  };

  const handlePrevImage = () => {
    setSelectedImageId(prevId => {
      const currentIndex = submissions.findIndex(img => img.id === prevId);
      const newIndex = (currentIndex - 1 + submissions.length) % submissions.length;
      return submissions[newIndex].id;
    });
  };

  const handleNextImage = () => {
    setSelectedImageId(prevId => {
      const currentIndex = submissions.findIndex(img => img.id === prevId);
      const newIndex = (currentIndex + 1) % submissions.length;
      return submissions[newIndex].id;
    });
  };

  const loadMore = () => {
    setVisibleImages(prev => Math.min(prev + 20, submissions.length));
  };



  const handleFilterChange = (value) => {
    setFilter(value);
    console.log('Filtering by:', value);
  };

  return (
      <div
          className="min-h-screen overflow-auto mt-10"
          onScroll={(e) => {
            const { scrollTop, clientHeight, scrollHeight } = e.target;
            if (activeSection === 'Gallery') {
              if (scrollTop + clientHeight >= scrollHeight - 200) {
                loadMore();
              }
            }
          }}
      >
        <div className="px-4 sm:px-6 lg:px-8 relative z-10 safe-area-padding h-screen flex flex-col">
          <div className="flex flex-col sm:flex-row justify-between items-center my-8">
            <div className="flex-grow text-center mb-4 sm:mb-0">
              <h1 className="text-3xl sm:text-4xl font-bold text-white">Stage 2</h1>
            </div>
            <div className="flex-none">
              {userData ? (
                  <UserStatus userData={userData}/>
              ) : (
                  <DiscordAuth userData={userData} setUserData={setUserData}/>
              )}
            </div>
          </div>

          <Navigation
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              sections={['Leaderboard', 'Gallery', 'My Submission']}
          />

          {activeSection === 'Gallery' && (
              <div
                  className="mb-8 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="w-full sm:w-auto sm:flex-grow max-w-2xl">
                  <div className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[rgb(230,164,14)]"
                    />
                      <Search  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white" size={20}/>
                  </div>
                </div>
                <FilterDropdown onValueChange={handleFilterChange}/>
              </div>
          )}
          {activeSection === 'Leaderboard' && (
              <Section title="">
                <Leaderboard submissions={submissions}/>
              </Section>
          )}

          {activeSection === 'My Submission' && (
              <Section title="" >
                <MySubmission userData={userData} onSubmit={refreshData} setActiveSection= {setActiveSection}/>
              </Section>
          )}

          {activeSection === 'Gallery' && (
              <Section title="">
                <div className="w-5/6 mx-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {submissions
                        .filter(submission => {
                          const query = searchQuery.toLowerCase();
                          return (
                              submission.title.toLowerCase().includes(query) ||
                              submission.description.toLowerCase().includes(query) ||
                              submission.team_members.some(member => member.toLowerCase().includes(query))
                          );
                        })
                        .slice(0, visibleImages)
                        .map(submission => (
                            <ImageCard
                                key={submission.id}
                                submission={submission}
                                onVoteChange={refreshData}
                                userData={userData}
                                onSubmissionClick={handleSubmissionClick}
                            />
                        ))}
                  </div>
                  {visibleImages < submissions.length && (
                      <div className="text-center my-6">
                        <button
                            onClick={loadMore}
                            className="text-white font-bold py-2 px-4 rounded-lg text-sm bg-[rgb(230,164,14)] hover:bg-[rgb(194,134,0)]"
                        >
                          Load More
                        </button>
                      </div>
                  )}
                </div>
              </Section>
          )}
          {activeSection === 'My Submission' && (
              <Section title="">
              </Section>
          )}
        </div>

        {selectedImageId && (
            <FullResImageModal
                submissions={submissions}
                currentSubmissionId={selectedImageId}
                onClose={closeFullResImage}
                onPrev={handlePrevImage}
                onNext={handleNextImage}
                onVoteChange={refreshData}
                userData={userData}
            />
        )}

        <style jsx global>{`
          /* Custom Scrollbar Styles */
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
          }
          ::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.5);
            border-radius: 10px;
          }
          ::-webkit-scrollbar-track {
            background: transparent;
          }

          /* Safe area padding for notched devices */
          @supports (padding-top: env(safe-area-inset-top)) {
            .safe-area-padding {
              padding-top: env(safe-area-inset-top);
              padding-right: env(safe-area-inset-right);
              padding-bottom: env(safe-area-inset-bottom);
              padding-left: env(safe-area-inset-left);
            }
          }

          /* Fallback for devices without notch */
          .safe-area-padding {
            padding-top: max(16px, env(safe-area-inset-top));
            padding-right: max(16px, env(safe-area-inset-right));
            padding-bottom: max(16px, env(safe-area-inset-bottom));
            padding-left: max(16px, env(safe-area-inset-left));
          }

          /* Ensure the content is not hidden behind the notch on landscape orientation */
          @media screen and (orientation: landscape) {
            .safe-area-padding {
              padding-left: max(32px, env(safe-area-inset-left));
              padding-right: max(32px, env(safe-area-inset-right));
            }
          }
        `}</style>
      </div>
  );
};

export default Gallery;