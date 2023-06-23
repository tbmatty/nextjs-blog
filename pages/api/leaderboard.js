export default async function handler(req, res) {
    try {
      const response = await fetch('https://us-central1-propelme-prod.cloudfunctions.net/leaderboardApi', {
        method: 'GET',
      });
      const getLeaderboard = await response.json();
  
      console.log('getLeaderboard:', getLeaderboard);
  
      res.status(200).json({ leaderboard: getLeaderboard });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred while fetching leaderboard.' });
    }
  }
  