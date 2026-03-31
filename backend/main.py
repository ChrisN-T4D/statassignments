"""
FastAPI Backend for Neural BKT (Bayesian Knowledge Tracing)
Serves predictions from interpretable student models
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Optional
import os
from datetime import datetime

# Import BKT models (we'll create these next)
from models.neural_bkt import NeuralBKTModel, StudentPrototype

app = FastAPI(
    title="Neural BKT API",
    description="Advanced Bayesian Knowledge Tracing with multidimensional student abilities",
    version="1.0.0"
)

# CORS middleware - allow requests from Vue.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite dev server
        "http://localhost:3000",  # Alternative port
        "http://localhost:8090",  # PocketBase
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global model instance (loaded on startup)
bkt_model: Optional[NeuralBKTModel] = None
VALID_DIFFICULTIES = {"easy", "medium", "hard"}

# ============================================================
# Request/Response Models
# ============================================================

class BKTUpdateRequest(BaseModel):
    """Request to update BKT state after student answer"""
    user_id: str
    objective_id: str
    is_correct: bool
    difficulty: str = "medium"  # easy, medium, hard
    problem_id: Optional[str] = None
    # Time tracking fields for Neural BKT
    active_time_seconds: Optional[int] = None
    total_time_seconds: Optional[int] = None
    was_maxed_out: Optional[bool] = False
    idle_detected: Optional[bool] = False
    # Confidence and sequence engagement
    time_to_first_selection: Optional[int] = None
    answer_changes: Optional[int] = None
    time_since_reading: Optional[int] = None
    time_since_last_attempt: Optional[int] = None
    has_read_topic_before: Optional[bool] = None
    last_topic_read_time: Optional[int] = None
    last_attempt_time: Optional[int] = None
    last_reading_max_scroll_depth: Optional[int] = None
    last_reading_triggered_by_error: Optional[bool] = None

class BKTStateResponse(BaseModel):
    """BKT state for a single objective"""
    objective_id: str
    pL: float  # Current mastery probability
    pL0: float  # Prior probability
    pT: float  # Learning rate
    pS: float  # Slip probability
    pG: float  # Guess probability
    attempts: int
    correct: int
    incorrect: int
    last_updated: str

class StudentProfileResponse(BaseModel):
    """Student's multidimensional ability profile"""
    user_id: str
    prototype_id: int
    prototype_name: str
    guessing_tendency: float
    not_slipping_boost: float
    learning_rate: float
    retention: float
    confidence: float  # How confident we are in this prototype assignment

class PredictionRequest(BaseModel):
    """Request for next-question prediction"""
    user_id: str
    objective_ids: List[str]

class PredictionResponse(BaseModel):
    """Prediction for next question"""
    objective_id: str
    predicted_correct_prob: float
    recommended_difficulty: str
    mastery_level: str


def _sanitize_difficulty(value: Optional[str]) -> str:
    if isinstance(value, str):
        normalized = value.lower()
        if normalized in VALID_DIFFICULTIES:
            return normalized
    return "medium"


def _sanitize_non_negative_int(value: Optional[int]) -> Optional[int]:
    if value is None:
        return None
    return value if value >= 0 else None

# ============================================================
# Startup/Shutdown Events
# ============================================================

@app.on_event("startup")
async def startup_event():
    """Load BKT model on startup"""
    global bkt_model

    # For now, initialize with default parameters
    # Later, we'll load trained model weights
    bkt_model = NeuralBKTModel(
        num_prototypes=5,
        num_objectives=50  # Adjust based on your objectives
    )

    print("✅ Neural BKT model loaded successfully")

@app.on_event("shutdown")
async def shutdown_event():
    """Cleanup on shutdown"""
    print("🛑 Shutting down Neural BKT API")

# ============================================================
# Health Check
# ============================================================

@app.get("/")
async def root():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "Neural BKT API",
        "version": "1.0.0",
        "timestamp": datetime.utcnow().isoformat()
    }

@app.get("/health")
async def health_check():
    """Detailed health check"""
    return {
        "status": "healthy",
        "model_loaded": bkt_model is not None,
        "num_prototypes": bkt_model.num_prototypes if bkt_model else 0,
        "timestamp": datetime.utcnow().isoformat()
    }

# ============================================================
# BKT Endpoints
# ============================================================

@app.post("/bkt/update", response_model=BKTStateResponse)
async def update_bkt(request: BKTUpdateRequest):
    """
    Update BKT state after student answers a question

    This uses the neural BKT model with:
    - Multidimensional student abilities
    - Student prototype classification
    - Difficulty-adjusted parameters
    """
    if not bkt_model:
        raise HTTPException(status_code=503, detail="Model not loaded")

    try:
        difficulty = _sanitize_difficulty(request.difficulty)

        # Update BKT state using neural model with time and engagement data
        updated_state = bkt_model.update(
            user_id=request.user_id,
            objective_id=request.objective_id,
            is_correct=request.is_correct,
            difficulty=difficulty,
            active_time_seconds=_sanitize_non_negative_int(request.active_time_seconds),
            total_time_seconds=_sanitize_non_negative_int(request.total_time_seconds),
            was_maxed_out=request.was_maxed_out,
            idle_detected=request.idle_detected,
            time_to_first_selection=_sanitize_non_negative_int(request.time_to_first_selection),
            answer_changes=_sanitize_non_negative_int(request.answer_changes),
            time_since_reading=_sanitize_non_negative_int(request.time_since_reading),
            time_since_last_attempt=_sanitize_non_negative_int(request.time_since_last_attempt),
            has_read_topic_before=request.has_read_topic_before,
            last_topic_read_time=_sanitize_non_negative_int(request.last_topic_read_time),
            last_attempt_time=_sanitize_non_negative_int(request.last_attempt_time),
            last_reading_max_scroll_depth=_sanitize_non_negative_int(request.last_reading_max_scroll_depth),
            last_reading_triggered_by_error=request.last_reading_triggered_by_error
        )

        return BKTStateResponse(
            objective_id=request.objective_id,
            pL=updated_state['pL'],
            pL0=updated_state['pL0'],
            pT=updated_state['pT'],
            pS=updated_state['pS'],
            pG=updated_state['pG'],
            attempts=updated_state['attempts'],
            correct=updated_state['correct'],
            incorrect=updated_state['incorrect'],
            last_updated=datetime.utcnow().isoformat()
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/bkt/state/{user_id}/{objective_id}", response_model=BKTStateResponse)
async def get_bkt_state(user_id: str, objective_id: str):
    """Get current BKT state for a user-objective pair"""
    if not bkt_model:
        raise HTTPException(status_code=503, detail="Model not loaded")

    try:
        state = bkt_model.get_state(user_id, objective_id)

        if not state:
            # Return initial state
            return BKTStateResponse(
                objective_id=objective_id,
                pL=0.1,
                pL0=0.1,
                pT=0.15,
                pS=0.1,
                pG=0.25,
                attempts=0,
                correct=0,
                incorrect=0,
                last_updated=datetime.utcnow().isoformat()
            )

        return BKTStateResponse(
            objective_id=objective_id,
            pL=state['pL'],
            pL0=state['pL0'],
            pT=state['pT'],
            pS=state['pS'],
            pG=state['pG'],
            attempts=state['attempts'],
            correct=state['correct'],
            incorrect=state['incorrect'],
            last_updated=datetime.utcnow().isoformat()
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/student/profile/{user_id}", response_model=StudentProfileResponse)
async def get_student_profile(user_id: str):
    """
    Get student's multidimensional ability profile

    Returns which prototype the student most closely matches
    based on their performance history
    """
    if not bkt_model:
        raise HTTPException(status_code=503, detail="Model not loaded")

    try:
        profile = bkt_model.get_student_profile(user_id)

        return StudentProfileResponse(
            user_id=user_id,
            prototype_id=profile['prototype_id'],
            prototype_name=profile['prototype_name'],
            guessing_tendency=profile['guessing'],
            not_slipping_boost=profile['not_slipping'],
            learning_rate=profile['learning'],
            retention=profile['retention'],
            confidence=profile['confidence']
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict", response_model=List[PredictionResponse])
async def predict_performance(request: PredictionRequest):
    """
    Predict student performance on objectives

    Uses multidimensional abilities and sequential Bayesian updating
    to predict probability of correct response
    """
    if not bkt_model:
        raise HTTPException(status_code=503, detail="Model not loaded")

    try:
        predictions = bkt_model.predict(
            user_id=request.user_id,
            objective_ids=request.objective_ids
        )

        results = []
        for pred in predictions:
            results.append(PredictionResponse(
                objective_id=pred['objective_id'],
                predicted_correct_prob=pred['prob_correct'],
                recommended_difficulty=pred['recommended_difficulty'],
                mastery_level=pred['mastery_level']
            ))

        return results

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ============================================================
# Model Management (Admin endpoints)
# ============================================================

@app.post("/admin/retrain")
async def retrain_model():
    """
    Trigger model retraining with new data
    (Admin only - would need authentication in production)
    """
    if not bkt_model:
        raise HTTPException(status_code=503, detail="Model not loaded")

    try:
        # TODO: Implement actual training
        # For now, just reload with default parameters
        return {
            "status": "success",
            "message": "Model retraining scheduled",
            "timestamp": datetime.utcnow().isoformat()
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/admin/prototypes")
async def get_prototypes():
    """Get all student prototypes with their parameters"""
    if not bkt_model:
        raise HTTPException(status_code=503, detail="Model not loaded")

    try:
        prototypes = bkt_model.get_all_prototypes()
        return {"prototypes": prototypes}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
