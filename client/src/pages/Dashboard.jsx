import React from 'react';
import { Link } from 'react-router-dom';
import ServerCard from '../components/ui/SelectServer.jsx'
function Dashboard() {
  return (
    <div className="pt-16">
      <div className="text-3xl font-bold pl-6">
        Manage Server
      </div>
      <p className="pl-6 pt-2">Select Server to Manage</p>
      <div>
        <ServerCard 
        imgSrc=""
        title="check" />
      </div>
    </div>
  );
}

export default Dashboard;
