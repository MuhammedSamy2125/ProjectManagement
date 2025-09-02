

# File Upload System Guide

## How File Uploads Work

Due to browser security restrictions, this web application cannot directly write files to the server's file system. Instead, it uses a **client-side file management system** that:

### ✅ **What Works:**
1. **File Upload**: Users can upload photos and CV files during registration and profile editing
2. **File Storage**: Files are stored in the browser's localStorage with metadata
3. **File Display**: Photos are displayed in the engineer profile
4. **File Download**: Users can download their uploaded files
5. **File Management**: A file list shows all uploaded files with download options

### 🔧 **Technical Implementation:**

#### **File Upload Process:**
1. User selects a file (photo or CV)
2. File is validated (size limits: 5MB for photos, 10MB for CVs)
3. Unique filename is generated (`profile_1234567890.jpg` or `cv_1234567890.pdf`)
4. File is stored in localStorage with metadata
5. File path is saved in the user's profile data

#### **File Storage Structure:**
```javascript
{
  name: "profile_1234567890.jpg",
  originalName: "my-photo.jpg", 
  size: 2048576,
  type: "image/jpeg",
  path: "Images/profile_1234567890.jpg",
  uploadedAt: "2024-01-01T00:00:00Z",
  downloadUrl: "blob:http://localhost:3000/abc123..."
}
```

#### **File Display:**
- **Photos**: Displayed directly in the engineer profile using the stored blob URL
- **CVs**: Download links are created using the stored blob URL
- **File List**: Shows all uploaded files with download buttons

### 📁 **File Locations:**

#### **In the Application:**
- **Photos**: Displayed in engineer profile dashboard
- **CVs**: Downloadable from engineer profile dashboard  
- **File List**: Shows all uploaded files in the "Uploaded Files" section

#### **In localStorage:**
- **User Data**: `localStorage.getItem('registeredUsers')`
- **File Metadata**: `localStorage.getItem('savedFiles')`
- **Current User**: `localStorage.getItem('currentUser')`

### 🚀 **For Production Deployment:**

To implement actual file storage, you would need:

1. **Server-side file handling** (Node.js, PHP, Python, etc.)
2. **File upload endpoints** to receive files
3. **File storage** (local filesystem, cloud storage like AWS S3)
4. **Database storage** for file metadata
5. **File serving** endpoints to display/download files

### 🔍 **Current Features:**

✅ **Working Features:**
- File upload during registration
- File upload during profile editing  
- File validation (size limits)
- File display in profiles
- File download functionality
- File management interface
- File metadata storage
- Success/error notifications

### 📝 **Usage Instructions:**

1. **Register as Engineer**: Upload photo and CV during registration
2. **Edit Profile**: Update photo and CV in the edit profile form
3. **View Files**: Check the "Uploaded Files" section in your dashboard
4. **Download Files**: Use the download buttons to get your files

### ⚠️ **Important Notes:**

- Files are stored in the browser's localStorage (limited space)
- Files are lost if browser data is cleared
- For production use, implement server-side file storage
- Current system is for demonstration/development purposes

---

*This system provides a complete file upload experience while working within browser security constraints.*
