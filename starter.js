// Building Web Project - JavaScript Application
// JSON Database Integration and Modern Web Functionality

class WebApp {
    constructor() {
        this.data = null;
        this.currentPage = 'home';
        this.currentUser = null;
        this.currentLanguage = 'ar'; // Default to Arabic
        this.init();
    }

    async init() {
        try {
            await this.loadData();
            this.setupEventListeners();
            this.setupNavigation();
            this.loadBlogPosts();
            this.setupContactForm();
            this.setupMobileMenu();
            this.setupAuthentication();
            this.setupEditProfile();
            this.setupLanguageSwitcher();
            this.checkAuthStatus();
            console.log('Web application initialized successfully');
        } catch (error) {
            console.error('Error initializing application:', error);
            this.showError('Failed to initialize application');
        }
    }

    // Load data from JSON file
    async loadData() {
        try {
            // Try to load from localStorage first (for offline/local use)
            const savedData = localStorage.getItem('appData');
            if (savedData) {
                this.data = JSON.parse(savedData);
                console.log('Data loaded from localStorage:', this.data);
                return;
            }

            // Try to fetch from server
            try {
                const response = await fetch('data.json');
                if (response.ok) {
                    this.data = await response.json();
                    console.log('Data loaded successfully from server:', this.data);
                    // Save to localStorage for future use
                    localStorage.setItem('appData', JSON.stringify(this.data));
                    return;
                }
            } catch (fetchError) {
                console.log('Fetch failed, using embedded data:', fetchError.message);
            }

            // Use embedded data as fallback (eliminates CORS issues)
            this.data = this.getEmbeddedData();
            console.log('Using embedded data:', this.data);
            
            // Merge with any existing localStorage registeredUsers
            const existingUsers = localStorage.getItem('registeredUsers');
            if (existingUsers) {
                try {
                    const parsedUsers = JSON.parse(existingUsers);
                    if (parsedUsers.length > 0) {
                        this.data.registeredUsers = parsedUsers;
                        console.log('Merged existing users from localStorage:', parsedUsers);
                    }
                } catch (error) {
                    console.error('Error parsing existing users:', error);
                }
            }
            
            // Save to localStorage for future use
            localStorage.setItem('appData', JSON.stringify(this.data));
        } catch (error) {
            console.error('Error loading data:', error);
            // Final fallback to default data
            this.data = this.getDefaultData();
            // Save default data to localStorage
            localStorage.setItem('appData', JSON.stringify(this.data));
        }
    }

    // Embedded data (copy of data.json to eliminate CORS issues)
    getEmbeddedData() {
        return {
            "settings": {
                "siteName": "Building Web Project",
                "siteDescription": "A modern web application with JSON database",
                "version": "1.0.0",
                "lastUpdated": "2024-01-01"
            },
            "users": [
                {
                    "id": 1,
                    "username": "admin",
                    "email": "admin@example.com",
                    "password": "admin123",
                    "role": "admin",
                    "createdAt": "2024-01-01T00:00:00Z"
                }
            ],
            "registeredUsers": [],
            "projectRequests": [],
            "content": {
                "pages": [
                    {
                        "id": "home",
                        "title": "Home",
                        "content": "Welcome to our modern web application!",
                        "active": true
                    },
                    {
                        "id": "about",
                        "title": "About",
                        "content": "Learn more about our project and mission.",
                        "active": true
                    },
                    {
                        "id": "contact",
                        "title": "Contact",
                        "content": "Get in touch with us.",
                        "active": true
                    }
                ],
                "posts": [
                    {
                        "id": 1,
                        "title": "Getting Started",
                        "content": "This is our first blog post about getting started with the project.",
                        "author": "admin",
                        "createdAt": "2024-01-01T00:00:00Z",
                        "tags": ["getting-started", "tutorial"]
                    }
                ]
            },
            "forms": {
                "contact": {
                    "fields": [
                        {
                            "name": "name",
                            "label": "Name",
                            "type": "text",
                            "required": true
                        },
                        {
                            "name": "email",
                            "label": "Email",
                            "type": "email",
                            "required": true
                        },
                        {
                            "name": "message",
                            "label": "Message",
                            "type": "textarea",
                            "required": true
                        }
                    ]
                }
            }
        };
    }

    // Default data structure if JSON file is not accessible
    getDefaultData() {
        return {
            settings: {
                siteName: "Building Web Project",
                siteDescription: "A modern web application with JSON database",
                version: "1.0.0",
                lastUpdated: new Date().toISOString().split('T')[0]
            },
            users: [
                {
                    id: 1,
                    username: "admin",
                    email: "admin@example.com",
                    password: "admin123",
                    role: "admin",
                    createdAt: new Date().toISOString()
                }
            ],
            registeredUsers: [],
            projectRequests: [],
            content: {
                pages: [
                    {
                        id: "home",
                        title: "Home",
                        content: "Welcome to our modern web application!",
                        active: true
                    },
                    {
                        id: "about",
                        title: "About",
                        content: "Learn more about our project and mission.",
                        active: true
                    },
                    {
                        id: "contact",
                        title: "Contact",
                        content: "Get in touch with us.",
                        active: true
                    }
                ],
                posts: [
                    {
                        id: 1,
                        title: "Getting Started",
                        content: "This is our first blog post about getting started with the project.",
                        author: "admin",
                        createdAt: new Date().toISOString(),
                        tags: ["getting-started", "tutorial"]
                    },
                    {
                        id: 2,
                        title: "JSON Database Benefits",
                        content: "Learn about the advantages of using JSON files as a simple database solution.",
                        author: "admin",
                        createdAt: new Date().toISOString(),
                        tags: ["database", "json", "tutorial"]
                    }
                ]
            },
            forms: {
                contact: {
                    fields: [
                        {
                            name: "name",
                            label: "Name",
                            type: "text",
                            required: true
                        },
                        {
                            name: "email",
                            label: "Email",
                            type: "email",
                            required: true
                        },
                        {
                            name: "message",
                            label: "Message",
                            type: "textarea",
                            required: true
                        }
                    ]
                }
            }
        };
    }

    // Setup event listeners
    setupEventListeners() {
        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                this.showPage(page);
            });
        });

        // Contact form
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactForm(e.target);
            });
        }

        // Mobile menu toggle
        const navToggle = document.getElementById('nav-toggle');
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar')) {
                this.closeMobileMenu();
            }
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const href = anchor.getAttribute('href');
                // Only handle internal page links (starting with # and not just #)
                if (href.startsWith('#') && href.length > 1) {
                    const target = document.querySelector(href);
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });

        // Auth tab switching
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchAuthTab(e.target.getAttribute('data-tab'));
            });
        });

        // Role selection for engineer fields
        const roleSelect = document.getElementById('register-role');
        if (roleSelect) {
            roleSelect.addEventListener('change', (e) => {
                this.toggleEngineerFields(e.target.value);
            });
        }
    }

    // Setup navigation
    setupNavigation() {
        // Update page title
        if (this.data && this.data.settings) {
            document.title = this.data.settings.siteName;
        }

        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            if (e.state && e.state.page) {
                this.showPage(e.state.page, false);
            }
        });

        // Set initial active page
        const hash = window.location.hash.slice(1) || 'home';
        this.showPage(hash, false);
    }

    // Show page with smooth transition
    showPage(pageId, updateHistory = true) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });

        // Show target page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = pageId;
        }

        // Update navigation
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        const activeLink = document.querySelector(`[data-page="${pageId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        // Update URL
        if (updateHistory) {
            const url = new URL(window.location);
            url.hash = pageId;
            window.history.pushState({ page: pageId }, '', url);
        }

        // Close mobile menu
        this.closeMobileMenu();

        // Load page-specific content
        this.loadPageContent(pageId);
    }

    // Load page-specific content
    loadPageContent(pageId) {
        switch (pageId) {
            case 'blog':
                this.loadBlogPosts();
                break;
            case 'contact':
                this.setupContactForm();
                break;
            case 'about':
                this.loadAboutContent();
                break;
            case 'dashboard':
                this.initializeDashboard();
                break;
            default:
                break;
        }
    }

    // Initialize dashboard based on user role
    initializeDashboard() {
        console.log('=== INITIALIZE DASHBOARD DEBUG ===');
        console.log('Current user:', this.currentUser);
        console.log('Current user role:', this.currentUser?.role);
        
        if (!this.currentUser) {
            console.log('No current user, redirecting to login');
            this.showPage('login');
            return;
        }
        
        // Ensure both dashboards are hidden by default
        const clientDashboard = document.getElementById('client-dashboard');
        const engineerDashboard = document.getElementById('engineer-dashboard');
        
        if (clientDashboard) {
            clientDashboard.style.display = 'none';
            console.log('Client dashboard hidden by default');
        }
        
        if (engineerDashboard) {
            engineerDashboard.style.display = 'none';
            console.log('Engineer dashboard hidden by default');
        }
        
        // Show appropriate dashboard based on user role
        if (this.currentUser.role === 'client') {
            
            // Add some test engineers if none exist
            if (!this.data.registeredUsers || this.data.registeredUsers.filter(u => u.role === 'engineer').length === 0) {
                console.log('No engineers found, adding test engineers');
                this.addTestEngineers();
            }
        } else if (this.currentUser.role === 'engineer') {
            console.log('Showing engineer dashboard for engineer user');
            this.showEngineerDashboard();
        } else {
            console.log('Unknown user role:', this.currentUser.role);
        }
    }

    // Add test engineers for demonstration
    addTestEngineers() {
        console.log('=== ADDING TEST ENGINEERS ===');
        
        if (!this.data.registeredUsers) {
            this.data.registeredUsers = [];
        }
        
        const testEngineers = [
            {
                id: Date.now() + 1,
                username: "John Engineer",
                email: "john@engineer.com",
                password: "test123",
                role: "engineer",
                experience: 5,
                skills: ["Structural Engineering", "AutoCAD", "Project Management", "Building Design"],
                bio: "Experienced structural engineer with 5 years in residential and commercial projects. Specialized in modern building techniques and sustainable design.",
                projects: "Residential complexes, Office buildings, Shopping centers, Eco-friendly homes",
                photo: null,
                cv: null,
                createdAt: new Date().toISOString()
            },
            {
                id: Date.now() + 2,
                username: "Sarah Architect",
                email: "sarah@architect.com",
                password: "test123",
                role: "engineer",
                experience: 8,
                skills: ["Architecture Design", "3D Modeling", "Sustainable Design", "Interior Design"],
                bio: "Creative architect specializing in sustainable and modern building designs. Passionate about creating beautiful, functional spaces.",
                projects: "Eco-friendly homes, Modern offices, Cultural centers, Luxury villas",
                photo: null,
                cv: null,
                createdAt: new Date().toISOString()
            },
            {
                id: Date.now() + 3,
                username: "Mike Construction",
                email: "mike@construction.com",
                password: "test123",
                role: "engineer",
                experience: 12,
                skills: "Construction Management, Site Planning, Cost Estimation, Quality Control",
                bio: "Senior construction engineer with over 12 years of experience in large-scale projects. Expert in project management and cost optimization.",
                projects: "Shopping malls, Industrial facilities, High-rise buildings, Infrastructure projects",
                photo: null,
                cv: null,
                createdAt: new Date().toISOString()
            }
        ];
        
        // Add test engineers if they don't exist
        testEngineers.forEach(engineer => {
            const exists = this.data.registeredUsers.some(u => u.email === engineer.email);
            if (!exists) {
                this.data.registeredUsers.push(engineer);
                console.log('Added test engineer:', engineer.username);
            }
        });
        
        // Save to storage
        this.saveDataToJSON();
        console.log('Test engineers added successfully');
    }

    // Load blog posts from JSON data
    loadBlogPosts() {
        const blogGrid = document.getElementById('blog-grid');
        if (!blogGrid || !this.data) return;

        const posts = this.data.content.posts || [];
        
        if (posts.length === 0) {
            blogGrid.innerHTML = `
                <div class="text-center" style="grid-column: 1 / -1;">
                    <p>No blog posts available yet.</p>
                </div>
            `;
            return;
        }

        blogGrid.innerHTML = posts.map(post => `
            <article class="blog-card">
                <div class="blog-card-header">
                    <h3 class="blog-card-title">${this.escapeHtml(post.title)}</h3>
                    <div class="blog-card-meta">
                        <span><i class="fas fa-user"></i> ${this.escapeHtml(post.author)}</span>
                        <span><i class="fas fa-calendar"></i> ${this.formatDate(post.createdAt)}</span>
                    </div>
                </div>
                <div class="blog-card-content">
                    <p>${this.escapeHtml(post.content)}</p>
                    ${post.tags ? `
                        <div class="blog-card-tags">
                            ${post.tags.map(tag => `<span class="blog-tag">${this.escapeHtml(tag)}</span>`).join('')}
                        </div>
                    ` : ''}
                </div>
            </article>
        `).join('');
    }

    // Load about page content
    loadAboutContent() {
        if (!this.data) return;

        const aboutPage = this.data.content.pages.find(page => page.id === 'about');
        if (aboutPage) {
            // Update about page content if needed
            console.log('About page content loaded');
        }
    }

    // Setup contact form
    setupContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;

        // Add form validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });

            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.validateField(input);
                }
            });
        });
    }

    // Handle contact form submission
    async handleContactForm(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Validate form
        let isValid = true;
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        if (!isValid) {
            this.showError('Please fix the errors in the form');
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="loading"></span> Sending...';
        submitBtn.disabled = true;

        try {
            // Simulate form submission (in real app, this would send to server)
            await this.simulateFormSubmission(data);
            
            this.showSuccess('Message sent successfully! We\'ll get back to you soon.');
            form.reset();
            
            // Save to local storage as backup
            this.saveContactMessage(data);
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showError('Failed to send message. Please try again.');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    // Simulate form submission
    simulateFormSubmission(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log('Form data submitted:', data);
                resolve();
            }, 1500);
        });
    }

    // Save contact message to local storage
    saveContactMessage(data) {
        try {
            const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
            messages.push({
                ...data,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem('contactMessages', JSON.stringify(messages));
        } catch (error) {
            console.error('Error saving message to localStorage:', error);
        }
    }

    // Validate form field
    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        const required = field.hasAttribute('required');

        // Remove existing error styling
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }

        // Check if required field is empty
        if (required && !value) {
            this.showFieldError(field, 'This field is required');
            return false;
        }

        // Validate email
        if (type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }

        // Validate minimum length for textarea
        if (type === 'textarea' && value.length < 10) {
            this.showFieldError(field, 'Message must be at least 10 characters long');
            return false;
        }

        return true;
    }

    // Show field error
    showFieldError(field, message) {
        field.classList.add('error');
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = 'var(--danger-color)';
        errorElement.style.fontSize = 'var(--font-size-sm)';
        errorElement.style.marginTop = 'var(--spacing-xs)';
        field.parentNode.appendChild(errorElement);
    }

    // Setup mobile menu
    setupMobileMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (!navToggle || !navMenu) return;

        // Add CSS for mobile menu
        const style = document.createElement('style');
        style.textContent = `
            .nav-menu {
                transition: left 0.3s ease-in-out;
            }
            .nav-menu.active {
                left: 0 !important;
            }
            .nav-toggle.active .bar:nth-child(2) {
                opacity: 0;
            }
            .nav-toggle.active .bar:nth-child(1) {
                transform: translateY(7px) rotate(45deg);
            }
            .nav-toggle.active .bar:nth-child(3) {
                transform: translateY(-7px) rotate(-45deg);
            }
        `;
        document.head.appendChild(style);
    }

    // Toggle mobile menu
    toggleMobileMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (navToggle && navMenu) {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        }
    }

    // Close mobile menu
    closeMobileMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (navToggle && navMenu) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }

    // Show success message
    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    // Show error message
    showError(message) {
        this.showNotification(message, 'error');
    }

    // Show info message
    showInfo(message) {
        this.showNotification(message, 'info');
    }

    // Show notification
    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${this.escapeHtml(message)}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--success-color)' : type === 'error' ? 'var(--danger-color)' : type === 'info' ? 'var(--info-color)' : 'var(--primary-color)'};
            color: white;
            padding: var(--spacing-md) var(--spacing-lg);
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            max-width: 400px;
            animation: slideInRight 0.3s ease-out;
        `;

        notification.querySelector('.notification-content').style.cssText = `
            display: flex;
            align-items: center;
            gap: var(--spacing-sm);
        `;

        notification.querySelector('.notification-close').style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: var(--font-size-xl);
            cursor: pointer;
            margin-left: auto;
        `;

        // Add close functionality
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.remove();
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);

        document.body.appendChild(notification);
    }

    // Utility functions
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Add new blog post (for demonstration)
    addBlogPost(title, content, tags = []) {
        if (!this.data) return;

        const newPost = {
            id: Date.now(),
            title,
            content,
            author: 'admin',
            createdAt: new Date().toISOString(),
            tags
        };

        this.data.content.posts.push(newPost);
        this.loadBlogPosts();
        
        // In a real app, you would save this to the JSON file
        console.log('New blog post added:', newPost);
    }

    // Update site settings
    updateSiteSettings(settings) {
        if (!this.data) return;

        this.data.settings = { ...this.data.settings, ...settings };
        document.title = this.data.settings.siteName;
        
        // In a real app, you would save this to the JSON file
        console.log('Site settings updated:', this.data.settings);
    }

    // Authentication Methods
    setupAuthentication() {
        // Login form
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLogin(e.target);
            });
        }

        // Register form
        const registerForm = document.getElementById('register-form');
        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleRegister(e.target);
            });
        }
    }

    // Switch auth tabs
    switchAuthTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.auth-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update forms
        document.querySelectorAll('.auth-form').forEach(form => {
            form.classList.remove('active');
        });
        document.getElementById(`${tabName}-form`).classList.add('active');
    }

    // Handle login
    async handleLogin(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Validate form
        if (!data.email || !data.password) {
            this.showError('Please fill in all fields');
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="loading"></span> Logging in...';
        submitBtn.disabled = true;

        try {
            const user = await this.authenticateUser(data.email, data.password);
            if (user) {
                this.loginUser(user);
                this.showSuccess(`Welcome back, ${user.username}!`);
                form.reset();
            } else {
                this.showError('Invalid email or password');
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showError('Login failed. Please try again.');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    // Handle registration
    async handleRegister(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Validate form
        if (!data.username || !data.email || !data.password || !data.role) {
            this.showError('Please fill in all fields');
            return;
        }

        if (data.password.length < 6) {
            this.showError('Password must be at least 6 characters long');
            return;
        }

        // Validate engineer-specific fields
        if (data.role === 'engineer') {
            if (!data.experience || data.experience < 0) {
                this.showError('Please enter valid years of experience');
                return;
            }
        }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="loading"></span> Registering...';
        submitBtn.disabled = true;

        try {
            // Handle file uploads for engineer
            if (data.role === 'engineer') {
                await this.handleEngineerFiles(formData, data);
            }

            const success = await this.registerUser(data);
            if (success) {
                this.showSuccess('Registration successful! Please login.');
                this.switchAuthTab('login');
                form.reset();
                this.toggleEngineerFields(''); // Hide engineer fields
            } else {
                this.showError('Registration failed. Email might already be in use.');
            }
        } catch (error) {
            console.error('Registration error:', error);
            this.showError('Registration failed. Please try again.');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    // Handle engineer file uploads
    async handleEngineerFiles(formData, data) {
        return new Promise((resolve) => {
            try {
                // Handle photo upload
                const photoFile = formData.get('photo');
                if (photoFile && photoFile.size > 0) {
                    if (photoFile.size > 5 * 1024 * 1024) { // 5MB limit
                        throw new Error('Photo file size must be less than 5MB');
                    }
                    
                    // Generate unique filename
                    const fileExtension = photoFile.name.split('.').pop();
                    const fileName = `profile_${Date.now()}.${fileExtension}`;
                    const filePath = `Images/${fileName}`;
                    
                    // Store file path in data
                    data.photo = filePath;
                    
                    // Save file to Images folder
                    this.saveFileToFolder(photoFile, fileName, 'Images');
                }

                // Handle CV upload
                const cvFile = formData.get('cv');
                if (cvFile && cvFile.size > 0) {
                    if (cvFile.size > 10 * 1024 * 1024) { // 10MB limit
                        throw new Error('CV file size must be less than 10MB');
                    }
                    
                    // Generate unique filename
                    const fileExtension = cvFile.name.split('.').pop();
                    const fileName = `cv_${Date.now()}.${fileExtension}`;
                    const filePath = `CVs/${fileName}`;
                    
                    // Store file info for download
                    data.cv = {
                        name: cvFile.name,
                        size: cvFile.size,
                        type: cvFile.type,
                        path: filePath
                    };
                    
                    // Save file to CVs folder
                    this.saveFileToFolder(cvFile, fileName, 'CVs');
                }

                resolve();
            } catch (error) {
                console.error('File upload error:', error);
                this.showError(error.message);
                resolve();
            }
        });
    }

    // Save data to JSON file
    saveDataToJSON() {
        // In a real application, this would send the data to the server
        // For now, we'll simulate this by updating the data object
        console.log('Saving data to JSON file:', this.data);
        
        // Store updated data in localStorage as primary storage
        localStorage.setItem('appData', JSON.stringify(this.data));
        
        // Also update the backup localStorage.registeredUsers
        if (this.data.registeredUsers && this.data.registeredUsers.length > 0) {
            localStorage.setItem('registeredUsers', JSON.stringify(this.data.registeredUsers));
            console.log('Updated registeredUsers backup:', this.data.registeredUsers.length, 'users');
        }
    }

    // Authenticate user
    authenticateUser(email, password) {
        return new Promise((resolve) => {
            // Check against JSON data first (for admin)
            const adminUser = this.data.users.find(u => 
                u.email === email && u.password === password
            );

            if (adminUser) {
                resolve(adminUser);
                return;
            }

            // Check against JSON registeredUsers
            if (this.data.registeredUsers && this.data.registeredUsers.length > 0) {
                const registeredUser = this.data.registeredUsers.find(u => 
                    u.email === email && u.password === password
                );

                if (registeredUser) {
                    resolve(registeredUser);
                    return;
                }
            }

            // Check against localStorage as backup
            try {
                const localStorageUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
                const backupUser = localStorageUsers.find(u => 
                    u.email === email && u.password === password
                );

                if (backupUser) {
                    resolve(backupUser);
                    return;
                }
            } catch (error) {
                console.error('Error reading from localStorage:', error);
            }

            resolve(null);
        });
    }

    // Save file to specified folder (Images or CVs)
    saveFileToFolder(file, fileName, folderName) {
        console.log(`Saving file ${fileName} to ${folderName} folder`);
        
        // Create blob URL for the file (persistent across sessions)
        const blobUrl = URL.createObjectURL(file);
        
        // Store file info with proper folder path
        const savedFiles = JSON.parse(localStorage.getItem('savedFiles') || '[]');
        const fileInfo = {
            name: fileName,
            originalName: file.name,
            size: file.size,
            type: file.type,
            path: `${folderName}/${fileName}`,
            uploadedAt: new Date().toISOString(),
            downloadUrl: blobUrl,
            folder: folderName
        };
        savedFiles.push(fileInfo);
        localStorage.setItem('savedFiles', JSON.stringify(savedFiles));
        
        // Also create a persistent reference for the file
        this.createPersistentFileReference(file, fileName, folderName, blobUrl);
        
        // Show success message
        this.showSuccess(`File "${file.name}" uploaded successfully to ${folderName} folder!`);
    }

    // Create persistent file reference
    createPersistentFileReference(file, fileName, folderName, blobUrl) {
        // Store file data in a more persistent way
        const reader = new FileReader();
        reader.onload = (e) => {
            const fileData = {
                fileName: fileName,
                originalName: file.name,
                folder: folderName,
                type: file.type,
                size: file.size,
                data: e.target.result, // base64 data
                uploadedAt: new Date().toISOString()
            };
            
            // Store in localStorage with a separate key for persistence
            const persistentFiles = JSON.parse(localStorage.getItem('persistentFiles') || '[]');
            persistentFiles.push(fileData);
            localStorage.setItem('persistentFiles', JSON.stringify(persistentFiles));
        };
        reader.readAsDataURL(file);
    }

    // Register new user
    registerUser(userData) {
        return new Promise((resolve) => {
            try {
                // Check if email already exists in JSON data
                if (!this.data.registeredUsers) {
                    this.data.registeredUsers = [];
                }
                const existingUsers = this.data.registeredUsers;
                const emailExists = existingUsers.some(u => u.email === userData.email);

                if (emailExists) {
                    resolve(false);
                    return;
                }

                                    // Create new user with role-specific data
                    const newUser = {
                        id: Date.now(),
                        username: userData.username,
                        email: userData.email,
                        password: userData.password,
                        role: userData.role,
                        createdAt: new Date().toISOString()
                    };

                    // Add role-specific fields
                    if (userData.role === 'engineer') {
                        // Engineer-specific fields
                        newUser.experience = userData.experience || 0;
                        newUser.photo = userData.photo || null;
                        newUser.cv = userData.cv || null;
                        newUser.projects = userData.projects || '';
                        newUser.skills = userData.skills || '';
                        newUser.bio = userData.bio || '';
                    } else if (userData.role === 'client') {
                        // Client-specific fields (minimal for now)
                        newUser.projects = []; // Array to store building projects
                    }

                // Add to JSON data
                this.data.registeredUsers.push(newUser);
                
                // Save to JSON file (in real app, this would be a server operation)
                this.saveDataToJSON();
                
                console.log('User registered successfully:', newUser.username, 'Role:', newUser.role);
                console.log('Total registered users:', this.data.registeredUsers.length);

                resolve(true);
            } catch (error) {
                console.error('Error saving user to JSON:', error);
                resolve(false);
            }
        });
    }

    // Login user
    loginUser(user) {
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.updateAuthUI();
        this.showPage('dashboard');
    }

    // Logout user
    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        this.updateAuthUI();
        this.showPage('home');
        this.showSuccess('Logged out successfully');
    }

    // Check authentication status
    checkAuthStatus() {
        try {
            const savedUser = localStorage.getItem('currentUser');
            if (savedUser) {
                this.currentUser = JSON.parse(savedUser);
                this.updateAuthUI();
            }
        } catch (error) {
            console.error('Error checking auth status:', error);
            localStorage.removeItem('currentUser');
        }
    }

    // Update authentication UI
    updateAuthUI() {
        const authNavItem = document.getElementById('auth-nav-item');
        const userNavProfile = document.getElementById('user-nav-profile');
        const authLink = authNavItem.querySelector('.nav-link');
        
        // Apply role-based CSS class to body
        if (this.currentUser) {
            document.body.className = `role-${this.currentUser.role}`;
        } else {
            document.body.className = '';
        }

        if (this.currentUser) {
            // User is logged in
            authLink.innerHTML = '<i class="fas fa-user"></i> Dashboard';
            authLink.setAttribute('data-page', 'dashboard');
            authLink.href = '#dashboard';
            
            // Show user profile in nav
            userNavProfile.style.display = 'block';
            this.updateNavUserProfile();
            
            // Update dashboard content
            this.updateDashboard();
            
            // Show/hide "Explore Engineers" button based on user role
            const exploreBtn = document.getElementById('explore-engineers-btn');
            if (exploreBtn) {
                if (this.currentUser.role === 'client') {
                    exploreBtn.style.display = 'inline-flex';
                } else {
                    exploreBtn.style.display = 'none';
                }
            }
        } else {
            // User is not logged in
            authLink.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
            authLink.setAttribute('data-page', 'login');
            authLink.href = '#login';
            
            // Hide user profile in nav
            userNavProfile.style.display = 'none';
            
            // Hide "Explore Engineers" button when not logged in
            const exploreBtn = document.getElementById('explore-engineers-btn');
            if (exploreBtn) {
                exploreBtn.style.display = 'none';
            }
        }
    }

    // Update dashboard content
    updateDashboard() {
        if (!this.currentUser) return;

        // Update user info
        document.getElementById('dashboard-username').textContent = `Welcome, ${this.currentUser.username}!`;
        document.getElementById('user-role').textContent = this.currentUser.role;
        document.getElementById('user-email').textContent = this.currentUser.email;

        // Update stats
        const totalPosts = this.data.content.posts.length;
        const totalUsers = this.data.users.length + (this.data.registeredUsers && this.data.registeredUsers.length ? this.data.registeredUsers.length : 0);

        document.getElementById('total-posts').textContent = totalPosts;
        document.getElementById('total-users').textContent = totalUsers;

        // Show appropriate dashboard based on user role
        if (this.currentUser.role === 'client') {
            this.showClientDashboard();
            // Show "Explore Engineers" button only for clients
            const exploreBtn = document.getElementById('explore-engineers-btn');
            if (exploreBtn) {
                exploreBtn.style.display = 'inline-flex';
            }
        } else if (this.currentUser.role === 'engineer') {
            this.showEngineerDashboard();
            // Hide "Explore Engineers" button for engineers
            const exploreBtn = document.getElementById('explore-engineers-btn');
            if (exploreBtn) {
                exploreBtn.style.display = 'none';
            }
        } else if (this.currentUser.role === 'admin') {
            this.showAdminDashboard();
            // Hide "Explore Engineers" button for admins
            const exploreBtn = document.getElementById('explore-engineers-btn');
            if (exploreBtn) {
                exploreBtn.style.display = 'none';
            }
        }
    }

    // Toggle role-specific fields in registration form
    toggleEngineerFields(role) {
        const engineerFields = document.getElementById('engineer-fields');
        const clientFields = document.getElementById('client-fields');
        
        if (role === 'engineer') {
            engineerFields.style.display = 'block';
            clientFields.style.display = 'none';
        } else if (role === 'client') {
            engineerFields.style.display = 'none';
            clientFields.style.display = 'block';
        } else {
            engineerFields.style.display = 'none';
            clientFields.style.display = 'none';
        }
    }

    // Show client dashboard
    showClientDashboard() {
        console.log('=== SHOW CLIENT DASHBOARD ===');
        
        // Hide engineer dashboard first
        const engineerDashboard = document.getElementById('engineer-dashboard');
        if (engineerDashboard) {
            engineerDashboard.style.display = 'none';
        }
        
        const clientDashboard = document.getElementById('client-dashboard');
        if (clientDashboard) {
            clientDashboard.style.display = 'block';
            console.log('Client dashboard displayed');
        }
        
        // Update user info in client dashboard
        this.updateClientDashboardInfo();
        
        // Load client projects
        this.loadClientProjects();
        
        // Reset workflow steps to initial state
        this.resetWorkflowSteps();
    }

    // Update client dashboard info
    updateClientDashboardInfo() {
        const clientName = document.getElementById('client-name');
        if (clientName && this.currentUser) {
            clientName.textContent = this.currentUser.username;
        }
    }

    // Reset workflow steps to initial state
    resetWorkflowSteps() {
        // Reset all steps to inactive
        for (let i = 1; i <= 4; i++) {
            this.updateWorkflowStep(i, '');
        }
        
        // Set step 1 as active
        this.updateWorkflowStep(1, 'active');
        
        // Reset project creation card to disabled state
        const createProjectCard = document.getElementById('create-project-card');
        const createProjectBtn = createProjectCard?.querySelector('button');
        
        if (createProjectCard && createProjectBtn) {
            createProjectCard.classList.add('disabled-action');
            createProjectBtn.disabled = true;
            createProjectBtn.classList.remove('btn-primary');
            createProjectBtn.classList.add('btn-secondary');
            
            // Add the "Complete Step 1 first" note if it doesn't exist
            if (!createProjectCard.querySelector('.action-note')) {
                const note = document.createElement('small');
                note.className = 'action-note';
                note.textContent = 'Complete Step 1 first';
                createProjectCard.querySelector('.action-content').appendChild(note);
            }
        }
    }

    // Show engineer dashboard
    showEngineerDashboard() {
        // Hide client dashboard first
        const clientDashboard = document.getElementById('client-dashboard');
        if (clientDashboard) {
            clientDashboard.style.display = 'none';
        }
        
        const engineerDashboard = document.getElementById('engineer-dashboard');
        engineerDashboard.style.display = 'block';
        
        // Show edit button for engineers
        const editBtn = document.getElementById('edit-profile-btn');
        if (editBtn) {
            editBtn.style.display = 'inline-flex';
            editBtn.innerHTML = '<i class="fas fa-edit"></i> Edit Profile';
        }
        
        // Hide client dashboard button for engineers
        const clientDashboardBtn = document.getElementById('show-client-dashboard-btn');
        if (clientDashboardBtn) {
            clientDashboardBtn.style.display = 'none';
        }
        
        // Update engineer profile information
        this.updateEngineerProfile();
        
        // Load initial data for tabs
        this.loadEngineerProjectRequests();
        this.loadEngineerAcceptedProjects();
    }

    // Hide engineer dashboard
    hideEngineerDashboard() {
        const engineerDashboard = document.getElementById('engineer-dashboard');
        engineerDashboard.style.display = 'none';
        
        // Hide edit profile button when engineer dashboard is hidden
        const editBtn = document.getElementById('edit-profile-btn');
        if (editBtn) {
            editBtn.style.display = 'none';
        }
    }

    
   

    // Update client profile
    updateClientProfile() {
        console.log('=== UPDATE CLIENT PROFILE DEBUG ===');
        console.log('Current user:', this.currentUser);
        console.log('Current user role:', this.currentUser?.role);
        
        if (!this.currentUser || this.currentUser.role !== 'client') {
            console.log('User is not a client, returning');
            return;
        }

        console.log('Updating client name...');
        const clientNameElement = document.getElementById('client-name');
        if (clientNameElement) {
            clientNameElement.textContent = this.currentUser.username;
            console.log('Client name updated to:', this.currentUser.username);
        } else {
            console.error('Client name element not found');
        }
        
        console.log('Updating dashboard user photo...');
        // Update dashboard user photo (clients don't have photos, so show default)
        this.updateDashboardUserPhoto();
        
        console.log('Loading client projects...');
        // Load client projects
        this.loadClientProjects();
        
        console.log('Client profile update completed');
    }

    // Load client projects
    loadClientProjects() {
        console.log('=== LOAD CLIENT PROJECTS DEBUG ===');
        console.log('Current user projects:', this.currentUser?.projects);
        
        const projectsList = document.getElementById('client-projects-list');
        console.log('Projects list element found:', !!projectsList);
        
        if (!this.currentUser.projects || this.currentUser.projects.length === 0) {
            console.log('No projects found, showing default message');
            if (projectsList) {
                projectsList.innerHTML = '<p class="text-muted">No projects created yet</p>';
            }
            return;
        }

        console.log('Creating project cards for', this.currentUser.projects.length, 'projects');
        const projectCards = this.currentUser.projects.map(project => this.createProjectCard(project)).join('');
        if (projectsList) {
            projectsList.innerHTML = projectCards;
            console.log('Project cards added to DOM');
        } else {
            console.error('Projects list element not found');
        }
    }



    // Create project card
    createProjectCard(project) {
        return `
            <div class="bg-white rounded-lg shadow-lg p-6 mb-4 border-l-4 border-blue-500">
                <div class="flex items-center justify-between mb-4">
                    <div>
                        <h4 class="text-xl font-semibold text-gray-800">${this.escapeHtml(project.projectName)}</h4>
                        <span class="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mt-1">
                            ${this.escapeHtml(project.projectType.replace('-', ' '))}
                        </span>
                    </div>
                    <span class="px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === 'active' ? 'bg-green-100 text-green-800' : 
                        project.status === 'completed' ? 'bg-gray-100 text-gray-800' : 
                        'bg-yellow-100 text-yellow-800'
                    }">
                        ${this.capitalizeFirst(project.status || 'open')}
                    </span>
                </div>
                
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    <div class="text-sm">
                        <span class="text-gray-600 font-medium">Building Size:</span>
                        <p class="text-gray-800">${project.buildingSize.toLocaleString()} sq ft</p>
                    </div>
                    ${project.lotSize ? `
                        <div class="text-sm">
                            <span class="text-gray-600 font-medium">Lot Size:</span>
                            <p class="text-gray-800">${project.lotSize.toLocaleString()} sq ft</p>
                        </div>
                    ` : ''}
                    <div class="text-sm">
                        <span class="text-gray-600 font-medium">Layout:</span>
                        <p class="text-gray-800">${project.floorsCount} floors${project.bedroomsCount ? `, ${project.bedroomsCount} bed` : ''}${project.bathroomsCount ? `, ${project.bathroomsCount} bath` : ''}</p>
                    </div>
                    <div class="text-sm">
                        <span class="text-gray-600 font-medium">Budget:</span>
                        <p class="text-gray-800">$${project.budget.toLocaleString()}</p>
                    </div>
                    <div class="text-sm">
                        <span class="text-gray-600 font-medium">Timeline:</span>
                        <p class="text-gray-800">${project.timeline}</p>
                    </div>
                    ${project.startDate ? `
                        <div class="text-sm">
                            <span class="text-gray-600 font-medium">Start Date:</span>
                            <p class="text-gray-800">${new Date(project.startDate).toLocaleDateString()}</p>
                        </div>
                    ` : ''}
                </div>
                
                ${project.specialFeatures && project.specialFeatures.length > 0 ? `
                    <div class="mb-4 p-3 bg-gray-50 rounded-lg">
                        <strong class="text-gray-700">Features:</strong> 
                        <span class="text-gray-600">${project.specialFeatures.map(f => f.replace('-', ' ')).join(', ')}</span>
                    </div>
                ` : ''}
                
                ${project.description ? `
                    <div class="mb-4 text-gray-600">
                        ${this.escapeHtml(project.description.substring(0, 150))}${project.description.length > 150 ? '...' : ''}
                    </div>
                ` : ''}
                
                <div class="flex flex-wrap gap-2">
                    <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors text-sm" onclick="viewProject(${project.id})">
                        <i class="fas fa-eye mr-2"></i>View Details
                    </button>
                    ${this.hasAcceptedProjectRequest(project.id) ? `
                        <button class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors text-sm" onclick="viewProjectStepsAsClient(${this.getProjectRequestId(project.id)})">
                            <i class="fas fa-tasks mr-2"></i>View Steps
                        </button>
                    ` : ''}
                    ${project.status === 'open' ? `
                    <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors text-sm" onclick="findEngineersForProject(${project.id})">
                        <i class="fas fa-users mr-2"></i>Find Engineers
                    </button>
                        <button class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors text-sm" onclick="editProject(${project.id})">
                            <i class="fas fa-edit mr-2"></i>Edit
                        </button>
                    ` : ''}
                </div>
            </div>
        `;
    }

    // Capitalize first letter
    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Check if project has an accepted project request
    hasAcceptedProjectRequest(projectId) {
        if (!this.data.projectRequests) return false;
        
        return this.data.projectRequests.some(request => 
            request.projectId === projectId && 
            request.clientId === this.currentUser.id && 
            request.status === 'accepted'
        );
    }

    // Get project request ID for a given project
    getProjectRequestId(projectId) {
        if (!this.data.projectRequests) return null;
        
        const request = this.data.projectRequests.find(r => 
            r.projectId === projectId && 
            r.clientId === this.currentUser.id && 
            r.status === 'accepted'
        );
        
        return request ? request.id : null;
    }

    // Load engineers list for client
    loadEngineersList(searchTerm = '') {
        const engineersList = document.getElementById('engineers-list');
        
        console.log('=== LOAD ENGINEERS LIST ===');
        console.log('Loading engineers list...');
        console.log('Current data:', this.data);
        console.log('Registered users:', this.data?.registeredUsers);
        console.log('Registered users length:', this.data?.registeredUsers?.length || 0);
        
        // Refresh data from localStorage to ensure we have latest
        this.refreshDataFromStorage();
        
        console.log('After refresh - Registered users:', this.data?.registeredUsers);
        console.log('After refresh - Length:', this.data?.registeredUsers?.length || 0);
        
        if (!this.data.registeredUsers || this.data.registeredUsers.length === 0) {
            console.log('No registered users found');
            engineersList.innerHTML = '<p class="text-muted">No engineers registered yet</p>';
            return;
        }

        // Filter engineers
        console.log('Filtering users for engineers...');
        const engineers = this.data.registeredUsers.filter(user => {
            console.log('Checking user:', user.username, 'Role:', user.role);
            if (user.role !== 'engineer') {
                console.log('Skipping non-engineer user:', user.username);
                return false;
            }
            
            if (searchTerm) {
                const searchLower = searchTerm.toLowerCase();
                const matches = (
                    user.username.toLowerCase().includes(searchLower) ||
                    (user.skills && user.skills.toLowerCase().includes(searchLower)) ||
                    (user.bio && user.bio.toLowerCase().includes(searchLower)) ||
                    (user.projects && user.projects.toLowerCase().includes(searchLower))
                );
                console.log('Search match for', user.username, ':', matches);
                return matches;
            }
            
            console.log('Including engineer:', user.username);
            return true;
        });

        console.log('Found engineers:', engineers);
        console.log('Engineers count:', engineers.length);

        if (engineers.length === 0) {
            engineersList.innerHTML = '<p class="text-muted">No engineers found</p>';
            return;
        }

        // Generate engineer cards
        const engineerCards = engineers.map(engineer => this.createEngineerCard(engineer)).join('');
        engineersList.innerHTML = engineerCards;
        
        console.log('Engineers list updated with', engineers.length, 'engineers');
    }

    // Refresh data from storage
    refreshDataFromStorage() {
        try {
            const savedData = localStorage.getItem('appData');
            if (savedData) {
                this.data = JSON.parse(savedData);
                console.log('Data refreshed from localStorage');
            }
        } catch (error) {
            console.error('Error refreshing data from storage:', error);
        }
    }

    // Create engineer card for client view
    createEngineerCard(engineer) {
        const skills = engineer.skills ? engineer.skills.split(',').map(s => s.trim()).slice(0, 5) : [];
        const photoHtml = this.getEngineerPhotoHtml(engineer);
        
        return `
            <div class="engineer-card">
                <div class="engineer-card-header">
                    <div class="engineer-card-photo">
                        ${photoHtml}
                    </div>
                    <div class="engineer-card-info">
                        <h5>${this.escapeHtml(engineer.username)}</h5>
                        <p>${engineer.experience || 0} years experience</p>
                    </div>
                </div>
                
                ${skills.length > 0 ? `
                    <div class="engineer-card-skills">
                        ${skills.map(skill => `<span class="skill-tag-small">${this.escapeHtml(skill)}</span>`).join('')}
                    </div>
                ` : ''}
                
                ${engineer.bio ? `
                    <p class="engineer-card-bio">${this.escapeHtml(engineer.bio.substring(0, 150))}${engineer.bio.length > 150 ? '...' : ''}</p>
                ` : ''}
                
                <div class="engineer-card-actions">
                    <button class="btn btn-primary btn-sm" onclick="viewEngineerProfile(${engineer.id})">
                        <i class="fas fa-eye"></i> View Profile
                    </button>
                    <button class="btn btn-secondary btn-sm" onclick="contactEngineer(${engineer.id})">
                        <i class="fas fa-envelope"></i> Contact
                    </button>
                    <button class="btn btn-info btn-sm" onclick="sendProjectRequest(${engineer.id})">
                        <i class="fas fa-paper-plane"></i> Send Request
                    </button>
                </div>
            </div>
        `;
    }

    // Get engineer photo HTML for card
    getEngineerPhotoHtml(engineer) {
        if (!engineer.photo) {
            return '<i class="fas fa-user"></i>';
        }

        // Try to get photo from persistent storage
        const persistentFiles = JSON.parse(localStorage.getItem('persistentFiles') || '[]');
        const fileName = engineer.photo.split('/').pop();
        const fileInfo = persistentFiles.find(file => file.fileName === fileName);
        
        if (fileInfo && fileInfo.data) {
            return `<img src="${fileInfo.data}" alt="${engineer.username}">`;
        }
        
        return '<i class="fas fa-user"></i>';
    }

    // Search engineers
    searchEngineers() {
        const searchInput = document.getElementById('engineer-search');
        const searchTerm = searchInput.value.trim();
        this.loadEngineersList(searchTerm);
    }

    // View engineer profile (for clients)
    viewEngineerProfile(engineerId) {
        const engineer = this.data.registeredUsers.find(u => u.id === engineerId);
        if (!engineer) {
            this.showError('Engineer not found');
            return;
        }

        // Create a modal to show engineer details
        this.showEngineerModal(engineer);
    }

    // Contact engineer
    contactEngineer(engineerId) {
        const engineer = this.data.registeredUsers.find(u => u.id === engineerId);
        if (!engineer) {
            this.showError('Engineer not found');
            return;
        }

        // For now, show a simple contact modal
        this.showContactModal(engineer);
    }

    // Edit client profile
    editClientProfile() {
        this.showSuccess('Client profile editing coming soon!');
    }

    // Show engineer details modal
    showEngineerModal(engineer) {
        const photoHtml = this.getEngineerPhotoHtml(engineer);
        const skills = engineer.skills ? engineer.skills.split(',').map(s => s.trim()) : [];
        
        const modalContent = `
            <div class="modal" style="display: flex;">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-user"></i> ${this.escapeHtml(engineer.username)}</h3>
                        <button class="modal-close" onclick="closeEngineerModal()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="engineer-profile-modal">
                            <div class="engineer-modal-header">
                                <div class="engineer-card-photo" style="width: 80px; height: 80px;">
                                    ${photoHtml}
                                </div>
                                <div class="engineer-modal-info">
                                    <h4>${this.escapeHtml(engineer.username)}</h4>
                                    <p><strong>Experience:</strong> ${engineer.experience || 0} years</p>
                                    <p><strong>Email:</strong> ${this.escapeHtml(engineer.email)}</p>
                                </div>
                            </div>
                            
                            ${skills.length > 0 ? `
                                <div class="modal-section">
                                    <h5>Skills & Technologies</h5>
                                    <div class="skills-tags">
                                        ${skills.map(skill => `<span class="skill-tag">${this.escapeHtml(skill)}</span>`).join('')}
                                    </div>
                                </div>
                            ` : ''}
                            
                            ${engineer.bio ? `
                                <div class="modal-section">
                                    <h5>About</h5>
                                    <p>${this.escapeHtml(engineer.bio)}</p>
                                </div>
                            ` : ''}
                            
                            ${engineer.projects ? `
                                <div class="modal-section">
                                    <h5>Recent Projects</h5>
                                    <p>${this.escapeHtml(engineer.projects)}</p>
                                </div>
                            ` : ''}
                            
                            ${engineer.cv ? `
                                <div class="modal-section">
                                    <h5>CV/Resume</h5>
                                    <button class="btn btn-primary" onclick="previewCV('${engineer.cv.path}')">
                                        <i class="fas fa-eye"></i> Preview CV
                                    </button>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" onclick="closeEngineerModal()">
                            <i class="fas fa-times"></i> Close
                        </button>
                        <button class="btn btn-primary" onclick="contactEngineer(${engineer.id})">
                            <i class="fas fa-envelope"></i> Contact
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Remove existing modal if any
        const existingModal = document.getElementById('engineer-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Add modal to page
        const modalDiv = document.createElement('div');
        modalDiv.id = 'engineer-modal';
        modalDiv.innerHTML = modalContent;
        document.body.appendChild(modalDiv);
    }

    // Show contact modal
    showContactModal(engineer) {
        const modalContent = `
            <div class="modal" style="display: flex;">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-envelope"></i> Contact ${this.escapeHtml(engineer.username)}</h3>
                        <button class="modal-close" onclick="closeContactModal()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="contact-info">
                            <p><strong>Email:</strong> <a href="mailto:${engineer.email}">${this.escapeHtml(engineer.email)}</a></p>
                            <p class="text-muted">Click the email above to send a message directly, or use your preferred email client.</p>
                            
                            <div class="contact-template" style="margin-top: var(--spacing-lg);">
                                <h5>Suggested Message Template:</h5>
                                <div style="background: var(--gray-50); padding: var(--spacing-md); border-radius: var(--radius-md); border: 1px solid var(--gray-200);">
                                    <p><strong>Subject:</strong> Project Opportunity from ${this.currentUser.company || this.currentUser.username}</p>
                                    <p><strong>Message:</strong></p>
                                    <p>Hi ${engineer.username},</p>
                                    <p>I found your profile on our platform and I'm interested in discussing a potential project opportunity.</p>
                                    ${this.currentUser.projectDescription ? `<p>Project details: ${this.currentUser.projectDescription}</p>` : ''}
                                    <p>Would you be available for a brief call to discuss this further?</p>
                                    <p>Best regards,<br>${this.currentUser.username}${this.currentUser.company ? `<br>${this.currentUser.company}` : ''}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" onclick="closeContactModal()">
                            <i class="fas fa-times"></i> Close
                        </button>
                        <a href="mailto:${engineer.email}?subject=Project Opportunity from ${encodeURIComponent(this.currentUser.company || this.currentUser.username)}" class="btn btn-primary">
                            <i class="fas fa-envelope"></i> Send Email
                        </a>
                    </div>
                </div>
            </div>
        `;
        
        // Remove existing modal if any
        const existingModal = document.getElementById('contact-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Add modal to page
        const modalDiv = document.createElement('div');
        modalDiv.id = 'contact-modal';
        modalDiv.innerHTML = modalContent;
        document.body.appendChild(modalDiv);
    }

    // Close engineer modal
    closeEngineerModal() {
        const modal = document.getElementById('engineer-modal');
        if (modal) {
            modal.remove();
        }
    }

    // Close contact modal
    closeContactModal() {
        const modal = document.getElementById('contact-modal');
        if (modal) {
            modal.remove();
        }
    }

    // Project management functions
    openProjectForm() {
        console.log('=== OPEN PROJECT FORM DEBUG ===');
        console.log('Current user:', this.currentUser);
        console.log('Current user role:', this.currentUser?.role);
        
        const modal = document.getElementById('project-form-modal');
        console.log('Project form modal element found:', !!modal);
        
        if (modal) {
            modal.style.display = 'flex';
            console.log('Project form modal displayed');
        } else {
            console.error('Project form modal element not found');
        }
    }

    closeProjectForm() {
        const modal = document.getElementById('project-form-modal');
        modal.style.display = 'none';
        // Reset form
        document.getElementById('building-project-form').reset();
    }

    // Submit new project with engineer selection
    submitProject() {
        const form = document.getElementById('building-project-form');
        const formData = new FormData(form);
        const projectData = Object.fromEntries(formData.entries());

        // Validate form
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Validate engineer selection
        const selectedEngineerId = document.getElementById('selected-engineer-id');
        if (!selectedEngineerId || !selectedEngineerId.value) {
            this.showError('Please select an engineer for your project');
            return;
        }

        // Handle checkbox arrays
        const exteriorMaterials = Array.from(form.querySelectorAll('input[name="exteriorMaterials"]:checked'))
            .map(cb => cb.value);
        const specialFeatures = Array.from(form.querySelectorAll('input[name="specialFeatures"]:checked'))
            .map(cb => cb.value);
        const accessibilityFeatures = Array.from(form.querySelectorAll('input[name="accessibilityFeatures"]:checked'))
            .map(cb => cb.value);

        // Create project object
        const project = {
            id: Date.now(),
            ...projectData,
            clientId: this.currentUser.id,
            createdAt: new Date().toISOString(),
            status: 'pending', // Changed to pending since engineer needs to accept
            assignedEngineer: selectedEngineerId.value, // Set the selected engineer
            // Convert numeric fields
            buildingSize: parseInt(projectData.buildingSize) || 0,
            lotSize: parseInt(projectData.lotSize) || 0,
            floorsCount: parseInt(projectData.floorsCount) || 1,
            bedroomsCount: parseInt(projectData.bedroomsCount) || 0,
            bathroomsCount: parseInt(projectData.bathroomsCount) || 0,
            parkingSpaces: parseInt(projectData.parkingSpaces) || 0,
            budget: parseInt(projectData.budget) || 0,
            // Arrays from checkboxes
            exteriorMaterials: exteriorMaterials,
            specialFeatures: specialFeatures,
            accessibilityFeatures: accessibilityFeatures
        };

        // Add to user's projects
        if (!this.currentUser.projects) {
            this.currentUser.projects = [];
        }
        this.currentUser.projects.push(project);

        // Create project request for the selected engineer
        this.createProjectRequest(project, selectedEngineerId.value);

        // Update user data in storage
        this.updateUserInStorage();

        // Refresh UI
        this.loadClientProjects();
        this.closeProjectForm();
        
        // Update workflow step
        this.updateWorkflowStep(4, 'completed');
        
        this.showSuccess('Building project created and request sent to engineer successfully!');
    }

    // Create project request for engineer
    createProjectRequest(project, engineerId) {
        console.log('=== CREATE PROJECT REQUEST ===');
        console.log('Project:', project);
        console.log('Engineer ID:', engineerId);
        console.log('Engineer ID type:', typeof engineerId);
        
        // Get engineer data
        const engineer = this.data.registeredUsers.find(user => user.id == engineerId); // Use == for type coercion
        console.log('Found engineer:', engineer);
        if (!engineer) {
            this.showError('Selected engineer not found');
            return;
        }
        
        // Create project request
        const projectRequest = {
            id: Date.now() + Math.random(),
            projectId: project.id,
            projectName: project.projectName,
            projectType: project.projectType,
            clientId: this.currentUser.id,
            clientName: this.currentUser.username,
            clientEmail: this.currentUser.email,
            engineerId: engineerId,
            engineerName: engineer.username,
            engineerEmail: engineer.email,
            status: 'pending',
            createdAt: new Date().toISOString(),
            message: `New project request: ${project.projectName}`,
            projectDetails: {
                buildingSize: project.buildingSize,
                budget: project.budget,
                timeline: project.timeline,
                description: project.description
            }
        };
        
        console.log('Created project request:', projectRequest);
        console.log('Project request engineerId:', projectRequest.engineerId, 'Type:', typeof projectRequest.engineerId);
        
        // Add to project requests
        if (!this.data.projectRequests) {
            this.data.projectRequests = [];
        }
        this.data.projectRequests.push(projectRequest);
        
        // Save to storage
        this.saveDataToJSON();
        
        console.log('Project request created:', projectRequest);
        console.log('Total project requests now:', this.data.projectRequests.length);
        console.log('Data saved to localStorage:', !!localStorage.getItem('appData'));
    }

    // Start engineer exploration workflow
    startEngineerExploration() {
        console.log('=== START ENGINEER EXPLORATION ===');
        
        // Update workflow step
        this.updateWorkflowStep(1, 'active');
        
        // Show engineers section
        this.browseEngineers();
        
        // Enable project creation after engineer exploration
        this.enableProjectCreation();
    }

    // Browse engineers section
    browseEngineers() {
        console.log('=== BROWSE ENGINEERS DEBUG ===');
        console.log('Current user:', this.currentUser);
        console.log('Current user role:', this.currentUser?.role);
        
        const engineersSection = document.getElementById('engineers-browser');
        console.log('Engineers section element found:', !!engineersSection);
        
        if (engineersSection) {
            engineersSection.style.display = 'block';
            console.log('Engineers section displayed');
        } else {
            console.error('Engineers section element not found');
            return;
        }
        
        // Debug: Show current data state
        console.log('=== DEBUG: Browse Engineers ===');
        console.log('Total registered users:', this.data?.registeredUsers?.length || 0);
        console.log('All users:', this.data?.registeredUsers);
        
        this.loadEngineersList();
        
        // Scroll to engineers section
        engineersSection.scrollIntoView({ behavior: 'smooth' });
        console.log('Scrolled to engineers section');
    }

    // Browse engineers from project form
    browseEngineersFromForm() {
        console.log('=== BROWSE ENGINEERS FROM FORM ===');
        
        // Close project form temporarily
        this.closeProjectForm();
        
        // Show engineers section
        this.browseEngineers();
        
        // Show message to user
        this.showInfo('Please select an engineer from the list below, then return to create your project.');
    }

    // Enable project creation after engineer exploration
    enableProjectCreation() {
        const createProjectCard = document.getElementById('create-project-card');
        const createProjectBtn = createProjectCard?.querySelector('button');
        
        if (createProjectCard && createProjectBtn) {
            createProjectCard.classList.remove('disabled-action');
            createProjectBtn.disabled = false;
            createProjectBtn.classList.remove('btn-secondary');
            createProjectBtn.classList.add('btn-primary');
            
            // Remove the "Complete Step 1 first" note
            const note = createProjectCard.querySelector('.action-note');
            if (note) {
                note.remove();
            }
            
            // Update step 1 as completed and step 2 as active
            this.updateWorkflowStep(1, 'completed');
            this.updateWorkflowStep(2, 'active');
        }
    }

    // Update workflow step status
    updateWorkflowStep(stepNumber, status) {
        const step = document.getElementById(`step-${stepNumber}`);
        if (step) {
            // Remove all status classes
            step.classList.remove('active', 'completed');
            
            // Add new status class
            if (status) {
                step.classList.add(status);
            }
        }
    }

    // Change engineer selection
    changeEngineerSelection() {
        console.log('=== CHANGE ENGINEER SELECTION ===');
        
        // Clear current selection
        this.clearEngineerSelection();
        
        // Show engineers browser
        this.browseEngineers();
        
        // Show message
        this.showInfo('Please select a new engineer from the list below.');
    }

    // Clear engineer selection
    clearEngineerSelection() {
        const selectedEngineerDisplay = document.getElementById('selected-engineer-display');
        const noEngineerSelected = document.getElementById('no-engineer-selected');
        const selectedEngineerId = document.getElementById('selected-engineer-id');
        
        if (selectedEngineerDisplay) selectedEngineerDisplay.style.display = 'none';
        if (noEngineerSelected) noEngineerSelected.style.display = 'block';
        if (selectedEngineerId) selectedEngineerId.value = '';
        
        // Clear stored selection
        this.selectedEngineer = null;
    }

    hideEngineersSection() {
        const engineersSection = document.getElementById('engineers-browser');
        engineersSection.style.display = 'none';
    }

    // Project actions
    viewProject(projectId) {
        const project = this.currentUser.projects.find(p => p.id === projectId);
        if (!project) {
            this.showError('Project not found');
            return;
        }
        
        this.showProjectDetailsModal(project);
    }

    findEngineersForProject(projectId) {
        const project = this.currentUser.projects.find(p => p.id === projectId);
        if (!project) {
            this.showError('Project not found');
            return;
        }
        
        // Store selected project for engineer selection
        this.selectedProject = project;
        this.browseEngineers();
    }

    editProject(projectId) {
        this.showSuccess('Project editing coming soon!');
    }

    // Show project details modal
    showProjectDetailsModal(project) {
        const modalContent = `
            <div class="modal" style="display: flex;">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3><i class="fas fa-building"></i> ${this.escapeHtml(project.projectName)}</h3>
                        <button class="modal-close" onclick="closeProjectDetailsModal()">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="project-details-modal">
                            <div class="project-overview">
                                <div class="project-type-badge">
                                    <span class="project-card-type">${this.escapeHtml(project.projectType.replace('-', ' '))}</span>
                                    <span class="project-status ${project.status}">${this.capitalizeFirst(project.status)}</span>
                                </div>
                                
                                <div class="project-specs">
                                    <div class="spec-grid">
                                        <div class="spec-item">
                                            <strong>Building Size:</strong> ${project.buildingSize.toLocaleString()} sq ft
                                        </div>
                                        ${project.lotSize ? `
                                            <div class="spec-item">
                                                <strong>Lot Size:</strong> ${project.lotSize.toLocaleString()} sq ft
                                            </div>
                                        ` : ''}
                                        <div class="spec-item">
                                            <strong>Floors:</strong> ${project.floorsCount}
                                        </div>
                                        ${project.bedroomsCount ? `
                                            <div class="spec-item">
                                                <strong>Bedrooms:</strong> ${project.bedroomsCount}
                                            </div>
                                        ` : ''}
                                        ${project.bathroomsCount ? `
                                            <div class="spec-item">
                                                <strong>Bathrooms:</strong> ${project.bathroomsCount}
                                            </div>
                                        ` : ''}
                                        ${project.parkingSpaces ? `
                                            <div class="spec-item">
                                                <strong>Parking:</strong> ${project.parkingSpaces} spaces
                                            </div>
                                        ` : ''}
                                        <div class="spec-item">
                                            <strong>Budget:</strong> $${project.budget.toLocaleString()}
                                        </div>
                                        <div class="spec-item">
                                            <strong>Timeline:</strong> ${project.timeline}
                                        </div>
                                        ${project.startDate ? `
                                            <div class="spec-item">
                                                <strong>Start Date:</strong> ${new Date(project.startDate).toLocaleDateString()}
                                            </div>
                                        ` : ''}
                                        <div class="spec-item">
                                            <strong>Contact:</strong> ${project.contactPreference}
                                        </div>
                                    </div>
                                    
                                    ${project.foundationType || project.structuralSystem ? `
                                        <div class="construction-details">
                                            <h5>Construction Details:</h5>
                                            ${project.foundationType ? `<p><strong>Foundation:</strong> ${project.foundationType.replace('-', ' ')}</p>` : ''}
                                            ${project.structuralSystem ? `<p><strong>Structure:</strong> ${project.structuralSystem.replace('-', ' ')}</p>` : ''}
                                        </div>
                                    ` : ''}
                                    
                                    ${project.exteriorMaterials && project.exteriorMaterials.length > 0 ? `
                                        <div class="materials-section">
                                            <h5>Exterior Materials:</h5>
                                            <div class="materials-tags">
                                                ${project.exteriorMaterials.map(material => 
                                                    `<span class="material-tag">${material.replace('-', ' ')}</span>`
                                                ).join('')}
                                            </div>
                                        </div>
                                    ` : ''}
                                    
                                    ${project.specialFeatures && project.specialFeatures.length > 0 ? `
                                        <div class="features-section">
                                            <h5>Special Features:</h5>
                                            <div class="features-tags">
                                                ${project.specialFeatures.map(feature => 
                                                    `<span class="feature-tag">${feature.replace('-', ' ')}</span>`
                                                ).join('')}
                                            </div>
                                        </div>
                                    ` : ''}
                                    
                                    ${project.accessibilityFeatures && project.accessibilityFeatures.length > 0 ? `
                                        <div class="accessibility-section">
                                            <h5>Accessibility Features:</h5>
                                            <div class="accessibility-tags">
                                                ${project.accessibilityFeatures.map(feature => 
                                                    `<span class="accessibility-tag">${feature.replace('-', ' ')}</span>`
                                                ).join('')}
                                            </div>
                                        </div>
                                    ` : ''}
                                </div>
                                
                                <div class="project-address">
                                    <h5>Project Address:</h5>
                                    <p>${this.escapeHtml(project.address)}</p>
                                </div>
                                
                                ${project.description ? `
                                    <div class="project-description">
                                        <h5>Project Description:</h5>
                                        <p>${this.escapeHtml(project.description)}</p>
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" onclick="closeProjectDetailsModal()">
                            <i class="fas fa-times"></i> Close
                        </button>
                        <button class="btn btn-primary" onclick="findEngineersForProject(${project.id})">
                            <i class="fas fa-users"></i> Find Engineers
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        // Remove existing modal if any
        const existingModal = document.getElementById('project-details-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Add modal to page
        const modalDiv = document.createElement('div');
        modalDiv.id = 'project-details-modal';
        modalDiv.innerHTML = modalContent;
        document.body.appendChild(modalDiv);
    }

    closeProjectDetailsModal() {
        const modal = document.getElementById('project-details-modal');
        if (modal) {
            modal.remove();
        }
    }

    // Update user in storage
    updateUserInStorage() {
        // Update in registeredUsers array
        const userIndex = this.data.registeredUsers.findIndex(u => u.id === this.currentUser.id);
        if (userIndex !== -1) {
            this.data.registeredUsers[userIndex] = this.currentUser;
        }
        
        // Update localStorage
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        this.saveDataToJSON();
    }

    // Debug function to check data
    debugData() {
        console.log('=== DATA DEBUG ===');
        console.log('Current user:', this.currentUser);
        console.log('App data:', this.data);
        console.log('Registered users:', this.data?.registeredUsers);
        console.log('LocalStorage appData:', localStorage.getItem('appData'));
        console.log('LocalStorage registeredUsers:', localStorage.getItem('registeredUsers'));
        console.log('LocalStorage currentUser:', localStorage.getItem('currentUser'));
        
        // Try to fix data if needed
        this.refreshDataFromStorage();
        console.log('After refresh - Registered users:', this.data?.registeredUsers);
        
        const engineers = this.data?.registeredUsers?.filter(u => u.role === 'engineer') || [];
        console.log('Engineers found:', engineers.length);
        engineers.forEach(eng => console.log('Engineer:', eng.username, eng.role));
        
        // Show detailed info
        this.showSuccess(`Debug: Found ${engineers.length} engineers. Check console for details.`);
        
        // If no engineers found, try to recover from backup
        if (engineers.length === 0) {
            console.log('No engineers found, trying to recover from backup...');
            const backupUsers = localStorage.getItem('registeredUsers');
            if (backupUsers) {
                try {
                    const parsedBackup = JSON.parse(backupUsers);
                    const backupEngineers = parsedBackup.filter(u => u.role === 'engineer');
                    console.log('Backup engineers found:', backupEngineers.length);
                    if (backupEngineers.length > 0) {
                        this.data.registeredUsers = parsedBackup;
                        this.saveDataToJSON();
                        this.showSuccess(`Recovered ${backupEngineers.length} engineers from backup!`);
                    }
                } catch (error) {
                    console.error('Error parsing backup:', error);
                }
            }
        }
    }

    // Add test engineers for debugging
    addTestEngineers() {
        if (!this.data.registeredUsers) {
            this.data.registeredUsers = [];
        }
        
        const testEngineers = [
            {
                id: Date.now() + 1,
                username: "John Engineer",
                email: "john@engineer.com",
                password: "test123",
                role: "engineer",
                experience: 5,
                skills: ["Structural Engineering", "AutoCAD", "Project Management"],
                bio: "Experienced structural engineer with 5 years in residential and commercial projects.",
                projects: "Residential complexes, Office buildings, Shopping centers",
                photo: null,
                cv: null,
                createdAt: new Date().toISOString()
            },
            {
                id: Date.now() + 2,
                username: "Sarah Architect",
                email: "sarah@architect.com",
                password: "test123",
                role: "engineer",
                experience: 8,
                skills: ["Architecture Design", "3D Modeling", "Sustainable Design"],
                bio: "Creative architect specializing in sustainable and modern building designs.",
                projects: "Eco-friendly homes, Modern offices, Cultural centers",
                photo: null,
                cv: null,
                createdAt: new Date().toISOString()
            }
        ];
        
        // Add test engineers
        testEngineers.forEach(engineer => {
            const exists = this.data.registeredUsers.some(u => u.email === engineer.email);
            if (!exists) {
                this.data.registeredUsers.push(engineer);
                console.log('Added test engineer:', engineer.username);
            } else {
                console.log('Test engineer already exists:', engineer.username);
            }
        });
        
        // Save to storage
        this.saveDataToJSON();
        
        console.log('Test engineers added:', testEngineers);
        console.log('Total registered users now:', this.data.registeredUsers.length);
        this.showSuccess(`Test engineers added! Total users: ${this.data.registeredUsers.length}. Check Browse Engineers.`);
    }

    // Clear all data and start fresh
    clearAllData() {
        if (confirm('Are you sure you want to clear all data? This will remove all registered users.')) {
            localStorage.removeItem('appData');
            localStorage.removeItem('registeredUsers');
            localStorage.removeItem('currentUser');
            localStorage.removeItem('savedFiles');
            localStorage.removeItem('persistentFiles');
            
            // Reset data
            this.data = this.getEmbeddedData();
            this.currentUser = null;
            
            // Save fresh data
            this.saveDataToJSON();
            
            console.log('All data cleared and reset');
            this.showSuccess('All data cleared! Refresh the page to start fresh.');
        }
    }

    // Project Request System - New Workflow
    sendProjectRequest(engineerId) {
        if (!this.currentUser || this.currentUser.role !== 'client') {
            this.showError('Only clients can send project requests');
            return;
        }

        console.log('=== SEND PROJECT REQUEST ===');
        console.log('Engineer ID:', engineerId);

        // Store selected engineer for project creation
        this.selectedEngineer = engineerId;
        
        // Update workflow step
        this.updateWorkflowStep(2, 'completed');
        this.updateWorkflowStep(3, 'active');
        
        // Show project creation form with engineer pre-selected
        this.openProjectFormWithEngineer(engineerId);
    }

    // Open project form with pre-selected engineer
    openProjectFormWithEngineer(engineerId) {
        console.log('=== OPEN PROJECT FORM WITH ENGINEER ===');
        console.log('Engineer ID:', engineerId);
        
        // Get engineer data
        const engineer = this.data.registeredUsers.find(user => user.id === engineerId);
        if (!engineer) {
            this.showError('Engineer not found');
            return;
        }

        // Open project form
        this.openProjectForm();
        
        // Pre-select the engineer in the form
        setTimeout(() => {
            this.selectEngineerInForm(engineer);
        }, 100);
    }

    // Select engineer in the project form
    selectEngineerInForm(engineer) {
        console.log('=== SELECT ENGINEER IN FORM ===');
        console.log('Engineer:', engineer);
        
        const selectedEngineerDisplay = document.getElementById('selected-engineer-display');
        const noEngineerSelected = document.getElementById('no-engineer-selected');
        const selectedEngineerId = document.getElementById('selected-engineer-id');
        const selectedEngineerName = document.getElementById('selected-engineer-name');
        const selectedEngineerExperience = document.getElementById('selected-engineer-experience');
        const selectedEngineerSkills = document.getElementById('selected-engineer-skills');
        const selectedEngineerPhoto = document.getElementById('selected-engineer-photo');
        const selectedEngineerPhotoDefault = document.getElementById('selected-engineer-photo-default');
        
        if (selectedEngineerDisplay && noEngineerSelected && selectedEngineerId) {
            // Hide "no engineer selected" message
            noEngineerSelected.style.display = 'none';
            
            // Show selected engineer display
            selectedEngineerDisplay.style.display = 'block';
            
            // Set engineer ID
            selectedEngineerId.value = engineer.id;
            
            // Update engineer details
            if (selectedEngineerName) selectedEngineerName.textContent = engineer.username;
            if (selectedEngineerExperience) selectedEngineerExperience.textContent = `Experience: ${engineer.experience || 0} years`;
            if (selectedEngineerSkills) selectedEngineerSkills.textContent = `Skills: ${engineer.skills || 'Not specified'}`;
            
            // Update engineer photo
            if (engineer.photo && engineer.photo !== '') {
                if (selectedEngineerPhoto) {
                    selectedEngineerPhoto.src = engineer.photo;
                    selectedEngineerPhoto.style.display = 'block';
                }
                if (selectedEngineerPhotoDefault) {
                    selectedEngineerPhotoDefault.style.display = 'none';
                }
            } else {
                if (selectedEngineerPhoto) {
                    selectedEngineerPhoto.style.display = 'none';
                }
                if (selectedEngineerPhotoDefault) {
                    selectedEngineerPhotoDefault.style.display = 'flex';
                }
            }
            
            // Update workflow step
            this.updateWorkflowStep(3, 'completed');
            this.updateWorkflowStep(4, 'active');
            
            console.log('Engineer selected in form successfully');
        }
    }

    showProjectSelectionModal(engineerId) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'block';
        
        const clientProjects = this.currentUser.projects || [];
        const projectOptions = clientProjects.map(project => 
            `<option value="${project.id}">${project.projectName} - ${project.projectType}</option>`
        ).join('');

        modal.innerHTML = `
            <div class="modal-content" style="max-width: 500px;">
                <div class="modal-header">
                    <h3><i class="fas fa-paper-plane"></i> Send Project Request</h3>
                    <button class="modal-close" onclick="this.closest('.modal').remove()">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="project-request-form">
                        <div class="form-group">
                            <label for="project-select">Select Project:</label>
                            <select id="project-select" required>
                                <option value="">Choose a project...</option>
                                ${projectOptions}
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="request-message">Message to Engineer:</label>
                            <textarea id="request-message" rows="4" placeholder="Describe why you want this engineer for your project..." required></textarea>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="this.closest('.modal').remove()">
                        <i class="fas fa-times"></i> Cancel
                    </button>
                    <button class="btn btn-primary" onclick="submitProjectRequest(${engineerId})">
                        <i class="fas fa-paper-plane"></i> Send Request
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    submitProjectRequest(engineerId) {
        const projectSelect = document.getElementById('project-select');
        const messageInput = document.getElementById('request-message');
        
        if (!projectSelect.value || !messageInput.value.trim()) {
            this.showError('Please select a project and write a message');
            return;
        }

        const projectId = projectSelect.value;
        const message = messageInput.value.trim();
        
        // Find the project
        const project = this.currentUser.projects.find(p => p.id == projectId);
        if (!project) {
            this.showError('Project not found');
            return;
        }

        // Find the engineer
        const engineer = this.data.registeredUsers.find(u => u.id == engineerId && u.role === 'engineer');
        if (!engineer) {
            this.showError('Engineer not found');
            return;
        }

        // Create request object
        const request = {
            id: Date.now(),
            projectId: projectId,
            projectName: project.projectName,
            projectType: project.projectType,
            clientId: this.currentUser.id,
            clientName: this.currentUser.username,
            clientEmail: this.currentUser.email,
            engineerId: engineerId,
            engineerName: engineer.username,
            message: message,
            status: 'pending',
            createdAt: new Date().toISOString()
        };

        // Initialize projectRequests array if it doesn't exist
        if (!this.data.projectRequests) {
            this.data.projectRequests = [];
        }

        // Add request to data
        this.data.projectRequests.push(request);
        
        // Save to storage
        this.saveDataToJSON();
        
        // Close modal
        document.querySelector('.modal').remove();
        
        this.showSuccess(`Project request sent to ${engineer.username}!`);
        
        // Update UI if on requests page
        if (this.currentUser.role === 'client') {
            this.loadClientProjectRequests();
        }
    }

    // Load client project requests
    loadClientProjectRequests() {
        console.log('=== LOAD CLIENT PROJECT REQUESTS DEBUG ===');
        console.log('Current user:', this.currentUser);
        console.log('Current user ID:', this.currentUser?.id);
        console.log('Project requests data:', this.data?.projectRequests);
        
        const requestsList = document.getElementById('requests-list');
        console.log('Requests list element found:', !!requestsList);
        
        if (!requestsList) {
            console.error('Requests list element not found');
            return;
        }

        const clientRequests = this.data.projectRequests?.filter(r => r.clientId === this.currentUser.id) || [];
        console.log('Client requests found:', clientRequests.length);
        console.log('Client requests:', clientRequests);
        
        if (clientRequests.length === 0) {
            console.log('No client requests found, showing default message');
            requestsList.innerHTML = '<p class="text-muted">No project requests found</p>';
            return;
        }

        console.log('Creating request items for', clientRequests.length, 'requests');
        const requestsHtml = clientRequests.map(request => {
            const statusClass = `request-status ${request.status}`;
            const statusText = request.status.charAt(0).toUpperCase() + request.status.slice(1);
            
            return `
                <div class="request-item">
                    <div class="request-header">
                        <div class="request-info">
                            <div class="request-title">${this.escapeHtml(request.projectName)}</div>
                            <div class="request-client">Engineer: ${this.escapeHtml(request.engineerName)}</div>
                            <div class="request-date">Sent: ${new Date(request.createdAt).toLocaleDateString()}</div>
                        </div>
                        <div class="request-actions">
                            <span class="${statusClass}">${statusText}</span>
                        </div>
                    </div>
                    <div class="request-details">
                        <strong>Message:</strong> ${this.escapeHtml(request.message)}
                    </div>
                </div>
            `;
        }).join('');

        requestsList.innerHTML = requestsHtml;
        console.log('Request items added to DOM');
    }

    // Load engineer project requests
    loadEngineerProjectRequests() {
        console.log('=== LOAD ENGINEER PROJECT REQUESTS DEBUG ===');
        console.log('Current user:', this.currentUser);
        console.log('Current user ID:', this.currentUser?.id);
        console.log('Current user ID type:', typeof this.currentUser?.id);
        
        // Check localStorage data
        const localStorageData = localStorage.getItem('appData');
        console.log('LocalStorage appData exists:', !!localStorageData);
        if (localStorageData) {
            const parsedData = JSON.parse(localStorageData);
            console.log('LocalStorage projectRequests:', parsedData?.projectRequests?.length || 0);
        }
        
        console.log('Current data projectRequests:', this.data?.projectRequests?.length || 0);
        console.log('All project requests:', this.data?.projectRequests);
        
        const requestsList = document.getElementById('engineer-requests-list');
        if (!requestsList) {
            console.error('Engineer requests list element not found');
            return;
        }
        console.log( "engineerRequests111", this.data);

        // Filter requests for this engineer
        const engineerRequests = this.data.projectRequests?.filter(r => {

            return r.engineerId == this.currentUser.id; // Use == for type coercion
        }) || [];
        
        console.log('Engineer requests found:', engineerRequests.length);
        console.log('Engineer requests:', engineerRequests);
        
        if (engineerRequests.length === 0) {
            requestsList.innerHTML = '<p class="text-muted">No project requests received</p>';
            return;
        }

        const requestsHtml = engineerRequests.map(request => {
            const statusClass = `request-status ${request.status}`;
            const statusText = request.status.charAt(0).toUpperCase() + request.status.slice(1);
            
            let actionButtons = '';
            if (request.status === 'pending') {
                actionButtons = `
                    <button class="btn btn-success btn-sm" onclick="acceptProjectRequest(${request.id})">
                        <i class="fas fa-check"></i> Accept
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="rejectProjectRequest(${request.id})">
                        <i class="fas fa-times"></i> Reject
                    </button>
                `;
            }
            
            return `
                <div class="request-item">
                    <div class="request-header">
                        <div class="request-info">
                            <div class="request-title">${this.escapeHtml(request.projectName)}</div>
                            <div class="request-client">Client: ${this.escapeHtml(request.clientName)}</div>
                            <div class="request-date">Received: ${new Date(request.createdAt).toLocaleDateString()}</div>
                        </div>
                        <div class="request-actions">
                            <span class="${statusClass}">${statusText}</span>
                            ${actionButtons}
                        </div>
                    </div>
                    <div class="request-details">
                        <strong>Message:</strong> ${this.escapeHtml(request.message)}
                    </div>
                </div>
            `;
        }).join('');

        requestsList.innerHTML = requestsHtml;
        
        // Update badge
        const badge = document.getElementById('requests-badge');
        if (badge) {
            const pendingCount = engineerRequests.filter(r => r.status === 'pending').length;
            if (pendingCount > 0) {
                badge.textContent = pendingCount;
                badge.style.display = 'block';
            } else {
                badge.style.display = 'none';
            }
        }
    }

    // Load engineer accepted projects
    loadEngineerAcceptedProjects() {
        console.log('=== LOAD ENGINEER ACCEPTED PROJECTS DEBUG ===');
        console.log('Current user:', this.currentUser);
        console.log('Current user ID:', this.currentUser?.id);
        console.log('All project requests:', this.data?.projectRequests);
        
        const projectsList = document.getElementById('accepted-projects-list');
        if (!projectsList) {
            console.error('Accepted projects list element not found');
            return;
        }

        const acceptedRequests = this.data.projectRequests?.filter(r => {
            console.log('Checking request for accepted projects:', r);
            console.log('Request engineerId:', r.engineerId, 'Type:', typeof r.engineerId);
            console.log('Current user ID:', this.currentUser.id, 'Type:', typeof this.currentUser.id);
            console.log('Request status:', r.status);
            console.log('Is accepted:', r.engineerId == this.currentUser.id && r.status === 'accepted');
            return r.engineerId == this.currentUser.id && r.status === 'accepted';
        }) || [];
        
        console.log('Accepted requests found:', acceptedRequests.length);
        console.log('Accepted requests:', acceptedRequests);
        
        if (acceptedRequests.length === 0) {
            projectsList.innerHTML = '<p class="text-muted">No projects accepted yet</p>';
            return;
        }

        const projectsHtml = acceptedRequests.map(request => {
            return `
                <div class="project-item">
                    <div class="project-header">
                        <div class="project-info">
                            <div class="project-title">${this.escapeHtml(request.projectName)}</div>
                            <div class="project-client">Client: ${this.escapeHtml(request.clientName)}</div>
                            <div class="project-date">Accepted: ${new Date(request.createdAt).toLocaleDateString()}</div>
                        </div>
                        <div class="project-actions">
                            <button class="btn btn-primary btn-sm" onclick="viewProjectSteps(${request.id})">
                                <i class="fas fa-tasks"></i> Manage Steps
                            </button>
                        </div>
                    </div>
                    <div class="project-details">
                        <strong>Project Type:</strong> ${this.escapeHtml(request.projectType)}<br>
                        <strong>Client Message:</strong> ${this.escapeHtml(request.message)}
                    </div>
                </div>
            `;
        }).join('');

        projectsList.innerHTML = projectsHtml;
    }

    // Accept project request
    acceptProjectRequest(requestId) {
        console.log('=== ACCEPT PROJECT REQUEST DEBUG ===');
        console.log('Request ID:', requestId);
        console.log('All project requests:', this.data?.projectRequests);
        
        const request = this.data.projectRequests.find(r => r.id == requestId);
        console.log('Found request:', request);
        
        if (!request) {
            this.showError('Request not found');
            return;
        }

        console.log('Request before acceptance:', request);
        request.status = 'accepted';
        request.acceptedAt = new Date().toISOString();
        console.log('Request after acceptance:', request);
        
        // Save to storage
        this.saveDataToJSON();
        console.log('Data saved to storage');
        
        this.showSuccess('Project request accepted!');
        
        // Update UI
        console.log('Updating UI - loading project requests and accepted projects');
        this.loadEngineerProjectRequests();
        this.loadEngineerAcceptedProjects();
    }

    // Reject project request
    rejectProjectRequest(requestId) {
        const request = this.data.projectRequests.find(r => r.id == requestId);
        if (!request) {
            this.showError('Request not found');
            return;
        }

        request.status = 'rejected';
        request.rejectedAt = new Date().toISOString();
        
        // Save to storage
        this.saveDataToJSON();
        
        this.showSuccess('Project request rejected');
        
        // Update UI
        this.loadEngineerProjectRequests();
    }

    // Switch engineer dashboard tabs
    switchEngineerTab(tabName) {
        // Hide all enhanced tabs
        document.querySelectorAll('.tab-content-enhanced').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Remove active class from all enhanced tab buttons
        document.querySelectorAll('.tab-btn-enhanced').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Show selected tab
        const selectedTab = document.getElementById(`${tabName}-tab`);
        if (selectedTab) {
            selectedTab.classList.add('active');
        }
        
        // Add active class to selected tab button
        const selectedBtn = document.querySelector(`[data-tab="${tabName}"]`);
        if (selectedBtn) {
            selectedBtn.classList.add('active');
        }
        
        // Load appropriate data
        if (tabName === 'requests') {
            this.loadEngineerProjectRequests();
        } else if (tabName === 'accepted-projects') {
            this.loadEngineerAcceptedProjects();
        }
    }

    // Project Steps Management
    viewProjectSteps(requestId) {
        console.log('=== VIEW PROJECT STEPS ===');
        console.log('Request ID:', requestId);
        
        const request = this.data.projectRequests.find(r => r.id == requestId);
        if (!request) {
            this.showError('Project request not found');
            return;
        }
        
        console.log('Found request:', request);
        
        // Store current project for steps management
        this.currentProjectRequest = request;
        
        // Initialize project steps if not exists
        if (!request.projectSteps) {
            request.projectSteps = [];
        }
        
        // Show modal
        const modal = document.getElementById('project-steps-modal');
        if (modal) {
            modal.style.display = 'flex';
            
            // Update project info
            document.getElementById('project-steps-title').textContent = `Project: ${request.projectName}`;
            document.getElementById('project-steps-client').textContent = `Client: ${request.clientName}`;
            
            // Load steps
            this.loadProjectSteps();
        }
    }
    
    loadProjectSteps() {
        const stepsList = document.getElementById('project-steps-list');
        if (!stepsList || !this.currentProjectRequest) return;
        
        const steps = this.currentProjectRequest.projectSteps || [];
        
        if (steps.length === 0) {
            stepsList.innerHTML = '<p class="text-muted text-center">No steps added yet. Click "Add Step" to get started.</p>';
            return;
        }
        
        const stepsHtml = steps.map((step, index) => {
            return this.createStepHTML(step, index + 1);
        }).join('');
        
        stepsList.innerHTML = stepsHtml;
    }
    
    createStepHTML(step, stepNumber) {
        const isEditing = step.isEditing || false;
        
        return `
            <div class="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm" data-step-id="${step.id}">
                <div class="bg-slate-50 px-6 py-4 border-b border-slate-200">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <div class="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-semibold text-sm">
                                ${stepNumber}
                            </div>
                            <div>
                                <h6 class="font-semibold text-slate-900">${this.escapeHtml(step.title || 'Untitled Step')}</h6>
                                ${!isEditing && step.timeline ? `<p class="text-sm text-slate-600">${step.timeline} days • ${this.escapeHtml(step.cost || 'N/A')}</p>` : ''}
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            ${!isEditing ? `
                                <button onclick="editProjectStep('${step.id}')" 
                                        class="px-3 py-1.5 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors duration-200 flex items-center gap-1">
                                    <i class="fas fa-edit"></i> Edit
                                </button>
                                <button onclick="deleteProjectStep('${step.id}')" 
                                        class="px-3 py-1.5 text-sm bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors duration-200 flex items-center gap-1">
                                    <i class="fas fa-trash"></i> Delete
                                </button>
                            ` : `
                                <button onclick="saveProjectStep('${step.id}')" 
                                        class="px-3 py-1.5 text-sm bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-1">
                                    <i class="fas fa-save"></i> Save
                                </button>
                                <button onclick="cancelEditStep('${step.id}')" 
                                        class="px-3 py-1.5 text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors duration-200 flex items-center gap-1">
                                    <i class="fas fa-times"></i> Cancel
                                </button>
                            `}
                        </div>
                    </div>
                </div>
                
                <div class="p-6">
                    ${isEditing ? this.createStepFormHTML(step) : this.createStepDisplayHTML(step)}
                </div>
            </div>
        `;
    }
    
    createStepFormHTML(step) {
        return `
            <div class="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
                <!-- Step Title -->
                <div>
                    <label for="step-title-${step.id}" class="block text-sm font-semibold text-slate-700 mb-2">
                        Step Title <span class="text-red-500">*</span>
                    </label>
                    <input type="text" 
                           id="step-title-${step.id}" 
                           value="${this.escapeHtml(step.title || '')}" 
                           placeholder="e.g., Foundation Preparation"
                           class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                </div>
                
                <!-- Step Description -->
                <div>
                    <label for="step-description-${step.id}" class="block text-sm font-semibold text-slate-700 mb-2">
                        Step Description <span class="text-red-500">*</span>
                    </label>
                    <textarea id="step-description-${step.id}" 
                              placeholder="Detailed description of this step..."
                              rows="4"
                              class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none">${this.escapeHtml(step.description || '')}</textarea>
                </div>
                
                <!-- Timeline and Cost Row -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label for="step-timeline-${step.id}" class="block text-sm font-semibold text-slate-700 mb-2">
                            Timeline (days) <span class="text-red-500">*</span>
                        </label>
                        <input type="number" 
                               id="step-timeline-${step.id}" 
                               value="${step.timeline || ''}" 
                               placeholder="e.g., 5" 
                               min="1"
                               class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                    </div>
                    
                    <div>
                        <label for="step-cost-${step.id}" class="block text-sm font-semibold text-slate-700 mb-2">
                            Estimated Cost <span class="text-red-500">*</span>
                        </label>
                        <input type="text" 
                               id="step-cost-${step.id}" 
                               value="${this.escapeHtml(step.cost || '')}" 
                               placeholder="e.g., $2,500"
                               class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200">
                    </div>
                </div>
                
                <!-- Tools & Materials -->
                <div>
                    <label for="step-tools-${step.id}" class="block text-sm font-semibold text-slate-700 mb-2">
                        Tools & Materials
                    </label>
                    <textarea id="step-tools-${step.id}" 
                              placeholder="List all tools and materials needed..."
                              rows="3"
                              class="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none">${this.escapeHtml(step.tools || '')}</textarea>
                </div>
                
                <!-- Image Upload Section -->
                <div>
                    <label class="block text-sm font-semibold text-slate-700 mb-2">
                        Step Images
                    </label>
                    <div class="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 cursor-pointer"
                         onclick="document.getElementById('step-images-${step.id}').click()">
                        <div class="flex flex-col items-center gap-3">
                            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <i class="fas fa-cloud-upload-alt text-blue-600 text-xl"></i>
                            </div>
                            <div>
                                <p class="text-slate-600 font-medium">Click to upload images</p>
                                <p class="text-slate-500 text-sm">or drag & drop files here</p>
                            </div>
                        </div>
                    </div>
                    <input type="file" 
                           id="step-images-${step.id}" 
                           multiple 
                           accept="image/*" 
                           style="display: none;" 
                           onchange="handleStepImageUpload('${step.id}', this)">
                    
                    <div class="mt-4" id="uploaded-images-${step.id}">
                        ${this.createStepImagesHTML(step.images || [])}
                    </div>
                </div>
            </div>
        `;
    }
    
    createStepDisplayHTML(step) {
        return `
            <div class="bg-white border border-slate-200 rounded-xl p-6">
                <div class="flex items-start justify-between mb-4">
                    <h6 class="text-xl font-semibold text-slate-900">${this.escapeHtml(step.title || 'Untitled Step')}</h6>
                </div>
                
                <div class="mb-6">
                    <p class="text-slate-700 leading-relaxed">${this.escapeHtml(step.description || 'No description provided')}</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div class="bg-slate-50 rounded-lg p-4">
                        <div class="flex items-center gap-2 mb-1">
                            <i class="fas fa-clock text-blue-600"></i>
                            <span class="text-sm font-medium text-slate-600">Timeline</span>
                        </div>
                        <p class="text-lg font-semibold text-slate-900">${step.timeline || 'N/A'} days</p>
                    </div>
                    
                    <div class="bg-slate-50 rounded-lg p-4">
                        <div class="flex items-center gap-2 mb-1">
                            <i class="fas fa-dollar-sign text-green-600"></i>
                            <span class="text-sm font-medium text-slate-600">Estimated Cost</span>
                        </div>
                        <p class="text-lg font-semibold text-slate-900">${this.escapeHtml(step.cost || 'N/A')}</p>
                    </div>
                </div>
                
                ${step.tools ? `
                    <div class="mb-6">
                        <div class="flex items-center gap-2 mb-3">
                            <i class="fas fa-tools text-purple-600"></i>
                            <span class="text-sm font-medium text-slate-600">Tools & Materials</span>
                        </div>
                        <div class="bg-slate-50 rounded-lg p-4">
                            <p class="text-slate-700">${this.escapeHtml(step.tools)}</p>
                        </div>
                    </div>
                ` : ''}
                
                ${step.images && step.images.length > 0 ? `
                    <div>
                        <div class="flex items-center gap-2 mb-3">
                            <i class="fas fa-images text-orange-600"></i>
                            <span class="text-sm font-medium text-slate-600">Step Images</span>
                        </div>
                        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                            ${step.images.map(image => `
                                <div class="relative group">
                                    <img src="${image}" 
                                         alt="Step image" 
                                         class="w-full h-32 object-cover rounded-lg border border-slate-200">
                                    <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center">
                                        <button onclick="window.open('${image}', '_blank')" 
                                                class="opacity-0 group-hover:opacity-100 bg-white bg-opacity-90 hover:bg-opacity-100 text-slate-700 px-3 py-1 rounded-lg transition-all duration-200">
                                            <i class="fas fa-expand mr-1"></i> View
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }
    
    createStepImagesHTML(images) {
        if (!images || images.length === 0) return '';
        
        return `
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                ${images.map((image, index) => `
                    <div class="relative group">
                        <img src="${image}" 
                             alt="Step image" 
                             class="w-full h-24 object-cover rounded-lg border border-slate-200">
                        <button class="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs transition-colors duration-200"
                                onclick="removeStepImage('${image}')"
                                title="Remove image">
                            <i class="fas fa-times"></i>
                        </button>
                        <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center">
                            <button onclick="window.open('${image}', '_blank')" 
                                    class="opacity-0 group-hover:opacity-100 bg-white bg-opacity-90 hover:bg-opacity-100 text-slate-700 px-2 py-1 rounded text-xs transition-all duration-200">
                                <i class="fas fa-expand"></i>
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    addProjectStep() {
        if (!this.currentProjectRequest) return;
        
        const newStep = {
            id: Date.now() + Math.random(),
            title: '',
            description: '',
            timeline: '',
            cost: '',
            tools: '',
            images: [],
            isEditing: true,
            createdAt: new Date().toISOString()
        };
        
        if (!this.currentProjectRequest.projectSteps) {
            this.currentProjectRequest.projectSteps = [];
        }
        
        this.currentProjectRequest.projectSteps.push(newStep);
        this.loadProjectSteps();
        
        // Scroll to the new step
        setTimeout(() => {
            const newStepElement = document.querySelector(`[data-step-id="${newStep.id}"]`);
            if (newStepElement) {
                newStepElement.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    }
    
    editProjectStep(stepId) {
        if (!this.currentProjectRequest) return;
        
        const step = this.currentProjectRequest.projectSteps.find(s => s.id == stepId);
        if (step) {
            step.isEditing = true;
            this.loadProjectSteps();
        }
    }
    
    saveProjectStep(stepId) {
        if (!this.currentProjectRequest) return;
        
        const step = this.currentProjectRequest.projectSteps.find(s => s.id == stepId);
        if (!step) return;
        
        // Get form values
        const title = document.getElementById(`step-title-${stepId}`)?.value?.trim();
        const description = document.getElementById(`step-description-${stepId}`)?.value?.trim();
        const timeline = document.getElementById(`step-timeline-${stepId}`)?.value?.trim();
        const cost = document.getElementById(`step-cost-${stepId}`)?.value?.trim();
        const tools = document.getElementById(`step-tools-${stepId}`)?.value?.trim();
        
        // Validate required fields
        if (!title || !description || !timeline || !cost) {
            this.showError('Please fill in all required fields (Title, Description, Timeline, Cost)');
            return;
        }
        
        // Update step
        step.title = title;
        step.description = description;
        step.timeline = timeline;
        step.cost = cost;
        step.tools = tools;
        step.isEditing = false;
        step.updatedAt = new Date().toISOString();
        
        this.loadProjectSteps();
        this.showSuccess('Step saved successfully!');
    }
    
    cancelEditStep(stepId) {
        if (!this.currentProjectRequest) return;
        
        const step = this.currentProjectRequest.projectSteps.find(s => s.id == stepId);
        if (step) {
            // If it's a new step (no title), remove it
            if (!step.title) {
                this.deleteProjectStep(stepId);
            } else {
                step.isEditing = false;
                this.loadProjectSteps();
            }
        }
    }
    
    deleteProjectStep(stepId) {
        if (!this.currentProjectRequest) return;
        
        if (confirm('Are you sure you want to delete this step?')) {
            this.currentProjectRequest.projectSteps = this.currentProjectRequest.projectSteps.filter(s => s.id != stepId);
            this.loadProjectSteps();
            this.showSuccess('Step deleted successfully!');
        }
    }
    
    closeProjectStepsModal() {
        const modal = document.getElementById('project-steps-modal');
        if (modal) {
            modal.style.display = 'none';
        }
        this.currentProjectRequest = null;
    }
    
    saveProjectSteps() {
        if (!this.currentProjectRequest) return;
        
        // Save any pending edits
        const editingSteps = this.currentProjectRequest.projectSteps.filter(s => s.isEditing);
        if (editingSteps.length > 0) {
            this.showError('Please save or cancel all editing steps before saving the project');
            return;
        }
        
        // Save to storage
        this.saveDataToJSON();
        this.showSuccess('Project steps saved successfully!');
    }
    
    handleStepImageUpload(stepId, input) {
        if (!this.currentProjectRequest) return;
        
        const step = this.currentProjectRequest.projectSteps.find(s => s.id == stepId);
        if (!step) return;
        
        const files = input.files;
        if (!files || files.length === 0) return;
        
        // Initialize images array if not exists
        if (!step.images) {
            step.images = [];
        }
        
        // Process each file
        Array.from(files).forEach(file => {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    step.images.push(e.target.result);
                    this.updateStepImagesDisplay(stepId);
                };
                reader.readAsDataURL(file);
            }
        });
        
        // Clear the input
        input.value = '';
    }
    
    updateStepImagesDisplay(stepId) {
        const step = this.currentProjectRequest.projectSteps.find(s => s.id == stepId);
        if (!step) return;
        
        const imagesContainer = document.getElementById(`uploaded-images-${stepId}`);
        if (imagesContainer) {
            imagesContainer.innerHTML = this.createStepImagesHTML(step.images || []);
        }
    }
    
    removeStepImage(imageUrl) {
        if (!this.currentProjectRequest) return;
        
        // Find the step that contains this image
        const step = this.currentProjectRequest.projectSteps.find(s => 
            s.images && s.images.includes(imageUrl)
        );
        
        if (step) {
            step.images = step.images.filter(img => img !== imageUrl);
            this.updateStepImagesDisplay(step.id);
        }
    }

    // Client Project Steps View
    viewProjectStepsAsClient(requestId) {
        console.log('=== VIEW PROJECT STEPS AS CLIENT ===');
        console.log('Request ID:', requestId);
        
        const request = this.data.projectRequests.find(r => r.id == requestId);
        if (!request) {
            this.showError('Project request not found');
            return;
        }
        
        console.log('Found request:', request);
        
        // Store current project for viewing
        this.currentClientProjectRequest = request;
        
        // Show modal
        const modal = document.getElementById('client-project-steps-modal');
        if (modal) {
            modal.style.display = 'flex';
            
            // Update project info
            document.getElementById('client-project-steps-title').textContent = `Project: ${request.projectName}`;
            document.getElementById('client-project-steps-engineer').textContent = `Engineer: ${request.engineerName}`;
            
            // Load steps
            this.loadClientProjectSteps();
        }
    }
    
    loadClientProjectSteps() {
        const stepsList = document.getElementById('client-project-steps-list');
        if (!stepsList || !this.currentClientProjectRequest) return;
        
        const steps = this.currentClientProjectRequest.projectSteps || [];
        
        if (steps.length === 0) {
            stepsList.innerHTML = '<p class="text-muted text-center">No steps have been created by the engineer yet.</p>';
            return;
        }
        
        const stepsHtml = steps.map((step, index) => {
            return this.createClientStepHTML(step, index + 1);
        }).join('');
        
        stepsList.innerHTML = stepsHtml;
    }
    
    createClientStepHTML(step, stepNumber) {
        return `
            <div class="step-item" data-step-id="${step.id}">
                <div class="step-header">
                    <div class="step-number">${stepNumber}</div>
                    <div class="step-actions">
                        <span class="text-muted text-sm">
                            <i class="fas fa-eye"></i> View Only
                        </span>
                    </div>
                </div>
                
                <div class="step-display active">
                    <h6>${this.escapeHtml(step.title || 'Untitled Step')}</h6>
                    
                    <div class="step-description">
                        ${this.escapeHtml(step.description || 'No description provided')}
                    </div>
                    
                    <div class="step-details">
                        <div class="step-detail-item">
                            <div class="step-detail-label">Timeline</div>
                            <div class="step-detail-value">${step.timeline || 'N/A'} days</div>
                        </div>
                        <div class="step-detail-item">
                            <div class="step-detail-label">Estimated Cost</div>
                            <div class="step-detail-value">${this.escapeHtml(step.cost || 'N/A')}</div>
                        </div>
                    </div>
                    
                    ${step.tools ? `
                        <div class="step-detail-item">
                            <div class="step-detail-label">Tools & Materials</div>
                            <div class="step-detail-value">${this.escapeHtml(step.tools)}</div>
                        </div>
                    ` : ''}
                    
                    ${step.images && step.images.length > 0 ? `
                        <div class="step-images-display">
                            ${step.images.map(image => `
                                <div class="image-preview">
                                    <img src="${image}" alt="Step image" onclick="openImageModal('${image}')" style="cursor: pointer;">
                                </div>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }
    
    closeClientProjectStepsModal() {
        const modal = document.getElementById('client-project-steps-modal');
        if (modal) {
            modal.style.display = 'none';
        }
        this.currentClientProjectRequest = null;
    }

    // Admin Dashboard
    showAdminDashboard() {
        console.log('=== SHOW ADMIN DASHBOARD ===');
        
        // Hide other dashboards
        const clientDashboard = document.getElementById('client-dashboard');
        const engineerDashboard = document.getElementById('engineer-dashboard');
        
        if (clientDashboard) clientDashboard.style.display = 'none';
        if (engineerDashboard) engineerDashboard.style.display = 'none';
        
        // Show admin dashboard
        const adminDashboard = document.getElementById('admin-dashboard');
        if (adminDashboard) {
            adminDashboard.style.display = 'block';
            
            // Load admin data
            this.loadAdminOverview();
            this.loadUsersTable();
            this.loadRejectedProjects();
            
            // Initialize search functionality
            this.initializeAdminSearch();
        }
    }
    
    loadAdminOverview() {
        console.log('=== LOAD ADMIN OVERVIEW ===');
        
        // Count engineers
        const engineers = this.data.registeredUsers?.filter(u => u.role === 'engineer') || [];
        const totalEngineers = engineers.length;
        
        // Count accepted projects
        const acceptedProjects = this.data.projectRequests?.filter(r => r.status === 'accepted') || [];
        const totalProjects = acceptedProjects.length;
        
        // Count active projects (projects with steps)
        const activeProjects = acceptedProjects.filter(p => p.projectSteps && p.projectSteps.length > 0).length;
        
        // Update overview cards
        const totalEngineersEl = document.getElementById('total-engineers');
        const totalProjectsEl = document.getElementById('total-projects');
        const activeProjectsEl = document.getElementById('active-projects');
        
        if (totalEngineersEl) totalEngineersEl.textContent = totalEngineers;
        if (totalProjectsEl) totalProjectsEl.textContent = totalProjects;
        if (activeProjectsEl) activeProjectsEl.textContent = activeProjects;
        
        console.log('Overview updated:', { totalEngineers, totalProjects, activeProjects });
    }
    
    loadAdminEngineersTable() {
        console.log('=== LOAD ADMIN ENGINEERS TABLE ===');
        
        const tableBody = document.getElementById('admin-engineers-table');
        if (!tableBody) return;
        
        const engineers = this.data.registeredUsers?.filter(u => u.role === 'engineer') || [];
        const acceptedProjects = this.data.projectRequests?.filter(r => r.status === 'accepted') || [];
        
        if (engineers.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="6" class="px-6 py-12 text-center">
                        <div class="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-2xl mb-4">
                            <i class="fas fa-users text-slate-400 text-2xl"></i>
                        </div>
                        <p class="text-slate-600 text-lg">No engineers found</p>
                    </td>
                </tr>
            `;
            return;
        }
        
        const tableRows = engineers.map(engineer => {
            // Get projects for this engineer
            const engineerProjects = acceptedProjects.filter(p => p.engineerId == engineer.id);
            const projectCount = engineerProjects.length;
            
            // Get project statuses
            const projectStatuses = engineerProjects.map(p => p.status).join(', ');
            const primaryStatus = projectStatuses || 'No projects';
            
            // Count total steps
            const totalSteps = engineerProjects.reduce((sum, project) => {
                return sum + (project.projectSteps ? project.projectSteps.length : 0);
            }, 0);
            
            // Get skills - ensure it's an array
            const skills = Array.isArray(engineer.skills) ? engineer.skills : [];
            const skillsHtml = skills.length > 0 
                ? skills.map(skill => `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-1 mb-1">${this.escapeHtml(skill)}</span>`).join('')
                : '<span class="text-slate-500 text-sm">No skills listed</span>';
            
            return `
                <tr onclick="selectEngineerRow('${engineer.id}')" data-engineer-id="${engineer.id}" class="hover:bg-slate-50 cursor-pointer transition-colors duration-150">
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                            <div class="flex-shrink-0 h-10 w-10">
                                ${engineer.photo ? 
                                    `<img src="${engineer.photo}" alt="${this.escapeHtml(engineer.username)}" class="h-10 w-10 rounded-full object-cover">` :
                                    `<div class="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">${engineer.username.charAt(0).toUpperCase()}</div>`
                                }
                            </div>
                            <div class="ml-4">
                                <div class="text-sm font-medium text-slate-900">${this.escapeHtml(engineer.username)}</div>
                                <div class="text-sm text-slate-500">${this.escapeHtml(engineer.email)}</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">${engineer.experience || 0} years</td>
                    <td class="px-6 py-4 text-sm text-slate-900">
                        <div class="flex flex-wrap">${skillsHtml}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">${projectCount}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${projectCount > 0 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                            ${projectCount > 0 ? 'Active' : 'Pending'}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">${totalSteps}</td>
                </tr>
            `;
        }).join('');
        
        tableBody.innerHTML = tableRows;
        console.log('Engineers table loaded with', engineers.length, 'engineers');
    }
    
    selectEngineerRow(engineerId) {
        console.log('=== SELECT ENGINEER ROW ===', engineerId);
        
        // Remove previous selection
        document.querySelectorAll('.admin-table tbody tr').forEach(row => {
            row.classList.remove('selected');
        });
        
        // Add selection to clicked row
        const selectedRow = document.querySelector(`[data-engineer-id="${engineerId}"]`);
        if (selectedRow) {
            selectedRow.classList.add('selected');
        }
        
        // Load engineer project details
        this.loadEngineerProjectDetails(engineerId);
    }
    
    loadEngineerProjectDetails(engineerId) {
        console.log('=== LOAD ENGINEER PROJECT DETAILS ===', engineerId);
        
        const detailsContainer = document.getElementById('admin-project-details');
        if (!detailsContainer) return;
        
        const engineer = this.data.registeredUsers?.find(u => u.id == engineerId);
        if (!engineer) {
            detailsContainer.innerHTML = '<p class="text-slate-500 text-center py-8">Engineer not found</p>';
            return;
        }
        
        const acceptedProjects = this.data.projectRequests?.filter(r => 
            r.engineerId == engineerId && r.status === 'accepted'
        ) || [];
        
        if (acceptedProjects.length === 0) {
            detailsContainer.innerHTML = `
                <div class="text-center py-12">
                    <div class="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-2xl mb-4">
                        <i class="fas fa-folder-open text-slate-400 text-2xl"></i>
                    </div>
                    <h5 class="text-slate-600 text-lg font-semibold mb-2">No Accepted Projects</h5>
                    <p class="text-slate-500">This engineer hasn't accepted any projects yet.</p>
                </div>
            `;
            return;
        }
        
        const projectsHtml = acceptedProjects.map(project => {
            const steps = project.projectSteps || [];
            const stepsHtml = steps.length > 0 
                ? steps.map((step, index) => `
                    <div class="flex items-center p-3 bg-slate-50 rounded-lg mb-2">
                        <div class="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-3">
                            ${index + 1}
                        </div>
                        <div class="text-slate-900 font-medium">${this.escapeHtml(step.title || 'Untitled Step')}</div>
                    </div>
                `).join('')
                : '<p class="text-slate-500 text-center py-4">No steps created yet</p>';
            
            return `
                <div class="bg-white border border-slate-200 rounded-xl p-6 mb-6 shadow-sm">
                    <div class="flex items-start justify-between mb-4">
                        <h6 class="text-lg font-semibold text-slate-900">${this.escapeHtml(project.projectName)}</h6>
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            ${steps.length} steps
                        </span>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <p class="text-sm text-slate-600"><span class="font-medium">Client:</span> ${this.escapeHtml(project.clientName)}</p>
                        </div>
                        <div>
                            <p class="text-sm text-slate-600"><span class="font-medium">Type:</span> ${this.escapeHtml(project.projectType)}</p>
                        </div>
                        <div>
                            <p class="text-sm text-slate-600"><span class="font-medium">Accepted:</span> ${new Date(project.acceptedAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                    
                    ${steps.length > 0 ? `
                        <div class="mt-4">
                            <h6 class="text-sm font-semibold text-slate-700 mb-3">Project Steps:</h6>
                            <div class="space-y-2">
                                ${stepsHtml}
                            </div>
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');
        
        detailsContainer.innerHTML = `
            <div class="mb-6">
                <h5 class="text-xl font-bold text-slate-900 flex items-center mb-2">
                    <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                        <i class="fas fa-user text-white text-sm"></i>
                    </div>
                    ${this.escapeHtml(engineer.username)}'s Projects
                </h5>
                <p class="text-slate-600">${acceptedProjects.length} accepted project${acceptedProjects.length !== 1 ? 's' : ''}</p>
            </div>
            ${projectsHtml}
        `;
    }

    // Admin Search Functionality
    initializeAdminSearch() {
        console.log('=== INITIALIZE ADMIN SEARCH ===');
        
        const searchInput = document.getElementById('admin-search-input');
        const clearBtn = document.getElementById('clear-search-btn');
        const resultsCount = document.getElementById('search-results-count');
        
        if (!searchInput || !clearBtn || !resultsCount) {
            console.log('Search elements not found');
            return;
        }
        
        // Store original engineers data for filtering
        this.originalEngineersData = null;
        
        // Add event listeners
        searchInput.addEventListener('input', (e) => {
            this.handleAdminSearch(e.target.value);
        });
        
        clearBtn.addEventListener('click', () => {
            this.clearAdminSearch();
        });
        
        // Hide clear button initially
        clearBtn.classList.add('hidden');
        
        console.log('Admin search initialized');
    }
    
    handleAdminSearch(searchTerm) {
        console.log('=== HANDLE ADMIN SEARCH ===', searchTerm);
        
        const clearBtn = document.getElementById('clear-search-btn');
        const resultsCount = document.getElementById('search-results-count');
        
        if (!searchTerm || searchTerm.trim() === '') {
            this.clearAdminSearch();
            return;
        }
        
        // Show clear button
        clearBtn.classList.remove('hidden');
        
        // Store original data if not already stored
        if (!this.originalEngineersData) {
            this.originalEngineersData = this.data.registeredUsers?.filter(u => u.role === 'engineer') || [];
        }
        
        // Filter engineers by name (case-insensitive)
        const filteredEngineers = this.originalEngineersData.filter(engineer => {
            const name = engineer.username.toLowerCase();
            const search = searchTerm.toLowerCase().trim();
            return name.includes(search);
        });
        
        console.log('Filtered engineers:', filteredEngineers.length);
        
        // Update results count
        if (resultsCount) {
            resultsCount.textContent = `Showing ${filteredEngineers.length} of ${this.originalEngineersData.length} engineers`;
        }
        
        // Re-render table with filtered data
        this.renderFilteredEngineersTable(filteredEngineers, searchTerm);
    }
    
    renderFilteredEngineersTable(engineers, searchTerm) {
        console.log('=== RENDER FILTERED ENGINEERS TABLE ===', engineers.length);
        
        const tableBody = document.getElementById('admin-engineers-table');
        if (!tableBody) return;
        
        if (engineers.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="6" class="px-6 py-12 text-center">
                        <div class="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-2xl mb-4">
                            <i class="fas fa-search text-slate-400 text-2xl"></i>
                        </div>
                        <p class="text-slate-600 text-lg">No engineers found matching "${this.escapeHtml(searchTerm)}"</p>
                    </td>
                </tr>
            `;
            return;
        }
        
        // Generate table rows for filtered engineers
        const rowsHtml = engineers.map(engineer => {
            const engineerProjects = this.data.projectRequests?.filter(r => 
                r.engineerId == engineer.id && r.status === 'accepted'
            ) || [];
            
            const totalSteps = engineerProjects.reduce((sum, project) => {
                return sum + (project.projectSteps ? project.projectSteps.length : 0);
            }, 0);
            
            // Get skills - ensure it's an array
            const skills = Array.isArray(engineer.skills) ? engineer.skills : [];
            const skillsHtml = skills.length > 0 
                ? skills.map(skill => `<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-1 mb-1">${this.escapeHtml(skill)}</span>`).join('')
                : '<span class="text-slate-500 text-sm">No skills listed</span>';
            
            // Highlight search term in engineer name
            const highlightedName = this.highlightSearchTerm(engineer.username, searchTerm);
            
            return `
                <tr onclick="selectEngineerRow('${engineer.id}')" data-engineer-id="${engineer.id}" class="hover:bg-slate-50 cursor-pointer transition-colors duration-150">
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                            <div class="flex-shrink-0 h-10 w-10">
                                ${engineer.photo ? 
                                    `<img src="${engineer.photo}" alt="${this.escapeHtml(engineer.username)}" class="h-10 w-10 rounded-full object-cover">` :
                                    `<div class="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">${engineer.username.charAt(0).toUpperCase()}</div>`
                                }
                            </div>
                            <div class="ml-4">
                                <div class="text-sm font-medium text-slate-900">${highlightedName}</div>
                                <div class="text-sm text-slate-500">${this.escapeHtml(engineer.email)}</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">${engineer.experience || 0} years</td>
                    <td class="px-6 py-4 text-sm text-slate-900">
                        <div class="flex flex-wrap">${skillsHtml}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">${engineerProjects.length}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${engineerProjects.length > 0 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                            ${engineerProjects.length > 0 ? 'Active' : 'Pending'}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-900">${totalSteps}</td>
                </tr>
            `;
        }).join('');
        
        tableBody.innerHTML = rowsHtml;
    }
    
    highlightSearchTerm(text, searchTerm) {
        if (!searchTerm || searchTerm.trim() === '') {
            return this.escapeHtml(text);
        }
        
        const regex = new RegExp(`(${this.escapeRegex(searchTerm)})`, 'gi');
        const escapedText = this.escapeHtml(text);
        return escapedText.replace(regex, '<span class="bg-yellow-200 text-yellow-900 px-1 py-0.5 rounded font-semibold">$1</span>');
    }
    
    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    clearAdminSearch() {
        console.log('=== CLEAR ADMIN SEARCH ===');
        
        const searchInput = document.getElementById('admin-search-input');
        const clearBtn = document.getElementById('clear-search-btn');
        const resultsCount = document.getElementById('search-results-count');
        
        if (searchInput) {
            searchInput.value = '';
        }
        
        if (clearBtn) {
            clearBtn.classList.add('hidden');
        }
        
        if (resultsCount) {
            resultsCount.textContent = 'Showing all engineers';
        }
        
        // Restore original table
        this.loadAdminEngineersTable();
        
        // Clear stored data
        this.originalEngineersData = null;
    }

    // Rejected Projects Management
    loadRejectedProjects() {
        console.log('=== LOAD REJECTED PROJECTS ===');
        
        const rejectedProjectsList = document.getElementById('rejected-projects-list');
        if (!rejectedProjectsList) return;
        
        // Get all project requests that were rejected
        const rejectedProjects = this.data.projectRequests.filter(request => 
            request.status === 'rejected'
        );
        
        console.log('Found rejected projects:', rejectedProjects);
        
        if (rejectedProjects.length === 0) {
            rejectedProjectsList.innerHTML = `
                <div class="text-center py-12">
                    <div class="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-2xl mb-4">
                        <i class="fas fa-inbox text-red-400 text-2xl"></i>
                    </div>
                    <p class="text-slate-600 text-lg">No rejected projects found</p>
                </div>
            `;
            return;
        }
        
        // Display rejected projects
        rejectedProjectsList.innerHTML = rejectedProjects.map(project => `
            <div class="bg-red-50 border border-red-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300">
                <div class="flex items-start justify-between">
                    <div class="flex-1">
                        <div class="flex items-center gap-3 mb-3">
                            <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                <i class="fas fa-exclamation-triangle text-red-600"></i>
                            </div>
                            <div>
                                <h4 class="text-lg font-semibold text-slate-900">${this.escapeHtml(project.projectName)}</h4>
                                <p class="text-slate-600 text-sm">Client: ${this.escapeHtml(project.clientName)}</p>
                            </div>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <p class="text-sm text-slate-600"><strong>Type:</strong> ${this.escapeHtml(project.projectType)}</p>
                                <p class="text-sm text-slate-600"><strong>Budget:</strong> $${project.budget?.toLocaleString() || 'Not specified'}</p>
                            </div>
                            <div>
                                <p class="text-sm text-slate-600"><strong>Timeline:</strong> ${this.escapeHtml(project.timeline || 'Not specified')}</p>
                                <p class="text-sm text-red-600"><strong>Rejected by:</strong> ${this.escapeHtml(project.engineerName || 'Unknown')}</p>
                            </div>
                        </div>
                        
                        <p class="text-sm text-slate-600 mb-4">
                            <strong>Description:</strong> ${this.escapeHtml(project.message || 'No description provided')}
                        </p>
                    </div>
                    
                    <div class="flex flex-col gap-2 ml-4">
                        <button onclick="openReassignModal(${project.id})" 
                                class="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 text-sm">
                            <i class="fas fa-exchange-alt"></i> Reassign
                        </button>
                        <button onclick="viewRejectedProjectDetails(${project.id})" 
                                class="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 text-sm">
                            <i class="fas fa-eye"></i> View Details
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    openReassignModal(projectId) {
        console.log('=== OPEN REASSIGN MODAL ===', projectId);
        
        const project = this.data.projectRequests.find(p => p.id == projectId);
        if (!project) {
            this.showError('Project not found');
            return;
        }
        
        // Store current project for reassignment
        this.currentReassignProject = project;
        
        // Update modal content
        document.getElementById('reassign-project-title').textContent = `Project: ${project.projectName}`;
        document.getElementById('reassign-project-client').textContent = `Client: ${project.clientName}`;
        document.getElementById('reassign-rejected-by').textContent = `Rejected by: ${project.engineerName || 'Unknown'}`;
        
        // Load available engineers (excluding the one who rejected it)
        this.loadAvailableEngineersForReassignment(project.engineerId);
        
        // Show modal
        const modal = document.getElementById('reassign-project-modal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }

    loadAvailableEngineersForReassignment(rejectedByEngineerId) {
        console.log('=== LOAD AVAILABLE ENGINEERS FOR REASSIGNMENT ===');
        
        const engineersList = document.getElementById('available-engineers-list');
        if (!engineersList) return;
        
        // Get all engineers except the one who rejected the project
        const availableEngineers = this.data.registeredUsers.filter(user => 
            user.role === 'engineer' && user.id != rejectedByEngineerId
        );
        
        console.log('Available engineers:', availableEngineers);
        
        if (availableEngineers.length === 0) {
            engineersList.innerHTML = `
                <div class="text-center py-8">
                    <div class="inline-flex items-center justify-center w-12 h-12 bg-slate-100 rounded-xl mb-3">
                        <i class="fas fa-users text-slate-400 text-xl"></i>
                    </div>
                    <p class="text-slate-600">No other engineers available for reassignment</p>
                </div>
            `;
            return;
        }
        
        // Display available engineers
        engineersList.innerHTML = availableEngineers.map(engineer => `
            <div class="border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all duration-200 cursor-pointer engineer-option" 
                 data-engineer-id="${engineer.id}" onclick="selectEngineerForReassignment(${engineer.id})">
                <div class="flex items-center gap-4">
                    <div class="flex-shrink-0">
                        <div class="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-semibold">
                            ${engineer.username ? engineer.username.charAt(0).toUpperCase() : 'E'}
                        </div>
                    </div>
                    <div class="flex-1">
                        <h5 class="font-semibold text-slate-900">${this.escapeHtml(engineer.username)}</h5>
                        <p class="text-sm text-slate-600">Experience: ${engineer.experience || 0} years</p>
                        <div class="flex flex-wrap gap-1 mt-2">
                            ${this.createSkillsTags(engineer.skills).map(skill => 
                                `<span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">${skill}</span>`
                            ).join('')}
                        </div>
                    </div>
                    <div class="flex-shrink-0">
                        <div class="w-5 h-5 border-2 border-slate-300 rounded-full engineer-radio"></div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    selectEngineerForReassignment(engineerId) {
        console.log('=== SELECT ENGINEER FOR REASSIGNMENT ===', engineerId);
        
        // Remove previous selection
        document.querySelectorAll('.engineer-option').forEach(option => {
            option.classList.remove('border-blue-500', 'bg-blue-50');
            const radio = option.querySelector('.engineer-radio');
            if (radio) {
                radio.classList.remove('border-blue-500', 'bg-blue-500');
                radio.innerHTML = '';
            }
        });
        
        // Add selection to clicked option
        const selectedOption = document.querySelector(`[data-engineer-id="${engineerId}"]`);
        if (selectedOption) {
            selectedOption.classList.add('border-blue-500', 'bg-blue-50');
            const radio = selectedOption.querySelector('.engineer-radio');
            if (radio) {
                radio.classList.add('border-blue-500', 'bg-blue-500');
                radio.innerHTML = '<i class="fas fa-check text-white text-xs"></i>';
            }
        }
        
        // Store selected engineer
        this.selectedEngineerForReassignment = engineerId;
        
        // Enable reassign button
        const reassignBtn = document.getElementById('reassign-btn');
        if (reassignBtn) {
            reassignBtn.disabled = false;
        }
    }

    reassignProject() {
        console.log('=== REASSIGN PROJECT ===');
        
        if (!this.currentReassignProject || !this.selectedEngineerForReassignment) {
            this.showError('Please select an engineer for reassignment');
            return;
        }
        
        // Find the selected engineer
        const engineer = this.data.registeredUsers.find(u => u.id == this.selectedEngineerForReassignment);
        if (!engineer) {
            this.showError('Selected engineer not found');
            return;
        }
        
        // Update the project request
        const projectIndex = this.data.projectRequests.findIndex(p => p.id === this.currentReassignProject.id);
        if (projectIndex !== -1) {
            this.data.projectRequests[projectIndex].engineerId = this.selectedEngineerForReassignment;
            this.data.projectRequests[projectIndex].engineerName = engineer.username;
            this.data.projectRequests[projectIndex].status = 'pending'; // Reset to pending for new engineer
            this.data.projectRequests[projectIndex].rejectedBy = this.currentReassignProject.engineerName; // Keep track of who rejected it
            
            // Save data
            this.saveDataToJSON();
            
            this.showSuccess(`Project reassigned to ${engineer.username} successfully!`);
            
            // Close modal and refresh data
            this.closeReassignModal();
            this.loadRejectedProjects();
            this.loadAdminEngineersTable();
        } else {
            this.showError('Project not found');
        }
    }

    closeReassignModal() {
        const modal = document.getElementById('reassign-project-modal');
        if (modal) {
            modal.style.display = 'none';
        }
        
        // Reset data
        this.currentReassignProject = null;
        this.selectedEngineerForReassignment = null;
        
        // Reset reassign button
        const reassignBtn = document.getElementById('reassign-btn');
        if (reassignBtn) {
            reassignBtn.disabled = true;
        }
    }

    // Show client project requests
    showProjectRequests() {
        console.log('=== SHOW PROJECT REQUESTS DEBUG ===');
        console.log('Current user:', this.currentUser);
        console.log('Current user role:', this.currentUser?.role);
        
        const requestsSection = document.getElementById('project-requests-section');
        console.log('Project requests section element found:', !!requestsSection);
        
        if (requestsSection) {
            requestsSection.style.display = 'block';
            console.log('Project requests section displayed');
            this.loadClientProjectRequests();
            requestsSection.scrollIntoView({ behavior: 'smooth' });
            console.log('Scrolled to project requests section');
        } else {
            console.error('Project requests section element not found');
        }
    }

    // Hide client project requests
    hideProjectRequestsSection() {
        document.getElementById('project-requests-section').style.display = 'none';
    }

    // View project details (placeholder for future implementation)
    viewProjectDetails(projectId) {
        // This could open a detailed view of the project
        // For now, just show a message
        this.showInfo('Project details view will be implemented in the next update');
    }

    // Update engineer profile
    updateEngineerProfile() {
        if (!this.currentUser || this.currentUser.role !== 'engineer') return;

        // Update name
        document.getElementById('engineer-name').textContent = this.currentUser.username;

        // Update experience
        const experience = this.currentUser.experience || 0;
        document.getElementById('engineer-experience').textContent = experience;

        // Update skills
        this.updateSkillsTags(this.currentUser.skills);

        // Update photo
        this.updateProfilePhoto(this.currentUser.photo);

        // Update CV
        this.updateCVSection(this.currentUser.cv);

        // Update projects
        this.updateProjectsSection(this.currentUser.projects);

        // Update bio
        this.updateBioSection(this.currentUser.bio);

        // Update dashboard user photo
        this.updateDashboardUserPhoto();

        // Show edit button for engineers and ensure it's in the correct state
        const editBtn = document.getElementById('edit-profile-btn');
        if (editBtn) {
            editBtn.style.display = 'inline-flex';
            editBtn.innerHTML = '<i class="fas fa-edit"></i> Edit Profile';
        }

        // Ensure the profile view is visible and edit form is hidden
        const profileView = document.getElementById('engineer-dashboard');
        const editForm = document.getElementById('edit-profile-form');
        
        if (profileView) profileView.style.display = 'block';
        if (editForm) editForm.style.display = 'none';
    }

    // Update skills tags
    updateSkillsTags(skills) {
        const skillsContainer = document.getElementById('skills-tags');
        if (!skillsContainer) return;
        
        if (!skills) {
            skillsContainer.innerHTML = '<span class="text-slate-500 text-sm">No skills listed</span>';
            return;
        }

        // Handle both string and array formats
        let skillsArray;
        if (Array.isArray(skills)) {
            skillsArray = skills.filter(skill => skill && skill.trim());
        } else {
            skillsArray = skills.split(',').map(skill => skill.trim()).filter(skill => skill);
        }
        
        if (skillsArray.length === 0) {
            skillsContainer.innerHTML = '<span class="text-slate-500 text-sm">No skills listed</span>';
            return;
        }

        skillsContainer.innerHTML = skillsArray.map(skill => 
            `<span class="skill-tag">${this.escapeHtml(skill)}</span>`
        ).join('');
    }

    // Update profile photo
    updateProfilePhoto(photoPath) {
        const photoImg = document.getElementById('engineer-photo');
        const defaultPhoto = document.getElementById('default-photo');

        if (photoPath) {
            // Try to get the file from persistent storage first
            const persistentFiles = JSON.parse(localStorage.getItem('persistentFiles') || '[]');
            const fileName = photoPath.split('/').pop();
            const fileInfo = persistentFiles.find(file => file.fileName === fileName);
            
            if (fileInfo && fileInfo.data) {
                // Use the stored base64 data
                photoImg.src = fileInfo.data;
            } else {
                // Try from savedFiles (for recent uploads)
                const savedFiles = JSON.parse(localStorage.getItem('savedFiles') || '[]');
                const savedFileInfo = savedFiles.find(file => file.path === photoPath);
                if (savedFileInfo && savedFileInfo.downloadUrl) {
                    photoImg.src = savedFileInfo.downloadUrl;
                } else {
                    // Fallback to the path
                    photoImg.src = photoPath;
                }
            }
            photoImg.style.display = 'block';
            defaultPhoto.style.display = 'none';
        } else {
            photoImg.style.display = 'none';
            defaultPhoto.style.display = 'block';
        }
    }

    // Update CV section
    updateCVSection(cvData) {
        const cvActions = document.getElementById('cv-actions');
        const cvPreview = document.getElementById('cv-preview');
        const cvDownload = document.getElementById('cv-download');
        const noCv = document.getElementById('no-cv');

        if (cvData && cvData.path) {
            // Set data-file-path for both preview and download functions
            cvPreview.setAttribute('data-file-path', cvData.path);
            cvDownload.setAttribute('data-file-path', cvData.path);
            cvDownload.download = cvData.name || 'CV.pdf';
            cvDownload.innerHTML = `<i class="fas fa-download"></i> Download ${cvData.name || 'CV'}`;
            cvActions.style.display = 'block';
            noCv.style.display = 'none';
        } else {
            cvActions.style.display = 'none';
            noCv.style.display = 'block';
        }
    }

    // Update projects section
    updateProjectsSection(projects) {
        const projectsContent = document.getElementById('projects-content');
        
        if (projects && projects.trim()) {
            projectsContent.innerHTML = `<p>${this.escapeHtml(projects)}</p>`;
        } else {
            projectsContent.innerHTML = '<p class="text-muted">No projects listed</p>';
        }
    }

    // Update bio section
    updateBioSection(bio) {
        const bioContent = document.getElementById('bio-content');
        
        if (bio && bio.trim()) {
            bioContent.innerHTML = `<p>${this.escapeHtml(bio)}</p>`;
        } else {
            bioContent.innerHTML = '<p class="text-muted">No bio added yet</p>';
        }
    }

    // Setup edit profile functionality
    setupEditProfile() {
        const editForm = document.getElementById('profile-edit-form');
        if (editForm) {
            console.log('Edit profile form found and setup');
            editForm.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log('Edit profile form submitted');
                this.handleProfileUpdate(e.target);
            });
        } else {
            console.error('Edit profile form not found');
        }
    }

    // Language Switcher Setup
    setupLanguageSwitcher() {
        // Load saved language preference
        const savedLang = localStorage.getItem('appLanguage');
        if (savedLang) {
            this.currentLanguage = savedLang;
        }
        
        // Apply initial language
        this.applyLanguage(this.currentLanguage);
        
        // Update language switcher button
        this.updateLanguageSwitcher();
    }

    // Toggle between Arabic and English
    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'ar' ? 'en' : 'ar';
        
        this.applyLanguage(this.currentLanguage);
        this.updateLanguageSwitcher();
        
        // Save language preference
        localStorage.setItem('appLanguage', this.currentLanguage);
        
        // Show success message using translations
        const translations = this.data?.translations?.[this.currentLanguage];
        const message = translations?.messages?.languageChanged || 
                      (this.currentLanguage === 'ar' ? 'تم تغيير اللغة إلى العربية' : 'Language changed to English');
        this.showSuccess(message);
    }

    // Apply language to the interface
    applyLanguage(language) {
        const html = document.documentElement;
        const body = document.body;
        
        if (language === 'ar') {
            html.setAttribute('lang', 'ar');
            html.setAttribute('dir', 'rtl');
            body.classList.add('arabic-text');
            body.classList.remove('english-text');
        } else {
            html.setAttribute('lang', 'en');
            html.setAttribute('dir', 'ltr');
            body.classList.add('english-text');
            body.classList.remove('arabic-text');
        }
        
        // Update navigation text
        this.updateNavigationText(language);
        
        // Update page content
        this.updatePageContent(language);
    }

    // Update navigation text based on language
    updateNavigationText(language) {
        const translations = this.data?.translations?.[language];
        if (!translations) return;
        
        const navTexts = document.querySelectorAll('.nav-text');
        const dropdownTexts = document.querySelectorAll('.dropdown-text');
        
        // Update navigation items
        const navItems = [
            { selector: '[data-page="home"] .nav-text', key: 'home' },
            { selector: '[data-page="about"] .nav-text', key: 'about' },
            { selector: '[data-page="blog"] .nav-text', key: 'blog' },
            { selector: '[data-page="contact"] .nav-text', key: 'contact' },
            { selector: '[data-page="login"] .nav-text', key: 'login' }
        ];
        
        navItems.forEach(item => {
            const element = document.querySelector(item.selector);
            if (element && translations.navigation[item.key]) {
                element.textContent = translations.navigation[item.key];
            }
        });
        
        // Update dropdown items
        const dropdownItems = [
            { selector: '.nav-dropdown-item[onclick="goToDashboard()"] .dropdown-text', key: 'dashboard' },
            { selector: '.nav-dropdown-item[onclick="goToProfile()"] .dropdown-text', key: 'profile' },
            { selector: '.nav-dropdown-item[onclick="logout()"] .dropdown-text', key: 'logout' }
        ];
        
        dropdownItems.forEach(item => {
            const element = document.querySelector(item.selector);
            if (element && translations.navigation[item.key]) {
                element.textContent = translations.navigation[item.key];
            }
        });
    }

    // Update page content based on language
    updatePageContent(language) {
        const translations = this.data?.translations?.[language];
        if (!translations) return;
        
        // Update site title
        const siteTitle = document.querySelector('.site-title');
        if (siteTitle && translations.site?.title) {
            siteTitle.textContent = translations.site.title;
        }
        
        // Update page titles and content
        this.updatePageTitles(language);
        
        // Update all form labels and placeholders
        this.updateFormElements(language);
        
        // Update all alt texts
        this.updateAltTexts(language);
        
        // Update all help texts
        this.updateHelpTexts(language);
        
        // Update all elements with data-translate attributes
        this.updateDataTranslateElements(language);
    }

    // Update page titles and content
    updatePageTitles(language) {
        const translations = this.data?.translations?.[language];
        if (!translations) return;
        
        // Update page titles
        const pageTitles = document.querySelectorAll('.page-title');
        pageTitles.forEach(title => {
            const pageId = title.closest('.page')?.id;
            if (pageId && translations.navigation[pageId]) {
                title.textContent = translations.navigation[pageId];
            }
        });
    }

    // Update language switcher button
    updateLanguageSwitcher() {
        const langBtn = document.getElementById('current-lang');
        if (langBtn) {
            const translations = this.data?.translations?.[this.currentLanguage];
            langBtn.textContent = translations?.site?.currentLanguage || 
                                (this.currentLanguage === 'ar' ? 'العربية' : 'English');
        }
    }

    // Update form elements (labels, placeholders, help text)
    updateFormElements(language) {
        const translations = this.data?.translations?.[language];
        if (!translations) return;

        // Update form labels
        const labelMappings = [
            { selector: 'label[for="name"]', key: 'name' },
            { selector: 'label[for="email"]', key: 'email' },
            { selector: 'label[for="password"]', key: 'password' },
            { selector: 'label[for="confirmPassword"]', key: 'confirmPassword' },
            { selector: 'label[for="phone"]', key: 'phone' },
            { selector: 'label[for="city"]', key: 'city' },
            { selector: 'label[for="message"]', key: 'message' },
            { selector: 'label[for="login-email"]', key: 'email' },
            { selector: 'label[for="login-password"]', key: 'password' },
            { selector: 'label[for="register-projects"]', key: 'projects' },
            { selector: 'label[for="register-skills"]', key: 'skills' },
            { selector: 'label[for="register-bio"]', key: 'bio' },
            { selector: 'label[for="edit-projects"]', key: 'projects' },
            { selector: 'label[for="edit-skills"]', key: 'skills' },
            { selector: 'label[for="edit-bio"]', key: 'bio' },
            { selector: 'label[for="project-name"]', key: 'projectName' },
            { selector: 'label[for="project-address"]', key: 'projectAddress' },
            { selector: 'label[for="building-size"]', key: 'buildingSize' },
            { selector: 'label[for="lot-size"]', key: 'lotSize' },
            { selector: 'label[for="floors-count"]', key: 'floorsCount' },
            { selector: 'label[for="bedrooms-count"]', key: 'bedroomsCount' },
            { selector: 'label[for="bathrooms-count"]', key: 'bathroomsCount' },
            { selector: 'label[for="parking-spaces"]', key: 'parkingSpaces' },
            { selector: 'label[for="project-budget"]', key: 'budget' },
            { selector: 'label[for="project-description"]', key: 'description' },
            { selector: 'label[for="user-skills"]', key: 'skills' },
            { selector: 'label[for="user-bio"]', key: 'bio' },
            { selector: 'label[for="user-projects"]', key: 'projects' }
        ];

        labelMappings.forEach(mapping => {
            const element = document.querySelector(mapping.selector);
            if (element && translations.forms[mapping.key]) {
                element.textContent = translations.forms[mapping.key];
            }
        });

        // Update placeholders
        const placeholderMappings = [
            { selector: '#register-projects', key: 'describeProjects' },
            { selector: '#register-skills', key: 'skillsExample' },
            { selector: '#register-bio', key: 'bioExample' },
            { selector: '#edit-projects', key: 'describeProjects' },
            { selector: '#edit-skills', key: 'skillsExample' },
            { selector: '#edit-bio', key: 'bioExample' },
            { selector: '#project-name', key: 'projectNameExample' },
            { selector: '#project-address', key: 'addressExample' },
            { selector: '#building-size', key: 'sizeExample' },
            { selector: '#lot-size', key: 'sizeExample' },
            { selector: '#floors-count', key: 'sizeExample' },
            { selector: '#bedrooms-count', key: 'sizeExample' },
            { selector: '#bathrooms-count', key: 'sizeExample' },
            { selector: '#parking-spaces', key: 'sizeExample' },
            { selector: '#project-budget', key: 'budgetExample' },
            { selector: '#project-description', key: 'descriptionExample' },
            { selector: '#user-skills', key: 'skillsExample' },
            { selector: '#user-bio', key: 'tellAboutYourself' },
            { selector: '#user-projects', key: 'describePreviousProjects' },
            { selector: '#admin-search-input', key: 'searchEngineers' },
            { selector: '#engineer-search', key: 'searchBySkills' }
        ];

        placeholderMappings.forEach(mapping => {
            const element = document.querySelector(mapping.selector);
            if (element && translations.placeholders[mapping.key]) {
                element.placeholder = translations.placeholders[mapping.key];
            }
        });

        // Update select options
        const selectOptionMappings = [
            { selector: '#register-role option[value=""]', key: 'selectRole' },
            { selector: '#register-role option[value="engineer"]', key: 'engineer' },
            { selector: '#register-role option[value="client"]', key: 'client' },
            { selector: '#project-type option[value=""]', key: 'selectBuildingType' },
            { selector: '#project-type option[value="residential-house"]', key: 'residentialHouse' },
            { selector: '#project-type option[value="apartment"]', key: 'apartment' },
            { selector: '#project-type option[value="commercial"]', key: 'commercial' },
            { selector: '#project-type option[value="warehouse"]', key: 'warehouse' },
            { selector: '#project-type option[value="office"]', key: 'office' },
            { selector: '#project-type option[value="villa"]', key: 'villa' },
            { selector: '#project-type option[value="duplex"]', key: 'duplex' },
            { selector: '#project-type option[value="other"]', key: 'other' },
            { selector: '#project-timeline option[value=""]', key: 'selectTimeline' },
            { selector: '#project-timeline option[value="1-3 months"]', key: 'months1to3' },
            { selector: '#project-timeline option[value="3-6 months"]', key: 'months3to6' },
            { selector: '#project-timeline option[value="6-12 months"]', key: 'months6to12' },
            { selector: '#project-timeline option[value="1-2 years"]', key: 'years1to2' },
            { selector: '#project-timeline option[value="2+ years"]', key: 'years2plus' }
        ];

        selectOptionMappings.forEach(mapping => {
            const element = document.querySelector(mapping.selector);
            if (element && translations.forms[mapping.key]) {
                element.textContent = translations.forms[mapping.key];
            }
        });
    }

    // Update alt texts for images
    updateAltTexts(language) {
        const translations = this.data?.translations?.[language];
        if (!translations) return;

        const altMappings = [
            { selector: '#nav-user-photo, #nav-dropdown-photo', key: 'userPhoto' },
            { selector: '#dashboard-user-photo', key: 'userPhoto' },
            { selector: '#engineer-photo', key: 'engineerPhoto' },
            { selector: '#selected-engineer-photo', key: 'engineerPhoto' }
        ];

        altMappings.forEach(mapping => {
            const elements = document.querySelectorAll(mapping.selector);
            elements.forEach(element => {
                if (translations.messages[mapping.key]) {
                    element.alt = translations.messages[mapping.key];
                }
            });
        });
    }

    // Update help texts
    updateHelpTexts(language) {
        const translations = this.data?.translations?.[language];
        if (!translations) return;

        const helpMappings = [
            { selector: '.form-help', key: 'separateSkills' },
            { selector: 'small.form-help', key: 'separateSkills' }
        ];

        // Update specific help texts
        const helpTexts = document.querySelectorAll('.form-help');
        helpTexts.forEach((help, index) => {
            if (index === 0 && translations.help.separateSkills) {
                help.textContent = translations.help.separateSkills;
            } else if (index === 1 && translations.help.shareStory) {
                help.textContent = translations.help.shareStory;
            } else if (help.textContent.includes('Size of the land') && translations.help.landPlotSize) {
                help.textContent = translations.help.landPlotSize;
            } else if (help.textContent.includes('Total estimated budget') && translations.help.totalBudget) {
                help.textContent = translations.help.totalBudget;
            } else if (help.textContent.includes('additional details') && translations.help.additionalDetails) {
                help.textContent = translations.help.additionalDetails;
            }
        });
    }

    // Update elements with data-translate attributes
    updateDataTranslateElements(language) {
        const translations = this.data?.translations?.[language];
        if (!translations) return;

        const elements = document.querySelectorAll('[data-translate]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const keys = key.split('.');
            let value = translations;
            
            for (const k of keys) {
                value = value?.[k];
            }
            
            if (value) {
                if (element.tagName === 'INPUT' && element.type === 'text') {
                    element.placeholder = value;
                } else if (element.tagName === 'TITLE') {
                    element.textContent = value;
                } else {
                    element.textContent = value;
                }
            }
        });
    }

    // Saudi Arabia specific formatting
    formatDateForSaudi(dateString) {
        const date = new Date(dateString);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            calendar: 'islamic-umalqura', // Islamic calendar
            timeZone: 'Asia/Riyadh'
        };
        
        if (this.currentLanguage === 'ar') {
            return new Intl.DateTimeFormat('ar-SA', options).format(date);
        } else {
            return new Intl.DateTimeFormat('en-SA', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                timeZone: 'Asia/Riyadh'
            }).format(date);
        }
    }

    // Format currency for Saudi Arabia
    formatCurrency(amount) {
        const options = {
            style: 'currency',
            currency: 'SAR',
            minimumFractionDigits: 2
        };
        
        if (this.currentLanguage === 'ar') {
            return new Intl.NumberFormat('ar-SA', options).format(amount);
        } else {
            return new Intl.NumberFormat('en-SA', options).format(amount);
        }
    }

    // Format phone number for Saudi Arabia
    formatSaudiPhone(phone) {
        // Remove any non-digit characters
        const cleaned = phone.replace(/\D/g, '');
        
        // Saudi phone number patterns
        if (cleaned.startsWith('966')) {
            // International format: +966 50 123 4567
            return `+966 ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`;
        } else if (cleaned.startsWith('05')) {
            // National format: 050 123 4567
            return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
        } else if (cleaned.startsWith('5')) {
            // Local format: 050 123 4567
            return `0${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5)}`;
        }
        
        return phone; // Return original if no pattern matches
    }

    // Handle profile update
    async handleProfileUpdate(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        console.log('Profile update data:', data);

        // Validate form
        if (!data.username || !data.email) {
            this.showError('Username and email are required');
            return;
        }

        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="loading"></span> Saving...';
        submitBtn.disabled = true;

        try {
            // Handle file uploads
            await this.handleEditEngineerFiles(formData, data);

            const success = await this.updateUserProfile(data);
            if (success) {
                this.showSuccess('Profile updated successfully!');
                this.toggleEditMode(false);
                this.updateEngineerProfile();
            } else {
                this.showError('Failed to update profile');
            }
        } catch (error) {
            console.error('Profile update error:', error);
            this.showError('Failed to update profile. Please try again.');
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    // Handle engineer file uploads for edit
    async handleEditEngineerFiles(formData, data) {
        return new Promise((resolve) => {
            try {
                // Handle photo upload
                const photoFile = formData.get('photo');
                if (photoFile && photoFile.size > 0) {
                    if (photoFile.size > 5 * 1024 * 1024) { // 5MB limit
                        throw new Error('Photo file size must be less than 5MB');
                    }
                    
                    // Generate unique filename
                    const fileExtension = photoFile.name.split('.').pop();
                    const fileName = `profile_${Date.now()}.${fileExtension}`;
                    const filePath = `Images/${fileName}`;
                    
                    // Store file path in data
                    data.photo = filePath;
                    
                    // Save file to Images folder
                    this.saveFileToFolder(photoFile, fileName, 'Images');
                } else {
                    // Keep existing photo if no new one uploaded
                    data.photo = this.currentUser.photo;
                }

                // Handle CV upload
                const cvFile = formData.get('cv');
                if (cvFile && cvFile.size > 0) {
                    if (cvFile.size > 10 * 1024 * 1024) { // 10MB limit
                        throw new Error('CV file size must be less than 10MB');
                    }
                    
                    // Generate unique filename
                    const fileExtension = cvFile.name.split('.').pop();
                    const fileName = `cv_${Date.now()}.${fileExtension}`;
                    const filePath = `CVs/${fileName}`;
                    
                    // Store file info for download
                    data.cv = {
                        name: cvFile.name,
                        size: cvFile.size,
                        type: cvFile.type,
                        path: filePath
                    };
                    
                    // Save file to CVs folder
                    this.saveFileToFolder(cvFile, fileName, 'CVs');
                } else {
                    // Keep existing CV if no new one uploaded
                    data.cv = this.currentUser.cv;
                }

                resolve();
            } catch (error) {
                console.error('File upload error:', error);
                this.showError(error.message);
                resolve();
            }
        });
    }

    // Update user profile
    updateUserProfile(userData) {
        return new Promise((resolve) => {
            try {
                console.log('Updating user profile with:', userData);
                console.log('Current user before update:', this.currentUser);

                // Update current user data
                this.currentUser = {
                    ...this.currentUser,
                    username: userData.username,
                    email: userData.email,
                    experience: userData.experience || this.currentUser.experience,
                    photo: userData.photo || this.currentUser.photo,
                    cv: userData.cv || this.currentUser.cv,
                    projects: userData.projects || this.currentUser.projects,
                    skills: userData.skills || this.currentUser.skills,
                    bio: userData.bio || this.currentUser.bio
                };

                console.log('Current user after update:', this.currentUser);

                // Update JSON data
                if (!this.data.registeredUsers) {
                    this.data.registeredUsers = [];
                }
                const userIndex = this.data.registeredUsers.findIndex(u => u.id === this.currentUser.id);
                if (userIndex !== -1) {
                    this.data.registeredUsers[userIndex] = this.currentUser;
                    this.saveDataToJSON();
                    console.log('Updated user in JSON data');
                }

                // Update localStorage as backup
                const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
                const localStorageIndex = registeredUsers.findIndex(u => u.id === this.currentUser.id);
                
                if (localStorageIndex !== -1) {
                    registeredUsers[localStorageIndex] = this.currentUser;
                    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
                    console.log('Updated user in localStorage backup');
                }

                // Update current user in localStorage
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                console.log('Updated currentUser in localStorage');

                resolve(true);
            } catch (error) {
                console.error('Error updating user profile:', error);
                resolve(false);
            }
        });
    }

    // Toggle edit mode
    toggleEditMode(show) {
        const profileTab = document.getElementById('profile-tab');
        const editForm = document.getElementById('edit-profile-form');
        const editBtn = document.getElementById('edit-profile-btn');

        console.log('Toggle edit mode:', show);
        console.log('Profile tab element:', profileTab);
        console.log('Edit form element:', editForm);
        console.log('Edit button element:', editBtn);

        if (show) {
            if (profileTab) profileTab.style.display = 'none';
            if (editForm) editForm.style.display = 'block';
            if (editBtn) editBtn.innerHTML = '<i class="fas fa-eye"></i> View Profile';
            // Populate form after a short delay to ensure DOM is ready
            setTimeout(() => {
                this.populateEditForm();
            }, 100);
        } else {
            if (profileTab) profileTab.style.display = 'block';
            if (editForm) editForm.style.display = 'none';
            if (editBtn) editBtn.innerHTML = '<i class="fas fa-edit"></i> Edit Profile';
        }
    }

    // Populate edit form with current data
    populateEditForm() {
        if (!this.currentUser) return;

        // Populate form fields with current user data
        const fields = {
            'edit-username': this.currentUser.username || '',
            'edit-email': this.currentUser.email || '',
            'edit-experience': this.currentUser.experience || '',
            'edit-projects': this.currentUser.projects || '',
            'edit-skills': this.currentUser.skills || '',
            'edit-bio': this.currentUser.bio || ''
        };

        // Set values for each field
        Object.keys(fields).forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.value = fields[fieldId];
            }
        });

        console.log('Edit form populated with:', fields);
    }

    // Download file from persistent storage
    downloadFile(filePath) {
        // Try persistent storage first
        const fileName = filePath.split('/').pop();
        const persistentFiles = JSON.parse(localStorage.getItem('persistentFiles') || '[]');
        let fileInfo = persistentFiles.find(file => file.fileName === fileName);
        
        if (fileInfo) {
            // Create download link from base64 data
            const downloadLink = document.createElement('a');
            downloadLink.href = fileInfo.data;
            downloadLink.download = fileInfo.originalName || fileInfo.fileName;
            downloadLink.style.display = 'none';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            this.showSuccess(`Downloading ${fileInfo.originalName || fileInfo.fileName}`);
            return;
        }
        
        // Fallback to savedFiles
        const savedFiles = JSON.parse(localStorage.getItem('savedFiles') || '[]');
        fileInfo = savedFiles.find(file => file.path === filePath);
        
        if (fileInfo && fileInfo.downloadUrl) {
            const downloadLink = document.createElement('a');
            downloadLink.href = fileInfo.downloadUrl;
            downloadLink.download = fileInfo.originalName || fileInfo.name;
            downloadLink.style.display = 'none';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            this.showSuccess(`Downloading ${fileInfo.originalName || fileInfo.name}`);
        } else {
            this.showError('File not found or no longer available');
        }
    }

    // Get file info from localStorage
    getFileInfo(filePath) {
        const savedFiles = JSON.parse(localStorage.getItem('savedFiles') || '[]');
        return savedFiles.find(file => file.path === filePath);
    }

    // Update dashboard user photo
    updateDashboardUserPhoto() {
        if (!this.currentUser) return;
        
        const dashboardUserPhoto = document.getElementById('dashboard-user-photo');
        const dashboardDefaultPhoto = document.getElementById('dashboard-default-photo');
        
        // For clients or users without photos, show default
        if (!this.currentUser.photo) {
            dashboardUserPhoto.style.display = 'none';
            dashboardDefaultPhoto.style.display = 'flex';
            return;
        }
        
        // For engineers with photos, try to display the photo
        if (this.currentUser.photo) {
            // Try to get the file from persistent storage first
            const persistentFiles = JSON.parse(localStorage.getItem('persistentFiles') || '[]');
            const fileName = this.currentUser.photo.split('/').pop();
            const fileInfo = persistentFiles.find(file => file.fileName === fileName);
            
            if (fileInfo && fileInfo.data) {
                // Use the stored base64 data
                dashboardUserPhoto.src = fileInfo.data;
                dashboardUserPhoto.style.display = 'block';
                dashboardDefaultPhoto.style.display = 'none';
            } else {
                // Try from savedFiles (for recent uploads)
                const savedFiles = JSON.parse(localStorage.getItem('savedFiles') || '[]');
                const savedFileInfo = savedFiles.find(file => file.path === this.currentUser.photo);
                if (savedFileInfo && savedFileInfo.downloadUrl) {
                    dashboardUserPhoto.src = savedFileInfo.downloadUrl;
                    dashboardUserPhoto.style.display = 'block';
                    dashboardDefaultPhoto.style.display = 'none';
                } else {
                    // Show default if photo can't be loaded
                    dashboardUserPhoto.style.display = 'none';
                    dashboardDefaultPhoto.style.display = 'flex';
                }
            }
        } else {
            // Show default
            dashboardUserPhoto.style.display = 'none';
            dashboardDefaultPhoto.style.display = 'flex';
        }
    }

    // Update navigation user profile
    updateNavUserProfile() {
        if (!this.currentUser) return;
        
        // Update main navbar elements
        const navUserPhoto = document.getElementById('nav-user-photo');
        const navDefaultPhoto = document.getElementById('nav-default-photo');
        const navUsername = document.getElementById('nav-username');
        
        // Update dropdown elements
        const navDropdownPhoto = document.getElementById('nav-dropdown-photo');
        const navDropdownDefaultPhoto = document.getElementById('nav-dropdown-default-photo');
        const navDropdownUsername = document.getElementById('nav-dropdown-username');
        const navDropdownRole = document.getElementById('nav-dropdown-role');
        
        // Update username in both places
        navUsername.textContent = this.currentUser.username;
        if (navDropdownUsername) navDropdownUsername.textContent = this.currentUser.username;
        
        // Update role in dropdown
        if (navDropdownRole) navDropdownRole.textContent = this.currentUser.role;
        
        // Update photo in both places
        if (this.currentUser.photo) {
            // Try to get the file from persistent storage first
            const persistentFiles = JSON.parse(localStorage.getItem('persistentFiles') || '[]');
            const fileName = this.currentUser.photo.split('/').pop();
            const fileInfo = persistentFiles.find(file => file.fileName === fileName);
            
            if (fileInfo && fileInfo.data) {
                // Use the stored base64 data
                navUserPhoto.src = fileInfo.data;
                navUserPhoto.style.display = 'block';
                navDefaultPhoto.style.display = 'none';
                
                // Update dropdown photo
                if (navDropdownPhoto) {
                    navDropdownPhoto.src = fileInfo.data;
                    navDropdownPhoto.style.display = 'block';
                    navDropdownDefaultPhoto.style.display = 'none';
                }
            } else {
                // Try from savedFiles (for recent uploads)
                const savedFiles = JSON.parse(localStorage.getItem('savedFiles') || '[]');
                const savedFileInfo = savedFiles.find(file => file.path === this.currentUser.photo);
                if (savedFileInfo && savedFileInfo.downloadUrl) {
                    navUserPhoto.src = savedFileInfo.downloadUrl;
                    navUserPhoto.style.display = 'block';
                    navDefaultPhoto.style.display = 'none';
                    
                    // Update dropdown photo
                    if (navDropdownPhoto) {
                        navDropdownPhoto.src = savedFileInfo.downloadUrl;
                        navDropdownPhoto.style.display = 'block';
                        navDropdownDefaultPhoto.style.display = 'none';
                    }
                } else {
                    // Show default
                    navUserPhoto.style.display = 'none';
                    navDefaultPhoto.style.display = 'flex';
                    
                    // Update dropdown default
                    if (navDropdownPhoto) {
                        navDropdownPhoto.style.display = 'none';
                        navDropdownDefaultPhoto.style.display = 'flex';
                    }
                }
            }
        } else {
            // Show default
            navUserPhoto.style.display = 'none';
            navDefaultPhoto.style.display = 'flex';
            
            // Update dropdown default
            if (navDropdownPhoto) {
                navDropdownPhoto.style.display = 'none';
                navDropdownDefaultPhoto.style.display = 'flex';
            }
        }
    }

    // Format file size
    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // Preview CV in modal
    previewCV(filePath) {
        const modal = document.getElementById('cv-preview-modal');
        const content = document.getElementById('cv-preview-content');
        const downloadBtn = document.getElementById('cv-download-from-modal');
        
        // Show modal
        modal.style.display = 'flex';
        
        // Set download button path
        downloadBtn.setAttribute('data-file-path', filePath);
        
        // Show loading spinner
        content.innerHTML = `
            <div class="loading-spinner">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Loading CV...</p>
            </div>
        `;
        
        // Add keyboard support
        this.addModalKeyboardSupport();
        

        
        // Get file info from persistent storage first
        const fileName = filePath.split('/').pop();
        const persistentFiles = JSON.parse(localStorage.getItem('persistentFiles') || '[]');
        let fileInfo = persistentFiles.find(file => file.fileName === fileName);
        
        if (fileInfo) {
            // Convert persistent file format to display format
            fileInfo = {
                ...fileInfo,
                downloadUrl: fileInfo.data, // base64 data
                originalName: fileInfo.originalName,
                name: fileInfo.fileName,
                type: fileInfo.type,
                size: fileInfo.size
            };
        } else {
            // Fallback to savedFiles (for recent uploads)
            const savedFiles = JSON.parse(localStorage.getItem('savedFiles') || '[]');
            fileInfo = savedFiles.find(file => file.path === filePath);
        }
        
        if (fileInfo && fileInfo.downloadUrl) {
            setTimeout(() => {
                this.displayCVPreview(fileInfo, content);
            }, 500);
        } else {
            content.innerHTML = `
                <div class="cv-preview-error">
                    <i class="fas fa-exclamation-triangle"></i>
                    <h4>File Not Found</h4>
                    <p>The CV file could not be found or is no longer available.</p>
                    <p>Please try uploading the CV again.</p>
                </div>
            `;
        }
    }

    // Display CV preview based on file type
    displayCVPreview(fileInfo, container) {
        const fileType = fileInfo.type.toLowerCase();
        const fileName = fileInfo.originalName || fileInfo.name;
        
        if (fileType.includes('pdf')) {
            // PDF Preview
            container.innerHTML = `
                <iframe src="${fileInfo.downloadUrl}" class="cv-preview-iframe" title="CV Preview">
                    <p>Your browser doesn't support PDF preview. 
                    <a href="${fileInfo.downloadUrl}" download="${fileName}">Download the CV</a> instead.</p>
                </iframe>
            `;
        } else if (fileType.includes('image')) {
            // Image Preview (in case CV is an image)
            container.innerHTML = `
                <div style="text-align: center; flex: 1; display: flex; align-items: center; justify-content: center;">
                    <img src="${fileInfo.downloadUrl}" alt="CV Preview" style="max-width: 100%; max-height: 100%; object-fit: contain; border-radius: var(--radius-md);">
                </div>
            `;
        } else if (fileType.includes('text') || fileType.includes('document')) {
            // Text/Document files
            container.innerHTML = `
                <div class="cv-preview-error">
                    <i class="fas fa-file-alt"></i>
                    <h4>Preview Not Available</h4>
                    <p>Preview is not available for ${fileName}.</p>
                    <p>File type: ${fileInfo.type}</p>
                    <p>Please download the file to view its contents.</p>
                </div>
            `;
        } else {
            // Unsupported file type
            container.innerHTML = `
                <div class="cv-preview-error">
                    <i class="fas fa-file"></i>
                    <h4>Preview Not Supported</h4>
                    <p>Preview is not supported for this file type: ${fileInfo.type}</p>
                    <p>Please download the file to view its contents.</p>
                </div>
            `;
        }
    }

    // Close CV preview modal
    closeCVPreview() {
        const modal = document.getElementById('cv-preview-modal');
        modal.style.display = 'none';
        // Remove keyboard listener
        document.removeEventListener('keydown', this.handleModalKeydown);
    }

    // Add keyboard support for modal
    addModalKeyboardSupport() {
        // Store bound function for later removal
        this.handleModalKeydown = (e) => {
            if (e.key === 'Escape') {
                this.closeCVPreview();
            }
        };
        document.addEventListener('keydown', this.handleModalKeydown);
        
        // Also add click outside to close
        const modal = document.getElementById('cv-preview-modal');
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closeCVPreview();
            }
        });
    }

    // Comprehensive test function for client dashboard
    testClientDashboard() {
        console.log('=== COMPREHENSIVE CLIENT DASHBOARD TEST ===');
        
        // Test 1: Check current user
        console.log('1. Current User Test:');
        console.log('   - Current user:', this.currentUser);
        console.log('   - User role:', this.currentUser?.role);
        console.log('   - User ID:', this.currentUser?.id);
        
        // Test 2: Check HTML elements
        console.log('2. HTML Elements Test:');
        const elements = [
            'client-dashboard',
            'client-name',
            'client-projects-list',
            'engineers-browser',
            'engineers-list',
            'project-requests-section',
            'requests-list',
            'project-form-modal'
        ];
        
        elements.forEach(elementId => {
            const element = document.getElementById(elementId);
            console.log(`   - ${elementId}: ${element ? 'FOUND' : 'NOT FOUND'}`);
            if (element) {
                console.log(`     Style: display=${element.style.display}, visibility=${element.style.visibility}`);
            }
        });
        
        // Test 3: Check data
        console.log('3. Data Test:');
        console.log('   - Registered users:', this.data?.registeredUsers?.length || 0);
        console.log('   - Engineers:', this.data?.registeredUsers?.filter(u => u.role === 'engineer').length || 0);
        console.log('   - Project requests:', this.data?.projectRequests?.length || 0);
        console.log('   - User projects:', this.currentUser?.projects?.length || 0);
        
        // Test 4: Check localStorage
        console.log('4. LocalStorage Test:');
        console.log('   - appData:', !!localStorage.getItem('appData'));
        console.log('   - currentUser:', !!localStorage.getItem('currentUser'));
        console.log('   - registeredUsers:', !!localStorage.getItem('registeredUsers'));
        
        // Test 5: Try to show client dashboard
        console.log('5. Show Client Dashboard Test:');
       
        
        // Test 6: Try to load engineers
        console.log('6. Load Engineers Test:');
        try {
            this.loadEngineersList();
            console.log('   - loadEngineersList() executed successfully');
        } catch (error) {
            console.error('   - Error in loadEngineersList():', error);
        }
        
        // Test 7: Try to load projects
        console.log('7. Load Projects Test:');
        try {
            this.loadClientProjects();
            console.log('   - loadClientProjects() executed successfully');
        } catch (error) {
            console.error('   - Error in loadClientProjects():', error);
        }
        
        // Test 8: Try to load requests
        console.log('8. Load Requests Test:');
        try {
            this.loadClientProjectRequests();
            console.log('   - loadClientProjectRequests() executed successfully');
        } catch (error) {
            console.error('   - Error in loadClientProjectRequests():', error);
        }
        
        console.log('=== TEST COMPLETED ===');
        
        // Show results to user
        const engineerCount = this.data?.registeredUsers?.filter(u => u.role === 'engineer').length || 0;
        const projectCount = this.currentUser?.projects?.length || 0;
        const requestCount = this.data?.projectRequests?.filter(r => r.clientId === this.currentUser?.id).length || 0;
        
        this.showSuccess(`Test completed! Found: ${engineerCount} engineers, ${projectCount} projects, ${requestCount} requests. Check console for details.`);
    }

    // Create test data for client dashboard
    createTestClientData() {
        console.log('=== CREATING TEST CLIENT DATA ===');
        
        // Add test engineers if they don't exist
        if (!this.data.registeredUsers) {
            this.data.registeredUsers = [];
        }
        
        const testEngineers = [
            {
                id: Date.now() + 1,
                username: "John Engineer",
                email: "john@engineer.com",
                password: "test123",
                role: "engineer",
                experience: 5,
                skills: ["Structural Engineering", "AutoCAD", "Project Management"],
                bio: "Experienced structural engineer with 5 years in residential and commercial projects.",
                projects: "Residential complexes, Office buildings, Shopping centers",
                photo: null,
                cv: null,
                createdAt: new Date().toISOString()
            },
            {
                id: Date.now() + 2,
                username: "Sarah Architect",
                email: "sarah@architect.com",
                password: "test123",
                role: "engineer",
                experience: 8,
                skills: ["Architecture Design", "3D Modeling", "Sustainable Design"],
                bio: "Creative architect specializing in sustainable and modern building designs.",
                projects: "Eco-friendly homes, Modern offices, Cultural centers",
                photo: null,
                cv: null,
                createdAt: new Date().toISOString()
            }
        ];
        
        // Add test engineers
        testEngineers.forEach(engineer => {
            const exists = this.data.registeredUsers.some(u => u.email === engineer.email);
            if (!exists) {
                this.data.registeredUsers.push(engineer);
                console.log('Added test engineer:', engineer.username);
            }
        });
        
        // Add test project for current client if they don't have any
        if (!this.currentUser.projects) {
            this.currentUser.projects = [];
        }
        
        if (this.currentUser.projects.length === 0) {
            const testProject = {
                id: Date.now() + 100,
                projectName: "My Dream House",
                projectType: "residential",
                address: "123 Main Street, City, State",
                buildingSize: 2500,
                lotSize: 5000,
                floorsCount: 2,
                bedroomsCount: 3,
                bathroomsCount: 2,
                parkingSpaces: 2,
                foundationType: "concrete-slab",
                structuralSystem: "wood-frame",
                exteriorMaterials: ["brick", "vinyl-siding"],
                specialFeatures: ["fireplace", "deck"],
                accessibilityFeatures: ["wheelchair-ramp"],
                budget: 350000,
                timeline: "12 months",
                startDate: "2024-06-01",
                description: "A beautiful family home with modern amenities and sustainable features.",
                contactPreference: "email",
                clientId: this.currentUser.id,
                createdAt: new Date().toISOString(),
                status: 'open',
                assignedEngineer: null
            };
            
            this.currentUser.projects.push(testProject);
            console.log('Added test project:', testProject.projectName);
        }
        
        // Add test project request
        if (!this.data.projectRequests) {
            this.data.projectRequests = [];
        }
        
        const testRequest = {
            id: Date.now() + 200,
            projectId: this.currentUser.projects[0]?.id,
            projectName: this.currentUser.projects[0]?.projectName || "Test Project",
            projectType: this.currentUser.projects[0]?.projectType || "residential",
            clientId: this.currentUser.id,
            clientName: this.currentUser.username,
            clientEmail: this.currentUser.email,
            engineerId: this.data.registeredUsers[0]?.id,
            engineerName: this.data.registeredUsers[0]?.username || "Test Engineer",
            message: "I would like to discuss this project with you. Please let me know if you're interested.",
            status: 'pending',
            createdAt: new Date().toISOString()
        };
        
        this.data.projectRequests.push(testRequest);
        console.log('Added test project request');
        
        // Save to storage
        this.saveDataToJSON();
        
        // Update user in storage
        this.updateUserInStorage();
        
        console.log('Test data created successfully');
        console.log('Engineers:', this.data.registeredUsers.length);
        console.log('Projects:', this.currentUser.projects.length);
        console.log('Requests:', this.data.projectRequests.length);
        
        this.showSuccess('Test data created! Engineers: ' + this.data.registeredUsers.length + 
                        ', Projects: ' + this.currentUser.projects.length + 
                        ', Requests: ' + this.data.projectRequests.length);
        
        // Refresh the dashboard
        this.updateDashboard();
    }
    
    // User CRUD Functions
    loadUsersTable() {
        console.log('=== LOAD USERS TABLE ===');
        
        const tableBody = document.getElementById('admin-users-table');
        const usersCount = document.getElementById('users-count');
        if (!tableBody) return;
        
        // Get all users (both from users array and registeredUsers)
        const allUsers = [
            ...(this.data.users || []),
            ...(this.data.registeredUsers || [])
        ];
        
        if (usersCount) {
            usersCount.textContent = allUsers.length;
        }
        
        if (allUsers.length === 0) {
            tableBody.innerHTML = `
                <tr>
                    <td colspan="8" class="px-6 py-12 text-center">
                        <div class="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-2xl mb-4">
                            <i class="fas fa-users text-slate-400 text-2xl"></i>
                        </div>
                        <p class="text-slate-600 text-lg">No users found</p>
                        <p class="text-slate-500 text-sm mt-2">Click "Add User" to create your first user</p>
                    </td>
                </tr>
            `;
            return;
        }
        
        const tableRows = allUsers.map(user => {
            const skillsArray = user.skills ? user.skills.split(',').map(s => s.trim()) : [];
            const skillsDisplay = skillsArray.length > 0 ? skillsArray.slice(0, 2).join(', ') + (skillsArray.length > 2 ? '...' : '') : '-';
            const createdDate = new Date(user.createdAt).toLocaleDateString();
            
            return `
                <tr class="hover:bg-slate-50">
                    <td class="px-6 py-4 whitespace-nowrap">
                        <input type="checkbox" class="user-checkbox" value="${user.id}" onchange="updateBulkActions()">
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                            <div class="flex-shrink-0 h-10 w-10">
                                ${user.photo ? 
                                    `<img class="h-10 w-10 rounded-full object-cover" src="${user.photo}" alt="${user.username}">` :
                                    `<div class="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                        <span class="text-white font-semibold text-sm">${user.username.charAt(0).toUpperCase()}</span>
                                    </div>`
                                }
                            </div>
                            <div class="ml-4">
                                <div class="text-sm font-medium text-slate-900">${user.username}</div>
                                <div class="text-sm text-slate-500">ID: ${user.id}</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${this.getRoleBadgeClass(user.role)}">
                            ${user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-slate-900">${user.email}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-slate-900">${user.experience || 0} years</div>
                    </td>
                    <td class="px-6 py-4">
                        <div class="text-sm text-slate-900 max-w-xs truncate" title="${user.skills || 'No skills listed'}">${skillsDisplay}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-slate-900">${createdDate}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div class="flex items-center gap-2">
                            <button onclick="viewUser(${user.id})" class="text-blue-600 hover:text-blue-900" title="View Details">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button onclick="editUser(${user.id})" class="text-indigo-600 hover:text-indigo-900" title="Edit User">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button onclick="deleteUser(${user.id})" class="text-red-600 hover:text-red-900" title="Delete User">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
        
        tableBody.innerHTML = tableRows;
    }
    
    getRoleBadgeClass(role) {
        switch(role) {
            case 'admin': return 'bg-red-100 text-red-800';
            case 'engineer': return 'bg-blue-100 text-blue-800';
            case 'client': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    }
    
    // CRUD Operations
    openAddUserModal() {
        document.getElementById('user-modal-title').innerHTML = '<i class="fas fa-user-plus"></i> Add New User';
        document.getElementById('user-form').reset();
        document.getElementById('user-id').value = '';
        document.getElementById('engineer-fields').style.display = 'none';
        document.getElementById('user-modal').style.display = 'flex';
    }
    
    editUser(userId) {
        const user = this.findUserById(userId);
        if (!user) {
            this.showNotification('User not found', 'error');
            return;
        }
        
        document.getElementById('user-modal-title').innerHTML = '<i class="fas fa-user-edit"></i> Edit User';
        document.getElementById('user-id').value = user.id;
        document.getElementById('user-username').value = user.username;
        document.getElementById('user-email').value = user.email;
        document.getElementById('user-password').value = user.password;
        document.getElementById('user-role').value = user.role;
        
        // Show engineer fields if role is engineer
        if (user.role === 'engineer') {
            document.getElementById('engineer-fields').style.display = 'block';
            document.getElementById('user-experience').value = user.experience || '';
            document.getElementById('user-skills').value = user.skills || '';
            document.getElementById('user-bio').value = user.bio || '';
            document.getElementById('user-projects').value = user.projects || '';
        } else {
            document.getElementById('engineer-fields').style.display = 'none';
        }
        
        document.getElementById('user-modal').style.display = 'flex';
    }
    
    viewUser(userId) {
        const user = this.findUserById(userId);
        if (!user) {
            this.showNotification('User not found', 'error');
            return;
        }
        
        const skillsArray = user.skills ? user.skills.split(',').map(s => s.trim()) : [];
        const createdDate = new Date(user.createdAt).toLocaleString();
        
        const userDetails = `
            <div class="space-y-6">
                <!-- User Header -->
                <div class="flex items-center space-x-6">
                    <div class="flex-shrink-0">
                        ${user.photo ? 
                            `<img class="h-20 w-20 rounded-full object-cover" src="${user.photo}" alt="${user.username}">` :
                            `<div class="h-20 w-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                <span class="text-white font-semibold text-2xl">${user.username.charAt(0).toUpperCase()}</span>
                            </div>`
                        }
                    </div>
                    <div>
                        <h4 class="text-2xl font-bold text-slate-900">${user.username}</h4>
                        <p class="text-slate-600">${user.email}</p>
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${this.getRoleBadgeClass(user.role)} mt-2">
                            ${user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                    </div>
                </div>
                
                <!-- User Details Grid -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="bg-slate-50 rounded-lg p-4">
                        <h5 class="font-semibold text-slate-900 mb-2">Basic Information</h5>
                        <div class="space-y-2 text-sm">
                            <div><span class="font-medium">ID:</span> ${user.id}</div>
                            <div><span class="font-medium">Username:</span> ${user.username}</div>
                            <div><span class="font-medium">Email:</span> ${user.email}</div>
                            <div><span class="font-medium">Role:</span> ${user.role}</div>
                            <div><span class="font-medium">Created:</span> ${createdDate}</div>
                        </div>
                    </div>
                    
                    ${user.role === 'engineer' ? `
                    <div class="bg-slate-50 rounded-lg p-4">
                        <h5 class="font-semibold text-slate-900 mb-2">Professional Information</h5>
                        <div class="space-y-2 text-sm">
                            <div><span class="font-medium">Experience:</span> ${user.experience || 0} years</div>
                            <div><span class="font-medium">Skills:</span> ${skillsArray.length > 0 ? skillsArray.join(', ') : 'None listed'}</div>
                        </div>
                    </div>
                    ` : ''}
                </div>
                
                ${user.role === 'engineer' && (user.bio || user.projects) ? `
                <div class="space-y-4">
                    ${user.bio ? `
                    <div class="bg-slate-50 rounded-lg p-4">
                        <h5 class="font-semibold text-slate-900 mb-2">Bio</h5>
                        <p class="text-slate-700">${user.bio}</p>
                    </div>
                    ` : ''}
                    
                    ${user.projects ? `
                    <div class="bg-slate-50 rounded-lg p-4">
                        <h5 class="font-semibold text-slate-900 mb-2">Previous Projects</h5>
                        <p class="text-slate-700">${user.projects}</p>
                    </div>
                    ` : ''}
                </div>
                ` : ''}
            </div>
        `;
        
        document.getElementById('user-details-content').innerHTML = userDetails;
        document.getElementById('view-user-modal').style.display = 'flex';
    }
    
    deleteUser(userId) {
        const user = this.findUserById(userId);
        if (!user) {
            this.showNotification('User not found', 'error');
            return;
        }
        
        // Don't allow deleting the main admin user
        if (user.id === 1 && user.role === 'admin') {
            this.showNotification('Cannot delete the main admin user', 'error');
            return;
        }
        
        const userInfo = `
            <div class="flex items-center space-x-3">
                <div class="flex-shrink-0">
                    ${user.photo ? 
                        `<img class="h-12 w-12 rounded-full object-cover" src="${user.photo}" alt="${user.username}">` :
                        `<div class="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                            <span class="text-white font-semibold">${user.username.charAt(0).toUpperCase()}</span>
                        </div>`
                    }
                </div>
                <div>
                    <div class="font-semibold text-slate-900">${user.username}</div>
                    <div class="text-sm text-slate-600">${user.email}</div>
                    <div class="text-sm">
                        <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${this.getRoleBadgeClass(user.role)}">
                            ${user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('delete-user-info').innerHTML = userInfo;
        document.getElementById('delete-user-modal').style.display = 'flex';
        
        // Store the user ID for deletion
        this.userToDelete = userId;
    }
    
    findUserById(userId) {
        const allUsers = [
            ...(this.data.users || []),
            ...(this.data.registeredUsers || [])
        ];
        return allUsers.find(user => user.id == userId);
    }
    
    saveUser(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);
        const userData = {
            id: formData.get('id') || Date.now(),
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password'),
            role: formData.get('role'),
            createdAt: formData.get('id') ? this.findUserById(formData.get('id'))?.createdAt : new Date().toISOString()
        };
        
        // Add role-specific fields
        if (userData.role === 'engineer') {
            userData.experience = parseInt(formData.get('experience')) || 0;
            userData.skills = formData.get('skills') || '';
            userData.bio = formData.get('bio') || '';
            userData.projects = formData.get('projects') || '';
            
            // Handle file uploads
            const photoFile = formData.get('photo');
            const cvFile = formData.get('cv');
            
            if (photoFile && photoFile.size > 0) {
                userData.photo = URL.createObjectURL(photoFile);
            } else if (formData.get('id')) {
                // Keep existing photo if editing and no new photo uploaded
                const existingUser = this.findUserById(formData.get('id'));
                userData.photo = existingUser?.photo || null;
            }
            
            if (cvFile && cvFile.size > 0) {
                userData.cv = URL.createObjectURL(cvFile);
            } else if (formData.get('id')) {
                // Keep existing CV if editing and no new CV uploaded
                const existingUser = this.findUserById(formData.get('id'));
                userData.cv = existingUser?.cv || null;
            }
        }
        
        // Check if email already exists (for new users or if email changed)
        const existingUser = this.findUserById(userData.id);
        if (!existingUser || existingUser.email !== userData.email) {
            const allUsers = [
                ...(this.data.users || []),
                ...(this.data.registeredUsers || [])
            ];
            const emailExists = allUsers.some(u => u.email === userData.email && u.id != userData.id);
            
            if (emailExists) {
                this.showNotification('Email already exists', 'error');
                return;
            }
        }
        
        // Save user
        if (formData.get('id')) {
            // Update existing user
            this.updateUser(userData);
            this.showNotification('User updated successfully', 'success');
        } else {
            // Add new user
            this.addUser(userData);
            this.showNotification('User created successfully', 'success');
        }
        
        this.closeUserModal();
        this.loadUsersTable();
    }
    
    addUser(userData) {
        if (!this.data.registeredUsers) {
            this.data.registeredUsers = [];
        }
        this.data.registeredUsers.push(userData);
        this.saveDataToJSON();
    }
    
    updateUser(userData) {
        // Update in users array (for admin user)
        const userIndex = this.data.users?.findIndex(u => u.id == userData.id);
        if (userIndex !== undefined && userIndex >= 0) {
            this.data.users[userIndex] = userData;
        }
        
        // Update in registeredUsers array
        const registeredUserIndex = this.data.registeredUsers?.findIndex(u => u.id == userData.id);
        if (registeredUserIndex !== undefined && registeredUserIndex >= 0) {
            this.data.registeredUsers[registeredUserIndex] = userData;
        }
        
        this.saveDataToJSON();
    }
    
    confirmDeleteUser() {
        if (!this.userToDelete) return;
        
        // Remove from users array
        if (this.data.users) {
            this.data.users = this.data.users.filter(u => u.id != this.userToDelete);
        }
        
        // Remove from registeredUsers array
        if (this.data.registeredUsers) {
            this.data.registeredUsers = this.data.registeredUsers.filter(u => u.id != this.userToDelete);
        }
        
        this.saveDataToJSON();
        this.showNotification('User deleted successfully', 'success');
        this.closeDeleteUserModal();
        this.loadUsersTable();
        
        this.userToDelete = null;
    }
    
    closeUserModal() {
        document.getElementById('user-modal').style.display = 'none';
        document.getElementById('user-form').reset();
    }
    
    closeDeleteUserModal() {
        document.getElementById('delete-user-modal').style.display = 'none';
        this.userToDelete = null;
    }
    
    closeViewUserModal() {
        document.getElementById('view-user-modal').style.display = 'none';
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.webApp = new WebApp();
    // Restore user session from localStorage
    window.webApp.checkAuthStatus();
});

// Global functions for HTML onclick handlers
window.showPage = function(pageId) {
    if (window.webApp) {
        window.webApp.showPage(pageId);
    }
};

// Global language toggle function
window.toggleLanguage = function() {
    if (window.webApp) {
        window.webApp.toggleLanguage();
    }
};

// Global showLogin function
window.showLogin = function() {
    if (window.webApp) {
        window.webApp.showPage('login');
    }
};

// Add some demo functionality
window.addDemoPost = function() {
    if (window.webApp) {
        window.webApp.addBlogPost(
            'Demo Post',
            'This is a demo blog post added dynamically!',
            ['demo', 'dynamic']
        );
    }
};

// Logout function
window.logout = function() {
    if (window.webApp) {
        window.webApp.logout();
    }
};

// Rejected Projects Functions
window.openReassignModal = function(projectId) {
    if (window.webApp) {
        window.webApp.openReassignModal(projectId);
    }
};

window.selectEngineerForReassignment = function(engineerId) {
    if (window.webApp) {
        window.webApp.selectEngineerForReassignment(engineerId);
    }
};

window.reassignProject = function() {
    if (window.webApp) {
        window.webApp.reassignProject();
    }
};

window.closeReassignModal = function() {
    if (window.webApp) {
        window.webApp.closeReassignModal();
    }
};

window.viewRejectedProjectDetails = function(projectId) {
    if (window.webApp) {
        window.webApp.viewRejectedProjectDetails(projectId);
    }
};

// Edit profile function
window.editProfile = function() {
    if (window.webApp) {
        window.webApp.toggleEditMode(true);
    }
};

// Cancel edit function
window.cancelEdit = function() {
    if (window.webApp) {
        window.webApp.toggleEditMode(false);
    }
};

// Download file function
window.downloadFile = function(filePath) {
    if (window.webApp) {
        window.webApp.downloadFile(filePath);
    }
};

// Preview CV function
window.previewCV = function(filePath) {
    if (window.webApp) {
        window.webApp.previewCV(filePath);
    }
};

// Close CV preview function
window.closeCVPreview = function() {
    if (window.webApp) {
        window.webApp.closeCVPreview();
    }
};

// Client functions
window.searchEngineers = function() {
    if (window.webApp) {
        window.webApp.searchEngineers();
    }
};

window.viewEngineerProfile = function(engineerId) {
    if (window.webApp) {
        window.webApp.viewEngineerProfile(engineerId);
    }
};

window.contactEngineer = function(engineerId) {
    if (window.webApp) {
        window.webApp.contactEngineer(engineerId);
    }
};

window.editClientProfile = function() {
    if (window.webApp) {
        window.webApp.editClientProfile();
    }
};

window.closeEngineerModal = function() {
    if (window.webApp) {
        window.webApp.closeEngineerModal();
    }
};

window.closeContactModal = function() {
    if (window.webApp) {
        window.webApp.closeContactModal();
    }
};

// Project management functions
window.openProjectForm = function() {
    if (window.webApp) {
        window.webApp.openProjectForm();
    }
};

window.closeProjectForm = function() {
    if (window.webApp) {
        window.webApp.closeProjectForm();
    }
};

window.submitProject = function() {
    if (window.webApp) {
        window.webApp.submitProject();
    }
};

window.browseEngineers = function() {
    if (window.webApp) {
        window.webApp.browseEngineers();
    }
};

window.hideEngineersSection = function() {
    if (window.webApp) {
        window.webApp.hideEngineersSection();
    }
};

window.viewProject = function(projectId) {
    if (window.webApp) {
        window.webApp.viewProject(projectId);
    }
};

window.findEngineersForProject = function(projectId) {
    if (window.webApp) {
        window.webApp.findEngineersForProject(projectId);
    }
};

window.editProject = function(projectId) {
    if (window.webApp) {
        window.webApp.editProject(projectId);
    }
};

window.closeProjectDetailsModal = function() {
    if (window.webApp) {
        window.webApp.closeProjectDetailsModal();
    }
};

window.debugData = function() {
    if (window.webApp) {
        window.webApp.debugData();
    }
};

window.addTestEngineers = function() {
    if (window.webApp) {
        window.webApp.addTestEngineers();
    }
};

window.clearAllData = function() {
    if (window.webApp) {
        window.webApp.clearAllData();
    }
};

// Project Request System Global Functions
window.sendProjectRequest = function(engineerId) {
    if (window.webApp) {
        window.webApp.sendProjectRequest(engineerId);
    }
};

window.submitProjectRequest = function(engineerId) {
    if (window.webApp) {
        window.webApp.submitProjectRequest(engineerId);
    }
};

window.acceptProjectRequest = function(requestId) {
    if (window.webApp) {
        window.webApp.acceptProjectRequest(requestId);
    }
};

window.rejectProjectRequest = function(requestId) {
    if (window.webApp) {
        window.webApp.rejectProjectRequest(requestId);
    }
};

window.switchEngineerTab = function(tabName) {
    if (window.webApp) {
        window.webApp.switchEngineerTab(tabName);
    }
};

window.showProjectRequests = function() {
    if (window.webApp) {
        window.webApp.showProjectRequests();
    }
};

window.hideProjectRequestsSection = function() {
    if (window.webApp) {
        window.webApp.hideProjectRequestsSection();
    }
};

window.viewProjectDetails = function(projectId) {
    if (window.webApp) {
        window.webApp.viewProjectDetails(projectId);
    }
};



window.createTestClientData = function() {
    if (window.webApp) {
        window.webApp.createTestClientData();
    }
};

window.testClientDashboard = function() {
    if (window.webApp) {
        window.webApp.testClientDashboard();
    }
};

window.checkWebAppState = function() {
    console.log('=== WEBAPP STATE CHECK ===');
    console.log('window.webApp exists:', !!window.webApp);
    if (window.webApp) {
        console.log('Current user:', window.webApp.currentUser);
        console.log('Current user role:', window.webApp.currentUser?.role);
        console.log('Current page:', window.webApp.currentPage);
        console.log('Data loaded:', !!window.webApp.data);
        console.log('Is authenticated:', window.webApp.isAuthenticated());
        
        // Check dashboard elements
        const clientDashboard = document.getElementById('client-dashboard');
        const engineerDashboard = document.getElementById('engineer-dashboard');
        const dashboardPage = document.getElementById('dashboard');
        
        console.log('Client dashboard element:', !!clientDashboard);
        console.log('Client dashboard display:', clientDashboard?.style.display);
        console.log('Engineer dashboard element:', !!engineerDashboard);
        console.log('Engineer dashboard display:', engineerDashboard?.style.display);
        console.log('Dashboard page element:', !!dashboardPage);
        console.log('Dashboard page classes:', dashboardPage?.className);
        
        // Check button states
        const editBtn = document.getElementById('edit-profile-btn');
        const clientDashboardBtn = document.getElementById('show-client-dashboard-btn');
        
        console.log('Edit profile button:', !!editBtn);
        console.log('Edit profile button display:', editBtn?.style.display);
        console.log('Show client dashboard button:', !!clientDashboardBtn);
        console.log('Show client dashboard button display:', clientDashboardBtn?.style.display);
    }
};



// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WebApp;
}

window.refreshDashboard = function() {
    console.log('=== REFRESH DASHBOARD ===');
    if (window.webApp && window.webApp.currentUser) {
        console.log('Refreshing dashboard for user:', window.webApp.currentUser.username);
        console.log('User role:', window.webApp.currentUser.role);
        
        // Force re-initialize dashboard
        window.webApp.initializeDashboard();
    } else {
        console.error('No user logged in or WebApp not available');
    }
};

// New Workflow Global Functions
window.startEngineerExploration = function() {
    if (window.webApp) {
        window.webApp.startEngineerExploration();
    }
};

window.browseEngineersFromForm = function() {
    if (window.webApp) {
        window.webApp.browseEngineersFromForm();
    }
};

window.changeEngineerSelection = function() {
    if (window.webApp) {
        window.webApp.changeEngineerSelection();
    }
};

window.showClientDashboard = function() {
    if (window.webApp) {
        window.webApp.showClientDashboard();
    }
};

    // Direct function to show engineer exploration
window.showEngineerExploration = function() {
    console.log('=== SHOW ENGINEER EXPLORATION DIRECT ===');
    
    // Force show client dashboard
    const clientDashboard = document.getElementById('client-dashboard');
    if (clientDashboard) {
        clientDashboard.style.display = 'block';
        console.log('Client dashboard shown');
    }
    
    // Show workflow steps
    const workflowSteps = document.querySelector('.workflow-steps');
    if (workflowSteps) {
        workflowSteps.style.display = 'flex';
        console.log('Workflow steps shown');
    }
    
    // Show the engineer exploration button
    const exploreBtn = document.querySelector('button[onclick="startEngineerExploration()"]');
    if (exploreBtn) {
        exploreBtn.style.display = 'inline-flex';
        console.log('Engineer exploration button shown');
    }
    
    // Show engineers browser section
    const engineersBrowser = document.getElementById('engineers-browser');
    if (engineersBrowser) {
        engineersBrowser.style.display = 'block';
        engineersBrowser.style.visibility = 'visible';
        engineersBrowser.style.opacity = '1';
        engineersBrowser.style.height = 'auto';
        engineersBrowser.style.overflow = 'visible';
        console.log('Engineers browser shown');
        console.log('Engineers browser style:', engineersBrowser.style.display);
    }
    
    // Add test engineers if none exist
    if (window.webApp && (!window.webApp.data.registeredUsers || window.webApp.data.registeredUsers.length === 0)) {
        console.log('No engineers found, adding test engineers...');
        window.webApp.addTestEngineers();
    }
    
    // Load engineers list
    if (window.webApp) {
        window.webApp.loadEngineersList();
    }
    
    // Debug: Check if elements are actually visible
    setTimeout(() => {
        const engineersBrowser = document.getElementById('engineers-browser');
        const engineersList = document.getElementById('engineers-list');
        const workflowSteps = document.querySelector('.workflow-steps');
        
        console.log('=== DEBUGGING ELEMENT VISIBILITY ===');
        console.log('Engineers browser element:', engineersBrowser);
        console.log('Engineers browser display:', engineersBrowser?.style.display);
        console.log('Engineers browser computed style:', engineersBrowser ? window.getComputedStyle(engineersBrowser).display : 'N/A');
        console.log('Engineers list element:', engineersList);
        console.log('Engineers list innerHTML length:', engineersList?.innerHTML.length || 0);
        console.log('Workflow steps element:', workflowSteps);
        console.log('Workflow steps display:', workflowSteps?.style.display);
        
        // Force scroll to engineers section
        if (engineersBrowser) {
            engineersBrowser.scrollIntoView({ behavior: 'smooth', block: 'start' });
            console.log('Scrolled to engineers browser');
        }
    }, 500);
    
    console.log('Engineer exploration interface should now be visible');
};

// Function to add test engineers
window.addTestEngineers = function() {
    if (window.webApp) {
        window.webApp.addTestEngineers();
    }
};

// Force show everything with maximum visibility
window.forceShowEverything = function() {
    console.log('=== FORCE SHOW EVERYTHING ===');
    
    // Show client dashboard
    const clientDashboard = document.getElementById('client-dashboard');
    if (clientDashboard) {
        clientDashboard.style.display = 'block';
        clientDashboard.style.visibility = 'visible';
        clientDashboard.style.opacity = '1';
        clientDashboard.style.position = 'relative';
        clientDashboard.style.zIndex = '9999';
        console.log('Client dashboard forced visible');
    }
    
    // Show workflow steps
    const workflowSteps = document.querySelector('.workflow-steps');
    if (workflowSteps) {
        workflowSteps.style.display = 'flex';
        workflowSteps.style.visibility = 'visible';
        workflowSteps.style.opacity = '1';
        workflowSteps.style.position = 'relative';
        workflowSteps.style.zIndex = '9999';
        console.log('Workflow steps forced visible');
    }
    
    // Show engineers browser
    const engineersBrowser = document.getElementById('engineers-browser');
    if (engineersBrowser) {
        engineersBrowser.style.display = 'block';
        engineersBrowser.style.visibility = 'visible';
        engineersBrowser.style.opacity = '1';
        engineersBrowser.style.position = 'relative';
        engineersBrowser.style.zIndex = '9999';
        engineersBrowser.style.backgroundColor = '#f0f8ff';
        engineersBrowser.style.border = '2px solid #007bff';
        engineersBrowser.style.padding = '20px';
        engineersBrowser.style.margin = '20px 0';
        console.log('Engineers browser forced visible');
    }
    
    // Show engineers list
    const engineersList = document.getElementById('engineers-list');
    if (engineersList) {
        engineersList.style.display = 'block';
        engineersList.style.visibility = 'visible';
        engineersList.style.opacity = '1';
        engineersList.style.backgroundColor = '#ffffff';
        engineersList.style.border = '1px solid #ddd';
        engineersList.style.padding = '10px';
        console.log('Engineers list forced visible');
    }
    
    // Load engineers if webApp exists
    if (window.webApp) {
        window.webApp.loadEngineersList();
    }
    
    console.log('Everything should now be visible with forced styling');
};

// Debug function to check project requests
window.debugProjectRequests = function() {
    if (window.webApp) {
        console.log('=== DEBUG PROJECT REQUESTS ===');
        console.log('Current user:', window.webApp.currentUser);
        console.log('All project requests:', window.webApp.data?.projectRequests);
        
        if (window.webApp.data?.projectRequests) {
            window.webApp.data.projectRequests.forEach((request, index) => {
                console.log(`Request ${index + 1}:`, request);
                console.log(`  - Engineer ID: ${request.engineerId} (${typeof request.engineerId})`);
                console.log(`  - Client ID: ${request.clientId} (${typeof request.clientId})`);
                console.log(`  - Status: ${request.status}`);
            });
        }
        
        // Try to load engineer requests
        if (window.webApp.currentUser?.role === 'engineer') {
            console.log('Loading engineer project requests...');
            window.webApp.loadEngineerProjectRequests();
        }
    }
};

// Force refresh data from localStorage
window.refreshDataFromStorage = function() {
    if (window.webApp) {
        console.log('=== REFRESHING DATA FROM STORAGE ===');
        
        // Reload data from localStorage
        window.webApp.loadData();
        
        console.log('Data refreshed from localStorage');
        console.log('Project requests count:', window.webApp.data?.projectRequests?.length || 0);
        
        // Reload engineer requests if current user is engineer
        if (window.webApp.currentUser?.role === 'engineer') {
            window.webApp.loadEngineerProjectRequests();
        }
    }
};

// Create a test project request for debugging
window.createTestProjectRequest = function() {
    if (window.webApp) {
        console.log('=== CREATING TEST PROJECT REQUEST ===');
        
        // Find an engineer
        const engineer = window.webApp.data.registeredUsers.find(u => u.role === 'engineer');
        if (!engineer) {
            console.error('No engineer found to create test request');
            return;
        }
        
        // Create test project request
        const testRequest = {
            id: Date.now() + Math.random(),
            projectId: 'test-project-' + Date.now(),
            projectName: 'Test Building Project',
            projectType: 'Residential',
            clientId: window.webApp.currentUser?.id || 'test-client',
            clientName: window.webApp.currentUser?.username || 'Test Client',
            clientEmail: window.webApp.currentUser?.email || 'test@client.com',
            engineerId: engineer.id,
            engineerName: engineer.username,
            engineerEmail: engineer.email,
            status: 'pending',
            createdAt: new Date().toISOString(),
            message: 'This is a test project request for debugging',
            projectDetails: {
                buildingSize: '1000 sq ft',
                budget: '$50,000',
                timeline: '3 months',
                description: 'Test project description'
            }
        };
        
        // Add to project requests
        if (!window.webApp.data.projectRequests) {
            window.webApp.data.projectRequests = [];
        }
        window.webApp.data.projectRequests.push(testRequest);
        
        // Save to storage
        window.webApp.saveDataToJSON();
        
        console.log('Test project request created:', testRequest);
        console.log('Total project requests:', window.webApp.data.projectRequests.length);
        
        // Reload engineer requests if current user is engineer
        if (window.webApp.currentUser?.role === 'engineer') {
            window.webApp.loadEngineerProjectRequests();
        }
        
        window.webApp.showSuccess('Test project request created!');
    }
};

// Create a test accepted project for debugging
window.createTestAcceptedProject = function() {
    if (window.webApp) {
        console.log('=== CREATING TEST ACCEPTED PROJECT ===');
        
        // Find an engineer
        const engineer = window.webApp.data.registeredUsers.find(u => u.role === 'engineer');
        if (!engineer) {
            console.error('No engineer found to create test accepted project');
            return;
        }
        
        // Create test accepted project
        const testAcceptedProject = {
            id: Date.now() + Math.random(),
            projectId: 'test-accepted-project-' + Date.now(),
            projectName: 'Test Accepted Building Project',
            projectType: 'Commercial',
            clientId: window.webApp.currentUser?.id || 'test-client',
            clientName: window.webApp.currentUser?.username || 'Test Client',
            clientEmail: window.webApp.currentUser?.email || 'test@client.com',
            engineerId: engineer.id,
            engineerName: engineer.username,
            engineerEmail: engineer.email,
            status: 'accepted',
            createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
            acceptedAt: new Date().toISOString(),
            message: 'This is a test accepted project for debugging',
            projectDetails: {
                buildingSize: '2000 sq ft',
                budget: '$100,000',
                timeline: '6 months',
                description: 'Test accepted project description'
            }
        };
        
        // Add to project requests
        if (!window.webApp.data.projectRequests) {
            window.webApp.data.projectRequests = [];
        }
        window.webApp.data.projectRequests.push(testAcceptedProject);
        
        // Save to storage
        window.webApp.saveDataToJSON();
        
        console.log('Test accepted project created:', testAcceptedProject);
        console.log('Total project requests:', window.webApp.data.projectRequests.length);
        
        // Reload engineer accepted projects if current user is engineer
        if (window.webApp.currentUser?.role === 'engineer') {
            window.webApp.loadEngineerAcceptedProjects();
        }
        
        window.webApp.showSuccess('Test accepted project created!');
    }
};

// Project Steps Management Functions
window.viewProjectSteps = function(requestId) {
    if (window.webApp) {
        window.webApp.viewProjectSteps(requestId);
    }
};

window.addProjectStep = function() {
    if (window.webApp) {
        window.webApp.addProjectStep();
    }
};

window.editProjectStep = function(stepId) {
    if (window.webApp) {
        window.webApp.editProjectStep(stepId);
    }
};

window.deleteProjectStep = function(stepId) {
    if (window.webApp) {
        window.webApp.deleteProjectStep(stepId);
    }
};

window.saveProjectStep = function(stepId) {
    if (window.webApp) {
        window.webApp.saveProjectStep(stepId);
    }
};

window.cancelEditStep = function(stepId) {
    if (window.webApp) {
        window.webApp.cancelEditStep(stepId);
    }
};

window.closeProjectStepsModal = function() {
    if (window.webApp) {
        window.webApp.closeProjectStepsModal();
    }
};

window.saveProjectSteps = function() {
    if (window.webApp) {
        window.webApp.saveProjectSteps();
    }
};

window.handleStepImageUpload = function(stepId, input) {
    if (window.webApp) {
        window.webApp.handleStepImageUpload(stepId, input);
    }
};

window.removeStepImage = function(imageUrl) {
    if (window.webApp) {
        window.webApp.removeStepImage(imageUrl);
    }
};

// Client Project Steps View Functions
window.viewProjectStepsAsClient = function(requestId) {
    if (window.webApp) {
        window.webApp.viewProjectStepsAsClient(requestId);
    }
};

window.closeClientProjectStepsModal = function() {
    if (window.webApp) {
        window.webApp.closeClientProjectStepsModal();
    }
};

// Admin Dashboard Functions
window.showAdminDashboard = function() {
    if (window.webApp) {
        window.webApp.showAdminDashboard();
    }
};

window.selectEngineerRow = function(engineerId) {
    if (window.webApp) {
        window.webApp.selectEngineerRow(engineerId);
    }
};

window.simpleTest = function() {
    console.log('=== SIMPLE TEST ===');
    
    // Direct DOM manipulation test
    const clientDashboard = document.getElementById('client-dashboard');
    const engineerDashboard = document.getElementById('engineer-dashboard');
    
    console.log('Client dashboard element:', clientDashboard);
    console.log('Engineer dashboard element:', engineerDashboard);
    
    // Force show client dashboard for testing
    if (clientDashboard) {
        clientDashboard.style.display = 'block';
        console.log('Client dashboard forced to display');
        
        // Also try to show the workflow steps
        const workflowSteps = document.querySelector('.workflow-steps');
        console.log('Workflow steps element:', workflowSteps);
        
        if (workflowSteps) {
            workflowSteps.style.display = 'flex';
            console.log('Workflow steps displayed');
        }
    }
    
    if (clientDashboard) {
        console.log('Before - Client dashboard display:', clientDashboard.style.display);
        console.log('Before - Client dashboard visibility:', clientDashboard.style.visibility);
        console.log('Before - Client dashboard opacity:', clientDashboard.style.opacity);
        
        // Force show client dashboard
        clientDashboard.style.display = 'block';
        clientDashboard.style.visibility = 'visible';
        clientDashboard.style.opacity = '1';
        clientDashboard.style.position = 'relative';
        clientDashboard.style.zIndex = '1000';
        
        console.log('After - Client dashboard display:', clientDashboard.style.display);
        console.log('After - Client dashboard visibility:', clientDashboard.style.visibility);
        console.log('After - Client dashboard opacity:', clientDashboard.style.opacity);
        
        // Hide engineer dashboard
        if (engineerDashboard) {
            engineerDashboard.style.display = 'none';
            console.log('Engineer dashboard hidden');
        }
        
        console.log('Simple test completed');
    } else {
        console.error('Client dashboard element not found!');
    }
};

// Enhanced Navbar Functions
window.toggleUserDropdown = function() {
    const dropdown = document.getElementById('user-dropdown-menu');
    const userInfo = document.querySelector('.nav-user-info');
    
    if (dropdown && userInfo) {
        const isVisible = dropdown.style.display !== 'none';
        
        if (isVisible) {
            dropdown.style.display = 'none';
            userInfo.classList.remove('active');
        } else {
            dropdown.style.display = 'block';
            userInfo.classList.add('active');
        }
    }
};

window.goToDashboard = function() {
    if (window.webApp && window.webApp.currentUser) {
        // Close dropdown
        window.toggleUserDropdown();
        
        // Navigate to dashboard
        window.webApp.showPage('dashboard');
        window.webApp.updateDashboard();
    }
};

window.goToProfile = function() {
    if (window.webApp && window.webApp.currentUser) {
        // Close dropdown
        window.toggleUserDropdown();
        
        // Navigate to appropriate profile based on role
        if (window.webApp.currentUser.role === 'engineer') {
            window.webApp.showPage('engineer-dashboard');
            window.webApp.showEngineerDashboard();
        } else if (window.webApp.currentUser.role === 'client') {
            window.webApp.showPage('client-dashboard');
            window.webApp.showClientDashboard();
        } else if (window.webApp.currentUser.role === 'admin') {
            window.webApp.showPage('admin-dashboard');
            window.webApp.showAdminDashboard();
        }
    }
};

window.logout = function() {
    if (window.webApp) {
        // Close dropdown
        window.toggleUserDropdown();
        
        // Perform logout
        window.webApp.logout();
    }
};

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('user-dropdown-menu');
    const userProfile = document.getElementById('user-profile-dropdown');
    
    if (dropdown && userProfile && !userProfile.contains(event.target)) {
        dropdown.style.display = 'none';
        const userInfo = document.querySelector('.nav-user-info');
        if (userInfo) {
            userInfo.classList.remove('active');
        }
    }
});

// User CRUD Global Functions
window.openAddUserModal = function() {
    if (window.webApp) {
        window.webApp.openAddUserModal();
    }
};

window.editUser = function(userId) {
    if (window.webApp) {
        window.webApp.editUser(userId);
    }
};

window.viewUser = function(userId) {
    if (window.webApp) {
        window.webApp.viewUser(userId);
    }
};

window.deleteUser = function(userId) {
    if (window.webApp) {
        window.webApp.deleteUser(userId);
    }
};

window.saveUser = function(event) {
    if (window.webApp) {
        window.webApp.saveUser(event);
    }
};

window.confirmDeleteUser = function() {
    if (window.webApp) {
        window.webApp.confirmDeleteUser();
    }
};

window.closeUserModal = function() {
    if (window.webApp) {
        window.webApp.closeUserModal();
    }
};

window.closeDeleteUserModal = function() {
    if (window.webApp) {
        window.webApp.closeDeleteUserModal();
    }
};

window.closeViewUserModal = function() {
    if (window.webApp) {
        window.webApp.closeViewUserModal();
    }
};

window.editUserFromView = function() {
    if (window.webApp) {
        window.webApp.closeViewUserModal();
        // Get the user ID from the view modal and edit
        const userDetails = document.getElementById('user-details-content');
        const userId = userDetails.dataset.userId;
        if (userId) {
            window.webApp.editUser(userId);
        }
    }
};

window.toggleRoleFields = function() {
    const roleSelect = document.getElementById('user-role');
    const engineerFields = document.getElementById('engineer-fields');
    
    if (roleSelect && engineerFields) {
        if (roleSelect.value === 'engineer') {
            engineerFields.style.display = 'block';
        } else {
            engineerFields.style.display = 'none';
        }
    }
};

window.refreshUsersTable = function() {
    if (window.webApp) {
        window.webApp.loadUsersTable();
    }
};

window.toggleSelectAllUsers = function() {
    const selectAllCheckbox = document.getElementById('select-all-users');
    const userCheckboxes = document.querySelectorAll('.user-checkbox');
    
    if (selectAllCheckbox && userCheckboxes) {
        userCheckboxes.forEach(checkbox => {
            checkbox.checked = selectAllCheckbox.checked;
        });
        updateBulkActions();
    }
};

window.updateBulkActions = function() {
    const userCheckboxes = document.querySelectorAll('.user-checkbox:checked');
    const bulkDeleteBtn = document.getElementById('bulk-delete-btn');
    
    if (bulkDeleteBtn) {
        if (userCheckboxes.length > 0) {
            bulkDeleteBtn.style.display = 'inline-flex';
            bulkDeleteBtn.innerHTML = `<i class="fas fa-trash"></i> Delete Selected (${userCheckboxes.length})`;
        } else {
            bulkDeleteBtn.style.display = 'none';
        }
    }
};

window.bulkDeleteUsers = function() {
    const userCheckboxes = document.querySelectorAll('.user-checkbox:checked');
    const userIds = Array.from(userCheckboxes).map(cb => cb.value);
    
    if (userIds.length === 0) {
        if (window.webApp) {
            window.webApp.showNotification('No users selected', 'error');
        }
        return;
    }
    
    if (confirm(`Are you sure you want to delete ${userIds.length} user(s)? This action cannot be undone.`)) {
        if (window.webApp) {
            userIds.forEach(userId => {
                // Don't allow deleting the main admin user
                if (userId == 1) {
                    window.webApp.showNotification('Cannot delete the main admin user', 'error');
                    return;
                }
                
                // Remove from users array
                if (window.webApp.data.users) {
                    window.webApp.data.users = window.webApp.data.users.filter(u => u.id != userId);
                }
                
                // Remove from registeredUsers array
                if (window.webApp.data.registeredUsers) {
                    window.webApp.data.registeredUsers = window.webApp.data.registeredUsers.filter(u => u.id != userId);
                }
            });
            
            window.webApp.saveDataToJSON();
            window.webApp.showNotification(`${userIds.length} user(s) deleted successfully`, 'success');
            window.webApp.loadUsersTable();
        }
    }
};