# Jignesh Rathod - Flutter Developer Portfolio

A modern, responsive portfolio website showcasing Flutter development skills and projects.

## 🚀 Features

- **Modern Design**: Neon cyberpunk theme with smooth animations
- **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive**: Smooth scrolling, typing effects, and hover animations
- **Contact Form**: Functional contact form with validation
- **Portfolio Showcase**: Display your projects with technology tags
- **Skills Section**: Highlight your technical expertise
- **Experience Timeline**: Professional experience and education history

## 📁 File Structure

```
portfolio/
├── index.html          # Main HTML structure
├── style.css           # All styling and animations
├── script.js           # JavaScript functionality
├── PHOTO.jpg           # Your profile photo
└── README.md           # This file
```

## 🔧 What Was Fixed

### 1. **Missing Images**
- ✅ Fixed broken image references in About section
- ✅ Replaced missing project images with placeholder images
- ✅ Updated image preloading to use existing files

### 2. **Contact Form**
- ✅ Added proper form validation
- ✅ Implemented demo email sending functionality
- ✅ Added instructions for EmailJS integration

### 3. **CSS Issues**
- ✅ Fixed invalid CSS group selector syntax
- ✅ Improved mobile navigation responsiveness
- ✅ Fixed back-to-top button initial state

### 4. **JavaScript Functionality**
- ✅ Added CV download functionality (demo mode)
- ✅ Improved error handling for images
- ✅ Enhanced mobile menu functionality

## 🎨 Customization Guide

### 1. **Personal Information**
Edit `index.html` to update:
- Your name and title
- Contact information
- Social media links
- About section content

### 2. **Profile Photo**
- Replace `PHOTO.jpg` with your professional photo
- Recommended size: 400x400px or larger (square aspect ratio)

### 3. **Project Images**
To add real project images:
1. Add your project images to the project folder
2. Update the `src` attributes in the portfolio section
3. Update the `preloadResources()` function in `script.js`

### 4. **Contact Form Setup**
To enable real email sending:
1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an email service (Gmail, Outlook, etc.)
3. Create an email template
4. Update the EmailJS configuration in `script.js`:
   ```javascript
   emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
       // your template variables
   });
   ```

### 5. **CV Download**
To enable CV download:
1. Add your CV file (e.g., `jignesh-rathod-cv.pdf`) to the project
2. Uncomment and update the download code in `script.js`

### 6. **Colors and Theme**
Edit CSS variables in `style.css`:
```css
:root {
    --neon-cyan: #00ffff;
    --neon-purple: #c77dff;
    --neon-pink: #ff1cf7;
    --neon-green: #39ff14;
    --neon-orange: #ff7f00;
    --neon-blue: #4169e1;
}
```

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: Below 768px

## 🚀 Deployment

### GitHub Pages
1. Push your code to a GitHub repository
2. Go to Settings > Pages
3. Select source branch (usually `main`)
4. Your portfolio will be available at `https://username.github.io/repository-name`

### Netlify
1. Drag and drop your project folder to [Netlify](https://netlify.com)
2. Your site will be deployed instantly
3. Customize the URL in the site settings

### Vercel
1. Connect your GitHub repository to [Vercel](https://vercel.com)
2. Deploy automatically on every push
3. Get a custom domain and SSL certificate

## 🛠️ Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📞 Support

If you need help customizing your portfolio:
1. Check the comments in the code files
2. Refer to this README
3. Contact me for assistance

## 📄 License

This portfolio template is free to use and modify for personal and commercial projects.

---

**Made with ❤️ by Jignesh Rathod**
