import React, { useState } from 'react';
import DashboardLayout from './components/DashboardLayout';
import RecommendedEvents from './components/widgets/RecommendedEvents';
import QuickAccess from './components/widgets/QuickAccess';
import YourInterests from './components/widgets/YourInterests';
import PromoBanner from './components/widgets/PromoBanner';
import RightSidebar from './components/widgets/RightSidebar';
import EventsDirectory from './components/EventsDirectory';
import EventDetailsSidebar from './components/widgets/EventDetailsSidebar';

function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedEvent, setSelectedEvent] = useState(null);

  // If tab changes to Dashboard, we can clear the selected event if we want.
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'Dashboard') {
      setSelectedEvent(null);
    }
  };

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={handleTabChange}>
      <div style={{ display: 'flex', gap: 0, alignItems: 'flex-start' }}>
        
        {/* Main scrollable content */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', transition: 'all 0.3s' }}>
          {activeTab === 'Dashboard' && (
            <div style={{ flex: 1, minWidth: 0 }}>
              <RecommendedEvents />
              <QuickAccess />
              <YourInterests />
              <PromoBanner />
            </div>
          )}
          {activeTab === 'Events Directory' && (
            <div style={{ flex: 1, minWidth: 0 }}>
              <EventsDirectory selectedEvent={selectedEvent} setSelectedEvent={setSelectedEvent} />
            </div>
          )}
        </div>

        {/* Right sidebar */}
        {activeTab === 'Dashboard' && <RightSidebar />}
        {activeTab === 'Events Directory' && selectedEvent && (
          <EventDetailsSidebar event={selectedEvent} onClose={() => setSelectedEvent(null)} />
        )}

      </div>
    </DashboardLayout>
  );
}

export default App;
