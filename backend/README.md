# Neural BKT FastAPI Backend

Advanced Bayesian Knowledge Tracing backend with multidimensional student abilities and prototype learning.

## Features

- **Multidimensional Student Abilities**: Tracks 4 dimensions (guessing, not-slipping, learning, retention)
- **Student Prototypes**: 5 pre-defined learning profiles that students are automatically classified into
- **Sequential Bayesian Updating**: Dynamically adjusts prototype probabilities based on performance
- **IRT Integration**: Difficulty-adjusted observation probabilities
- **RESTful API**: FastAPI endpoints for Vue.js frontend

## Quick Start

### Option 1: Docker (Recommended)

```bash
# From project root
docker-compose up -d

# API will be available at http://localhost:8000
# Docs at http://localhost:8000/docs
```

### Option 2: Local Development

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run server
uvicorn main:app --reload

# API at http://localhost:8000
```

## API Endpoints

### Health Check
```bash
GET /health
```

### Update BKT State
```bash
POST /bkt/update
{
  "user_id": "user123",
  "objective_id": "M1-O1",
  "is_correct": true,
  "difficulty": "medium"
}
```

### Get BKT State
```bash
GET /bkt/state/{user_id}/{objective_id}
```

### Get Student Profile
```bash
GET /student/profile/{user_id}
```
Returns the student's multidimensional ability profile and most likely prototype.

### Predict Performance
```bash
POST /predict
{
  "user_id": "user123",
  "objective_ids": ["M1-O1", "M1-O2", "M2-O1"]
}
```
Returns predicted probability of correct response for each objective.

### Admin: Get All Prototypes
```bash
GET /admin/prototypes
```

## Student Prototypes

The model uses 5 pre-defined student prototypes:

1. **Fast Learner**: High learning rate, excellent retention
2. **Careful Student**: Low guessing, very accurate when learned
3. **Struggling Student**: Slow learning, poor retention
4. **Inconsistent Student**: Moderate abilities, below average retention
5. **Average Student**: Standard parameters across all dimensions

Students are automatically classified into the prototype that best matches their performance pattern using sequential Bayesian updating.

## Architecture

Based on research from [KISRDevelopment/interpretable_student_models_paper_code](https://github.com/KISRDevelopment/interpretable_student_models_paper_code)

Key innovations:
- Multidimensional student ability modeling
- Student prototype generalization
- Sequential Bayesian model averaging
- IRT-integrated BKT

## Integration with Vue.js

Update your Vue.js `useBKT` composable to call the FastAPI backend:

```javascript
// In useBKT.js
const FASTAPI_URL = 'http://localhost:8000'

export async function updateBKT(objectiveId, isCorrect, difficulty = 'medium') {
  const userId = pb.authStore.record?.id

  const response = await fetch(`${FASTAPI_URL}/bkt/update`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      user_id: userId,
      objective_id: objectiveId,
      is_correct: isCorrect,
      difficulty: difficulty
    })
  })

  return await response.json()
}
```

## Development

### Project Structure
```
backend/
├── main.py              # FastAPI application
├── models/
│   ├── __init__.py
│   └── neural_bkt.py    # Neural BKT implementation
├── Dockerfile
├── requirements.txt
└── .env.example
```

### Adding New Prototypes

Edit `models/neural_bkt.py`:

```python
def _create_default_prototypes(self):
    return [
        StudentPrototype(
            id=5,
            name="Your Custom Prototype",
            guessing=0.3,
            not_slipping_boost=0.7,
            learning=0.18,
            retention=0.82
        ),
        # ... other prototypes
    ]
```

## Testing

```bash
# Test health endpoint
curl http://localhost:8000/health

# Test BKT update
curl -X POST http://localhost:8000/bkt/update \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "test123",
    "objective_id": "M1-O1",
    "is_correct": true,
    "difficulty": "medium"
  }'
```

## Next Steps

1. **Train Custom Prototypes**: Use your student data to learn optimal prototype parameters
2. **Add PyTorch**: Uncomment PyTorch in requirements.txt for neural network training
3. **Skill Discovery**: Implement automatic question-objective mapping
4. **Performance Optimization**: Add caching for frequently accessed states

## License

Same as parent project
