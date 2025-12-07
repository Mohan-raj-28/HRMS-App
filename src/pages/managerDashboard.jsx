import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function ManagerDashboard() {
  const { user } = useAuth();
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        // ✅ API automatically filters by manager's scope
        const response = await api.get('/api/manager/team');
        setTeam(response.data.data);
      } catch (error) {
        console.error('Failed to load team:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  return (
    <div>
      <h1>Your Team ({team.length} members)</h1>
      <p>Department: {user?.scope?.department}</p>
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {team.map(member => (
              <tr key={member._id}>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
