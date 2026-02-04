# Neural BKT Setup Guide

## What You Have Now

Your application now uses **Advanced Neural BKT** with:
- ✅ **Multidimensional student abilities** (4 dimensions)
- ✅ **5 student prototypes** (Fast Learner, Careful Student, etc.)
- ✅ **Sequential Bayesian updating** (automatic student classification)
- ✅ **IRT integration** (difficulty-adjusted parameters)
- ✅ **Automatic fallback** to local BKT if FastAPI is unavailable

## Architecture

```
┌─────────────┐         ┌──────────────┐         ┌────────────┐
│  Vue.js App │ ──────> │ FastAPI      │ ──────> │ Neural BKT │
│  (Frontend) │ <────── │ (Port 8000)  │ <────── │ Engine     │
└─────────────┘         └──────────────┘         └────────────┘
       │                       │
       │                       │
       ↓                       ↓
┌─────────────────────────────────┐
│        PocketBase               │
│  (Stores BKT states)            │
└─────────────────────────────────┘
```

## Quick Start

### 1. Start Docker Containers

```bash
# Navigate to project directory
cd c:\Users\couga\Documents\statassignments

# Build and start all services
docker-compose up -d --build

# Check status
docker-compose ps

# View logs
docker-compose logs -f fastapi
```

You should see:
- **PocketBase**: http://localhost:8090
- **FastAPI**: http://localhost:8000
- **FastAPI Docs**: http://localhost:8000/docs

### 2. Verify FastAPI is Running

Open browser to **http://localhost:8000/health**

You should see:
```json
{
  "status": "healthy",
  "model_loaded": true,
  "num_prototypes": 5,
  "timestamp": "..."
}
```

### 3. Start Vue.js Development Server

```bash
# In a new terminal
npm run dev
```

Your app will be at **http://localhost:5173**

### 4. Test the Integration

1. **Sign in** to your app
2. **Answer a practice question**
3. **Check the console** - you should see:
   ```
   [Neural BKT] Updated M1-O1: { mastery: '15%', prototype: 'multidimensional' }
   ```

If you see `[Local BKT]` instead, the FastAPI backend isn't reachable.

## Testing Neural BKT Features

### View Student Profile

Add this to your Profile.vue or create a test component:

```vue
<script setup>
import { ref, onMounted } from 'vue'
import { useBKT } from '../composables/useBKT'

const { getStudentProfile } = useBKT()
const profile = ref(null)

onMounted(async () => {
  profile.value = await getStudentProfile()
  console.log('Student Profile:', profile.value)
})
</script>

<template>
  <div v-if="profile">
    <h3>Your Learning Profile: {{ profile.prototypeName }}</h3>
    <p>Learning Rate: {{ (profile.learningRate * 100).toFixed(0) }}%</p>
    <p>Retention: {{ (profile.retention * 100).toFixed(0) }}%</p>
    <p>Confidence: {{ (profile.confidence * 100).toFixed(0) }}%</p>
  </div>
</template>
```

### Get Performance Predictions

```javascript
import { useBKT } from '../composables/useBKT'

const { predictPerformance } = useBKT()

// Get predictions for multiple objectives
const predictions = await predictPerformance(['M1-O1', 'M1-O2', 'M2-O1'])

predictions.forEach(pred => {
  console.log(`${pred.objectiveId}: ${(pred.predictedCorrectProb * 100).toFixed(0)}% chance correct`)
  console.log(`Recommended difficulty: ${pred.recommendedDifficulty}`)
})
```

### View All Prototypes

```javascript
import { useBKT } from '../composables/useBKT'

const { getAllPrototypes } = useBKT()

const prototypes = await getAllPrototypes()
console.log('Available prototypes:', prototypes)
```

## Configuration

### Toggle Between Neural and Local BKT

In `src/composables/useBKT.js`:

```javascript
// Line 16
const USE_NEURAL_BKT = true  // Set to false to use local BKT only
```

### Change FastAPI URL (for production)

In `.env`:

```
VITE_FASTAPI_URL=https://your-fastapi-domain.com
```

## Student Prototypes

Your students are automatically classified into one of 5 prototypes:

| Prototype | Learning | Retention | Guessing | Not-Slipping |
|-----------|----------|-----------|----------|--------------|
| Fast Learner | 25% | 95% | 30% | 80% |
| Careful Student | 15% | 85% | 15% | 90% |
| Struggling Student | 10% | 70% | 35% | 50% |
| Inconsistent Student | 12% | 75% | 25% | 60% |
| Average Student | 15% | 80% | 25% | 70% |

As students answer questions, the system automatically updates the probability of each prototype, giving increasingly personalized predictions.

## Troubleshooting

### FastAPI Not Starting

```bash
# Check Docker logs
docker-compose logs fastapi

# Common issues:
# 1. Port 8000 already in use
#    Solution: Change port in docker-compose.yml

# 2. Build failed
#    Solution: docker-compose build --no-cache fastapi

# 3. Python dependencies error
#    Solution: Check backend/requirements.txt
```

### Vue App Not Connecting to FastAPI

1. Check `.env` has correct `VITE_FASTAPI_URL`
2. Restart Vue dev server after changing `.env`
3. Check browser console for CORS errors
4. Verify FastAPI health: http://localhost:8000/health

### Falling Back to Local BKT

Check console logs:
```
[Local BKT] Updated M1-O1
```

This means:
- FastAPI is not reachable
- OR `USE_NEURAL_BKT = false` in useBKT.js
- Application still works, just without advanced features

### CORS Errors

FastAPI is configured to allow localhost. If you get CORS errors:

1. Check FastAPI logs: `docker-compose logs fastapi`
2. Verify your Vue dev server port matches CORS settings in `backend/main.py`
3. Add your production domain to CORS origins

## Next Steps

### 1. View Neural BKT in Action

Create a component to display student profiles:

```bash
# Create the component
```

I can help you create a beautiful UI component to show:
- Student prototype classification
- Learning ability dimensions
- Mastery predictions for each objective

### 2. Add Admin Analytics

In your Admin dashboard, add:
- Distribution of students across prototypes
- Average learning rates by prototype
- Prediction accuracy metrics

### 3. Train Custom Prototypes

Once you have student data, you can:
- Analyze student performance patterns
- Create custom prototypes specific to your course
- Optimize prototype parameters

## API Reference

Full API docs available at: **http://localhost:8000/docs**

Key endpoints:
- `POST /bkt/update` - Update BKT after answer
- `GET /student/profile/{user_id}` - Get student profile
- `POST /predict` - Predict performance
- `GET /admin/prototypes` - List all prototypes

## Performance

- **Local BKT**: ~1-2ms per update
- **Neural BKT**: ~10-50ms per update (includes API call)
- **Fallback**: Automatic if FastAPI >500ms response

## Support

Having issues? Check:
1. Docker containers running: `docker-compose ps`
2. FastAPI health: http://localhost:8000/health
3. Browser console for errors
4. Docker logs: `docker-compose logs -f fastapi`
