const Project = require('../models/Project');
const BlogPost = require('../models/BlogPost');
const Contact = require('../models/Contact');
const Subscriber = require('../models/Subscriber');

// @desc    Get portfolio statistics
// @route   GET /api/stats
// @access  Public
const getStats = async (req, res) => {
  try {
    const [
      totalProjects,
      completedProjects,
      totalPosts,
      totalContacts,
      totalSubscribers,
      totalViews,
      totalLikes,
    ] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ status: 'Completed' }),
      BlogPost.countDocuments({ published: true }),
      Contact.countDocuments(),
      Subscriber.countDocuments({ subscribed: true }),
      // Sum all project views
      Project.aggregate([
        { $group: { _id: null, totalViews: { $sum: '$views' } } },
      ]),
      // Sum all project likes
      Project.aggregate([
        { $group: { _id: null, totalLikes: { $sum: '$likes' } } },
      ]),
    ]);

    const stats = {
      projects: {
        total: totalProjects,
        completed: completedProjects,
      },
      blog: {
        totalPosts,
      },
      contacts: {
        total: totalContacts,
      },
      newsletter: {
        subscribers: totalSubscribers,
      },
      engagement: {
        totalViews: totalViews[0]?.totalViews || 0,
        totalLikes: totalLikes[0]?.totalLikes || 0,
      },
      // Static portfolio info (update as needed)
      portfolio: {
        projectsCompleted: totalProjects > 0 ? `${totalProjects}+` : '50+',
        yearsExperience: '3+',
        happyClients: '20+',
        successRate: '100%',
      },
    };

    return res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('Get stats error:', error);
    return res.status(500).json({ success: false, message: 'Failed to fetch stats.' });
  }
};

module.exports = { getStats };
