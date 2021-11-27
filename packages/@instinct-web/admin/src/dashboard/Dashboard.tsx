import React from 'react';
import {setURL} from '@instinct-web/core';
import {Card} from '../components/card/Card';
import {Jumbotron} from '../components/jumbotron/Jumbotron';
import {SalvatoreCard} from './salvatore-card/SalvatoreCard';
import {AdminLayout} from '../components/admin-layout/AdminLayout';

setURL('admin', <Dashboard />);

export function Dashboard() {
  return (
    <AdminLayout permission="websiteShowAdminPanel">
      <Jumbotron style={{background: '#263238'}} title="Admin Panel">
        <p>Welcome to the admin panel</p>
      </Jumbotron>
      <div className="page-content">
        <SalvatoreCard />
      </div>
    </AdminLayout>
  );
}
