import React, { useState, useEffect } from 'react';
import { Send, ChevronRight, ChevronLeft, Twitter, Edit, AlertCircle } from 'lucide-react';
import XTweetEmbed from './XTweetEmbed'; // Assuming XTweetEmbed is in a separate file

const MySubmission = ({ userData, onSubmit, setActiveSection }) => {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [submissionId, setSubmissionId] = useState('');
  const [message, setMessage] = useState('');
  const [teamMembers, setTeamMembers] = useState([]);
  const [xLink, setXLink] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [shouldShowEditDeleteOverlay, setShouldShowEditDeleteOverlay] = useState(false);
  const [editMode, setEditMode] = useState({ title: false, description: false });
  const [tempEdits, setTempEdits] = useState({ title: '', description: '' });
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [errors, setErrors] = useState({});

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/submissions', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        setSubmissionId(""); // Save submission ID for future updates
        setTitle("");
        setDescription("");
        setTeamMembers([]);
        setXLink("");
        setMessage('Submission deleted successfully!')
        setShouldShowEditDeleteOverlay(false);
        onSubmit();
      } else {
        throw new Error('Failed to delete submission')
      }
    } catch (error) {
      console.error('Failed to delete submission:', error)
      setMessage('An error occurred while deleting the submission.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if(userData) {
      fetchUserSubmission(); // Fetch submission data on component mount
    }
  }, []);

  // Fetch existing submission data
  const fetchUserSubmission = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/submissions?my=true');
      if (response.ok) {
        const submission = await response.json();
        if (submission) {
          setSubmissionId(submission.id); // Save submission ID for future updates
          setTitle(submission.title);
          setDescription(submission.description);
          setTeamMembers(submission.team_members);
          setXLink(submission.content_url);
          setShouldShowEditDeleteOverlay(true);
        }
      }
    } catch (error) {
      console.error('Failed to fetch user submission:', error);
      setMessage('Failed to fetch your submission. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setWordCount(countWords(description));
  }, [description]);

  const countWords = (text) => {
    return text.trim().split(/\s+/).filter(word => word !== '').length;
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    // Step 1: Validate form fields (combining validation logic from both functions)
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    if (!teamMembers.length>0) newErrors.teamMembers = 'Team members are required';
    if (!xLink.trim()) newErrors.xLink = 'X post link is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Step 2: Prepare submission data
    const formData = {
      title: title,
      description: description,
      content_url: xLink,
      content_type: 'image', // Assuming content_type is 'image' or other type (modify if needed)
      team_members:  teamMembers
    };

    setIsLoading(true); // Show loading state

    // Step 3: Determine if this is a new submission or an update
    const method = submissionId ? 'PUT' : 'POST';
    const url = '/api/submissions';

    try {
      // Step 4: Make API request to create/update the submission
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(submissionId ? 'Submission updated successfully!' : 'Submission created successfully!');
        onSubmit();
        if (method === 'POST') {
          setIsSubmitted(true);
          setTempEdits({ title, description });
          await fetchUserSubmission(); // If needed, refresh user submissions

        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save submission');
      }
    } catch (error) {
      console.error('Failed to save submission:', error);
      setMessage(error.message || 'An error occurred while saving the submission.');
    } finally {
      setIsLoading(false); // Hide loading state
    }
  };

  const closeModal = () => {
    setMessage(''); // Clear the message to close the modal
    setActiveSection('Gallery'); // Open the Gallery section
  };


  const nextStep = () => {
    const newErrors = {};
    switch(step) {
      case 1:
        if (!title.trim()) newErrors.title = 'Title is required';
        if (!description.trim()) newErrors.description = 'Description is required';
        break;
      case 2:
        if (!teamMembers.length>0) newErrors.teamMembers = 'Team members are required';
        break;
    }

    if (Object.keys(newErrors).length === 0) {
      setStep(prev => Math.min(prev + 1, 3));
      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };

  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const toggleEditMode = (field) => {
    setEditMode(prev => ({ ...prev, [field]: !prev[field] }));
    if (!editMode[field]) {
      setTempEdits(prev => ({ ...prev, [field]: eval(field) }));
    }
  };

  const handleShouldShowEditDeleteOverlay = () => {
      setShouldShowEditDeleteOverlay(false);
  };

  const handleEdit = (field, value) => {
    if (field === 'description') {
      const words = countWords(value);
      if (words > 200) return;
    }
    setTempEdits(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const saveChanges = () => {
    setTitle(tempEdits.title);
    setDescription(tempEdits.description);
    setEditMode({ title: false, description: false });
    setHasChanges(false);
  };

  const discardChanges = () => {
    setTempEdits({ title, description });
    setEditMode({ title: false, description: false });
    setHasChanges(false);
  };

  const renderEditableField = (field, value, placeholder) => (
    <div className="relative bg-white rounded-lg shadow-md p-4 mb-4">
      <h4 className="text-lg font-semibold text-gray-700 mb-2">{field.charAt(0).toUpperCase() + field.slice(1)}</h4>
      {editMode[field] ? (
        <div className="flex flex-col">
          {field === 'description' ? (
            <>
              <textarea
                value={tempEdits[field]}
                onChange={(e) => handleEdit(field, e.target.value)}
                className={`w-full px-3 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-[rgb(230,164,14)] ${errors[field] ? 'border-red-500' : 'border-gray-300'}`}
                placeholder={placeholder}
                rows="4"
              ></textarea>
              <div className="text-sm text-gray-500 mt-2">
                {wordCount}/200 words
              </div>
            </>
          ) : (
            <input
              type="text"
              value={tempEdits[field]}
              onChange={(e) => handleEdit(field, e.target.value)}
              className={`w-full px-3 py-2 border rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-[rgb(230,164,14)] ${errors[field] ? 'border-red-500' : 'border-gray-300'}`}
              placeholder={placeholder}
            />
          )}
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <p className="text-gray-800 break-words">{value || <span className="text-gray-400 italic">Not provided</span>}</p>
          <button
            onClick={() => toggleEditMode(field)}
            className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200 ml-2 flex-shrink-0"
            title="Edit"
          >
            <Edit size={20} />
          </button>
        </div>
      )}
      {errors[field] && (
        <p className="text-red-500 text-sm mt-1 flex items-center">
          <AlertCircle size={16} className="mr-1 flex-shrink-0" /> {errors[field]}
        </p>
      )}
      {field === 'description' && !editMode[field] && (
        <div className="text-sm text-gray-500 mt-2">
          {wordCount}/200 words
        </div>
      )}
    </div>
  );

  const renderXContentEmbed = () => (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h4 className="text-lg font-semibold text-gray-700 mb-2">X Post</h4>
      {xLink ? (
        <XTweetEmbed tweetUrl={xLink} />
      ) : (
        <p className="text-gray-400 italic">No X post link provided</p>
      )}
      {errors.xLink && (
        <p className="text-red-500 text-sm mt-1 flex items-center">
          <AlertCircle size={16} className="mr-1 flex-shrink-0" /> {errors.xLink}
        </p>
      )}
    </div>
  );

  const renderSubmittedView = () => (
    <div className="space-y-6">
      <h3 className="text-2xl md:text-3xl font-bold text-[rgb(230,164,14)] mb-6">Your Awesome Artwork</h3>

      {renderEditableField('title', title, 'Enter a catchy title')}
      {renderEditableField('description', description, 'Describe your brilliant artwork (max 200 words)')}

      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <h4 className="text-lg font-semibold text-gray-700 mb-2">Team Members</h4>
        <p className="text-gray-800 break-words">{teamMembers || <span className="text-gray-400 italic">Not provided</span>}</p>
      </div>


      {hasChanges && (
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <button onClick={discardChanges} className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center">
            Discard Changes
          </button>
          <button onClick={saveChanges} className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center">
            Save Changes
          </button>
        </div>
      )}
    </div>
  );

  const renderStep = () => {
    if (isSubmitted) {
      return renderSubmittedView();
    }

    switch(step) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl md:text-2xl font-bold text-[rgb(230,164,14)] mb-4">Tell us about your artwork</h3>
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={`w-full px-4 py-2 bg-white rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[rgb(230,164,14)] transition-all duration-300 ${errors.title ? 'border-red-500' : ''}`}
                  placeholder="Give your artwork a catchy title"
                  required
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle size={16} className="mr-1 flex-shrink-0" /> {errors.title}
                  </p>
                )}
              </div>
              <div className="relative">
                <textarea
                  value={description}
                  onChange={(e) => {
                    const newDescription = e.target.value;
                    if (countWords(newDescription) <= 200) {
                      setDescription(newDescription);
                    }
                  }}
                  className={`w-full px-4 py-2 bg-white rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[rgb(230,164,14)] transition-all duration-300 ${errors.description ? 'border-red-500' : ''}`}
                  placeholder="Describe your brilliant artwork in a few sentences (max 200 words)"
                  rows="4"
                  required
                ></textarea>
                <div className="absolute bottom-2 right-2 text-sm text-gray-500">
                  {wordCount}/200 words
                </div>
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle size={16} className="mr-1 flex-shrink-0" /> {errors.description}
                  </p>
                )}
              </div>
            </div>
            <button onClick={nextStep} className="w-full bg-[rgb(230,164,14)] hover:bg-[rgb(194,134,0)] text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center">
              Next: Team Info <ChevronRight size={20} className="ml-2" />
            </button>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl md:text-2xl font-bold text-[rgb(230,164,14)] mb-4">Who is on your team?</h3>
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={teamMembers}
                  onChange={(e) => setTeamMembers(e.target.value.split(',').map(member => member.trim()))}
                  className={`w-full px-4 py-2 bg-white rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[rgb(230,164,14)] transition-all duration-300 ${errors.teamMembers ? 'border-red-500' : ''}`}
                  placeholder="Enter team members' names, separated by commas"
                  required
                />
                {errors.teamMembers && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle size={16} className="mr-1 flex-shrink-0" /> {errors.teamMembers}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 sm:space-x-4">
              <button onClick={prevStep} className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center">
                <ChevronLeft size={20} className="mr-2" /> Back
              </button>
              <button onClick={nextStep} className="flex-1 bg-[rgb(230,164,14)] hover:bg-[rgb(194,134,0)] text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center">
                Next: X Link <ChevronRight size={20} className="ml-2" />
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl md:text-2xl font-bold text-[rgb(230,164,14)] mb-4">Share your X post</h3>
            <div className="space-y-4">
              <div className="relative">
                <Twitter className="absolute top-1/2 transform -translate-y-1/2 left-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                <input
                  type="url"
                  value={xLink}
                  onChange={(e) => setXLink(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 bg-white rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[rgb(230,164,14)] transition-all duration-300 ${errors.xLink ? 'border-red-500' : ''}`}
                  placeholder="Paste your X post link here"
                  required
                />
                {errors.xLink && (
                  <p className="text-red-500 text-sm mt-1 flex items-center">
                    <AlertCircle size={16} className="mr-1" /> {errors.xLink}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-between space-x-4">
              <button onClick={prevStep} className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center">
                <ChevronLeft size={20} className="mr-2" /> Back
              </button>
              <button onClick={handleSubmit} className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center">
                Submit <Send size={20} className="ml-2" />
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative bg-gray-100 rounded-lg p-6 max-w-2xl mx-auto my-8 shadow-lg">

      {!userData && (
          <div className="absolute inset-0 bg-gray-400 bg-opacity-75 flex items-center justify-center z-10 rounded-lg">
            <span className="text-white font-bold text-xl">Login to submit</span>
          </div>
      )}

      {userData && submissionId && shouldShowEditDeleteOverlay && (
          <div className="absolute inset-0 bg-gray-400 bg-opacity-75 flex items-center justify-center z-10 rounded-lg space-x-4">
            <button
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Delete
            </button>
            <button
                onClick={handleShouldShowEditDeleteOverlay}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Edit
            </button>
          </div>
      )}

      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Submit Your <span className="text-[rgb(230,164,14)]">Artwork</span></h2>
      {!isSubmitted && (
        <div className="mb-8 flex justify-between">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col items-center">
              <button
                onClick={() => !isSubmitted && setStep(i)}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= i ? 'bg-[rgb(230,164,14)]' : 'bg-gray-300'
                } text-white font-bold text-lg shadow-md transition-all duration-300 hover:bg-[rgb(194,134,0)] focus:outline-none focus:ring-2 focus:ring-[rgb(230,164,14)] focus:ring-offset-2`}
                disabled={isSubmitted || i > step}
              >
                {i}
              </button>
              <span className="mt-2 text-sm text-gray-600">
                {i === 1 ? 'Idea' : i === 2 ? 'Team' : 'Share'}
              </span>
            </div>
          ))}
        </div>
      )}
      <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
        {renderStep()}
      </form>

      {message && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
              <p className="text-gray-700 mb-6">{message}</p>
              <button
                  onClick={closeModal}
                  className="bg-[rgb(230,164,14)] hover:bg-[rgb(194,134,0)] text-white font-bold py-2 px-4 rounded-lg"
              >
                OK
              </button>
            </div>
          </div>
      )}
    </div>
  );
};


export default MySubmission;