import React, { useState, createContext, useContext, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Search, Menu, Settings, ChevronDown, ChevronRight, ChevronLeft, X, Plus, Filter, Download, Save, ExternalLink, MessageSquare, Star, Clock, AlertCircle, Check, Zap, FileText, TrendingUp, Database, BarChart2, Layers, Users } from 'lucide-react';

// Create context for application state
const AppContext = createContext();

// Simplified mock data
const mockFeedback = [
  { id: 1, source: 'Customer Survey', date: '2025-05-01', vehicle: 'SUV X3', component: 'Infotainment System', issue: 'Touchscreen responsiveness', sentiment: -0.8, text: 'The touchscreen is extremely slow to respond and freezes regularly during use.' },
  { id: 2, source: 'Service Log', date: '2025-05-02', vehicle: 'Sedan E5', component: 'Climate Control', issue: 'Temperature regulation', sentiment: -0.5, text: 'AC doesn\'t maintain consistent temperature. Fluctuates between too cold and too warm.' },
  { id: 3, source: 'Social Media', date: '2025-05-03', vehicle: 'SUV X3', component: 'Driver Assistance', issue: 'Collision warning', sentiment: 0.7, text: 'The collision warning system worked perfectly and potentially saved me from an accident today!' },
  { id: 4, source: 'Dealer Report', date: '2025-05-04', vehicle: 'Coupe S2', component: 'Engine', issue: 'Start-stop function', sentiment: -0.6, text: 'The auto start-stop feature is too aggressive and creates a jerky driving experience in traffic.' },
  { id: 5, source: 'Customer Survey', date: '2025-05-05', vehicle: 'Sedan E5', component: 'Infotainment System', issue: 'Navigation accuracy', sentiment: -0.3, text: 'The built-in navigation often suggests longer routes than necessary and misses recent road changes.' }
];

const mockClusters = [
  { id: 1, name: 'Infotainment System Issues', size: 245, sentiment: -0.4, components: ['Touchscreen', 'Navigation', 'Smartphone Integration'] },
  { id: 2, name: 'Climate Control Problems', size: 189, sentiment: -0.6, components: ['AC Performance', 'Temperature Regulation', 'Fan Noise'] },
  { id: 3, name: 'Positive Driving Experience', size: 156, sentiment: 0.8, components: ['Handling', 'Acceleration', 'Braking'] }
];

const mockSentimentTrend = [
  { date: '2025-01', sentiment: -0.2, volume: 542 },
  { date: '2025-02', sentiment: -0.3, volume: 612 },
  { date: '2025-03', sentiment: -0.1, volume: 587 },
  { date: '2025-04', sentiment: 0.2, volume: 631 },
  { date: '2025-05', sentiment: 0.1, volume: 594 }
];

const mockComponentIssues = [
  { name: 'Infotainment', issues: 245, sentiment: -0.4 },
  { name: 'Climate Control', issues: 189, sentiment: -0.6 },
  { name: 'Engine', issues: 118, sentiment: -0.3 },
  { name: 'Transmission', issues: 97, sentiment: -0.5 }
];

const mockSourceDistribution = [
  { name: 'Customer Survey', value: 35 },
  { name: 'Service Logs', value: 25 },
  { name: 'Social Media', value: 20 },
  { name: 'Dealer Reports', value: 15 },
  { name: 'Call Center', value: 5 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

// Main Application Component
export default function AutomotiveFeedbackSystem() {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [feedbackList, setFeedbackList] = useState(mockFeedback);
  const [clusters, setClusters] = useState(mockClusters);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Context value
  const contextValue = {
    activeModule, setActiveModule,
    feedbackList, clusters,
    selectedFeedback, setSelectedFeedback,
    searchQuery, setSearchQuery
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar Navigation */}
        <div className={`bg-white border-r border-gray-200 ${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 flex flex-col`}>
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h1 className={`font-bold text-blue-600 ${sidebarOpen ? 'block' : 'hidden'}`}>IQS Intelligence</h1>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1 rounded-md hover:bg-gray-100">
              <Menu size={20} />
            </button>
          </div>
          
          <nav className="flex-1 overflow-y-auto py-4">
            <NavItem 
              icon={<BarChart2 size={20} />}
              label="Dashboard"
              active={activeModule === 'dashboard'}
              collapsed={!sidebarOpen}
              onClick={() => setActiveModule('dashboard')}
            />
            <NavItem 
              icon={<Database size={20} />}
              label="Feedback Ingestion"
              active={activeModule === 'ingestion'}
              collapsed={!sidebarOpen}
              onClick={() => setActiveModule('ingestion')}
            />
            <NavItem 
              icon={<Zap size={20} />}
              label="NLP Analysis"
              active={activeModule === 'clustering'}
              collapsed={!sidebarOpen}
              onClick={() => setActiveModule('clustering')}
            />
            <NavItem 
              icon={<Search size={20} />}
              label="Search & Retrieval"
              active={activeModule === 'search'}
              collapsed={!sidebarOpen}
              onClick={() => setActiveModule('search')}
            />
            <NavItem 
              icon={<TrendingUp size={20} />}
              label="Visualization"
              active={activeModule === 'visualization'}
              collapsed={!sidebarOpen}
              onClick={() => setActiveModule('visualization')}
            />
            <NavItem 
              icon={<Users size={20} />}
              label="User Management"
              active={activeModule === 'users'}
              collapsed={!sidebarOpen}
              onClick={() => setActiveModule('users')}
            />
            <NavItem 
              icon={<Settings size={20} />}
              label="Settings"
              active={activeModule === 'settings'}
              collapsed={!sidebarOpen}
              onClick={() => setActiveModule('settings')}
            />
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between">
            <div className="flex items-center space-x-4 w-1/2">
              <div className="relative w-full max-w-lg">
                <input
                  type="text"
                  placeholder="Search feedback, components, issues..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Settings size={20} className="text-gray-500" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                  TY
                </div>
                <span className="text-sm font-medium">Takashi Yamamoto</span>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
            {activeModule === 'dashboard' && <DashboardModule />}
            {activeModule === 'ingestion' && <IngestionModule />}
            {activeModule === 'clustering' && <ClusteringModule />}
            {activeModule === 'search' && <SearchModule />}
            {activeModule === 'visualization' && <VisualizationModule />}
            {activeModule === 'users' && <UserManagementModule />}
            {activeModule === 'settings' && <SettingsModule />}
          </main>
        </div>

        {/* Detail Panel - Shown when feedback is selected */}
        {selectedFeedback && (
          <div className="bg-white border-l border-gray-200 w-96 overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-medium">Feedback Details</h3>
              <button onClick={() => setSelectedFeedback(null)} className="p-1 rounded-md hover:bg-gray-100">
                <X size={18} />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <div className="text-sm text-gray-500 mb-1">Source</div>
                <div className="flex items-center">
                  <MessageSquare size={16} className="text-blue-500 mr-2" />
                  <span>{selectedFeedback.source}</span>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500 mb-1">Date</div>
                <div className="flex items-center">
                  <Clock size={16} className="text-blue-500 mr-2" />
                  <span>{selectedFeedback.date}</span>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500 mb-1">Vehicle</div>
                <span>{selectedFeedback.vehicle}</span>
              </div>
              
              <div>
                <div className="text-sm text-gray-500 mb-1">Component</div>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {selectedFeedback.component}
                </span>
              </div>
              
              <div>
                <div className="text-sm text-gray-500 mb-1">Issue</div>
                <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                  {selectedFeedback.issue}
                </span>
              </div>
              
              <div>
                <div className="text-sm text-gray-500 mb-1">Sentiment</div>
                {selectedFeedback.sentiment > 0 ? (
                  <div className="flex items-center text-green-500">
                    <Star size={16} className="mr-1" />
                    <span>Positive ({selectedFeedback.sentiment.toFixed(1)})</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-500">
                    <AlertCircle size={16} className="mr-1" />
                    <span>Negative ({selectedFeedback.sentiment.toFixed(1)})</span>
                  </div>
                )}
              </div>
              
              <div>
                <div className="text-sm text-gray-500 mb-1">Feedback Text</div>
                <p className="text-sm p-3 bg-gray-50 rounded-md border border-gray-200">
                  {selectedFeedback.text}
                </p>
              </div>
              
              <div className="mt-6 space-y-2">
                <button className="w-full flex items-center justify-center px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors">
                  <Plus size={16} className="mr-2" />
                  Add Tags
                </button>
                <button className="w-full flex items-center justify-center px-4 py-2 bg-gray-50 text-gray-600 rounded-md hover:bg-gray-100 transition-colors">
                  <ExternalLink size={16} className="mr-2" />
                  View in Context
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppContext.Provider>
  );
}

// Navigation Item Component
function NavItem({ icon, label, active, collapsed, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center px-4 py-3 ${
        active 
          ? 'bg-blue-50 text-blue-600' 
          : 'text-gray-600 hover:bg-gray-50'
      } transition-colors ${collapsed ? 'justify-center' : 'justify-start'}`}
    >
      <span className={`${collapsed ? 'mr-0' : 'mr-3'}`}>{icon}</span>
      {!collapsed && <span>{label}</span>}
    </button>
  );
}

// KPI Card Component
function KpiCard({ title, value, change, positive, icon }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold mt-2 text-gray-800">{value}</p>
          <div className={`mt-2 flex items-center ${positive ? 'text-green-500' : 'text-red-500'}`}>
            <span className="text-sm">{change}</span>
            <span className="text-xs ml-1">vs last month</span>
          </div>
        </div>
        <div className={`p-3 rounded-full ${positive ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

// Dashboard Module
function DashboardModule() {
  const { feedbackList, setSelectedFeedback } = useContext(AppContext);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Last updated: Today at 10:23 AM</span>
        </div>
      </div>
      
      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-6">
        <KpiCard 
          title="Total Feedback" 
          value="2,457" 
          change="+12.5%" 
          positive={true}
          icon={<MessageSquare size={20} />}
        />
        <KpiCard 
          title="Sentiment Score" 
          value="-0.12" 
          change="-0.08" 
          positive={false}
          icon={<Star size={20} />}
        />
        <KpiCard 
          title="Active Clusters" 
          value="24" 
          change="+3" 
          positive={true}
          icon={<Layers size={20} />}
        />
        <KpiCard 
          title="Critical Issues" 
          value="18" 
          change="-5" 
          positive={true}
          icon={<AlertCircle size={20} />}
        />
      </div>
      
      {/* Sentiment Trend Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-800">Sentiment Trend</h2>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 text-sm bg-gray-100 rounded-md hover:bg-gray-200">
              Last 6 Months
            </button>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={mockSentimentTrend}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sentiment" stroke="#8884d8" name="Sentiment Score" />
              <Line type="monotone" dataKey="volume" stroke="#82ca9d" name="Feedback Volume" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Two Column Layout for Component Issues and Feedback Source */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-800">Component Issues</h2>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mockComponentIssues}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="issues" fill="#8884d8" name="Number of Issues" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-800">Feedback Sources</h2>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockSourceDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={entry => entry.name}
                >
                  {mockSourceDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Recent Feedback Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-800">Recent Feedback</h2>
          <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors text-sm font-medium">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vehicle</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Component</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sentiment</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {feedbackList.map((feedback) => (
                <tr 
                  key={feedback.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedFeedback(feedback)}
                >
                  <td className="py-4 px-6 text-sm">{feedback.source}</td>
                  <td className="py-4 px-6 text-sm">{feedback.date}</td>
                  <td className="py-4 px-6 text-sm">{feedback.vehicle}</td>
                  <td className="py-4 px-6 text-sm">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                      {feedback.component}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm">
                    {feedback.sentiment > 0 ? (
                      <span className="text-green-500 flex items-center">
                        <Check size={16} className="mr-1" />
                        {feedback.sentiment.toFixed(1)}
                      </span>
                    ) : (
                      <span className="text-red-500 flex items-center">
                        <AlertCircle size={16} className="mr-1" />
                        {feedback.sentiment.toFixed(1)}
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-sm">
                    <button className="text-blue-600 hover:text-blue-800">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Ingestion Module (Simplified)
function IngestionModule() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Feedback Ingestion</h1>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
            View History
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center">
            <Plus size={16} className="mr-2" />
            New Ingestion
          </button>
        </div>
      </div>
      
      {/* Ingestion Methods */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
          <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
            <FileText size={24} />
          </div>
          <h3 className="text-lg font-medium mb-2">File Upload</h3>
          <p className="text-gray-600 text-sm mb-4">
            Import feedback data from CSV, Excel, or JSON files.
          </p>
          <button className="text-blue-600 text-sm flex items-center">
            Upload Files
            <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
          <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4">
            <Database size={24} />
          </div>
          <h3 className="text-lg font-medium mb-2">API Integration</h3>
          <p className="text-gray-600 text-sm mb-4">
            Connect to data sources via real-time API endpoints.
          </p>
          <button className="text-blue-600 text-sm flex items-center">
            Configure API
            <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
          <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4">
            <MessageSquare size={24} />
          </div>
          <h3 className="text-lg font-medium mb-2">Social Media</h3>
          <p className="text-gray-600 text-sm mb-4">
            Connect social platforms to monitor customer feedback.
          </p>
          <button className="text-blue-600 text-sm flex items-center">
            Connect Accounts
            <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
      
      {/* Recent Ingestion Jobs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-800">Recent Ingestion Jobs</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job ID</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Records</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="py-4 px-6 text-sm font-medium">JOB-2025-1234</td>
                <td className="py-4 px-6 text-sm">Customer Survey Export</td>
                <td className="py-4 px-6 text-sm">May 15, 2025</td>
                <td className="py-4 px-6 text-sm">547</td>
                <td className="py-4 px-6 text-sm">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    Completed
                  </span>
                </td>
                <td className="py-4 px-6 text-sm">
                  <button className="text-blue-600 hover:text-blue-800 mr-3">
                    View
                  </button>
                  <button className="text-gray-600 hover:text-gray-800">
                    Download
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-4 px-6 text-sm font-medium">JOB-2025-1233</td>
                <td className="py-4 px-6 text-sm">Service Logs</td>
                <td className="py-4 px-6 text-sm">May 14, 2025</td>
                <td className="py-4 px-6 text-sm">312</td>
                <td className="py-4 px-6 text-sm">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    Completed
                  </span>
                </td>
                <td className="py-4 px-6 text-sm">
                  <button className="text-blue-600 hover:text-blue-800 mr-3">
                    View
                  </button>
                  <button className="text-gray-600 hover:text-gray-800">
                    Download
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// NLP Analysis Module (Simplified)
function AnalysisModule() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">NLP Analysis</h1>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Run Analysis
          </button>
        </div>
      </div>
      
      {/* Analysis Overview */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Entity Recognition</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Components</span>
                <span className="text-sm font-medium">543 identified</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Issues</span>
                <span className="text-sm font-medium">421 identified</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Vehicle Models</span>
                <span className="text-sm font-medium">32 identified</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Sentiment Analysis</h3>
          <div className="flex items-center justify-center h-36">
            <div className="flex items-center justify-between w-full">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 mx-auto">
                  <AlertCircle size={32} />
                </div>
                <p className="text-sm mt-2">Negative</p>
                <p className="text-xl font-bold">42%</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 mx-auto">
                  <div className="w-8 h-1 bg-gray-400 rounded-full"></div>
                </div>
                <p className="text-sm mt-2">Neutral</p>
                <p className="text-xl font-bold">25%</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto">
                  <Check size={32} />
                </div>
                <p className="text-sm mt-2">Positive</p>
                <p className="text-xl font-bold">33%</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Language Detection</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span>English</span>
              <span className="text-sm font-medium">68%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Spanish</span>
              <span className="text-sm font-medium">14%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>German</span>
              <span className="text-sm font-medium">8%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>French</span>
              <span className="text-sm font-medium">6%</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Other</span>
              <span className="text-sm font-medium">4%</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* LLM Configuration */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-medium mb-4">LLM Configuration</h2>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Model</h3>
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-md">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-purple-100 rounded-md flex items-center justify-center text-purple-600 mr-3">
                  <Zap size={20} />
                </div>
                <div>
                  <p className="font-medium">IQS Intelligence LLM v3.2</p>
                  <p className="text-xs text-gray-500">Last updated: May 10, 2025</p>
                </div>
              </div>
              <div>
                <button className="px-3 py-1 text-xs bg-gray-100 rounded-md hover:bg-gray-200">
                  Change Model
                </button>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">Prompt Templates</h3>
            <div className="border border-gray-200 rounded-md divide-y divide-gray-200">
              <div className="p-3 hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Entity Extraction</p>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
                <p className="text-xs text-gray-500 mt-1">Extracts components, issues, and vehicle models</p>
              </div>
              
              <div className="p-3 hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center justify-between">
                  <p className="font-medium">Sentiment Analysis</p>
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
                <p className="text-xs text-gray-500 mt-1">Component-level sentiment scoring</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Clustering Module (Enhanced for Business Users)
function ClusteringModule() {
  const { clusters, setSelectedFeedback, feedbackList } = useContext(AppContext);
  const [timeRange, setTimeRange] = useState('last30days');
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [showInsights, setShowInsights] = useState(true);
  const [selectedView, setSelectedView] = useState('topics');
  const [selectedHistoricalEvent, setSelectedHistoricalEvent] = useState(null);
  
  // Mock historical manufacturing/design change events data
  const designChanges = [
    { id: 1, date: '2025-02-15', type: 'design', component: 'Infotainment System', description: 'UI Redesign v2.1', impact: 'positive' },
    { id: 2, date: '2025-03-01', type: 'manufacturing', component: 'Climate Control', description: 'New Temperature Sensor', impact: 'positive' },
    { id: 3, date: '2025-01-10', type: 'design', component: 'Driver Assistance', description: 'Safety Algorithm Update', impact: 'positive' },
    { id: 4, date: '2025-04-05', type: 'manufacturing', component: 'Touchscreen', description: 'New Supplier for Display Panels', impact: 'negative' },
    { id: 5, date: '2025-04-20', type: 'design', component: 'Touchscreen', description: 'Emergency Firmware Update', impact: 'positive' }
  ];
  
  // Helper function to get color based on sentiment
  const getSentimentColor = (sentiment) => {
    if (sentiment > 0.5) return "#10B981"; // Green
    if (sentiment > 0) return "#60A5FA"; // Light blue
    if (sentiment > -0.5) return "#F59E0B"; // Orange
    return "#EF4444"; // Red
  };

  // Calculate additional cluster metrics
  const priorityIssues = clusters
    .filter(c => c.sentiment < 0)
    .sort((a, b) => (a.sentiment * a.size) - (b.sentiment * b.size))
    .slice(0, 3);
  
  const positiveHighlights = clusters
    .filter(c => c.sentiment > 0)
    .sort((a, b) => (b.sentiment * b.size) - (a.sentiment * a.size))
    .slice(0, 2);
  
  // Mock data for trend visualization with design change markers
  const trendData = [
    { month: '2025-01', infotainment: 120, climate: 80, engine: 50, events: [3] },
    { month: '2025-02', infotainment: 150, climate: 100, engine: 55, events: [1] },
    { month: '2025-03', infotainment: 170, climate: 110, engine: 60, events: [2] },
    { month: '2025-04', infotainment: 210, climate: 130, engine: 70, events: [4, 5] },
    { month: '2025-05', infotainment: 180, climate: 90, engine: 75, events: [] }
  ];
  
  // Mock data for topic evolution
  const topicEvolutionData = [
    { name: 'Touchscreen Issues', month: '2025-01', value: 80 },
    { name: 'Touchscreen Issues', month: '2025-02', value: 95 },
    { name: 'Touchscreen Issues', month: '2025-03', value: 110 },
    { name: 'Touchscreen Issues', month: '2025-04', value: 180 },
    { name: 'Touchscreen Issues', month: '2025-05', value: 120 },
    
    { name: 'Navigation Errors', month: '2025-01', value: 45 },
    { name: 'Navigation Errors', month: '2025-02', value: 60 },
    { name: 'Navigation Errors', month: '2025-03', value: 70 },
    { name: 'Navigation Errors', month: '2025-04', value: 65 },
    { name: 'Navigation Errors', month: '2025-05', value: 50 },
    
    { name: 'Climate Control', month: '2025-01', value: 85 },
    { name: 'Climate Control', month: '2025-02', value: 90 },
    { name: 'Climate Control', month: '2025-03', value: 65 },
    { name: 'Climate Control', month: '2025-04', value: 45 },
    { name: 'Climate Control', month: '2025-05', value: 35 },
    
    { name: 'Driving Experience', month: '2025-01', value: 30 },
    { name: 'Driving Experience', month: '2025-02', value: 35 },
    { name: 'Driving Experience', month: '2025-03', value: 45 },
    { name: 'Driving Experience', month: '2025-04', value: 60 },
    { name: 'Driving Experience', month: '2025-05', value: 80 }
  ];
  
  // Correlation matrix data
  const componentCorrelationData = [
    { id: 'infotainment', correlations: [
      { id: 'touchscreen', value: 0.85, issues: 210 },
      { id: 'navigation', value: 0.72, issues: 130 },
      { id: 'audio', value: 0.45, issues: 85 },
      { id: 'connectivity', value: 0.65, issues: 95 }
    ]},
    { id: 'climate', correlations: [
      { id: 'temperature', value: 0.78, issues: 150 },
      { id: 'air_flow', value: 0.56, issues: 90 },
      { id: 'noise', value: 0.32, issues: 40 }
    ]},
    { id: 'engine', correlations: [
      { id: 'starting', value: 0.62, issues: 105 },
      { id: 'performance', value: 0.48, issues: 80 },
      { id: 'noise', value: 0.41, issues: 70 }
    ]}
  ];
  
  // Topic modeling data
  const topicModelingData = {
    name: "All Feedback",
    value: 2457,
    sentiment: -0.12,
    children: [
      {
        name: "Infotainment",
        value: 850,
        sentiment: -0.35,
        children: [
          { name: "Touchscreen", value: 350, sentiment: -0.8 },
          { name: "Navigation", value: 230, sentiment: -0.3 },
          { name: "Connectivity", value: 150, sentiment: -0.2 },
          { name: "Audio System", value: 120, sentiment: 0.3 }
        ]
      },
      {
        name: "Climate Control",
        value: 580,
        sentiment: -0.25,
        children: [
          { name: "Temperature Regulation", value: 250, sentiment: -0.5 },
          { name: "Air Flow", value: 180, sentiment: -0.2 },
          { name: "Noise", value: 150, sentiment: 0.1 }
        ]
      },
      {
        name: "Driving Experience",
        value: 520,
        sentiment: 0.45,
        children: [
          { name: "Comfort", value: 220, sentiment: 0.7 },
          { name: "Handling", value: 180, sentiment: 0.3 },
          { name: "Safety Features", value: 120, sentiment: 0.6 }
        ]
      },
      {
        name: "Exterior",
        value: 220,
        sentiment: 0.25,
        children: [
          { name: "Paint Quality", value: 100, sentiment: 0.5 },
          { name: "Design", value: 120, sentiment: 0.1 }
        ]
      },
      {
        name: "Engine/Performance",
        value: 287,
        sentiment: -0.15,
        children: [
          { name: "Start-Stop Function", value: 120, sentiment: -0.6 },
          { name: "Power Delivery", value: 95, sentiment: 0.1 },
          { name: "Fuel Efficiency", value: 72, sentiment: 0.2 }
        ]
      }
    ]
  };
  
  // Calculate which design changes might have impacted which issues
  const getDesignChangeImpact = (designChange) => {
    // Simulate impact on relevant topics
    const relatedTopics = topicEvolutionData
      .filter(topic => {
        // Find all months after the change
        const changeMonth = designChange.date.substring(0, 7);
        const isAfterChange = topic.month >= changeMonth;
        
        // Check if topic related to the component
        const isRelatedComponent = 
          topic.name.toLowerCase().includes(designChange.component.toLowerCase()) ||
          designChange.component.toLowerCase().includes(topic.name.toLowerCase());
        
        return isAfterChange && isRelatedComponent;
      })
      .map(topic => topic.name)
      .filter((value, index, self) => self.indexOf(value) === index); // Get unique
    
    // Calculate sentiment change after intervention
    let sentimentBefore = -0.5; // Simulated
    let sentimentAfter = designChange.impact === 'positive' ? 0.2 : -0.7; // Simulated
    
    return {
      change: designChange,
      relatedTopics,
      sentimentChange: sentimentAfter - sentimentBefore,
      feedbackVolume: {
        before: Math.floor(Math.random() * 100) + 50,
        after: Math.floor(Math.random() * 100) + 20
      }
    };
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">NLP Analysis</h1>
          <p className="text-gray-500 mt-1">Track feedback trends and measure impact of design/manufacturing changes</p>
        </div>
        <div className="flex items-center space-x-3">
          <select 
            className="px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="last30days">Last 30 days</option>
            <option value="last90days">Last 90 days</option>
            <option value="last6months">Last 6 months</option>
            <option value="lastYear">Last year</option>
            <option value="custom">Custom range</option>
          </select>
          <div className="relative inline-block">
            <select 
              className="px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedView}
              onChange={(e) => setSelectedView(e.target.value)}
            >
              <option value="topics">Topic Analysis</option>
              <option value="correlations">Component Correlations</option>
              <option value="impact">Impact Assessment</option>
              <option value="temporal">Temporal Analysis</option>
              <option value="root">Root Cause Analysis</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Insights Panel */}
      {showInsights && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-800">Key Insights</h2>
            <button 
              onClick={() => setShowInsights(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-3">
              <h3 className="font-medium text-red-600 flex items-center">
                <AlertCircle size={18} className="mr-2" />
                Top Issues to Address
              </h3>
              <ul className="space-y-2">
                {priorityIssues.map((issue, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-red-500 mr-2">{i+1}.</span>
                    <div>
                      <p className="font-medium">{issue.name}</p>
                      <p className="text-xs text-gray-500">
                        {issue.size} customers affected, sentiment: {issue.sentiment.toFixed(1)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-medium text-green-600 flex items-center">
                <Check size={18} className="mr-2" />
                Recent Improvements
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <div>
                    <p className="font-medium">Climate Control Issues</p>
                    <p className="text-xs text-gray-500">
                      <span className="text-green-500 font-medium">↓ 46% decrease</span> since temperature sensor upgrade
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <div>
                    <p className="font-medium">Touchscreen Responsiveness</p>
                    <p className="text-xs text-gray-500">
                      <span className="text-green-500 font-medium">↓ 33% decrease</span> after emergency firmware update
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-medium text-blue-600 flex items-center">
                <TrendingUp size={18} className="mr-2" />
                Emerging Topics
              </h3>
              <div>
                <p className="mb-1 font-medium">Driving Experience Praise</p>
                <p className="text-xs text-gray-500 mb-2">
                  <span className="text-green-500 font-medium">↑ 166% increase</span> in positive feedback since January
                </p>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: "70%" }}></div>
                </div>
              </div>
              <div className="mt-3">
                <p className="mb-1 font-medium">New Theme: Smartphone Integration</p>
                <p className="text-xs text-gray-500 mb-2">
                  New topic emerging in April with <span className="text-green-500 font-medium">+0.8 sentiment</span>
                </p>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: "40%" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Analysis Stats */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm text-gray-500">Feedback Topics</h3>
          <p className="text-2xl font-bold mt-2">24</p>
          <div className="mt-4 text-xs flex items-center text-green-500">
            <span>+3 new topics since last period</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm text-gray-500">Customer Feedback</h3>
          <p className="text-2xl font-bold mt-2">2,457</p>
          <div className="mt-4 text-xs text-green-500">+12.5% since last period</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm text-gray-500">Overall Sentiment</h3>
          <div className="flex items-center mt-2">
            <p className="text-2xl font-bold">-0.12</p>
            <span className="ml-2 px-2 py-1 bg-orange-100 text-orange-600 rounded-full text-xs">
              Needs Attention
            </span>
          </div>
          <div className="mt-4 text-xs text-green-500">+0.08 improvement since last period</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm text-gray-500">Design Changes</h3>
          <p className="text-2xl font-bold mt-2">5</p>
          <div className="mt-4 text-xs">
            <span className="text-green-500">3 positive</span> · <span className="text-red-500">1 negative</span> · <span className="text-gray-500">1 neutral impact</span>
          </div>
        </div>
      </div>
      
      {/* Topic Modeling Visualization - Hierarchical View */}
      {selectedView === 'topics' && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-medium text-gray-800">Feedback Topic Overview</h2>
              <p className="text-sm text-gray-500">Summary of key topics identified in customer feedback</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">Top Negative Topics</h3>
              {topicModelingData.children
                .flatMap(category => category.children)
                .filter(topic => topic.sentiment < 0)
                .sort((a, b) => a.sentiment - b.sentiment)
                .slice(0, 5)
                .map((topic, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200">
                    <div>
                      <div className="font-medium">{topic.name}</div>
                      <div className="text-xs text-gray-500">{topic.value} feedback items</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center text-red-500">
                        <AlertCircle size={14} className="mr-1" />
                        <span>{topic.sentiment.toFixed(1)}</span>
                      </div>
                      <button className="text-xs text-blue-600 hover:underline">View Details</button>
                    </div>
                  </div>
                ))
              }
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">Top Positive Topics</h3>
              {topicModelingData.children
                .flatMap(category => category.children)
                .filter(topic => topic.sentiment > 0)
                .sort((a, b) => b.sentiment - a.sentiment)
                .slice(0, 5)
                .map((topic, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200">
                    <div>
                      <div className="font-medium">{topic.name}</div>
                      <div className="text-xs text-gray-500">{topic.value} feedback items</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center text-green-500">
                        <Check size={14} className="mr-1" />
                        <span>+{topic.sentiment.toFixed(1)}</span>
                      </div>
                      <button className="text-xs text-blue-600 hover:underline">View Details</button>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Topic Categories Distribution</h3>
            <div className="grid grid-cols-5 gap-4">
              {topicModelingData.children.map((category, i) => {
                const color = getSentimentColor(category.sentiment);
                return (
                  <div key={i} className="text-center">
                    <div 
                      className="w-full h-4 mb-2 rounded-full" 
                      style={{ backgroundColor: color }}
                    ></div>
                    <div className="font-medium text-sm">{category.name}</div>
                    <div className="text-xs text-gray-500">{category.value} items ({Math.round(category.value/topicModelingData.value*100)}%)</div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="mt-4 bg-blue-50 p-4 rounded-md border border-blue-100">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Topic Analysis Insights</h3>
            <ul className="text-sm text-blue-700 space-y-2">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><b>Infotainment System</b> represents the largest category of feedback (34%), with <b>Touchscreen Issues</b> being the most negative subcategory.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><b>Driving Experience</b> is the most positive category, specifically the <b>Comfort</b> subcategory which has a sentiment score of +0.7.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Significant correlation detected between <b>Climate Control</b> issues and <b>Infotainment</b> issues (33% of customers mention both).</span>
              </li>
            </ul>
          </div>
        </div>
      )}
      
      {/* Component Correlations */}
      {selectedView === 'correlations' && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-800">Component Correlation Analysis</h2>
            <select className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-md text-sm">
              <option>Top Components</option>
              <option>All Components</option>
            </select>
          </div>
          
          <div className="space-y-6">
            {/* Correlation visualization */}
            {componentCorrelationData.map((component, idx) => (
              <div key={idx} className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <h3 className="text-md font-medium capitalize mb-3">{component.id} System</h3>
                
                <div className="space-y-4">
                  {component.correlations.map((corr, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <div className="w-32 text-sm capitalize">{corr.id.replace('_', ' ')}</div>
                      <div className="flex-1">
                        <div className="h-6 w-full bg-gray-200 rounded-md overflow-hidden flex">
                          <div 
                            className="h-full bg-blue-500 flex items-center pl-2 text-white text-xs"
                            style={{ width: `${corr.value * 100}%` }}
                          >
                            {Math.round(corr.value * 100)}%
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500 w-20 text-right">{corr.issues} issues</div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-xs text-gray-500">
                  Correlation measures how often issues are mentioned together in customer feedback
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 bg-blue-50 p-4 rounded-md border border-blue-100">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Correlation Insights</h3>
            <ul className="text-sm text-blue-700 space-y-2">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Strong correlation (85%) between <b>Infotainment System</b> and <b>Touchscreen</b> issues suggests these should be addressed together.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><b>Temperature Regulation</b> and <b>Air Flow</b> are often mentioned together (78% correlation), indicating a potential systemic issue in the Climate Control system.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><b>Noise</b> appears across multiple systems (Engine and Climate), suggesting a need for broader noise reduction strategies.</span>
              </li>
            </ul>
          </div>
        </div>
      )}
      
      {/* Impact Assessment */}
      {selectedView === 'impact' && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-800">Design & Manufacturing Change Impact</h2>
            <select className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-md text-sm">
              <option>All Changes</option>
              <option>Design Changes</option>
              <option>Manufacturing Changes</option>
            </select>
          </div>
          
          <div className="space-y-4">
            {designChanges.map((change, i) => {
              const impact = getDesignChangeImpact(change);
              const isPositive = change.impact === 'positive';
              const statusColor = isPositive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
              const arrowIcon = isPositive ? '↓' : '↑';
              
              return (
                <div key={i} className="p-4 border border-gray-200 rounded-md hover:bg-gray-50">
                  <div className="flex items-start">
                    <div className={`w-12 h-12 rounded-full ${isPositive ? 'bg-green-100' : 'bg-red-100'} flex items-center justify-center ${isPositive ? 'text-green-600' : 'text-red-600'} mr-4 flex-shrink-0`}>
                      {change.type === 'design' ? 'D' : 'M'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium">{change.description}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${statusColor}`}>
                          {change.impact === 'positive' ? 'Positive Impact' : 'Negative Impact'}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mb-3">
                        {change.component} · {change.date} · {change.type === 'design' ? 'Design Change' : 'Manufacturing Change'}
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mt-2">
                        <div>
                          <div className="text-sm font-medium mb-1">Related Topics</div>
                          <div className="flex flex-wrap gap-1">
                            {impact.relatedTopics.map((topic, j) => (
                              <span key={j} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                {topic}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium mb-1">Feedback Volume</div>
                          <div className="flex items-center space-x-2">
                            <span>{impact.feedbackVolume.before}</span>
                            <span className="text-gray-400">→</span>
                            <span>{impact.feedbackVolume.after}</span>
                            <span className={isPositive ? 'text-green-500' : 'text-red-500'}>
                              {arrowIcon} {Math.round(Math.abs((impact.feedbackVolume.after - impact.feedbackVolume.before) / impact.feedbackVolume.before * 100))}%
                            </span>
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium mb-1">Sentiment Change</div>
                          <div className={isPositive ? 'text-green-500' : 'text-red-500'}>
                            {impact.sentimentChange > 0 ? '+' : ''}{impact.sentimentChange.toFixed(2)} points
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 bg-blue-50 p-4 rounded-md border border-blue-100">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Impact Assessment Insights</h3>
            <ul className="text-sm text-blue-700 space-y-2">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>The <b>Emergency Firmware Update</b> for touchscreens successfully reduced negative feedback by approximately 33%.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Changing to a <b>New Supplier for Display Panels</b> had an unexpected negative impact, increasing complaints by 42%.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>The <b>New Temperature Sensor</b> implementation shows the largest positive impact, reducing climate control complaints by 46%.</span>
              </li>
            </ul>
          </div>
        </div>
      )}
      
      {/* Temporal Analysis */}
      {selectedView === 'temporal' && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-800">Topic Evolution Over Time</h2>
            <select className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-md text-sm">
              <option>Last 5 Months</option>
              <option>Last 12 Months</option>
            </select>
          </div>
          
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month"
                  tick={({ x, y, payload }) => {
                    // Check if this month has events
                    const hasEvents = trendData.find(d => d.month === payload.value)?.events?.length > 0;
                    
                    return (
                      <g transform={`translate(${x},${y})`}>
                        <text x={0} y={0} dy={16} textAnchor="middle" fill="#666">{payload.value.split('-')[1]}</text>
                        {hasEvents && (
                          <circle cx={0} cy={-5} r={5} fill="#FCD34D" />
                        )}
                      </g>
                    );
                  }}
                />
                <YAxis />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      // Get events for this month
                      const monthData = trendData.find(d => d.month === label);
                      const monthEvents = monthData?.events || [];
                      const relevantChanges = designChanges.filter(c => monthEvents.includes(c.id));
                      
                      return (
                        <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
                          <p className="font-medium">{label}</p>
                          {payload.map((entry, index) => (
                            <p key={`item-${index}`} style={{ color: entry.color }}>
                              {entry.name}: {entry.value}
                            </p>
                          ))}
                          
                          {relevantChanges.length > 0 && (
                            <div className="mt-2 pt-2 border-t border-gray-200">
                              <p className="font-medium text-xs">Changes this month:</p>
                              {relevantChanges.map((change, i) => (
                                <p key={i} className="text-xs mt-1">
                                  • {change.description}
                                </p>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    }
                    
                    return null;
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="infotainment" stroke="#EF4444" name="Infotainment Issues" />
                <Line type="monotone" dataKey="climate" stroke="#F59E0B" name="Climate Control Issues" />
                <Line type="monotone" dataKey="engine" stroke="#60A5FA" name="Engine Issues" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
            <div className="flex items-center mr-4">
              <div className="w-4 h-4 bg-yellow-300 rounded-full mr-2"></div>
              <span>Design/Manufacturing Change</span>
            </div>
          </div>
          
          <div className="mt-4 bg-blue-50 p-4 rounded-md border border-blue-100">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Temporal Analysis Insights</h3>
            <ul className="text-sm text-blue-700 space-y-2">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><b>Infotainment Issues</b> spiked in April following a new display panel supplier, then decreased after the emergency firmware update.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><b>Climate Control Issues</b> show a steady decline since March, correlating with the new temperature sensor implementation.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><b>Engine Issues</b> have remained relatively stable, with a slight upward trend that may require monitoring.</span>
              </li>
            </ul>
          </div>
        </div>
      )}
      
      {/* Root Cause Analysis */}
      {selectedView === 'root' && (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-800">Root Cause Analysis</h2>
            <select className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-md text-sm">
              <option>Touchscreen Issues</option>
              <option>Climate Control Issues</option>
              <option>Engine Issues</option>
            </select>
          </div>
          
          <div className="bg-gray-50 p-5 rounded-md border border-gray-200">
            <h3 className="font-medium mb-4">Touchscreen Issues - Root Cause Analysis</h3>
            
            <div className="relative">
              {/* Central issue */}
              <div className="absolute left-1/2 top-0 transform -translate-x-1/2 w-44 py-3 bg-red-100 border border-red-200 rounded-md text-center text-red-800 font-medium">
                Touchscreen Unresponsiveness
              </div>
              
              {/* Contributing factors - first level */}
              <div className="flex justify-between mt-24">
                <div className="w-40 py-3 bg-orange-100 border border-orange-200 rounded-md text-center text-orange-800 font-medium">
                  Hardware Issues
                  <div className="absolute w-px h-20 bg-gray-300 top-12 left-1/2 transform -translate-x-1/2"></div>
                </div>
                <div className="w-40 py-3 bg-orange-100 border border-orange-200 rounded-md text-center text-orange-800 font-medium">
                  Software Issues
                  <div className="absolute w-px h-20 bg-gray-300 top-12 left-1/2 transform -translate-x-1/2"></div>
                </div>
                <div className="w-40 py-3 bg-orange-100 border border-orange-200 rounded-md text-center text-orange-800 font-medium">
                  Design Issues
                  <div className="absolute w-px h-20 bg-gray-300 top-12 left-1/2 transform -translate-x-1/2"></div>
                </div>
              </div>
              
              {/* Second level factors */}
              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="space-y-2">
                  <div className="py-2 px-2 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-800">
                    Supplier Quality Control (42%)
                  </div>
                  <div className="py-2 px-2 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-800">
                    Component Sensitivity (27%)
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="py-2 px-2 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-800">
                    Firmware Version 2.1 (65%)
                  </div>
                  <div className="py-2 px-2 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-800">
                    Memory Leak (38%)
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="py-2 px-2 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-800">
                    UI Element Size (31%)
                  </div>
                  <div className="py-2 px-2 bg-yellow-50 border border-yellow-200 rounded-md text-sm text-yellow-800">
                    Touch Target Precision (24%)
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-sm text-gray-500">
              Percentages indicate frequency of mention in customer feedback. Higher percentages suggest stronger correlation with the main issue.
            </div>
          </div>
          
          <div className="mt-6 bg-blue-50 p-4 rounded-md border border-blue-100">
            <h3 className="text-sm font-medium text-blue-800 mb-2">Root Cause Analysis Insights</h3>
            <ul className="text-sm text-blue-700 space-y-2">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>The primary driver of touchscreen issues appears to be <b>Firmware Version 2.1</b> (65% correlation), which aligns with the timing of increased complaints.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span><b>Supplier Quality Control</b> (42%) is the most significant hardware factor, supporting the observation that changing display panel suppliers had a negative impact.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>The emergency firmware update addressed the most critical issues, but <b>Memory Leak</b> (38%) may still require further optimization.</span>
              </li>
            </ul>
          </div>
        </div>
      )}
      
      {/* Action Recommendations */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-800">Recommended Actions</h2>
          <button className="text-sm text-blue-600 hover:text-blue-800">
            Download Report
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-md flex items-start">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600 mr-4 flex-shrink-0">
              <AlertCircle size={24} />
            </div>
            <div>
              <h3 className="font-medium">Review Touchscreen Panel Supplier Change</h3>
              <p className="text-sm text-gray-500 mt-1">
                New display panel supplier (changed April 5) correlates with 42% increase in touchscreen complaints. Root cause analysis indicates potential quality control issues.
              </p>
              <div className="mt-3 flex space-x-3">
                <button className="px-3 py-1 bg-red-50 text-red-600 text-sm rounded-md hover:bg-red-100">
                  Escalate to Procurement
                </button>
                <button className="px-3 py-1 text-blue-600 text-sm hover:underline">
                  View Related Feedback
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-md flex items-start">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mr-4 flex-shrink-0">
              <AlertCircle size={24} />
            </div>
            <div>
              <h3 className="font-medium">Investigate Potential Memory Leak in Infotainment System</h3>
              <p className="text-sm text-gray-500 mt-1">
                Root cause analysis identified memory leak as a significant contributor (38%) to touchscreen issues. Emergency firmware update improved responsiveness but may not have fully resolved the underlying issue.
              </p>
              <div className="mt-3 flex space-x-3">
                <button className="px-3 py-1 bg-orange-50 text-orange-600 text-sm rounded-md hover:bg-orange-100">
                  Schedule Engineering Review
                </button>
                <button className="px-3 py-1 text-blue-600 text-sm hover:underline">
                  View Technical Analysis
                </button>
              </div>
            </div>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-md flex items-start">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 mr-4 flex-shrink-0">
              <Check size={24} />
            </div>
            <div>
              <h3 className="font-medium">Expand New Temperature Sensor Implementation</h3>
              <p className="text-sm text-gray-500 mt-1">
                The new temperature sensor upgrade has led to a 46% reduction in climate control complaints. Consider expanding this improvement to all vehicle models based on positive impact.
              </p>
              <div className="mt-3 flex space-x-3">
                <button className="px-3 py-1 bg-green-50 text-green-600 text-sm rounded-md hover:bg-green-100">
                  Prepare Implementation Proposal
                </button>
                <button className="px-3 py-1 text-blue-600 text-sm hover:underline">
                  View Impact Assessment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Topic Trend Table - Simplified View */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-800">Topic Trend Analysis</h2>
          <div className="flex items-center space-x-2">
            <select className="px-3 py-1 bg-gray-100 border border-gray-300 rounded-md text-sm">
              <option>Sort by Volume</option>
              <option>Sort by Trend</option>
              <option>Sort by Sentiment</option>
            </select>
            <button className="p-1 rounded-md hover:bg-gray-100">
              <Download size={16} className="text-gray-500" />
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topic</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sentiment</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Related Changes</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="py-4 px-6 text-sm font-medium">Touchscreen Responsiveness</td>
                <td className="py-4 px-6 text-sm">350</td>
                <td className="py-4 px-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="h-1 w-16 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500" style={{width: '70%'}}></div>
                    </div>
                    <span className="text-red-500">↑ 42%</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm">
                  <span className="text-red-500 flex items-center">
                    <AlertCircle size={16} className="mr-1" />
                    -0.8
                  </span>
                </td>
                <td className="py-4 px-6 text-sm">
                  <div className="flex flex-wrap gap-1">
                    <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs">
                      Display Panel Change
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">
                      Firmware Update
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm">
                  <button 
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => {
                      const touchscreenFeedback = feedbackList.find(f => 
                        f.component.toLowerCase().includes('infotainment') && 
                        f.issue.toLowerCase().includes('touchscreen')
                      );
                      if (touchscreenFeedback) {
                        setSelectedFeedback(touchscreenFeedback);
                      }
                    }}
                  >
                    View Feedback
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-4 px-6 text-sm font-medium">Temperature Regulation</td>
                <td className="py-4 px-6 text-sm">250</td>
                <td className="py-4 px-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="h-1 w-16 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{width: '46%'}}></div>
                    </div>
                    <span className="text-green-500">↓ 46%</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm">
                  <span className="text-red-500 flex items-center">
                    <AlertCircle size={16} className="mr-1" />
                    -0.5
                  </span>
                </td>
                <td className="py-4 px-6 text-sm">
                  <div className="flex flex-wrap gap-1">
                    <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">
                      Temperature Sensor
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm">
                  <button className="text-blue-600 hover:text-blue-800">
                    View Feedback
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-4 px-6 text-sm font-medium">Driving Comfort</td>
                <td className="py-4 px-6 text-sm">220</td>
                <td className="py-4 px-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="h-1 w-16 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{width: '80%'}}></div>
                    </div>
                    <span className="text-green-500">↑ 166%</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm">
                  <span className="text-green-500 flex items-center">
                    <Check size={16} className="mr-1" />
                    +0.7
                  </span>
                </td>
                <td className="py-4 px-6 text-sm">
                  <div className="text-gray-400 italic text-xs">No related changes</div>
                </td>
                <td className="py-4 px-6 text-sm">
                  <button className="text-blue-600 hover:text-blue-800">
                    View Feedback
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Search Module (Enhanced with Advanced Features)
function SearchModule() {
  const { feedbackList, setSelectedFeedback, searchQuery, setSearchQuery } = useContext(AppContext);
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    components: [],
    vehicles: [],
    sentiment: [],
    sources: [],
    dates: { start: null, end: null },
    cluster: null
  });
  const [searchMode, setSearchMode] = useState('semantic'); // semantic, keyword, hybrid
  const [savedSearches, setSavedSearches] = useState([
    { id: 1, name: 'Recent Infotainment Issues', query: 'infotainment system problems', filters: { sentiment: ['negative'] } },
    { id: 2, name: 'Positive Safety Feedback', query: 'safety features', filters: { sentiment: ['positive'] } }
  ]);
  const [showSaveSearchModal, setShowSaveSearchModal] = useState(false);
  const [newSearchName, setNewSearchName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState('relevance');
  const [querySuggestions, setQuerySuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const [showQuerySuggestions, setShowQuerySuggestions] = useState(false);
  
  // Simulated vehicle attributes for faceted filtering
  const vehicleAttributes = {
    models: ['SUV X3', 'Sedan E5', 'Coupe S2', 'Hatchback H1', 'Electric EV4'],
    years: ['2025', '2024', '2023', '2022', '2021'],
    components: ['Infotainment System', 'Climate Control', 'Driver Assistance', 'Engine', 'Transmission', 'Interior Materials', 'Exterior Design']
  };

  // Simulated feedback clusters
  const clusterOptions = [
    { id: 1, name: 'Infotainment System Issues' },
    { id: 2, name: 'Climate Control Problems' },
    { id: 3, name: 'Positive Driving Experience' },
    { id: 4, name: 'Interior Comfort Highlights' }
  ];
  
  // Generate mock query suggestions based on input
  useEffect(() => {
    if (searchQuery.length > 2) {
      // Simulate query suggestions with automotive terminology expansion
      const suggestions = [
        searchQuery + " issues",
        searchQuery + " problems",
        searchQuery + " not working",
        "problems with " + searchQuery,
        searchQuery + " in " + vehicleAttributes.models[Math.floor(Math.random() * vehicleAttributes.models.length)]
      ];
      
      // Add automotive terminology expansion
      if (searchQuery.toLowerCase().includes('screen')) {
        suggestions.push('infotainment touchscreen responsiveness');
        suggestions.push('display issues');
      } else if (searchQuery.toLowerCase().includes('ac') || searchQuery.toLowerCase().includes('cold')) {
        suggestions.push('climate control temperature');
        suggestions.push('air conditioning malfunction');
      } else if (searchQuery.toLowerCase().includes('drive') || searchQuery.toLowerCase().includes('driving')) {
        suggestions.push('driving experience');
        suggestions.push('driver assistance features');
      }
      
      setQuerySuggestions(suggestions);
      setShowQuerySuggestions(true);
    } else {
      setQuerySuggestions([]);
      setShowQuerySuggestions(false);
    }
  }, [searchQuery]);
  
  // Handle search input key navigation for suggestions
  const handleSearchKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setSelectedSuggestion(prev => Math.min(prev + 1, querySuggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      setSelectedSuggestion(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter' && selectedSuggestion >= 0) {
      setSearchQuery(querySuggestions[selectedSuggestion]);
      setShowQuerySuggestions(false);
      setSelectedSuggestion(-1);
    } else if (e.key === 'Escape') {
      setShowQuerySuggestions(false);
    }
  };
  
  // Simulated search results with scores
  const getFilteredResults = () => {
    // Start with basic text filtering
    let results = searchQuery 
      ? feedbackList.filter(item => 
          item.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.component.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.issue.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.vehicle.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : feedbackList;
    
    // Apply active filters 
    if (activeFilters.components.length > 0) {
      results = results.filter(item => 
        activeFilters.components.some(c => 
          item.component.toLowerCase().includes(c.toLowerCase())
        )
      );
    }
    
    if (activeFilters.vehicles.length > 0) {
      results = results.filter(item => 
        activeFilters.vehicles.includes(item.vehicle)
      );
    }
    
    if (activeFilters.sentiment.length > 0) {
      results = results.filter(item => {
        if (activeFilters.sentiment.includes('positive') && item.sentiment > 0) return true;
        if (activeFilters.sentiment.includes('neutral') && item.sentiment === 0) return true;
        if (activeFilters.sentiment.includes('negative') && item.sentiment < 0) return true;
        return false;
      });
    }
    
    if (activeFilters.sources.length > 0) {
      results = results.filter(item => 
        activeFilters.sources.includes(item.source)
      );
    }
    
    // Calculate result scores (simulated)
    results = results.map(item => {
      let score = 0;
      
      // Keyword match score
      if (searchQuery && item.text.toLowerCase().includes(searchQuery.toLowerCase())) {
        score += 5;
      }
      
      // Component match score
      if (searchQuery && item.component.toLowerCase().includes(searchQuery.toLowerCase())) {
        score += 8;
      }
      
      // Issue match score
      if (searchQuery && item.issue.toLowerCase().includes(searchQuery.toLowerCase())) {
        score += 7;
      }
      
      // Semantic similarity score (simulated)
      score += Math.random() * 5;
      
      // Sentiment influence
      if (Math.abs(item.sentiment) > 0.7) {
        score += 2; // Boost high sentiment items (positive or negative)
      }
      
      return { ...item, score: Math.min(score, 10) };
    });
    
    // Sort results
    if (sortOrder === 'relevance') {
      results.sort((a, b) => b.score - a.score);
    } else if (sortOrder === 'date-newest') {
      results.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortOrder === 'sentiment-negative') {
      results.sort((a, b) => a.sentiment - b.sentiment);
    } else if (sortOrder === 'sentiment-positive') {
      results.sort((a, b) => b.sentiment - a.sentiment);
    }
    
    return results;
  };
  
  const filteredResults = getFilteredResults();
  const paginatedResults = filteredResults.slice(
    (currentPage - 1) * resultsPerPage, 
    currentPage * resultsPerPage
  );
  
  const totalPages = Math.ceil(filteredResults.length / resultsPerPage);
  
  // Toggle a filter value
  const toggleFilter = (category, value) => {
    setActiveFilters(prev => {
      const current = [...prev[category]];
      if (current.includes(value)) {
        return { ...prev, [category]: current.filter(item => item !== value) };
      } else {
        return { ...prev, [category]: [...current, value] };
      }
    });
  };
  
  // Clear all filters
  const clearFilters = () => {
    setActiveFilters({
      components: [],
      vehicles: [],
      sentiment: [],
      sources: [],
      dates: { start: null, end: null },
      cluster: null
    });
    setSearchQuery('');
  };
  
  // Save current search
  const saveCurrentSearch = () => {
    if (newSearchName.trim() === '') return;
    
    const newSavedSearch = {
      id: savedSearches.length + 1,
      name: newSearchName,
      query: searchQuery,
      filters: { ...activeFilters },
      date: new Date().toLocaleDateString()
    };
    
    setSavedSearches([...savedSearches, newSavedSearch]);
    setShowSaveSearchModal(false);
    setNewSearchName('');
  };
  
  // Load a saved search
  const loadSavedSearch = (savedSearch) => {
    setSearchQuery(savedSearch.query);
    setActiveFilters(savedSearch.filters);
  };
  
  // Format the current search URL for sharing
  const getShareableUrl = () => {
    const baseUrl = 'https://iqsintelligence.com/search';
    const params = new URLSearchParams();
    
    if (searchQuery) params.append('q', searchQuery);
    
    if (activeFilters.components.length > 0) {
      params.append('components', activeFilters.components.join(','));
    }
    
    if (activeFilters.vehicles.length > 0) {
      params.append('vehicles', activeFilters.vehicles.join(','));
    }
    
    if (activeFilters.sentiment.length > 0) {
      params.append('sentiment', activeFilters.sentiment.join(','));
    }
    
    if (activeFilters.sources.length > 0) {
      params.append('sources', activeFilters.sources.join(','));
    }
    
    if (activeFilters.cluster) {
      params.append('cluster', activeFilters.cluster);
    }
    
    params.append('sort', sortOrder);
    
    return `${baseUrl}?${params.toString()}`;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Advanced Search</h1>
          <p className="text-gray-500 mt-1">Search and filter customer feedback across all sources</p>
        </div>
        <div className="flex items-center space-x-3">
          <button 
            className="px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center"
            onClick={() => setIsAdvancedSearch(!isAdvancedSearch)}
          >
            <Filter size={16} className="mr-2" />
            {isAdvancedSearch ? 'Simple Search' : 'Advanced Search'}
          </button>
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center"
            onClick={() => setShowSaveSearchModal(true)}
          >
            <Save size={16} className="mr-2" />
            Save Search
          </button>
        </div>
      </div>
      
      {/* Search Box */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-start">
          <div className="relative flex-1">
            <div className="flex items-center">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Type your query in natural language..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  onBlur={() => setTimeout(() => setShowQuerySuggestions(false), 200)}
                />
                <Search size={20} className="absolute left-3 top-3.5 text-gray-400" />
                
                {/* Query Suggestions Dropdown */}
                {showQuerySuggestions && querySuggestions.length > 0 && (
                  <div className="absolute z-10 w-full bg-white mt-1 border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {querySuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className={`px-4 py-2 hover:bg-blue-50 cursor-pointer ${
                          selectedSuggestion === index ? 'bg-blue-50' : ''
                        }`}
                        onClick={() => {
                          setSearchQuery(suggestion);
                          setShowQuerySuggestions(false);
                        }}
                      >
                        {suggestion}
                      </div>
                    ))}
                    <div className="px-4 py-2 text-xs text-gray-500 border-t border-gray-200">
                      Use ↑↓ arrows to navigate, Enter to select
                    </div>
                  </div>
                )}
              </div>
              
              <select 
                className="bg-white border-t border-b border-gray-300 px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                value={searchMode}
                onChange={(e) => setSearchMode(e.target.value)}
              >
                <option value="semantic">Semantic Search</option>
                <option value="keyword">Keyword Search</option>
                <option value="hybrid">Hybrid Search</option>
              </select>
              
              <button className="px-6 py-3 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition-colors">
                Search
              </button>
            </div>
            
            {searchMode === 'semantic' && (
              <p className="mt-1 text-xs text-gray-500">
                <span className="font-medium">Semantic search:</span> "Find customer complaints about screen freezing" will find relevant feedback even if it doesn't mention those exact words
              </p>
            )}
            {searchMode === 'keyword' && (
              <p className="mt-1 text-xs text-gray-500">
                <span className="font-medium">Keyword search:</span> Searches for exact term matches only
              </p>
            )}
            {searchMode === 'hybrid' && (
              <p className="mt-1 text-xs text-gray-500">
                <span className="font-medium">Hybrid search:</span> Combines semantic understanding with keyword precision for optimal results
              </p>
            )}
          </div>
        </div>
        
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <span className="mr-2">Try:</span>
          <button 
            className="px-3 py-1 bg-gray-100 rounded-md hover:bg-gray-200 mr-2"
            onClick={() => setSearchQuery("touchscreen is freezing and unresponsive")}
          >
            "touchscreen is freezing and unresponsive"
          </button>
          <button 
            className="px-3 py-1 bg-gray-100 rounded-md hover:bg-gray-200 mr-2"
            onClick={() => setSearchQuery("customers love comfort")}
          >
            "customers love comfort"
          </button>
          <button 
            className="px-3 py-1 bg-gray-100 rounded-md hover:bg-gray-200"
            onClick={() => setSearchQuery("engine problems in cold weather")}
          >
            "engine problems in cold weather"
          </button>
        </div>
        
        {searchQuery && (
          <div className="mt-4 p-3 bg-blue-50 text-blue-700 rounded-md flex items-center justify-between">
            <div className="flex items-center">
              <Search size={16} className="mr-2" />
              <span>Found {filteredResults.length} results for "{searchQuery}"</span>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                className="px-3 py-1 bg-white border border-gray-300 rounded-md text-sm hover:bg-gray-50"
                onClick={() => {
                  // Copy URL to clipboard
                  navigator.clipboard.writeText(getShareableUrl());
                  // In a real app, you would show a success message here
                }}
              >
                Copy Search URL
              </button>
              <button 
                className="text-blue-600 hover:text-blue-800"
                onClick={() => {
                  setSearchQuery('');
                  clearFilters();
                }}
              >
                Clear
              </button>
            </div>
          </div>
        )}
        
        {/* Advanced Search Options */}
        {isAdvancedSearch && (
          <div className="mt-4 border-t border-gray-200 pt-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Advanced Search Options</h3>
              <button 
                className="text-sm text-blue-600 hover:text-blue-800"
                onClick={clearFilters}
              >
                Clear All Filters
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-6">
              <div>
                <h4 className="text-sm font-medium mb-2">Search Within</h4>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                  <option>All Feedback</option>
                  {clusterOptions.map(cluster => (
                    <option key={cluster.id} value={cluster.id}>
                      {cluster.name} Cluster
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Date Range</h4>
                <div className="flex space-x-2">
                  <input 
                    type="date" 
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="From"
                  />
                  <input 
                    type="date" 
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="To"
                  />
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Minimum Score</h4>
                <div className="flex items-center space-x-2">
                  <input 
                    type="range" 
                    min="0"
                    max="10"
                    step="1"
                    defaultValue="5"
                    className="flex-1"
                  />
                  <span className="text-sm">5 / 10</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Saved Searches */}
      {savedSearches.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="font-medium mb-2">Saved Searches</h3>
          <div className="flex overflow-x-auto space-x-2 pb-2">
            {savedSearches.map(saved => (
              <button
                key={saved.id}
                className="px-3 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 whitespace-nowrap text-sm flex items-center flex-shrink-0"
                onClick={() => loadSavedSearch(saved)}
              >
                {saved.name}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Results Layout */}
      <div className="grid grid-cols-4 gap-6">
        {/* Filters Panel */}
        <div className="col-span-1 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="font-medium">Filters</h2>
            <button 
              className="text-sm text-blue-600 hover:text-blue-800"
              onClick={clearFilters}
            >
              Clear All
            </button>
          </div>
          
          <div className="divide-y divide-gray-200">
            <div className="p-4">
              <h3 className="text-sm font-medium mb-3">Vehicle Model</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {vehicleAttributes.models.map((model, index) => (
                  <div key={index} className="flex items-center">
                    <input 
                      type="checkbox" 
                      id={`model-${index}`} 
                      className="mr-2"
                      checked={activeFilters.vehicles.includes(model)}
                      onChange={() => toggleFilter('vehicles', model)}
                    />
                    <label htmlFor={`model-${index}`} className="text-sm">{model}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-sm font-medium mb-3">Component</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {vehicleAttributes.components.map((component, index) => (
                  <div key={index} className="flex items-center">
                    <input 
                      type="checkbox" 
                      id={`component-${index}`} 
                      className="mr-2"
                      checked={activeFilters.components.includes(component)}
                      onChange={() => toggleFilter('components', component)}
                    />
                    <label htmlFor={`component-${index}`} className="text-sm">{component}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-sm font-medium mb-3">Sentiment</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="sentiment-positive" 
                    className="mr-2"
                    checked={activeFilters.sentiment.includes('positive')}
                    onChange={() => toggleFilter('sentiment', 'positive')}
                  />
                  <label htmlFor="sentiment-positive" className="text-sm">Positive</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="sentiment-neutral" 
                    className="mr-2"
                    checked={activeFilters.sentiment.includes('neutral')}
                    onChange={() => toggleFilter('sentiment', 'neutral')}
                  />
                  <label htmlFor="sentiment-neutral" className="text-sm">Neutral</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="sentiment-negative" 
                    className="mr-2"
                    checked={activeFilters.sentiment.includes('negative')}
                    onChange={() => toggleFilter('sentiment', 'negative')}
                  />
                  <label htmlFor="sentiment-negative" className="text-sm">Negative</label>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-sm font-medium mb-3">Source</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="source-survey" 
                    className="mr-2"
                    checked={activeFilters.sources.includes('Customer Survey')}
                    onChange={() => toggleFilter('sources', 'Customer Survey')}
                  />
                  <label htmlFor="source-survey" className="text-sm">Customer Survey</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="source-social" 
                    className="mr-2"
                    checked={activeFilters.sources.includes('Social Media')}
                    onChange={() => toggleFilter('sources', 'Social Media')}
                  />
                  <label htmlFor="source-social" className="text-sm">Social Media</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="source-service" 
                    className="mr-2"
                    checked={activeFilters.sources.includes('Service Log')}
                    onChange={() => toggleFilter('sources', 'Service Log')}
                  />
                  <label htmlFor="source-service" className="text-sm">Service Log</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="source-dealer" 
                    className="mr-2"
                    checked={activeFilters.sources.includes('Dealer Report')}
                    onChange={() => toggleFilter('sources', 'Dealer Report')}
                  />
                  <label htmlFor="source-dealer" className="text-sm">Dealer Report</label>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="text-sm font-medium mb-3">Date Range</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input type="radio" id="range-week" name="date-range" className="mr-2" />
                  <label htmlFor="range-week" className="text-sm">Last 7 days</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" id="range-month" name="date-range" className="mr-2" />
                  <label htmlFor="range-month" className="text-sm">Last 30 days</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" id="range-quarter" name="date-range" className="mr-2" />
                  <label htmlFor="range-quarter" className="text-sm">Last 90 days</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" id="range-custom" name="date-range" className="mr-2" />
                  <label htmlFor="range-custom" className="text-sm">Custom range</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Results Panel */}
        <div className="col-span-3 space-y-4">
          {/* Results Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-medium">Results</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Showing {(currentPage - 1) * resultsPerPage + 1}-{Math.min(currentPage * resultsPerPage, filteredResults.length)} of {filteredResults.length} matches
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <select 
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="relevance">Relevance</option>
                  <option value="date-newest">Date (newest)</option>
                  <option value="sentiment-negative">Sentiment (most negative)</option>
                  <option value="sentiment-positive">Sentiment (most positive)</option>
                </select>
                
                <div className="flex items-center space-x-1">
                  <button className="p-1 border border-gray-300 rounded hover:bg-gray-100">
                    <Download size={16} className="text-gray-500" />
                  </button>
                  <div className="relative inline-block">
                    <select className="px-3 py-1 border border-gray-300 rounded-md text-sm appearance-none pr-8">
                      <option>Export</option>
                      <option>CSV</option>
                      <option>Excel</option>
                      <option>PDF</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Results List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y divide-gray-200">
            {paginatedResults.length > 0 ? (
              paginatedResults.map((feedback) => (
                <div key={feedback.id} className="p-4 hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedFeedback(feedback)}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs mr-2">
                        {feedback.component}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs mr-2">
                        {feedback.vehicle}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-full text-xs">
                        {feedback.source}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">{feedback.date}</span>
                      {feedback.sentiment > 0 ? (
                        <span className="text-green-500 flex items-center">
                          <Check size={14} className="mr-1" />
                          {feedback.sentiment.toFixed(1)}
                        </span>
                      ) : (
                        <span className="text-red-500 flex items-center">
                          <AlertCircle size={14} className="mr-1" />
                          {feedback.sentiment.toFixed(1)}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm mb-2">
                    {feedback.text}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center">
                      {/* Relevance score indicator */}
                      <div className="flex items-center mr-4">
                        <span className="text-gray-500 mr-1">Relevance:</span>
                        <div className="w-20 h-2 bg-gray-200 rounded-full mr-1">
                          <div 
                            className="h-full bg-blue-500 rounded-full" 
                            style={{ width: `${feedback.score * 10}%` }}
                          ></div>
                        </div>
                        <span>{feedback.score.toFixed(1)}</span>
                      </div>
                      
                      {searchQuery && feedback.text.toLowerCase().includes(searchQuery.toLowerCase()) && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs mr-2">
                          Exact Match
                        </span>
                      )}
                    </div>
                    <button className="text-blue-600 hover:text-blue-800">
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <p className="text-gray-500">No results found. Try adjusting your search or filters.</p>
              </div>
            )}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center space-x-1">
                <button 
                  className={`p-2 rounded-md ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100 text-gray-600'}`}
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft size={16} />
                </button>
                
                {/* Page number buttons */}
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  // Logic to display pages around current page
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={i}
                      className={`w-8 h-8 flex items-center justify-center rounded-md ${
                        currentPage === pageNum ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 text-gray-600'
                      }`}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button 
                  className={`p-2 rounded-md ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100 text-gray-600'}`}
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Show:</span>
                <select 
                  className="px-2 py-1 border border-gray-300 rounded-md text-sm"
                  value={resultsPerPage}
                  onChange={(e) => {
                    setResultsPerPage(Number(e.target.value));
                    setCurrentPage(1); // Reset to first page when changing results per page
                  }}
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Save Search Modal */}
      {showSaveSearchModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-medium mb-4">Save Current Search</h2>
            <p className="text-sm text-gray-500 mb-4">
              Save this search for quick access later. You can view all your saved searches from the menu.
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Infotainment Issues May 2025"
                value={newSearchName}
                onChange={(e) => setNewSearchName(e.target.value)}
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button 
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                onClick={() => setShowSaveSearchModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                onClick={saveCurrentSearch}
              >
                Save Search
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Visualization Module (Simplified)
function VisualizationModule() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Visualization & UI</h1>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center">
            <Plus size={16} className="mr-2" />
            Create Visualization
          </button>
        </div>
      </div>
      
      {/* Visualization Types */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
          <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
            <BarChart2 size={24} />
          </div>
          <h3 className="text-lg font-medium mb-2">Component Analysis</h3>
          <p className="text-gray-600 text-sm mb-4">
            Visualize feedback data by vehicle components and issues.
          </p>
          <button className="text-blue-600 text-sm flex items-center">
            Create Chart
            <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
          <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-4">
            <TrendingUp size={24} />
          </div>
          <h3 className="text-lg font-medium mb-2">Sentiment Trends</h3>
          <p className="text-gray-600 text-sm mb-4">
            Track sentiment changes over time across product lines.
          </p>
          <button className="text-blue-600 text-sm flex items-center">
            Create Chart
            <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
          <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4">
            <Layers size={24} />
          </div>
          <h3 className="text-lg font-medium mb-2">Cluster Visualization</h3>
          <p className="text-gray-600 text-sm mb-4">
            Interactive exploration of feedback clusters and relationships.
          </p>
          <button className="text-blue-600 text-sm flex items-center">
            Create Chart
            <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
      
      {/* Recent Visualizations */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-800">Recent Visualizations</h2>
        </div>
        
        <div className="grid grid-cols-2 gap-6 p-6">
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-medium">Component Issue Distribution</h3>
              <div className="flex items-center">
                <button className="p-1 rounded-md hover:bg-gray-100">
                  <Download size={16} className="text-gray-500" />
                </button>
              </div>
            </div>
            <div className="p-4 h-64 bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500 mb-2">Component Issue Distribution</p>
                <p className="text-sm text-gray-400">Bar chart showing issues by component</p>
              </div>
            </div>
            <div className="p-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
              Created 2 days ago · Last viewed 3 hours ago
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-medium">Sentiment Trend Analysis</h3>
              <div className="flex items-center">
                <button className="p-1 rounded-md hover:bg-gray-100">
                  <Download size={16} className="text-gray-500" />
                </button>
              </div>
            </div>
            <div className="p-4 h-64 bg-gray-50 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500 mb-2">Sentiment Trend Analysis</p>
                <p className="text-sm text-gray-400">Line chart showing sentiment trends over time</p>
              </div>
            </div>
            <div className="p-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500">
              Created 1 week ago · Last viewed 1 day ago
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// User Management Module (Simplified)
function UserManagementModule() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">User Management & Security</h1>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center">
            <Plus size={16} className="mr-2" />
            Add User
          </button>
        </div>
      </div>
      
      {/* User Stats */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm text-gray-500">Total Users</h3>
          <p className="text-2xl font-bold mt-2">24</p>
          <div className="mt-4 text-xs text-green-500">+3 this month</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm text-gray-500">Active Users</h3>
          <p className="text-2xl font-bold mt-2">19</p>
          <div className="mt-4 text-xs text-gray-500">Last 30 days</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm text-gray-500">Admin Users</h3>
          <p className="text-2xl font-bold mt-2">5</p>
          <div className="mt-4 text-xs text-gray-500">Full system access</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-sm text-gray-500">Pending Invites</h3>
          <p className="text-2xl font-bold mt-2">3</p>
          <div className="mt-4 text-xs text-orange-500">Expires in 7 days</div>
        </div>
      </div>
      
      {/* User List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-800">Users</h2>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                className="pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="py-4 px-6 text-sm">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium mr-3">
                      TY
                    </div>
                    <span>Takashi Yamamoto</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm">takashi.yamamoto@toyota-boshoku.com</td>
                <td className="py-4 px-6 text-sm">
                  <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs">
                    Admin
                  </span>
                </td>
                <td className="py-4 px-6 text-sm">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    Active
                  </span>
                </td>
                <td className="py-4 px-6 text-sm">Now</td>
                <td className="py-4 px-6 text-sm">
                  <button className="text-blue-600 hover:text-blue-800 mr-3">
                    Edit
                  </button>
                </td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="py-4 px-6 text-sm">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-medium mr-3">
                      JS
                    </div>
                    <span>Jun Sato</span>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm">jun.sato@toyota-boshoku.com</td>
                <td className="py-4 px-6 text-sm">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    Analyst
                  </span>
                </td>
                <td className="py-4 px-6 text-sm">
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                    Active
                  </span>
                </td>
                <td className="py-4 px-6 text-sm">2 hours ago</td>
                <td className="py-4 px-6 text-sm">
                  <button className="text-blue-600 hover:text-blue-800 mr-3">
                    Edit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Settings Module (Simplified)
function SettingsModule() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">System Settings</h1>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
      
      {/* Settings Panel */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex">
          {/* Settings Sidebar */}
          <div className="w-64 border-r border-gray-200">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h2 className="font-medium">Settings Categories</h2>
            </div>
            <div className="divide-y divide-gray-200">
              <button className="w-full text-left p-3 bg-blue-50 text-blue-600 hover:bg-blue-50 font-medium">
                General Settings
              </button>
              <button className="w-full text-left p-3 text-gray-700 hover:bg-gray-50">
                LLM Configuration
              </button>
              <button className="w-full text-left p-3 text-gray-700 hover:bg-gray-50">
                Data Management
              </button>
              <button className="w-full text-left p-3 text-gray-700 hover:bg-gray-50">
                Integration Settings
              </button>
            </div>
          </div>
          
          {/* Settings Content */}
          <div className="flex-1 p-6">
            <h2 className="text-lg font-medium mb-6">General Settings</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">System Information</h3>
                <div className="grid grid-cols-2 gap-4 p-4 border border-gray-200 rounded-md bg-gray-50">
                  <div>
                    <p className="text-xs text-gray-500">Application Version</p>
                    <p className="font-medium">IQS Intelligence v2.4.1</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Last Updated</p>
                    <p className="font-medium">May 10, 2025</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Company Profile</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value="Toyota Boshoku"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Admin Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value="admin@toyota-boshoku.com"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}