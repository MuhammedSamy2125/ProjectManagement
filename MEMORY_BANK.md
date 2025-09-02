# Memory Bank - Website Requirements & Decisions

## Project Overview
**Project Name**: Building Web Project  
**Start Date**: [Current Date]  
**Status**: Implementation Started  

## Requirements Gathering Process
This document tracks the requirements gathering process and decisions made for the website project.

### Key Questions to Answer:
1. **Purpose & Goals**
   - What is the primary purpose of this website?
   - Who is the target audience?
   - What actions should visitors take?

2. **Content & Features**
   - What type of content will be displayed?
   - What functionality is needed?
   - What pages/sections are required?

3. **Technical Requirements**
   - Performance requirements?
   - Browser compatibility needs?
   - Mobile responsiveness requirements?

4. **Design & Branding**
   - Visual style preferences?
   - Brand colors/identity?
   - Layout preferences?

## Decisions Made
- **Database**: JSON file storage for data persistence
- **Architecture**: Modern web application with client-side JavaScript
- **Implementation**: Starting with basic structure and adding features incrementally
- **Authentication**: Three-role system (admin, engineer, client) with registration
- **Admin User**: Static user stored in JSON file (admin@example.com / admin123)
- **User Registration**: Engineer and client roles can register via JSON data storage
- **Engineer Profile**: Enhanced registration with experience, photo, CV, projects, skills, and bio
- **File Upload**: Photo (5MB) and CV (10MB) upload support for engineers
- **Profile Editing**: Engineers can modify their own data from dashboard
- **File Storage**: Client-side file management system using localStorage with blob URLs for display/download
- **Data Persistence**: User data saved to JSON file with localStorage backup
- **File Upload Solution**: Implemented browser-compatible file handling with download functionality


## Technical Architecture
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Database**: JSON file (`data.json`)
- **Storage**: Local file system + localStorage for user data
- **Responsive**: Mobile-first design approach
- **Authentication**: Client-side authentication with role-based access

## Progress Tracking
- [x] Requirements gathering started
- [x] Technical architecture defined
- [x] Basic HTML structure created
- [x] CSS styling implemented
- [x] JavaScript functionality added
- [x] JSON database structure created
- [x] Authentication system implemented
- [x] User registration system added
- [x] Dashboard functionality created
- [x] Engineer profile system implemented
- [x] File upload functionality added
- [x] Enhanced engineer dashboard created
- [x] Bio field added to engineer registration
- [x] Profile editing functionality implemented
- [x] File display issues fixed (photo and CV)
- [x] Edit profile form with all engineer fields
- [x] Documentation completed
- [x] Client-side file upload system implemented
- [x] File download functionality added
- [x] File management interface created
- [ ] Testing phase
- [ ] Deployment ready

---
*Last Updated: [Current Date]*
