import React, { useState, useMemo } from 'react';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area,
    ComposedChart,
    ScatterChart,
    Scatter,
    RadarChart,
    Radar,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    Treemap,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    ReferenceLine,
    LabelList
} from 'recharts';

// Complete mock data with all timeframes
const getMockData = () => {
    return [
        // Team Alpha
        {
            name: 'A. Singh',
            fullName: 'Aditi Singh',
            team: 'Alpha',
            location: 'Delhi',
            role: 'Recruiter',
            productivity: { thisweek: 78, today: 85, thismonth: 76 },
            resumes: { thisweek: 280, today: 46, thismonth: 1120 },
            submittals: { thisweek: 95, today: 16, thismonth: 380 },
            interviews: { thisweek: 22, today: 4, thismonth: 88 },
            offers: { thisweek: 7, today: 1, thismonth: 28 },
            hires: { thisweek: 6, today: 1, thismonth: 24 },
            target: 90,
            actual: 95,
            achieved: 106,
            activeHours: { thisweek: 36, today: 6, thismonth: 144 },
            idleHours: { thisweek: 18, today: 3, thismonth: 72 },
            avgTimePerResume: 9,
            offerAcceptanceRate: 85,
            avgTimeInStage: 2.9,
            workloadStatus: 'Balanced',
            wellbeingScore: 80,
            toolUsage: {
                linkedin: 19,
                naukri: 14,
                excel: 11,
                zoom: 5,
                outlook: 2,
                chrome: 3,
                totalHours: 54,
                utilization: 90,
                efficiency: 88,
                productivityContribution: 'High'
            }
        },
        {
            name: 'R. Mehta',
            fullName: 'Ramesh Mehta',
            team: 'Alpha',
            location: 'Mumbai',
            role: 'Recruiter',
            productivity: { thisweek: 85, today: 88, thismonth: 83 },
            resumes: { thisweek: 310, today: 52, thismonth: 1240 },
            submittals: { thisweek: 110, today: 18, thismonth: 440 },
            interviews: { thisweek: 28, today: 5, thismonth: 112 },
            offers: { thisweek: 5, today: 1, thismonth: 20 },
            hires: { thisweek: 4, today: 1, thismonth: 16 },
            target: 100,
            actual: 110,
            achieved: 110,
            activeHours: { thisweek: 39, today: 6.5, thismonth: 156 },
            idleHours: { thisweek: 15, today: 2.5, thismonth: 60 },
            avgTimePerResume: 8.5,
            offerAcceptanceRate: 80,
            avgTimeInStage: 3.5,
            workloadStatus: 'Overburdened',
            wellbeingScore: 72,
            toolUsage: {
                linkedin: 21,
                jobBoards: 13,
                outlook: 10,
                zoom: 4,
                naukri: 8,
                excel: 6,
                chrome: 2,
                totalHours: 64,
                utilization: 93,
                efficiency: 95,
                productivityContribution: 'Very High'
            }
        },
        {
            name: 'S. Iyer',
            fullName: 'Sneha Iyer',
            team: 'Alpha',
            location: 'Bangalore',
            role: 'Recruiter',
            productivity: { thisweek: 71, today: 73, thismonth: 69 },
            resumes: { thisweek: 250, today: 42, thismonth: 1000 },
            submittals: { thisweek: 80, today: 13, thismonth: 320 },
            interviews: { thisweek: 20, today: 3, thismonth: 80 },
            offers: { thisweek: 4, today: 1, thismonth: 16 },
            hires: { thisweek: 3, today: 0, thismonth: 12 },
            target: 90,
            actual: 80,
            achieved: 89,
            activeHours: { thisweek: 34, today: 5.5, thismonth: 136 },
            idleHours: { thisweek: 20, today: 3.5, thismonth: 80 },
            avgTimePerResume: 10.5,
            offerAcceptanceRate: 100,
            avgTimeInStage: 3.2,
            workloadStatus: 'Balanced',
            wellbeingScore: 78,
            toolUsage: {
                linkedin: 13,
                excel: 8,
                teams: 5,
                indeed: 4,
                chrome: 3,
                naukri: 2,
                zoom: 1,
                totalHours: 36,
                utilization: 82,
                efficiency: 76,
                productivityContribution: 'Medium'
            }
        },
        {
            name: 'P. Kumar',
            fullName: 'Priya Kumar',
            team: 'Alpha',
            location: 'Hyderabad',
            role: 'Recruiter',
            productivity: { thisweek: 68, today: 65, thismonth: 66 },
            resumes: { thisweek: 200, today: 33, thismonth: 800 },
            submittals: { thisweek: 70, today: 12, thismonth: 280 },
            interviews: { thisweek: 18, today: 2, thismonth: 72 },
            offers: { thisweek: 2, today: 0, thismonth: 8 },
            hires: { thisweek: 1, today: 0, thismonth: 4 },
            target: 85,
            actual: 70,
            achieved: 82,
            activeHours: { thisweek: 32, today: 5, thismonth: 128 },
            idleHours: { thisweek: 22, today: 4, thismonth: 88 },
            avgTimePerResume: 11.5,
            offerAcceptanceRate: 50,
            avgTimeInStage: 4.8,
            workloadStatus: 'Low',
            wellbeingScore: 65,
            toolUsage: {
                naukri: 18,
                excel: 12,
                chrome: 7,
                linkedin: 3,
                outlook: 2,
                zoom: 1,
                totalHours: 43,
                utilization: 78,
                efficiency: 68,
                productivityContribution: 'Low'
            }
        },
        {
            name: 'N. Verma',
            fullName: 'Neha Verma',
            team: 'Alpha',
            location: 'Pune',
            role: 'Sr Recruiter',
            productivity: { thisweek: 87, today: 90, thismonth: 85 },
            resumes: { thisweek: 330, today: 55, thismonth: 1320 },
            submittals: { thisweek: 120, today: 20, thismonth: 480 },
            interviews: { thisweek: 35, today: 6, thismonth: 140 },
            offers: { thisweek: 6, today: 2, thismonth: 24 },
            hires: { thisweek: 5, today: 2, thismonth: 20 },
            target: 110,
            actual: 120,
            achieved: 109,
            activeHours: { thisweek: 39, today: 6.5, thismonth: 156 },
            idleHours: { thisweek: 15, today: 2.5, thismonth: 60 },
            avgTimePerResume: 8.2,
            offerAcceptanceRate: 100,
            avgTimeInStage: 3.1,
            workloadStatus: 'Overburdened',
            wellbeingScore: 70,
            toolUsage: {
                linkedin: 27,
                jobBoards: 16,
                zoom: 6,
                excel: 4,
                outlook: 3,
                chrome: 2,
                naukri: 1,
                totalHours: 59,
                utilization: 95,
                efficiency: 92,
                productivityContribution: 'Very High'
            }
        },
        {
            name: 'M. Shah',
            fullName: 'Manoj Shah',
            team: 'Alpha',
            location: 'Delhi',
            role: 'Team Manager',
            productivity: { thisweek: 72, today: 75, thismonth: 70 },
            resumes: { thisweek: 150, today: 25, thismonth: 600 },
            submittals: { thisweek: 60, today: 10, thismonth: 240 },
            interviews: { thisweek: 12, today: 2, thismonth: 48 },
            offers: { thisweek: 1, today: 0, thismonth: 4 },
            hires: { thisweek: 0, today: 0, thismonth: 0 },
            target: 60,
            actual: 60,
            achieved: 100,
            activeHours: { thisweek: 28, today: 4.5, thismonth: 112 },
            idleHours: { thisweek: 26, today: 4.5, thismonth: 104 },
            avgTimePerResume: 13,
            offerAcceptanceRate: 100,
            avgTimeInStage: 4.2,
            workloadStatus: 'Under-utilized',
            wellbeingScore: 60,
            toolUsage: {
                ats: 15,
                outlook: 12,
                zoom: 8,
                excel: 5,
                linkedin: 3,
                chrome: 2,
                naukri: 1,
                totalHours: 46,
                utilization: 80,
                efficiency: 72,
                productivityContribution: 'Medium'
            }
        },
        {
            name: 'T. Roy',
            fullName: 'Tanvi Roy',
            team: 'Alpha',
            location: 'Mumbai',
            role: 'Recruiter',
            productivity: { thisweek: 64, today: 62, thismonth: 62 },
            resumes: { thisweek: 180, today: 30, thismonth: 720 },
            submittals: { thisweek: 65, today: 11, thismonth: 260 },
            interviews: { thisweek: 16, today: 2, thismonth: 64 },
            offers: { thisweek: 1, today: 0, thismonth: 4 },
            hires: { thisweek: 0, today: 0, thismonth: 0 },
            target: 80,
            actual: 65,
            achieved: 81,
            activeHours: { thisweek: 30, today: 5, thismonth: 120 },
            idleHours: { thisweek: 24, today: 4, thismonth: 96 },
            avgTimePerResume: 12,
            offerAcceptanceRate: 80,
            avgTimeInStage: 5.1,
            workloadStatus: 'Low',
            wellbeingScore: 64,
            toolUsage: {
                chrome: 15,
                naukri: 10,
                outlook: 8,
                excel: 5,
                linkedin: 3,
                zoom: 2,
                totalHours: 43,
                utilization: 75,
                efficiency: 64,
                productivityContribution: 'Low'
            }
        },
        {
            name: 'K. Patel',
            fullName: 'Kiran Patel',
            team: 'Alpha',
            location: 'Bangalore',
            role: 'Coordinator',
            productivity: { thisweek: 82, today: 84, thismonth: 80 },
            resumes: { thisweek: 220, today: 37, thismonth: 880 },
            submittals: { thisweek: 75, today: 12, thismonth: 300 },
            interviews: { thisweek: 19, today: 3, thismonth: 76 },
            offers: { thisweek: 2, today: 1, thismonth: 8 },
            hires: { thisweek: 1, today: 0, thismonth: 4 },
            target: 70,
            actual: 75,
            achieved: 107,
            activeHours: { thisweek: 36, today: 6, thismonth: 144 },
            idleHours: { thisweek: 18, today: 3, thismonth: 72 },
            avgTimePerResume: 9.8,
            offerAcceptanceRate: 90,
            avgTimeInStage: 3.4,
            workloadStatus: 'Balanced',
            wellbeingScore: 79,
            toolUsage: {
                jobBoards: 20,
                linkedin: 15,
                ats: 10,
                excel: 8,
                zoom: 5,
                chrome: 3,
                naukri: 2,
                totalHours: 63,
                utilization: 88,
                efficiency: 82,
                productivityContribution: 'High'
            }
        },
        // Team Beta - HR Team
        {
            name: 'K. Sharma',
            fullName: 'Kavya Sharma',
            team: 'Beta',
            location: 'Delhi',
            role: 'HR Specialist',
            productivity: { thisweek: 80, today: 82, thismonth: 78 },
            resumes: { thisweek: 250, today: 40, thismonth: 1000 },
            submittals: { thisweek: 90, today: 14, thismonth: 360 },
            interviews: { thisweek: 18, today: 3, thismonth: 72 },
            offers: { thisweek: 6, today: 1, thismonth: 24 },
            hires: { thisweek: 5, today: 1, thismonth: 20 },
            target: 80,
            actual: 90,
            achieved: 112,
            activeHours: { thisweek: 36, today: 6, thismonth: 144 },
            idleHours: { thisweek: 18, today: 3, thismonth: 72 },
            avgTimePerResume: 9.0,
            offerAcceptanceRate: 90,
            avgTimeInStage: 3.0,
            workloadStatus: 'Balanced',
            wellbeingScore: 82,
            toolUsage: {
                linkedin: 18,
                naukri: 12,
                excel: 10,
                zoom: 6,
                outlook: 4,
                chrome: 3,
                totalHours: 53,
                utilization: 89,
                efficiency: 85,
                productivityContribution: 'High'
            }
        },
        {
            name: 'M. Gupta',
            fullName: 'Manish Gupta',
            team: 'Beta',
            location: 'Mumbai',
            role: 'HR Specialist',
            productivity: { thisweek: 83, today: 85, thismonth: 81 },
            resumes: { thisweek: 285, today: 48, thismonth: 1140 },
            submittals: { thisweek: 96, today: 16, thismonth: 384 },
            interviews: { thisweek: 20, today: 4, thismonth: 80 },
            offers: { thisweek: 5, today: 1, thismonth: 20 },
            hires: { thisweek: 3, today: 0, thismonth: 12 },
            target: 90,
            actual: 96,
            achieved: 107,
            activeHours: { thisweek: 37, today: 6.2, thismonth: 148 },
            idleHours: { thisweek: 17, today: 2.8, thismonth: 68 },
            avgTimePerResume: 8.5,
            offerAcceptanceRate: 75,
            avgTimeInStage: 3.4,
            workloadStatus: 'Overburdened',
            wellbeingScore: 70,
            toolUsage: {
                linkedin: 20,
                jobBoards: 15,
                outlook: 9,
                zoom: 5,
                naukri: 4,
                excel: 3,
                chrome: 2,
                totalHours: 58,
                utilization: 92,
                efficiency: 90,
                productivityContribution: 'Very High'
            }
        },
        {
            name: 'R. Das',
            fullName: 'Rahul Das',
            team: 'Beta',
            location: 'Bangalore',
            role: 'HR Specialist',
            productivity: { thisweek: 72, today: 74, thismonth: 70 },
            resumes: { thisweek: 210, today: 35, thismonth: 840 },
            submittals: { thisweek: 70, today: 12, thismonth: 280 },
            interviews: { thisweek: 12, today: 2, thismonth: 48 },
            offers: { thisweek: 2, today: 0, thismonth: 8 },
            hires: { thisweek: 1, today: 0, thismonth: 4 },
            target: 80,
            actual: 70,
            achieved: 88,
            activeHours: { thisweek: 32, today: 5.4, thismonth: 128 },
            idleHours: { thisweek: 22, today: 3.6, thismonth: 88 },
            avgTimePerResume: 10.3,
            offerAcceptanceRate: 80,
            avgTimeInStage: 4.5,
            workloadStatus: 'Slightly Low',
            wellbeingScore: 68,
            toolUsage: {
                indeed: 11,
                excel: 8,
                teams: 6,
                linkedin: 4,
                chrome: 3,
                naukri: 2,
                zoom: 1,
                totalHours: 35,
                utilization: 83,
                efficiency: 75,
                productivityContribution: 'Medium'
            }
        },
        {
            name: 'P. Sen',
            fullName: 'Priya Sen',
            team: 'Beta',
            location: 'Hyderabad',
            role: 'HR Specialist',
            productivity: { thisweek: 69, today: 67, thismonth: 67 },
            resumes: { thisweek: 190, today: 30, thismonth: 760 },
            submittals: { thisweek: 66, today: 11, thismonth: 264 },
            interviews: { thisweek: 11, today: 2, thismonth: 44 },
            offers: { thisweek: 1, today: 0, thismonth: 4 },
            hires: { thisweek: 0, today: 0, thismonth: 0 },
            target: 75,
            actual: 66,
            achieved: 88,
            activeHours: { thisweek: 30, today: 5, thismonth: 120 },
            idleHours: { thisweek: 24, today: 4, thismonth: 96 },
            avgTimePerResume: 11.0,
            offerAcceptanceRate: 60,
            avgTimeInStage: 5.0,
            workloadStatus: 'Low',
            wellbeingScore: 65,
            toolUsage: {
                naukri: 17,
                excel: 11,
                chrome: 7,
                linkedin: 3,
                outlook: 2,
                zoom: 1,
                totalHours: 41,
                utilization: 78,
                efficiency: 68,
                productivityContribution: 'Low'
            }
        },
        {
            name: 'A. Reddy',
            fullName: 'Anita Reddy',
            team: 'Beta',
            location: 'Pune',
            role: 'Sr HR Specialist',
            productivity: { thisweek: 86, today: 88, thismonth: 84 },
            resumes: { thisweek: 310, today: 52, thismonth: 1240 },
            submittals: { thisweek: 115, today: 19, thismonth: 460 },
            interviews: { thisweek: 28, today: 5, thismonth: 112 },
            offers: { thisweek: 9, today: 2, thismonth: 36 },
            hires: { thisweek: 7, today: 2, thismonth: 28 },
            target: 105,
            actual: 115,
            achieved: 110,
            activeHours: { thisweek: 39, today: 6.5, thismonth: 156 },
            idleHours: { thisweek: 15, today: 2.5, thismonth: 60 },
            avgTimePerResume: 8.1,
            offerAcceptanceRate: 95,
            avgTimeInStage: 3.1,
            workloadStatus: 'Overburdened',
            wellbeingScore: 71,
            toolUsage: {
                linkedin: 25,
                jobBoards: 14,
                zoom: 6,
                excel: 4,
                outlook: 3,
                chrome: 2,
                naukri: 1,
                totalHours: 55,
                utilization: 95,
                efficiency: 92,
                productivityContribution: 'Very High'
            }
        },
        {
            name: 'J. Roy',
            fullName: 'Jatin Roy',
            team: 'Beta',
            location: 'Delhi',
            role: 'HR Manager',
            productivity: { thisweek: 73, today: 76, thismonth: 71 },
            resumes: { thisweek: 140, today: 22, thismonth: 560 },
            submittals: { thisweek: 55, today: 9, thismonth: 220 },
            interviews: { thisweek: 10, today: 2, thismonth: 40 },
            offers: { thisweek: 1, today: 0, thismonth: 4 },
            hires: { thisweek: 0, today: 0, thismonth: 0 },
            target: 55,
            actual: 55,
            achieved: 100,
            activeHours: { thisweek: 29, today: 4.8, thismonth: 116 },
            idleHours: { thisweek: 25, today: 4.2, thismonth: 100 },
            avgTimePerResume: 13.5,
            offerAcceptanceRate: 100,
            avgTimeInStage: 4.0,
            workloadStatus: 'Under-utilized',
            wellbeingScore: 61,
            toolUsage: {
                ats: 16,
                outlook: 12,
                zoom: 9,
                excel: 6,
                linkedin: 3,
                chrome: 2,
                naukri: 1,
                totalHours: 49,
                utilization: 81,
                efficiency: 75,
                productivityContribution: 'Medium'
            }
        },
        {
            name: 'N. Khan',
            fullName: 'Nisha Khan',
            team: 'Beta',
            location: 'Mumbai',
            role: 'HR Coordinator',
            productivity: { thisweek: 81, today: 83, thismonth: 79 },
            resumes: { thisweek: 225, today: 37, thismonth: 900 },
            submittals: { thisweek: 80, today: 13, thismonth: 320 },
            interviews: { thisweek: 15, today: 3, thismonth: 60 },
            offers: { thisweek: 4, today: 1, thismonth: 16 },
            hires: { thisweek: 2, today: 0, thismonth: 8 },
            target: 70,
            actual: 80,
            achieved: 114,
            activeHours: { thisweek: 35, today: 6, thismonth: 140 },
            idleHours: { thisweek: 19, today: 3, thismonth: 76 },
            avgTimePerResume: 9.7,
            offerAcceptanceRate: 90,
            avgTimeInStage: 3.2,
            workloadStatus: 'Balanced',
            wellbeingScore: 78,
            toolUsage: {
                jobBoards: 21,
                linkedin: 15,
                ats: 12,
                excel: 6,
                zoom: 3,
                chrome: 2,
                naukri: 1,
                totalHours: 60,
                utilization: 88,
                efficiency: 83,
                productivityContribution: 'High'
            }
        }
    ];
};

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('productivity');
    const [activeView, setActiveView] = useState('team');
    const [selectedUser, setSelectedUser] = useState('A. Singh');
    const [selectedTeam, setSelectedTeam] = useState('All Teams');
    const [selectedRole, setSelectedRole] = useState('All Roles');
    const [selectedTimeframe, setSelectedTimeframe] = useState('This Week');
    const [selectedLocation, setSelectedLocation] = useState('All Locations');
    const [selectedStatus, setSelectedStatus] = useState('All Status');


    const mockData = useMemo(() => ({ employees: getMockData() }), []);

    const roles = useMemo(() => ['All Roles', ...Array.from(new Set(mockData.employees.map(emp => emp.role)))], [mockData]);
    const locations = useMemo(() => ['All Locations', ...Array.from(new Set(mockData.employees.map(emp => emp.location)))], [mockData]);
    const statuses = useMemo(() => ['All Status', ...Array.from(new Set(mockData.employees.map(emp => emp.workloadStatus)))], [mockData]);
    const teams = ['All Teams', 'Alpha', 'Beta'];

    // Fixed filtering logic
    const filteredData = useMemo(() => {
        let employees = mockData.employees;

        // For team tab, only apply team filter
        if (activeTab === 'team') {
            if (selectedTeam !== 'All Teams') {
                employees = employees.filter(emp => emp.team === selectedTeam);
            }
            if (selectedStatus !== 'All Status') {
                employees = employees.filter(emp => emp.workloadStatus === selectedStatus);
            }
            return employees;
        }

        // For other tabs, apply all filters
        if (selectedTeam !== 'All Teams') {
            employees = employees.filter(emp => emp.team === selectedTeam);
        }
        if (selectedRole !== 'All Roles') {
            employees = employees.filter(emp => emp.role === selectedRole);
        }
        if (selectedLocation !== 'All Locations') {
            employees = employees.filter(emp => emp.location === selectedLocation);
        }
        if (selectedStatus !== 'All Status') {
            employees = employees.filter(emp => emp.workloadStatus === selectedStatus);
        }

        return employees;
    }, [selectedTeam, selectedRole, selectedLocation, selectedStatus, activeTab, mockData]);


    // Get current user data for individual view
    const currentUser = mockData.employees.find(emp => emp.name === selectedUser) || mockData.employees[0];

    // Calculate KPIs based on filters
    const calculateKPIs = () => {
        const timeKey = selectedTimeframe.toLowerCase().replace(' ', '');

        if (activeView === 'team') {
            const totalResumes = filteredData.reduce((sum, emp) => sum + (emp.resumes[timeKey] || 0), 0);
            const totalSubmittals = filteredData.reduce((sum, emp) => sum + (emp.submittals[timeKey] || 0), 0);
            const totalInterviews = filteredData.reduce((sum, emp) => sum + (emp.interviews[timeKey] || 0), 0);
            const totalOffers = filteredData.reduce((sum, emp) => sum + (emp.offers[timeKey] || 0), 0);
            const totalHires = filteredData.reduce((sum, emp) => sum + (emp.hires[timeKey] || 0), 0);
            const avgProductivity = filteredData.length > 0 ?
                filteredData.reduce((sum, emp) => sum + (emp.productivity[timeKey] || 0), 0) / filteredData.length : 0;

            return {
                productivity: [
                    { label: 'Total Resumes Screened', value: totalResumes },
                    { label: 'Total Submittals Sent', value: totalSubmittals },
                    { label: 'Total Interviews Scheduled', value: totalInterviews },
                    { label: 'Avg Team Productivity', value: `${avgProductivity.toFixed(1)}%` },
                    { label: 'Total Hires', value: totalHires }
                ],
                recruitment: [
                    { label: 'Submittals Sent', value: totalSubmittals },
                    { label: 'Interviews Scheduled', value: totalInterviews },
                    { label: 'Offers Extended', value: totalOffers },
                    { label: 'Total Hires', value: totalHires },
                    { label: 'Conversion Rate', value: totalResumes > 0 ? `${((totalHires / totalResumes) * 100).toFixed(1)}%` : '0%' }
                ],
                team: [
                    { label: 'Team Size', value: filteredData.length },
                    { label: 'Total Hires', value: totalHires },
                    { label: 'Avg Productivity', value: `${avgProductivity.toFixed(1)}%` },
                    {
                        label: 'Avg Wellbeing Score', value: filteredData.length > 0 ?
                            `${(filteredData.reduce((sum, emp) => sum + (emp.wellbeingScore || 0), 0) / filteredData.length).toFixed(0)}` : '0'
                    },
                    { label: 'Team Performance', value: avgProductivity > 80 ? 'High' : avgProductivity > 60 ? 'Medium' : 'Low' }
                ],
                apps: [
                    {
                        label: 'Avg Tool Utilization', value: filteredData.length > 0 ?
                            `${(filteredData.reduce((sum, emp) => sum + (emp.toolUsage.utilization || 0), 0) / filteredData.length).toFixed(0)}%` : '0%'
                    },
                    {
                        label: 'High Performers', value: filteredData.filter(emp =>
                            emp.toolUsage.productivityContribution === 'Very High' || emp.toolUsage.productivityContribution === 'High').length
                    },
                    { label: 'Total Tool Hours', value: filteredData.reduce((sum, emp) => sum + (emp.toolUsage.totalHours || 0), 0) },
                    {
                        label: 'Avg Efficiency', value: filteredData.length > 0 ?
                            `${(filteredData.reduce((sum, emp) => sum + (emp.toolUsage.efficiency || 0), 0) / filteredData.length).toFixed(0)}%` : '0%'
                    },
                    { label: 'Tool ROI Status', value: 'Optimized' }
                ]
            };
        } else {
            return {
                productivity: [
                    { label: 'Resumes Screened', value: currentUser.resumes[timeKey] || 0 },
                    { label: 'Submittals Sent', value: currentUser.submittals[timeKey] || 0 },
                    { label: 'Interviews Scheduled', value: currentUser.interviews[timeKey] || 0 },
                    { label: 'Productivity Score', value: `${currentUser.productivity[timeKey] || 0}%` },
                    { label: 'Hires', value: currentUser.hires[timeKey] || 0 }
                ],
                recruitment: [
                    { label: 'Target Submittals', value: currentUser.target || 0 },
                    { label: 'Actual Submittals', value: currentUser.actual || 0 },
                    { label: 'Achievement %', value: `${currentUser.achieved || 0}%` },
                    { label: 'Avg Time/Resume', value: `${currentUser.avgTimePerResume || 0} mins` },
                    { label: 'Offer Acceptance Rate', value: `${currentUser.offerAcceptanceRate || 0}%` }
                ],
                team: [
                    { label: 'Team Position', value: currentUser.team || 'N/A' },
                    { label: 'Role', value: currentUser.role || 'N/A' },
                    { label: 'Productivity Score', value: `${currentUser.productivity[timeKey] || 0}%` },
                    { label: 'Wellbeing Score', value: currentUser.wellbeingScore || 0 },
                    { label: 'Performance Status', value: currentUser.workloadStatus || 'N/A' }
                ],
                apps: [
                    { label: 'Tool Hours', value: currentUser.toolUsage.totalHours || 0 },
                    { label: 'Tool Utilization', value: `${currentUser.toolUsage.utilization || 0}%` },
                    { label: 'Efficiency Score', value: `${currentUser.toolUsage.efficiency || 0}%` },
                    { label: 'Contribution Level', value: currentUser.toolUsage.productivityContribution || 'N/A' },
                    { label: 'Status', value: currentUser.workloadStatus || 'N/A' }
                ]
            };
        }
    };

    const kpis = calculateKPIs();
    const COLORS = ['#4299e1', '#48bb78', '#ed8936', '#9f7aea', '#38b2ac', '#f56565', '#8b5cf6', '#06b6d4'];

    const renderKPIs = () => {
        const currentKPIs = kpis[activeTab];
        if (!currentKPIs) return null;

        return (
            <div className="kpi-grid">
                {currentKPIs.map((kpi, index) => (
                    <div key={index} className="kpi-card fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className="kpi-value">{kpi.value}</div>
                        <div className="kpi-label">{kpi.label}</div>
                    </div>
                ))}
            </div>
        );
    };

    // Enhanced chart data generators with null checks
    const getProductivityChartData = () => {
        const timeKey = selectedTimeframe.toLowerCase().replace(' ', '');

        if (activeView === 'team') {
            return {
                teamComparison: filteredData.map(emp => ({
                    name: emp.name.split(' ')[0],
                    productivity: emp.productivity[timeKey] || 0,
                    activeHours: emp.activeHours[timeKey] || 0,
                    target: emp.target || 0,
                    actual: emp.actual || 0,
                    wellbeing: emp.wellbeingScore || 0
                })),
                wellbeingProductivity: filteredData.map(emp => ({
                    name: emp.name.split(' ')[0],
                    productivity: emp.productivity[timeKey] || 0,
                    wellbeing: emp.wellbeingScore || 0,
                    workload: emp.workloadStatus || 'Unknown',
                    activeHours: emp.activeHours[timeKey] || 0
                })),
                workloadDistribution: [
                    { status: 'Balanced', count: filteredData.filter(emp => emp.workloadStatus === 'Balanced').length, fill: '#10b981' },
                    { status: 'Overburdened', count: filteredData.filter(emp => emp.workloadStatus === 'Overburdened').length, fill: '#ef4444' },
                    { status: 'Under-utilized', count: filteredData.filter(emp => emp.workloadStatus === 'Under-utilized').length, fill: '#3b82f6' },
                    { status: 'Low', count: filteredData.filter(emp => emp.workloadStatus === 'Low').length, fill: '#f59e0b' },
                    { status: 'Slightly Low', count: filteredData.filter(emp => emp.workloadStatus === 'Slightly Low').length, fill: '#8b5cf6' }
                ].filter(item => item.count > 0),
                dailyPerformance: [
                    { day: 'Monday', avgProductivity: 75, activeHours: 42, teamMorale: 80 },
                    { day: 'Tuesday', avgProductivity: 82, activeHours: 45, teamMorale: 85 },
                    { day: 'Wednesday', avgProductivity: 78, activeHours: 43, teamMorale: 82 },
                    { day: 'Thursday', avgProductivity: 85, activeHours: 47, teamMorale: 88 },
                    { day: 'Friday', avgProductivity: 80, activeHours: 44, teamMorale: 87 },
                    { day: 'Saturday', avgProductivity: 77, activeHours: 40, teamMorale: 84 }
                ]
            };
        } else {
            return {
                individualMetrics: {
                    productivity: currentUser.productivity[timeKey] || 0,
                    activeHours: currentUser.activeHours[timeKey] || 0,
                    idleHours: currentUser.idleHours[timeKey] || 0,
                    wellbeing: currentUser.wellbeingScore || 0
                },
                targetVsActual: [
                    { metric: 'Target', value: currentUser.target || 0, fill: '#94a3b8' },
                    { metric: 'Achieved', value: currentUser.actual || 0, fill: (currentUser.achieved >= 100) ? '#10b981' : '#f59e0b' }
                ],
                weeklyTrend: [
                    { week: 'Week 1', productivity: Math.max(0, (currentUser.productivity[timeKey] || 0) - 5), submittals: Math.max(0, (currentUser.actual || 0) - 10) },
                    { week: 'Week 2', productivity: Math.max(0, (currentUser.productivity[timeKey] || 0) - 2), submittals: Math.max(0, (currentUser.actual || 0) - 5) },
                    { week: 'Week 3', productivity: Math.max(0, (currentUser.productivity[timeKey] || 0) + 1), submittals: Math.max(0, (currentUser.actual || 0) + 2) },
                    { week: 'Week 4', productivity: currentUser.productivity[timeKey] || 0, submittals: currentUser.actual || 0 }
                ]
            };
        }
    };

    const getRecruitmentChartData = () => {
        const timeKey = selectedTimeframe.toLowerCase().replace(' ', '');

        if (activeView === 'team') {
            const totalResumes = filteredData.reduce((sum, emp) => sum + (emp.resumes[timeKey] || 0), 0);
            const totalSubmittals = filteredData.reduce((sum, emp) => sum + (emp.submittals[timeKey] || 0), 0);
            const totalInterviews = filteredData.reduce((sum, emp) => sum + (emp.interviews[timeKey] || 0), 0);
            const totalOffers = filteredData.reduce((sum, emp) => sum + (emp.offers[timeKey] || 0), 0);
            const totalHires = filteredData.reduce((sum, emp) => sum + (emp.hires[timeKey] || 0), 0);

            return {
                funnelData: [
                    { stage: 'Resumes', value: totalResumes, fill: '#8884d8', percentage: 100 },
                    { stage: 'Submittals', value: totalSubmittals, fill: '#82ca9d', percentage: totalResumes > 0 ? Math.round((totalSubmittals / totalResumes) * 100) : 0 },
                    { stage: 'Interviews', value: totalInterviews, fill: '#ffc658', percentage: totalSubmittals > 0 ? Math.round((totalInterviews / totalSubmittals) * 100) : 0 },
                    { stage: 'Offers', value: totalOffers, fill: '#ff7c7c', percentage: totalInterviews > 0 ? Math.round((totalOffers / totalInterviews) * 100) : 0 },
                    { stage: 'Hires', value: totalHires, fill: '#8dd1e1', percentage: totalOffers > 0 ? Math.round((totalHires / totalOffers) * 100) : 0 }
                ],
                teamPerformance: filteredData.map(emp => ({
                    name: emp.name.split(' ')[0],
                    submittals: emp.submittals[timeKey] || 0,
                    hires: emp.hires[timeKey] || 0,
                    target: emp.target || 0,
                    achievement: emp.achieved || 0,
                    efficiency: (emp.submittals[timeKey] > 0) ? Math.round(((emp.hires[timeKey] || 0) / emp.submittals[timeKey]) * 100) : 0
                })),
                conversionRates: filteredData.filter(emp => (emp.submittals[timeKey] || 0) > 0).map(emp => ({
                    name: emp.name.split(' ')[0],
                    submittalToInterview: Math.round(((emp.interviews[timeKey] || 0) / emp.submittals[timeKey]) * 100),
                    interviewToOffer: (emp.interviews[timeKey] || 0) > 0 ? Math.round(((emp.offers[timeKey] || 0) / emp.interviews[timeKey]) * 100) : 0,
                    offerToHire: (emp.offers[timeKey] || 0) > 0 ? Math.round(((emp.hires[timeKey] || 0) / emp.offers[timeKey]) * 100) : 0,
                    overallConversion: (emp.resumes[timeKey] || 0) > 0 ? Math.round(((emp.hires[timeKey] || 0) / emp.resumes[timeKey]) * 100) : 0
                }))
            };
        } else {
            return {
                individualFunnel: [
                    { stage: 'Resumes', value: currentUser.resumes[timeKey] || 0, fill: '#8884d8' },
                    { stage: 'Submittals', value: currentUser.submittals[timeKey] || 0, fill: '#82ca9d' },
                    { stage: 'Interviews', value: currentUser.interviews[timeKey] || 0, fill: '#ffc658' },
                    { stage: 'Offers', value: currentUser.offers[timeKey] || 0, fill: '#ff7c7c' },
                    { stage: 'Hires', value: currentUser.hires[timeKey] || 0, fill: '#8dd1e1' }
                ],
                achievementGauge: [
                    { name: 'Achievement', value: currentUser.achieved || 0, target: 100 }
                ]
            };
        }
    };

    const getAppsChartData = () => {
        if (activeView === 'team') {
            return {
                toolUtilization: filteredData.map(emp => ({
                    name: emp.name.split(' ')[0],
                    utilization: emp.toolUsage.utilization || 0,
                    efficiency: emp.toolUsage.efficiency || 0,
                    totalHours: emp.toolUsage.totalHours || 0,
                    contribution: emp.toolUsage.productivityContribution || 'Unknown'
                })),
                toolPopularity: (() => {
                    const tools = {};
                    filteredData.forEach(emp => {
                        Object.entries(emp.toolUsage || {}).forEach(([tool, hours]) => {
                            if (typeof hours === 'number' && tool !== 'totalHours' && tool !== 'utilization' && tool !== 'efficiency' && tool !== 'productivityContribution') {
                                tools[tool] = (tools[tool] || 0) + hours;
                            }
                        });
                    });
                    return Object.entries(tools)
                        .map(([tool, hours]) => ({
                            tool: tool.charAt(0).toUpperCase() + tool.slice(1),
                            hours,
                            users: filteredData.filter(emp => (emp.toolUsage[tool] || 0) > 0).length
                        }))
                        .sort((a, b) => b.hours - a.hours)
                        .slice(0, 10); // Limit to top 10 tools
                })(),
                productivityContribution: [
                    { level: 'Very High', count: filteredData.filter(emp => emp.toolUsage.productivityContribution === 'Very High').length, fill: '#10b981' },
                    { level: 'High', count: filteredData.filter(emp => emp.toolUsage.productivityContribution === 'High').length, fill: '#3b82f6' },
                    { level: 'Medium', count: filteredData.filter(emp => emp.toolUsage.productivityContribution === 'Medium').length, fill: '#f59e0b' },
                    { level: 'Low', count: filteredData.filter(emp => emp.toolUsage.productivityContribution === 'Low').length, fill: '#ef4444' }
                ].filter(item => item.count > 0)
            };
        } else {
            const userTools = Object.entries(currentUser.toolUsage || {})
                .filter(([key, value]) => typeof value === 'number' && !['totalHours', 'utilization', 'efficiency', 'productivityContribution'].includes(key) && value > 0)
                .map(([tool, hours]) => ({
                    tool: tool.charAt(0).toUpperCase() + tool.slice(1),
                    hours,
                    percentage: (currentUser.toolUsage.totalHours || 0) > 0 ? Math.round((hours / currentUser.toolUsage.totalHours) * 100) : 0
                }));

            return {
                individualToolUsage: userTools,
                efficiencyBreakdown: [
                    { metric: 'Utilization', value: currentUser.toolUsage.utilization || 0, target: 85 },
                    { metric: 'Efficiency', value: currentUser.toolUsage.efficiency || 0, target: 80 },
                    { metric: 'Productivity', value: currentUser.productivity.thisweek || 0, target: 75 }
                ]
            };
        }
    };

    const renderCharts = () => {
        const timeKey = selectedTimeframe.toLowerCase().replace(' ', '');

        if (filteredData.length === 0) {
            return (
                <div className="charts-section">
                    <div className="no-data-message">
                        <h3>No data available for the selected filters</h3>
                        <p>Please adjust your filters to view charts</p>
                    </div>
                </div>
            );
        }

        switch (activeTab) {
            case 'productivity':
                const productivityData = getProductivityChartData();
                return (
                    <div className="charts-section">
                        <div className="chart-grid">
                            <div className="chart-card">
                                <h3 className="chart-title">Team Productivity Comparison</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <ComposedChart data={productivityData.teamComparison}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="productivity" name="Productivity %" fill="#4299e1" />
                                        <Line type="monotone" dataKey="wellbeing" name="Wellbeing Score" stroke="#ed8936" />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="chart-card">
                                <h3 className="chart-title">Wellbeing vs Productivity</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <ScatterChart data={productivityData.wellbeingProductivity}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis type="number" dataKey="wellbeing" name="Wellbeing" domain={[50, 100]} />
                                        <YAxis type="number" dataKey="productivity" name="Productivity" domain={[50, 100]} />
                                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                        <ReferenceLine x={75} stroke="#ef4444" strokeDasharray="5 5" />
                                        <ReferenceLine y={75} stroke="#ef4444" strokeDasharray="5 5" />
                                        <Scatter name="Employees" data={productivityData.wellbeingProductivity} fill="#8884d8" />
                                    </ScatterChart>
                                </ResponsiveContainer>
                            </div>

                            {productivityData.workloadDistribution.length > 0 && (
                                <div className="chart-card">
                                    <h3 className="chart-title">Workload Distribution</h3>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <PieChart>
                                            <Pie
                                                data={productivityData.workloadDistribution}
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={100}
                                                dataKey="count"
                                                label={({ status, percent }) => `${status} ${(percent * 100).toFixed(0)}%`}
                                            >
                                                {productivityData.workloadDistribution.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            )}

                            <div className="chart-card">
                                <h3 className="chart-title">Daily Performance Trend</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <AreaChart data={productivityData.dailyPerformance}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="day" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Area type="monotone" dataKey="avgProductivity" stackId="1" stroke="#8884d8" fill="#8884d8" name="Avg Productivity" />
                                        <Area type="monotone" dataKey="teamMorale" stackId="2" stroke="#82ca9d" fill="#82ca9d" name="Team Morale" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                );

            case 'recruitment':
                const recruitmentData = getRecruitmentChartData();
                return (
                    <div className="charts-section">
                        <div className="chart-grid">
                            <div className="chart-card">
                                <h3 className="chart-title">Recruitment Funnel</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={recruitmentData.funnelData} layout="vertical">
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis type="number" />
                                        <YAxis type="category" dataKey="stage" width={100} />
                                        <Tooltip />
                                        <Bar dataKey="value" barSize={30}>
                                            {recruitmentData.funnelData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.fill} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="chart-card">
                                <h3 className="chart-title">Team Performance</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <ComposedChart data={recruitmentData.teamPerformance}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="submittals" name="Submittals" fill="#4299e1" />
                                        <Bar dataKey="hires" name="Hires" fill="#48bb78" />
                                        <Line type="monotone" dataKey="achievement" name="Achievement %" stroke="#ed8936" />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>

                            {recruitmentData.conversionRates.length > 0 && (
                                <div className="chart-card">
                                    <h3 className="chart-title">Conversion Rates</h3>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={recruitmentData.conversionRates}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="submittalToInterview" name="Submittal to Interview %" fill="#8884d8" />
                                            <Bar dataKey="interviewToOffer" name="Interview to Offer %" fill="#82ca9d" />
                                            <Bar dataKey="offerToHire" name="Offer to Hire %" fill="#ffc658" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            )}
                        </div>
                    </div>
                );

            case 'team':
                return (
                    <div className="charts-section">
                        <div className="chart-grid">
                            <div className="chart-card">
                                <h3 className="chart-title">Team Productivity Overview</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={filteredData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey={`productivity.${timeKey}`} name="Productivity %" fill="#10b981" />
                                        <Bar dataKey="wellbeingScore" name="Wellbeing Score" fill="#3b82f6" />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="chart-card">
                                <h3 className="chart-title">Achievement vs Target</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <ComposedChart data={filteredData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="target" name="Target" fill="#94a3b8" />
                                        <Bar dataKey="actual" name="Actual" fill="#10b981" />
                                        <Line type="monotone" dataKey="achieved" name="Achievement %" stroke="#ef4444" />
                                    </ComposedChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="chart-card">
                                <h3 className="chart-title">Role Performance Distribution</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <Treemap
                                        data={Object.entries(
                                            filteredData.reduce((acc, emp) => {
                                                if (!acc[emp.role]) {
                                                    acc[emp.role] = { name: emp.role, size: 0, productivity: 0, count: 0 };
                                                }
                                                acc[emp.role].size += emp.productivity[timeKey] || 0;
                                                acc[emp.role].productivity += emp.productivity[timeKey] || 0;
                                                acc[emp.role].count += 1;
                                                return acc;
                                            }, {})
                                        ).map(([role, data]) => ({
                                            name: role,
                                            size: data.size,
                                            avgProductivity: data.count > 0 ? Math.round(data.productivity / data.count) : 0
                                        }))}
                                        dataKey="size"
                                        ratio={4 / 3}
                                        stroke="#fff"
                                        fill="#8884d8"
                                    />
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                );

            case 'apps':
                const appsData = getAppsChartData();
                return (
                    <div className="charts-section">
                        <div className="chart-grid">
                            {appsData.toolPopularity.length > 0 && (
                                <div className="chart-card">
                                    <h3 className="chart-title">Tool Usage Hours</h3>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={appsData.toolPopularity}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="tool" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="hours" name="Hours Used" fill="#8b5cf6" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            )}

                            <div className="chart-card">
                                <h3 className="chart-title">Tool Utilization vs Efficiency</h3>
                                <ResponsiveContainer width="100%" height={300}>
                                    <ScatterChart data={appsData.toolUtilization}>
                                        <CartesianGrid />
                                        <XAxis type="number" dataKey="utilization" name="Utilization" unit="%" domain={[60, 100]} />
                                        <YAxis type="number" dataKey="efficiency" name="Efficiency" unit="%" domain={[60, 100]} />
                                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                        <Scatter name="Employees" data={appsData.toolUtilization} fill="#ef4444" />
                                    </ScatterChart>
                                </ResponsiveContainer>
                            </div>

                            {appsData.productivityContribution.length > 0 && (
                                <div className="chart-card">
                                    <h3 className="chart-title">Productivity Contribution</h3>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <PieChart>
                                            <Pie
                                                data={appsData.productivityContribution}
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={100}
                                                dataKey="count"
                                                label={({ level, percent }) => `${level} ${(percent * 100).toFixed(0)}%`}
                                            >
                                                {appsData.productivityContribution.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            )}

                            {appsData.toolPopularity.length > 0 && (
                                <div className="chart-card">
                                    <h3 className="chart-title">Tool Efficiency Matrix</h3>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <RadarChart data={appsData.toolPopularity.slice(0, 6)}>
                                            <PolarGrid />
                                            <PolarAngleAxis dataKey="tool" />
                                            <PolarRadiusAxis />
                                            <Radar name="Usage Hours" dataKey="hours" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                                            <Tooltip />
                                            <Legend />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                            )}
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    const renderTabContent = () => {
        const timeKey = selectedTimeframe.toLowerCase().replace(' ', '');

        if (filteredData.length === 0) {
            return (
                <div className="table-card">
                    <div className="no-data-message">
                        <h3>No data available for the selected filters</h3>
                        <p>Please adjust your filters to view data</p>
                    </div>
                </div>
            );
        }

        switch (activeTab) {
            case 'productivity':
                return (
                    <div className="table-card">
                        <div className="table-header">
                            <h3 className="table-title">📊 Productivity Analytics</h3>
                            <div className="table-stats">
                                <span className="stat">Total: {filteredData.length} employees</span>
                                <span className="stat">Avg Productivity: {(filteredData.reduce((sum, emp) => sum + (emp.productivity[timeKey] || 0), 0) / filteredData.length).toFixed(1)}%</span>
                            </div>
                        </div>
                        <div className="table-container">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Employee</th>
                                        <th>Team</th>
                                        <th>Location</th>
                                        <th>Role</th>
                                        <th>Active Hours</th>
                                        <th>Idle Hours</th>
                                        <th>Productivity %</th>
                                        <th>Resumes Screened</th>
                                        <th>Avg Time/Resume</th>
                                        <th>Wellbeing Score</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((emp, index) => (
                                        <tr key={index}>
                                            <td className="employee-cell">
                                                <div className="employee-info">
                                                    <strong>{emp.fullName}</strong>
                                                </div>
                                            </td>
                                            <td><span className={`team-badge team-${emp.team.toLowerCase()}`}>{emp.team}</span></td>
                                            <td>{emp.location}</td>
                                            <td>{emp.role}</td>
                                            <td>{emp.activeHours[timeKey] || 0}h</td>
                                            <td>{emp.idleHours[timeKey] || 0}h</td>
                                            <td>
                                                <span className={`status-badge ${(emp.productivity[timeKey] || 0) > 80 ? 'bg-green-100 text-green-800' : (emp.productivity[timeKey] || 0) > 60 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                                    {emp.productivity[timeKey] || 0}%
                                                </span>
                                            </td>
                                            <td>{emp.resumes[timeKey] || 0}</td>
                                            <td>{emp.avgTimePerResume || 0} mins</td>
                                            <td>
                                                <div className="wellbeing-bar">
                                                    <div
                                                        className={`wellbeing-fill ${(emp.wellbeingScore || 0) > 75 ? 'wellbeing-high' : (emp.wellbeingScore || 0) > 65 ? 'wellbeing-medium' : 'wellbeing-low'}`}
                                                        style={{ width: `${emp.wellbeingScore || 0}%` }}
                                                    >
                                                        {emp.wellbeingScore || 0}
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`status-badge ${emp.workloadStatus === 'Balanced' ? 'bg-blue-100 text-blue-800' : emp.workloadStatus === 'Overburdened' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                    {emp.workloadStatus || 'Unknown'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            case 'recruitment':
                return (
                    <div className="table-card">
                        <div className="table-header">
                            <h3 className="table-title">👥 Recruitment Performance</h3>
                            <div className="table-stats">
                                <span className="stat">Total Hires: {filteredData.reduce((sum, emp) => sum + (emp.hires[timeKey] || 0), 0)}</span>
                                <span className="stat">Avg Achievement: {(filteredData.reduce((sum, emp) => sum + (emp.achieved || 0), 0) / filteredData.length).toFixed(0)}%</span>
                            </div>
                        </div>
                        <div className="table-container">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Employee</th>
                                        <th>Target</th>
                                        <th>Actual</th>
                                        <th>Achievement</th>
                                        <th>Submittals</th>
                                        <th>Interviews</th>
                                        <th>Offers</th>
                                        <th>Hires</th>
                                        <th>Conversion Rate</th>
                                        <th>Offer Acceptance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((emp, index) => (
                                        <tr key={index}>
                                            <td className="employee-cell">
                                                <strong>{emp.name}</strong>
                                            </td>
                                            <td>{emp.target || 0}</td>
                                            <td>{emp.actual || 0}</td>
                                            <td>
                                                <div className={`achievement-badge ${(emp.achieved || 0) >= 110 ? 'achievement-excellent' : (emp.achieved || 0) >= 100 ? 'achievement-good' : (emp.achieved || 0) >= 85 ? 'achievement-fair' : 'achievement-poor'}`}>
                                                    {emp.achieved || 0}%
                                                </div>
                                            </td>
                                            <td>{emp.submittals[timeKey] || 0}</td>
                                            <td>{emp.interviews[timeKey] || 0}</td>
                                            <td>{emp.offers[timeKey] || 0}</td>
                                            <td><strong>{emp.hires[timeKey] || 0}</strong></td>
                                            <td>{(emp.resumes[timeKey] || 0) > 0 ? (((emp.hires[timeKey] || 0) / emp.resumes[timeKey]) * 100).toFixed(1) : 0}%</td>
                                            <td>
                                                <span className={`status-badge ${(emp.offerAcceptanceRate || 0) > 80 ? 'bg-green-100 text-green-800' : (emp.offerAcceptanceRate || 0) > 60 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                                    {emp.offerAcceptanceRate || 0}%
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            case 'team':
                return (
                    <div className="table-card">
                        <div className="table-header">
                            <h3 className="table-title">🏆 Team Leaderboard</h3>
                            <div className="table-stats">
                                <span className="stat">Teams: {Array.from(new Set(filteredData.map(emp => emp.team))).join(', ')}</span>
                                {/* FIX 1: Create a copy of the array before sorting to avoid mutation */}
                                <span className="stat">Top Performer: {[...filteredData].sort((a, b) => (b.hires[timeKey] || 0) - (a.hires[timeKey] || 0))[0]?.fullName}</span>
                            </div>
                        </div>
                        <div className="table-container">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Employee</th>
                                        <th>Team</th>
                                        <th>Role</th>
                                        <th>Hires</th>
                                        <th>Productivity</th>
                                        <th>Wellbeing</th>
                                        <th>Workload</th>
                                        <th>Performance</th>
                                        <th>Recommendations</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* FIX 2: Create a copy of the array before sorting to avoid mutation */}
                                    {[...filteredData]
                                        .sort((a, b) => (b.hires[timeKey] || 0) - (a.hires[timeKey] || 0))
                                        .map((emp, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <div className={`rank-badge ${index === 0 ? 'rank-gold' : index === 1 ? 'rank-silver' : index === 2 ? 'rank-bronze' : 'rank-default'}`}>
                                                        #{index + 1}
                                                        {index < 3 && (
                                                            <span className="rank-icon">
                                                                {index === 0 ? '🏆' : index === 1 ? '🥈' : '🥉'}
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="employee-cell">
                                                    <strong>{emp.fullName}</strong>
                                                </td>
                                                <td>
                                                    <span className={`team-badge team-${emp.team.toLowerCase()}`}>{emp.team}</span>
                                                </td>
                                                <td>{emp.role}</td>
                                                <td><strong>{emp.hires[timeKey] || 0}</strong></td>
                                                <td>
                                                    <div className="progress-bar">
                                                        <div
                                                            className={`progress-fill ${(emp.productivity[timeKey] || 0) > 80 ? 'performance-high' : (emp.productivity[timeKey] || 0) > 60 ? 'performance-medium' : 'performance-low'}`}
                                                            style={{ width: `${emp.productivity[timeKey] || 0}%` }}
                                                        >
                                                            {emp.productivity[timeKey] || 0}%
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="progress-bar">
                                                        <div
                                                            className={`progress-fill ${(emp.wellbeingScore || 0) > 75 ? 'wellbeing-high' : (emp.wellbeingScore || 0) > 65 ? 'wellbeing-medium' : 'wellbeing-low'}`}
                                                            style={{ width: `${emp.wellbeingScore || 0}%` }}
                                                        >
                                                            {emp.wellbeingScore || 0}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className={`status-badge ${emp.workloadStatus === 'Balanced' ? 'bg-blue-100 text-blue-800' : emp.workloadStatus === 'Overburdened' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                        {emp.workloadStatus || 'Unknown'}
                                                    </span>
                                                </td>
                                                <td>
                                                    <div className={`achievement-badge ${(emp.achieved || 0) >= 105 ? 'achievement-excellent' : (emp.achieved || 0) >= 85 ? 'achievement-good' : 'achievement-fair'}`}>
                                                        {(emp.achieved || 0) >= 105 ? 'Exceeding' : (emp.achieved || 0) >= 85 ? 'Meeting' : 'Below'}
                                                    </div>
                                                </td>
                                                <td className="recommendations-cell">
                                                    {emp.workloadStatus === 'Overburdened' ? '🔄 Redistribute tasks' :
                                                        emp.workloadStatus === 'Under-utilized' ? '⬆️ Increase responsibilities' :
                                                            (emp.wellbeingScore || 0) < 70 ? '💚 Focus on wellbeing' :
                                                                (emp.achieved || 0) < 85 ? '🎯 Performance coaching' :
                                                                    '✅ Maintain current approach'}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            case 'apps':
                return (
                    <div className="table-card">
                        <div className="table-header">
                            <h3 className="table-title">🛠️ Tool Usage Analysis</h3>
                            <div className="table-stats">
                                <span className="stat">Total Tool Hours: {filteredData.reduce((sum, emp) => sum + (emp.toolUsage.totalHours || 0), 0)}</span>
                                <span className="stat">Avg Utilization: {(filteredData.reduce((sum, emp) => sum + (emp.toolUsage.utilization || 0), 0) / filteredData.length).toFixed(0)}%</span>
                            </div>
                        </div>
                        <div className="table-container">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Employee</th>
                                        <th>Total Hours</th>
                                        <th>Utilization</th>
                                        <th>Efficiency</th>
                                        <th>Top Tools</th>
                                        <th>Contribution Level</th>
                                        <th>ROI Status</th>
                                        <th>Recommendations</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredData.map((emp, index) => {
                                        const topTools = Object.entries(emp.toolUsage || {})
                                            .filter(([key, value]) => typeof value === 'number' && !['totalHours', 'utilization', 'efficiency', 'productivityContribution'].includes(key) && value > 0)
                                            .sort(([, a], [, b]) => b - a)
                                            .slice(0, 3)
                                            .map(([tool]) => tool.charAt(0).toUpperCase() + tool.slice(1));

                                        return (
                                            <tr key={index}>
                                                <td className="employee-cell">
                                                    <strong>{emp.name}</strong>
                                                </td>
                                                <td>{emp.toolUsage.totalHours || 0}h</td>
                                                <td>
                                                    <div className="utilization-bar">
                                                        <div
                                                            className={`utilization-fill ${(emp.toolUsage.utilization || 0) > 85 ? 'utilization-high' : (emp.toolUsage.utilization || 0) > 70 ? 'utilization-medium' : 'utilization-low'}`}
                                                            style={{ width: `${emp.toolUsage.utilization || 0}%` }}
                                                        >
                                                            <span>{emp.toolUsage.utilization || 0}%</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className={`status-badge ${(emp.toolUsage.efficiency || 0) > 85 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                        {emp.toolUsage.efficiency || 0}%
                                                    </span>
                                                </td>
                                                <td>{topTools.join(', ') || 'N/A'}</td>
                                                <td>
                                                    <span className={`contribution-badge contribution-${(emp.toolUsage.productivityContribution || 'unknown').toLowerCase().replace(/\s+/g, '-')}`}>
                                                        {emp.toolUsage.productivityContribution || 'Unknown'}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className={`status-badge ${(emp.toolUsage.utilization || 0) > 80 ? 'bg-green-100 text-green-800' : (emp.toolUsage.utilization || 0) > 60 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                                                        {(emp.toolUsage.utilization || 0) > 80 ? 'Optimal' : (emp.toolUsage.utilization || 0) > 60 ? 'Good' : 'Needs Attention'}
                                                    </span>
                                                </td>
                                                <td className="recommendations-cell">
                                                    {(emp.toolUsage.utilization || 0) < 60 ? '📚 Tool training needed' :
                                                        (emp.toolUsage.efficiency || 0) < 70 ? '⚡ Optimize workflow' :
                                                            emp.toolUsage.productivityContribution === 'Low' ? '🔍 Review tool selection' :
                                                                '✅ Well optimized'}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <div className="logo-section">
                    <img src="/logo-we360.png" alt="We360.ai" className="logo" />
                    <div className="logo-text">
                        <h2>We360.ai</h2>
                        <p>Analytics Dashboard</p>
                    </div>
                </div>

                <nav className="nav-menu">
                    {[
                        { id: 'productivity', label: 'Productivity', icon: '📊' },
                        { id: 'recruitment', label: 'Recruitment', icon: '👥' },
                        { id: 'team', label: 'Team', icon: '🏆' },
                        { id: 'apps', label: 'Apps', icon: '🛠️' }
                    ].map(tab => (
                        <div
                            key={tab.id}
                            className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <span className="nav-icon">{tab.icon}</span>
                            <span className="nav-label">{tab.label}</span>
                        </div>
                    ))}
                </nav>



                <div className="schedule-info">
                    <h4>📅 Work Schedule</h4>
                    <p>⏰ 9 Hours/Day</p>
                    <p>🏖️ Sunday Weekend</p>
                    <div className="schedule-summary">
                        <strong>Teams: Alpha & Beta</strong>
                        <p>Period: This Week (Aug 25 – Aug 29)</p>
                        <p>Total Employees: {filteredData.length}</p>
                    </div>
                </div>
            </div>

            <div className="main-content">
                <div className="header">
                    <div className="header-content">
                        <h1 className="header-title">
                            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Dashboard
                        </h1>
                        <p className="header-subtitle">
                            {activeView === 'team' ? 'Team Overview' : `Individual View - ${currentUser.fullName}`}
                        </p>
                    </div>

                    <div className="filters">
                        <div className="filter-group">
                            <label>Team</label>
                            <select
                                className="filter-select"
                                value={selectedTeam}
                                onChange={(e) => setSelectedTeam(e.target.value)}
                            >
                                {teams.map(team => (
                                    <option key={team} value={team}>{team}</option>
                                ))}
                            </select>
                        </div>

                        {/* Only show role and location filters for non-team tabs */}
                        {activeTab !== 'team' && (
                            <>
                                <div className="filter-group">
                                    <label>Role</label>
                                    <select
                                        className="filter-select"
                                        value={selectedRole}
                                        onChange={(e) => setSelectedRole(e.target.value)}
                                    >
                                        {roles.map(role => (
                                            <option key={role} value={role}>{role}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="filter-group">
                                    <label>Status</label>
                                    <select
                                        value={selectedStatus}
                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                        className="filter-select"
                                    >
                                        {statuses.map(status => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </div>


                                <div className="filter-group">
                                    <label>Location</label>
                                    <select
                                        className="filter-select"
                                        value={selectedLocation}
                                        onChange={(e) => setSelectedLocation(e.target.value)}
                                    >
                                        {locations.map(location => (
                                            <option key={location} value={location}>{location}</option>
                                        ))}
                                    </select>
                                </div>
                            </>
                        )}

                        <div className="filter-group">
                            <label>Timeframe</label>
                            <select
                                className="filter-select"
                                value={selectedTimeframe}
                                onChange={(e) => setSelectedTimeframe(e.target.value)}
                            >
                                <option value="This Week">This Week</option>
                                <option value="Today">Today</option>
                                <option value="This Month">This Month</option>
                            </select>
                        </div>

                        {activeView === 'individual' && (
                            <div className="filter-group">
                                <label>Employee</label>
                                <select
                                    className="filter-select"
                                    value={selectedUser}
                                    onChange={(e) => setSelectedUser(e.target.value)}
                                >
                                    {mockData.employees.map(emp => (
                                        <option key={emp.name} value={emp.name}>
                                            {emp.fullName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>
                </div>

                {renderKPIs()}
                {renderCharts()}
                {renderTabContent()}
            </div>


        </div>
    );
};

export default Dashboard;