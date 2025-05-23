import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Download, ExternalLink, Linkedin, Twitter, Globe, Building } from 'lucide-react';

const DigitalBusinessCard = () => {
  const [currentProfile, setCurrentProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sample team data - replace with your actual team information
  const teamProfiles = {
    john: {
      id: 'john',
      name: 'John Smith',
      title: 'CEO & Founder',
      company: 'TechCorp Solutions',
      email: 'john.smith@techcorp.com',
      phone: '+1 (555) 123-4567',
      location: 'San Francisco, CA',
      bio: 'Passionate entrepreneur with 15+ years of experience in tech innovation and team leadership.',
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      companyLogo: 'https://via.placeholder.com/120x60/4F46E5/white?text=TechCorp',
      social: {
        linkedin: 'https://linkedin.com/in/johnsmith',
        twitter: 'https://twitter.com/johnsmith',
        website: 'https://johnsmith.com'
      },
      backgroundColor: '#4F46E5',
      textColor: '#FFFFFF'
    },
    sarah: {
      id: 'sarah',
      name: 'Sarah Johnson',
      title: 'CTO',
      company: 'TechCorp Solutions',
      email: 'sarah.johnson@techcorp.com',
      phone: '+1 (555) 123-4568',
      location: 'Austin, TX',
      bio: 'Full-stack developer turned tech leader, specializing in scalable architecture and team development.',
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
      companyLogo: 'https://via.placeholder.com/120x60/4F46E5/white?text=TechCorp',
      social: {
        linkedin: 'https://linkedin.com/in/sarahjohnson',
        twitter: 'https://twitter.com/sarahj_dev',
        website: 'https://sarahcodes.dev'
      },
      backgroundColor: '#059669',
      textColor: '#FFFFFF'
    },
    mike: {
      id: 'mike',
      name: 'Mike Chen',
      title: 'Head of Sales',
      company: 'TechCorp Solutions',
      email: 'mike.chen@techcorp.com',
      phone: '+1 (555) 123-4569',
      location: 'New York, NY',
      bio: 'Results-driven sales professional with a track record of exceeding targets and building lasting client relationships.',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      companyLogo: 'https://via.placeholder.com/120x60/4F46E5/white?text=TechCorp',
      social: {
        linkedin: 'https://linkedin.com/in/mikechen',
        twitter: 'https://twitter.com/mikechen_sales'
      },
      backgroundColor: '#DC2626',
      textColor: '#FFFFFF'
    },
    emily: {
      id: 'emily',
      name: 'Emily Rodriguez',
      title: 'Marketing Director',
      company: 'TechCorp Solutions',
      email: 'emily.rodriguez@techcorp.com',
      phone: '+1 (555) 123-4570',
      location: 'Los Angeles, CA',
      bio: 'Creative marketing strategist with expertise in digital campaigns and brand development.',
      profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      companyLogo: 'https://via.placeholder.com/120x60/4F46E5/white?text=TechCorp',
      social: {
        linkedin: 'https://linkedin.com/in/emilyrodriguez',
        twitter: 'https://twitter.com/emily_markets',
        website: 'https://emilymarketing.com'
      },
      backgroundColor: '#7C3AED',
      textColor: '#FFFFFF'
    },
    alex: {
      id: 'alex',
      name: 'Alex Thompson',
      title: 'Product Manager',
      company: 'TechCorp Solutions',
      email: 'alex.thompson@techcorp.com',
      phone: '+1 (555) 123-4571',
      location: 'Seattle, WA',
      bio: 'Product strategist focused on user experience and innovative solutions that drive business growth.',
      profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face',
      companyLogo: 'https://via.placeholder.com/120x60/4F46E5/white?text=TechCorp',
      social: {
        linkedin: 'https://linkedin.com/in/alexthompson',
        website: 'https://alexproduct.com'
      },
      backgroundColor: '#EA580C',
      textColor: '#FFFFFF'
    }
  };

  useEffect(() => {
    // Get profile ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const profileId = urlParams.get('id') || 'john'; // Default to john if no ID specified
    
    if (teamProfiles[profileId]) {
      setCurrentProfile(teamProfiles[profileId]);
    } else {
      setCurrentProfile(teamProfiles.john); // Fallback to default
    }
    setLoading(false);
  }, []);

  const generateVCard = (profile) => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${profile.name}
ORG:${profile.company}
TITLE:${profile.title}
EMAIL:${profile.email}
TEL:${profile.phone}
URL:${profile.social.website || ''}
NOTE:${profile.bio}
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${profile.name.replace(' ', '_')}.vcf`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      alert(`${type} copied to clipboard!`);
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!currentProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Profile Not Found</h1>
          <p className="text-gray-600">The requested profile could not be loaded.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: currentProfile.backgroundColor }}>
      <div className="container mx-auto px-4 py-8 max-w-md">
        {/* Header with Company Logo */}
        <div className="text-center mb-8">
          <img 
            src={currentProfile.companyLogo} 
            alt={`${currentProfile.company} Logo`}
            className="mx-auto mb-4 h-16 object-contain"
          />
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Profile Header */}
          <div className="relative p-8 text-center" style={{ backgroundColor: currentProfile.backgroundColor }}>
            <div className="relative inline-block">
              <img
                src={currentProfile.profileImage}
                alt={currentProfile.name}
                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover mx-auto"
              />
            </div>
            <h1 className="text-2xl font-bold mt-4" style={{ color: currentProfile.textColor }}>
              {currentProfile.name}
            </h1>
            <p className="text-lg opacity-90" style={{ color: currentProfile.textColor }}>
              {currentProfile.title}
            </p>
            <div className="flex items-center justify-center mt-2" style={{ color: currentProfile.textColor }}>
              <Building className="w-4 h-4 mr-2" />
              <span>{currentProfile.company}</span>
            </div>
          </div>

          {/* Contact Information */}
          <div className="p-8">
            <div className="space-y-4 mb-8">
              <div 
                className="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => copyToClipboard(currentProfile.email, 'Email')}
              >
                <Mail className="w-5 h-5 text-gray-600 mr-3" />
                <span className="text-gray-800">{currentProfile.email}</span>
              </div>

              <div 
                className="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => copyToClipboard(currentProfile.phone, 'Phone')}
              >
                <Phone className="w-5 h-5 text-gray-600 mr-3" />
                <span className="text-gray-800">{currentProfile.phone}</span>
              </div>

              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-gray-600 mr-3" />
                <span className="text-gray-800">{currentProfile.location}</span>
              </div>
            </div>

            {/* Bio */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">About</h3>
              <p className="text-gray-600 leading-relaxed">{currentProfile.bio}</p>
            </div>

            {/* Social Links */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Connect</h3>
              <div className="grid grid-cols-2 gap-3">
                {currentProfile.social.linkedin && (
                  <a
                    href={currentProfile.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Linkedin className="w-5 h-5 mr-2" />
                    LinkedIn
                  </a>
                )}

                {currentProfile.social.twitter && (
                  <a
                    href={currentProfile.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                  >
                    <Twitter className="w-5 h-5 mr-2" />
                    Twitter
                  </a>
                )}

                {currentProfile.social.website && (
                  <a
                    href={currentProfile.social.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors col-span-2"
                  >
                    <Globe className="w-5 h-5 mr-2" />
                    Website
                  </a>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={() => generateVCard(currentProfile)}
                className="w-full flex items-center justify-center p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                <Download className="w-5 h-5 mr-2" />
                Save Contact
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-white/80 text-sm">
            Digital Business Card • Powered by {currentProfile.company}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DigitalBusinessCard;