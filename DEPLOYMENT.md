# Deployment Guide for Coinbase Fullstack

## Overview
This application consists of a Node.js/Express backend and a React/Vite frontend. The deployment configurations support Render.com.

## Prerequisites
- Node.js 24.x (set in render.yaml)
- MongoDB Atlas account with connection string
- Render.com account

## Deployment Setup

### Backend (.env Configuration)
The backend uses the following environment variables:
```
PORT=5000
MONGO_URI=mongodb+srv://[username]:[password]@[cluster]/[database]
JWT_SECRET=your-secret-key
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

**Important**: Ensure each variable is on its own line in the .env file.

### Frontend (.env Configuration)
**Development (.env)**:
```
VITE_API_URL=http://localhost:5000
```

**Production (.env.production)**:
```
VITE_API_URL=https://coinbase-fullstack-backend.onrender.com
```

The frontend automatically uses the correct environment file based on the build mode.

## Deployment Files

### render.yaml
- Configures both backend and frontend services
- Specifies build commands with proper directory navigation
- Sets environment variables for production

### Procfile
- Backup configuration for alternative hosting platforms
- Defines:  `web: cd backend && npm start`

## Deployment Steps on Render

### 1. Connect Your Repository
- Go to render.com and create a new service
- Connect your GitHub repository
- Select the branch to deploy

### 2. Backend Deployment
- **Service Type**: Web Service
- **Runtime**: Node.js
- **Build Command**: `cd backend && npm install`
- **Start Command**: `cd backend && npm start`
- **Environment Variables**:
  - Copy all variables from `.env` to Render dashboard
  - Ensure JWT_SECRET is securely set

### 3. Frontend Deployment
- **Service Type**: Static Site
- **Runtime**: Static
- **Build Command**: `cd frontend && npm install && npm run build`
- **Publish Directory**: `frontend/dist`
- **Environment Variables**:
  - `VITE_API_URL=https://[backend-service-url].onrender.com`

### 4. API Integration
- The frontend will automatically use the production API URL during build
- All fetch calls use the `getApiUrl()` function from `utils/api.js`

## Testing Deployment

### Before Deploying
1. Test locally: `npm start` in backend, `npm run dev` in frontend
2. Verify all API endpoints work
3. Test authentication flow
4. Check database connectivity

### After Deploying
1. Verify backend is responding on the provided URL
2. Test frontend can load and authenticate
3. Check browser console for any CORS or API errors
4. Monitor Render logs for issues

## Common Issues & Fixes

### Issue: "Cannot find module '/opt/render/project/src/start'"
**Solution**: Ensure render.yaml or Procfile correctly specifies the start command with proper directory navigation.

### Issue: Frontend shows Cannot GET /
**Solution**: Verify the build command ran successfully and the dist directory was created.

### Issue: CORS errors in browser
**Solution**: Backend must have CORS enabled:
```javascript
app.use(cors({
  origin: ['https://frontend-url.onrender.com', 'http://localhost:5173'],
  credentials: true
}));
```

### Issue: API calls fail with 404
**Solution**: Verify VITE_API_URL is correctly set in .env.production and points to the backend URL.

## File Structure for Deployment
```
.
├── backend/
│   ├── src/
│   │   └── app.js
│   ├── package.json
│   └── .env
├── frontend/
│   ├── src/
│   │   └── utils/api.js
│   ├── package.json
│   ├── .env
│   └── .env.production
├── render.yaml
├── Procfile
└── README.md
```

## Environment Variable Reference

### Backend Required Variables
- `PORT`: Application port (default: 5000)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT tokens
- `EMAIL_USER`: Email for sending verification codes
- `EMAIL_PASS`: App-specific password for email

### Frontend Build Variables
- `VITE_API_URL`: Backend API URL (set per environment)

## Monitoring & Logs

### Render Dashboard
- Logs are available in the Render dashboard
- Monitor for MongoDB connection issues
- Check for CORS errors
- View deployment history and rebuild logs

### Health Checks
- Backend: `GET /api/health`
- Frontend: Check homepage loads without errors

## Scaling Considerations
- **Free Tier Limitations**: Services spin down after 15 minutes of inactivity
- **Performance**: Consider upgrading to paid tier for production use
- **Database**: Ensure MongoDB Atlas tier supports your expected load

## Security Checklist
- [ ] All environment variables set in Render
- [ ] CORS properly configured for frontend domain
- [ ] JWT_SECRET is strong and unique
- [ ] Email credentials use app-specific passwords
- [ ] MongoDB connection uses strong credentials
- [ ] HTTPS enforced (automatic on Render)

## Rollback Procedure
1. Go to Render dashboard
2. Navigate to deployment history
3. Select previous working deployment
4. Click "Redeploy"

For more help, check Render documentation: https://render.com/docs
